
# Implementação - Endpoints Backend para Rádio Mix FM

## Status Atual
✅ Interface frontend completa e funcional
✅ Dados mockados funcionando via arquivos JSON
✅ Autenticação com AuthContext implementada
✅ Todas as funcionalidades de UI implementadas

## Próximos Passos

### 1. Autenticação e Usuários
- [ ] Implementar sistema de login/logout real
- [ ] Gerenciamento de sessões
- [ ] Recuperação de senha
- [ ] Perfil do usuário

### 2. Gerenciamento de Anúncios
- [ ] CRUD completo de anúncios
- [ ] Upload de arquivos de áudio
- [ ] Agendamento de anúncios
- [ ] Sistema de rotação automática

### 3. Gerenciamento de Playlists
- [ ] CRUD de playlists
- [ ] Upload de músicas
- [ ] Organização por categorias
- [ ] Sistema de reprodução

### 4. Locução Virtual
- [ ] Integração com API de síntese de voz
- [ ] Geração de locuções automáticas
- [ ] Personalização de vozes

### 5. Programação e Agendamento
- [ ] Sistema de grade de programação
- [ ] Agendamento automático
- [ ] Logs de reprodução

## Endpoints Necessários

### Autenticação
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/register
POST /api/auth/recover-password
POST /api/auth/reset-password
GET /api/auth/check
GET /api/auth/profile
PUT /api/auth/profile
```

### Anúncios
```
GET /api/announcements
POST /api/announcements
PUT /api/announcements/:id
DELETE /api/announcements/:id
POST /api/announcements/:id/upload
GET /api/announcements/categories
PUT /api/announcements/:id/toggle-status
```

### Playlists
```
GET /api/playlists
POST /api/playlists
PUT /api/playlists/:id
DELETE /api/playlists/:id
POST /api/playlists/:id/tracks
DELETE /api/playlists/:id/tracks/:trackId
PUT /api/playlists/:id/tracks/order
GET /api/playlists/categories
```

### Vinhetas
```
GET /api/vinhetas
POST /api/vinhetas
PUT /api/vinhetas/:id
DELETE /api/vinhetas/:id
POST /api/vinhetas/:id/upload
PUT /api/vinhetas/:id/toggle-status
```

### Avisos
```
GET /api/avisos
POST /api/avisos
PUT /api/avisos/:id
DELETE /api/avisos/:id
PUT /api/avisos/:id/toggle-status
GET /api/avisos/types
```

### Especiais Sazonais
```
GET /api/especiais-sazonais
POST /api/especiais-sazonais
PUT /api/especiais-sazonais/:id
DELETE /api/especiais-sazonais/:id
PUT /api/especiais-sazonais/:id/toggle-status
```

### Spots de Cortesia
```
GET /api/spots-cortesia
POST /api/spots-cortesia
PUT /api/spots-cortesia/:id
DELETE /api/spots-cortesia/:id
PUT /api/spots-cortesia/:id/toggle-status
GET /api/spots-cortesia/types
```

### Locução Virtual
```
GET /api/locucao-virtual
POST /api/locucao-virtual
PUT /api/locucao-virtual/:id
DELETE /api/locucao-virtual/:id
POST /api/locucao-virtual/:id/generate
GET /api/locucao-virtual/voices
GET /api/locucao-virtual/categories
```

### Programação
```
GET /api/programacao
POST /api/programacao
PUT /api/programacao/:id
DELETE /api/programacao/:id
GET /api/programacao/grid
POST /api/programacao/auto-schedule
```

### Upload de Arquivos
```
POST /api/upload/audio
POST /api/upload/image
GET /api/files/:id
DELETE /api/files/:id
```

### Configurações
```
GET /api/configuracoes
PUT /api/configuracoes
GET /api/configuracoes/radio-info
PUT /api/configuracoes/radio-info
```

### Logs e Relatórios
```
GET /api/logs/playback
GET /api/logs/user-actions
GET /api/reports/daily
GET /api/reports/weekly
GET /api/reports/monthly
```

### Player/Stream
```
GET /api/player/current-track
GET /api/player/status
POST /api/player/control
GET /api/player/queue
POST /api/player/queue
```

## Estrutura de Dados

### Modelos Principais
- User (id, email, name, role, preferences)
- Announcement (id, title, category, duration, type, schedule, files)
- Playlist (id, name, description, tracks, category, schedule)
- Track (id, title, artist, duration, file_url, playlist_id)
- Vinheta (id, title, category, duration, file_url, play_frequency)
- VirtualVoice (id, title, text, voice_config, status, audio_url)
- Schedule (id, type, content_id, datetime, frequency, active)

### Relacionamentos
- User -> Announcements (1:N)
- User -> Playlists (1:N)
- Playlist -> Tracks (1:N)
- Schedule -> Content (1:1 polymorphic)

## Tecnologias Sugeridas para Backend
- Node.js/Express ou PHP/Laravel
- MySQL/PostgreSQL para dados estruturados
- Redis para cache e sessões
- S3/MinIO para storage de arquivos
- WebSocket para real-time updates
- Cron jobs para agendamentos

## Prioridade de Implementação
1. **Autenticação** - Base para tudo
2. **Anúncios** - Funcionalidade principal
3. **Playlists** - Conteúdo musical
4. **Upload de Arquivos** - Essencial para conteúdo
5. **Programação** - Automação
6. **Locução Virtual** - Diferencial
7. **Relatórios** - Analytics

## Observações Importantes
- Todos os endpoints devem ter autenticação JWT
- Implementar rate limiting
- Logs de auditoria para todas as ações
- Backup automático de dados
- Compressão de áudio para otimização
- CDN para distribuição de arquivos
