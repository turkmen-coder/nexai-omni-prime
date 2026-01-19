# PsychoCore-X & PsychoCore-ULTRA Entegrasyon Rehberi

## 🧠 Genel Bakış

NEXA projesine **PsychoCore-X** ve **PsychoCore-ULTRA** adlı iki gelişmiş psikolojik analiz motoru entegre edilmiştir. Bu motorlar, kullanıcılara derin psikolojik içgörüler ve kişisel gelişim önerileri sunar.

---

## 📊 PsychoCore-X: Temel Psikolojik Analiz Motoru

### Özellikler

**PsychoCore-X**, çok modüllü psikolojik analiz ve kişisel gelişim motoru olarak tasarlanmıştır:

#### Analiz Modülleri:

1. **Jung Arketipleri & Gölge Analizi**
   - Dominant arketiplerin tespiti
   - Bastırılmış gölge yönlerinin analizi

2. **Big Five (OCEAN) Kişilik Analizi**
   - Açıklık (Openness)
   - Sorumluluk (Conscientiousness)
   - Dışadönüklük (Extraversion)
   - Uyumluluk (Agreeableness)
   - Nevrotiklik (Neuroticism)

3. **MBTI & Enneagram**
   - Bilişsel fonksiyon yığınları
   - Temel korku ve arzular

4. **Duygusal Zeka (EQ)**
   - Öz-farkındalık
   - Öz-yönetim
   - Sosyal farkındalık

5. **BART Risk Toleransı**
   - Risk alma eğilimi analizi (Düşük/Orta/Yüksek)

6. **Bilişsel Yanlılıklar**
   - Karar vermeyi etkileyen hatalı düşünce kalıpları

7. **Stres & Savunma Mekanizmaları**
   - Stres altındaki tepkiler
   - Kullanılan savunma mekanizmaları

8. **CBT (Bilişsel Davranışçı Terapi)**
   - Otomatik olumsuz düşünceleri yeniden yapılandırma egzersizleri

9. **İletişim & Bağlanma Stilleri**
   - İletişim stili: Pasif, Agresif, Pasif-Agresif, Atılgan
   - Bağlanma stili: Güvenli, Kaygılı, Kaçıngan

### API Endpoint

```http
POST /api/protected/psychocore-x
Authorization: Bearer <token>
Content-Type: application/json

{
  "userInput": "Kullanıcının metni veya anket cevapları",
  "analysisScope": "Hızlı" | "Detaylı" | "Kriz Müdahalesi",
  "culturalContext": "western" | "eastern" | "african"
}
```

### Yanıt Formatı

```json
{
  "analysis": {
    "mood_score": 75,
    "risk_tolerance": "Moderate",
    "big_five": {
      "openness": 80,
      "conscientiousness": 65,
      "extraversion": 55,
      "agreeableness": 70,
      "neuroticism": 45
    },
    "dominant_archetype": "explorer",
    "shadow_traits": ["perfectionism", "control_need"],
    "cognitive_biases": ["Confirmation Bias", "Spotlight Effect"],
    "eq_indicators": {
      "self_awareness": 75,
      "self_management": 60,
      "social_awareness": 80
    },
    "communication_style": "Assertive",
    "attachment_style": "Secure",
    "recommended_exercises": [
      {
        "type": "CBT",
        "description": "Felaketleştirme senaryosunu test etme",
        "purpose": "Olumsuz düşünceleri yeniden yapılandırma"
      }
    ],
    "insights": "Kullanıcı yüksek açıklık ve orta düzeyde sorumluluk gösteriyor...",
    "confidence": 85
  },
  "model": "ollama/llama3.2",
  "source": "ollama",
  "user": "Kullanıcı Adı",
  "requestId": "abc123"
}
```

---

## 🔬 PsychoCore-ULTRA: Derin Psikolojik Analiz Motoru

### Özellikler

**PsychoCore-ULTRA**, insan zihninin en derin katmanlarına inen gelişmiş analiz motorudur:

#### Derin Analiz Modülleri:

1. **Bilinçdışı & Psikodinamik (Shadow Layer)**
   - Gölge & Arketip (Bastırılmış özellikler)
   - Rüya & Sembol analizi (Jungian)
   - Ego Durumları (İçsel Çocuk, Ebeveyn, Yetişkin)
   - Projektif Analiz (Metaforlardan bilinçdışı okuma)

