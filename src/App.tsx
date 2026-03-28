import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
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
