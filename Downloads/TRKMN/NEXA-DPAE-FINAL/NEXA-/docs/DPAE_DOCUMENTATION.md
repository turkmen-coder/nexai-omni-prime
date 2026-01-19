# 🧠 Deep-Psyche Analysis Engine (DPAE) - Dokümantasyon

## 📋 Genel Bakış

**Deep-Psyche Analysis Engine (DPAE)**, NEXA OMNI-PRIME platformunun en gelişmiş analiz motorudur. Klinik psikoloji, nöropsikoloji, bilişsel bilimler ve yüksek seviyeli zeka analizi (IQ/Cognitive Aptitude) alanlarının kesişiminde çalışan, **bütünleşik benlik matrisi** oluşturan bir sistemdir.

---

## 🎯 Özellikler

### 1. Multi-Faceted Parsing (Çok Yönlü Ayrıştırma)
DPAE, kullanıcıdan gelen verileri aşağıdaki boyutlarda ayrıştırır:
- **Big Five (OCEAN)** kişilik skorları
- **MBTI** tipi ve bilişsel fonksiyonlar
- **IQ puanları** (FSIQ, VCI, PRI, WMI, PSI)
- **Klinik göstergeler** (Depresyon, Anksiyete, Stres)

### 2. Cross-Correlation Analysis (Çapraz Korelasyon Analizi)
Farklı psikolojik boyutlar arasındaki ilişkileri tespit eder:
- Big Five ile Bağlanma Stilleri korelasyonu
- IQ ile Bilişsel Esneklik uyumu
- Şema ile Stres Tepkileri örtüşmesi
- MBTI ile Arketip eşleşmesi

### 3. Cognitive-IQ Mapping (Bilişsel-IQ Haritalama)
IQ verilerini derin bilişsel yetenekler bağlamında yorumlar:
- **Akışkan Zeka** (Fluid Intelligence)
- **Kristalize Zeka** (Crystallized Intelligence)
- **Çalışma Belleği** (Working Memory)
- **İşlem Hızı** (Processing Speed)

### 4. Shadow & Archetype Integration (Gölge ve Arketip Entegrasyonu)
Jungian analiz ile bilinçdışı dinamikleri ortaya çıkarır:
- Dominant arketip tespiti
- Shadow (Gölge) arketip analizi
- Persona-Shadow dengesi
- Entegrasyon önerileri

### 5. Pattern Recognition (Desen Tanıma)
Tekrarlayan yaşam senaryolarını ve psikolojik kalıpları tespit eder:
- **Recurring Schemas** (Tekrarlayan Şemalar)
- **Life Patterns** (Yaşam Kalıpları)
- **Trigger-Response Cycles** (Tetikleyici-Tepki Döngüleri)

### 6. Synthesis Report (Sentez Raporu)
Tüm verileri bütünleşik bir rapor haline getirir:
- **Executive Summary** (Yönetici Özeti)
- **Strengths** (Güçlü Yönler)
- **Growth Areas** (Gelişim Alanları)
- **Actionable Insights** (Somut Öneriler)
- **Professional Referral** (Profesyonel Yönlendirme)

---

## 🔬 Analiz Katmanları

DPAE, 5 ana katmanda analiz yapar:

### 1. Yüzey Katman (Surface Layer)
- Demografik bilgiler
- Temel kişilik özellikleri
- İlk izlenimler

### 2. Orta Katman (Middle Layer)
- Big Five detaylı analiz
- MBTI bilişsel fonksiyonlar
- Duygusal zeka

### 3. Derin Katman (Deep Layer)
- Bilinçdışı dinamikler
- Şema ve travma
- Bağlanma stilleri

### 4. Varoluşsal Katman (Existential Layer)
- Anlam ve amaç
- Varoluşsal kaygılar
- Kendini gerçekleştirme

### 5. Bilişsel Katman (Cognitive Layer)
- IQ ve bilişsel yetenekler
- Akışkan vs Kristalize zeka
- Çalışma belleği ve işlem hızı

---

## 📊 API Endpoint

### Endpoint Bilgileri

**URL:** `POST /api/protected/dpae`  
**Authentication:** Bearer Token (JWT)  
**Content-Type:** `application/json`

### Request Body

```json
{
  "userData": "string (required)",
  "analysisDepth": "Yüzeyel" | "Standart" | "Derin" | "Klinik-Eğilimli",
  "culturalContext": "western" | "eastern" | "african",
  "includeIQ": boolean,
  "includeClinical": boolean
}
```

