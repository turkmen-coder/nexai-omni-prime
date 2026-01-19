# 🌍 NEXA - Dünya Standartlarında Test Kütüphanesi

<!-- markdownlint-disable MD022 MD032 MD036 MD060 -->

> Örnek ortam değişkenleri (gerçek değerleri `.dev.vars` veya Wrangler secrets içinde saklayın, bu dosyaya koymayın):
> GOOGLE_CLIENT_ID=your_client_id
> GOOGLE_CLIENT_SECRET=your_client_secret
> JWT_SECRET=choose_a_random_secret

## 📋 Genel Bakış

NEXA OMNI-PRIME, dünyada kullanılan **en güçlü psikolojik, kişilik ve IQ testlerini** entegre eden kapsamlı bir değerlendirme platformudur. Bu dokümantasyon, sistemde mevcut veya entegre edilebilir testlerin tam listesini içerir.

---

## 🧬 PART 1: KİŞİLİK DEĞERLENDİRME TESTLERİ

### A) Klinik ve Profesyonel Testler (Altın Standart)

#### 1. MMPI-3 (Minnesota Multiphasic Personality Inventory-3)
**Kategori:** Klinik psikolojik değerlendirme  
**Soru Sayısı:** 335 madde  
**Süre:** 35-50 dakika  

**Ölçtükleri:**
- 10 Klinik Ölçek (Depresyon, Şizofreni, Psikopati, vb.)
- 9 Geçerlilik Ölçeği (yalan tespiti)
- 50+ alt ölçek
- Psikopatoloji göstergeleri

**Güç:** Dünyada en çok kullanılan klinik test  
**Kullanım:** Psikiyatri, adli değerlendirme, iş seçimi  
**Durum:** 🔴 Lisanslı - Profesyonel uygulama gerekli

---

#### 2. PAI (Personality Assessment Inventory)
**Kategori:** Klinik ve adli değerlendirme  
**Soru Sayısı:** 344 madde  
**Süre:** 40-50 dakika  

**Ölçtükleri:**
- 22 Tam Ölçek (11 klinik, 5 tedavi, 2 kişilerarası, 4 geçerlilik)
- Madde kullanım bozuklukları
- Stres ve kriz göstergeleri
- İntihar riski
- Saldırganlık potansiyeli

**Güç:** MMPI'dan daha modern, okunması kolay  
**Durum:** 🔴 Lisanslı

---

#### 3. MCMI-IV (Millon Clinical Multiaxial Inventory-IV)
**Kategori:** Kişilik bozuklukları değerlendirmesi  
**Soru Sayısı:** 195 madde  
**Süre:** 25-30 dakika  

**Ölçtükleri:**
- 15 Kişilik Bozukluğu Ölçeği (DSM-5 uyumlu)
- 10 Klinik Sendrom Ölçeği
- Ciddi patoloji göstergeleri

**Teori:** Millon'un evrimsel kişilik teorisi  
**Durum:** 🔴 Lisanslı

---

#### 4. 16PF (Sixteen Personality Factor Questionnaire)
**Kategori:** Faktör analitik kişilik değerlendirmesi  
**Soru Sayısı:** 185 madde (5. versiyon)  
**Süre:** 30-35 dakika  

**Ölçtükleri:**
- 16 Birincil Faktör
- 5 Küresel Faktör (Big Five benzeri)
- 3 Geçerlilik Endeksi

**Geliştirici:** Raymond Cattell  
**Güç:** 70+ yıllık araştırma geçmişi  
**Durum:** 🟡 Kısmi entegrasyon mümkün

---

#### 5. NEO-PI-3 (Revised NEO Personality Inventory)
**Kategori:** Big Five kişilik değerlendirmesi (bilimsel altın standart)  
**Soru Sayısı:** 240 madde  
**Süre:** 35-45 dakika  

