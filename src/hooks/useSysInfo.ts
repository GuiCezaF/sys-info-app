import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export interface SysInfo {
  cpu_usage: number;
  memory_used: number;
  memory_total: number;
  disk_used: number;
  disk_total: number;
  gpu_info: string | null;
}

export function useSysInfo() {
  const [info, setInfo] = useState<SysInfo | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await invoke<SysInfo>("get_sys_info");
        setInfo(data);
      } catch (err) {
        console.error("Erro ao buscar informações do sistema:", err);
      }
    };

    fetchInfo();
    const interval = setInterval(fetchInfo, 1000);

    return () => clearInterval(interval);
  }, []);

  return info;
}
