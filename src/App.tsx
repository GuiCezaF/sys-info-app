import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import { useSysInfo } from "./hooks/useSysInfo";
import { Dashboard } from "./components/Dashboard";
import { Settings } from "./components/Settings";

function App() {
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");
  const info = useSysInfo();

  // Preferências persistentes
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem("fontSize")) || 14);
  const [textColor, setTextColor] = useState(() => localStorage.getItem("textColor") || "#f8fafc");
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem("fontFamily") || "'Outfit', sans-serif");

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("textColor", textColor);
    localStorage.setItem("fontFamily", fontFamily);

    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
    document.documentElement.style.setProperty("--text-color", textColor);
    document.documentElement.style.setProperty("--accent-color", textColor);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    
    // Atualiza o ícone da bandeja com a nova cor
    const updateTrayColor = async (color: string) => {
      try {
        const svgString = `
          <svg width="64" height="64" viewBox="0 0 64 64" fill="${color}" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="28" width="10" height="26" rx="2"/>
            <rect x="27" y="18" width="10" height="36" rx="2"/>
            <rect x="44" y="10" width="10" height="44" rx="2"/>
          </svg>
        `.trim();

        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          const img = new Image();
          const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(svgBlob);
          
          img.onload = async () => {
            ctx.clearRect(0, 0, 64, 64);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            
            const imageData = ctx.getImageData(0, 0, 64, 64);
            const rgba = Array.from(imageData.data);
            
            await invoke("update_tray_icon", { 
              rgba, 
              width: 64, 
              height: 64 
            });
          };
          img.src = url;
        }
      } catch (err) {
        console.error("Erro ao atualizar ícone da bandeja:", err);
      }
    };

    updateTrayColor(textColor);
  }, [fontSize, textColor, fontFamily]);

  useEffect(() => {
    // Escuta eventos de navegação vindos do sistema (tray)
    const unlisten = listen<string>("navigate", (event) => {
      if (event.payload === "dashboard") setView("dashboard");
      if (event.payload === "settings") setView("settings");
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <main>
      {view === "dashboard" ? (
        <Dashboard info={info} />
      ) : (
        <Settings
          onBack={() => setView("dashboard")}
          fontSize={fontSize}
          setFontSize={setFontSize}
          textColor={textColor}
          setTextColor={setTextColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
        />
      )}
    </main>
  );
}

export default App;
