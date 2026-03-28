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
      <nav data-tauri-drag-region>
        <button className="back-btn" onClick={onBack}>
          ← Dashboard
        </button>
      </nav>

      <header data-tauri-drag-region onMouseDown={handleMouseDown}>
        <h1 data-tauri-drag-region>Configurações</h1>
      </header>

      <form className="settings-group" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="input-field">
          <label htmlFor="font-size-slider">Tamanho da Fonte ({fontSize}px)</label>
          <input
            id="font-size-slider"
            type="range"
            min="10"
            max="24"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </fieldset>

        <fieldset className="input-field">
          <label htmlFor="text-color-picker">Cor do Texto</label>
          <input
            id="text-color-picker"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </fieldset>

        <fieldset className="input-field">
          <label htmlFor="font-family-select">Fonte</label>
          <select
            id="font-family-select"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="'Outfit', sans-serif">Outfit (Padrão)</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="monospace">Monospace</option>
          </select>
        </fieldset>

        <fieldset className="input-field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={autostart}
              onChange={toggleAutostart}
            />
            Inicializar com o sistema
          </label>
        </fieldset>
      </form>
    </div>
  );
};
