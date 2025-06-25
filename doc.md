
# Documentação do Sistema - Rádio Mix FM

## Visão Geral
Sistema completo de gerenciamento para rádio online com interface moderna, player integrado e painel administrativo.

## Estrutura do Sistema

### 1. **Nome da Rádio**
- **Campo dinâmico**: `user?.nome` do contexto de autenticação
- **Fallback**: "Rádio Mix FM" (padrão quando não há usuário logado)
- **Arquivos afetados**:
  - `src/components/Header.tsx` - Título no cabeçalho
  - `src/pages/Stream.tsx` - Nome na página de stream
  - `src/components/PlayerDashboard.tsx` - Título do painel
  - `public/api/radio-info.json` - Dados estáticos (futuro endpoint)

### 2. **Arquivos de Layout Principal**

#### **Header (src/components/Header.tsx)**
- Navegação principal
- Avatar do usuário
- Controles de tema (claro/escuro)
- Menu dropdown com configurações
- Logo da rádio
- **Problema identificado**: Tema não carrega da API

#### **Sidebar (src/components/PlayerDashboard.tsx)**
- **NOVO**: Menu lateral colapsível
- Navegação entre seções do painel
- Icones para cada seção
- Responsivo (colapsa em mobile)
- **Backup**: `src/components/PlayerDashboard.backup.tsx`

#### **Player (src/components/Player.tsx)**
- Player de áudio fixo na parte inferior
- Controles de reprodução
- Barra de progresso
- Controle de volume
- Informações da música atual

#### **Stream Page (src/pages/Stream.tsx)**
- Página dedicada para transmissão
- Logo centralizado
- Player integrado
- Design responsivo

### 3. **Seções do Painel Administrativo**

#### **Anúncios** (`AnnouncementsManager`)
- Gerenciamento de anúncios publicitários
- Upload de arquivos de áudio
- Agendamento
- Categorização

#### **Playlists** (`PlaylistsManager`)
- Organização de músicas
- Criação e edição de playlists
- Upload de arquivos musicais
- Categorias musicais

#### **Vinhetas** (`VinhettasManager`)
- Vinhetas da rádio
- Frequência de reprodução
- Categorização por tipo

#### **Programação** (`ScheduleManager`)
- Grade de programação
- Agendamento automático
- Calendário de eventos

#### **Avisos, Especiais Sazonais, Spots de Cortesia** (`PromotionsManager`)
- Conteúdo promocional
- Avisos e comunicados
- Conteúdo sazonal
- Spots gratuitos

#### **Locução Virtual** (`VirtualVoiceManager`)
- Síntese de voz
- Locuções automáticas
- Configuração de vozes

#### **Relatórios**
- Analytics e estatísticas
- Logs de reprodução
- Relatórios de performance

### 4. **Sistema de Autenticação**

#### **AuthContext** (`src/contexts/AuthContext.tsx`)
- Gerenciamento de estado do usuário
- Login/logout
- Preferências do usuário (tema, idioma)
- **Problema identificado**: Erro ao verificar autenticação (retorna HTML em vez de JSON)

#### **Modais de Usuário**
- `ProfileModal` - Edição de perfil
- `PasswordModal` - Alteração de senha
- `ConfigurationsModal` - Configurações gerais

### 5. **Temas e Cores**

#### **Sistema de Cores**
- Azul (padrão)
- Verde
- Vermelho
- Roxo
- Seleção via dropdown do usuário

#### **Tema Claro/Escuro**
- Toggle no header
- **Problema**: Não carrega preferência da API
- Usa CSS variables para transições suaves

### 6. **APIs e Dados**

#### **Arquivos JSON Mockados** (em `public/api/`)
- `announcements.json` - Anúncios
- `anuncios.json` - Dados de anúncios
- `avisos.json` - Avisos
- `especiais-sazonais.json` - Conteúdo sazonal
- `locucao-virtual.json` - Locuções virtuais
- `playlists.json` - Playlists
- `spots-cortesia.json` - Spots de cortesia
- `radio-info.json` - Informações da rádio
- `logo.json` - Configuração do logo

### 7. **Componentes UI**

#### **Shadcn/UI Components**
- Sistema completo de componentes
- Sidebar (recém implementado)
- Cards, Buttons, Inputs, etc.
- Totalmente customizável via CSS variables

### 8. **Hooks Customizados**
- `useLogo` - Gerenciamento do logo
- `useLoadingState` - Estados de carregamento
- `use-mobile` - Detecção de dispositivos móveis

## Problemas Identificados

### 1. **Tema não carrega da API**
- O tema sempre inicia como 'dark'
- Preferências do usuário não são aplicadas automaticamente
- **Localização**: `src/components/Header.tsx` linha ~47

### 2. **Erro de Autenticação**
- API retorna HTML em vez de JSON
- **Erro**: "Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"
- **Localização**: `src/contexts/AuthContext.tsx` linha 35

### 3. **URLs dos Endpoints**
- Ainda usando dados mockados
- Necessário implementar endpoints reais conforme `implements.md`

## Próximos Passos

1. **Corrigir carregamento de tema da API**
2. **Resolver erro de autenticação**
3. **Implementar endpoints backend**
4. **Conectar dados reais às interfaces**
5. **Testes de responsividade**
6. **Otimização de performance**

## Estrutura de Arquivos Importantes

```
src/
├── components/
│   ├── Header.tsx (258 linhas - considerar refatoração)
│   ├── Player.tsx
│   ├── PlayerDashboard.tsx (novo com sidebar)
│   ├── PlayerDashboard.backup.tsx (backup das tabs)
│   └── ui/ (componentes shadcn)
├── contexts/
│   └── AuthContext.tsx (214 linhas - considerar refatoração)
├── pages/
│   ├── Stream.tsx
│   ├── Painel.tsx
│   └── Login.tsx
└── hooks/
    ├── useLogo.tsx
    └── useLoadingState.tsx
```

## Observações Técnicas

- **React 18** com TypeScript
- **Tailwind CSS** para styling
- **Shadcn/UI** para componentes
- **React Router** para navegação
- **Lucide React** para ícones
- **Vite** como bundler

## Status de Implementação

✅ Interface completa
✅ Sistema de navegação
✅ Modais e formulários
✅ Player de áudio
✅ Sistema de temas
✅ Sidebar implementado
⚠️ Tema não carrega da API
⚠️ Erro de autenticação
❌ Endpoints backend
❌ Dados reais conectados
