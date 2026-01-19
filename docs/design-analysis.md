# Tastedive Tasarım Analizi

## Renk Paleti

### Ana Renkler
- **Koyu Mavi Header**: #283c64 (navigasyon ve üst bar)
- **Açık Mavi Hero**: #1E9DD8 / #2196F3 (ana içerik alanı, diagonal kesim)
- **Koyu Arka Plan**: #1a1a1a / #000000 (sağ taraf video/görsel alanı)
- **Beyaz Metin**: #FFFFFF (başlıklar ve önemli metinler)
- **Gri Metin**: #666666 / #999999 (açıklamalar ve ikincil metinler)

### Aksiyon Renkleri
- **Yeşil (Like)**: #4CAF50
- **Turuncu (Meh)**: #FF9800
- **Kırmızı (Dislike)**: #F44336
- **Mavi Butonlar**: #2196F3

## Tipografi

### Font Ailesi
- Sans-serif modern font (muhtemelen Roboto, Open Sans veya Inter)
- Temiz, okunabilir, profesyonel

### Hiyerarşi
- **Ana Başlık (Mr. Robot)**: ~48-56px, bold, beyaz
- **Alt Başlık (2015, 2019 • 4.3/5)**: ~16-18px, regular, açık mavi/beyaz
- **Açıklama Metni**: ~14-16px, regular, beyaz/açık gri
- **Kart Başlıkları**: ~18-20px, semi-bold
- **Kart Açıklamaları**: ~13-14px, regular

## Layout Yapısı