### Request Parametreleri

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `userData` | string | ✅ | Kullanıcının test verileri, yanıtları veya profil özeti |
| `analysisDepth` | string | ❌ | Analiz derinliği (varsayılan: "Standart") |
| `culturalContext` | string | ❌ | Kültürel bağlam (varsayılan: "western") |
| `includeIQ` | boolean | ❌ | IQ analizi dahil edilsin mi? (varsayılan: false) |
| `includeClinical` | boolean | ❌ | Klinik göstergeler dahil edilsin mi? (varsayılan: false) |

### Response Body

```json
{
  "analysis": {
    "analysis_depth": "Standart",
    "multi_faceted_parsing": {
      "big_five": {
        "openness": 75,
        "conscientiousness": 65,
        "extraversion": 55,
        "agreeableness": 70,
        "neuroticism": 45
      },
      "mbti": {
        "type": "INFP",
        "cognitive_functions": ["Fi", "Ne", "Si", "Te"]
      },
      "iq_scores": {
        "fsiq": 120,
        "vci": 125,
        "pri": 115,
        "wmi": 118,
        "psi": 110
      },
      "clinical_indicators": {
        "depression": 35,
        "anxiety": 50,
        "stress": 60
      }
    },
    "cross_correlation": [
      {
        "dimension_1": "Big Five - Agreeableness",
        "dimension_2": "Attachment - Anxious",
        "correlation": "Negatif",
        "insight": "Düşük uyumluluk, kaygılı bağlanma ile ilişkili olabilir."
      }
    ],
    "cognitive_iq_mapping": {
      "fluid_intelligence": 85,
      "crystallized_intelligence": 90,
      "working_memory": 82,
      "processing_speed": 75,
      "cognitive_profile": "Yüksek kristalize zeka, orta-yüksek akışkan zeka profili."
    },
    "shadow_archetype": {
      "dominant_archetype": "Sage",
      "shadow_archetype": "Dogmatist",
      "persona_shadow_balance": 65,
      "integration_recommendations": [
        "Esneklik geliştirme egzersizleri",
        "Farklı bakış açılarına açık olma pratiği"
      ]
    },
    "pattern_recognition": {
      "recurring_schemas": ["Terk edilme", "Yüksek standartlar"],
      "life_patterns": ["Mükemmeliyetçilik döngüsü", "İlişkilerde mesafe koyma"],
      "trigger_response_cycles": ["Eleştiri → Geri çekilme", "Başarısızlık korkusu → Aşırı hazırlık"]
    },
    "blind_spots": [
      "Duygusal ifade eksikliği",
      "Sosyal destek ağı zayıflığı"
    ],
    "data_consistency_score": 85,
    "synthesis_report": {
      "executive_summary": "Kullanıcı, yüksek açıklık ve orta-yüksek sorumluluk gösteren, analitik düşünme yeteneği güçlü bir profil sergiliyor. Ancak kaygılı bağlanma ve terk edilme şeması, ilişkilerde zorluk yaratabilir.",
      "strengths": [
        "Yüksek bilişsel yetenekler",
        "Güçlü öğrenme kapasitesi",
        "Derin düşünme ve analiz becerisi"
      ],
      "growth_areas": [
        "Duygusal ifade ve iletişim",
        "İlişkilerde güven oluşturma",
        "Stres yönetimi ve esneklik"
      ],
      "actionable_insights": [
        "Haftalık mindfulness meditasyonu (10 dk)",
        "Şema terapi egzersizleri (terk edilme şeması için)",
        "Sosyal destek ağını genişletme (haftada 1 sosyal aktivite)"
      ],
      "professional_referral": "Kaygılı bağlanma ve terk edilme şeması için bir şema terapisti ile çalışma önerilir."
    },
    "confidence": 85
  },
  "model": "ollama/llama3.2",
  "source": "ollama",
  "user": "Kullanıcı Adı",
  "requestId": "abc123",
  "dpae_version": "1.0.0",
  "analysis_timestamp": "2026-01-19T02:45:00.000Z",
  "disclaimer": "Bu analiz eğitim ve kişisel gelişim amaçlıdır. Tıbbi teşhis değildir. Profesyonel destek için bir uzmana danışın."
}
```

---

## 🔍 Analiz Derinliği Seviyeleri