2. **Nöro-Profil & Biliş (Wiring Layer)**
   - Nörodiverjans Eğilimleri (ADHD, Otizm, HSP benzeri kalıplar)
   - Bilişsel Esneklik (Katı vs Esnek düşünce)
   - Beyin Dominansı (Analitik vs Sezgisel)

3. **Şema & Travma (Core Layer)**
   - Uyumsuz Şemalar (18 temel şema: Terk edilme, Kusurluluk, Boyun Eğicilik vb.)
   - Travma & Savunma (Dissosiyasyon, Yansıtma, Bastırma)
   - Bağlanma Döngüleri (Tekrarlayan toksik senaryolar)

4. **Karakter Analizi (Moral Layer)**
   - Karanlık Üçlü (Narsisizm, Makyavelizm, Psikopati eğilimleri)
   - Aydınlık Üçlü (Empati, Hümanizm, Dürüstlük)
   - Otantiklik (Persona vs Gerçek Benlik mesafesi)

5. **Varoluşsal & Transpersonal (Soul Layer)**
   - Anlam & Amaç (Varoluşsal kaygılar)
   - Flow & Aşkınlık (Kendini gerçekleştirme)

### API Endpoint

```http
POST /api/protected/psychocore-ultra
Authorization: Bearer <token>
Content-Type: application/json

{
  "userInput": "Kullanıcının derin içgörü gerektiren metni",
  "requestedDepth": "Yüzeysel" | "Derin" | "Klinik",
  "culturalContext": "western" | "eastern" | "african"
}
```

### Yanıt Formatı

```json
{
  "analysis": {
    "depth_analysis": {
      "shadow_layer": {
        "repressed_traits": ["anger", "vulnerability"],
        "active_archetypes": ["caregiver", "martyr"],
        "ego_states": {
          "child": 40,
          "parent": 60,
          "adult": 50
        }
      },
      "neuro_profile": {
        "neurodivergence_indicators": ["ADHD-like attention patterns", "High sensitivity"],
        "cognitive_flexibility": "Growth",
        "brain_dominance": "Balanced"
      },
      "schema_trauma": {
        "maladaptive_schemas": ["Abandonment", "Self-Sacrifice"],
        "defense_mechanisms": ["Projection", "Rationalization"],
        "attachment_patterns": ["Anxious attachment in relationships"]
      },
      "character_layer": {
        "dark_triad": {
          "narcissism": 25,
          "machiavellianism": 15,
          "psychopathy": 10
        },
        "light_triad": {
          "empathy": 85,
          "humanism": 75,
          "honesty": 80
        },
        "authenticity_gap": 35
      },
      "existential_layer": {
        "meaning_score": 60,
        "existential_anxieties": ["Isolation", "Freedom"],
        "self_actualization": 55
      }
    },
    "synthesis": "Kullanıcı yüksek empati ve fedakarlık eğilimi gösteriyor ancak terk edilme şeması aktif...",
    "therapeutic_recommendations": [
      {
        "approach": "Schema Therapy",
        "focus": "Abandonment schema",
        "exercises": ["Limited reparenting", "Imagery rescripting"]
      }
    ],
    "safety_notes": "Bu analiz tıbbi teşhis değildir. Profesyonel destek önerilir.",
    "confidence": 80
  },
  "model": "ollama/llama3.2",
  "source": "ollama",
  "user": "Kullanıcı Adı",
  "requestId": "xyz789",
  "warning": "Bu derin analiz tıbbi teşhis değildir. Profesyonel destek için bir uzmana danışın."
}
```

---

## 🔐 Güvenlik ve Etik Kurallar

### Kritik Sınırlamalar

Her iki motor da şu kurallara sıkı sıkıya uyar:

1. **Tıbbi Tanı Yasağı**
   - ❌ "Sen depresyondasın"
   - ✅ "Depresif belirtiler gösteriyor olabilirsiniz"

2. **Objektif ve Empatik Dil**
   - Yargılayıcı olmayan
   - Bilimsel ama sıcak ton

3. **Profesyonel Yönlendirme**
   - Ciddi durumlarda uzman önerisi
   - Kriz durumlarında acil yönlendirme

4. **Kültürel Adaptasyon**
   - Kullanıcının kültürel bağlamına uyum
   - Türkiye bağlamı için özel dikkat

---

## 🎯 Kullanım Senaryoları

### PsychoCore-X İçin