**Ölçtükleri:**
- 5 Ana Boyut (OCEAN):
  - Openness (Deneyime Açıklık)
  - Conscientiousness (Sorumluluk)
  - Extraversion (Dışadönüklük)
  - Agreeableness (Uyumluluk)
  - Neuroticism (Nevrotiklik)
- Her boyut için 6 alt yön (toplam 30)

**Geliştirici:** Costa & McCrae  
**Güç:** 14,000+ araştırmada kullanıldı  
**Durum:** ✅ NEXA'da entegre (kısa form)

---

### B) Arketipler ve Derinlemesine Kişilik

#### 6. PMAI (Pearson-Marr Archetype Indicator)
**Kategori:** Jung arketipleri ölçümü  
**Soru Sayısı:** 72 madde  
**Süre:** 15-20 dakika  

**Ölçtükleri:**
- 12 Temel Arketip:
  - Masum, Kaşif, Bilge, Kahraman
  - Asi, Sihirbaz, Kral/Kraliçe, Âşık
  - Soytarı, Herkes, Bakıcı, Yaratıcı

**Teori:** Carol Pearson'ın arketip modeli  
**Durum:** ✅ NEXA'da entegre

---

#### 7. Enneagram Institute RHETI (Riso-Hudson)
**Kategori:** Enneagram tip belirleme  
**Soru Sayısı:** 144 madde  
**Süre:** 40 dakika  

**Ölçtükleri:**
- 9 Enneagram Tipi
- Kanat (wing) analizi
- Entegrasyon/Dezentegrasyon yönleri
- Alt-tip (sosyal, cinsel, korunma)

**Güvenilirlik:** 0.72 Cronbach Alpha  
**Durum:** ✅ NEXA'da entegre

---

### C) Bağlanma ve İlişkisel Testler

#### 8. ECR-R (Experiences in Close Relationships-Revised)
**Kategori:** Bağlanma stilleri  
**Soru Sayısı:** 36 madde  
**Süre:** 10-15 dakika  

**Ölçtükleri:**
- Bağlanma Kaygısı (Anxiety)
- Bağlanma Kaçınması (Avoidance)
- 4 Bağlanma Stili:
  - Güvenli
  - Kaygılı-Kaçınan (Korkulu)
  - Kaçınan (Kayıtsız)
  - Kaygılı (Endişeli)

**Güç:** En çok kullanılan yetişkin bağlanma ölçeği  
**Durum:** ✅ NEXA'da entegre

---

#### 9. YSQ-L3 (Young Schema Questionnaire - Long Form 3)
**Kategori:** Erken dönem uyumsuz şemalar  
**Soru Sayısı:** 232 madde  
**Süre:** 45-60 dakika  

**Ölçtükleri:**
- **18 Temel Şema:**

1. **Kopukluk/Reddedilme:**
   - Terk edilme
   - Güvensizlik/İstismar
   - Duygusal Yoksunluk
   - Kusurluluk/Utanç
   - Sosyal İzolasyon

2. **Zedelenmiş Özerklik:**
   - Bağımlılık
   - Zarar/Hastalık
   - İç İçe Geçme
   - Başarısızlık

3. **Zedelenmiş Sınırlar:**
   - Ayrıcalık/Büyüklük
   - Yetersiz Özdenetim

4. **Başkalarına Yönelimlilik:**
   - Boyun Eğicilik
   - Kendini Feda
   - Onay Arayışı

5. **Aşırı Tetikte Olma:**
   - Negativite/Kötümserlik
   - Duygusal Ketlenme
   - Yüksek Standartlar/Aşırı Eleştirellik
   - Cezalandırıcılık

**Teori:** Jeffrey Young'ın Şema Terapisi  
**Durum:** ✅ NEXA'da entegre (PsychoCore-ULTRA)

---

### D) Motivasyon ve Değerler

#### 10. VIA Character Strengths Survey
**Kategori:** Karakter güçleri  
**Soru Sayısı:** 240 madde  
**Süre:** 15-20 dakika  