### 1. Yüzeyel (Superficial)
- **Süre:** 5-10 dakika
- **Kapsam:** Temel kişilik özellikleri
- **Kullanım:** Hızlı değerlendirme, ilk tanışma

### 2. Standart (Standard)
- **Süre:** 15-25 dakika
- **Kapsam:** Big Five, MBTI, temel arketip
- **Kullanım:** Genel kişisel gelişim, koçluk

### 3. Derin (Deep)
- **Süre:** 30-45 dakika
- **Kapsam:** Şema, bağlanma, gölge analizi
- **Kullanım:** Terapi planlaması, derin içgörü

### 4. Klinik-Eğilimli (Clinical-Oriented)
- **Süre:** 45-60 dakika
- **Kapsam:** Tüm katmanlar + klinik göstergeler
- **Kullanım:** Ön değerlendirme, profesyonel yönlendirme

---

## 🚫 Kısıtlamalar ve Etik Kurallar

### Tıbbi Tanı Yasağı
DPAE **asla** tıbbi bir tanı koymaz. Tüm analizler şu dillerle sunulur:
- ❌ "Sen depresyondasın"
- ✅ "Depresif belirtiler gösteriyor olabilirsiniz"
- ❌ "ADHD'lisin"
- ✅ "ADHD benzeri dikkat dağınıklığı örüntüleri"

### Veri Eksikliği Yönetimi
Eğer veri eksikse, analiz durdurulmaz. Eksik kısımlar **"Kör Noktalar"** (Blind Spots) olarak işaretlenir.

### Yanıt Tonu
- **Empatik** ama **bilimsel**
- **Derinlemesine** ama **anlaşılır**
- **Objektif** ama **destekleyici**

### Profesyonel Yönlendirme
Ciddi durumlarda (yüksek depresyon, travma, kriz) mutlaka profesyonel destek önerilir.

---

## 🔬 Desteklenen Testler ve Ölçekler

DPAE, aşağıdaki testlerden gelen verileri analiz edebilir:

### Kişilik Testleri
- Big Five (NEO-PI-3)
- MBTI
- Enneagram
- 16PF
- HEXACO

### Klinik Testler
- MMPI-3
- PAI
- MCMI-IV
- BDI (Beck Depression Inventory)
- BAI (Beck Anxiety Inventory)

### Bağlanma ve Şema
- ECR-R (Bağlanma Stilleri)
- YSQ-L3 (18 Erken Dönem Şema)
- RQ (Relationship Questionnaire)

### IQ ve Bilişsel Testler
- WAIS-IV
- Raven's Progressive Matrices
- WISC-V
- Stanford-Binet

### Duygusal Zeka
- MSCEIT
- EQ-i 2.0
- TEAS

### Karanlık/Aydınlık Özellikler
- Dark Triad (DD12, SD3)
- NPI (Narcissistic Personality Inventory)
- Light Triad

---

## 📈 Kullanım Senaryoları

### 1. Psikologlar ve Terapistler
**Kullanım:**
- Müşteri ön değerlendirmesi
- Terapi planlaması
- İlerleme takibi
- Çapraz doğrulama

**Örnek:**
```json
{
  "userData": "Müşteri, 3 aydır depresif belirtiler gösteriyor. Big Five: O=75, C=50, E=40, A=65, N=80. ECR-R: Kaygılı bağlanma. YSQ: Terk edilme, Kusurluluk şemaları aktif.",
  "analysisDepth": "Klinik-Eğilimli",
  "culturalContext": "western",
  "includeIQ": false,
  "includeClinical": true
}
```

### 2. Kişisel Gelişim ve Koçluk
**Kullanım:**
- Öz-farkındalık artırma
- Güçlü/zayıf yönler keşfi
- Hedef belirleme
- Gelişim yol haritası

**Örnek:**
```json
{
  "userData": "MBTI: INTJ. Big Five: O=85, C=75, E=30, A=50, N=40. Kariyer hedefi: Liderlik pozisyonu. Zorluk: Takım çalışması.",
  "analysisDepth": "Standart",
  "culturalContext": "western",
  "includeIQ": true,
  "includeClinical": false
}
```

### 3. Araştırmacılar
**Kullanım:**
- Kişilik araştırmaları
- Veri toplama ve analiz
- Korelasyon çalışmaları
- Metodoloji geliştirme

