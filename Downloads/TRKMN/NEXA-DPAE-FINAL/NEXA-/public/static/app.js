// ============================================
// NEXAI: OMNI-PRIME v4.4
// Dijital Ruh Küratörü - With Authentication, i18n & Enhanced UI/UX
// Frontend Application
// Modern Design Principles | CSS Grid/Flexbox | Accessibility
// Performance Optimizations & Memory Leak Fixes
// ============================================

// ============================================
// CHART INSTANCE MANAGEMENT (Memory Leak Prevention)
// ============================================
const chartInstances = new Map();

function destroyChart(chartId) {
  if (chartInstances.has(chartId)) {
    chartInstances.get(chartId).destroy();
    chartInstances.delete(chartId);
  }
}

function createChart(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  
  // Destroy existing chart to prevent memory leak
  destroyChart(canvasId);
  
  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, config);
  chartInstances.set(canvasId, chart);
  return chart;
}

// Cleanup all charts on page unload
window.addEventListener('beforeunload', () => {
  chartInstances.forEach((chart, id) => {
    chart.destroy();
  });
  chartInstances.clear();
});

// ============================================
// NETWORK STATUS DETECTION
// ============================================
let isOnline = navigator.onLine;

function updateOnlineStatus() {
  isOnline = navigator.onLine;
  if (!isOnline) {
    showNotification(t('offlineWarning'), 'warning');
  } else {
    showNotification(t('onlineRestored'), 'success');
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Enhanced fetch wrapper with retry logic
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  if (!isOnline) {
    throw new Error(t('offlineError'));
  }
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok && response.status >= 500 && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        continue;
      }
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
}

// ============================================
// PERFORMANCE: Debounce & Throttle Utilities
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// INTERNATIONALIZATION (i18n)
// ============================================
const translations = {
  tr: {
    // General
    appName: 'NEXAI',
    appTagline: 'Dijital Ruh Küratörü',
    poweredBy: 'Google Gemini ile güçlendirilmiş',
    
    // Navigation
    navChat: 'Sohbet',
    navBART: 'BART Risk Testi',
    navProfile: 'Psikolojik Profil',
    navDeepAnalysis: 'Çok Katmanlı Analiz',
    navDPAE: 'DPAE | DERİNLİK',
    navPsychoCore: 'PsychoCore-X',
    navDashboard: 'Panel',
    dashboardTitle: 'NEXAI Psikolojik Panel',
    dashboardDesc: 'Zihninizin derinliklerine inen tüm analiz motorlarına buradan erişin.',
    startDPAE: 'DPAE Analizini Başlat',
    startBART: 'BART Testini Yap',
    startDeep: '3 Katmanlı Analiz',
    startPsycho: 'PsychoCore-X Analizi',
    navCuration: 'İçerik Kürasyon',
    navSettings: 'Ayarlar',
    
    // Dashboard Cards
    dpaeTitle: 'DPAE Motoru',
    dpaeDesc: 'Derin-Ruh Analiz Motoru: Radar görselleştirmeli 8 aşamalı psikolojik batarya.',
    psychoTitle: 'PsychoCore-X',
    psychoDesc: 'Çok modüllü arketipler ve bilişsel yanlılık tespiti kullanan gelişmiş analitik motor.',
    bartTitleCard: 'BART Risk Analitiği',
    bartDescCard: 'Nörolojik risk tolerans seviyelerinizi ölçmek için Balon Analojik Risk Görevi.',
    ultraTitle: 'PsychoCore-ULTRA',
    ultraDesc: 'Derinlik Psikolojisi, Nöropsikoloji ve Varoluşçu Felsefenin nihai sentezi. Tam DPAE profilinden sonra açılır.',
    ultraLocked: 'Kilitli: Önce DPAE\'yi Tamamlayın',
    ultraStart: 'ULTRA ANALİZİ BAŞLAT',
    ultraViewTitle: 'PsychoCore-ULTRA: Nihai Sentez',
    ultraViewDesc: 'DPAE profiliniz üzerinden derin psikolojik, nörolojik ve varoluşsal bir analiz gerçekleştirin.',
    ultraInputLabel: 'Varoluşsal soru veya sorununuzu girin:',
    ultraPlaceholder: 'Örn: Hayatımın anlamını sorgulamaya başladım...',
    ultraRunBtn: 'ULTRA ANALİZ ÇALIŞTIR',
    ultraRunning: 'DERİN ANALİZ YAPILIYOR...',
    ultraCompleted: 'ULTRA Analizi Tamamlandı!',
    premiumModule: 'PREMİUM MODÜL',
    
    // PsychoCore View
    psychoViewTitle: 'PsychoCore-X',
    psychoViewDesc: 'Gelişmiş analitik motor ile metin üzerinden derin psikolojik profil oluşturun.',
    psychoInputLabel: 'Analiz için metin girin (Günlük, düşünce, rüya vb.):',
    psychoPlaceholder: 'Buraya yazın...',
    psychoScopeLabel: 'Analiz Kapsamı:',
    psychoContextLabel: 'Kültürel Bağlam:',
    psychoRunBtn: 'ANALİZİ ÇALIŞTIR',
    psychoRunning: 'ANALİZ EDİLİYOR...',
    psychoScopeFast: 'Hızlı (Genel Bakış)',
    psychoScopeDetailed: 'Detaylı (Derinlemesine)',
    psychoScopeCrisis: 'Kriz Müdahalesi (Duygusal)',
    psychoContextWestern: 'Batılı (Western)',
    psychoContextEastern: 'Doğulu (Anadolu/Eastern)',
    
    // PsychoCore Results
    psychoResultTitle: 'Analiz Çıktısı',
    psychoConfidenceScore: 'Güven Skoru',
    psychoRiskTolerance: 'Risk Toleransı',
    psychoRiskLow: 'Düşük',
    psychoRiskMedium: 'Orta',
    psychoRiskHigh: 'Yüksek',
    psychoSecure: 'Güvenli',
    psychoInsights: 'Temel İçgörüler',
    psychoNoInsights: 'Henüz bir içgörü üretilmedi.',
    psychoShadowTraits: 'Gölge Yönler',
    psychoCognitiveBiases: 'Bilişsel Yanlılıklar',
    psychoRecommendedExercises: 'Önerilen Egzersizler',
    psychoNotDetermined: 'Belirlenemedi',
    
    // DPAE View
    dpaeHeroTitle: 'Deep-Psyche Analysis Engine',
    dpaeHeroDesc: 'DERİNLİK algoritması ile 8 aşamalı bütünüyle entegre benlik analizi. Bilimsel metrikler, Jungian arketip teorisi ve gelişmiş gölge analizi bir arada.',
    dpaeStartBtn: 'ANALİZİ BAŞLAT',
    dpaeNewBtn: 'YENİ ANALİZ',
    dpaeDownloadBtn: 'RAPORU İNDİR',
    dpaeStatusActive: 'Şu an çalışılıyor...',
    dpaeStatusDone: 'Analiz tamamlandı',
    dpaeStatusPending: 'Sıradaki aşama',
    dpaeStage1: 'Başlangıç Katmanı',
    dpaeStage2: 'Temel Kişilik Haritalama',
    dpaeStage3: 'Derin Katman Analizi',
    dpaeStage4: 'Varoluşsal Katman',
    dpaeStage5: 'Skor Hesaplama',
    dpaeStage6: 'Desen Tanıma',
    dpaeStage7: 'Kişiselleştirilmiş Rapor',
    dpaeStage8: 'Takip & Evrim',
    
    // DPAE Questionnaire
    dpaeQuestionnaireTitle: 'Aşama 2: Kişilik Haritalama',
    dpaeProgress: 'İlerleme',
    dpaeStronglyAgree: 'Kesinlikle Katılıyorum',
    dpaeAgree: 'Katılıyorum',
    dpaeNeutral: 'Kararsızım',
    dpaeDisagree: 'Katılmıyorum',
    dpaeStronglyDisagree: 'Kesinlikle Katılmıyorum',
    dpaeCompleted: 'DPAE Analizi Tamamlandı!',
    dpaeError: 'Analiz sırasında bir hata oluştu.',
    dpaeUnexpectedError: 'Beklenmedik bir hata oluştu.',
    dpaeQ1: 'Genellikle partilerin neşe kaynağıyımdır.',
    dpaeQ2: 'Diğer insanların duygularıyla samimi şekilde ilgilenirim.',
    dpaeQ3: 'Her zaman hazırlıklı ve düzenliyimdir.',
    dpaeQ4: 'Kolayca stres olur ve endişelenirim.',
    dpaeQ5: 'Hayal gücü çok kuvvetli biriyimdir.',
    dpaeQ6: 'Görüşlerimi ifade ederken rahattırım.',
    dpaeQ7: 'İnsanları kırmaktan çekinirim.',
    dpaeQ8: 'Verdiğim sözleri ne pahasına olursa olsun tutarım.',
    dpaeQ9: 'Ruh halim sık sık değişir.',
    dpaeQ10: 'Yeni ve sıradışı deneyimleri severim.',
    dpaeBig5Openness: 'Açıklık',
    dpaeBig5Conscientiousness: 'Sorumluluk',
    dpaeBig5Extraversion: 'Dışadönüklük',
    dpaeBig5Agreeableness: 'Uyumluluk',
    dpaeBig5Neuroticism: 'Nevrotiklik',
    dpaePersonalityProfile: 'Kişilik Profili',
    dpaeDominantArchetype: 'Dominant Arketip',
    dpaeShadowArchetype: 'Gölge Arketip',
    dpaeAttachmentStyle: 'Bağlanma Stili',
    dpaeBig5Chart: 'Big Five Kişilik Özellikleri',
    dpaeArchetypeDesc: 'Arketip Açıklaması',
    dpaeShadowAnalysis: 'Gölge Analizi',
    dpaePersonalGrowth: 'Kişisel Gelişim Alanları',
    dpaeRecommendations: 'Öneriler',
    dpaeBig5ChartTitle: 'Big Five (OCEAN) Profili',
    dpaeShadowManifestations: 'Gölge Manifestasyonları',
    dpaeIntegrationPath: 'Entegrasyon Yolu',
    dpaeIntensity: 'Yoğunluk',
    dpaeUnconsciousPattern: 'Bilinçdışı Kalıp',
    dpaeEvidence: 'Veri seti üzerinde tespit edilen kanıt.',
    
    // Network Status
    offlineWarning: 'Çevrimdışısınız. Bazı özellikler çalışmayabilir.',
    onlineRestored: 'Bağlantı yeniden kuruldu.',
    offlineError: 'Çevrimdışı olduğunuz için bu işlem yapılamıyor.',
    retryError: 'İşlem başarısız oldu. Lütfen tekrar deneyin.',
    
    // Headers
    headerChat: 'Bilişsel Sohbet',
    headerBART: 'BART Risk Değerlendirmesi',
    headerProfile: 'Psikolojik Profil',
    headerDeepAnalysis: 'Çok Katmanlı Analiz',
    headerDPAE: 'Deep-Psyche Analysis Engine',
    headerCuration: 'İçerik Kürasyon',
    headerSettings: 'Ayarlar',
    
    // Auth
    loginRequired: 'Giriş Yapmanız Gerekiyor',
    loginRequiredDesc: 'NEXAI\'nin tüm özelliklerini kullanmak için lütfen giriş yapın veya ücretsiz hesap oluşturun.',
    featuresTitle: 'Erişeceğiniz Özellikler',
    featureAI: 'Yapay Zeka Destekli Psikolojik Analiz',
    featureJung: 'Jung Arketipleri ve Gölge Analizi',
    featureBART: 'BART Risk Toleransı Testi',
    featureCuration: 'Kişiselleştirilmiş İçerik Önerileri',
    featureCultural: 'Kültürel Bağlam Adaptasyonu',
    loginButton: 'Giriş Yap / Kayıt Ol',
    orText: 'veya',
    securityBadge: '256-bit SSL şifreleme ile güvende',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'Email',
    password: 'Şifre',
    name: 'İsim',
    passwordHint: 'En az 8 karakter, büyük/küçük harf ve rakam',
    emailPlaceholder: 'ornek@email.com',
    namePlaceholder: 'İsminiz',
    passwordPlaceholder: 'En az 8 karakter',
    loginWith: 'ile Giriş',
    logout: 'Çıkış Yap',
    loggedInWith: 'ile giriş',
    saveDataHint: 'Verilerini kaydetmek için giriş yap',
    minCharWarning: 'Lütfen analiz için en az 20 karakterlik bir metin girin.',
    analysisError: 'Analiz sırasında bir hata oluştu.',
    connectionError: 'Bağlantı hatası',
    accountCreated: 'Hesabın oluşturuldu, hoş geldin',
    
    // Chat
    welcomeTitle: 'Dijital Ruh Küratörünüz',
    welcomeDesc: 'Ben NEXAI, Google Gemini ile güçlendirilmiş kültürel bağlam duyarlı bilişsel analiz sisteminizim. Benimle düşüncelerinizi, duygularınızı ve hedeflerinizi paylaşın.',
    welcomeUser: 'Hoş geldin',
    inputPlaceholder: 'Düşüncelerinizi yazın...',
    thinking: 'Gemini düşünüyor...',
    
    // Quick Actions
    quickPersonality: 'Kişilik Analizi',
    quickStrengths: 'Güçlü Yönlerim',
    quickShadow: 'Gölge Analizi',
    quickRiskTest: 'Risk Testi',
    quickPersonalityMsg: 'Kendimi tanımak istiyorum.',
    quickStrengthsMsg: 'Güçlü ve zayıf yönlerimi keşfetmek istiyorum.',
    quickShadowMsg: 'Bilinçaltımdaki gizli korkularımı ve gölgelerimi anlamak istiyorum.',
    
    // BART
    bartTitle: 'Balon Analojik Risk Görevi',
    bartDesc: 'Bu test risk alma eğiliminizi ölçer. Her turda balonu şişirin ve patlama riskini göze alarak puan kazanın veya güvenli bir şekilde biriktirin.',
    bartPump: 'Şişir',
    bartCollect: 'Topla',
    bartRound: 'Tur',
    bartPumps: 'Pompa',
    bartScore: 'Puan',
    bartExploded: 'Patladı!',
    bartCollected: 'Toplandı!',
    bartResults: 'Sonuçlar',
    bartAvgPumps: 'Ortalama Pompa',
    bartTotalScore: 'Toplam Puan',
    bartExplosions: 'Patlama',
    bartRiskLevel: 'Risk Seviyesi',
    bartSave: 'Sonuçları Kaydet',
    bartReset: 'Yeniden Başla',
    
    // Profile
    profileGenerate: 'Profil Oluştur',
    profileGenerating: 'Profil oluşturuluyor...',
    profileDesc: 'Konuşmalarınız ve BART testi sonuçlarınıza göre psikolojik profilinizi oluşturun.',
    profileBigFive: 'Big Five (OCEAN)',
    profileArchetype: 'Baskın Arketip',
    profileShadow: 'Gölge Arketip',
    profileInsights: 'Önemli Bulgular',
    profileGrowth: 'Gelişim Alanları',
    
    // Deep Analysis
    deepAnalysisRun: 'Derin Analiz Başlat',
    deepAnalysisRunning: 'Analiz yapılıyor...',
    deepAnalysisDesc: '3 yapay zeka ajanı kullanarak kapsamlı bir psikolojik analiz gerçekleştirin.',
    agentCultural: 'Kültürel Antropolog',
    agentShadow: 'Gölge Avcısı',
    agentCurator: 'Estetik Küratör',
    
    // Curation
    curationGenerate: 'Öneri Oluştur',
    curationGenerating: 'Öneriler oluşturuluyor...',
    curationDesc: 'Arketipinize ve kültürel bağlamınıza göre kişiselleştirilmiş içerik önerileri alın.',
    curationFilms: 'Filmler',
    curationBooks: 'Kitaplar',
    curationMusic: 'Müzik',
    curationActivities: 'Aktiviteler',
    curationWeeklyPlan: 'Haftalık Plan',
    
    // Settings
    settingsCultural: 'Kültürel Bağlam',
    settingsCulturalDesc: 'Psikolojik analizlerin kültürel çerçevesini seçin.',
    settingsWestern: 'Batı',
    settingsEastern: 'Doğu',
    settingsAfrican: 'Afrika',
    settingsLanguage: 'Dil',
    settingsLanguageDesc: 'Arayüz dilini seçin.',
    settingsData: 'Veri Yönetimi',
    settingsExport: 'Verileri Dışa Aktar',
    settingsClear: 'Tüm Verileri Sil',
    settingsCulture: 'Kültürel Bağlam',
    settingsCultureDesc: 'Psikolojik analizlerin kültürel çerçevesini seçin.',
    settingsDataManagement: 'Veri Yönetimi',
    settingsChatHistory: 'Sohbet Geçmişi',
    settingsMessages: 'mesaj',
    settingsBARTResults: 'BART Test Sonuçları',
    settingsAvailable: 'Mevcut',
    settingsNotAvailable: 'Yok',
    settingsRisk: 'Risk',
    settingsClearAll: 'Tüm Verileri Sil',
    sidebarAria: 'Ana menü',
    mainContentAria: 'Ana içerik',
    loading: 'Yükleniyor',
    settingsAbout: 'Hakkında',
    settingsVersion: 'Sürüm',
    settingsLicense: 'Lisans',
    settingsDisclaimer: 'Bu uygulama deneysel amaçlıdır ve profesyonel psikolojik tavsiye yerine geçmez.',
    
    // Chat view
    welcomeDescription: 'Ben NEXAI, Google Gemini ile güçlendirilmiş kültürel bağlam duyarlı bilişsel analiz sisteminizim. Benimle düşüncelerinizi, duygularınızı ve hedeflerinizi paylaşın.',
    personalityAnalysis: 'Kişilik Analizi',
    myStrengths: 'Güçlü Yönlerim',
    shadowAnalysis: 'Gölge Analizi',
    riskTest: 'Risk Testi',
    aiThinking: 'Gemini 3 düşünüyor...',
    
    // BART Game
    bartDescription: 'Balonu pompalayarak para kazanın, ama dikkat - patlayabilir!',
    bartCollections: 'Toplamalar',
    bartPotential: 'Potansiyel',
    bartPoints: 'puan',
    bartPumpBtn: 'Pompala',
    bartCollectBtn: 'Topla',
    bartInstruction: 'Her pompa 5 puan ekler, ama balon her an patlayabilir!',
    bartComplete: 'Test Tamamlandı!',
    bartRiskTolerance: 'Risk Toleransı',
    bartAvgPump: 'Ort. Pompa',
    bartRoundPerformance: 'Tur Bazlı Performans',
    bartSaveResults: 'Sonuçları Kaydet',
    bartPlayAgain: 'Tekrar Oyna',
    
    // Profile
    profileNotCreated: 'Profiliniz Henüz Oluşturulmadı',
    profileNotCreatedDesc: 'Sohbet ederek veya BART testini tamamlayarak profilinizi oluşturun.',
    createProfile: 'Profil Oluştur',
    bartTest: 'BART Testi',
    archetypeProfile: 'Arketip Profili',
    refresh: 'Yenile',
    dominantArchetype: 'Dominant Arketip',
    shadowArchetype: 'Gölge Arketip',
    bigFiveTitle: 'Big Five Kişilik Özellikleri',
    
    // System
    aiEngine: 'AI Motor',
    online: 'Çevrimiçi',
    version: 'v4.2.0'
  },
  
  en: {
    // General
    appName: 'NEXAI',
    appTagline: 'Digital Soul Curator',
    poweredBy: 'Powered by Google Gemini',
    
    // Navigation
    navChat: 'Chat',
    navBART: 'BART Risk Test',
    navProfile: 'Psychological Profile',
    navDeepAnalysis: 'Multi-Layer Analysis',
    navDPAE: 'DPAE | DEPTH',
    navPsychoCore: 'PsychoCore-X',
    navDashboard: 'Dashboard',
    dashboardTitle: 'NEXAI Psychological Dashboard',
    dashboardDesc: 'Access all analysis engines that dive into the depths of your mind.',
    startDPAE: 'Start DPAE Analysis',
    startBART: 'Take BART Test',
    startDeep: '3-Layer Analysis',
    startPsycho: 'PsychoCore-X Analysis',
    navCuration: 'Content Curation',
    navSettings: 'Settings',

    // Dashboard Cards
    dpaeTitle: 'DPAE Engine',
    dpaeDesc: 'Deep-Psyche Analysis Engine: 8-stage psychological battery with radar visualization.',
    psychoTitle: 'PsychoCore-X',
    psychoDesc: 'Advanced analytical motor using multi-module archetypes and cognitive bias detection.',
    bartTitleCard: 'BART Risk Analytics',
    bartDescCard: 'Balloon Analogue Risk Task to measure your neurological risk tolerance levels.',
    ultraTitle: 'PsychoCore-ULTRA',
    ultraDesc: 'The ultimate synthesis of Depth Psychology, Neuropsychology, and Existential Philosophy. Unlocks after full DPAE profiling.',
    ultraLocked: 'Locked: Complete DPAE First',
    ultraStart: 'START ULTRA ANALYSIS',
    ultraViewTitle: 'PsychoCore-ULTRA: Ultimate Synthesis',
    ultraViewDesc: 'Perform a deep psychological, neurological and existential analysis based on your DPAE profile.',
    ultraInputLabel: 'Enter your existential question or concern:',
    ultraPlaceholder: 'e.g., I\'ve started questioning the meaning of my life...',
    ultraRunBtn: 'RUN ULTRA ANALYSIS',
    ultraRunning: 'PERFORMING DEEP ANALYSIS...',
    ultraCompleted: 'ULTRA Analysis Completed!',
    premiumModule: 'PREMIUM MODULE',

    // PsychoCore View
    psychoViewTitle: 'PsychoCore-X',
    psychoViewDesc: 'Create a deep psychological profile through text with the advanced analytical engine.',
    psychoInputLabel: 'Enter text for analysis (Journal, thoughts, dreams, etc.):',
    psychoPlaceholder: 'Type here...',
    psychoScopeLabel: 'Analysis Scope:',
    psychoContextLabel: 'Cultural Context:',
    psychoRunBtn: 'RUN ANALYSIS',
    psychoRunning: 'ANALYZING...',
    psychoScopeFast: 'Fast (Overview)',
    psychoScopeDetailed: 'Detailed (In-depth)',
    psychoScopeCrisis: 'Crisis Intervention (Emotional)',
    psychoContextWestern: 'Western',
    psychoContextEastern: 'Eastern',
    
    // PsychoCore Results
    psychoResultTitle: 'Analysis Output',
    psychoConfidenceScore: 'Confidence Score',
    psychoRiskTolerance: 'Risk Tolerance',
    psychoRiskLow: 'Low',
    psychoRiskMedium: 'Medium',
    psychoRiskHigh: 'High',
    psychoSecure: 'Secure',
    psychoInsights: 'Key Insights',
    psychoNoInsights: 'No insights generated yet.',
    psychoShadowTraits: 'Shadow Traits',
    psychoCognitiveBiases: 'Cognitive Biases',
    psychoRecommendedExercises: 'Recommended Exercises',
    psychoNotDetermined: 'Not determined',
    
    // DPAE View
    dpaeHeroTitle: 'Deep-Psyche Analysis Engine',
    dpaeHeroDesc: '8-stage fully integrated self-analysis with the DEPTH algorithm. Scientific metrics, Jungian archetype theory, and advanced shadow analysis combined.',
    dpaeStartBtn: 'START ANALYSIS',
    dpaeNewBtn: 'NEW ANALYSIS',
    dpaeDownloadBtn: 'DOWNLOAD REPORT',
    dpaeStatusActive: 'Currently processing...',
    dpaeStatusDone: 'Analysis completed',
    dpaeStatusPending: 'Next stage',
    dpaeStage1: 'Initial Layer',
    dpaeStage2: 'Core Personality Mapping',
    dpaeStage3: 'Deep Layer Analysis',
    dpaeStage4: 'Existential Layer',
    dpaeStage5: 'Score Calculation',
    dpaeStage6: 'Pattern Recognition',
    dpaeStage7: 'Personalized Report',
    dpaeStage8: 'Tracking & Evolution',
    
    // DPAE Questionnaire
    dpaeQuestionnaireTitle: 'Stage 2: Personality Mapping',
    dpaeProgress: 'Progress',
    dpaeStronglyAgree: 'Strongly Agree',
    dpaeAgree: 'Agree',
    dpaeNeutral: 'Neutral',
    dpaeDisagree: 'Disagree',
    dpaeStronglyDisagree: 'Strongly Disagree',
    dpaeCompleted: 'DPAE Analysis Completed!',
    dpaeError: 'An error occurred during analysis.',
    dpaeUnexpectedError: 'An unexpected error occurred.',
    dpaeQ1: 'I am usually the life of the party.',
    dpaeQ2: 'I genuinely care about other people\'s feelings.',
    dpaeQ3: 'I am always prepared and organized.',
    dpaeQ4: 'I get stressed and worried easily.',
    dpaeQ5: 'I have a very vivid imagination.',
    dpaeQ6: 'I am comfortable expressing my opinions.',
    dpaeQ7: 'I avoid hurting people\'s feelings.',
    dpaeQ8: 'I keep my promises no matter what.',
    dpaeQ9: 'My mood changes frequently.',
    dpaeQ10: 'I love new and unusual experiences.',
    dpaeBig5Openness: 'Openness',
    dpaeBig5Conscientiousness: 'Conscientiousness',
    dpaeBig5Extraversion: 'Extraversion',
    dpaeBig5Agreeableness: 'Agreeableness',
    dpaeBig5Neuroticism: 'Neuroticism',
    dpaePersonalityProfile: 'Personality Profile',
    dpaeDominantArchetype: 'Dominant Archetype',
    dpaeShadowArchetype: 'Shadow Archetype',
    dpaeAttachmentStyle: 'Attachment Style',
    dpaeBig5Chart: 'Big Five Personality Traits',
    dpaeArchetypeDesc: 'Archetype Description',
    dpaeShadowAnalysis: 'Shadow Analysis',
    dpaePersonalGrowth: 'Personal Growth Areas',
    dpaeRecommendations: 'Recommendations',
    dpaeBig5ChartTitle: 'Big Five (OCEAN) Profile',
    dpaeShadowManifestations: 'Shadow Manifestations',
    dpaeIntegrationPath: 'Integration Path',
    dpaeIntensity: 'Intensity',
    dpaeUnconsciousPattern: 'Unconscious Pattern',
    dpaeEvidence: 'Evidence detected in dataset.',
    
    // Network Status
    offlineWarning: 'You are offline. Some features may not work.',
    onlineRestored: 'Connection restored.',
    offlineError: 'Cannot perform this action while offline.',
    retryError: 'Operation failed. Please try again.',
    
    // Headers
    headerChat: 'Cognitive Chat',
    headerBART: 'BART Risk Assessment',
    headerProfile: 'Psychological Profile',
    headerDeepAnalysis: 'Multi-Layer Analysis',
    headerDPAE: 'Deep-Psyche Analysis Engine',
    headerCuration: 'Content Curation',
    headerSettings: 'Settings',
    
    // Auth
    loginRequired: 'Login Required',
    loginRequiredDesc: 'Please log in or create a free account to use all NEXAI features.',
    featuresTitle: 'Features You\'ll Access',
    featureAI: 'AI-Powered Psychological Analysis',
    featureJung: 'Jung Archetypes and Shadow Analysis',
    featureBART: 'BART Risk Tolerance Test',
    featureCuration: 'Personalized Content Recommendations',
    featureCultural: 'Cultural Context Adaptation',
    loginButton: 'Login / Register',
    orText: 'or',
    securityBadge: 'Secured with 256-bit SSL encryption',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    passwordHint: 'At least 8 characters, uppercase, lowercase and number',
    loginWith: 'Login with',
    logout: 'Logout',
    loggedInWith: 'logged in with',
    saveDataHint: 'Login to save your data',
    connectionError: 'Connection error',
    accountCreated: 'Account created, welcome',
    
    // Chat
    welcomeTitle: 'Your Digital Soul Curator',
    welcomeDesc: 'I am NEXAI, a culturally-aware cognitive analysis system powered by Google Gemini. Share your thoughts, feelings, and goals with me.',
    welcomeUser: 'Welcome',
    inputPlaceholder: 'Type your thoughts...',
    thinking: 'Gemini is thinking...',
    
    // Quick Actions
    quickPersonality: 'Personality Analysis',
    quickStrengths: 'My Strengths',
    quickShadow: 'Shadow Analysis',
    quickRiskTest: 'Risk Test',
    quickPersonalityMsg: 'I want to know myself better.',
    quickStrengthsMsg: 'I want to discover my strengths and weaknesses.',
    quickShadowMsg: 'I want to understand my hidden fears and shadows in my subconscious.',
    
    // BART
    bartTitle: 'Balloon Analogue Risk Task',
    bartDesc: 'This test measures your risk-taking tendency. Inflate the balloon each round and earn points by risking explosion or collect safely.',
    bartPump: 'Pump',
    bartCollect: 'Collect',
    bartRound: 'Round',
    bartPumps: 'Pumps',
    bartScore: 'Score',
    bartExploded: 'Exploded!',
    bartCollected: 'Collected!',
    bartResults: 'Results',
    bartAvgPumps: 'Average Pumps',
    bartTotalScore: 'Total Score',
    bartExplosions: 'Explosions',
    bartRiskLevel: 'Risk Level',
    bartSave: 'Save Results',
    bartReset: 'Start Over',
    
    // Profile
    profileGenerate: 'Generate Profile',
    profileGenerating: 'Generating profile...',
    profileDesc: 'Generate your psychological profile based on your conversations and BART test results.',
    profileBigFive: 'Big Five (OCEAN)',
    profileArchetype: 'Dominant Archetype',
    profileShadow: 'Shadow Archetype',
    profileInsights: 'Key Insights',
    profileGrowth: 'Growth Areas',
    
    // Deep Analysis
    deepAnalysisRun: 'Run Deep Analysis',
    deepAnalysisRunning: 'Analyzing...',
    deepAnalysisDesc: 'Perform a comprehensive psychological analysis using 3 AI agents.',
    minCharWarning: 'Please enter at least 20 characters for analysis.',
    analysisError: 'An error occurred during analysis.',
    agentCultural: 'Cultural Anthropologist',
    agentShadow: 'Shadow Hunter',
    agentCurator: 'Aesthetic Curator',
    
    // Curation
    curationGenerate: 'Generate Recommendations',
    curationGenerating: 'Generating recommendations...',
    curationDesc: 'Get personalized content recommendations based on your archetype and cultural context.',
    curationFilms: 'Films',
    curationBooks: 'Books',
    curationMusic: 'Music',
    curationActivities: 'Activities',
    curationWeeklyPlan: 'Weekly Plan',
    
    // Settings
    settingsCultural: 'Cultural Context',
    settingsCulturalDesc: 'Select the cultural framework for psychological analysis.',
    settingsWestern: 'Western',
    settingsEastern: 'Eastern',
    settingsAfrican: 'African',
    settingsLanguage: 'Language',
    settingsLanguageDesc: 'Select interface language.',
    settingsData: 'Data Management',
    settingsExport: 'Export Data',
    settingsClear: 'Clear All Data',
    settingsCulture: 'Cultural Context',
    settingsCultureDesc: 'Select the cultural framework for psychological analysis.',
    settingsDataManagement: 'Data Management',
    settingsChatHistory: 'Chat History',
    settingsMessages: 'messages',
    settingsBARTResults: 'BART Test Results',
    settingsAvailable: 'Available',
    settingsNotAvailable: 'Not available',
    settingsRisk: 'Risk',
    settingsClearAll: 'Clear All Data',
    sidebarAria: 'Main menu',
    mainContentAria: 'Main content',
    loading: 'Loading',
    settingsAbout: 'About',
    settingsVersion: 'Version',
    settingsLicense: 'License',
    settingsDisclaimer: 'This app is for experimental purposes and does not replace professional psychological advice.',

    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    orText: 'or',
    loginWith: 'Login with',
    passwordHint: 'At least 8 characters, mixed case and numbers',
    emailPlaceholder: 'example@email.com',
    namePlaceholder: 'Your name',
    passwordPlaceholder: 'At least 8 characters',
    
    // Chat view
    welcomeDescription: 'I am NEXAI, a culturally-aware cognitive analysis system powered by Google Gemini. Share your thoughts, feelings, and goals with me.',
    personalityAnalysis: 'Personality Analysis',
    myStrengths: 'My Strengths',
    shadowAnalysis: 'Shadow Analysis',
    riskTest: 'Risk Test',
    aiThinking: 'Gemini 3 is thinking...',
    
    // BART Game
    bartDescription: 'Earn money by pumping the balloon, but be careful - it might pop!',
    bartCollections: 'Collections',
    bartPotential: 'Potential',
    bartPoints: 'points',
    bartPumpBtn: 'Pump',
    bartCollectBtn: 'Collect',
    bartInstruction: 'Each pump adds 5 points, but the balloon can pop anytime!',
    bartComplete: 'Test Completed!',
    bartRiskTolerance: 'Risk Tolerance',
    bartAvgPump: 'Avg. Pumps',
    bartRoundPerformance: 'Round Performance',
    bartSaveResults: 'Save Results',
    bartPlayAgain: 'Play Again',
    
    // Profile
    profileNotCreated: 'Your Profile Has Not Been Created Yet',
    profileNotCreatedDesc: 'Create your profile by chatting or completing the BART test.',
    createProfile: 'Create Profile',
    bartTest: 'BART Test',
    archetypeProfile: 'Archetype Profile',
    refresh: 'Refresh',
    dominantArchetype: 'Dominant Archetype',
    shadowArchetype: 'Shadow Archetype',
    bigFiveTitle: 'Big Five Personality Traits',
    
    // System
    aiEngine: 'AI Engine',
    online: 'Online',
    version: 'v4.2.0'
  }
};