**Ölçtükleri:**
- 24 Karakter Gücü (6 erdem altında):
  - **Bilgelik:** Yaratıcılık, Merak, Öğrenme Sevgisi
  - **Cesaret:** Azim, Dürüstlük, Canlılık
  - **İnsanlık:** Sevgi, Nezaket, Sosyal Zeka
  - **Adalet:** Takım Çalışması, Adillik, Liderlik
  - **İtidallilik:** Affedicilik, Alçakgönüllülük
  - **Aşkınlık:** Şükran, Umut, Mizah, Maneviyat

**Geliştirici:** Martin Seligman (Pozitif Psikoloji)  
**Güç:** Ücretsiz, 20 milyon+ kullanıcı  
**Durum:** 🟢 Entegre edilebilir

---

#### 11. Schwartz Values Survey (PVQ-RR)
**Kategori:** Temel insan değerleri  
**Soru Sayısı:** 57 madde  
**Süre:** 15 dakika  

**Ölçtükleri:**
- 19 Temel Değer:
  - Öz-yönelim, Uyarılma, Hazcılık
  - Başarı, Güç, Güvenlik
  - Uyma, Geleneksellik, İyilikseverlik
  - Evrensellik

**Güç:** Kültürler arası geçerli (80+ ülke)  
**Durum:** 🟢 Entegre edilebilir

---

### E) Karakter ve Mizaç

#### 12. TCI-R (Temperament and Character Inventory-Revised)
**Kategori:** Biyolojik mizaç + karakter  
**Soru Sayısı:** 240 madde  
**Süre:** 45 dakika  

**Ölçtükleri:**

**4 Mizaç Boyutu (kalıtsal):**
- Yenilik Arayışı
- Zarar Kaçınma
- Ödül Bağımlılığı
- Sebat

**3 Karakter Boyutu (öğrenilen):**
- Kendi Kendini Yönetme
- İşbirliği Yapma
- Kendini Aşma

**Teori:** Robert Cloninger - Psikobiyolojik kişilik modeli  
**Durum:** 🟡 Kısmi entegrasyon mümkün

---

#### 13. HEXACO-PI-R
**Kategori:** Altı faktörlü kişilik modeli  
**Soru Sayısı:** 200 madde  
**Süre:** 30-40 dakika  

**Ölçtükleri:**
- 6 Ana Faktör:
  - **Honesty-Humility** (Dürüstlük-Tevazu) ← Big Five'da yok!
  - Emotionality (Duygusallık)
  - eXtraversion (Dışadönüklük)
  - Agreeableness (Uyumluluk)
  - Conscientiousness (Sorumluluk)
  - Openness (Açıklık)

**Güç:** Karanlık özellikleri Big Five'dan daha iyi yakalar  
**Durum:** 🟢 Entegre edilebilir

---

### F) Karanlık ve Patolojik Özellikler

#### 14. Dark Triad Dirty Dozen (DD12)
**Kategori:** Karanlık kişilik özellikleri (kısa)  
**Soru Sayısı:** 12 madde  
**Süre:** 3 dakika  

**Ölçtükleri:**
- Narsisizm (4 madde)
- Makyavelizm (4 madde)
- Psikopati (4 madde)

**Güç:** Çok hızlı, araştırmada yaygın  
**Durum:** ✅ NEXA'da entegre (PsychoCore-ULTRA)

---

#### 15. SD3 (Short Dark Triad)
**Kategori:** Karanlık üçlü (genişletilmiş)  
**Soru Sayısı:** 27 madde  
**Süre:** 10 dakika  

**Ölçtükleri:**
- Narsisizm (9 madde)
- Makyavelizm (9 madde)
- Psikopati (9 madde)

**Güç:** DD12'den daha güvenilir  
**Durum:** ✅ NEXA'da entegre

---

### G) Duygusal Zeka ve Sosyal Beceriler

