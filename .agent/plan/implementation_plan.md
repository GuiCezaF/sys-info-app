# Plano de Implementação - Sys Info App

Este documento descreve o plano para desenvolver o aplicativo de informações do sistema conforme os requisitos do `plan.md`. O app será baseado em Tauri (Rust + React), rodando no tray com uma janela translúcida e sem bordas.

## User Review Required

> [!IMPORTANT]
> - O uso de GPU via `sysinfo` tem suporte limitado dependendo da plataforma e drivers. Tentarei implementar se possível, mas pode não ser reportado em todos os sistemas.
> - A transparência da janela no Windows requer que o `transparent: true` esteja configurado no `tauri.conf.json` e que o fundo do CSS também seja transparente ou semi-opaco.

## Proposed Changes

### Backend (Rust)

#### [MODIFY] [Cargo.toml](file:///c:/Users/guice/dev/rust/sys-info-app/src-tauri/Cargo.toml)
- Adicionar a crate `sysinfo` para coleta de dados.

#### [MODIFY] [tauri.conf.json](file:///c:/Users/guice/dev/rust/sys-info-app/src-tauri/tauri.conf.json)
- Configurar a janela principal: `decorations: false`, `transparent: true`, `resizable: false`.
- Configurar o ícone de tray e o menu de contexto (Mostrar, Configurações, Sair).

#### [MODIFY] [main.rs](file:///c:/Users/guice/dev/rust/sys-info-app/src-tauri/src/main.rs) (ou lib.rs)
- Implementar comandos Tauri para:
    - `get_sys_info`: Retorna uso de CPU, Memória e Disco.
- Configurar o `SystemTray` handler para gerenciar os eventos de clique no menu.

---

### Frontend (React + TypeScript)

#### [NEW] `src/hooks/useSysInfo.ts`
- Hook customizado para fazer o polling das informações do sistema via Tauri INVOKE periodicamente (intervalo de 1 segundo).

#### [MODIFY] [App.tsx](file:///c:/Users/guice/dev/rust/sys-info-app/src/App.tsx)
- Estrutura principal com roteamento simples ou estados para alternar entre "Dashboard" e "Configurações".
- Aplicar estilos de transparência e remover scrollbars se necessário.

#### [NEW] `src/components/Dashboard.tsx`
- Exibir os dados de CPU, Memória e Disco com barras de progresso ou indicadores visuais modernos.

#### [NEW] `src/components/Settings.tsx`
- Interface para ajustar:
    - Tamanho da fonte.
    - Cor do texto.
    - Família da fonte.
- Salvar essas preferências no `localStorage`.

#### [MODIFY] [index.css](file:///c:/Users/guice/dev/rust/sys-info-app/src/index.css)
- Implementar o design system: fundo translúcido (glassmorphism), cores modernas e tipografia conforme solicitado.

## Open Questions

- **GPU**: A implementação será mantida como opcional no código, carregando apenas se os drivers/hardware suportarem via `sysinfo`.

## Verification Plan

### Automated Tests
- Testes unitários no Rust para garantir que o `get_sys_info` retorna valores válidos.

### Manual Verification
1. Executar `bun run tauri dev`.
2. Verificar se o ícone aparece no tray do Windows.
3. Clicar em "Mostrar" e validar se a janela abre sem bordas e com transparência.
4. Ajustar configurações de fonte/cor e validar se a UI reflete as mudanças instantaneamente.
5. Fechar pelo menu "Sair".