// Get translation
function t(key) {
  const lang = state.language || 'tr';
  return translations[lang][key] || translations['tr'][key] || key;
}

// Change language
function changeLanguage(lang) {
  state.language = lang;
  localStorage.setItem('nexai_language', lang);
  renderApp();
  showNotification(lang === 'tr' ? 'Dil Türkçe olarak değiştirildi' : 'Language changed to English', 'success');
}

// ============================================
// SECURITY UTILITIES
// ============================================

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Sanitize user input
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>\"'&]/g, (char) => ({
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    })[char])
    .trim()
    .slice(0, 10000);
}

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate password strength
function isValidPassword(password) {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);
}

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
  messages: [],
  isLoading: false,
  culturalContext: 'western',
  bartData: null,
  profile: null,
  deepAnalysis: null,
  dpaeResult: null,
  psychoXResult: null,
  contentCuration: null,
  currentView: 'dashboard',
  sidebarOpen: false,
  systemInfo: null,
  theme: 'dark',
  language: 'tr', // Default language
  // Auth state
  isAuthenticated: false,
  user: null,
  token: null,
  showAuthModal: false,
  authTab: 'login',
  // DPAE State
  isTakingDPAE: false,
  currentQuestionIndex: 0,
  dpaeResponses: {},
  dpaeQuestions: [
    { id: 'o1', text: 'Yeni ve alışılmadık fikirleri keşfetmekten heyecan duyarım.', category: 'openness' },
    { id: 'o2', text: 'Sanat, tasarım ve teorik konulara derin ilgi duyarım.', category: 'openness' },
    { id: 'c1', text: 'İşlerimi her zaman planlı ve düzenli bir şekilde yaparım.', category: 'conscientiousness' },
    { id: 'c2', text: 'Sorumluluklarımı yerine getirmek konusunda son derece disiplinliyimdir.', category: 'conscientiousness' },
    { id: 'e1', text: 'Kalabalık ortamlarda kendimi enerjik hissederim.', category: 'extraversion' },
    { id: 'e2', text: 'İnsanlarla kolayca tanışır ve sohbet başlatırım.', category: 'extraversion' },
    { id: 'a1', text: 'İnsanların niyetlerine güvenme eğilimindeyimdir.', category: 'agreeableness' },
    { id: 'a2', text: 'Başkalarıyla tartışmak yerine uyum sağlamayı tercih ederim.', category: 'agreeableness' },
    { id: 'n1', text: 'Stresli durumlarda kolayca endişelenebilirim.', category: 'neuroticism' },
    { id: 'n2', text: 'Duygusal dalgalanmalar yaşamaya meyilliyimdir.', category: 'neuroticism' },
    { id: 'm1', text: 'Amacıma ulaşmak için bazen başkalarını manipüle etmem gerekebilir.', category: 'machiavellianism' },
    { id: 'm2', text: 'İnsanların sırlarını kendi çıkarım için kullanabilirim.', category: 'machiavellianism' },
    { id: 'na1', text: 'İnsanların bana hayranlık duyması hoşuma gider.', category: 'narcissism' },
    { id: 'na2', text: 'Özel bir muameleyi hak ettiğimi düşünüyorum.', category: 'narcissism' },
    { id: 'p1', text: 'Başkalarının ne hissettiği beni pek ilgilendirmez.', category: 'psychopathy' },
    { id: 'p2', text: 'Riskli durumlardan korkmam ve heyecan duyarım.', category: 'psychopathy' },
    { id: 'j1', text: 'Kaosun içinde düzen kurmayı ve yönetmeyi severim.', category: 'archetype', trait: 'ruler' },
    { id: 'j2', text: 'Bilinmeyeni keşfetmek ve özgür olmak en büyük arzumdur.', category: 'archetype', trait: 'explorer' },
    { id: 'j3', text: 'Başkalarına yardım etmek ve onları korumak beni mutlu eder.', category: 'archetype', trait: 'caregiver' },
    { id: 'j4', text: 'Kuralları yıkmak ve devrim yapmak beni heyecanlandırır.', category: 'archetype', trait: 'outlaw' },
    { id: 'at1', text: 'İlişkilerimde karşımdaki kişinin beni terk etmesinden korkarım.', category: 'attachment', trait: 'anxious' },
    { id: 'at2', text: 'Birine çok yakın olmak beni bazen boğuluyormuş gibi hissettirir.', category: 'attachment', trait: 'avoidant' }
  ]
};