- ✅ Günlük ruh hali takibi
- ✅ Kişilik profilleme
- ✅ İletişim stili analizi
- ✅ Risk toleransı değerlendirmesi
- ✅ CBT egzersiz önerileri

### PsychoCore-ULTRA İçin

- ✅ Derin bilinçdışı analiz
- ✅ Şema terapi değerlendirmesi
- ✅ Travma işaretlerinin tespiti
- ✅ Varoluşsal kaygı analizi
- ✅ Karakter profilleme (Karanlık/Aydınlık Üçlü)

---

## 🔄 Mevcut Sistemle Entegrasyon

PsychoCore motorları, NEXA'nın mevcut 3 ajan sistemiyle uyumlu çalışır:

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXAI AI ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Kültürel   │  │    Gölge     │  │   Estetik    │     │
│  │  Antropolog  │  │    Avcısı    │  │   Küratör    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                 │              │
│         └─────────────────┼─────────────────┘              │
│                           │                                │
│         ┌─────────────────▼─────────────────┐              │
│         │                                   │              │
│    ┌────▼─────┐                    ┌───────▼────┐         │
│    │ PsychoCore-X │                │ PsychoCore-ULTRA │   │
│    │  (Temel)     │                │    (Derin)       │   │
│    └──────┬───────┘                └───────┬──────────┘   │
│           │                                │              │
│           └────────────────┬───────────────┘              │
│                            │                              │
│                     ┌──────▼──────┐                       │
│                     │   Ollama    │                       │
│                     │  (llama3.2) │                       │
│                     └─────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Performans ve Optimizasyon

### Ollama ile Yerel Çalıştırma

- ⚡ Düşük latency
- 🔒 Tam gizlilik
- 💰 Maliyet yok
- 🌐 Internet gerekmez

### Önerilen Modeller

- **llama3.2** - Dengeli (varsayılan)
- **llama3.2:3b** - Daha derin analiz için
- **mistral** - Hızlı yanıt için

---

## 🧪 Test Örnekleri

### PsychoCore-X Test

```bash
curl -X POST http://localhost:5173/api/protected/psychocore-x \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "İş yerinde herkes beni izliyor gibi hissediyorum, hata yapmaktan çok korkuyorum.",
    "analysisScope": "Detaylı",
    "culturalContext": "western"
  }'
```

### PsychoCore-ULTRA Test

```bash
curl -X POST http://localhost:5173/api/protected/psychocore-ultra \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "Neden hep bana muhtaç olan, sorunlu insanları buluyorum? Onları kurtarmaya çalışıyorum ama sonunda ben tükeniyorum.",
    "requestedDepth": "Derin",
    "culturalContext": "western"
  }'
```

---

## 📚 Kaynaklar

### Teorik Temeller

- **Jung**: Arketip ve Gölge Teorisi
- **Freud**: Psikodinamik Yaklaşım
- **Beck**: Bilişsel Davranışçı Terapi
- **Young**: Şema Terapi
- **Maslow**: İhtiyaçlar Hiyerarşisi ve Kendini Gerçekleştirme

### Ölçekler ve Testler

- Big Five (OCEAN) Kişilik Modeli
- MBTI (Myers-Briggs Type Indicator)
- Enneagram
- BART (Balloon Analogue Risk Task)
- Dark Triad / Light Triad

---

## ⚠️ Önemli Notlar

1. **Tıbbi Kullanım Değil**: Bu motorlar eğitim ve kişisel gelişim amaçlıdır, tıbbi teşhis aracı değildir.

2. **Profesyonel Destek**: Ciddi psikolojik sorunlar için mutlaka lisanslı bir uzmana başvurun.

3. **Veri Gizliliği**: Tüm analizler yerel olarak (Ollama ile) yapılabilir, veriler hiçbir sunucuya gönderilmez.

4. **Sürekli Gelişim**: Motorlar düzenli olarak güncellenir ve iyileştirilir.

---

## 🤝 Katkıda Bulunma

PsychoCore motorlarının geliştirilmesine katkıda bulunmak için:

1. Yeni psikolojik modüller önerin
2. Analiz doğruluğunu test edin
3. Kültürel adaptasyon önerileri sunun
4. Hata bildirin

---

**🎉 PsychoCore motorları NEXA projesine başarıyla entegre edilmiştir!**

Sorularınız için GitHub Issues kullanın.