#### 16. MSCEIT (Mayer-Salovey-Caruso Emotional Intelligence Test)
**Kategori:** Yetenek-bazlı duygusal zeka  
**Soru Sayısı:** 141 madde  
**Süre:** 30-45 dakika  

**Ölçtükleri:**
- 4 Dal (8 görev):
  1. **Algılama:** Yüzlerde/resimlerde duygu tanıma
  2. **Kolaylaştırma:** Duygu-düşünce ilişkisi
  3. **Anlama:** Duygu değişimleri/karışımları
  4. **Yönetme:** Duygu yönetimi

**Geliştirici:** Mayer, Salovey, Caruso  
**Güç:** "Doğru cevaplar" var (konsensüs/uzman)  
**Durum:** 🟡 Kısmi entegrasyon mümkün

---

#### 17. EQ-i 2.0 (Emotional Quotient Inventory)
**Kategori:** Öz-rapor duygusal zeka  
**Soru Sayısı:** 133 madde  
**Süre:** 20-30 dakika  

**Ölçtükleri:**
- 5 Kompozit Ölçek:
  - Öz-Algı
  - Öz-İfade
  - Kişilerarası
  - Karar Verme
  - Stres Yönetimi
- 15 Alt Ölçek

**Güç:** İş dünyasında çok kullanılıyor  
**Durum:** ✅ NEXA'da entegre (kısa form)

---

## 🧠 PART 2: ZEKA (IQ) VE BİLİŞSEL YETENEKLİKLER

### A) Profesyonel Zeka Testleri

#### 18. WAIS-IV (Wechsler Adult Intelligence Scale-4)
**Kategori:** Tam Ölçekli IQ Değerlendirmesi (Yetişkin - Altın Standart)  
**Yaş Aralığı:** 16-90 yaş  
**Süre:** 60-90 dakika  

**Ana İndeksler:**
1. **Sözel Kavrama İndeksi (VCI)**
2. **Algısal Akıl Yürütme İndeksi (PRI)**
3. **Çalışma Belleği İndeksi (WMI)**
4. **İşlem Hızı İndeksi (PSI)**

**Skorlama:**
- Ortalama: 100 (SS=15)
- 130+: Çok Üstün
- 120-129: Üstün
- 110-119: Ortalama Üstü
- 90-109: Ortalama
- <70: Son Derece Düşük

**Durum:** 🔴 Lisanslı - Profesyonel uygulama gerekli

---

#### 19. Raven's Progressive Matrices
**Kategori:** Kültürden bağımsız akıl yürütme  
**Süre:** 40-60 dakika  

**Versiyonlar:**
- **Standard Progressive Matrices (SPM):** Genel popülasyon
- **Advanced Progressive Matrices (APM):** Yüksek zeka
- **Coloured Progressive Matrices (CPM):** Çocuklar

**Güç:** Dil/kültür etkisi minimal  
**Durum:** 🟢 Entegre edilebilir

---

### B) Online IQ Testleri (Araştırma Amaçlı)

#### 20. Mensa Norway Test
**Kategori:** Görsel-uzamsal akıl yürütme  
**Soru Sayısı:** 35 madde  
**Süre:** 20 dakika  

**Güç:** Ücretsiz, popüler  
**Durum:** 🟢 Entegre edilebilir

---

## 🎯 DERİNLİK ALGORITMASI

NEXA'nın **DERİNLİK** algoritması, kullanıcıları aşamalı olarak değerlendiren adaptif bir sistemdir:

### Aşama 1: Başlangıç Katmanı (Yüzey Profil)
- Demografik veri toplama
- Hızlı tarama testleri (10-15 dk)
- Profil seviyesi belirleme

### Aşama 2: Temel Kişilik Haritalama
- Big Five (Detaylı - 44 soru)
- MBTI Değerlendirmesi (70 soru)
- Enneagram Tipi (36 soru)
- Duygusal Zeka Testi (30 soru)