// ============================================
// AUTH SERVICE
// ============================================
const AuthService = {
  init() {
    // Load language preference
    const savedLanguage = localStorage.getItem('nexai_language');
    if (savedLanguage) {
      state.language = savedLanguage;
    }
    
    // Check URL for OAuth callback token
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const error = urlParams.get('error');
    
    if (tokenFromUrl) {
      this.setToken(tokenFromUrl);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    if (error) {
      showNotification(t('login') + ' ' + error, 'error');
    }
    
    // Load from localStorage
    const savedToken = localStorage.getItem('nexai_token');
    const savedUser = localStorage.getItem('nexai_user');
    
    if (savedToken && savedUser) {
      state.token = savedToken;
      try {
        state.user = JSON.parse(savedUser);
        state.isAuthenticated = true;
      } catch (e) {
        this.logout();
      }
    }
  },
  
  setToken(token) {
    state.token = token;
    localStorage.setItem('nexai_token', token);
  },
  
  setUser(user) {
    state.user = user;
    state.isAuthenticated = true;
    localStorage.setItem('nexai_user', JSON.stringify(user));
  },
  
  async login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        this.setToken(data.token);
        this.setUser(data.user);
        state.showAuthModal = false;
        showNotification(t('welcomeUser') + ', ' + data.user.name + '!', 'success');
        renderApp();
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: t('connectionError') };
    }
  },
  
  async register(name, email, password) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        this.setToken(data.token);
        this.setUser(data.user);
        state.showAuthModal = false;
        showNotification(t('accountCreated') + ' ' + data.user.name + '!', 'success');
        renderApp();
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: t('connectionError') };
    }
  },
  
  async loginWithGoogle() {
    const res = await fetch('/api/auth/google');
    const data = await res.json();
    window.location.href = data.authUrl;
  },
  
  async loginWithGitHub() {
    const res = await fetch('/api/auth/github');
    const data = await res.json();
    window.location.href = data.authUrl;
  },
  
  async loginWithApple() {
    const res = await fetch('/api/auth/apple');
    const data = await res.json();
    window.location.href = data.authUrl;
  },
  
  async verifyToken() {
    if (!state.token) return false;
    
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { 'Authorization': 'Bearer ' + state.token }
      });
      const data = await res.json();
      return data.valid;
    } catch {
      return false;
    }
  },
  
  logout() {
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    localStorage.removeItem('nexai_token');
    localStorage.removeItem('nexai_user');
    showNotification('Çıkış yapıldı', 'info');
    renderApp();
  },
  
  getAuthHeaders() {
    if (state.token) {
      return { 'Authorization': 'Bearer ' + state.token };
    }
    return {};
  }
};

