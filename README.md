# 🖥️ Sys Info Tray

A minimalist, high-performance system monitor that lives exclusively in your system tray. Built with **Rust** and **React** using **Tauri v2**.

![License](https://img.shields.io/badge/license-MIT-green)
![Framework](https://img.shields.io/badge/Framework-Tauri%20v2-blue)
![Language](https://img.shields.io/badge/Backend-Rust-orange)
![Language](https://img.shields.io/badge/Frontend-React%20%2F%20TS-blue)

## ✨ Features

- 📊 **Real-time Monitoring**: Precise CPU usage, Memory consumption, and Disk space metrics.
- 🎨 **Premium Aesthetics**: Beautiful glassmorphism UI with adjustable translucency and blur effects.
- ⚙️ **Fully Customizable**: Personalize your experience by changing fonts, text colors, and font sizes directly from the settings.
- 🖱️ **Interactable & Movable**: Drag the window anywhere on your screen and pin it if needed.
- 🔒 **Privacy Focused**: Tray-only operation. The app stays hidden from your taskbar and Alt+Tab menu.
- 🚀 **Native Autostart**: Option to automatically launch with your system.
- 📦 **Multi-platform**: Automated builds for **Windows** (.exe, .msi), **Linux** (.deb, .AppImage), and **macOS**.

## 🚀 Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Bun](https://bun.sh/) (or Node.js/npm)
- [Tauri CLI](https://tauri.app/v2/guides/getting-started/prerequisites)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/youruser/sys-info-app.git
   cd sys-info-app
   ```

2. Install frontend dependencies:
   ```bash
   bun install
   ```

3. Run in development mode:
   ```bash
   bun tauri dev
   ```

## 🏗️ Building for Production

To generate optimized installers for your current platform:

```bash
bun tauri build
```

## 🛠️ Tech Stack

- **Backend**: [Rust](https://www.rust-lang.org/) with [Tauri v2](https://tauri.app/)
- **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Modern aesthetic)
- **Monitoring**: [sysinfo](https://crates.io/crates/sysinfo) crate

---

Built with ❤️ by GuiCezaF
