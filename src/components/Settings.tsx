import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { enable, disable, isEnabled } from "@tauri-apps/plugin-autostart";

interface SettingsProps {
  onBack: () => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  textColor: string;
  setTextColor: (v: string) => void;
  fontFamily: string;
  setFontFamily: (v: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  onBack,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
}) => {
  const [autostart, setAutostart] = useState(false);

  useEffect(() => {
    // Verifica se o autostart está habilitado ao carregar
    isEnabled().then(setAutostart).catch(console.error);
  }, []);

  const toggleAutostart = async () => {
    try {
      const newState = !autostart;
      if (newState) {
        await enable();
      } else {
        await disable();
      }
      setAutostart(newState);
    } catch (err) {
      console.error("Erro ao alterar autostart:", err);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, input, select, label")) {
      return;
    }
    if (e.button === 0) {
      getCurrentWindow().startDragging();
    }
  };

  return (
    <div 
      className="app-container" 
      data-tauri-drag-region
      onMouseDown={handleMouseDown}
    >
      <button className="back-btn" onClick={onBack}>
        ← Dashboard
      </button>

      <h1 data-tauri-drag-region onMouseDown={handleMouseDown}>Configurações</h1>

      <div className="settings-group">
        <div className="input-field">
          <label>Tamanho da Fonte ({fontSize}px)</label>
          <input
            type="range"
            min="10"
            max="24"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </div>

        <div className="input-field">
          <label>Cor do Texto</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Fonte</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="'Outfit', sans-serif">Outfit (Padrão)</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>

        <div className="input-field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={autostart}
              onChange={toggleAutostart}
            />
            Inicializar com o sistema
          </label>
        </div>
      </div>
    </div>
  );
};
