<img width="2752" height="1536" alt="image" src="https://github.com/user-attachments/assets/2df80438-eb5e-46b3-936e-c3ceaa821c77" />


# NEXAI: OMNI-PRIME v5.0

**Digital Soul Curator**

Cultural context-aware, AI-powered psychological analysis and content curation system.

## Features

- **Psychological Analysis**: Big Five, MBTI, Enneagram, Jung Archetypes
- **BART Risk Test**: Balloon Analogue Risk Task
- **PsychoCore-X/ULTRA**: Advanced and deep psychological analysis engines
- **DPAE**: Integrated Self Matrix
- **Content Curation**: Personalized movie, book, music recommendations
- **Multi-Cultural Support**: Western, Eastern, African frameworks
- **Multi-Language**: Turkish and English interface

## Technology Stack

| Category | Technology |
|----------|-----------|
| Backend | Hono + Cloudflare Workers |
| Frontend | Vanilla JavaScript |
| AI Engine | Ollama (Local) / Google Gemini / OpenRouter |
| Build | Vite |
| Deploy | Cloudflare Pages |

## Installation

### Local Development (with Ollama)

```bash
# Install Ollama (https://ollama.com)
ollama pull llama3.2
ollama serve

# Project setup
git clone https://github.com/turkmen-coder/nexai-omni-prime.git
cd nexai-omni-prime
npm install
npm run dev
```

### Cloud Deployment

```bash
npm run build
npm run deploy
```

## Project Structure

```
nexai-omni-prime/
├── src/
│   ├── index.tsx                    # Backend API (Hono + Cloudflare Workers)
│   ├── renderer.tsx                 # Frontend renderer
│   └── nexai-unified-engine.js      # AI Unified Analysis Engine
├── public/
│   ├── static/
│   │   ├── app.js                   # Frontend JavaScript
│   │   ├── style.css                # Main CSS
│   │   └── tastedive-theme.css      # Content curation theme
│   └── demos/                       # Demo HTML pages
├── docs/                            # Comprehensive documentation
│   ├── QUICKSTART.md                # Quick start guide
│   ├── NEXAI_UNIFIED_ENGINE_DOCS.md # Engine documentation
│   ├── DPAE_DOCUMENTATION.md        # DPAE system docs
│   ├── INTEGRATION_SUMMARY.md       # Integration guide
│   ├── PERFORMANCE_OPTIMIZATION.md  # Performance notes
│   └── ...                          # More technical docs
├── config/
│   └── nexai.Modelfile              # Ollama model configuration
├── .dev.vars.example                # Environment variables template
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite bundler config
└── wrangler.jsonc                   # Cloudflare Workers config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | System status |
| POST | `/api/protected/analyze` | Message analysis |
| POST | `/api/protected/profile` | Psychological profile |
| POST | `/api/protected/psychocore-x` | PsychoCore-X analysis |
| POST | `/api/protected/psychocore-ultra` | PsychoCore-ULTRA analysis |
| POST | `/api/protected/dpae` | DPAE integrated analysis |
| POST | `/api/protected/unified-analysis` | Full 5-layer analysis |

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Local preview
npm run deploy   # Cloudflare deploy
```

## Documentation

For detailed documentation, see the `docs/` folder:

### Getting Started
- [QUICKSTART.md](docs/QUICKSTART.md) - Quick start guide
- [OLLAMA_SETUP.md](docs/OLLAMA_SETUP.md) - Ollama setup and configuration

### Technical Documentation
- [NEXAI_UNIFIED_ENGINE_DOCS.md](docs/NEXAI_UNIFIED_ENGINE_DOCS.md) - Unified Engine API
- [DPAE_DOCUMENTATION.md](docs/DPAE_DOCUMENTATION.md) - DPAE analysis system
- [INTEGRATION_SUMMARY.md](docs/INTEGRATION_SUMMARY.md) - System integration
- [PERFORMANCE_OPTIMIZATION.md](docs/PERFORMANCE_OPTIMIZATION.md) - Performance improvements

### Project Information
- [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) - Project summary
- [FEATURES_COMPLETE.md](docs/FEATURES_COMPLETE.md) - Completed features
- [CHANGELOG.md](docs/CHANGELOG.md) - Version history
- [DPAE_DOCUMENTATION.md](docs/DPAE_DOCUMENTATION.md) - DPAE engine
- [PSYCHOCORE_INTEGRATION.md](docs/PSYCHOCORE_INTEGRATION.md) - PsychoCore engines
- [FEATURES_COMPLETE.md](docs/FEATURES_COMPLETE.md) - Complete feature list

## License

MIT

## Developer

**turkmen-coder** - [GitHub](https://github.com/turkmen-coder)