**Örnek:**
```json
{
  "userData": "Katılımcı #42: Big Five, MBTI, IQ, ECR-R verileri mevcut. Araştırma sorusu: IQ ile bağlanma stilleri korelasyonu.",
  "analysisDepth": "Derin",
  "culturalContext": "western",
  "includeIQ": true,
  "includeClinical": false
}
```

### 4. İş Dünyası ve İK
**Kullanım:**
- İşe alım değerlendirmesi
- Liderlik geliştirme
- Takım oluşturma
- Kariyer danışmanlığı

**Örnek:**
```json
{
  "userData": "Aday: MBA mezunu, 5 yıl deneyim. 16PF: Yüksek liderlik, orta takım çalışması. IQ: 125. Hedef pozisyon: Proje Yöneticisi.",
  "analysisDepth": "Standart",
  "culturalContext": "western",
  "includeIQ": true,
  "includeClinical": false
}
```

---

## 🔐 Güvenlik ve Gizlilik

### Veri İşleme
- ✅ **Ollama ile tamamen yerel** çalışma
- ✅ **Hiçbir veri sunucuya** gönderilmez
- ✅ **End-to-end şifreleme**
- ✅ **GDPR/HIPAA uyumlu**

### Kullanıcı Kontrolü
- ✅ Kullanıcı veri sahipliği
- ✅ Silme hakkı
- ✅ Anonim veri havuzu (araştırma için - opsiyonel)

---

## 📊 Performans ve Doğruluk

### Güvenilirlik Metrikleri
- **Data Consistency Score:** 0-100 (veriler arası tutarlılık)
- **Confidence Score:** 0-100 (analiz güvenilirliği)
- **Blind Spots:** Eksik veri alanları

### Doğruluk Faktörleri
- **Veri Kalitesi:** Kullanıcı yanıtlarının dürüstlüğü
- **Veri Miktarı:** Daha fazla test = daha yüksek doğruluk
- **Tutarlılık:** Çelişkili yanıtlar doğruluğu düşürür

---

## 🚀 Gelecek Geliştirmeler

### v1.1.0 (Kısa Vadeli)
- ✅ Rüya analizi entegrasyonu
- ✅ Projektif test desteği
- ✅ Görsel rapor şablonları

### v1.2.0 (Orta Vadeli)
- 🟡 Makine öğrenmesi ile desen tanıma
- 🟡 Zaman serisi analizi (evrim takibi)
- 🟡 Karşılaştırmalı norm grupları

### v2.0.0 (Uzun Vadeli)
- 🔴 Gerçek zamanlı analiz
- 🔴 Çoklu kullanıcı karşılaştırması
- 🔴 Predictive analytics (gelecek tahmini)

---

## 📚 Kaynaklar ve Teorik Temeller

### Psikoloji Teorileri
- Carl Jung - Arketip ve Gölge
- Sigmund Freud - Psikodinamik
- Aaron Beck - Bilişsel Davranışçı Terapi
- Jeffrey Young - Şema Terapi
- John Bowlby - Bağlanma Teorisi

### Bilişsel Bilimler
- Raymond Cattell - Akışkan ve Kristalize Zeka
- David Wechsler - WAIS-IV
- John Raven - Progressive Matrices

### Kişilik Modelleri
- Big Five (Costa & McCrae)
- MBTI (Myers-Briggs)
- Enneagram (Riso-Hudson)
- HEXACO (Lee & Ashton)

---

## 🎯 Sonuç

**Deep-Psyche Analysis Engine (DPAE)**, NEXA OMNI-PRIME platformunun en gelişmiş analiz motorudur. Çok boyutlu, bilimsel temelli, etik kurallara uygun ve kullanıcı dostu bir sistemdir.

**DPAE ile:**
- ✅ Bütünleşik benlik matrisi oluşturun
- ✅ Çapraz korelasyon analizleri yapın
- ✅ IQ ve bilişsel yetenekleri derinlemesine yorumlayın
- ✅ Gölge ve arketip entegrasyonu sağlayın
- ✅ Tekrarlayan yaşam kalıplarını tespit edin
- ✅ Somut gelişim önerileri alın

---

**🌟 DPAE v1.0.0 - Bütünleşik Benlik Matrisi**

*Klinik Psikoloji + Nöropsikoloji + Bilişsel Bilimler + IQ Analizi = Dünyanın En Kapsamlı Psikometrik Motoru*

---

*Son Güncelleme: 19 Ocak 2026*  
*Versiyon: 1.0.0*  
*Durum: Production Ready ✅*
