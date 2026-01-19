# 🚀 NEXA Projesi - Hızlı Başlangıç Rehberi (Ollama)

## 3 Adımda Yerel Kurulum

### 1️⃣ Ollama'yı Kurun ve Başlatın

```bash
# Linux/Mac
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# https://ollama.com/download/windows adresinden indirin

# Model indirin
ollama pull llama3.2

# Servisi başlatın
ollama serve
```

### 2️⃣ Projeyi Kurun

```bash
git clone https://github.com/turkmen-coder/NEXA-.git
cd NEXA-
npm install
```

### 3️⃣ Çalıştırın

```bash
npm run dev
```

**Tarayıcıda açın:** http://localhost:5173

---

## ✅ Başarılı Kurulum Kontrolü

Proje başlatıldıktan sonra:

1. Tarayıcıda `http://localhost:5173` açın
2. Kayıt olun veya giriş yapın
3. AI ile sohbet edin
4. Tarayıcı console'unda şunu görmelisiniz:
   ```
   AI Response from: ollama
   ```

---

## 🔧 Sorun mu Yaşıyorsunuz?

### Ollama Bağlantı Hatası

```bash
# Ollama'nın çalıştığından emin olun
ollama serve

# Başka bir terminalde test edin
curl http://localhost:11434/api/tags
```

### Model Bulunamadı

```bash
# Modeli indirin
ollama pull llama3.2

# Yüklü modelleri kontrol edin
ollama list
```

---

## 📖 Daha Fazla Bilgi

- **Detaylı Kurulum:** [OLLAMA_SETUP.md](./OLLAMA_SETUP.md)
- **Entegrasyon Detayları:** [OLLAMA_INTEGRATION_SUMMARY.md](./OLLAMA_INTEGRATION_SUMMARY.md)
- **Proje Dokümantasyonu:** [README.md](./README.md)

---

**🎉 Hepsi bu kadar! Artık NEXA projeniz yerel olarak çalışıyor!**