### Header (Navigasyon)
- **Sabit üst bar**: Koyu mavi (#283c64)
- **Logo**: Sol üst köşe
- **Arama Çubuğu**: Merkez, geniş input alanı
- **Join/Sign in**: Sağ üst
- **Kategori Menüsü**: Music, Movies, Shows, Books, Games, Podcasts, People, Places, Brands, Lists, Tastebuds, TV

### Hero Section (Ana İçerik)
- **Diagonal Split Layout**: Sol taraf mavi (#2196F3), sağ taraf koyu/video
- **Sol Panel**: 
  - Başlık, yıl, rating
  - Açıklama metni
  - İki buton: "View details" ve "Watch now"
- **Sağ Panel**: 
  - Video/görsel içerik
  - Play butonu ortada
  - Karanlık overlay

### İstatistik Kartları
- **3 kart yan yana**: Like (27.3k), Meh (1.6k), Dislike (1.3k)
- Beyaz arka plan, gölge efekti
- İkonlar üstte, sayı ortada, etiket altta

### Aksiyon Butonları
- "Save to list" ve "Write a review" butonları
- İkonlu butonlar, minimal tasarım

## Kart Tasarımı (Similar Shows)

### Grid Yapısı
- **5 sütun grid** (desktop)
- Eşit aralıklı kartlar
- Responsive: mobilde 2-3 sütun

### Kart Özellikleri
- **Poster Görsel**: 2:3 aspect ratio (film/dizi posteri)
- **Rounded Corners**: ~8-12px border-radius
- **Hover Efekti**: Scale transform, gölge artışı
- **Alt Bilgi Alanı**:
  - Kategori badge (SHOWS)
  - Başlık (bold)
  - Yıl
  - Açıklama (2-3 satır, ellipsis)
- **Aksiyon İkonları**: Like, Meh, Dislike (alt kısımda)

### Kart Gölgesi
- box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- Hover: 0 8px 24px rgba(0,0,0,0.25)

## Bileşenler

### Arama Çubuğu
- Geniş, merkezi input
- Placeholder: "Find something great"
- Arama ikonu sağda
- Beyaz arka plan, subtle border

### Butonlar
- **Primary**: Mavi arka plan, beyaz metin, rounded
- **Secondary**: Beyaz arka plan, mavi border, mavi metin
- **Icon Buttons**: Sadece ikon, transparent arka plan
- Padding: 12px 24px
- Border-radius: 6-8px

### Badges
- **Kategori Badge**: Küçük, uppercase, renkli arka plan
- Örnek: "SHOWS" - yeşil/mavi arka plan

### Filter Dropdown
- "Filter by: Genre" dropdown
- Sağ üstte konumlandırılmış

## Animasyonlar ve Etkileşimler

### Hover Efektleri
- **Kartlar**: Scale(1.05), gölge artışı, smooth transition
- **Butonlar**: Renk değişimi, hafif scale
- **Linkler**: Underline, renk değişimi

### Transition Süreleri
- 0.3s ease-in-out (genel)
- 0.2s ease (hızlı etkileşimler)

## Responsive Tasarım

### Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Mobile Adaptasyonlar
- Hero section: Stack layout (üst-alt)
- Grid: 2 sütun veya 1 sütun
- Navigasyon: Hamburger menü
- Font boyutları: %80-90 oranında küçültme

## Boşluk Sistemi (Spacing)

### Padding/Margin Değerleri
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px
- **3XL**: 64px

### Container
- Max-width: 1400px
- Padding: 0 24px (desktop), 0 16px (mobile)

## Özel Özellikler

### Diagonal Split
- CSS clip-path veya transform: skew kullanımı
- Sol panel mavi, sağ panel koyu
- Dinamik açı: ~15-20 derece

### Video Player
- Karanlık overlay
- Merkezi play butonu
- Hover efekti: Opacity değişimi

### İstatistik Gösterimi
- Büyük sayılar (27.3k formatında)
- İkonlu gösterim
- Renkli kategorilere göre

## Erişilebilirlik

- Yüksek kontrast oranları
- Tıklanabilir alanlar: min 44x44px
- Keyboard navigasyon desteği
- ARIA etiketleri
- Alt metinler

## Performans Optimizasyonları

- Lazy loading (görseller)
- Responsive images
- CSS Grid/Flexbox (modern layout)
- Minimal JavaScript
- CDN kullanımı (görseller için)


## Detaylı Kart Analizi (Ekran Görüntüsü 2)

### Kart Grid Yapısı
- **6 sütun grid** görünümü (desktop için)
- Her kart eşit genişlikte
- Kartlar arası boşluk: ~16-20px
- Responsive: Tablet 3-4 sütun, mobil 2 sütun

### Kart İçerik Katmanları

#### 1. Görsel Katman (Poster)
- **Aspect Ratio**: 2:3 (standart film/dizi posteri)
- **Border Radius**: 8-12px (yuvarlatılmış köşeler)
- **Overlay**: Hover durumunda koyu overlay (rgba(0,0,0,0.3))
- **Poster Kalitesi**: Yüksek çözünürlük, profesyonel görseller

#### 2. Etkileşim Katmanı (Hover State)
Kartların üzerine gelindiğinde görünen öğeler:
- **Alt kısım overlay**: Beyaz/açık gri arka plan
- **3 aksiyon butonu**: Like (yeşil), Meh (pembe/mor), Dislike (kırmızı)
- **Buton tasarımı**: 
  - Yuvarlak/kare ikonlar
  - Renkli arka plan
  - İkon + sayı gösterimi
  - Hover efekti: Scale ve renk değişimi

#### 3. Bilgi Katmanı (Alt Kısım)
- **Kategori Badge**: "SHOWS" - mavi/turkuaz renk, uppercase
- **Başlık**: Bold, ~18px, siyah
- **Yıl**: Regular, ~14px, gri (#666)
- **Açıklama**: 2-3 satır, ellipsis ile kesme, ~13px, açık gri

### İstatistik Butonları (Like/Meh/Dislike)

#### Like Butonu
- **Renk**: Yeşil (#4CAF50 veya benzeri)
- **İkon**: Kalp veya thumbs up
- **Sayı**: 27.3k formatında (k ile kısaltma)

#### Meh Butonu
- **Renk**: Pembe/Mor (#E91E63 veya #9C27B0)
- **İkon**: Düz yüz veya nötr emoji
- **Sayı**: 1.6k

#### Dislike Butonu
- **Renk**: Kırmızı (#F44336)
- **İkon**: Thumbs down veya X işareti
- **Sayı**: 1.3k

### Aksiyon Butonları (Üst Kısım)

#### Save to List
- **Stil**: Outline button (beyaz arka plan, gri border)
- **İkon**: Bookmark veya liste ikonu
- **Dropdown**: Liste seçimi için açılır menü
- **Padding**: 10px 20px

#### Write a Review
- **Stil**: Outline button
- **İkon**: Yıldız veya kalem ikonu
- **Hover**: Mavi border ve metin rengi

### Filter Dropdown

#### Tasarım
- **Konum**: Sağ üst, "Similar shows" başlığı hizasında
- **Label**: "Filter by:" metni
- **Dropdown**: "Genre" seçeneği
- **Stil**: Minimal, ok işareti ile
- **Renk**: Siyah metin, beyaz arka plan

### Öneri Metni

#### Yapı
- "If you like **Mr. Robot**, you might also like: **The Blacklist**, **Quantico**, and **Sense8**"
- Ana içerik bold
- Önerilen içerikler bold ve tıklanabilir link
- Font: ~16px, regular

## Animasyon Detayları

### Kart Hover Animasyonu
```css
.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Buton Hover Animasyonu
```css
.action-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}
```

### Like/Meh/Dislike Butonları Hover
```css
.like-button:hover {
  background-color: #45a049; /* Koyu yeşil */
  transform: scale(1.1);
}

.meh-button:hover {
  background-color: #d81b60; /* Koyu pembe */
  transform: scale(1.1);
}

.dislike-button:hover {
  background-color: #e53935; /* Koyu kırmızı */
  transform: scale(1.1);
}
```

## Responsive Breakpoints

### Desktop (1200px+)
- 6 sütun grid
- Tam boyut kartlar
- Tüm hover efektleri aktif

### Tablet (768px - 1199px)
- 3-4 sütun grid
- Orta boyut kartlar
- Hover efektleri aktif

### Mobile (< 768px)
- 2 sütun grid (veya 1 sütun)
- Küçük kartlar
- Touch-friendly butonlar
- Hover yerine tap etkileşimi

## Cookie Banner

### Tasarım
- **Konum**: Alt kısım, sabit (fixed)
- **Arka Plan**: Beyaz
- **Gölge**: 0 -4px 12px rgba(0,0,0,0.1)
- **Butonlar**: 
  - "Cookies Settings" - outline
  - "Reject All" - outline
  - "Accept All Cookies" - primary (mavi arka plan)
- **Metin**: ~13px, gri
- **Padding**: 20px 24px

## Özel CSS Özellikleri

### Gradient Efektleri
- Hero section: Linear gradient overlay
- Kartlar: Subtle gradient on hover

### Box Shadow Sistemi
- **Level 1**: 0 2px 4px rgba(0,0,0,0.1) - Minimal
- **Level 2**: 0 4px 12px rgba(0,0,0,0.15) - Normal
- **Level 3**: 0 8px 24px rgba(0,0,0,0.2) - Hover
- **Level 4**: 0 12px 32px rgba(0,0,0,0.25) - Active/Focus

### Border Radius Sistemi
- **Small**: 4px - Badges, küçük butonlar
- **Medium**: 8px - Kartlar, input alanları
- **Large**: 12px - Modal, büyük kartlar
- **XLarge**: 16px - Hero section elemanları
