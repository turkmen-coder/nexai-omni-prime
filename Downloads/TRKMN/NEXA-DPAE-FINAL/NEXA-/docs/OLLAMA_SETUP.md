# NEXA Projesi - Ollama Yerel Kurulum Rehberi

Bu rehber, NEXA projesini Ollama ile yerel olarak çalıştırmak için gerekli adımları içerir.

## 📋 Gereksinimler

- Node.js 18+ 
- pnpm veya npm
- Ollama (yerel AI modeli çalıştırmak için)

## 🚀 Kurulum Adımları

### 1. Ollama Kurulumu

#### Linux/Mac:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### Windows:
[Ollama Windows İndirme Sayfası](https://ollama.com/download/windows) üzerinden indirip kurun.

### 2. Ollama Modelini İndirin ve Eğitin (NEXAI PERSONA)

Proje artık özel bir **NEXAI** modeli kullanmaktadır. Bu modeli oluşturmak için şu adımları izleyin:

1. Önce temel modeli indirin:
```bash
ollama pull llama3.2
```

2. Proje dizinindeki `nexai.Modelfile` dosyasını kullanarak yerel NEXAI modelinizi oluşturun:
```bash
ollama create nexai -f nexai.Modelfile
```

Bu işlemden sonra Ollama, NEXAI OMNI-PRIME kişiliğiyle cevap verecek şekilde yapılandırılmış olacaktır.

**Alternatif Modeller (Gerekirse):**
```bash
# Daha küçük model (hızlı)
ollama pull llama3.2:1b

# Daha büyük model (daha iyi sonuçlar)
ollama pull llama3.2:3b

# Türkçe için optimize edilmiş
ollama pull gemma2:2b

# Diğer popüler modeller
ollama pull mistral
ollama pull phi3
```

### 3. Ollama Servisini Başlatın

```bash
ollama serve
```

Ollama varsayılan olarak `http://localhost:11434` adresinde çalışır.

### 4. Proje Bağımlılıklarını Kurun

```bash
cd NEXA-
pnpm install
# veya
npm install
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
pnpm dev
# veya
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## ⚙️ Yapılandırma

### Model Değiştirme

`src/index.tsx` dosyasında `AI_CONFIG.OLLAMA.models` bölümünü düzenleyin:

```typescript
OLLAMA: {
  baseUrl: 'http://localhost:11434/api',
  models: {
    pro: 'llama3.2',        // Burası değiştirilebilir
    flash: 'llama3.2',      // Burası değiştirilebilir
    thinking: 'llama3.2'    // Burası değiştirilebilir
  },
  temperature: { logic: 0.1, creative: 0.8, analysis: 0.3 }
}
```

### Ollama Portunu Değiştirme

Eğer Ollama farklı bir portta çalışıyorsa:

```typescript
OLLAMA: {
  baseUrl: 'http://localhost:YENI_PORT/api',
  // ...
}
```

## 🔄 AI Öncelik Sırası

Proje şu sırayla AI servislerini dener:

1. **Ollama** (Yerel) - Öncelikli
2. **Google Gemini** (API Key gerekli) - Yedek
3. **OpenRouter** (API Key gerekli) - Son yedek

Ollama çalışmazsa otomatik olarak diğer servislere geçer.

## 🧪 Test Etme

### Ollama Servisini Test Edin:

```bash
curl http://localhost:11434/api/tags
```

Çıktı, yüklü modelleri göstermelidir.

### Model ile Chat Testi:

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    {
      "role": "user",
      "content": "Merhaba, nasılsın?"
    }
  ],
  "stream": false
}'
```

## 📊 Performans İpuçları

### GPU Kullanımı
Ollama otomatik olarak NVIDIA GPU'yu algılar ve kullanır. CPU'da da çalışır ancak daha yavaştır.

### Bellek Kullanımı
- `llama3.2:1b` → ~1GB RAM
- `llama3.2` → ~4GB RAM
- `llama3.2:3b` → ~6GB RAM

### Hız Optimizasyonu
```bash
# Daha hızlı yanıt için context boyutunu azaltın
ollama run llama3.2 --num-ctx 2048
```

## 🐛 Sorun Giderme

### Ollama Bağlantı Hatası

**Hata:** `Failed to connect to Ollama`

**Çözüm:**
1. Ollama servisinin çalıştığından emin olun: `ollama serve`
2. Port'un doğru olduğunu kontrol edin
3. Firewall ayarlarını kontrol edin

### Model Bulunamadı

**Hata:** `model 'llama3.2' not found`

**Çözüm:**
```bash
ollama pull llama3.2
```

### Yavaş Yanıt

**Çözüm:**
- Daha küçük bir model kullanın (`llama3.2:1b`)
- GPU kullanın
- `num_predict` değerini azaltın

## 🌐 Üretim Ortamı

Üretim ortamında Ollama kullanmak için:

1. Ollama'yı sunucuya kurun
2. `AI_CONFIG.OLLAMA.baseUrl` değerini sunucu adresine güncelleyin
3. Güvenlik için API authentication ekleyin

```typescript
OLLAMA: {
  baseUrl: 'https://your-ollama-server.com/api',
  // ...
}
```

## 📚 Ek Kaynaklar

- [Ollama Resmi Dokümantasyonu](https://github.com/ollama/ollama)
- [Ollama Model Kütüphanesi](https://ollama.com/library)
- [NEXA Proje Dokümantasyonu](./README.md)

## 🤝 Katkıda Bulunma

Sorun bildirmek veya öneride bulunmak için GitHub Issues kullanın.

---

**Not:** Bu proje artık tamamen yerel olarak, internet bağlantısı olmadan çalışabilir! 🎉