// ============================================
// API SERVICE (with Auth Support)
// ALL ENDPOINTS REQUIRE AUTHENTICATION
// ============================================
const API = {
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...AuthService.getAuthHeaders()
    };
  },

  // Check if user is authenticated, if not show modal and return null
  requireAuth() {
    if (!state.isAuthenticated) {
      showNotification('Bu özelliği kullanmak için giriş yapmanız gerekiyor.', 'warning');
      showAuthModal();
      return false;
    }
    return true;
  },

  async analyze(message) {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/analyze', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        message,
        culturalContext: state.culturalContext,
        bartData: state.bartData,
        conversationHistory: state.messages.slice(-10)
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async deepAnalyze() {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/deep-analyze', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        conversationHistory: state.messages,
        bartData: state.bartData,
        culturalContext: state.culturalContext,
        statedTraits: extractStatedTraits()
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async generateProfile() {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/profile', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        conversationHistory: state.messages,
        bartData: state.bartData,
        culturalContext: state.culturalContext
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async analyzeShadow(statedTraits) {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/shadow', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        statedTraits,
        behavioralData: state.bartData,
        conversationHistory: state.messages.slice(-10)
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async generateNarrative() {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/narrative', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        profile: state.profile || state.deepAnalysis?.finalProfile,
        culturalContext: state.culturalContext
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async psychocoreX(userInput, analysisScope = 'Hızlı', culturalContext = 'western') {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/psychocore-x', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        userInput,
        analysisScope,
        culturalContext
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async psychocoreUltra(userInput, dpaeProfile) {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/psychocore-ultra', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        userInput,
        dpaeProfile,
        culturalContext: state.culturalContext
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async dpae(userData, depth = 'Standart', culturalContext = 'western') {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/dpae', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        userData,
        analysisDepth: depth,
        culturalContext
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async getCuration(archetype, shadowArchetype, mood = 'balanced') {
    if (!this.requireAuth()) return { error: 'AUTH_REQUIRED' };
    
    const response = await fetch('/api/protected/curate', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        archetype: archetype || 'explorer',
        shadowArchetype: shadowArchetype || 'wanderer',
        culturalContext: state.culturalContext,
        mood
      })
    });
    const data = await response.json();
    if (data.code === 'AUTH_REQUIRED' || data.code === 'UNAUTHORIZED') {
      AuthService.logout();
      showAuthModal();
      return { error: 'AUTH_REQUIRED' };
    }
    return data;
  },

  async getConfig() {
    const response = await fetch('/api/config');
    return response.json();
  },

  async getHealth() {
    const response = await fetch('/api/health');
    return response.json();
  }
};

// Extract stated traits from conversation
function extractStatedTraits() {
  const userMessages = state.messages.filter(m => m.role === 'user');
  const traits = {};
  
  const traitKeywords = {
    risk: ['risk', 'cesur', 'macera', 'tehlike', 'adrenalin'],
    cautious: ['temkinli', 'dikkatli', 'güvenli', 'tedbirli', 'kontrollü'],
    social: ['sosyal', 'arkadaş', 'insanlar', 'topluluk', 'sohbet'],
    introvert: ['yalnız', 'içe dönük', 'sessiz', 'sakin', 'mahrem'],
    creative: ['yaratıcı', 'hayal', 'sanat', 'yenilik', 'ilham'],
    analytical: ['analitik', 'mantık', 'düşün', 'çözüm', 'strateji'],
    emotional: ['duygusal', 'hissediyorum', 'kalbim', 'içim', 'üzgün'],
    leader: ['lider', 'yönet', 'sorumluluk', 'karar', 'önder']
  };

  userMessages.forEach(msg => {
    const content = msg.content.toLowerCase();
    Object.entries(traitKeywords).forEach(([trait, keywords]) => {
      if (keywords.some(k => content.includes(k))) {
        traits[trait] = (traits[trait] || 0) + 1;
      }
    });
  });

  return traits;
}

// ============================================
// BART GAME (Balloon Analogue Risk Task)
// ============================================
class BARTGame {
  constructor() {
    this.currentPumps = 0;
    this.totalScore = 0;
    this.round = 0;
    this.maxRounds = 10;
    this.explosions = 0;
    this.collections = 0;
    this.pumpsHistory = [];
    this.explosionPoint = this.generateExplosionPoint();
  }

  generateExplosionPoint() {
    return Math.floor(Math.random() * Math.random() * 128) + 1;
  }

  pump() {
    if (this.round >= this.maxRounds) return { status: 'game_over' };
    
    this.currentPumps++;
    
    if (this.currentPumps >= this.explosionPoint) {
      this.explosions++;
      this.pumpsHistory.push({ pumps: this.currentPumps, collected: false });
      const result = { status: 'exploded', pumps: this.currentPumps };
      this.nextRound();
      return result;
    }
    
    return { 
      status: 'pumped', 
      currentPumps: this.currentPumps,
      potentialEarnings: this.currentPumps * 5
    };
  }

  collect() {
    if (this.round >= this.maxRounds) return { status: 'game_over' };
    if (this.currentPumps === 0) return { status: 'nothing_to_collect' };
    
    const earnings = this.currentPumps * 5;
    this.totalScore += earnings;
    this.collections++;
    this.pumpsHistory.push({ pumps: this.currentPumps, collected: true });
    
    const result = {
      status: 'collected',
      earnings,
      totalScore: this.totalScore,
      pumps: this.currentPumps
    };
    
    this.nextRound();
    return result;
  }

  nextRound() {
    this.round++;
    this.currentPumps = 0;
    this.explosionPoint = this.generateExplosionPoint();
  }

  getResults() {
    const avgPumps = this.pumpsHistory.length > 0
      ? this.pumpsHistory.reduce((sum, h) => sum + h.pumps, 0) / this.pumpsHistory.length
      : 0;
    
    const riskScore = Math.min(100, Math.round((avgPumps / 64) * 100));
    
    return {
      totalScore: this.totalScore,
      avgPumps: Math.round(avgPumps * 10) / 10,
      explosions: this.explosions,
      collections: this.collections,
      riskScore,
      pumpsHistory: this.pumpsHistory,
      riskLevel: riskScore <= 20 ? 'Çok Düşük' :
                 riskScore <= 40 ? 'Düşük' :
                 riskScore <= 60 ? 'Orta' :
                 riskScore <= 80 ? 'Yüksek' : 'Çok Yüksek'
    };
  }

  isGameOver() {
    return this.round >= this.maxRounds;
  }

  reset() {
    this.currentPumps = 0;
    this.totalScore = 0;
    this.round = 0;
    this.explosions = 0;
    this.collections = 0;
    this.pumpsHistory = [];
    this.explosionPoint = this.generateExplosionPoint();
  }
}

let bartGame = null;

// ============================================
// UI COMPONENTS
// ============================================

function renderApp() {
  const app = document.getElementById('app');
  
  // Semantic HTML5 structure with ARIA landmarks
  app.innerHTML = `
    <div class="flex h-screen bg-nexai-dark" role="application" aria-label="NEXAI Application">
      <!-- Sidebar Navigation -->
      <nav class="hidden lg:flex" aria-label="${t('sidebarAria')}">
        ${renderSidebar()}
      </nav>
      
      <!-- Main Content Area -->
      <main id="main-content" class="flex-1 flex flex-col overflow-hidden" role="main" tabindex="-1">
        <!-- Header -->
        <header role="banner">
          ${renderHeader()}
        </header>
        
        <!-- Dynamic Content Region -->
        <div class="flex-1 overflow-y-auto" role="region" aria-label="${t('mainContentAria')}" aria-live="polite">
          ${renderMainContent()}
        </div>
      </main>
    </div>
    
    <!-- Mobile Navigation Menu -->
    ${renderMobileMenu()}
    
    <!-- Authentication Modal -->
    ${renderAuthModal()}
    
    <!-- Notification Container -->
    ${renderNotificationContainer()}
    
    <!-- Loading Overlay -->
    ${state.isLoading ? renderLoadingOverlay() : ''}
  `;
  
  attachEventListeners();
  
  // Focus management for accessibility
  if (state.showAuthModal) {
    const modal = document.querySelector('[role="dialog"]');
    if (modal) {
      const firstInput = modal.querySelector('input, button');
      if (firstInput) firstInput.focus();
    }
  }
}

// Loading overlay component
function renderLoadingOverlay() {
  if (!state.isLoading) return '';
  
  return `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center" role="progressbar" aria-label="${t('loading')}">
      <div class="flex flex-col items-center gap-4">
        <div class="spinner spinner-lg"></div>
        <p class="text-white text-sm animate-pulse">${t('loading')}...</p>
      </div>
    </div>
  `;
}

// ============================================
// AUTH MODAL
// ============================================
function renderAuthModal() {
  if (!state.showAuthModal) return '';
  
  return `
    <div class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" 
         onclick="closeAuthModal(event)" 
         role="dialog" 
         aria-modal="true" 
         aria-labelledby="auth-modal-title"
         aria-describedby="auth-modal-desc">
      <div class="modal-content bg-nexai-card border border-nexai-border rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl animate-scale-in" 
           onclick="event.stopPropagation()"
           role="document">
        <!-- Header -->
        <div class="p-6 text-center border-b border-nexai-border">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-nexai-gold to-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-nexai-gold/20 animate-float">
            <i class="fas fa-atom text-3xl text-nexai-dark" aria-hidden="true"></i>
          </div>
          <h2 id="auth-modal-title" class="text-2xl font-cinzel font-bold text-white">NEXAI</h2>
          <p id="auth-modal-desc" class="text-gray-400 text-sm mt-1">${t('appTagline')}</p>
        </div>
        
        <!-- Tab Buttons -->
        <div class="flex mx-6 mt-4 bg-black/30 rounded-xl p-1">
          <button onclick="switchAuthTab('login')" class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${state.authTab === 'login' ? 'bg-nexai-gold/20 text-nexai-gold' : 'text-gray-400 hover:text-white'}">
            ${t('login')}
          </button>
          <button onclick="switchAuthTab('register')" class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${state.authTab === 'register' ? 'bg-nexai-gold/20 text-nexai-gold' : 'text-gray-400 hover:text-white'}">
            ${t('register')}
          </button>
        </div>
        
        <!-- Forms -->
        <div class="p-6">
          ${state.authTab === 'login' ? renderLoginForm() : renderRegisterForm()}
          
          <!-- Divider -->
          <div class="flex items-center my-6">
            <div class="flex-1 border-t border-gray-700"></div>
            <span class="px-4 text-sm text-gray-500">${t('orText')}</span>
            <div class="flex-1 border-t border-gray-700"></div>
          </div>
          
          <!-- OAuth Buttons -->
          <div class="space-y-3">
            <button onclick="handleGoogleLogin()" class="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-100 transition-all">
              <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google ${t('loginWith')}</span>
            </button>
            
            <button onclick="handleGitHubLogin()" class="w-full flex items-center justify-center space-x-3 bg-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition-all">
              <i class="fab fa-github text-xl"></i>
              <span>GitHub ${t('loginWith')}</span>
            </button>
            
            <button onclick="handleAppleLogin()" class="w-full flex items-center justify-center space-x-3 bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-900 transition-all border border-gray-700">
              <i class="fab fa-apple text-xl"></i>
              <span>Apple ${t('loginWith')}</span>
            </button>
          </div>
        </div>
        
        <!-- Close Button -->
        <button onclick="closeAuthModal()" class="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
    </div>
  `;
}

// ============================================
// LOGIN REQUIRED SCREEN (for unauthenticated users)
// ============================================
function renderLoginRequiredScreen() {
  return `
    <div class="flex flex-col items-center justify-center h-full text-center p-6">
      <div class="max-w-md">
        <!-- Lock Icon -->
        <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-nexai-gold/20 to-amber-600/20 flex items-center justify-center mb-6 animate-pulse">
          <i class="fas fa-lock text-5xl text-nexai-gold"></i>
        </div>
        
        <h2 class="text-3xl font-cinzel font-bold text-white mb-4">${t('loginRequired')}</h2>
        
        <p class="text-gray-400 mb-6">${t('loginRequiredDesc')}</p>
        
        <!-- Features List -->
        <div class="bg-nexai-card border border-nexai-border rounded-xl p-6 mb-6 text-left">
          <h3 class="text-sm font-semibold text-nexai-gold mb-4 uppercase tracking-wider">
            <i class="fas fa-star mr-2"></i>${t('featuresTitle')}
          </h3>
          <ul class="space-y-3">
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check-circle text-cyber-green mr-3"></i>
              <span>DPAE: 8-Stage Deep-Psyche Engine</span>
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check-circle text-cyber-green mr-3"></i>
              <span>PsychoCore-X: Advanced Text Analysis</span>
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check-circle text-cyber-green mr-3"></i>
              <span>BART: Behavioral Risk Analytics</span>
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check-circle text-cyber-green mr-3"></i>
              <span>${t('featureBART')}</span>
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check-circle text-cyber-green mr-3"></i>
              <span>${t('featureCuration')}</span>
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check-circle text-cyber-green mr-3"></i>
              <span>${t('featureCultural')}</span>
            </li>
          </ul>
        </div>
        
        <!-- Auth Buttons -->
        <div class="space-y-3">
          <button onclick="showAuthModal()" class="w-full bg-gradient-to-r from-nexai-gold to-amber-600 text-nexai-dark font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-nexai-gold/30 transition-all text-lg">
            <i class="fas fa-sign-in-alt mr-2"></i>${t('loginButton')}
          </button>
          
          <div class="flex items-center my-4">
            <div class="flex-1 border-t border-gray-700"></div>
            <span class="px-4 text-sm text-gray-500">${t('orText')}</span>
            <div class="flex-1 border-t border-gray-700"></div>
          </div>
          
          <div class="grid grid-cols-3 gap-3">
            <button onclick="handleGoogleLogin()" class="flex items-center justify-center py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all">
              <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </button>
            <button onclick="handleGitHubLogin()" class="flex items-center justify-center py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all">
              <i class="fab fa-github text-xl"></i>
            </button>
            <button onclick="handleAppleLogin()" class="flex items-center justify-center py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all border border-gray-700">
              <i class="fab fa-apple text-xl"></i>
            </button>
          </div>
        </div>
        
        <!-- Security Badge -->
        <div class="mt-6 flex items-center justify-center text-xs text-gray-500">
          <i class="fas fa-shield-alt text-cyber-green mr-2"></i>
          <span>${t('securityBadge')}</span>
        </div>
      </div>
    </div>
  `;
}

function renderLoginForm() {
  return `
    <form onsubmit="handleEmailLogin(event)" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-400 mb-2">${t('email')}</label>
        <input type="email" id="authLoginEmail" required
          class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-nexai-gold/50"
          placeholder="${t('emailPlaceholder')}">
      </div>
      <div>
        <label class="block text-sm text-gray-400 mb-2">${t('password')}</label>
        <input type="password" id="authLoginPassword" required
          class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-nexai-gold/50"
          placeholder="••••••••">
      </div>
      <button type="submit" class="w-full bg-gradient-to-r from-nexai-gold to-amber-600 text-nexai-dark font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-nexai-gold/30 transition-all">
        ${t('login')}
      </button>
    </form>
  `;
}

function renderRegisterForm() {
  return `
    <form onsubmit="handleEmailRegister(event)" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-400 mb-2">${t('name')}</label>
        <input type="text" id="authRegisterName" required
          class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-nexai-gold/50"
          placeholder="${t('namePlaceholder')}">
      </div>
      <div>
        <label class="block text-sm text-gray-400 mb-2">${t('email')}</label>
        <input type="email" id="authRegisterEmail" required
          class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-nexai-gold/50"
          placeholder="${t('emailPlaceholder')}">
      </div>
      <div>
        <label class="block text-sm text-gray-400 mb-2">${t('password')}</label>
        <input type="password" id="authRegisterPassword" required
          class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-nexai-gold/50"
          placeholder="${t('passwordPlaceholder')}">
        <p class="text-xs text-gray-500 mt-1">${t('passwordHint')}</p>
      </div>
      <button type="submit" class="w-full bg-gradient-to-r from-nexai-gold to-amber-600 text-nexai-dark font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-nexai-gold/30 transition-all">
        ${t('register')}
      </button>
    </form>
  `;
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function renderNotificationContainer() {
  return '<div id="notificationContainer" class="fixed top-4 right-4 z-50 space-y-2"></div>';
}

function showNotification(message, type = 'info') {
  const container = document.getElementById('notificationContainer');
  if (!container) return;
  
  const colors = {
    success: 'bg-cyber-green/10 border-cyber-green/30 text-cyber-green',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue',
    warning: 'bg-nexai-gold/10 border-nexai-gold/30 text-nexai-gold'
  };
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };
  
  const id = 'notif-' + Date.now();
  const notifEl = document.createElement('div');
  notifEl.id = id;
  notifEl.className = `flex items-center space-x-3 px-4 py-3 rounded-xl border ${colors[type]} animate-slide-in`;
  notifEl.innerHTML = `
    <i class="${icons[type]}"></i>
    <span class="text-sm">${message}</span>
    <button onclick="this.parentElement.remove()" class="ml-2 opacity-60 hover:opacity-100">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  container.appendChild(notifEl);
  
  setTimeout(() => {
    notifEl.classList.add('animate-fade-out');
    setTimeout(() => notifEl.remove(), 300);
  }, 5000);
}

// ============================================
// AUTH HANDLERS
// ============================================
function showAuthModal() {
  state.showAuthModal = true;
  state.authTab = 'login';
  renderApp();
}

function closeAuthModal(event) {
  if (event && event.target !== event.currentTarget) return;
  state.showAuthModal = false;
  renderApp();
}

function switchAuthTab(tab) {
  state.authTab = tab;
  renderApp();
}

async function handleEmailLogin(event) {
  event.preventDefault();
  const email = document.getElementById('authLoginEmail')?.value?.trim();
  const password = document.getElementById('authLoginPassword')?.value;
  
  // Client-side validation
  if (!email || !password) {
    showNotification(state.language === 'tr' ? 'Email ve şifre gerekli' : 'Email and password required', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification(state.language === 'tr' ? 'Geçersiz email adresi' : 'Invalid email address', 'error');
    return;
  }
  
  const result = await AuthService.login(sanitizeInput(email), password);
  if (!result.success) {
    showNotification(result.error, 'error');
  }
}

async function handleEmailRegister(event) {
  event.preventDefault();
  const name = document.getElementById('authRegisterName')?.value?.trim();
  const email = document.getElementById('authRegisterEmail')?.value?.trim();
  const password = document.getElementById('authRegisterPassword')?.value;
  
  // Client-side validation
  if (!name || !email || !password) {
    showNotification(state.language === 'tr' ? 'Tüm alanları doldurun' : 'Fill all fields', 'error');
    return;
  }
  
  if (name.length < 2 || name.length > 50) {
    showNotification(state.language === 'tr' ? 'İsim 2-50 karakter olmalı' : 'Name must be 2-50 characters', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification(state.language === 'tr' ? 'Geçersiz email adresi' : 'Invalid email address', 'error');
    return;
  }
  
  if (!isValidPassword(password)) {
    showNotification(state.language === 'tr' ? 'Şifre en az 8 karakter, büyük/küçük harf ve rakam içermeli' : 'Password must be 8+ chars with uppercase, lowercase and number', 'error');
    return;
  }
  
  const result = await AuthService.register(sanitizeInput(name), sanitizeInput(email), password);
  if (!result.success) {
    showNotification(result.error, 'error');
  }
}

function handleGoogleLogin() {
  AuthService.loginWithGoogle();
}

function handleGitHubLogin() {
  AuthService.loginWithGitHub();
}

function handleAppleLogin() {
  AuthService.loginWithApple();
}

function handleLogout() {
  AuthService.logout();
}

function renderSidebar() {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-th-large', label: t('navDashboard'), badge: null },
    { id: 'chat', icon: 'fas fa-comments', label: t('navChat'), badge: state.messages.length },
    { id: 'bart', icon: 'fas fa-circle', label: t('navBART'), badge: state.bartData ? '✓' : null },
    { id: 'dpae', icon: 'fas fa-dna', label: t('navDPAE'), badge: state.dpaeResult ? '✓' : null },
    { id: 'psychocore', icon: 'fas fa-brain', label: t('navPsychoCore'), badge: null },
    { id: 'profile', icon: 'fas fa-user-circle', label: t('navProfile'), badge: null },
    { id: 'curation', icon: 'fas fa-film', label: t('navCuration'), badge: state.contentCuration ? '✓' : null },
    { id: 'settings', icon: 'fas fa-cog', label: t('navSettings'), badge: null }
  ];

  return `
    <aside class="hidden lg:flex lg:flex-col w-72 bg-nexai-card border-r border-nexai-border">
      <!-- Logo -->
      <div class="p-6 border-b border-nexai-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-nexai-gold to-nexai-accent flex items-center justify-center">
            <i class="fas fa-atom text-nexai-dark text-lg"></i>
          </div>
          <div>
            <h1 class="text-lg font-cinzel font-bold text-nexai-gold">${t('appName')}</h1>
            <p class="text-xs text-gray-500">${t('appTagline')}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2">
        ${menuItems.map(item => `
          <button 
            onclick="switchView('${item.id}')"
            class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
              state.currentView === item.id 
                ? 'bg-nexai-gold/10 text-nexai-gold border border-nexai-gold/30' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }"
          >
            <div class="flex items-center space-x-3">
              <i class="${item.icon} w-5"></i>
              <span class="text-sm">${item.label}</span>
            </div>
            ${item.badge ? `
              <span class="px-2 py-0.5 text-xs rounded-full ${
                item.badge === '✓' ? 'bg-cyber-green/20 text-cyber-green' : 'bg-nexai-gold/20 text-nexai-gold'
              }">
                ${item.badge}
              </span>
            ` : ''}
          </button>
        `).join('')}
      </nav>

      <!-- User Profile / Auth -->
      <div class="p-4 border-t border-nexai-border">
        ${state.isAuthenticated && state.user ? `
          <div class="bg-black/30 rounded-lg p-3">
            <div class="flex items-center space-x-3 mb-3">
              ${state.user.avatar ? `
                <img src="${state.user.avatar}" alt="${state.user.name}" class="w-10 h-10 rounded-full">
              ` : `
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-nexai-gold to-nexai-accent flex items-center justify-center">
                  <i class="fas fa-user text-nexai-dark text-sm"></i>
                </div>
              `}
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">${state.user.name}</p>
                <p class="text-xs text-gray-500 truncate">${state.user.email}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2 text-xs text-gray-500 mb-2">
              <i class="fab fa-${state.user.provider === 'github' ? 'github' : state.user.provider === 'apple' ? 'apple' : state.user.provider === 'google' ? 'google' : 'envelope'}"></i>
              <span>${state.user.provider === 'email' ? 'Email' : state.user.provider.charAt(0).toUpperCase() + state.user.provider.slice(1)} ${t('loggedInWith')}</span>
            </div>
            <button onclick="handleLogout()" class="w-full mt-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors">
              <i class="fas fa-sign-out-alt mr-2"></i>${t('logout')}
            </button>
          </div>
        ` : `
          <button onclick="showAuthModal()" class="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-nexai-gold to-amber-600 text-nexai-dark font-medium py-3 rounded-lg hover:shadow-lg hover:shadow-nexai-gold/30 transition-all">
            <i class="fas fa-sign-in-alt"></i>
            <span>${t('login')}</span>
          </button>
          <p class="text-xs text-gray-500 text-center mt-2">${t('saveDataHint')}</p>
        `}
      </div>

      <!-- System Info -->
      <div class="p-4 border-t border-nexai-border">
        <div class="bg-black/30 rounded-lg p-3 text-xs">
          <div class="flex items-center justify-between text-gray-500 mb-2">
            <span>AI ENGINES</span>
            <span class="text-cyber-green">● ${t('online')}</span>
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-nexai-gold font-medium">Google Gemini</span>
              <span class="text-[10px] bg-nexai-gold/20 text-nexai-gold px-1.5 rounded">PRIORITY</span>
            </div>
            <div class="flex items-center justify-between opacity-60">
              <span class="text-gray-300 font-medium">Ollama (Local)</span>
              <span class="text-[10px] bg-white/10 text-gray-400 px-1.5 rounded">STANDBY</span>
            </div>
          </div>
          <div class="text-gray-500 mt-2">${t('version')} 4.3</div>
        </div>
      </div>
    </aside>
  `;
}

function renderHeader() {
  const viewTitles = {
    dashboard: t('navDashboard'),
    chat: t('headerChat'),
    bart: t('headerBART'),
    profile: t('headerProfile'),
    dpae: t('headerDPAE'),
    psychocore: t('navPsychoCore'),
    deep: t('headerDeepAnalysis'),
    curation: t('headerCuration'),
    settings: t('headerSettings')
  };

  return `
    <header class="bg-nexai-card border-b border-nexai-border px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button onclick="toggleMobileMenu()" class="lg:hidden text-gray-400 hover:text-white">
            <i class="fas fa-bars text-xl"></i>
          </button>
          <div>
            <h2 class="text-xl font-cinzel font-semibold text-white">${viewTitles[state.currentView]}</h2>
            <p class="text-sm text-gray-500">${t('poweredBy')}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <div class="hidden sm:flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-2">
            <i class="fas fa-language text-cyber-blue"></i>
            <select 
              onchange="changeLanguage(this.value)"
              class="bg-transparent text-sm text-gray-300 outline-none cursor-pointer"
            >
              <option value="tr" ${state.language === 'tr' ? 'selected' : ''}>🇹🇷 Türkçe</option>
              <option value="en" ${state.language === 'en' ? 'selected' : ''}>🇬🇧 English</option>
            </select>
          </div>
          
          <!-- Cultural Context Selector -->
          <div class="hidden sm:flex items-center space-x-2 bg-black/30 rounded-lg px-3 py-2">
            <i class="fas fa-globe text-nexai-gold"></i>
            <select 
              id="culturalContext" 
              onchange="changeCulturalContext(this.value)"
              class="bg-transparent text-sm text-gray-300 outline-none cursor-pointer"
            >
              <option value="western" ${state.culturalContext === 'western' ? 'selected' : ''}>🌎 ${t('settingsWestern')}</option>
              <option value="eastern" ${state.culturalContext === 'eastern' ? 'selected' : ''}>🌏 ${t('settingsEastern')}</option>
              <option value="african" ${state.culturalContext === 'african' ? 'selected' : ''}>🌍 ${t('settingsAfrican')}</option>
            </select>
          </div>

          ${state.bartData ? `
            <div class="hidden sm:flex items-center space-x-2 bg-cyber-green/10 text-cyber-green rounded-lg px-3 py-2 text-sm">
              <i class="fas fa-check-circle"></i>
              <span>BART: ${state.bartData.riskScore}%</span>
            </div>
          ` : ''}
        </div>
      </div>
    </header>
  `;
}

function renderDashboardView() {
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }

  return `
    <div class="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div class="max-w-6xl mx-auto">
        <header class="mb-8">
          <h2 class="text-3xl font-cinzel font-bold text-white mb-2">${t('dashboardTitle')}</h2>
          <p class="text-gray-400">${t('dashboardDesc')}</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- DPAE Card -->
          <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6 hover:border-nexai-gold/50 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-nexai-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i class="fas fa-dna text-nexai-gold text-xl"></i>
            </div>
            <h3 class="text-xl font-cinzel font-semibold text-white mb-2">${t('dpaeTitle')}</h3>
            <p class="text-sm text-gray-400 mb-6">${t('dpaeDesc')}</p>
            <button onclick="switchView('dpae')" class="w-full py-3 rounded-lg bg-nexai-gold text-nexai-dark font-bold hover:shadow-lg transition-all">
              ${t('startDPAE')}
            </button>
          </div>

          <!-- PsychoCore-X Card -->
          <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6 hover:border-cyber-purple/50 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-cyber-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i class="fas fa-brain text-cyber-purple text-xl"></i>
            </div>
            <h3 class="text-xl font-cinzel font-semibold text-white mb-2">${t('psychoTitle')}</h3>
            <p class="text-sm text-gray-400 mb-6">${t('psychoDesc')}</p>
            <button onclick="switchView('psychocore')" class="w-full py-3 rounded-lg bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-bold hover:shadow-lg transition-all">
              ${t('startPsycho')}
            </button>
          </div>

          <!-- BART Card -->
          <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6 hover:border-cyber-pink/50 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-cyber-pink/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i class="fas fa-chart-line text-cyber-pink text-xl"></i>
            </div>
            <h3 class="text-xl font-cinzel font-semibold text-white mb-2">${t('bartTitleCard')}</h3>
            <p class="text-sm text-gray-400 mb-6">${t('bartDescCard')}</p>
            <button onclick="switchView('bart')" class="w-full py-3 rounded-lg border border-cyber-pink text-cyber-pink font-bold hover:bg-cyber-pink/10 transition-all">
              ${t('startBART')}
            </button>
          </div>
        </div>

        <div class="mt-12 bg-black/40 border border-nexai-border rounded-2xl p-8 relative overflow-hidden">
          <div class="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span class="px-3 py-1 bg-nexai-gold/20 text-nexai-gold text-xs font-bold rounded-full mb-4 inline-block">${t('premiumModule')}</span>
              <h3 class="text-2xl font-cinzel font-bold text-white mb-4">${t('ultraTitle')}</h3>
              <p class="text-gray-400 mb-6">${t('ultraDesc')}</p>
              ${state.dpaeResult ? `
                <button onclick="switchView('ultra')" class="px-8 py-3 rounded-lg bg-gradient-to-r from-nexai-gold to-amber-600 text-nexai-dark font-bold hover:shadow-lg hover:shadow-nexai-gold/30 transition-all">
                  ${t('ultraStart')}
                </button>
              ` : `
                <button disabled class="px-8 py-3 rounded-lg bg-gray-800 text-gray-500 font-bold cursor-not-allowed">
                  ${t('ultraLocked')}
                </button>
              `}
            </div>
            <div class="flex justify-center">
              <div class="w-48 h-48 rounded-full border-4 border-dashed border-nexai-gold/30 flex items-center justify-center animate-spin-slow">
                 <i class="fas fa-atom text-6xl text-nexai-gold/40"></i>
              </div>
            </div>
          </div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-nexai-gold/5 blur-[100px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  `;
}

function renderMainContent() {
  if (state.isTakingDPAE) {
    return renderDPAEQuestionnaire();
  }

  switch (state.currentView) {
    case 'dashboard':
      return renderDashboardView();
    case 'chat':
      return renderChatView();
    case 'bart':
      return renderBARTView();
    case 'profile':
      return renderProfileView();
    case 'dpae':
      return renderDPAEView();
    case 'psychocore':
      return renderPsychoCoreView();
    case 'ultra':
      return renderUltraView();
    case 'deep':
      return renderDeepAnalysisView();
    case 'curation':
      return renderCurationView();
    case 'settings':
      return renderSettingsView();
    default:
      return renderChatView();
  }
}

function renderChatView() {
  // If not authenticated, show login required screen
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }
  
  const quickMessages = state.language === 'tr' ? {
    personality: 'Kendimi tanımak istiyorum.',
    strengths: 'Güçlü ve zayıf yönlerimi keşfetmek istiyorum.',
    shadow: 'Bilinçaltımdaki gizli korkularımı ve gölgelerimi anlamak istiyorum.'
  } : {
    personality: 'I want to understand myself better.',
    strengths: 'I want to discover my strengths and weaknesses.',
    shadow: 'I want to understand my hidden fears and shadows in my subconscious.'
  };
  
  return `
    <div class="flex flex-col h-full">
      <!-- Messages -->
      <div id="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
        ${state.messages.length === 0 ? `
          <div class="flex flex-col items-center justify-center h-full text-center py-12">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-nexai-gold/20 to-nexai-accent/20 flex items-center justify-center mb-6">
              <i class="fas fa-brain text-4xl text-nexai-gold"></i>
            </div>
            <h3 class="text-2xl font-cinzel font-semibold text-white mb-2">${t('welcomeUser').replace('{name}', state.user?.name || (state.language === 'tr' ? 'Kullanıcı' : 'User'))}!</h3>
            <p class="text-gray-400 max-w-md mb-8">
              ${t('welcomeDescription')}
            </p>
            
            <!-- Quick Actions -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
              <button onclick="sendQuickMessage('${quickMessages.personality}')" 
                class="p-4 bg-nexai-card border border-nexai-border rounded-xl hover:border-nexai-gold/50 transition-all group">
                <i class="fas fa-user-circle text-2xl text-nexai-gold mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-sm text-gray-300">${t('personalityAnalysis')}</p>
              </button>
              <button onclick="sendQuickMessage('${quickMessages.strengths}')" 
                class="p-4 bg-nexai-card border border-nexai-border rounded-xl hover:border-nexai-gold/50 transition-all group">
                <i class="fas fa-balance-scale text-2xl text-cyber-blue mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-sm text-gray-300">${t('myStrengths')}</p>
              </button>
              <button onclick="sendQuickMessage('${quickMessages.shadow}')" 
                class="p-4 bg-nexai-card border border-nexai-border rounded-xl hover:border-cyber-purple/50 transition-all group">
                <i class="fas fa-moon text-2xl text-cyber-purple mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-sm text-gray-300">${t('shadowAnalysis')}</p>
              </button>
              <button onclick="switchView('bart')" 
                class="p-4 bg-nexai-card border border-nexai-border rounded-xl hover:border-cyber-pink/50 transition-all group">
                <i class="fas fa-gamepad text-2xl text-cyber-pink mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-sm text-gray-300">${t('riskTest')}</p>
              </button>
            </div>
          </div>
        ` : state.messages.map(msg => renderMessage(msg)).join('')}
        
        ${state.isLoading ? `
          <div class="flex items-start space-x-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-nexai-gold to-nexai-accent flex items-center justify-center">
              <i class="fas fa-atom text-nexai-dark"></i>
            </div>
            <div class="bg-nexai-card border border-nexai-border rounded-2xl rounded-tl-none p-4">
              <div class="flex items-center space-x-2">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-nexai-gold rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="w-2 h-2 bg-nexai-gold rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="w-2 h-2 bg-nexai-gold rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
                <span class="text-sm text-gray-500">${t('aiThinking')}</span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Input Area -->
      <div class="border-t border-nexai-border p-4 bg-nexai-card">
        <form onsubmit="handleSubmit(event)" class="flex items-center space-x-3">
          <div class="flex-1 relative">
            <input 
              type="text" 
              id="messageInput"
              placeholder="${t('inputPlaceholder')}"
              class="w-full bg-black/30 border border-nexai-border rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-nexai-gold/50 transition-colors"
              ${state.isLoading ? 'disabled' : ''}
            />
            <button type="button" onclick="toggleVoiceInput()" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-nexai-gold transition-colors">
              <i class="fas fa-microphone"></i>
            </button>
          </div>
          <button 
            type="submit" 
            class="px-6 py-3 bg-gradient-to-r from-nexai-gold to-nexai-accent text-nexai-dark font-semibold rounded-xl hover:shadow-lg hover:shadow-nexai-gold/20 transition-all disabled:opacity-50"
            ${state.isLoading ? 'disabled' : ''}
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderMessage(msg) {
  const isUser = msg.role === 'user';
  return `
    <div class="flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}">
      <div class="w-10 h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-cyber-blue/20 text-cyber-blue' 
          : 'bg-gradient-to-br from-nexai-gold to-nexai-accent text-nexai-dark'
      }">
        <i class="fas ${isUser ? 'fa-user' : 'fa-atom'}"></i>
      </div>
      <div class="max-w-[70%] ${
        isUser 
          ? 'bg-cyber-blue/10 border-cyber-blue/30' 
          : 'bg-nexai-card border-nexai-border'
      } border rounded-2xl ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} p-4">
        <div class="prose prose-invert prose-sm max-w-none">
          ${typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(marked.parse(msg.content || '')) : escapeHtml(msg.content || '')}
        </div>
        ${msg.model ? `
          <div class="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
            <span><i class="fas fa-robot mr-1"></i>${msg.model}</span>
            <span>${new Date(msg.timestamp || Date.now()).toLocaleTimeString('tr-TR')}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderBARTView() {
  // Require authentication
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }
  
  if (!bartGame) {
    bartGame = new BARTGame();
  }

  if (bartGame.isGameOver()) {
    const results = bartGame.getResults();
    return renderBARTResults(results);
  }

  const balloonSize = 80 + (bartGame.currentPumps * 3);
  const balloonColor = bartGame.currentPumps < 20 ? 'from-cyber-green to-emerald-400' :
                       bartGame.currentPumps < 40 ? 'from-nexai-gold to-yellow-400' :
                       bartGame.currentPumps < 60 ? 'from-orange-500 to-red-400' :
                       'from-red-500 to-pink-500';

  return `
    <div class="flex flex-col items-center justify-center min-h-full p-6">
      <div class="w-full max-w-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cinzel font-bold text-white mb-2">${t('bartTitle')}</h3>
          <p class="text-gray-400">${t('bartDescription')}</p>
        </div>

        <!-- Game Stats -->
        <div class="grid grid-cols-4 gap-4 mb-8">
          <div class="bg-nexai-card border border-nexai-border rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-white">${bartGame.round + 1}/${bartGame.maxRounds}</div>
            <div class="text-xs text-gray-500">${t('bartRound')}</div>
          </div>
          <div class="bg-nexai-card border border-nexai-border rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-nexai-gold">${bartGame.totalScore}</div>
            <div class="text-xs text-gray-500">${t('bartTotalScore')}</div>
          </div>
          <div class="bg-nexai-card border border-nexai-border rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-cyber-green">${bartGame.collections}</div>
            <div class="text-xs text-gray-500">${t('bartCollections')}</div>
          </div>
          <div class="bg-nexai-card border border-nexai-border rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-red-500">${bartGame.explosions}</div>
            <div class="text-xs text-gray-500">${t('bartExplosions')}</div>
          </div>
        </div>

        <!-- Balloon Area -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-8 mb-6">
          <div class="flex flex-col items-center">
            <!-- Balloon -->
            <div 
              id="balloon"
              class="relative transition-all duration-200 ease-out"
              style="width: ${balloonSize}px; height: ${balloonSize * 1.2}px;"
            >
              <div class="absolute inset-0 bg-gradient-to-br ${balloonColor} rounded-full shadow-lg shadow-current/30 animate-pulse-slow"></div>
              <div class="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full"></div>
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div class="w-2 h-8 bg-gray-600 rounded-b"></div>
              </div>
            </div>

            <!-- Current Pumps -->
            <div class="mt-12 text-center">
              <div class="text-4xl font-bold text-white">${bartGame.currentPumps}</div>
              <div class="text-gray-500">${t('bartPump')}</div>
              <div class="text-nexai-gold mt-2">
                ${t('bartPotential')}: <span class="font-bold">${bartGame.currentPumps * 5}</span> ${t('bartPoints')}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4">
          <button 
            onclick="handleBARTPump()"
            aria-label="${t('bartPumpBtn')}"
            class="flex-1 max-w-xs px-8 py-4 bg-gradient-to-r from-cyber-pink to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyber-pink/30 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyber-pink focus:ring-offset-2 focus:ring-offset-nexai-dark"
          >
            <i class="fas fa-arrow-up mr-2" aria-hidden="true"></i>
            ${t('bartPumpBtn')}
          </button>
          <button 
            onclick="handleBARTCollect()"
            aria-label="${t('bartCollectBtn')}"
            class="flex-1 max-w-xs px-8 py-4 bg-gradient-to-r from-cyber-green to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyber-green/30 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-nexai-dark disabled:opacity-50 disabled:cursor-not-allowed"
            ${bartGame.currentPumps === 0 ? 'disabled aria-disabled="true"' : ''}
          >
            <i class="fas fa-piggy-bank mr-2" aria-hidden="true"></i>
            ${t('bartCollectBtn')}
          </button>
        </div>

        <!-- Instructions -->
        <div class="mt-8 text-center text-sm text-gray-500">
          <p><i class="fas fa-info-circle mr-1"></i> ${t('bartInstruction')}</p>
        </div>
      </div>
    </div>
  `;
}

function renderBARTResults(results) {
  // Determine risk archetype based on language
  const archetypes = state.language === 'tr' ? {
    guardian: { name: 'Koruyucu', desc: 'Güvenliği ve kontrolü tercih ediyorsunuz.' },
    strategist: { name: 'Stratejist', desc: 'Hesaplanmış riskler alıyorsunuz.' },
    balancer: { name: 'Dengeleyici', desc: 'Risk ve güvenlik arasında denge kuruyorsunuz.' },
    adventurer: { name: 'Maceracı', desc: 'Yeni deneyimlere ve risklere açıksınız.' },
    hero: { name: 'Kahraman', desc: 'Yüksek risk toleransınız var, dikkatli olun.' }
  } : {
    guardian: { name: 'Guardian', desc: 'You prefer safety and control.' },
    strategist: { name: 'Strategist', desc: 'You take calculated risks.' },
    balancer: { name: 'Balancer', desc: 'You balance between risk and safety.' },
    adventurer: { name: 'Adventurer', desc: 'You are open to new experiences and risks.' },
    hero: { name: 'Hero', desc: 'You have high risk tolerance, be careful.' }
  };
  
  const riskArchetype = results.riskScore <= 20 ? { ...archetypes.guardian, icon: 'fa-shield-alt', color: 'cyber-blue' } :
                        results.riskScore <= 40 ? { ...archetypes.strategist, icon: 'fa-chess', color: 'cyber-green' } :
                        results.riskScore <= 60 ? { ...archetypes.balancer, icon: 'fa-balance-scale', color: 'nexai-gold' } :
                        results.riskScore <= 80 ? { ...archetypes.adventurer, icon: 'fa-mountain', color: 'orange-500' } :
                        { ...archetypes.hero, icon: 'fa-fire', color: 'red-500' };

  return `
    <div class="flex flex-col items-center justify-center min-h-full p-6">
      <div class="w-full max-w-2xl">
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-8 text-center">
          <!-- Header -->
          <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-${riskArchetype.color}/20 to-${riskArchetype.color}/5 flex items-center justify-center mb-6">
            <i class="fas ${riskArchetype.icon} text-4xl text-${riskArchetype.color}"></i>
          </div>
          <h3 class="text-2xl font-cinzel font-bold text-white mb-2">${t('bartComplete')}</h3>
          <p class="text-gray-400 mb-8">${riskArchetype.desc}</p>

          <!-- Risk Score -->
          <div class="mb-8">
            <div class="text-6xl font-bold bg-gradient-to-r from-${riskArchetype.color} to-nexai-gold bg-clip-text text-transparent">
              ${results.riskScore}%
            </div>
            <div class="text-gray-500">${t('bartRiskTolerance')}</div>
            <div class="text-lg text-${riskArchetype.color} font-semibold mt-2">${riskArchetype.name}</div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-black/30 rounded-xl p-4">
              <div class="text-2xl font-bold text-nexai-gold">${results.totalScore}</div>
              <div class="text-xs text-gray-500">${t('bartTotalScore')}</div>
            </div>
            <div class="bg-black/30 rounded-xl p-4">
              <div class="text-2xl font-bold text-white">${results.avgPumps}</div>
              <div class="text-xs text-gray-500">${t('bartAvgPump')}</div>
            </div>
            <div class="bg-black/30 rounded-xl p-4">
              <div class="text-2xl font-bold text-cyber-green">${results.collections}</div>
              <div class="text-xs text-gray-500">${t('bartCollections')}</div>
            </div>
            <div class="bg-black/30 rounded-xl p-4">
              <div class="text-2xl font-bold text-red-500">${results.explosions}</div>
              <div class="text-xs text-gray-500">${t('bartExplosions')}</div>
            </div>
          </div>

          <!-- Pumps History Chart -->
          <div class="bg-black/30 rounded-xl p-4 mb-8">
            <h4 class="text-sm text-gray-400 mb-3">${t('bartRoundPerformance')}</h4>
            <div class="flex items-end justify-center space-x-2 h-24">
              ${results.pumpsHistory.map((h, i) => `
                <div class="flex flex-col items-center">
                  <div 
                    class="w-8 rounded-t ${h.collected ? 'bg-cyber-green' : 'bg-red-500'}" 
                    style="height: ${Math.max(4, h.pumps)}px"
                  ></div>
                  <span class="text-xs text-gray-500 mt-1">${i + 1}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button onclick="saveBARTResults()" class="px-6 py-3 bg-gradient-to-r from-nexai-gold to-nexai-accent text-nexai-dark font-semibold rounded-xl hover:shadow-lg transition-all">
              <i class="fas fa-save mr-2"></i>${t('bartSaveResults')}
            </button>
            <button onclick="resetBARTGame()" class="px-6 py-3 bg-white/5 border border-nexai-border text-white rounded-xl hover:bg-white/10 transition-all">
              <i class="fas fa-redo mr-2"></i>${t('bartPlayAgain')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProfileView() {
  // Require authentication
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }
  
  return `
    <div class="p-6">
      <div class="max-w-4xl mx-auto">
        ${!state.profile ? `
          <div class="bg-nexai-card border border-nexai-border rounded-2xl p-8 text-center">
            <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 flex items-center justify-center mb-6">
              <i class="fas fa-user-circle text-4xl text-cyber-purple"></i>
            </div>
            <h3 class="text-xl font-cinzel font-semibold text-white mb-2">${t('profileNotCreated')}</h3>
            <p class="text-gray-400 mb-6">${t('profileNotCreatedDesc')}</p>
            <div class="flex justify-center space-x-4">
              <button onclick="generateProfile()" class="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-semibold rounded-xl hover:shadow-lg transition-all ${state.messages.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}" ${state.messages.length < 2 ? 'disabled' : ''}>
                <i class="fas fa-magic mr-2"></i>${t('createProfile')}
              </button>
              <button onclick="switchView('bart')" class="px-6 py-3 bg-white/5 border border-nexai-border text-white rounded-xl hover:bg-white/10 transition-all">
                <i class="fas fa-gamepad mr-2"></i>${t('bartTest')}
              </button>
            </div>
          </div>
        ` : renderProfileContent()}
      </div>
    </div>
  `;
}

function renderProfileContent() {
  const profile = state.profile;
  const bigFive = profile.bigFive || {};
  const traitNames = state.language === 'tr' 
    ? ['Açıklık', 'Sorumluluk', 'Dışa Dönüklük', 'Uyumluluk', 'Nevrotiklik']
    : ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
  const traits = [
    { name: traitNames[0], value: bigFive.openness || 50, color: 'cyber-purple', icon: 'fa-lightbulb' },
    { name: traitNames[1], value: bigFive.conscientiousness || 50, color: 'cyber-green', icon: 'fa-check-circle' },
    { name: traitNames[2], value: bigFive.extraversion || 50, color: 'nexai-gold', icon: 'fa-users' },
    { name: traitNames[3], value: bigFive.agreeableness || 50, color: 'cyber-blue', icon: 'fa-handshake' },
    { name: traitNames[4], value: bigFive.neuroticism || 50, color: 'cyber-pink', icon: 'fa-heart' }
  ];

  return `
    <div class="space-y-6">
      <!-- Archetype Card -->
      <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-cinzel font-semibold text-white">${t('archetypeProfile')}</h3>
          <button onclick="generateProfile()" class="text-sm text-nexai-gold hover:underline">
            <i class="fas fa-sync-alt mr-1"></i>${t('refresh')}
          </button>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-nexai-gold/10 to-transparent rounded-xl border border-nexai-gold/20">
            <div class="w-16 h-16 mx-auto rounded-full bg-nexai-gold/20 flex items-center justify-center mb-4">
              <i class="fas fa-sun text-3xl text-nexai-gold"></i>
            </div>
            <h4 class="text-lg font-semibold text-white mb-1">${profile.dominantArchetype || (state.language === 'tr' ? 'Kaşif' : 'Explorer')}</h4>
            <p class="text-sm text-gray-400">${t('dominantArchetype')}</p>
          </div>
          
          <div class="text-center p-6 bg-gradient-to-br from-cyber-purple/10 to-transparent rounded-xl border border-cyber-purple/20">
            <div class="w-16 h-16 mx-auto rounded-full bg-cyber-purple/20 flex items-center justify-center mb-4">
              <i class="fas fa-moon text-3xl text-cyber-purple"></i>
            </div>
            <h4 class="text-lg font-semibold text-white mb-1">${profile.shadowArchetype || (state.language === 'tr' ? 'Gezgin' : 'Wanderer')}</h4>
            <p class="text-sm text-gray-400">${t('shadowArchetype')}</p>
          </div>
        </div>
      </div>

      <!-- Big Five Chart -->
      <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
        <h3 class="text-lg font-cinzel font-semibold text-white mb-6">${t('bigFiveTitle')}</h3>
        
        <div class="space-y-4">
          ${traits.map(trait => `
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="flex items-center space-x-2">
                  <i class="fas ${trait.icon} text-${trait.color}"></i>
                  <span class="text-gray-300">${trait.name}</span>
                </span>
                <span class="text-${trait.color} font-semibold">${trait.value}%</span>
              </div>
              <div class="h-3 bg-black/30 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-${trait.color} to-${trait.color}/50 rounded-full transition-all duration-1000" style="width: ${trait.value}%"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Radar Chart Placeholder -->
        <div class="mt-8">
          <canvas id="bigFiveChart" class="w-full max-w-md mx-auto"></canvas>
        </div>
      </div>

      <!-- Key Insights -->
      ${profile.keyInsights && profile.keyInsights.length > 0 ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-lightbulb text-nexai-gold mr-2"></i>Anahtar İçgörüler
          </h3>
          <ul class="space-y-3">
            ${profile.keyInsights.map(insight => `
              <li class="flex items-start space-x-3">
                <i class="fas fa-check-circle text-cyber-green mt-1"></i>
                <span class="text-gray-300">${insight}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Growth Areas -->
      ${profile.growthAreas && profile.growthAreas.length > 0 ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-seedling text-cyber-green mr-2"></i>Gelişim Alanları
          </h3>
          <ul class="space-y-3">
            ${profile.growthAreas.map(area => `
              <li class="flex items-start space-x-3">
                <i class="fas fa-arrow-right text-nexai-gold mt-1"></i>
                <span class="text-gray-300">${area}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

function renderPsychoCoreView() {
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }

  return `
    <div class="p-6 md:p-8 space-y-8 animate-in slide-in-from-bottom duration-500">
      <div class="max-w-4xl mx-auto">
        <header class="mb-8 text-center">
          <div class="inline-block p-4 rounded-2xl bg-cyber-purple/10 mb-4">
            <i class="fas fa-brain text-4xl text-cyber-purple"></i>
          </div>
          <h2 class="text-3xl font-cinzel font-bold text-white mb-2">${t('psychoViewTitle')}</h2>
          <p class="text-gray-400">${t('psychoViewDesc')}</p>
        </header>

        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6 md:p-8">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">${t('psychoInputLabel')}</label>
              <textarea id="psycho-input" class="w-full h-48 bg-black/30 border border-nexai-border rounded-xl p-4 text-white focus:border-cyber-purple outline-none transition-all resize-none" placeholder="${t('psychoPlaceholder')}"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">${t('psychoScopeLabel')}</label>
                <select id="psycho-scope" class="w-full bg-black/30 border border-nexai-border rounded-xl p-3 text-white focus:border-cyber-purple outline-none">
                  <option value="Hızlı">${t('psychoScopeFast')}</option>
                  <option value="Detaylı">${t('psychoScopeDetailed')}</option>
                  <option value="Kriz Müdahalesi">${t('psychoScopeCrisis')}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">${t('psychoContextLabel')}</label>
                <select id="psycho-context" class="w-full bg-black/30 border border-nexai-border rounded-xl p-3 text-white focus:border-cyber-purple outline-none">
                  <option value="western">${t('psychoContextWestern')}</option>
                  <option value="eastern">${t('psychoContextEastern')}</option>
                </select>
              </div>
            </div>

            <button onclick="startPsychoAnalysis()" id="psycho-btn" class="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center space-x-2">
              <i class="fas fa-microchip"></i>
              <span>${t('psychoRunBtn')}</span>
            </button>
          </div>
        </div>

        <div id="psycho-results" class="mt-8 hidden">
          <!-- Results will be injected here -->
        </div>
      </div>
    </div>
  `;
}

async function startPsychoAnalysis() {
  const input = document.getElementById('psycho-input').value;
  const scope = document.getElementById('psycho-scope').value;
  const context = document.getElementById('psycho-context').value;
  const btn = document.getElementById('psycho-btn');
  const resultsDiv = document.getElementById('psycho-results');

  if (!input || input.length < 20) {
    showNotification(t('minCharWarning'), 'warning');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${t('psychoRunning')}</span>`;
  
  try {
    const result = await API.psychocoreX(input, scope, context);
    
    if (result && result.analysis) {
      state.psychoXResult = result.analysis;
      renderPsychoResults(result.analysis);
      resultsDiv.classList.remove('hidden');
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
      showNotification(t('analysisError'), 'error');
    }
  } catch (error) {
    console.error(error);
    showNotification(t('analysisError'), 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-microchip"></i> <span>${t('psychoRunBtn')}</span>`;
  }
}

function renderPsychoResults(analysis) {
  const resultsDiv = document.getElementById('psycho-results');
  
  resultsDiv.innerHTML = `
    <div class="bg-nexai-card border border-nexai-gold/30 rounded-2xl p-6 md:p-8 animate-in zoom-in duration-500">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-2xl font-cinzel font-bold text-nexai-gold">${t('psychoResultTitle')}</h3>
        <span class="px-4 py-1 bg-nexai-gold/10 text-nexai-gold rounded-full text-xs font-bold border border-nexai-gold/20">
          ${t('psychoConfidenceScore')}: %${analysis.confidence || 85}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-black/30 p-4 rounded-xl border border-nexai-border">
          <p class="text-xs text-gray-500 uppercase mb-1">${t('profileArchetype')}</p>
          <p class="text-lg font-cinzel text-white">${analysis.dominant_archetype || t('psychoNotDetermined')}</p>
        </div>
        <div class="bg-black/30 p-4 rounded-xl border border-nexai-border">
          <p class="text-xs text-gray-500 uppercase mb-1">${t('psychoRiskTolerance')}</p>
          <p class="text-lg font-cinzel text-white">${analysis.risk_tolerance || t('psychoRiskMedium')}</p>
        </div>
        <div class="bg-black/30 p-4 rounded-xl border border-nexai-border">
          <p class="text-xs text-gray-500 uppercase mb-1">${t('dpaeAttachmentStyle')}</p>
          <p class="text-lg font-cinzel text-white">${analysis.attachment_style || t('psychoSecure')}</p>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold mb-3 flex items-center">
            <i class="fas fa-lightbulb text-nexai-gold mr-2"></i> ${t('psychoInsights')}
          </h4>
          <div class="bg-black/20 p-4 rounded-xl text-gray-300 leading-relaxed text-sm">
            ${analysis.insights || t('psychoNoInsights')}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-white font-bold mb-3">${t('psychoShadowTraits')}</h4>
            <div class="flex flex-wrap gap-2">
              ${(analysis.shadow_traits || []).map(trait => `
                <span class="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs border border-red-500/20">${trait}</span>
              `).join('')}
            </div>
          </div>
          <div>
            <h4 class="text-white font-bold mb-3">${t('psychoCognitiveBiases')}</h4>
            <div class="flex flex-wrap gap-2">
              ${(analysis.cognitive_biases || []).map(bias => `
                <span class="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs border border-blue-500/20">${bias}</span>
              `).join('')}
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-white font-bold mb-3 text-nexai-accent">${t('psychoRecommendedExercises')}</h4>
          <div class="space-y-3">
            ${(analysis.recommended_exercises || []).map(ex => `
              <div class="p-4 bg-white/5 border border-nexai-border rounded-xl">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-nexai-gold text-xs font-bold uppercase">${ex.type}</span>
                </div>
                <p class="text-sm text-gray-300">${ex.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDeepAnalysisView() {
  // Require authentication
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }
  
  const deepLabels = state.language === 'tr' ? {
    title: 'Çok Katmanlı Analiz',
    desc: '3 ayrı AI ajanı ile derinlemesine psikolojik profil analizi. Google Gemini 3\'ün "Extended Thinking" modu ile çalışır.',
    agent1: 'Kültürel Antropolog',
    agent2: 'Gölge Avcısı',
    agent3: 'Estetik Küratör',
    startBtn: 'Derin Analiz Başlat',
    requirement: 'En az 3 mesaj veya tamamlanmış BART testi gereklidir.'
  } : {
    title: 'Multi-Layer Analysis',
    desc: 'Deep psychological profile analysis with 3 separate AI agents. Powered by Google Gemini 3\'s "Extended Thinking" mode.',
    agent1: 'Cultural Anthropologist',
    agent2: 'Shadow Hunter',
    agent3: 'Aesthetic Curator',
    startBtn: 'Start Deep Analysis',
    requirement: 'At least 3 messages or completed BART test required.'
  };
  
  return `
    <div class="p-6">
      <div class="max-w-4xl mx-auto">
        ${!state.deepAnalysis ? `
          <div class="bg-nexai-card border border-nexai-border rounded-2xl p-8 text-center">
            <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyber-purple/20 to-cyber-pink/20 flex items-center justify-center mb-6">
              <i class="fas fa-brain text-4xl text-cyber-purple"></i>
            </div>
            <h3 class="text-xl font-cinzel font-semibold text-white mb-2">${deepLabels.title}</h3>
            <p class="text-gray-400 mb-6">${deepLabels.desc}</p>
            
            <div class="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
              <div class="bg-black/30 rounded-xl p-4">
                <i class="fas fa-globe text-2xl text-nexai-gold mb-2"></i>
                <p class="text-xs text-gray-400">${deepLabels.agent1}</p>
              </div>
              <div class="bg-black/30 rounded-xl p-4">
                <i class="fas fa-mask text-2xl text-cyber-purple mb-2"></i>
                <p class="text-xs text-gray-400">${deepLabels.agent2}</p>
              </div>
              <div class="bg-black/30 rounded-xl p-4">
                <i class="fas fa-film text-2xl text-cyber-pink mb-2"></i>
                <p class="text-xs text-gray-400">${deepLabels.agent3}</p>
              </div>
            </div>

            <button onclick="runDeepAnalysis()" class="px-8 py-4 bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyber-purple/30 transition-all ${state.messages.length < 3 && !state.bartData ? 'opacity-50 cursor-not-allowed' : ''}" ${state.messages.length < 3 && !state.bartData ? 'disabled' : ''}>
              <i class="fas fa-rocket mr-2"></i>${deepLabels.startBtn}
            </button>
            
            <p class="text-sm text-gray-500 mt-4">
              <i class="fas fa-info-circle mr-1"></i>
              ${deepLabels.requirement}
            </p>
          </div>
        ` : renderDeepAnalysisContent()}
      </div>
    </div>
  `;
}

function renderDeepAnalysisContent() {
  const analysis = state.deepAnalysis;
  const agents = analysis.agents || {};

  return `
    <div class="space-y-6">
      <!-- Metadata -->
      <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span><i class="fas fa-clock mr-1"></i>${new Date(analysis.metadata?.timestamp).toLocaleString('tr-TR')}</span>
        <button onclick="runDeepAnalysis()" class="text-nexai-gold hover:underline">
          <i class="fas fa-sync-alt mr-1"></i>Yeniden Analiz
        </button>
      </div>

      <!-- Agent Results -->
      <div class="grid md:grid-cols-3 gap-4">
        <!-- Cultural Anthropologist -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-nexai-gold/20 flex items-center justify-center">
              <i class="fas fa-globe text-nexai-gold"></i>
            </div>
            <div>
              <h4 class="font-semibold text-white">Kültürel Antropolog</h4>
              <p class="text-xs text-gray-500">${agents.culturalAnthropologist?.model || 'Gemini'}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Bağlam Seviyesi:</span>
              <span class="text-white capitalize">${agents.culturalAnthropologist?.analysis?.contextLevel || 'medium'}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Güven:</span>
              <span class="text-nexai-gold">${agents.culturalAnthropologist?.analysis?.confidence || 50}%</span>
            </div>
          </div>
        </div>

        <!-- Shadow Hunter -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-cyber-purple/20 flex items-center justify-center">
              <i class="fas fa-mask text-cyber-purple"></i>
            </div>
            <div>
              <h4 class="font-semibold text-white">Gölge Avcısı</h4>
              <p class="text-xs text-gray-500">${agents.shadowHunter?.model || 'Gemini'}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Dominant:</span>
              <span class="text-white capitalize">${agents.shadowHunter?.analysis?.dominantArchetype || 'explorer'}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Gölge:</span>
              <span class="text-cyber-purple capitalize">${agents.shadowHunter?.analysis?.shadowArchetype || 'wanderer'}</span>
            </div>
          </div>
        </div>

        <!-- Aesthetic Curator -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-cyber-pink/20 flex items-center justify-center">
              <i class="fas fa-film text-cyber-pink"></i>
            </div>
            <div>
              <h4 class="font-semibold text-white">Estetik Küratör</h4>
              <p class="text-xs text-gray-500">${agents.aestheticCurator?.model || 'Gemini'}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Öneriler:</span>
              <span class="text-white">${(agents.aestheticCurator?.analysis?.recommendations?.films?.length || 0) + (agents.aestheticCurator?.analysis?.recommendations?.books?.length || 0)} içerik</span>
            </div>
            <button onclick="switchView('curation')" class="w-full mt-2 text-cyber-pink text-sm hover:underline">
              <i class="fas fa-arrow-right mr-1"></i>Detayları Gör
            </button>
          </div>
        </div>
      </div>

      <!-- Johari Window -->
      ${agents.shadowHunter?.analysis?.johariAnalysis ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-6">
            <i class="fas fa-th-large text-cyber-purple mr-2"></i>Johari Penceresi
          </h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-cyber-green/10 border border-cyber-green/30 rounded-xl p-4">
              <h4 class="text-cyber-green font-semibold mb-2"><i class="fas fa-eye mr-1"></i>Açık Alan</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                ${(agents.shadowHunter.analysis.johariAnalysis.openArea || []).map(item => `<li>• ${item}</li>`).join('') || '<li class="text-gray-500">Veri yetersiz</li>'}
              </ul>
            </div>
            
            <div class="bg-nexai-gold/10 border border-nexai-gold/30 rounded-xl p-4">
              <h4 class="text-nexai-gold font-semibold mb-2"><i class="fas fa-eye-slash mr-1"></i>Kör Nokta</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                ${(agents.shadowHunter.analysis.johariAnalysis.blindSpots || []).map(item => `<li>• ${item}</li>`).join('') || '<li class="text-gray-500">Veri yetersiz</li>'}
              </ul>
            </div>
            
            <div class="bg-cyber-purple/10 border border-cyber-purple/30 rounded-xl p-4">
              <h4 class="text-cyber-purple font-semibold mb-2"><i class="fas fa-user-secret mr-1"></i>Gizli Alan</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                ${(agents.shadowHunter.analysis.johariAnalysis.hiddenArea || []).map(item => `<li>• ${item}</li>`).join('') || '<li class="text-gray-500">Veri yetersiz</li>'}
              </ul>
            </div>
            
            <div class="bg-cyber-blue/10 border border-cyber-blue/30 rounded-xl p-4">
              <h4 class="text-cyber-blue font-semibold mb-2"><i class="fas fa-question mr-1"></i>Bilinmeyen</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                ${(agents.shadowHunter.analysis.johariAnalysis.unknownPotential || []).map(item => `<li>• ${item}</li>`).join('') || '<li class="text-gray-500">Keşfedilmeyi bekliyor</li>'}
              </ul>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Final Profile Summary -->
      ${analysis.finalProfile ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-6">
            <i class="fas fa-chart-pie text-nexai-gold mr-2"></i>Sentezlenmiş Profil
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-sm text-gray-400 mb-3">Kültürel Özellikler</h4>
              <div class="space-y-2">
                ${Object.entries(analysis.finalProfile.integratedProfile?.culturalTraits || {}).map(([key, value]) => `
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 text-sm capitalize">${key.replace(/([A-Z])/g, ' $1')}</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 h-2 bg-black/30 rounded-full overflow-hidden">
                        <div class="h-full bg-nexai-gold rounded-full" style="width: ${value}%"></div>
                      </div>
                      <span class="text-sm text-nexai-gold w-8">${value}%</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div>
              <h4 class="text-sm text-gray-400 mb-3">Risk Profili</h4>
              <div class="space-y-2">
                ${Object.entries(analysis.finalProfile.integratedProfile?.riskProfile || {}).map(([key, value]) => `
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 text-sm capitalize">${key.replace(/([A-Z])/g, ' $1')}</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 h-2 bg-black/30 rounded-full overflow-hidden">
                        <div class="h-full bg-cyber-pink rounded-full" style="width: ${value}%"></div>
                      </div>
                      <span class="text-sm text-cyber-pink w-8">${value}%</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================
// PSYCHOCORE-ULTRA VIEW
// ============================================
function renderUltraView() {
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }

  if (!state.dpaeResult) {
    return `
      <div class="h-full flex items-center justify-center p-6">
        <div class="max-w-md text-center">
          <div class="w-20 h-20 mx-auto rounded-full bg-nexai-gold/10 border-2 border-nexai-gold/30 flex items-center justify-center mb-6">
            <i class="fas fa-lock text-3xl text-nexai-gold/50"></i>
          </div>
          <h3 class="text-xl font-cinzel font-bold text-white mb-3">${t('ultraLocked')}</h3>
          <p class="text-gray-400 mb-6">PsychoCore-ULTRA modülü için önce DPAE analizinizi tamamlamanız gerekiyor.</p>
          <button onclick="switchView('dpae')" class="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-bold rounded-xl hover:shadow-lg transition-all">
            ${t('startDPAE')}
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="p-6 md:p-8 space-y-8 animate-in slide-in-from-bottom duration-500">
      <div class="max-w-4xl mx-auto">
        <header class="mb-8 text-center">
          <div class="inline-block p-4 rounded-2xl bg-gradient-to-br from-nexai-gold/20 to-amber-600/20 mb-4 border border-nexai-gold/30">
            <i class="fas fa-atom text-4xl text-nexai-gold"></i>
          </div>
          <span class="px-3 py-1 bg-nexai-gold/20 text-nexai-gold text-xs font-bold rounded-full mb-4 inline-block">${t('premiumModule')}</span>
          <h2 class="text-3xl font-cinzel font-bold text-white mb-2">${t('ultraViewTitle')}</h2>
          <p class="text-gray-400">${t('ultraViewDesc')}</p>
        </header>

        <!-- DPAE Profile Summary -->
        <div class="bg-nexai-card border border-nexai-gold/30 rounded-2xl p-6 mb-8">
          <h3 class="text-white font-bold mb-4 flex items-center">
            <i class="fas fa-id-card text-nexai-gold mr-2"></i>
            ${t('dpaePersonalityProfile')}
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-3 bg-black/30 rounded-xl">
              <p class="text-xs text-gray-500 mb-1">${t('dpaeDominantArchetype')}</p>
              <p class="text-white font-semibold">${state.dpaeResult.profile.jungArchetype.dominant}</p>
            </div>
            <div class="text-center p-3 bg-black/30 rounded-xl">
              <p class="text-xs text-gray-500 mb-1">${t('dpaeShadowArchetype')}</p>
              <p class="text-cyber-purple font-semibold">${state.dpaeResult.profile.jungArchetype.shadow}</p>
            </div>
            <div class="text-center p-3 bg-black/30 rounded-xl">
              <p class="text-xs text-gray-500 mb-1">${t('dpaeAttachmentStyle')}</p>
              <p class="text-cyber-blue font-semibold capitalize">${state.dpaeResult.profile.attachmentStyle}</p>
            </div>
            <div class="text-center p-3 bg-black/30 rounded-xl">
              <p class="text-xs text-gray-500 mb-1">Risk Tolerance</p>
              <p class="text-cyber-green font-semibold">${state.dpaeResult.profile.riskTolerance || 'N/A'}</p>
            </div>
          </div>
        </div>

        <!-- ULTRA Input Form -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6 md:p-8">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">${t('ultraInputLabel')}</label>
              <textarea id="ultra-input" class="w-full h-48 bg-black/30 border border-nexai-border rounded-xl p-4 text-white focus:border-nexai-gold outline-none transition-all resize-none" placeholder="${t('ultraPlaceholder')}"></textarea>
              <p class="text-xs text-gray-500 mt-2 flex items-center">
                <i class="fas fa-clock mr-1.5"></i>
                ${state.language === 'tr' ? 'Beklenen süre: 30-90 saniye (AI modeline göre değişir)' : 'Expected time: 30-90 seconds (varies by AI model)'}
              </p>
            </div>

            <button onclick="startUltraAnalysis()" id="ultra-btn" class="w-full py-4 rounded-xl bg-gradient-to-r from-nexai-gold to-amber-600 text-nexai-dark font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center space-x-2">
              <i class="fas fa-atom"></i>
              <span>${t('ultraRunBtn')}</span>
            </button>
          </div>
        </div>

        <div id="ultra-results" class="mt-8 hidden">
          <!-- Results will be injected here -->
        </div>
      </div>
    </div>
  `;
}

async function startUltraAnalysis() {
  const input = document.getElementById('ultra-input').value;
  const btn = document.getElementById('ultra-btn');
  const resultsDiv = document.getElementById('ultra-results');

  if (!input || input.length < 30) {
    showNotification(state.language === 'tr' ? 'Lütfen en az 30 karakterlik derin bir soru veya sorun yazın.' : 'Please write a deep question or concern of at least 30 characters.', 'warning');
    return;
  }

  btn.disabled = true;
  
  // Progress animation
  let dots = 0;
  const progressInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    const dotStr = '.'.repeat(dots);
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${state.language === 'tr' ? 'Analiz Yapılıyor' : 'Analyzing'}${dotStr}</span>`;
  }, 500);
  
  // Timeout after 120 seconds (2 minutes)
  const timeoutId = setTimeout(() => {
    clearInterval(progressInterval);
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-atom"></i> <span>${t('ultraRunBtn')}</span>`;
    showNotification(state.language === 'tr' ? 'Analiz zaman aşımına uğradı. Lütfen tekrar deneyin.' : 'Analysis timed out. Please try again.', 'error');
  }, 120000);
  
  try {
    const result = await API.psychocoreUltra(input, state.dpaeResult);
    clearTimeout(timeoutId);
    clearInterval(progressInterval);
    
    if (result && result.analysis) {
      state.ultraResult = result.analysis;
      renderUltraResults(result.analysis);
      resultsDiv.classList.remove('hidden');
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
      showNotification(t('ultraCompleted'), 'success');
    } else {
      showNotification(t('analysisError'), 'error');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    clearInterval(progressInterval);
    console.error(error);
    showNotification(t('analysisError'), 'error');
  } finally {
    clearInterval(progressInterval);
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-atom"></i> <span>${t('ultraRunBtn')}</span>`;
  }
}

function renderUltraResults(analysis) {
  const resultsDiv = document.getElementById('ultra-results');
  
  resultsDiv.innerHTML = `
    <div class="bg-gradient-to-br from-nexai-gold/10 via-transparent to-cyber-purple/10 border border-nexai-gold/30 rounded-3xl p-8 space-y-8">
      <div class="text-center mb-8">
        <div class="inline-block p-4 rounded-full bg-nexai-gold/20 mb-4">
          <i class="fas fa-atom text-3xl text-nexai-gold animate-spin-slow"></i>
        </div>
        <h3 class="text-2xl font-cinzel font-bold text-white mb-2">ULTRA Synthesis Complete</h3>
      </div>

      <!-- Main Analysis -->
      <div class="prose prose-invert max-w-none">
        <div class="bg-black/40 rounded-2xl p-6 border border-white/10">
          <h4 class="text-nexai-gold font-bold mb-4 flex items-center">
            <i class="fas fa-brain mr-2"></i>
            ${state.language === 'tr' ? 'Derin Psikolojik Analiz' : 'Deep Psychological Analysis'}
          </h4>
          <div class="text-gray-300 leading-relaxed whitespace-pre-wrap">${analysis.deepAnalysis || analysis.response || 'Analysis in progress...'}</div>
        </div>
      </div>

      ${analysis.existentialInsights ? `
        <div class="bg-black/40 rounded-2xl p-6 border border-cyber-purple/30">
          <h4 class="text-cyber-purple font-bold mb-4 flex items-center">
            <i class="fas fa-infinity mr-2"></i>
            ${state.language === 'tr' ? 'Varoluşsal İçgörüler' : 'Existential Insights'}
          </h4>
          <div class="text-gray-300 leading-relaxed whitespace-pre-wrap">${analysis.existentialInsights}</div>
        </div>
      ` : ''}

      ${analysis.neuropsychology ? `
        <div class="bg-black/40 rounded-2xl p-6 border border-cyber-blue/30">
          <h4 class="text-cyber-blue font-bold mb-4 flex items-center">
            <i class="fas fa-project-diagram mr-2"></i>
            ${state.language === 'tr' ? 'Nöropsikolojik Perspektif' : 'Neuropsychological Perspective'}
          </h4>
          <div class="text-gray-300 leading-relaxed whitespace-pre-wrap">${analysis.neuropsychology}</div>
        </div>
      ` : ''}

      ${analysis.recommendations ? `
        <div class="bg-black/40 rounded-2xl p-6 border border-cyber-green/30">
          <h4 class="text-cyber-green font-bold mb-4 flex items-center">
            <i class="fas fa-lightbulb mr-2"></i>
            ${state.language === 'tr' ? 'Entegrasyon Önerileri' : 'Integration Recommendations'}
          </h4>
          <ul class="space-y-3">
            ${(Array.isArray(analysis.recommendations) ? analysis.recommendations : [analysis.recommendations]).map(rec => `
              <li class="flex items-start space-x-3">
                <div class="w-6 h-6 rounded-full bg-cyber-green/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <i class="fas fa-check text-xs text-cyber-green"></i>
                </div>
                <span class="text-gray-300">${rec}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================
// DPAE VIEW
// ============================================
function renderDPAEView() {
  if (!state.isAuthenticated) return renderLoginRequiredScreen();

  const dpaeResult = state.dpaeResult;
  
  const stages = [
    { id: 1, name: t('dpaeStage1'), status: dpaeResult ? 'completed' : 'active' },
    { id: 2, name: t('dpaeStage2'), status: dpaeResult ? 'completed' : 'pending' },
    { id: 3, name: t('dpaeStage3'), status: dpaeResult ? 'completed' : 'pending' },
    { id: 4, name: t('dpaeStage4'), status: dpaeResult ? 'completed' : 'pending' },
    { id: 5, name: t('dpaeStage5'), status: dpaeResult ? 'completed' : 'pending' },
    { id: 6, name: t('dpaeStage6'), status: dpaeResult ? 'completed' : 'pending' },
    { id: 7, name: t('dpaeStage7'), status: dpaeResult ? 'completed' : 'pending' },
    { id: 8, name: t('dpaeStage8'), status: dpaeResult ? 'completed' : 'pending' }
  ];

  return `
    <div class="h-full overflow-y-auto p-6 scrollbar-hide">
      <div class="max-w-5xl mx-auto space-y-8 pb-12">
        <!-- Hero Section -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyber-purple/20 via-nexai-dark to-cyber-blue/20 border border-nexai-border p-8 md:p-12">
          <div class="relative z-10 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-cyber-purple/20 text-cyber-purple px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-cyber-purple/30">
              <i class="fas fa-atom animate-spin-slow"></i>
              <span>OMNI-PRIME v4.3 DPAE Engine</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4 leading-tight">
              ${t('dpaeHeroTitle')}
            </h1>
            <p class="text-gray-400 text-lg mb-8 leading-relaxed">
              ${t('dpaeHeroDesc')}
            </p>
            ${!dpaeResult ? `
              <button onclick="startDPAE()" class="px-8 py-4 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all transform hover:-translate-y-1">
                ${t('dpaeStartBtn')} <i class="fas fa-chevron-right ml-2 text-sm opacity-50"></i>
              </button>
            ` : `
              <div class="flex flex-wrap gap-4">
                <button onclick="state.dpaeResult = null; renderApp();" class="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-medium">
                  ${t('dpaeNewBtn')}
                </button>
                <button onclick="exportData()" class="px-6 py-3 bg-nexai-gold/20 border border-nexai-gold/30 text-nexai-gold rounded-xl hover:bg-nexai-gold/30 transition-all font-medium">
                  ${t('dpaeDownloadBtn')}
                </button>
              </div>
            `}
          </div>
          
          <!-- Abstract Background Element -->
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-cyber-purple/20 blur-[120px] rounded-full"></div>
          <div class="absolute right-20 -bottom-20 w-60 h-60 bg-cyber-blue/20 blur-[100px] rounded-full"></div>
        </div>

        ${!dpaeResult ? `
          <!-- Stages Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            ${stages.map((s, i) => `
              <div class="bg-nexai-card border border-nexai-border p-5 rounded-2xl group transition-all hover:border-nexai-gold/30">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-2xl font-bold font-cinzel ${s.status === 'active' ? 'text-nexai-gold' : 'text-gray-600'}">0${s.id}</span>
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center ${s.status === 'active' ? 'bg-nexai-gold/20 text-nexai-gold' : 'bg-white/5 text-gray-600'}">
                    <i class="fas ${s.status === 'completed' ? 'fa-check' : s.status === 'active' ? 'fa-spinner fa-spin' : 'fa-lock'}"></i>
                  </div>
                </div>
                <h3 class="text-white font-semibold mb-1 group-hover:text-nexai-gold transition-colors">${s.name}</h3>
                <p class="text-xs text-gray-500">${s.status === 'active' ? t('dpaeStatusActive') : s.status === 'completed' ? t('dpaeStatusDone') : t('dpaeStatusPending')}</p>
              </div>
            `).join('')}
          </div>
        ` : renderDPAEResults(dpaeResult)}
      </div>
    </div>
  `;
}

function renderDPAEResults(data) {
  const profile = data.profile;
  const shadow = data.shadowAnalysis;
  
  return `
    <div class="space-y-8 animate-fadeIn">
      <!-- Top Row: Archetype & Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Archetype Card -->
        <div class="lg:col-span-1 bg-nexai-card border border-nexai-border rounded-3xl p-8 relative overflow-hidden">
          <div class="relative z-10 text-center">
            <h4 class="text-gray-400 font-medium mb-2">${t('dpaeDominantArchetype')}</h4>
            <div class="text-4xl font-cinzel font-bold text-white mb-6">${profile.jungArchetype.dominant}</div>
            
            <div class="w-40 h-40 mx-auto bg-gradient-to-br from-nexai-gold/20 to-nexai-accent/20 rounded-full flex items-center justify-center mb-6 border border-nexai-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
              <i class="fas fa-shield-alt text-6xl text-nexai-gold"></i>
            </div>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center text-sm p-3 bg-white/5 rounded-xl border border-white/5">
                <span class="text-gray-400">${t('dpaeShadowArchetype')}</span>
                <span class="text-cyber-pink font-semibold">${profile.jungArchetype.shadow}</span>
              </div>
              <div class="flex justify-between items-center text-sm p-3 bg-white/5 rounded-xl border border-white/5">
                <span class="text-gray-400">${t('dpaeAttachmentStyle')}</span>
                <span class="text-cyber-blue font-semibold capitalize">${profile.attachmentStyle}</span>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-nexai-gold/5 opacity-50"></div>
        </div>

        <!-- Radar Chart Card -->
        <div class="lg:col-span-2 bg-nexai-card border border-nexai-border rounded-3xl p-8">
          <h4 class="text-white font-bold mb-6 flex items-center">
            <i class="fas fa-chart-pie mr-2 text-nexai-gold"></i>
            ${t('dpaeBig5ChartTitle')}
          </h4>
          <div class="h-[300px] flex items-center justify-center">
            <canvas id="big5Chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Analysis Results Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Shadow Analysis Content -->
        <div class="bg-gray-900/40 border border-white/5 rounded-3xl p-8">
          <h4 class="text-cyber-purple font-bold mb-6 flex items-center">
            <i class="fas fa-moon mr-3"></i>
            ${t('dpaeShadowManifestations')}
          </h4>
          <div class="space-y-4">
            ${(shadow.shadowManifestations || []).map(m => `
              <div class="p-4 bg-black/40 rounded-2xl border border-white/5">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-white font-medium">${m.pattern || t('dpaeUnconsciousPattern')}</span>
                  <span class="text-xs px-2 py-1 bg-cyber-purple/10 text-cyber-purple rounded-lg border border-cyber-purple/20">${t('dpaeIntensity')}: ${m.intensity}%</span>
                </div>
                <p class="text-sm text-gray-400">${m.evidence || t('dpaeEvidence')}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Growth & Integration -->
        <div class="bg-gray-900/40 border border-white/5 rounded-3xl p-8">
          <h4 class="text-cyber-green font-bold mb-6 flex items-center">
            <i class="fas fa-seedling mr-3"></i>
            ${t('dpaeIntegrationPath')}
          </h4>
          <ul class="space-y-4">
            ${(profile.jungArchetype.integration || shadow.integrationPath || []).map(item => `
              <li class="flex items-start space-x-3 group">
                <div class="w-6 h-6 rounded-full bg-cyber-green/20 flex-shrink-0 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <i class="fas fa-check text-[10px] text-cyber-green"></i>
                </div>
                <span class="text-gray-300 text-sm leading-relaxed">${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

async function startDPAE() {
  state.currentDPAEStage = 1;
  state.dpaeResponses = {};
  renderApp();
  
  // Start with a small set of Big Five questions for demo
  const questions = [
    { id: 'extraversion1', text: t('dpaeQ1'), category: 'extraversion' },
    { id: 'agreeableness1', text: t('dpaeQ2'), category: 'agreeableness' },
    { id: 'conscientiousness1', text: t('dpaeQ3'), category: 'conscientiousness' },
    { id: 'neuroticism1', text: t('dpaeQ4'), category: 'neuroticism' },
    { id: 'openness1', text: t('dpaeQ5'), category: 'openness' },
    { id: 'extraversion2', text: t('dpaeQ6'), category: 'extraversion' },
    { id: 'agreeableness2', text: t('dpaeQ7'), category: 'agreeableness' },
    { id: 'conscientiousness2', text: t('dpaeQ8'), category: 'conscientiousness' },
    { id: 'neuroticism2', text: t('dpaeQ9'), category: 'neuroticism' },
    { id: 'openness2', text: t('dpaeQ10'), category: 'openness' }
  ];
  
  state.dpaeQuestions = questions;
  state.currentQuestionIndex = 0;
  state.isTakingDPAE = true;
  renderApp();
}

function renderDPAEQuestionnaire() {
  const q = state.dpaeQuestions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / state.dpaeQuestions.length) * 100;
  
  return `
    <div class="h-full flex items-center justify-center p-6">
      <div class="max-w-xl w-full bg-nexai-card border border-nexai-border rounded-3xl p-8 shadow-2xl">
        <div class="flex items-center justify-between mb-8">
          <span class="text-nexai-gold font-bold">${t('dpaeQuestionnaireTitle')}</span>
          <span class="text-gray-500 text-sm">${state.currentQuestionIndex + 1} / ${state.dpaeQuestions.length}</span>
        </div>
        
        <div class="w-full h-1.5 bg-white/5 rounded-full mb-12 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-nexai-gold to-nexai-accent transition-all duration-500" style="width: ${progress}%"></div>
        </div>
        
        <h2 class="text-2xl font-semibold text-white mb-12 text-center leading-relaxed">
          "${q.text}"
        </h2>
        
        <div class="grid grid-cols-1 gap-3">
          ${[
            { val: 100, label: t('dpaeStronglyAgree'), color: 'bg-nexai-gold' },
            { val: 75, label: t('dpaeAgree'), color: 'bg-nexai-gold/60' },
            { val: 50, label: t('dpaeNeutral'), color: 'bg-white/10' },
            { val: 25, label: t('dpaeDisagree'), color: 'bg-cyber-pink/40' },
            { val: 0, label: t('dpaeStronglyDisagree'), color: 'bg-cyber-pink/60' }
          ].map(opt => `
            <button onclick="handleDPAEResponse('${q.id}', ${opt.val})" class="w-full p-4 rounded-2xl border border-white/5 hover:border-nexai-gold/40 hover:bg-white/5 transition-all text-left flex items-center group">
              <div class="w-10 h-10 rounded-xl ${opt.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i class="fas fa-check text-nexai-dark opacity-50"></i>
              </div>
              <span class="text-gray-300 font-medium">${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

async function handleDPAEResponse(questionId, value) {
  state.dpaeResponses[questionId] = value;
  
  if (state.currentQuestionIndex < state.dpaeQuestions.length - 1) {
    state.currentQuestionIndex++;
    renderApp();
  } else {
    // End of questionnaire
    state.isLoading = true;
    state.isTakingDPAE = false;
    renderApp();
    
    try {
      // Aggregate responses by category
      const totals = {};
      const counts = {};
      
      state.dpaeQuestions.forEach(q => {
        const val = state.dpaeResponses[q.id] || 50;
        totals[q.category] = (totals[q.category] || 0) + val;
        counts[q.category] = (counts[q.category] || 0) + 1;
      });
      
      const userData = {};
      Object.keys(totals).forEach(cat => {
        userData[cat] = totals[cat] / counts[cat];
      });
      
      const result = await API.dpae(userData);
      if (result.success) {
        state.dpaeResult = result.data;
        saveToLocalStorage();
        showNotification(t('dpaeCompleted'), 'success');
        
        // Render and init chart
        state.currentView = 'dpae';
        renderApp();
        setTimeout(initBig5Chart, 100);
      } else {
        showNotification(t('dpaeError'), 'error');
      }
    } catch (err) {
      showNotification(t('dpaeUnexpectedError'), 'error');
    }
    
    state.isLoading = false;
    renderApp();
  }
}

function initBig5Chart() {
  if (!state.dpaeResult) return;
  
  const profile = state.dpaeResult.profile;
  const chartConfig = {
    type: 'radar',
    data: {
      labels: [t('dpaeBig5Openness'), t('dpaeBig5Conscientiousness'), t('dpaeBig5Extraversion'), t('dpaeBig5Agreeableness'), t('dpaeBig5Neuroticism')],
      datasets: [{
        label: t('dpaePersonalityProfile'),
        data: [
          profile.big5.O * 100,
          profile.big5.C * 100,
          profile.big5.E * 100,
          profile.big5.A * 100,
          profile.big5.N * 100
        ],
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: '#D4AF37',
        pointBackgroundColor: '#D4AF37',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#D4AF37'
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: { color: '#888', font: { size: 12 } },
          ticks: { display: false, max: 100, min: 0 }
        }
      },
      plugins: { legend: { display: false } },
      maintainAspectRatio: false
    }
  };
  
  // Use createChart helper to prevent memory leaks
  createChart('big5Chart', chartConfig);
}

function renderCurationView() {
  // Require authentication
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }
  
  const curation = state.contentCuration || state.deepAnalysis?.contentCuration;
  
  const curationLabels = state.language === 'tr' ? {
    title: 'İçerik Kürasyon',
    desc: 'Arketip profilinize göre kişiselleştirilmiş film, kitap, müzik ve aktivite önerileri alın.',
    films: 'Filmler',
    books: 'Kitaplar',
    music: 'Müzik',
    activities: 'Aktiviteler',
    getBtn: 'Öneriler Al'
  } : {
    title: 'Content Curation',
    desc: 'Get personalized movie, book, music and activity recommendations based on your archetype profile.',
    films: 'Films',
    books: 'Books',
    music: 'Music',
    activities: 'Activities',
    getBtn: 'Get Recommendations'
  };

  return `
    <div class="p-6">
      <div class="max-w-4xl mx-auto">
        ${!curation ? `
          <div class="bg-nexai-card border border-nexai-border rounded-2xl p-8 text-center">
            <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyber-pink/20 to-nexai-gold/20 flex items-center justify-center mb-6">
              <i class="fas fa-film text-4xl text-cyber-pink"></i>
            </div>
            <h3 class="text-xl font-cinzel font-semibold text-white mb-2">${curationLabels.title}</h3>
            <p class="text-gray-400 mb-6">${curationLabels.desc}</p>
            
            <div class="grid grid-cols-4 gap-4 mb-8 max-w-md mx-auto">
              <div class="text-center">
                <i class="fas fa-film text-3xl text-cyber-pink mb-2"></i>
                <p class="text-xs text-gray-500">${curationLabels.films}</p>
              </div>
              <div class="text-center">
                <i class="fas fa-book text-3xl text-cyber-blue mb-2"></i>
                <p class="text-xs text-gray-500">${curationLabels.books}</p>
              </div>
              <div class="text-center">
                <i class="fas fa-music text-3xl text-cyber-purple mb-2"></i>
                <p class="text-xs text-gray-500">${curationLabels.music}</p>
              </div>
              <div class="text-center">
                <i class="fas fa-hiking text-3xl text-cyber-green mb-2"></i>
                <p class="text-xs text-gray-500">${curationLabels.activities}</p>
              </div>
            </div>

            <button onclick="generateCuration()" class="px-8 py-4 bg-gradient-to-r from-cyber-pink to-nexai-gold text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyber-pink/30 transition-all">
              <i class="fas fa-magic mr-2"></i>${curationLabels.getBtn}
            </button>
          </div>
        ` : renderCurationContent(curation)}
      </div>
    </div>
  `;
}

function renderCurationContent(curation) {
  const recs = curation.recommendations || curation.curation?.recommendations || {};

  return `
    <div class="space-y-6">
      <!-- Curator Notes -->
      ${curation.curatorNotes || curation.curation?.curatorNotes ? `
        <div class="bg-gradient-to-r from-cyber-pink/10 to-nexai-gold/10 border border-cyber-pink/30 rounded-2xl p-6">
          <div class="flex items-start space-x-3">
            <i class="fas fa-quote-left text-2xl text-cyber-pink"></i>
            <p class="text-gray-300 italic">${curation.curatorNotes || curation.curation?.curatorNotes}</p>
          </div>
        </div>
      ` : ''}

      <!-- Films -->
      ${recs.films && recs.films.length > 0 ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-film text-cyber-pink mr-2"></i>Önerilen Filmler
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            ${recs.films.map(film => `
              <div class="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition-colors">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-white">${film.title}</h4>
                    <p class="text-sm text-gray-400 mt-1">${film.reason}</p>
                  </div>
                  ${film.therapeuticPurpose ? `
                    <span class="px-2 py-1 text-xs rounded-full ${
                      film.therapeuticPurpose === 'shadow_work' ? 'bg-cyber-purple/20 text-cyber-purple' :
                      film.therapeuticPurpose === 'healing' ? 'bg-cyber-green/20 text-cyber-green' :
                      film.therapeuticPurpose === 'inspiration' ? 'bg-nexai-gold/20 text-nexai-gold' :
                      'bg-cyber-blue/20 text-cyber-blue'
                    }">
                      ${film.therapeuticPurpose === 'shadow_work' ? 'Gölge Çalışması' :
                        film.therapeuticPurpose === 'healing' ? 'İyileşme' :
                        film.therapeuticPurpose === 'inspiration' ? 'İlham' : 'Denge'}
                    </span>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Books -->
      ${recs.books && recs.books.length > 0 ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-book text-cyber-blue mr-2"></i>Önerilen Kitaplar
          </h3>
          <div class="space-y-3">
            ${recs.books.map(book => `
              <div class="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition-colors">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-16 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-book-open text-white"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-white">${book.title}</h4>
                    ${book.author ? `<p class="text-sm text-nexai-gold">${book.author}</p>` : ''}
                    <p class="text-sm text-gray-400 mt-1">${book.reason}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Music -->
      ${recs.music && recs.music.length > 0 ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-music text-cyber-purple mr-2"></i>Önerilen Müzikler
          </h3>
          <div class="grid md:grid-cols-2 gap-3">
            ${recs.music.map(track => `
              <div class="bg-black/30 rounded-xl p-4 flex items-center space-x-3 hover:bg-black/50 transition-colors">
                <div class="w-10 h-10 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-play text-white text-sm"></i>
                </div>
                <div class="min-w-0">
                  <h4 class="font-medium text-white truncate">${track.title}</h4>
                  ${track.artist ? `<p class="text-sm text-gray-400 truncate">${track.artist}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Activities -->
      ${recs.activities && recs.activities.length > 0 ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-hiking text-cyber-green mr-2"></i>Önerilen Aktiviteler
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            ${recs.activities.map(activity => `
              <div class="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition-colors">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-white">${activity.activity}</h4>
                    <p class="text-sm text-gray-400 mt-1">${activity.reason}</p>
                  </div>
                  ${activity.frequency ? `
                    <span class="px-2 py-1 text-xs bg-cyber-green/20 text-cyber-green rounded-full">
                      ${activity.frequency === 'daily' ? 'Günlük' : 
                        activity.frequency === 'weekly' ? 'Haftalık' : 'Aylık'}
                    </span>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Weekly Plan -->
      ${curation.weeklyPlan || curation.curation?.weeklyPlan ? `
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-calendar-week text-nexai-gold mr-2"></i>Haftalık Plan
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${Object.entries(curation.weeklyPlan || curation.curation?.weeklyPlan || {}).map(([day, activity]) => `
              <div class="bg-black/30 rounded-xl p-4 text-center">
                <div class="text-xs text-nexai-gold mb-2 uppercase">${
                  day === 'monday' ? 'Pazartesi' :
                  day === 'wednesday' ? 'Çarşamba' :
                  day === 'friday' ? 'Cuma' : 'Hafta Sonu'
                }</div>
                <p class="text-sm text-gray-300">${activity}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Refresh Button -->
      <div class="text-center">
        <button onclick="generateCuration()" class="px-6 py-3 bg-white/5 border border-nexai-border text-white rounded-xl hover:bg-white/10 transition-all">
          <i class="fas fa-sync-alt mr-2"></i>Yeni Öneriler Al
        </button>
      </div>
    </div>
  `;
}

function renderSettingsView() {
  // Require authentication
  if (!state.isAuthenticated) {
    return renderLoginRequiredScreen();
  }
  
  const cultureLabels = state.language === 'tr' 
    ? { western: 'Batı', eastern: 'Doğu', african: 'Afrika' }
    : { western: 'Western', eastern: 'Eastern', african: 'African' };
  
  return `
    <div class="p-6">
      <div class="max-w-2xl mx-auto space-y-6">
        <!-- Language Selection -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-language text-cyber-purple mr-2"></i>${t('settingsLanguage')}
          </h3>
          <p class="text-sm text-gray-400 mb-4">${t('settingsLanguageDesc')}</p>
          
          <div class="grid grid-cols-2 gap-4">
            <button 
              onclick="changeLanguage('tr')"
              class="p-4 rounded-xl border transition-all ${state.language === 'tr' ? 'bg-nexai-gold/10 border-nexai-gold text-nexai-gold' : 'bg-black/30 border-nexai-border text-gray-400 hover:border-gray-500'}"
            >
              <span class="text-3xl mb-2 block">🇹🇷</span>
              <span class="font-medium">Türkçe</span>
            </button>
            <button 
              onclick="changeLanguage('en')"
              class="p-4 rounded-xl border transition-all ${state.language === 'en' ? 'bg-nexai-gold/10 border-nexai-gold text-nexai-gold' : 'bg-black/30 border-nexai-border text-gray-400 hover:border-gray-500'}"
            >
              <span class="text-3xl mb-2 block">🇺🇸</span>
              <span class="font-medium">English</span>
            </button>
          </div>
        </div>
        
        <!-- Cultural Context -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-globe text-nexai-gold mr-2"></i>${t('settingsCulture')}
          </h3>
          <p class="text-sm text-gray-400 mb-4">${t('settingsCultureDesc')}</p>
          
          <div class="grid grid-cols-3 gap-4">
            <button 
              onclick="changeCulturalContext('western')"
              class="p-4 rounded-xl border transition-all ${state.culturalContext === 'western' ? 'bg-nexai-gold/10 border-nexai-gold text-nexai-gold' : 'bg-black/30 border-nexai-border text-gray-400 hover:border-gray-500'}"
            >
              <span class="text-3xl mb-2 block">🌎</span>
              <span class="font-medium">${cultureLabels.western}</span>
              <p class="text-xs mt-1 opacity-70">Big Five (OCEAN)</p>
            </button>
            <button 
              onclick="changeCulturalContext('eastern')"
              class="p-4 rounded-xl border transition-all ${state.culturalContext === 'eastern' ? 'bg-nexai-gold/10 border-nexai-gold text-nexai-gold' : 'bg-black/30 border-nexai-border text-gray-400 hover:border-gray-500'}"
            >
              <span class="text-3xl mb-2 block">🌏</span>
              <span class="font-medium">${cultureLabels.eastern}</span>
              <p class="text-xs mt-1 opacity-70">CPAI / Ren Qing</p>
            </button>
            <button 
              onclick="changeCulturalContext('african')"
              class="p-4 rounded-xl border transition-all ${state.culturalContext === 'african' ? 'bg-nexai-gold/10 border-nexai-gold text-nexai-gold' : 'bg-black/30 border-nexai-border text-gray-400 hover:border-gray-500'}"
            >
              <span class="text-3xl mb-2 block">🌍</span>
              <span class="font-medium">${cultureLabels.african}</span>
              <p class="text-xs mt-1 opacity-70">Ubuntu</p>
            </button>
          </div>
        </div>

        <!-- Data Management -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-database text-cyber-blue mr-2"></i>${t('settingsDataManagement')}
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <div>
                <p class="text-white font-medium">${t('settingsChatHistory')}</p>
                <p class="text-sm text-gray-500">${state.messages.length} ${t('settingsMessages')}</p>
              </div>
              <button onclick="exportData()" class="px-4 py-2 bg-cyber-blue/20 text-cyber-blue rounded-lg hover:bg-cyber-blue/30 transition-colors">
                <i class="fas fa-download mr-1"></i>${t('settingsExport')}
              </button>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <div>
                <p class="text-white font-medium">${t('settingsBARTResults')}</p>
                <p class="text-sm text-gray-500">${state.bartData ? t('settingsAvailable') : t('settingsNotAvailable')}</p>
              </div>
              ${state.bartData ? `
                <span class="px-4 py-2 bg-cyber-green/20 text-cyber-green rounded-lg">
                  ${t('settingsRisk')}: ${state.bartData.riskScore}%
                </span>
              ` : ''}
            </div>

            <button onclick="clearAllData()" class="w-full p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors">
              <i class="fas fa-trash-alt mr-2"></i>${t('settingsClearAll')}
            </button>
          </div>
        </div>

        <!-- About -->
        <div class="bg-nexai-card border border-nexai-border rounded-2xl p-6">
          <h3 class="text-lg font-cinzel font-semibold text-white mb-4">
            <i class="fas fa-info-circle text-cyber-purple mr-2"></i>${t('settingsAbout')}
          </h3>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">${t('settingsVersion')}</span>
              <span class="text-white">4.2.0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">AI Engine</span>
              <span class="text-nexai-gold">Google Gemini 3</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">${t('settingsLicense')}</span>
              <span class="text-white">MIT</span>
            </div>
          </div>

          <div class="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p class="text-yellow-400 text-sm">
              <i class="fas fa-exclamation-triangle mr-2"></i>
              ${t('settingsDisclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMobileMenu() {
  return `
    <div id="mobileMenu" class="fixed inset-0 z-50 lg:hidden ${state.sidebarOpen ? '' : 'hidden'}">
      <div class="absolute inset-0 bg-black/80" onclick="toggleMobileMenu()"></div>
      <div class="absolute left-0 top-0 bottom-0 w-72 bg-nexai-card">
        ${renderSidebar().replace('hidden lg:flex', 'flex')}
      </div>
    </div>
  `;
}

// ============================================
// EVENT HANDLERS
// ============================================

function attachEventListeners() {
  // Scroll to bottom on new messages
  const container = document.getElementById('messagesContainer');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }

  // Initialize charts if on profile view
  if (state.currentView === 'profile' && state.profile) {
    setTimeout(initBigFiveChart, 100);
  }
}

function switchView(view) {
  // Use smooth transition if available
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      state.currentView = view;
      state.sidebarOpen = false;
      renderApp();
    });
  } else {
    transitionView(view);
  }
  
  // Announce view change for screen readers
  const viewNames = {
    dashboard: t('navDashboard'),
    chat: t('navChat'),
    bart: t('navBART'),
    profile: t('navProfile'),
    dpae: t('navDPAE'),
    psychocore: t('navPsychoCore'),
    deep: t('navDeepAnalysis'),
    curation: t('navCuration'),
    settings: t('navSettings')
  };
  announceToScreenReader((state.language === 'tr' ? 'G\u00f6r\u00fcn\u00fcm de\u011fi\u015fti: ' : 'View changed to: ') + viewNames[view]);
}

function toggleMobileMenu() {
  state.sidebarOpen = !state.sidebarOpen;
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden', !state.sidebarOpen);
  }
}

function changeCulturalContext(context) {
  state.culturalContext = context;
  localStorage.setItem('nexai_cultural_context', context);
  renderApp();
}

async function handleSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message || state.isLoading) return;

  input.value = '';
  state.messages.push({ role: 'user', content: message, timestamp: Date.now() });
  state.isLoading = true;
  renderApp();

  try {
    const response = await API.analyze(message);
    state.messages.push({ 
      role: 'assistant', 
      content: response.response || response.error || 'Yanıt alınamadı.',
      model: response.model,
      timestamp: Date.now()
    });
  } catch (error) {
    state.messages.push({ 
      role: 'assistant', 
      content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
      timestamp: Date.now()
    });
  }

  state.isLoading = false;
  saveToLocalStorage();
  renderApp();
}

function sendQuickMessage(message) {
  document.getElementById('messageInput').value = message;
  handleSubmit(new Event('submit'));
}

function toggleVoiceInput() {
  alert('Sesli giriş özelliği yakında eklenecek!');
}

// BART Game Handlers with enhanced animations
function handleBARTPump() {
  if (!bartGame) return;
  
  // Add pump animation
  const balloon = document.getElementById('balloon');
  if (balloon) {
    balloon.style.transform = 'scale(1.05)';
    setTimeout(() => balloon.style.transform = 'scale(1)', 100);
  }
  
  const result = bartGame.pump();
  
  if (result.status === 'exploded') {
    // Create explosion particles
    if (balloon) {
      createExplosionParticles(balloon);
      balloon.classList.add('balloon-exploding');
    }
    showToast(state.language === 'tr' ? '\ud83d\udca5 Balon patlad\u0131!' : '\ud83d\udca5 Balloon exploded!', 'error');
    announceToScreenReader(state.language === 'tr' ? 'Balon patlad\u0131!' : 'Balloon exploded!');
    
    // Vibration feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  } else {
    // Play pump sound effect (if we had audio)
    announceToScreenReader(state.language === 'tr' ? `${result.currentPumps} pompa` : `${result.currentPumps} pumps`);
  }
  
  renderApp();
}

function handleBARTCollect() {
  if (!bartGame) return;
  const result = bartGame.collect();
  
  if (result.status === 'collected') {
    showToast(`✅ ${result.earnings} puan toplandı!`, 'success');
  }
  
  renderApp();
}

function saveBARTResults() {
  if (!bartGame) return;
  state.bartData = bartGame.getResults();
  saveToLocalStorage();
  showToast('BART sonuçları kaydedildi!', 'success');
  renderApp();
}

function resetBARTGame() {
  bartGame = new BARTGame();
  renderApp();
}

// Profile & Analysis
async function generateProfile() {
  state.isLoading = true;
  renderApp();

  try {
    const response = await API.generateProfile();
    state.profile = response.profile;
    saveToLocalStorage();
    showToast('Profil oluşturuldu!', 'success');
  } catch (error) {
    showToast('Profil oluşturulamadı.', 'error');
  }

  state.isLoading = false;
  renderApp();
}

async function runDeepAnalysis() {
  state.isLoading = true;
  switchView('deep');

  try {
    const response = await API.deepAnalyze();
    if (response.success) {
      state.deepAnalysis = response;
      state.contentCuration = response.contentCuration;
      saveToLocalStorage();
      showToast('Derin analiz tamamlandı!', 'success');
    } else {
      showToast('Analiz başarısız oldu.', 'error');
    }
  } catch (error) {
    showToast('Bir hata oluştu.', 'error');
  }

  state.isLoading = false;
  renderApp();
}

async function generateCuration() {
  state.isLoading = true;
  renderApp();

  try {
    const archetype = state.profile?.dominantArchetype || state.deepAnalysis?.finalProfile?.archetypeProfile?.dominant || 'explorer';
    const shadowArchetype = state.profile?.shadowArchetype || state.deepAnalysis?.finalProfile?.archetypeProfile?.shadow || 'wanderer';
    
    const response = await API.getCuration(archetype, shadowArchetype);
    state.contentCuration = response;
    saveToLocalStorage();
    showToast('İçerik önerileri oluşturuldu!', 'success');
  } catch (error) {
    showToast('Öneriler alınamadı.', 'error');
  }

  state.isLoading = false;
  renderApp();
}

// Data Management
function exportData() {
  const data = {
    messages: state.messages,
    bartData: state.bartData,
    profile: state.profile,
    deepAnalysis: state.deepAnalysis,
    contentCuration: state.contentCuration,
    culturalContext: state.culturalContext,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nexai-export-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Veriler dışa aktarıldı!', 'success');
}

function clearAllData() {
  if (confirm('Tüm verileriniz silinecek. Emin misiniz?')) {
    state.messages = [];
    state.bartData = null;
    state.profile = null;
    state.deepAnalysis = null;
    state.contentCuration = null;
    bartGame = null;
    localStorage.removeItem('nexai_state');
    showToast('Tüm veriler silindi.', 'success');
    renderApp();
  }
}

// Storage
function saveToLocalStorage() {
  const data = {
    messages: state.messages,
    bartData: state.bartData,
    profile: state.profile,
    deepAnalysis: state.deepAnalysis,
    contentCuration: state.contentCuration,
    culturalContext: state.culturalContext
  };
  localStorage.setItem('nexai_state', JSON.stringify(data));
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('nexai_state');
    if (saved) {
      const data = JSON.parse(saved);
      state.messages = data.messages || [];
      state.bartData = data.bartData || null;
      state.profile = data.profile || null;
      state.deepAnalysis = data.deepAnalysis || null;
      state.contentCuration = data.contentCuration || null;
      state.culturalContext = data.culturalContext || 'western';
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
}

// Toast notifications with enhanced animations
function showToast(message, type = 'info') {
  const colors = {
    success: 'notification-success',
    error: 'notification-error',
    info: 'notification-info',
    warning: 'notification-warning'
  };

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };

  // Create or get notification container
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `notification ${colors[type]} animate-slide-in`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <i class="${icons[type]}"></i>
    <span class="text-sm">${escapeHtml(message)}</span>
    <button onclick="this.parentElement.remove()" class="ml-2 opacity-60 hover:opacity-100 transition-opacity" aria-label="Close">
      <i class="fas fa-times"></i>
    </button>
  `;
  container.appendChild(toast);

  // Auto remove with fade out animation
  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================
// ENHANCED ANIMATIONS & TRANSITIONS
// ============================================

// Smooth page transitions
function transitionView(newView) {
  const mainContent = document.querySelector('main > div.flex-1');
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      state.currentView = newView;
      state.sidebarOpen = false;
      renderApp();
      
      const newMainContent = document.querySelector('main > div.flex-1');
      if (newMainContent) {
        newMainContent.style.transition = 'all 0.3s ease-out';
        newMainContent.style.opacity = '1';
        newMainContent.style.transform = 'translateY(0)';
      }
    }, 150);
  } else {
    state.currentView = newView;
    state.sidebarOpen = false;
    renderApp();
  }
}

// Balloon explosion particles effect
function createExplosionParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const colors = ['#EC4899', '#F472B6', '#FB7185', '#FDA4AF'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'fixed w-2 h-2 rounded-full pointer-events-none';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.zIndex = '1000';
    
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animation = 'particle-scatter 0.6s ease-out forwards';
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  }
}

// Ripple effect for buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none animate-ping';
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation handler
function handleKeyboardNavigation(event) {
  // Escape key closes modals
  if (event.key === 'Escape') {
    if (state.showAuthModal) {
      closeAuthModal();
    }
    if (state.sidebarOpen) {
      toggleMobileMenu();
    }
  }
  
  // Tab trapping in modals
  if (event.key === 'Tab' && state.showAuthModal) {
    const modal = document.querySelector('.modal-content, [role="dialog"]');
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}

// Announce to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

// Skip link for keyboard users
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-nexai-gold focus:text-nexai-dark focus:rounded-lg';
  skipLink.textContent = state.language === 'tr' ? 'Ana i\u00e7eri\u011fe atla' : 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Chart initialization (Profile page)
function initBigFiveChart() {
  if (!state.profile?.bigFive) return;

  const chartConfig = {
    type: 'radar',
    data: {
      labels: [t('dpaeBig5Openness'), t('dpaeBig5Conscientiousness'), t('dpaeBig5Extraversion'), t('dpaeBig5Agreeableness'), t('dpaeBig5Neuroticism')],
      datasets: [{
        label: t('dpaePersonalityProfile'),
        data: [
          state.profile.bigFive.openness || 50,
          state.profile.bigFive.conscientiousness || 50,
          state.profile.bigFive.extraversion || 50,
          state.profile.bigFive.agreeableness || 50,
          state.profile.bigFive.neuroticism || 50
        ],
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: '#D4AF37',
        borderWidth: 2,
        pointBackgroundColor: '#D4AF37'
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { display: false },
          grid: { color: 'rgba(255,255,255,0.1)' },
          pointLabels: { color: '#9CA3AF', font: { size: 11 } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  };
  
  // Use createChart helper to prevent memory leaks
  createChart('bigFiveChart', chartConfig);
}

// Marked.js for markdown parsing
const marked = {
  parse: (text) => {
    if (!text) return '';
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-black/30 px-1 rounded">$1</code>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4">$2</li>')
      .replace(/\n/gim, '<br>');
  }
};

// ============================================
// GLOBAL FUNCTION EXPORTS (for onclick handlers)
// ============================================
// Export functions to window for onclick handlers
window.switchView = switchView;
window.toggleMobileMenu = toggleMobileMenu;
window.changeCulturalContext = changeCulturalContext;
window.handleSubmit = handleSubmit;
window.sendQuickMessage = sendQuickMessage;
window.toggleVoiceInput = toggleVoiceInput;
window.handleBARTPump = handleBARTPump;
window.handleBARTCollect = handleBARTCollect;
window.saveBARTResults = saveBARTResults;
window.resetBARTGame = resetBARTGame;
window.generateProfile = generateProfile;
window.runDeepAnalysis = runDeepAnalysis;
window.generateCuration = generateCuration;
window.exportData = exportData;
window.clearAllData = clearAllData;

// Auth functions
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleEmailLogin = handleEmailLogin;
window.handleEmailRegister = handleEmailRegister;
window.handleGoogleLogin = handleGoogleLogin;
window.handleGitHubLogin = handleGitHubLogin;
window.handleAppleLogin = handleAppleLogin;
window.handleLogout = handleLogout;
window.showNotification = showNotification;

// ============================================
// PERFORMANCE MONITORING
// ============================================
function measurePerformance() {
  if (window.performance && performance.getEntriesByType) {
    const paintMetrics = performance.getEntriesByType('paint');
    paintMetrics.forEach(metric => {
      console.log(`${metric.name}: ${Math.round(metric.startTime)}ms`);
    });
  }
}

// ============================================
// SERVICE WORKER REGISTRATION (for PWA support)
// ============================================
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      // Service worker would be registered here for PWA support
      // const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('PWA support available');
    } catch (error) {
      console.log('Service worker registration skipped');
    }
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize auth first
  AuthService.init();
  
  // Load saved state
  loadFromLocalStorage();
  
  // Add accessibility enhancements
  addSkipLink();
  
  // Add keyboard navigation listener
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Render the app
  renderApp();
  
  // Measure performance
  measurePerformance();
  
  // Register service worker for PWA
  registerServiceWorker();
  
  // Lazy load images
  lazyLoadImages();
  
  // Show welcome notification
  if (state.isAuthenticated && state.user) {
    setTimeout(() => {
      showNotification(t('welcomeUser') + ', ' + state.user.name + '!', 'success');
    }, 500);
  }
});
