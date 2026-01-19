# NEXAI: OMNI-PRIME Bütünleşik Analiz Motoru v5.0

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Algoritma Akış Şeması](#algoritma-akış-şeması)
3. [Katman Detayları](#katman-detayları)
4. [Entegrasyon Kılavuzu](#entegrasyon-kılavuzu)
5. [API Referansı](#api-referansı)
6. [Örnek Kullanımlar](#örnek-kullanımlar)

---

## Genel Bakış

NEXAI Unified Engine, tüm psikolojik analiz motorlarını sıralı ve entegre şekilde çalıştıran kapsamlı bir sistemdir. Her katman bir öncekinin sonuçlarını kullanarak derinleşen bir analiz sunar.

### Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| **5 Katmanlı Analiz** | Yüzeyden derin katmanlara kademeli analiz |
| **3 AI Ajanı** | Kültürel Antropolog, Gölge Avcısı, Estetik Küratör |
| **3 Ana Motor** | PsychoCore-X, PsychoCore-ULTRA, DPAE |
| **Çapraz Korelasyon** | Tüm sonuçlar arasında tutarlılık kontrolü |
| **Kültürel Adaptasyon** | Batı, Doğu ve Afrika çerçeveleri |

---

## Algoritma Akış Şeması

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NEXAI UNIFIED ENGINE AKIŞ DİYAGRAMI                      │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │  KULLANICI   │
                              │   VERİSİ     │
                              │  (Mesajlar,  │
                              │   BART vb.)  │
                              └──────┬───────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 1: VERİ DOĞRULAMA VE ÖN İŞLEME                                       │
│ ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│ │ Input Sanitize  │→ │ XSS Temizliği   │→ │ Normalizasyon   │              │
│ │ (Max 10K char)  │  │ (DOMPurify)     │  │ (Array format)  │              │
│ └─────────────────┘  └─────────────────┘  └─────────────────┘              │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 2: YÜZEY KATMAN (Surface Layer)                                      │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │                     Kültürel Antropolog Ajanı                         │  │
│ │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │  │
│ │  │ Kültürel    │  │ Demografik  │  │ İlk         │                   │  │
│ │  │ İşaretler   │  │ Çıkarım     │  │ İzlenimler  │                   │  │
│ │  └─────────────┘  └─────────────┘  └─────────────┘                   │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│ Çıktı: culturalMarkers, demographics, initialImpressions                   │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 3: ORTA KATMAN (Middle Layer) - PsychoCore-X Motoru                  │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐       │  │
│ │  │Big Five │ │  MBTI   │ │Enneagram │ │   EQ    │ │  BART   │       │  │
│ │  │ (OCEAN) │ │ 16 Tip  │ │  9 Tip   │ │Duygusal │ │  Risk   │       │  │
│ │  │         │ │         │ │          │ │  Zeka   │ │ Skoru   │       │  │
│ │  └────┬────┘ └────┬────┘ └────┬─────┘ └────┬────┘ └────┬────┘       │  │
│ │       │           │           │            │           │             │  │
│ │       └───────────┴───────────┼────────────┴───────────┘             │  │
│ │                               ▼                                       │  │
│ │                    ┌──────────────────┐                               │  │
│ │                    │   Gölge Avcısı   │                               │  │
│ │                    │  Jung Arketipleri│                               │  │
│ │                    │   (12 Arketip)   │                               │  │
│ │                    └──────────────────┘                               │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│ Çıktı: bigFive, mbti, enneagram, eq, bartRisk, jungArchetypes             │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 4: DERİN KATMAN (Deep Layer) - PsychoCore-ULTRA Motoru               │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │  │
│ │  │  Shadow Layer   │  │  Wiring Layer   │  │   Core Layer    │       │  │
│ │  │  (Bilinçdışı)   │  │  (Nöro-Profil)  │  │  (Şema/Travma)  │       │  │
│ │  │                 │  │                 │  │                 │       │  │
│ │  │ - Bastırılmış   │  │ - Nöroçeşitlilik│  │ - Çekirdek Şema │       │  │
│ │  │   duygular      │  │ - İşleme stili  │  │ - Erken dönem   │       │  │
│ │  │ - Projeksiyon   │  │ - Dikkat paterni│  │   şemaları      │       │  │
│ │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘       │  │
│ │           │                    │                    │                 │  │
│ │           └────────────────────┼────────────────────┘                 │  │
│ │                                ▼                                       │  │
│ │           ┌─────────────────────────────────────┐                     │  │
│ │           │         Bağlanma Stili              │                     │  │
│ │           │   Secure / Anxious / Avoidant       │                     │  │
│ │           │         Savunma Mekanizmaları       │                     │  │
│ │           └─────────────────────────────────────┘                     │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│ Çıktı: unconscious, shadowAnalysis, schemas, attachmentStyle, defenses    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 5: BİLİŞSEL KATMAN (Cognitive Layer) - DPAE Motoru                   │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │  │
│ │  │  IQ Tahmini     │  │ Bilişsel Profil │  │   Yanlılıklar   │       │  │
│ │  │                 │  │                 │  │                 │       │  │
│ │  │ - Sözel         │  │ - Analitik vs   │  │ - Confirmation  │       │  │
│ │  │ - Uzamsal       │  │   Sezgisel      │  │ - Anchoring     │       │  │
│ │  │ - Çalışan bellek│  │ - Yakınsak vs   │  │ - Availability  │       │  │
│ │  │ - İşlem hızı    │  │   Iraksak       │  │ - Negativity    │       │  │
│ │  └─────────────────┘  └─────────────────┘  └─────────────────┘       │  │
│ │                                                                       │  │
│ │                    Problem Çözme Yaklaşımı                            │  │
│ │                    (Sistematik / Yaratıcı / Esnek)                    │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│ Çıktı: cognitiveProfile, iqEstimate, cognitiveBiases, thinkingStyle       │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 6: VAROLUŞSAL KATMAN (Existential Layer)                             │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │  │
│ │  │ Anlam Yapısı    │  │  Değer Sistemi  │  │  Yaşam Hedefleri│       │  │
│ │  │                 │  │                 │  │                 │       │  │
│ │  │ - Birincil      │  │ - Çekirdek      │  │ - Kısa vadeli   │       │  │
│ │  │   anlam kaynağı │  │   değerler      │  │ - Uzun vadeli   │       │  │
│ │  │ - Anlam katsayı │  │ - Öncelikler    │  │ - Nihai amaç    │       │  │
│ │  └─────────────────┘  └─────────────────┘  └─────────────────┘       │  │
│ │                                                                       │  │
│ │       ┌───────────────────────────────────────────────────┐           │  │
│ │       │           Maslow Kendini Gerçekleştirme           │           │  │
│ │       │                                                   │           │  │
│ │       │  Fizyolojik → Güvenlik → Sevgi → Saygınlık →     │           │  │
│ │       │                     Kendini Gerçekleştirme        │           │  │
│ │       └───────────────────────────────────────────────────┘           │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│ Çıktı: meaningStructure, values, lifeGoals, selfActualization             │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 7: ÇAPRAZ KORELASYON VE SENTEZ                                       │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │                                                                       │  │
│ │    Surface ──┐                                                        │  │
│ │              │                                                        │  │
│ │    Middle ───┼──► KORELASYON ──► TUTARSIZLIK ──► SENTEZ              │  │
│ │              │       MATRİSİ       TESPİTİ       PROFİLİ             │  │
│ │    Deep ─────┤                                                        │  │
│ │              │                                                        │  │
│ │  Cognitive ──┤    ┌─────────────────────────────────────┐             │  │
│ │              │    │  Bütünleşik Arketip Hesaplama       │             │  │
│ │ Existential ─┘    │  (12 Arketip + Gölge + Dominant)    │             │  │
│ │                   └─────────────────────────────────────┘             │  │
│ │                                                                       │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│ Çıktı: personality, correlations, contradictions, integratedArchetype     │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ AŞAMA 8: İÇERİK KÜRASYON - Estetik Küratör Ajanı                           │
│ ┌───────────────────────────────────────────────────────────────────────┐  │
│ │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │  │
│ │  │ 🎬 Film │  │ 📚 Kitap│  │ 🎵 Müzik│  │🏃Aktivite│                  │  │
│ │  │ Önerileri│  │ Önerileri│  │ Önerileri│  │ Önerileri│                  │  │
│ │  │         │  │         │  │         │  │         │                  │  │
│ │  │ Match % │  │ Match % │  │ Match % │  │ Match % │                  │  │
│ │  └─────────┘  └─────────┘  └─────────┘  └─────────┘                  │  │
│ │                                                                       │  │
│ │              Arketipe Özel Kişiselleştirilmiş Öneriler               │  │
│ └───────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────┐
                         │   FİNAL SONUÇ    │
                         │                  │
                         │ - Profil Özeti   │
                         │ - Güçlü Yönler   │
                         │ - Gelişim Alanları│
                         │ - Öneriler       │
                         │ - Risk Faktörleri│
                         └──────────────────┘
```

---

## Katman Detayları

### Katman 1: Yüzey (Surface)
**Amaç:** İlk izlenim ve kültürel bağlam tespiti

| Bileşen | Analiz Türü | Çıktı |
|---------|-------------|-------|
| Kültürel Antropolog | Hofstede boyutları | culturalMarkers |
| Demografik Çıkarım | Yaş, eğitim tahmini | demographics |
| İlk İzlenim | İletişim stili | initialImpressions |

### Katman 2: Orta (Middle)
**Amaç:** Standart kişilik modelleri analizi

| Model | Ölçüm | Skor Aralığı |
|-------|-------|--------------|
| Big Five | O, C, E, A, N | 0-100 |
| MBTI | 16 tip | 4 boyut |
| Enneagram | 9 tip + kanat | 1-9 |
| EQ | 5 bileşen | 0-100 |
| BART | Risk toleransı | 1-10 |
| Jung | 12 arketip | % dağılım |

### Katman 3: Derin (Deep)
**Amaç:** Bilinçdışı ve psikodinamik analiz

| Analiz | İçerik | Çıktı |
|--------|--------|-------|
| Gölge | Bastırılmış özellikler | shadowAnalysis |
| Şema | Erken dönem paternleri | schemas |
| Bağlanma | İlişki stili | attachmentStyle |
| Savunma | Mekanizmalar | defenseMechanisms |

### Katman 4: Bilişsel (Cognitive)
**Amaç:** Düşünce süreçleri ve IQ tahmini

| Boyut | Ölçüm | Açıklama |
|-------|-------|----------|
| IQ Tahmini | 70-145 | Dikkatli tahmin |
| Düşünce Stili | Analitik/Sezgisel | Baskın mod |
| Yanlılıklar | 7 ana yanlılık | Tespit listesi |

### Katman 5: Varoluşsal (Existential)
**Amaç:** Anlam, amaç ve kendini gerçekleştirme

| Boyut | Analiz | Çıktı |
|-------|--------|-------|
| Anlam | Kaynak ve katsayı | meaningStructure |
| Değerler | Çekirdek değerler | values |
| Maslow | 5 seviye | selfActualization |

---

## Entegrasyon Kılavuzu

### 1. Temel Kurulum

```javascript
const { NEXAIUnifiedEngine } = require('./nexai-unified-engine');

const engine = new NEXAIUnifiedEngine({
  aiProvider: 'ollama',           // 'ollama' | 'gemini' | 'openrouter'
  ollamaModel: 'llama3.2',        // Ollama model adı
  ollamaUrl: 'http://localhost:11434',
  culturalContext: 'western',     // 'western' | 'eastern' | 'african'
  language: 'tr',                 // 'tr' | 'en'
  debugMode: false
});
```

### 2. Event Listener'lar

```javascript
// Katman tamamlandığında
engine.on('layer:complete', (data) => {
  console.log(`${data.layer} katmanı tamamlandı`);
  updateProgressUI(data.layer);
});

// Hata durumunda
engine.on('analysis:error', (data) => {
  console.error('Analiz hatası:', data.error);
  showErrorNotification(data.error.message);
});

// Analiz tamamlandığında
engine.on('analysis:complete', (result) => {
  console.log(`Toplam süre: ${result.duration}ms`);
  displayResults(result);
});
```

### 3. Analizi Başlatma

```javascript
const userData = {
  messages: [
    "Genellikle yalnız kalmayı tercih ederim...",
    "Yeni fikirler keşfetmek beni heyecanlandırır...",
    "Stresli durumlarda sakin kalmaya çalışırım..."
  ],
  bartData: {
    rounds: [
      { pumps: 5, exploded: false },
      { pumps: 8, exploded: true },
      // ... 10 tur
    ]
  }
};

const result = await engine.runFullAnalysis(userData);
```

### 4. Hono/Express Entegrasyonu

```javascript
import { Hono } from 'hono';
import { NEXAIAPIHandler } from './nexai-unified-engine';

const app = new Hono();
const apiHandler = new NEXAIAPIHandler({
  aiProvider: 'ollama',
  culturalContext: 'western'
});

// Tam analiz endpoint'i
app.post('/api/protected/full-analysis', async (c) => {
  const body = await c.req.json();
  const result = await apiHandler.handleFullAnalysis({ body }, c.res);
  return c.json(result);
});

// Kademeli analiz (SSE ile)
app.post('/api/protected/progressive-analysis', async (c) => {
  const body = await c.req.json();
  
  return streamSSE(c, async (stream) => {
    await apiHandler.handleProgressiveAnalysis(
      { body },
      c.res,
      (progress) => {
        stream.writeSSE({ data: JSON.stringify(progress) });
      }
    );
  });
});
```

---

## API Referansı

### NEXAIUnifiedEngine

#### Constructor

```javascript
new NEXAIUnifiedEngine(config: EngineConfig)
```

**EngineConfig:**
| Parametre | Tip | Varsayılan | Açıklama |
|-----------|-----|------------|----------|
| aiProvider | string | 'ollama' | AI sağlayıcısı |
| ollamaModel | string | 'llama3.2' | Ollama model adı |
| ollamaUrl | string | 'http://localhost:11434' | Ollama URL |
| geminiApiKey | string | null | Gemini API anahtarı |
| culturalContext | string | 'western' | Kültürel çerçeve |
| language | string | 'tr' | Dil |
| debugMode | boolean | false | Debug modu |

#### Metodlar

| Metod | Parametre | Dönüş | Açıklama |
|-------|-----------|-------|----------|
| runFullAnalysis | userData | Promise<AnalysisResult> | Tam analiz çalıştır |
| on | event, callback | void | Event listener ekle |
| emit | event, data | void | Event tetikle |

#### Events

| Event | Data | Açıklama |
|-------|------|----------|
| analysis:start | { sessionId } | Analiz başladı |
| layer:start | { layer } | Katman başladı |
| layer:complete | { layer, results } | Katman tamamlandı |
| stage:start | { stage } | Aşama başladı |
| stage:complete | { stage } | Aşama tamamlandı |
| analysis:complete | AnalysisResult | Analiz tamamlandı |
| analysis:error | { error, state } | Hata oluştu |

---

## Örnek Kullanımlar

### Örnek 1: Basit Analiz

```javascript
const engine = new NEXAIUnifiedEngine();

const result = await engine.runFullAnalysis({
  messages: ["Yeni deneyimler yaşamaktan hoşlanırım."]
});

console.log(result.profile.personality.primary.mbtiType);
// Çıktı: "ENFP"
```

### Örnek 2: BART Testi ile Birlikte

```javascript
const userData = {
  messages: ["Risk almayı severim ama hesaplı davranırım."],
  bartData: {
    rounds: Array(10).fill(null).map((_, i) => ({
      pumps: Math.floor(Math.random() * 15),
      exploded: Math.random() > 0.7
    }))
  }
};

const result = await engine.runFullAnalysis(userData);
console.log(result.layerResults.middle.bartRisk);
// Çıktı: { score: 7, category: "Orta-Yüksek Risk", ... }
```

### Örnek 3: Progress Tracking ile

```javascript
const engine = new NEXAIUnifiedEngine({ debugMode: true });

const layers = ['SURFACE', 'MIDDLE', 'DEEP', 'COGNITIVE', 'EXISTENTIAL'];
let completedCount = 0;

engine.on('layer:complete', ({ layer }) => {
  completedCount++;
  const progress = (completedCount / layers.length) * 100;
  console.log(`İlerleme: ${progress}% - ${layer} tamamlandı`);
});

await engine.runFullAnalysis(userData);
```

---

## Sonuç Yapısı

```javascript
{
  sessionId: "session_1705678901234_abc123def",
  timestamp: "2026-01-19T15:00:00.000Z",
  duration: 5432,  // ms
  
  profile: {
    summary: {
      headline: "Keşifçi Düşünür",
      description: "...",
      keyInsights: ["...", "..."],
      uniqueCharacteristics: ["...", "..."]
    },
    personality: {
      primary: {
        dominantTrait: "Openness",
        archetype: "Sage",
        mbtiType: "INFJ",
        enneagramType: "5w4"
      },
      secondary: { ... },
      contradictions: [...]
    },
    strengths: ["...", "..."],
    growthAreas: ["...", "..."],
    correlations: [...],
    riskFactors: [...],
    integratedArchetype: { ... },
    lifeTheme: "Keşif ve Anlam Arayışı",
    recommendations: {
      personal: [...],
      professional: [...],
      relational: [...],
      spiritual: [...]
    }
  },
  
  recommendations: {
    films: [...],
    books: [...],
    music: [...],
    activities: [...]
  },
  
  layerResults: {
    surface: { ... },
    middle: { ... },
    deep: { ... },
    cognitive: { ... },
    existential: { ... }
  },
  
  metadata: {
    culturalContext: "western",
    language: "tr",
    aiProvider: "ollama"
  }
}
```

---

## Notlar

1. **AI Fallback:** Ollama → Gemini → OpenRouter sırasıyla denenir
2. **Güvenlik:** Tüm girdiler sanitize edilir (max 10K karakter)
3. **Kültürel Adaptasyon:** Sonuçlar seçilen kültürel çerçeveye göre yorumlanır
4. **IQ Tahmini:** Profesyonel test değildir, sadece tahmindir
5. **Klinik Göstergeler:** Tanı amaçlı değildir

---

**NEXAI: OMNI-PRIME v5.0**
*Dijital Ruh Küratörünüz*
