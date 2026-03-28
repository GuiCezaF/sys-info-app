import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { type SysInfo } from "../hooks/useSysInfo";
import { Icon } from "./Icon";

interface DashboardProps {
  info: SysInfo | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ info }) => {
  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const memPercent = info ? (info.memory_used / info.memory_total) * 100 : 0;
  const diskPercent = info ? (info.disk_used / info.disk_total) * 100 : 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    // Não inicia arraste se o clique for em elementos interativos
    if ((e.target as HTMLElement).closest("button, input, select, label")) {
      return;
    }
    if (e.button === 0) {
      getCurrentWindow().startDragging();
    }
  };

  return (
    <div className="app-container">
      <header data-tauri-drag-region onMouseDown={handleMouseDown}>
        <div className="header-title" data-tauri-drag-region>
          <Icon size={24} className="app-icon" />
          <h1 data-tauri-drag-region>System Monitor</h1>
        </div>
      </header>

      <section className="stats-section">
        <ul className="stats-grid">
          <li className="stat-item">
            <div className="stat-header">
              <span>CPU</span>
              <span className="stat-value">{info?.cpu_usage.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${info?.cpu_usage || 0}%` }}
              />
            </div>
          </li>

          <li className="stat-item">
            <div className="stat-header">
              <span>Memória</span>
              <span className="stat-value">
                {info ? `${formatBytes(info.memory_used)} / ${formatBytes(info.memory_total)}` : "---"}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${memPercent}%` }} />
            </div>
          </li>

          <li className="stat-item">
            <div className="stat-header">
              <span>Disco</span>
              <span className="stat-value">
                {info ? `${formatBytes(info.disk_used)} / ${formatBytes(info.disk_total)}` : "---"}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${diskPercent}%` }} />
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};
