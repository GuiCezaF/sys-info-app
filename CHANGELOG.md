# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