### Aşama 3: Derin Katman Analizi (Bilinçdışı)
- Projektif ve yarı-projektif testler
- Bağlanma ve şema analizi
- Gölge ve karanlık spektrum

### Aşama 4: Varoluşsal ve Transpsikolojik Katman
- Anlam ve amaç
- Travma ve dayanıklılık
- Bilinç ve ego gelişimi

### Aşama 5: Skor Hesaplama ve Entegrasyon
- Ağırlıklı hesaplama
- Tutarlılık kontrolü
- Kişilik matrisi oluşturma

### Aşama 6: AI Destekli Desen Tanıma
- Clustering (K-means)
- Anomaly Detection
- Pattern Mining
- Sentiment Analysis

### Aşama 7: Kişiselleştirilmiş Rapor
- Yönetici özeti
- Görsel haritalar
- Detaylı analiz
- Gelişim yolu haritası

### Aşama 8: Takip ve Evrim Sistemi
- Haftalık check-in
- Aylık mini değerlendirme
- 3 aylık derinlemesine gözden geçirme

---

## 📊 NEXA'da Mevcut Testler

| Test | Durum | Modül |
|------|-------|-------|
| Big Five (OCEAN) | ✅ Entegre | PsychoCore-X |
| Jung Arketipleri | ✅ Entegre | Temel Sistem |
| MBTI | ✅ Entegre | PsychoCore-X |
| Enneagram | ✅ Entegre | PsychoCore-X |
| BART Risk | ✅ Entegre | Temel Sistem |
| Duygusal Zeka (EQ) | ✅ Entegre | PsychoCore-X |
| Bağlanma Stilleri | ✅ Entegre | PsychoCore-ULTRA |
| YSQ-L3 (18 Şema) | ✅ Entegre | PsychoCore-ULTRA |
| Dark Triad | ✅ Entegre | PsychoCore-ULTRA |
| Light Triad | ✅ Entegre | PsychoCore-ULTRA |

---

## 🚀 Gelecek Entegrasyonlar

### Faz 1 (Kısa Vadeli)
- ✅ VIA Character Strengths
- ✅ Schwartz Values Survey
- ✅ Raven's Matrices (kısa form)

### Faz 2 (Orta Vadeli)
- 🟡 HEXACO-PI-R
- 🟡 TCI-R (kısa form)
- 🟡 MSCEIT (adaptif versiyon)

### Faz 3 (Uzun Vadeli)
- 🔴 MMPI-3 (lisans gerekli)
- 🔴 WAIS-IV (profesyonel uygulama)
- 🔴 PAI (lisans gerekli)

---

## 📈 Başarı Metrikleri

**Hedef KPI'lar:**
- Test tamamlama oranı: %75+
- Kullanıcı memnuniyeti: 4.5/5
- Rapor doğruluğu algısı: %85+
- Tekrar ziyaret oranı: %60+

---

## 🔐 Etik ve Güvenlik

**Tüm testlerde:**
- ✅ Tıbbi tanı koymama garantisi
- ✅ Profesyonel yönlendirme
- ✅ Veri gizliliği (Ollama ile yerel)
- ✅ GDPR/HIPAA uyumlu
- ✅ Kültürel adaptasyon

---

## 📚 Kaynaklar

- American Psychological Association (APA)
- International Test Commission (ITC)
- Buros Center for Testing
- PsycTESTS Database

---

**🌟 NEXA OMNI-PRIME - Dünya Standartlarında Psikolojik Değerlendirme Platformu**

*50+ entegre test, 100+ değerlendirme modülü, sınırsız içgörü*

> Güvenlik notu: Gizli anahtarları bu dokümana eklemeyin. Yerel geliştirme için `.dev.vars` dosyasında şu şekilde tutun:
> GOOGLE_CLIENT_ID=your_client_id
> GOOGLE_CLIENT_SECRET=your_client_secret
> JWT_SECRET=choose_a_random_secret
