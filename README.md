# NEXAI: OMNI-PRIME v5.0

**Dijital Ruh Küratörü | Digital Soul Curator**

Kültürel bağlam duyarlı, yapay zeka destekli psikolojik analiz ve içerik kürasyon sistemi.

## Özellikler

- **Psikolojik Analiz**: Big Five, MBTI, Enneagram, Jung Arketipleri
- **BART Risk Testi**: Balon Analojik Risk Görevi
- **PsychoCore-X/ULTRA**: Gelişmiş ve derin psikolojik analiz motorları
- **DPAE**: Bütünleşik Benlik Matrisi
- **İçerik Kürasyonu**: Kişiselleştirilmiş film, kitap, müzik önerileri
- **Çoklu Kültür Desteği**: Batı, Doğu, Afrika çerçeveleri
- **Çoklu Dil**: Türkçe ve İngilizce arayüz

## Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| Backend | Hono + Cloudflare Workers |
| Frontend | Vanilla JavaScript |
| AI Engine | Ollama (Yerel) / Google Gemini / OpenRouter |
| Build | Vite |
| Deploy | Cloudflare Pages |

## Kurulum

### Yerel Geliştirme (Ollama ile)

```bash
# Ollama kurulumu (https://ollama.com)
ollama pull llama3.2
ollama serve

# Proje kurulumu
git clone https://github.com/turkmen-coder/NEXA-.git
cd NEXA-
npm install
npm run dev
```

### Cloud Deployment

```bash
npm run build
npm run deploy
```

## Proje Yapısı

```
NEXA-/
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

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/health` | Sistem durumu |
| POST | `/api/protected/analyze` | Mesaj analizi |
| POST | `/api/protected/profile` | Psikolojik profil |
| POST | `/api/protected/psychocore-x` | PsychoCore-X analizi |
| POST | `/api/protected/psychocore-ultra` | PsychoCore-ULTRA analizi |
| POST | `/api/protected/dpae` | DPAE bütünleşik analiz |
| POST | `/api/protected/unified-analysis` | Tam 5 katmanlı analiz |

## Scripts

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run preview  # Local preview
npm run deploy   # Cloudflare deploy
```

## Dokümantasyon

Detaylı dokümantasyon için `docs/` klasörüne bakın:

### Başlangıç
- [QUICKSTART.md](docs/QUICKSTART.md) - Hızlı başlangıç rehberi
- [OLLAMA_SETUP.md](docs/OLLAMA_SETUP.md) - Ollama kurulum ve yapılandırma

### Teknik Dokümantasyon
- [NEXAI_UNIFIED_ENGINE_DOCS.md](docs/NEXAI_UNIFIED_ENGINE_DOCS.md) - Unified Engine API
- [DPAE_DOCUMENTATION.md](docs/DPAE_DOCUMENTATION.md) - DPAE analiz sistemi
- [INTEGRATION_SUMMARY.md](docs/INTEGRATION_SUMMARY.md) - Sistem entegrasyonu
- [PERFORMANCE_OPTIMIZATION.md](docs/PERFORMANCE_OPTIMIZATION.md) - Performans iyileştirmeleri

### Proje Bilgisi
- [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) - Proje özeti
- [FEATURES_COMPLETE.md](docs/FEATURES_COMPLETE.md) - Tamamlanan özellikler
- [CHANGELOG.md](docs/CHANGELOG.md) - Versiyon geçmişi
- [DPAE_DOCUMENTATION.md](docs/DPAE_DOCUMENTATION.md) - DPAE motoru
- [PSYCHOCORE_INTEGRATION.md](docs/PSYCHOCORE_INTEGRATION.md) - PsychoCore motorları
- [FEATURES_COMPLETE.md](docs/FEATURES_COMPLETE.md) - Tam özellik listesi

## Lisans

MIT

## Geliştirici

**turkmen-coder** - [GitHub](https://github.com/turkmen-coder)
