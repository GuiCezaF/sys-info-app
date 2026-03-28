# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.2] - 2026-03-28

### Corrigido
- Falha no build de produção do Windows no GitHub Actions: restaurada a presença do `icon.ico` e outros ícones necessários para a geração do executável.
- Sincronização de tags no CI: garantido que a tag de lançamento aponte para o commit mais recente com todos os artefatos.
- Inconsistência de versão: unificada a versão do projeto para `1.0.2` no `tauri.conf.json`, `Cargo.toml` e `CHANGELOG.md`.

## [v1.0.1] - 2026-03-28

### Corrigido
- Problema de scroll na tela de configurações e dashboard: implementado cabeçalho fixo e scroll interno para garantir acessibilidade em janelas de baixa altura.
- Visibilidade da janela na inicialização do aplicativo.
- Desabilitado menu de contexto (botão direito) e DevTools em builds de produção para maior segurança.
- Erro de ABI mismatch no compilador Rust (proc macro server error): resolvido através da limpeza completa do cache de compilação (`cargo clean`).
- Implementado ícone dinâmico (`icon.svg`) que muda de cor conforme a cor de destaque do sistema/usuário, tanto na interface quanto na bandeja (Tray).

## [v1.0.0]

### Adicionado
- Integração com `sysinfo` para monitoramento de CPU, Memória e Disco em tempo real.
- Janela translúcida com glassmorphism e sem bordas.
- Menu de bandeja expandido com opção "Configurações".
- Tela de Dashboard com barras de progresso visuais.
- Tela de Configurações para personalizar UI (fonte, cor, tamanho).
- Persistência de preferências via `localStorage`.
- Polling de 1 segundo para atualização dos dados do sistema.
- Lógica de navegação via eventos Rust -> Frontend.
- Acesso à tela de configurações movido exclusivamente para a bandeja (tray).
- Remoção do botão de configurações do Dashboard para uma interface mais limpa.
- Implementação de suporte a arraste da janela (`drag-region`) com o mouse.
- Janela configurada para não aparecer na barra de tarefas (`skipTaskbar`), focando o acesso via Tray.
- Habilitada a rolagem (scroll) na tela de configurações com barra de rolagem estilizada.
- Adicionada a opção de "Inicializar com o sistema" (Autostart) via plugin nativo.
- Unificação da cor do texto: agora a cor escolhida se aplica a todos os rótulos, botões e barras de progresso.
- Correção visual do seletor de fonte (select) para garantir legibilidade dos itens.
- Refatoração completa do HTML para uso de tags semânticas (<main>, <section>, <nav>, <header>, <ul>, <li>, <form>), melhorando a estrutura e acessibilidade.
- Configuração de CI/CD via GitHub Actions para automação de builds (Windows, Linux, macOS).
- Adicionado suporte ao instalador NSIS (.exe) para Windows.
