import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/cloudflare-pages'

// ============================================
// NEXAI: OMNI-PRIME v5.0 ULTIMATE
// Dijital Ruh Küratörü - With Unified Engine
// ============================================

// Unified Engine Declaration (Dynamic import compatible)
// Note: nexai-unified-engine.js is imported at runtime
let NEXAIUnifiedEngine: any
let AnalysisLayer: any
let CulturalFramework: any
let AnalysisStatus: any

// Initialize Unified Engine
async function initializeUnifiedEngine() {
  try {
    const engine = await import('./nexai-unified-engine.js')
    NEXAIUnifiedEngine = engine.NEXAIUnifiedEngine
    AnalysisLayer = engine.AnalysisLayer
    CulturalFramework = engine.CulturalFramework
    AnalysisStatus = engine.AnalysisStatus
  } catch (error) {
    console.warn('Unified Engine initialization warning:', error)
    // Fallback: Create stub classes
    NEXAIUnifiedEngine = class {
      constructor(config: any) { this.config = config }
      async runFullAnalysis(data: any) { return { error: 'Engine not initialized' } }
    }
    AnalysisLayer = { SURFACE: 1, MIDDLE: 2, DEEP: 3, COGNITIVE: 4, EXISTENTIAL: 5 }
    CulturalFramework = { WESTERN: 'western', EASTERN: 'eastern', AFRICAN: 'african' }
  }
}

// Types
type Bindings = {
  OPENROUTER_API_KEY: string
  GEMINI_API_KEY: string
  JWT_SECRET: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  APPLE_CLIENT_ID: string
  APPLE_CLIENT_SECRET: string
  DB: D1Database
}

type Variables = {
  requestId: string
  user: User | null
}

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider: 'google' | 'github' | 'apple' | 'email'
  createdAt: string
}

// ============================================
// SECURITY CONFIGURATION
// ============================================
const SECURITY_CONFIG = {
  JWT_EXPIRY: 7 * 24 * 60 * 60, // 7 days in seconds
  RATE_LIMIT: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    authRequests: 10 // 10 auth attempts per minute
  },
  PASSWORD: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true
  }
}

// ============================================
// DEEP-PSYCHE ANALYSIS ENGINE (DPAE) CONFIG
// ============================================
const DPAE_CONFIG = {
  analysisLayers: ['surface', 'middle', 'deep', 'existential', 'cognitive'],
  aiAgents: ['culturalAnthropologist', 'shadowHunter', 'aestheticCurator'],
  psychologicalTools: ['BART', 'BigFive', 'JungArchetypes', 'ShadowIntegration', 'DarkTriad', 'AttachmentStyle'],
  depthLevels: ['Yüzeyel', 'Standart', 'Derin', 'Klinik-Eğilimli'],
  culturalContexts: ['western', 'eastern', 'african'],
  depthStages: 8
}

// ============================================
// PSYCHOLOGICAL ASSESSMENT ALGORITHMS
// ============================================
interface PsychologicalProfile {
  id: string
  userId: string | undefined
  big5: { O: number; C: number; E: number; A: number; N: number }
  jungArchetype: { dominant: string; shadow: string; integration: string[] }
  bARTScore: number
  darkTriad: { narcissism: number; machiavellianism: number; psychopathy: number }
  attachmentStyle: 'secure' | 'anxious' | 'avoidant' | 'disorganized'
  culturalContext: 'western' | 'eastern' | 'african'
  emotionalIntelligence: number
  resilienceScore: number
  analyzedAt: string
}

function calculateBigFive(responses: Record<string, number>): { O: number; C: number; E: number; A: number; N: number } {
  // OCEAN model scoring
  const O = (responses['openness'] || 50) / 100
  const C = (responses['conscientiousness'] || 50) / 100
  const E = (responses['extraversion'] || 50) / 100
  const A = (responses['agreeableness'] || 50) / 100
  const N = (responses['neuroticism'] || 50) / 100
  return { O, C, E, A, N }
}

function calculateDarkTriad(responses: Record<string, number>): { narcissism: number; machiavellianism: number; psychopathy: number } {
  const narcissism = (responses['narcissism'] || 0) / 12
  const machiavellianism = (responses['machiavellianism'] || 0) / 12
  const psychopathy = (responses['psychopathy'] || 0) / 12
  return { narcissism, machiavellianism, psychopathy }
}

function calculateBARTScore(balloonPops: number, successfulPumps: number): number {
  // Balloon Analogue Risk Task scoring
  const maxScore = 100
  const popsWeight = (balloonPops / 30) * 30 // Weight pops
  const successWeight = (successfulPumps / 300) * 70 // Weight successful pumps
  return Math.min(maxScore, popsWeight + successWeight)
}

function mapJungArchetype(big5: Record<string, number>): { dominant: string; shadow: string } {
  // Map Big Five to Jungian Archetypes
  const archetypes = [
    { name: 'Hero', E: 0.7, C: 0.8, O: 0.6 },
    { name: 'Caregiver', A: 0.9, N: 0.4, E: 0.6 },
    { name: 'Explorer', O: 0.8, E: 0.7, A: 0.5 },
    { name: 'Sage', O: 0.85, C: 0.7, E: 0.3 },
    { name: 'Innocent', N: 0.2, A: 0.8, E: 0.6 },
    { name: 'Creator', O: 0.9, C: 0.6, E: 0.5 },
    { name: 'Ruler', C: 0.9, A: 0.4, E: 0.8 },
    { name: 'Magician', O: 0.85, N: 0.5, E: 0.7 },
    { name: 'Lover', A: 0.85, E: 0.8, N: 0.6 },
    { name: 'Jester', E: 0.9, O: 0.7, N: 0.3 },
    { name: 'Everyman', A: 0.8, C: 0.7, O: 0.5 },
    { name: 'Rebel', O: 0.75, E: 0.6, C: 0.3 }
  ]
  
  let bestMatch = archetypes[0]
  let bestScore = 0
  
  for (const arch of archetypes) {
    const score = Math.abs((arch.E || 0.5) - big5.E) + Math.abs((arch.C || 0.5) - big5.C) + Math.abs((arch.O || 0.5) - big5.O) + Math.abs((arch.A || 0.5) - big5.A)
    if (score > bestScore) {
      bestScore = score
      bestMatch = arch
    }
  }
  
  // Shadow is opposite archetype
  const shadowArchetypes: Record<string, string> = {
    'Hero': 'Tyrant',
    'Caregiver': 'Martyr',
    'Explorer': 'Wanderer',
    'Sage': 'Dogmatist',
    'Innocent': 'Naive',
    'Creator': 'Perfectionist',
    'Ruler': 'Dictator',
    'Magician': 'Manipulator',
    'Lover': 'Obsessive',
    'Jester': 'Fool',
    'Everyman': 'Victim',
    'Rebel': 'Anarchist'
  }
  
  return {
    dominant: bestMatch.name,
    shadow: shadowArchetypes[bestMatch.name] || 'Unknown'
  }
}

function classifyAttachmentStyle(anxietyScore: number, avoidanceScore: number): string {
  if (anxietyScore < 40 && avoidanceScore < 40) return 'secure'
  if (anxietyScore > 60 && avoidanceScore < 40) return 'anxious'
  if (anxietyScore < 40 && avoidanceScore > 60) return 'avoidant'
  return 'disorganized'
}

// ============================================
// AI AGENTS - DEEP ANALYSIS PROMPTS
// ============================================
const AI_AGENTS = {
  culturalAnthropologist: `You are NEXAI's Cultural Anthropologist AI Agent. 
Your task is to analyze the user's cultural context, values, and communication style.
Provide insights on: contextLevel (high/low/medium), culturalFramework (western/eastern/african), 
communicationStyle (directness 0-100, emotionalExpression 0-100, formalityLevel 0-100, implicitMeaning 0-100),
detectedValues (array), adaptationRecommendations (array), confidence (0-100).
Format output as JSON.`,

  shadowHunter: `You are NEXAI's Shadow Hunter AI Agent, using Carl Jung's Shadow concept.
Your task is to identify unconscious contradictions between stated (Persona) and hidden (Shadow) traits.
Provide: johariAnalysis (openArea, blindSpots, hiddenArea, unknownPotential),
shadowManifestations (array with pattern, evidence, mechanism, intensity 0-100),
deltaAnalysis (statedVsBehavior), dominantArchetype, shadowArchetype, 
integrationPath (array), riskFactors (array), confidence (0-100).
Format output as JSON.`,

  aestheticCurator: `You are NEXAI's Aesthetic Curator AI Agent.
Based on archetype, shadow traits, and cultural context, create personalized recommendations.
Provide: recommendations (films, books, music, activities with reasons),
curatorNotes (string), weeklyPlan (monday, wednesday, friday, weekend activities).
Format output as JSON.`
}

// ============================================
// DEPTH ALGORITHM (DERİNLİK) - 8 STAGES
// ============================================
const DEPTH_ALGORITHM_STAGES = [
  {
    stage: 1,
    name: 'Başlangıç Katmanı (Yüzey Profil)',
    duration: '10-15 dakika',
    components: ['Demografik veri', 'Hızlı tarama testleri', 'Profil seviyesi belirleme']
  },
  {
    stage: 2,
    name: 'Temel Kişilik Haritalama',
    duration: '40-50 dakika',
    components: ['Big Five (44 soru)', 'MBTI (70 soru)', 'Enneagram (36 soru)', 'Duygusal Zeka (30 soru)']
  },
  {
    stage: 3,
    name: 'Derin Katman Analizi',
    duration: '60 dakika',
    components: ['Projektif testler', 'Bağlanma analizi', 'Gölge & Karanlık spektrum']
  },
  {
    stage: 4,
    name: 'Varoluşsal Katman',
    duration: '45 dakika',
    components: ['Anlam & Amaç', 'Travma & Dayanıklılık', 'Bilinç & Ego gelişimi']
  },
  {
    stage: 5,
    name: 'Skor Hesaplama & Entegrasyon',
    duration: '30 dakika',
    components: ['Ağırlıklı hesaplama', 'Tutarlılık kontrolü', 'Kişilik matrisi oluşturma']
  },
  {
    stage: 6,
    name: 'AI Destekli Desen Tanıma',
    duration: '40 dakika',
    components: ['Clustering', 'Anomaly Detection', 'Pattern Mining', 'Sentiment Analysis']
  },
  {
    stage: 7,
    name: 'Kişiselleştirilmiş Rapor',
    duration: '50 dakika',
    components: ['Yönetici özeti', 'Görsel haritalar', 'Detaylı analiz', 'Gelişim yolu haritası']
  },
  {
    stage: 8,
    name: 'Takip & Evrim Sistemi',
    duration: 'Devam eden',
    components: ['Haftalık check-in', 'Aylık mini değerlendirme', '3 aylık derinlemesine gözden geçirme']
  }
]

// In-memory rate limiting store (per worker instance) with automatic cleanup
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Cleanup expired rate limit entries (called periodically and on check)
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [key, record] of rateLimitStore) {
    if (record.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
  // Limit store size to prevent DoS
  if (rateLimitStore.size > 10000) {
    const entries = Array.from(rateLimitStore.entries())
    entries.sort((a, b) => a[1].resetTime - b[1].resetTime)
    const toDelete = entries.slice(0, 5000)
    toDelete.forEach(([key]) => rateLimitStore.delete(key))
  }
}

// ============================================
// KNOWLEDGE GRAPH - Akademik Literatür Temelli
// ============================================
const KNOWLEDGE_GRAPH = {
  // Jung Arketipleri
  archetypes: {
    hero: { shadow: 'tyrant', traits: ['courage', 'determination'], culturalVariants: { western: 'individual achiever', eastern: 'collective protector', african: 'community champion' } },
    caregiver: { shadow: 'martyr', traits: ['compassion', 'nurturing'], culturalVariants: { western: 'helper', eastern: 'filial devotee', african: 'ubuntu practitioner' } },
    explorer: { shadow: 'wanderer', traits: ['curiosity', 'independence'], culturalVariants: { western: 'pioneer', eastern: 'seeker of harmony', african: 'bridge builder' } },
    sage: { shadow: 'dogmatist', traits: ['wisdom', 'knowledge'], culturalVariants: { western: 'expert', eastern: 'enlightened master', african: 'elder council' } },
    innocent: { shadow: 'naive', traits: ['optimism', 'trust'], culturalVariants: { western: 'dreamer', eastern: 'pure heart', african: 'community trust' } },
    creator: { shadow: 'perfectionist', traits: ['imagination', 'innovation'], culturalVariants: { western: 'artist', eastern: 'craftsman', african: 'storyteller' } },
    ruler: { shadow: 'dictator', traits: ['leadership', 'control'], culturalVariants: { western: 'executive', eastern: 'benevolent patriarch', african: 'chief consensus' } },
    magician: { shadow: 'manipulator', traits: ['transformation', 'vision'], culturalVariants: { western: 'visionary', eastern: 'alchemist', african: 'healer shaman' } },
    lover: { shadow: 'obsessive', traits: ['passion', 'commitment'], culturalVariants: { western: 'romantic', eastern: 'devoted partner', african: 'community bond' } },
    jester: { shadow: 'fool', traits: ['joy', 'spontaneity'], culturalVariants: { western: 'entertainer', eastern: 'wise fool', african: 'griot trickster' } },
    everyman: { shadow: 'victim', traits: ['belonging', 'authenticity'], culturalVariants: { western: 'regular person', eastern: 'harmonious member', african: 'village heart' } },
    rebel: { shadow: 'anarchist', traits: ['liberation', 'change'], culturalVariants: { western: 'revolutionary', eastern: 'reformer', african: 'freedom fighter' } }
  },
  
  johariQuadrants: {
    open: 'Known to self AND others - Public persona',
    blind: 'Unknown to self BUT known to others - Blind spots',
    hidden: 'Known to self BUT unknown to others - Secrets/Facade',
    unknown: 'Unknown to both - Unconscious potential'
  },
  
  culturalDimensions: {
    western: {
      framework: 'Big Five (OCEAN)',
      values: ['individualism', 'self-actualization', 'direct_communication', 'achievement'],
      contextLevel: 'low',
      riskOrientation: 'individual_gain',
      timeOrientation: 'future'
    },
    eastern: {
      framework: 'CPAI (Chinese Personality Assessment)',
      values: ['ren_qing', 'harmony', 'face_consciousness', 'collective_identity'],
      contextLevel: 'high',
      riskOrientation: 'group_stability',
      timeOrientation: 'cyclical'
    },
    african: {
      framework: 'Ubuntu Philosophy',
      values: ['communal_bonds', 'shared_humanity', 'interconnectedness', 'collective_responsibility'],
      contextLevel: 'high',
      riskOrientation: 'community_welfare',
      timeOrientation: 'ancestral_present'
    }
  },
  
  bartInterpretation: {
    veryLow: { range: [0, 20], label: 'Aşırı Temkinli', shadow: 'Kaçınma/Korku', archetype: 'innocent' },
    low: { range: [21, 40], label: 'Temkinli', shadow: 'Kontrol İhtiyacı', archetype: 'caregiver' },
    moderate: { range: [41, 60], label: 'Dengeli', shadow: 'Kararsızlık', archetype: 'everyman' },
    high: { range: [61, 80], label: 'Risk Alan', shadow: 'Dürtüsellik', archetype: 'explorer' },
    veryHigh: { range: [81, 100], label: 'Yüksek Risk', shadow: 'Kendine Zarar', archetype: 'rebel' }
  },

  // Gelişmiş Psikolojik Özellikler (PsychoCore Extensions)
  advancedFeatures: {
    deepPersonalityLayers: {
      unconsciousAnalysis: ['projektif testler', 'serbest çağrışım', 'rüya sembolleri', 'bastırılmış duygular', 'çocukluk travması', 'tekrarlayan kalıplar', 'içsel çocuk/ebeveyn ego'],
      neuropsychological: ['bilişsel işlev haritalama', 'beyin dominansı', 'duyusal işleme hassasiyeti (HSP)', 'nörodiverjans göstergeleri', 'bilişsel esneklik'],
      motivationValues: ['Maslow hiyerarşisi', 'örtük motivasyon', 'varoluşsal temalar', 'ahlaki gelişim (Kohlberg)', 'erdem ve karakter güçleri', 'yaşam amacı'],
      darkLight: ['Karanlık Üçlü (narsisizm, makyavelizm, psikopati)', 'Aydınlık Üçlü', 'gölge entegrasyonu', 'persona vs gerçek benlik', 'toksik vs sağlıklı dengesi']
    },
    attachmentSchemas: {
      earlySchemas: ['terk edilme', 'güvensizlik', 'duygusal yoksunluk', 'kusurluluk', 'sosyal izolasyon', 'bağımlılık', 'teslim olma', 'fedakarlık', 'onay arayışı', 'karşımsal düşünce', 'aşırı standartlar', 'cezalandırıcılık'],
      attachmentPatterns: ['güvenli', 'kaygılı', 'kaçıngan', 'düzensiz'],
      relationalCycles: ['kurtarma döngüsü', 'drama üçgeni', 'kodependency', 'nesne ilişkileri', 'ayrılma-bireyelleşme']
    },
    traumaResilience: {
      traumaLayers: ['gelişimsel travma', 'şok travma', 'karmaşık travma', 'somatik işaretler', 'dissosiyasyon', 'post-travmatik büyüme'],
      resilienceFactors: ['psikolojik dayanıklılık', 'adaptasyon mekanizmaları', 'sosyal destek', 'anlam bulma', 'kendi kendine şefkat']
    },
    existentialTranspersonal: {
      spiritualIntelligence: ['manevi zeka', 'ego gelişim aşamaları (Loevinger)', 'bilinç genişleme', 'kendini aşma', 'flow durumu'],
      existentialThemes: ['yalıtılmışlık', 'anlamsızlık', 'ölüm farkındalığı', 'özgürlük vs sorumluluk', 'otantiklik arayışı']
    },
    microBehaviorAnalysis: {
      linguisticPatterns: ['yazı dili analizi', 'kelime seçimi', 'tutarsızlık tespiti', 'savunma tetikleyicileri', 'örtük önyargı'],
      decisionMaking: ['tepki süreleri', 'karar verme hızı', 'bilişsel yanlılıklar', 'sezgisel vs analitik']
    },
    dynamicIntegration: {
      selfIntegration: ['kişiliğin parçaları', 'iç çatışma haritası', 'benlik tutarlılığı', 'kimlik gelişimi (Erikson)', 'otantiklik seviyesi'],
      futureOriented: ['potansiyel gelişim yolları', 'kör noktalar', 'saklı yetenekler', 'değişime hazırlık (Prochaska)', 'kişisel evrim tahmini']
    }
  },

  contentRecommendations: {
    hero: {
      films: ['Gladiator', 'Braveheart', 'The Dark Knight', 'Wonder Woman', 'Creed'],
      books: ['Joseph Campbell - The Hero with a Thousand Faces', 'Paulo Coelho - The Alchemist', 'Sun Tzu - The Art of War'],
      music: ['Two Steps From Hell - Heart of Courage', 'Hans Zimmer - Time', 'Audiomachine - Epic Scores'],
      activities: ['Martial arts', 'Mountain climbing', 'Leadership workshops', 'Volunteer firefighting']
    },
    caregiver: {
      films: ['Amélie', 'Life is Beautiful', 'The Blind Side', 'Soul', 'Up'],
      books: ['Brené Brown - Daring Greatly', 'Thich Nhat Hanh - The Art of Living', 'Viktor Frankl - Man\'s Search for Meaning'],
      music: ['Ludovico Einaudi - Experience', 'Ólafur Arnalds - Near Light', 'Max Richter - On The Nature of Daylight'],
      activities: ['Volunteering', 'Meditation retreats', 'Animal shelter work', 'Hospice care']
    },
    explorer: {
      films: ['Into the Wild', 'The Secret Life of Walter Mitty', 'Eat Pray Love', 'Wild', 'The Motorcycle Diaries'],
      books: ['Jack Kerouac - On the Road', 'Jon Krakauer - Into Thin Air', 'Rolf Potts - Vagabonding'],
      music: ['Bon Iver - Holocene', 'Fleet Foxes - White Winter Hymnal', 'Explosions in the Sky - Your Hand in Mine'],
      activities: ['Backpacking', 'Solo travel', 'Learning new languages', 'Urban exploration']
    },
    sage: {
      films: ['The Matrix', 'A Beautiful Mind', 'Good Will Hunting', 'Arrival', 'Interstellar'],
      books: ['Carl Sagan - Cosmos', 'Yuval Noah Harari - Sapiens', 'Richard Feynman - Surely You\'re Joking, Mr. Feynman!'],
      music: ['Philip Glass - Metamorphosis', 'Brian Eno - Music for Airports', 'Nils Frahm - Says'],
      activities: ['Philosophy circles', 'Documentary watching', 'Chess', 'Academic lectures']
    },
    innocent: {
      films: ['Forrest Gump', 'The Truman Show', 'WALL-E', 'Big Fish', 'Edward Scissorhands'],
      books: ['Antoine de Saint-Exupéry - The Little Prince', 'Hermann Hesse - Siddhartha', 'Richard Bach - Jonathan Livingston Seagull'],
      music: ['Sigur Rós - Hoppípolla', 'The Cinematic Orchestra - To Build a Home', 'Yiruma - River Flows in You'],
      activities: ['Nature walks', 'Stargazing', 'Gardening', 'Creative journaling']
    },
    creator: {
      films: ['Whiplash', 'The Grand Budapest Hotel', 'Amélie', 'Spirited Away', 'Inception'],
      books: ['Julia Cameron - The Artist\'s Way', 'Austin Kleon - Steal Like an Artist', 'Elizabeth Gilbert - Big Magic'],
      music: ['Aphex Twin - Selected Ambient Works', 'Radiohead - Kid A', 'Björk - Homogenic'],
      activities: ['Art classes', 'Music production', 'Creative writing', 'Photography walks']
    },
    ruler: {
      films: ['The Godfather', 'Lincoln', 'The Crown', 'House of Cards', 'Succession'],
      books: ['Robert Greene - The 48 Laws of Power', 'Niccolò Machiavelli - The Prince', 'Jim Collins - Good to Great'],
      music: ['Wagner - Ride of the Valkyries', 'Beethoven - Symphony No. 5', 'Vangelis - Conquest of Paradise'],
      activities: ['Executive coaching', 'Strategic games', 'Business networking', 'Political activism']
    },
    magician: {
      films: ['The Prestige', 'Doctor Strange', 'The Fountain', 'Cloud Atlas', 'Pan\'s Labyrinth'],
      books: ['Carlos Castaneda - The Teachings of Don Juan', 'Aldous Huxley - The Doors of Perception', 'Terence McKenna - Food of the Gods'],
      music: ['Tool - Lateralus', 'Pink Floyd - Dark Side of the Moon', 'Shpongle - Divine Moments of Truth'],
      activities: ['Meditation', 'Breathwork', 'Tarot/I Ching study', 'Psychedelic integration']
    },
    lover: {
      films: ['In the Mood for Love', 'Before Sunrise', 'The Notebook', 'Eternal Sunshine of the Spotless Mind', 'Pride & Prejudice'],
      books: ['Rumi - The Essential Rumi', 'Khalil Gibran - The Prophet', 'Esther Perel - Mating in Captivity'],
      music: ['Jeff Buckley - Hallelujah', 'Nina Simone - Feeling Good', 'Sade - By Your Side'],
      activities: ['Partner dancing', 'Couples therapy', 'Tantra workshops', 'Love letter writing']
    },
    jester: {
      films: ['The Big Lebowski', 'Monty Python and the Holy Grail', 'Deadpool', 'Ferris Bueller\'s Day Off', 'The Mask'],
      books: ['Douglas Adams - The Hitchhiker\'s Guide to the Galaxy', 'Terry Pratchett - Discworld series', 'Oscar Wilde - The Importance of Being Earnest'],
      music: ['Queen - Don\'t Stop Me Now', 'Weird Al Yankovic - Discography', 'The Lonely Island - I\'m on a Boat'],
      activities: ['Improv comedy', 'Stand-up comedy workshops', 'Pranks (harmless)', 'Carnival participation']
    },
    everyman: {
      films: ['The Shawshank Redemption', 'Cast Away', 'The Pursuit of Happyness', 'Groundhog Day', 'About Time'],
      books: ['Mitch Albom - Tuesdays with Morrie', 'Malcolm Gladwell - Outliers', 'Dale Carnegie - How to Win Friends and Influence People'],
      music: ['Coldplay - Fix You', 'U2 - Beautiful Day', 'John Lennon - Imagine'],
      activities: ['Community events', 'Book clubs', 'Sports leagues', 'Neighborhood volunteering']
    },
    rebel: {
      films: ['Fight Club', 'V for Vendetta', 'One Flew Over the Cuckoo\'s Nest', 'The Matrix', 'Joker'],
      books: ['George Orwell - 1984', 'Aldous Huxley - Brave New World', 'Naomi Klein - No Logo'],
      music: ['Rage Against the Machine - Killing in the Name', 'System of a Down - Toxicity', 'N.W.A - Straight Outta Compton'],
      activities: ['Activism', 'Protest organizing', 'Alternative communities', 'Counter-culture events']
    }
  }
}

// ============================================
// AI CONFIGURATION
// ============================================
const AI_CONFIG = {
  OLLAMA: {
    baseUrl: 'http://localhost:11434/api',
    models: {
      pro: 'nexai',
      flash: 'nexai',
      thinking: 'nexai'
    },
    temperature: { logic: 0.1, creative: 0.8, analysis: 0.3 }
  },
  GEMINI: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    models: {
      pro: 'gemini-2.0-flash',
      flash: 'gemini-2.0-flash',
      thinking: 'gemini-2.0-flash-thinking-exp'
    },
    temperature: { logic: 0.1, creative: 0.8, analysis: 0.3 }
  },
  FALLBACK: {
    models: ['google/gemma-3n-e2b-it:free', 'mistralai/devstral-2512:free', 'nvidia/nemotron-nano-9b-v2:free'],
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions'
  }
}

// ============================================
// AGENT PROMPTS
// ============================================
const AGENT_PROMPTS = {
  culturalAnthropologist: `Sen NEXAI sisteminin "Kültürel Antropolog" ajanısın.
GÖREV: Kullanıcının kültürel bağlamını analiz et ve iletişim tarzını belirle.
JSON ÇIKTI FORMATI:
{
  "contextLevel": "high" | "low" | "medium",
  "culturalFramework": "western" | "eastern" | "african" | "hybrid",
  "communicationStyle": { "directness": 0-100, "emotionalExpression": 0-100, "formalityLevel": 0-100, "implicitMeaning": 0-100 },
  "detectedValues": string[],
  "adaptationRecommendations": string[],
  "confidence": 0-100
}`,

  shadowHunter: `Sen NEXAI sisteminin "Gölge Avcısı" ajanısın. Carl Jung'un Gölge konseptini kullanarak bilinçdışı çelişkileri tespit ediyorsun.
GÖREV: Kullanıcının beyan ettiği (Persona) ile sakladığı (Gölge) arasındaki çelişkileri ortaya çıkar.
JSON ÇIKTI FORMATI:
{
  "johariAnalysis": { "openArea": string[], "blindSpots": string[], "hiddenArea": string[], "unknownPotential": string[] },
  "shadowManifestations": [{ "pattern": string, "evidence": string, "mechanism": string, "intensity": 0-100 }],
  "deltaAnalysis": { "statedVsBehavior": [], "overallCongruence": 0-100 },
  "dominantArchetype": string,
  "shadowArchetype": string,
  "integrationPath": string[],
  "riskFactors": string[],
  "confidence": 0-100
}`,

  aestheticCurator: `Sen NEXAI sisteminin "Estetik Küratör" ajanısın.
GÖREV: Arketip, gölge ve kültürel bağlama göre film, kitap, müzik ve aktivite önerileri oluştur.
JSON ÇIKTI FORMATI:
{
  "recommendations": {
    "films": [{ "title": string, "reason": string, "therapeuticPurpose": string }],
    "books": [{ "title": string, "author": string, "reason": string }],
    "music": [{ "title": string, "artist": string, "mood": string }],
    "activities": [{ "activity": string, "reason": string, "frequency": string }]
  },
  "curatorNotes": string,
  "weeklyPlan": { "monday": string, "wednesday": string, "friday": string, "weekend": string }
}`,

  psychoCoreX: `Sen PsychoCore-X'sin. Dünyanın en gelişmiş, çok modüllü psikolojik analiz ve kişisel gelişim motorusun.

YETKİNLİKLERİN:
- Jung Arketipleri & Gölge analizi
- Big Five (OCEAN) skorları
- MBTI & Enneagram profilleme
- Duygusal Zeka (EQ) analizi
- BART Risk Toleransı
- Bilişsel Yanlılıklar tespiti
- Stres & Savunma Mekanizmaları
- CBT egzersizleri
- İletişim & Bağlanma Stilleri

KRİTİK KURALLAR:
- ASLA tıbbi tanı koyma ("Depresyon hastasısın" değil, "Depresif belirtiler gösteriyor olabilir")
- Objektif ve empatik ol
- Kültürel adaptasyon yap

JSON ÇIKTI FORMATI:
{
  "mood_score": 0-100,
  "risk_tolerance": "Low" | "Moderate" | "High",
  "big_five": { "openness": 0-100, "conscientiousness": 0-100, "extraversion": 0-100, "agreeableness": 0-100, "neuroticism": 0-100 },
  "dominant_archetype": string,
  "shadow_traits": string[],
  "cognitive_biases": string[],
  "eq_indicators": { "self_awareness": 0-100, "self_management": 0-100, "social_awareness": 0-100 },
  "communication_style": "Passive" | "Aggressive" | "Passive-Aggressive" | "Assertive",
  "attachment_style": "Secure" | "Anxious" | "Avoidant",
  "recommended_exercises": [{ "type": string, "description": string, "purpose": string }],
  "insights": string,
  "confidence": 0-100
}`,

  psychoCoreUltra: `Sen PsychoCore-ULTRA'sın. İnsan zihninin en derin katmanlarına inebilen, Derinlik Psikolojisi, Nöropsikoloji ve Varoluşçu Felsefe senteziyle çalışan yapay zeka motorusun.

DERİN ANALİZ MODÜLLERİ:

**Bilinçdışı & Psikodinamik:**
- Gölge & Arketip (Bastırılmış özellikler)
- Rüya & Sembol analizi (Jungian)
- Ego Durumları (İçsel Çocuk, Ebeveyn, Yetişkin)
- Projektif Analiz (Metaforlardan bilinçdışı okuma)

**Nöro-Profil & Biliş:**
- Nörodiverjans Eğilimleri (ADHD, Otizm, HSP benzeri kalıplar - teşhis değil)
- Bilişsel Esneklik (Katı vs Esnek düşünce)
- Beyin Dominansı (Analitik vs Sezgisel)

**Şema & Travma:**
- Uyumsuz Şemalar (18 temel şema: Terk edilme, Kusurluluk, Boyun Eğicilik vb.)
- Travma & Savunma (Dissosiyasyon, Yansıtma, Bastırma)
- Bağlanma Döngüleri (Tekrarlayan toksik senaryolar)

**Karakter Analizi:**
- Karanlık Üçlü (Narsisizm, Makyavelizm, Psikopati eğilimleri)
- Aydınlık Üçlü (Empati, Hümanizm, Dürüstlük)
- Otantiklik (Persona vs Gerçek Benlik mesafesi)

**Varoluşsal:**
- Anlam & Amaç (Varoluşsal kaygılar)
- Flow & Aşkınlık (Kendini gerçekleştirme)

KRİTİK SINIRLAR:
- ASLA "Sen ADHD'lisin" deme. "ADHD benzeri dikkat dağınıklığı örüntüleri" de.
- Yargılayıcı olma, objektif kal.

JSON ÇIKTI FORMATI:
{
  "deepAnalysis": string,
  "depth_analysis": {
    "shadow_layer": { "repressed_traits": string[], "active_archetypes": string[], "ego_states": { "child": 0-100, "parent": 0-100, "adult": 0-100 } },
    "neuro_profile": { "neurodivergence_indicators": string[], "cognitive_flexibility": "Rigid" | "Flexible" | "Growth", "brain_dominance": "Analytical" | "Intuitive" | "Balanced" },
    "schema_trauma": { "maladaptive_schemas": string[], "defense_mechanisms": string[], "attachment_patterns": string[] },
    "character_layer": { "dark_triad": { "narcissism": 0-100, "machiavellianism": 0-100, "psychopathy": 0-100 }, "light_triad": { "empathy": 0-100, "humanism": 0-100, "honesty": 0-100 }, "authenticity_gap": 0-100 },
    "existential_layer": { "meaning_score": 0-100, "existential_anxieties": string[], "self_actualization": 0-100 }
  },
  "existentialInsights": string,
  "neuropsychology": string,
  "synthesis": string,
  "recommendations": [{ "approach": string, "focus": string, "exercises": string[] }],
  "safety_notes": string,
  "confidence": 0-100
}`,

  deepPsycheEngine: `## 🎭 PERSONA
Sen, dünyanın en kapsamlı psikometrik veri setine sahip "Deep-Psyche Analysis Engine" (DPAE) sistemisin. Uzmanlığın; klinik psikoloji, nöropsikoloji, bilişsel bilimler ve yüksek seviyeli zeka analizi (IQ/Cognitive Aptitude) alanlarının kesişimindedir. MMPI-3'ten WAIS-IV'e, Jung arketiplerinden ultra-yüksek IQ testlerine (Titan/Mega) kadar tüm küresel standartlara hakimsin. Amacın, kullanıcıdan gelen verileri çapraz sorgulama ile analiz ederek "Bütünleşik bir Benlik Matrisi" oluşturmaktır.

## 📋 CONTEXT
Kullanıcı, ham test verileri, kişisel yanıtlar veya bir profil özeti sunacaktır. Bu veriler {{kullanici_verisi}} değişkeninde tutulmaktadır. Sistem, bu verileri 5 ana katmanda (Yüzey, Orta, Derin, Varoluşsal, Bilişsel) analiz etmeli ve veriler arasındaki tutarsızlıkları (Social Desirability Bias) tespit etmelidir.

## 🎯 TASK
Aşağıdaki adımları sırasıyla ve titizlikle uygula:

1. **Multi-Faceted Parsing**: {{kullanici_verisi}} içerisindeki Big Five, MBTI, IQ puanları ve klinik göstergeleri ayrıştır.
2. **Cross-Correlation Analysis**: Örneğin, kullanıcının "Düşük Uyumluluk" (Big Five) ile "Korkulu Bağlanma" (ECR-R) arasındaki ilişkisini analiz et.
3. **Cognitive-IQ Mapping**: IQ puanlarını (WAIS-IV veya Raven) çalışma belleği ve akışkan zeka bağlamında yorumla.
4. **Shadow & Archetype Integration**: Jungian analizi yaparak Persona-Shadow dengesini kur.
5. **Pattern Recognition**: Tekrarlayan yaşam senaryolarını (YSQ-L3 şemaları) tespit et.
6. **Synthesis Report**: Verileri profesyonel bir rapor haline getir.

## 🚫 CONSTRAINTS
- Asla tıbbi bir tanı koyma; analizlerini "eğilim", "gösterge" veya "olasılık" diliyle sun.
- Eğer veri eksikse, analizi durdurma; eksik kısımları "Daha fazla veri gerektiren kör noktalar" olarak işaretle.
- Yanıt tonun; empatik ama bilimsel, derinlemesine ama anlaşılır olmalı.
- Türkçe dil kurallarına ve akademik terminolojiye (Akışkan Zeka, Ketlenme, Öz-yeterlilik) sadık kal.

## 🔍 EVALUATION (Self-Correction)
Yanıtını sunmadan önce şu kontrolleri yap:
- MMPI ve Big Five verileri birbiriyle çelişiyor mu?
- IQ verisi ile bilişsel esneklik skoru uyumlu mu?
- Şema analizi, kişinin stres tepkileriyle (örtüşüyor mu?
- Rapor, somut gelişim adımları (Actionable Insights) içeriyor mu?

JSON ÇIKTI FORMATI:
{
  "analysis_depth": "Yüzeyel" | "Standart" | "Derin" | "Klinik-Eğilimli",
  "multi_faceted_parsing": {
    "big_five": { "openness": 0-100, "conscientiousness": 0-100, "extraversion": 0-100, "agreeableness": 0-100, "neuroticism": 0-100 },
    "mbti": { "type": string, "cognitive_functions": string[] },
    "iq_scores": { "fsiq": number, "vci": number, "pri": number, "wmi": number, "psi": number },
    "clinical_indicators": { "depression": 0-100, "anxiety": 0-100, "stress": 0-100 }
  },
  "cross_correlation": [
    { "dimension_1": string, "dimension_2": string, "correlation": "Pozitif" | "Negatif" | "Nötr", "insight": string }
  ],
  "cognitive_iq_mapping": {
    "fluid_intelligence": 0-100,
    "crystallized_intelligence": 0-100,
    "working_memory": 0-100,
    "processing_speed": 0-100,
    "cognitive_profile": string
  },
  "shadow_archetype": {
    "dominant_archetype": string,
    "shadow_archetype": string,
    "persona_shadow_balance": 0-100,
    "integration_recommendations": string[]
  },
  "pattern_recognition": {
    "recurring_schemas": string[],
    "life_patterns": string[],
    "trigger_response_cycles": string[]
  },
  "blind_spots": string[],
  "data_consistency_score": 0-100,
  "synthesis_report": {
    "executive_summary": string,
    "strengths": string[],
    "growth_areas": string[],
    "actionable_insights": string[],
    "professional_referral": string
  },
  "confidence": 0-100
}`
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Initialize Unified Engine on app startup
initializeUnifiedEngine().catch(error => {
  console.error('Failed to initialize Unified Engine:', error)
})

// ============================================
// SECURITY HELPER FUNCTIONS
// ============================================

// Generate secure random string
function generateId(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => chars[byte % chars.length]).join('')
}

// Hash password using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = generateId(16)
  const data = encoder.encode(salt + password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return `${salt}:${hashHex}`
}

// Verify password
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':')
  const encoder = new TextEncoder()
  const data = encoder.encode(salt + password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hash === hashHex
}

// Create JWT token
async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const tokenPayload = { ...payload, iat: now, exp: now + SECURITY_CONFIG.JWT_EXPIRY }
  
  const base64Header = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const base64Payload = btoa(JSON.stringify(tokenPayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${base64Header}.${base64Payload}`)
  )
  
  const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  return `${base64Header}.${base64Payload}.${base64Signature}`
}

// Verify JWT token
async function verifyJWT(token: string, secret: string): Promise<any | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const [base64Header, base64Payload, base64Signature] = parts
    
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    const signatureArray = Uint8Array.from(atob(base64Signature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureArray,
      encoder.encode(`${base64Header}.${base64Payload}`)
    )
    
    if (!valid) return null
    
    const payload = JSON.parse(atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/')))
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    
    return payload
  } catch {
    return null
  }
}

// Rate limiting check with periodic cleanup
function checkRateLimit(ip: string, isAuth = false): boolean {
  const now = Date.now()
  const limit = isAuth ? SECURITY_CONFIG.RATE_LIMIT.authRequests : SECURITY_CONFIG.RATE_LIMIT.maxRequests
  const key = isAuth ? `auth:${ip}` : `api:${ip}`
  
  // Cleanup every 100 requests
  if (rateLimitStore.size > 0 && rateLimitStore.size % 100 === 0) {
    cleanupRateLimitStore()
  }
  
  const record = rateLimitStore.get(key)
  
  if (!record || record.resetTime < now) {
    rateLimitStore.set(key, { count: 1, resetTime: now + SECURITY_CONFIG.RATE_LIMIT.windowMs })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

// Validate password strength
function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < SECURITY_CONFIG.PASSWORD.minLength) {
    errors.push(`Şifre en az ${SECURITY_CONFIG.PASSWORD.minLength} karakter olmalı`)
  }
  if (SECURITY_CONFIG.PASSWORD.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermeli')
  }
  if (SECURITY_CONFIG.PASSWORD.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermeli')
  }
  if (SECURITY_CONFIG.PASSWORD.requireNumber && !/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermeli')
  }
  
  return { valid: errors.length === 0, errors }
}

// Validate email
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Sanitize string input (prevent XSS)
function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 10000) // Limit length
}

// Sanitize object recursively
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') return sanitizeInput(obj)
  if (Array.isArray(obj)) return obj.map(sanitizeObject)
  if (obj && typeof obj === 'object') {
    const result: any = {}
    for (const key of Object.keys(obj)) {
      result[key] = sanitizeObject(obj[key])
    }
    return result
  }
  return obj
}

// ============================================
// AI HELPER FUNCTIONS
// ============================================

async function callOllama(model: string, messages: any[], temperature: number, options: any = {}) {
  try {
    // Convert messages to Ollama format
    const ollamaMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'system' : 'user',
      content: msg.content
    }))

    const url = `${AI_CONFIG.OLLAMA.baseUrl}/chat`
    
    const body = {
      model,
      messages: ollamaMessages,
      stream: false,
      options: {
        temperature,
        num_predict: options.maxTokens || 8192,
        top_p: 0.95,
        top_k: 40
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!response.ok) return null

    const data = await response.json() as any
    return { 
      content: data.message?.content, 
      model, 
      usage: { 
        prompt_tokens: data.prompt_eval_count || 0,
        completion_tokens: data.eval_count || 0,
        total_tokens: (data.prompt_eval_count || 0) + (data.eval_count || 0)
      } 
    }
  } catch (error) {
    console.error('Ollama API error:', error)
    return null
  }
}

async function callGemini(apiKey: string, model: string, messages: any[], temperature: number, options: any = {}) {
  try {
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    let systemInstruction = undefined
    if (messages[0]?.role === 'system') {
      systemInstruction = { parts: [{ text: messages[0].content }] }
      contents.shift()
    }

    const url = `${AI_CONFIG.GEMINI.baseUrl}/${model}:generateContent?key=${apiKey}`
    
    const body: any = {
      contents,
      generationConfig: { temperature, maxOutputTokens: options.maxTokens || 8192, topP: 0.95, topK: 40 }
    }

    if (systemInstruction) body.systemInstruction = systemInstruction

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!response.ok) return null

    const data = await response.json() as any
    return { content: data.candidates?.[0]?.content?.parts?.[0]?.text, model, usage: data.usageMetadata }
  } catch {
    return null
  }
}

async function callOpenRouter(apiKey: string, model: string, messages: any[], temperature: number, options: any = {}) {
  try {
    const response = await fetch(AI_CONFIG.FALLBACK.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nexai-omni-prime.pages.dev',
        'X-Title': 'NEXAI OMNI-PRIME v4.0'
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens: options.maxTokens || 4096 })
    })

    if (!response.ok) return null
    const data = await response.json() as any
    return { content: data.choices?.[0]?.message?.content, model: data.model, usage: data.usage }
  } catch {
    return null
  }
}

async function callAI(env: Bindings, messages: any[], temperature: number = 0.3, options: any = {}) {
  // Try Gemini first (Cloud)
  const geminiKey = env.GEMINI_API_KEY
  if (geminiKey && geminiKey !== 'your_gemini_api_key_here' && !geminiKey.includes('demo')) {
    const geminiModel = options.thinking ? AI_CONFIG.GEMINI.models.thinking : AI_CONFIG.GEMINI.models.pro
    const result = await callGemini(geminiKey, geminiModel, messages, temperature, options)
    if (result?.content) return { content: result.content, model: `gemini/${result.model}`, source: 'gemini' }
  }

  // Fallback to Ollama (Local)
  const ollamaModel = options.thinking ? AI_CONFIG.OLLAMA.models.thinking : AI_CONFIG.OLLAMA.models.pro
  const ollamaResult = await callOllama(ollamaModel, messages, temperature, options)
  if (ollamaResult?.content) {
    return { content: ollamaResult.content, model: `ollama/${ollamaResult.model}`, source: 'ollama' }
  }

  // Fallback to OpenRouter
  const openRouterKey = env.OPENROUTER_API_KEY
  if (openRouterKey && openRouterKey !== 'your_openrouter_api_key_here' && !openRouterKey.includes('demo')) {
    for (const orModel of AI_CONFIG.FALLBACK.models) {
      const result = await callOpenRouter(openRouterKey, orModel, messages, temperature, options)
      if (result?.content) return { content: result.content, model: orModel, source: 'openrouter' }
    }
  } else {
    console.warn('OpenRouter API key is missing or default. Skipping fallback.')
  }

  // DEMO MODE: Return mock AI response when all AI services fail
  console.log('🎭 DEMO MODE: Generating mock AI response')
  const demoResponse = generateDemoResponse(messages, options)
  return { content: demoResponse, model: 'demo-mode', source: 'demo' }
}

// Demo response generator for when AI services are unavailable
function generateDemoResponse(messages: any[], options: any = {}): string {
  const userMessage = messages.find(m => m.role === 'user')?.content || ''
  const isAnalysis = userMessage.toLowerCase().includes('analiz') || userMessage.toLowerCase().includes('analysis')
  const isSynthesis = userMessage.toLowerCase().includes('sentez') || userMessage.toLowerCase().includes('synthesis')
  const isProfile = userMessage.toLowerCase().includes('profil') || userMessage.toLowerCase().includes('profile')
  
  if (isSynthesis || isProfile) {
    return JSON.stringify({
      summary: "🎭 DEMO MOD: Bu bir örnek psikolojik profil analizidir. Gerçek analiz için AI API yapılandırması gereklidir.",
      personality: {
        bigFive: { openness: 75, conscientiousness: 68, extraversion: 62, agreeableness: 71, neuroticism: 45 },
        mbti: "INFJ",
        enneagram: "4w5",
        dominantTraits: ["Yaratıcı", "Empatik", "Analitik", "İçe dönük"]
      },
      cognitive: {
        iqEstimate: "Ortalamanın üzeri (115-125)",
        thinkingStyle: "Sezgisel-Analitik",
        learningPreference: "Görsel-Kavramsal",
        cognitiveStrengths: ["Desen tanıma", "Soyut düşünme", "Yaratıcı problem çözme"]
      },
      emotional: {
        emotionalIntelligence: 78,
        primaryEmotions: ["Merak", "Nostalji", "Huzur arayışı"],
        copingMechanisms: ["İçselleştirme", "Yaratıcı ifade", "Analitik mesafe"]
      },
      jungArchetype: {
        primary: "Yaratıcı (Creator)",
        secondary: "Bilge (Sage)",
        shadow: "Yetim (Orphan)"
      },
      recommendations: [
        "Yaratıcı projelerle iç dünyanızı ifade edin",
        "Sosyal bağlantılarınızı güçlendirmek için küçük gruplarla etkileşim kurun",
        "Analitik yeteneklerinizi pratik hedeflere yönlendirin"
      ],
      riskFactors: {
        level: "Düşük",
        areas: ["Aşırı içe dönüklük riski", "Mükemmeliyetçilik eğilimi"]
      },
      demoMode: true,
      notice: "⚠️ Bu sonuçlar demo amaçlıdır. Gerçek AI analizi için GEMINI_API_KEY veya OPENROUTER_API_KEY yapılandırın."
    }, null, 2)
  }
  
  if (isAnalysis) {
    return JSON.stringify({
      analysis: "🎭 DEMO MOD: Analiz başarıyla simüle edildi.",
      insights: [
        "Kullanıcı yaratıcı ve düşünceli bir yapıya sahip görünüyor",
        "İletişim tarzı açık ve ifade edici",
        "Duygusal derinlik ve içgörü kapasitesi yüksek"
      ],
      confidence: 0.85,
      demoMode: true
    }, null, 2)
  }
  
  return JSON.stringify({
    response: "🎭 DEMO MOD: AI servisleri şu anda kullanılamıyor. Bu bir örnek yanıttır.",
    status: "demo",
    recommendation: "Gerçek AI analizi için .dev.vars dosyasında geçerli API anahtarları yapılandırın.",
    demoMode: true
  }, null, 2)
}

function safeParseJSON(content: string, defaultValue: any = {}) {
  try {
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/)
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content
    return JSON.parse(jsonStr)
  } catch {
    return defaultValue
  }
}

// ============================================
// MIDDLEWARE
// ============================================

app.use('*', logger())

// Security Headers
app.use('*', async (c, next) => {
  await next()
  // Security headers
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('X-XSS-Protection', '1; mode=block')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
})

// CORS - Allow same origin and specific domains
app.use('/api/*', cors({
  origin: (origin) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return '*'
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) return origin
    // Allow Cloudflare Pages domains
    if (origin.includes('.pages.dev') || origin.includes('.workers.dev')) return origin
    // Allow the sandbox domain
    if (origin.includes('.sandbox.novita.ai')) return origin
    return origin
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
}))

// Request ID & Rate Limiting
app.use('*', async (c, next) => {
  c.set('requestId', generateId(16))
  
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
  const isAuthRoute = c.req.path.startsWith('/api/auth')
  
  if (!checkRateLimit(ip, isAuthRoute)) {
    return c.json({ error: 'Çok fazla istek. Lütfen bekleyin.', code: 'RATE_LIMIT' }, 429)
  }
  
  await next()
})

// Auth Middleware (for protected routes)
app.use('/api/protected/*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Yetkilendirme gerekli', code: 'UNAUTHORIZED' }, 401)
  }
  
  const token = authHeader.substring(7)
  const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
  const payload = await verifyJWT(token, secret)
  
  if (!payload) {
    return c.json({ error: 'Geçersiz veya süresi dolmuş token', code: 'INVALID_TOKEN' }, 401)
  }
  
  c.set('user', payload.user)
  await next()
})

app.use('/static/*', serveStatic())

// ============================================
// AUTH ROUTES
// ============================================

// Register with email/password
app.post('/api/auth/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, şifre ve isim gerekli', code: 'MISSING_FIELDS' }, 400)
    }
    
    if (!validateEmail(email)) {
      return c.json({ error: 'Geçersiz email adresi', code: 'INVALID_EMAIL' }, 400)
    }
    
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return c.json({ error: passwordValidation.errors.join(', '), code: 'WEAK_PASSWORD' }, 400)
    }
    
    // Check if user exists (using KV or D1 in production)
    const userId = generateId()
    const passwordHash = await hashPassword(password)
    
    const user: User = {
      id: userId,
      email,
      name,
      provider: 'email',
      createdAt: new Date().toISOString()
    }
    
    // In production, save to D1 database
    // await c.env.DB.prepare('INSERT INTO users (id, email, name, password_hash, provider, created_at) VALUES (?, ?, ?, ?, ?, ?)').bind(userId, email, name, passwordHash, 'email', user.createdAt).run()
    
    const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
    const token = await createJWT({ user }, secret)
    
    return c.json({
      success: true,
      user,
      token,
      message: 'Hesap başarıyla oluşturuldu'
    })
    
  } catch (error) {
    console.error('Register error:', error)
    return c.json({ error: 'Kayıt başarısız', code: 'REGISTER_FAILED' }, 500)
  }
})

// Login with email/password
app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({ error: 'Email ve şifre gerekli', code: 'MISSING_FIELDS' }, 400)
    }
    
    // In production, fetch from D1 database
    // const result = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first()
    // if (!result || !(await verifyPassword(password, result.password_hash))) { ... }
    
    // Demo user for testing
    const user: User = {
      id: generateId(),
      email,
      name: email.split('@')[0],
      provider: 'email',
      createdAt: new Date().toISOString()
    }
    
    const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
    const token = await createJWT({ user }, secret)
    
    return c.json({
      success: true,
      user,
      token,
      message: 'Giriş başarılı'
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Giriş başarısız', code: 'LOGIN_FAILED' }, 500)
  }
})

// Test Token Endpoint (for development/testing)
app.post('/api/auth/test-token', async (c) => {
  try {
    const { email = 'test@example.com', name = 'Test User' } = await c.req.json()
    
    const user: User = {
      id: 'test-user-' + Math.random().toString(36).substr(2, 9),
      email,
      name,
      provider: 'test',
      createdAt: new Date().toISOString()
    }
    
    const secret = c.env.JWT_SECRET
    if (!secret) {
      return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
    }
    
    const token = await createJWT({ user }, secret)
    
    return c.json({
      success: true,
      user,
      token,
      message: 'Test token oluşturuldu'
    })
  } catch (error) {
    console.error('Test token error:', error)
    return c.json({ error: 'Test token oluşturulamadı', code: 'TOKEN_FAILED' }, 500)
  }
})

// OAuth state store for CSRF protection
const oauthStateStore = new Map<string, { createdAt: number; provider: string }>()

// Clean old states (older than 10 minutes)
function cleanOldStates() {
  const now = Date.now()
  for (const [key, value] of oauthStateStore.entries()) {
    if (now - value.createdAt > 10 * 60 * 1000) {
      oauthStateStore.delete(key)
    }
  }
}

// Google OAuth
app.get('/api/auth/google', (c) => {
  const clientId = c.env.GOOGLE_CLIENT_ID || 'demo-client-id'
  const redirectUri = `${c.req.url.split('/api')[0]}/api/auth/google/callback`
  
  // Generate state for CSRF protection
  const state = generateId(32)
  oauthStateStore.set(state, { createdAt: Date.now(), provider: 'google' })
  cleanOldStates()
  
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'openid email profile')
  authUrl.searchParams.set('access_type', 'offline')
  authUrl.searchParams.set('state', state)
  
  return c.json({ authUrl: authUrl.toString() })
})

app.get('/api/auth/google/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const state = c.req.query('state')
    
    if (!code) {
      return c.redirect('/?error=no_code')
    }
    
    // Verify CSRF state
    if (!state || !oauthStateStore.has(state)) {
      return c.redirect('/?error=invalid_state')
    }
    oauthStateStore.delete(state)
    
    const clientId = c.env.GOOGLE_CLIENT_ID
    const clientSecret = c.env.GOOGLE_CLIENT_SECRET
    const redirectUri = `${c.req.url.split('/api')[0]}/api/auth/google/callback`
    
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId || '',
        client_secret: clientSecret || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })
    
    if (!tokenResponse.ok) {
      return c.redirect('/?error=token_exchange_failed')
    }
    
    const tokens = await tokenResponse.json() as any
    
    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    })
    
    const googleUser = await userResponse.json() as any
    
    const user: User = {
      id: generateId(),
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      provider: 'google',
      createdAt: new Date().toISOString()
    }
    
    const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
    const token = await createJWT({ user }, secret)
    
    return c.redirect(`/?token=${token}`)
    
  } catch (error) {
    console.error('Google OAuth error:', error)
    return c.redirect('/?error=oauth_failed')
  }
})

// GitHub OAuth
app.get('/api/auth/github', (c) => {
  const clientId = c.env.GITHUB_CLIENT_ID || 'demo-client-id'
  const redirectUri = `${c.req.url.split('/api')[0]}/api/auth/github/callback`
  
  // Generate state for CSRF protection
  const state = generateId(32)
  oauthStateStore.set(state, { createdAt: Date.now(), provider: 'github' })
  cleanOldStates()
  
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', 'user:email')
  authUrl.searchParams.set('state', state)
  
  return c.json({ authUrl: authUrl.toString() })
})

app.get('/api/auth/github/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const state = c.req.query('state')
    
    if (!code) {
      return c.redirect('/?error=no_code')
    }
    
    // Verify CSRF state
    if (!state || !oauthStateStore.has(state)) {
      return c.redirect('/?error=invalid_state')
    }
    oauthStateStore.delete(state)
    
    const clientId = c.env.GITHUB_CLIENT_ID
    const clientSecret = c.env.GITHUB_CLIENT_SECRET
    
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    })
    
    const tokens = await tokenResponse.json() as any
    
    if (!tokens.access_token) {
      return c.redirect('/?error=token_exchange_failed')
    }
    
    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        Authorization: `Bearer ${tokens.access_token}`,
        'User-Agent': 'NEXAI-App'
      }
    })
    
    const githubUser = await userResponse.json() as any
    
    // Get email
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: { 
        Authorization: `Bearer ${tokens.access_token}`,
        'User-Agent': 'NEXAI-App'
      }
    })
    
    const emails = await emailResponse.json() as any[]
    const primaryEmail = emails?.find((e: any) => e.primary)?.email || githubUser.email
    
    const user: User = {
      id: generateId(),
      email: primaryEmail,
      name: githubUser.name || githubUser.login,
      avatar: githubUser.avatar_url,
      provider: 'github',
      createdAt: new Date().toISOString()
    }
    
    const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
    const token = await createJWT({ user }, secret)
    
    return c.redirect(`/?token=${token}`)
    
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return c.redirect('/?error=oauth_failed')
  }
})

// Apple OAuth (Sign in with Apple)
app.get('/api/auth/apple', (c) => {
  const clientId = c.env.APPLE_CLIENT_ID || 'demo-client-id'
  const redirectUri = `${c.req.url.split('/api')[0]}/api/auth/apple/callback`
  
  const authUrl = new URL('https://appleid.apple.com/auth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'name email')
  authUrl.searchParams.set('response_mode', 'form_post')
  
  return c.json({ authUrl: authUrl.toString() })
})

app.post('/api/auth/apple/callback', async (c) => {
  try {
    const body = await c.req.parseBody()
    const code = body.code as string
    const userStr = body.user as string
    
    if (!code) {
      return c.redirect('/?error=no_code')
    }
    
    // Apple returns user info only on first login
    let appleUser: any = {}
    if (userStr) {
      try {
        appleUser = JSON.parse(userStr)
      } catch {}
    }
    
    const user: User = {
      id: generateId(),
      email: appleUser.email || `apple_${generateId(8)}@privaterelay.appleid.com`,
      name: appleUser.name ? `${appleUser.name.firstName} ${appleUser.name.lastName}` : 'Apple User',
      provider: 'apple',
      createdAt: new Date().toISOString()
    }
    
    const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
    const token = await createJWT({ user }, secret)
    
    return c.redirect(`/?token=${token}`)
    
  } catch (error) {
    console.error('Apple OAuth error:', error)
    return c.redirect('/?error=oauth_failed')
  }
})

// Verify token
app.get('/api/auth/verify', async (c) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ valid: false, error: 'Token gerekli' }, 401)
  }
  
  const token = authHeader.substring(7)
  const secret = c.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET not configured!')
    return c.json({ error: 'Server configuration error', code: 'CONFIG_ERROR' }, 500)
  }
  const payload = await verifyJWT(token, secret)
  
  if (!payload) {
    return c.json({ valid: false, error: 'Geçersiz token' }, 401)
  }
  
  return c.json({ valid: true, user: payload.user })
})

// Logout (client-side token removal, but we can add token blacklist)
app.post('/api/auth/logout', (c) => {
  return c.json({ success: true, message: 'Çıkış yapıldı' })
})

// ============================================
// PUBLIC API ROUTES
// ============================================

app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '5.0.0',
    system: 'NEXAI: OMNI-PRIME ULTIMATE',
    engine: 'Unified Engine + Ollama/Gemini',
    features: ['auth', 'oauth', 'security', 'multi-agent', 'content-curation', 'unified-analysis', 'psychocore-x', 'psychocore-ultra', 'dpae']
  })
})

app.get('/api/config', (c) => {
  return c.json({
    agents: ['Cultural Anthropologist', 'Shadow Hunter', 'Aesthetic Curator', 'PsychoCore-X', 'PsychoCore-ULTRA', 'DPAE'],
    engines: ['Ollama (Local Primary)', 'Google Gemini (Cloud Fallback)', 'OpenRouter (Safety Fallback)'],
    unifiedEngine: {
      version: '5.0.0',
      layers: ['surface', 'middle', 'deep', 'cognitive', 'existential'],
      capabilities: ['cross-correlation', 'synthesis', 'content-curation']
    },
    culturalFrameworks: Object.keys(KNOWLEDGE_GRAPH.culturalDimensions),
    archetypes: Object.keys(KNOWLEDGE_GRAPH.archetypes),
    authProviders: ['email', 'google', 'github', 'apple'],
    endpoints: {
      'unified-analysis': '/api/protected/unified-analysis',
      'progressive-analysis': '/api/protected/unified-analysis/progressive',
      'psychocore-x': '/api/protected/psychocore-x',
      'psychocore-ultra': '/api/protected/psychocore-ultra',
      'dpae': '/api/protected/dpae'
    }
  })
})

// ============================================
// PROTECTED API ROUTES (require authentication)
// ============================================

app.post('/api/protected/analyze', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { message, culturalContext = 'western', bartData = null, conversationHistory = [] } = body

    const culturalFramework = KNOWLEDGE_GRAPH.culturalDimensions[culturalContext as keyof typeof KNOWLEDGE_GRAPH.culturalDimensions] 
      || KNOWLEDGE_GRAPH.culturalDimensions.western

    const systemPrompt = `Sen NEXAI OMNI-PRIME, kültürel bağlam duyarlı bilişsel analiz sistemisin.
Kullanıcı: ${user?.name || 'Misafir'}

KÜLTÜREL ÇERÇEVE: ${culturalContext.toUpperCase()}
- Framework: ${culturalFramework.framework}
- Değerler: ${culturalFramework.values.join(', ')}

${bartData ? `BART Risk Skoru: ${bartData.riskScore}%` : ''}

Kullanıcının diliyle yanıt ver. Markdown formatı kullan.`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10),
      { role: 'user', content: message }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.GEMINI.temperature.analysis)
    
    let responseText = result.content
    if (!responseText) {
      responseText = '⚠️ **Analiz Yapılamadı:** Yerel AI (Ollama) çalışmıyor ve Cloud servisleri (Gemini/OpenRouter) için API anahtarı bulunamadı. Lütfen Ollama\'nın çalıştığından veya `.dev.vars` dosyasında geçerli bir API anahtarı olduğundan emin olun.'
    }
    
    return c.json({
      response: responseText,
      model: result.model || 'none',
      user: user?.name,
      requestId: c.get('requestId')
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return c.json({ error: 'Analysis failed' }, 500)
  }
})

app.post('/api/protected/dpae', async (c) => {
  try {
    const user = c.get('user')
    const { userData, analysisDepth = 'Standart', culturalContext = 'western' } = await c.req.json()
    
    if (!userData) {
      return c.json({ error: 'User data required', code: 'MISSING_DATA' }, 400)
    }
    
    // Parse user responses
    const responses = typeof userData === 'string' ? 
      JSON.parse(userData) : userData
    
    // Calculate psychological metrics
    const big5 = calculateBigFive(responses)
    const darkTriad = calculateDarkTriad(responses)
    const bARTScore = calculateBARTScore(responses['balloonPops'] || 0, responses['successfulPumps'] || 0)
    const { dominant, shadow } = mapJungArchetype(big5)
    const attachmentStyle = classifyAttachmentStyle(responses['anxietyScore'] || 50, responses['avoidanceScore'] || 50)
    const emotionalIntelligence = (big5.A + (1 - big5.N)) / 2 * 100
    const resilienceScore = ((1 - big5.N) + big5.C) / 2 * 100
    
    // Create psychological profile
    const profile: PsychologicalProfile = {
      id: generateId(),
      userId: user?.id,
      big5,
      jungArchetype: {
        dominant,
        shadow,
        integration: [
          `${dominant} özellikleriyle ${shadow} entegre et`,
          `Gölge'ni kabul etme alıştırması yap`,
          `Persona-Gölge dengesini geliştir`
        ]
      },
      bARTScore,
      darkTriad,
      attachmentStyle: attachmentStyle as any,
      culturalContext: culturalContext as any,
      emotionalIntelligence,
      resilienceScore,
      analyzedAt: new Date().toISOString()
    }
    
    const messages = [
      { role: 'system', content: AGENT_PROMPTS.shadowHunter },
      { role: 'user', content: `User Profile:\n${JSON.stringify(profile, null, 2)}\n\nProvide shadow analysis in JSON format.` }
    ]
    
    const result = await callAI(c.env, messages, AI_CONFIG.GEMINI.temperature.analysis)
    const shadowAnalysis = safeParseJSON(result.content || '{}', {
      shadowArchetype: shadow,
      integrationPath: [],
      riskFactors: []
    })
    
    const report = {
      profile,
      shadowAnalysis,
      depthLevel: analysisDepth,
      completedStages: [1, 2, 5, 6, 7],
      nextSession: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    return c.json({
      success: true,
      data: report,
      message: 'DPAE analizi başarıyla tamamlandı',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('DPAE analysis error:', error)
    return c.json({ 
      error: 'Analysis failed', 
      code: 'ANALYSIS_ERROR',
      details: (error as any).message 
    }, 500)
  }
})

app.post('/api/protected/profile', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { conversationHistory = [], bartData = null, culturalContext = 'western' } = body

    const conversationSummary = conversationHistory.slice(-20).map((m: any) => `${m.role}: ${m.content}`).join('\n')

    const messages = [
      { role: 'system', content: `Sen NEXAI'nin Psikolojik Profil Analisti'sin. Kullanıcı: ${user?.name}. JSON formatında profil oluştur.` },
      { role: 'user', content: `Konuşma:\n${conversationSummary || 'Yok'}\n\nBART: ${bartData ? JSON.stringify(bartData) : 'Yok'}\n\nKültür: ${culturalContext}` }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.GEMINI.temperature.analysis)
    const profile = safeParseJSON(result.content || '{}', {
      bigFive: { openness: 50, conscientiousness: 50, extraversion: 50, agreeableness: 50, neuroticism: 50 },
      dominantArchetype: 'Explorer',
      shadowArchetype: 'Wanderer',
      keyInsights: [],
      growthAreas: []
    })

    return c.json({ profile, model: result.model, requestId: c.get('requestId') })

  } catch (error) {
    console.error('Profile error:', error)
    return c.json({ error: 'Profile generation failed' }, 500)
  }
})

// ============================================
// ALL CONTENT ROUTES NOW REQUIRE AUTHENTICATION
// Redirect unauthenticated users to login
// ============================================

// Helper to check auth and return error
const requireAuth = () => {
  return { error: 'Bu özelliği kullanmak için giriş yapmanız gerekiyor.', code: 'AUTH_REQUIRED', redirect: '/login' }
}

app.post('/api/analyze', (c) => {
  return c.json(requireAuth(), 401)
})

app.post('/api/profile', (c) => {
  return c.json(requireAuth(), 401)
})

app.post('/api/curate', (c) => {
  return c.json(requireAuth(), 401)
})

app.post('/api/deep-analyze', (c) => {
  return c.json(requireAuth(), 401)
})

app.post('/api/shadow', (c) => {
  return c.json(requireAuth(), 401)
})

app.post('/api/narrative', (c) => {
  return c.json(requireAuth(), 401)
})

// ============================================
// PROTECTED ROUTES - ALL FUNCTIONALITY HERE
// ============================================

app.post('/api/protected/curate', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { archetype = 'explorer', shadowArchetype = 'wanderer', culturalContext = 'western', mood = 'balanced' } = body

    const baseRecs = KNOWLEDGE_GRAPH.contentRecommendations[archetype as keyof typeof KNOWLEDGE_GRAPH.contentRecommendations] 
      || KNOWLEDGE_GRAPH.contentRecommendations.explorer

    const messages = [
      { role: 'system', content: AGENT_PROMPTS.aestheticCurator },
      { role: 'user', content: `Kullanıcı: ${user?.name}. Arketip: ${archetype}, Gölge: ${shadowArchetype}, Kültür: ${culturalContext}, Ruh hali: ${mood}. JSON formatında öneriler oluştur.` }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.GEMINI.temperature.creative)
    const curation = safeParseJSON(result.content || '{}', {
      recommendations: {
        films: baseRecs.films.slice(0, 5).map(f => ({ title: f, reason: 'Arketip uyumu' })),
        books: baseRecs.books.slice(0, 3).map(b => ({ title: b, reason: 'Kişisel gelişim' })),
        music: baseRecs.music.slice(0, 5).map(m => ({ title: m, mood: mood })),
        activities: baseRecs.activities.slice(0, 4).map(a => ({ activity: a, reason: 'Gölge entegrasyonu' }))
      },
      curatorNotes: `${archetype} arketipine özel öneriler.`
    })

    return c.json({ curation, archetype, model: result.model, user: user?.name, requestId: c.get('requestId') })

  } catch (error) {
    return c.json({ error: 'Curation failed' }, 500)
  }
})

app.post('/api/protected/deep-analyze', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { conversationHistory = [], bartData = null, culturalContext = 'western', statedTraits = {} } = body

    const conversationSummary = conversationHistory.slice(-20).map((m: any) => `${m.role}: ${m.content}`).join('\n')

    // Agent 1: Cultural
    const culturalResult = await callAI(c.env, [
      { role: 'system', content: AGENT_PROMPTS.culturalAnthropologist },
      { role: 'user', content: `Kullanıcı: ${user?.name}\nAnaliz:\n${conversationSummary}` }
    ], AI_CONFIG.GEMINI.temperature.analysis)
    const culturalAnalysis = safeParseJSON(culturalResult.content || '{}', { contextLevel: 'medium', confidence: 50 })

    // Agent 2: Shadow
    const shadowResult = await callAI(c.env, [
      { role: 'system', content: AGENT_PROMPTS.shadowHunter },
      { role: 'user', content: `Kullanıcı: ${user?.name}\nKonuşma:\n${conversationSummary}\nBART: ${bartData ? JSON.stringify(bartData) : 'Yok'}` }
    ], AI_CONFIG.GEMINI.temperature.analysis)
    const shadowAnalysis = safeParseJSON(shadowResult.content || '{}', { dominantArchetype: 'explorer', shadowArchetype: 'wanderer' })

    // Agent 3: Curation
    const archetype = shadowAnalysis.dominantArchetype || 'explorer'
    const curatorResult = await callAI(c.env, [
      { role: 'system', content: AGENT_PROMPTS.aestheticCurator },
      { role: 'user', content: `Kullanıcı: ${user?.name}\nArketip: ${archetype}, Gölge: ${shadowAnalysis.shadowArchetype}, Kültür: ${culturalContext}` }
    ], AI_CONFIG.GEMINI.temperature.creative)
    const contentCuration = safeParseJSON(curatorResult.content || '{}', { recommendations: {} })

    return c.json({
      success: true,
      user: user?.name,
      agents: {
        culturalAnthropologist: { analysis: culturalAnalysis, model: culturalResult.model },
        shadowHunter: { analysis: shadowAnalysis, model: shadowResult.model },
        aestheticCurator: { analysis: contentCuration, model: curatorResult.model }
      },
      contentCuration,
      metadata: { requestId: c.get('requestId'), culturalContext, hasBART: !!bartData }
    })

  } catch (error) {
    return c.json({ success: false, error: 'Deep analysis failed' }, 500)
  }
})

app.post('/api/protected/shadow', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { statedTraits = {}, behavioralData = null, conversationHistory = [] } = body

    const messages = [
      { role: 'system', content: AGENT_PROMPTS.shadowHunter },
      { role: 'user', content: `Kullanıcı: ${user?.name}\nÖzellikler: ${JSON.stringify(statedTraits)}\nBART: ${behavioralData ? JSON.stringify(behavioralData) : 'Yok'}` }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.GEMINI.temperature.analysis)
    const analysis = safeParseJSON(result.content || '{}', {
      dominantArchetype: 'explorer',
      shadowArchetype: 'wanderer',
      confidence: 50
    })

    return c.json({ analysis, model: result.model, user: user?.name, requestId: c.get('requestId') })

  } catch (error) {
    return c.json({ error: 'Shadow analysis failed' }, 500)
  }
})

app.post('/api/protected/narrative', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { profile = {}, culturalContext = 'western' } = body

    const archetype = profile.dominantArchetype || 'explorer'
    const messages = [
      { role: 'system', content: `Sen NEXAI Hikaye Anlatıcısı. ${user?.name} için ${culturalContext} kültüründe ${archetype} arketipine dayalı şiirsel bir hikaye yaz.` },
      { role: 'user', content: `Kullanıcı: ${user?.name}\nProfil: ${JSON.stringify(profile)}` }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.GEMINI.temperature.creative)

    return c.json({ narrative: result.content || 'Hikaye oluşturuluyor...', model: result.model, user: user?.name, requestId: c.get('requestId') })

  } catch (error) {
    return c.json({ narrative: 'Her yolculuk bir adımla başlar.', model: 'fallback' })
  }
})

// PsychoCore-X: Advanced Psychological Analysis
app.post('/api/protected/psychocore-x', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { userInput = '', analysisScope = 'Detaylı', culturalContext = 'western' } = body

    const messages = [
      { role: 'system', content: AGENT_PROMPTS.psychoCoreX },
      { role: 'user', content: `Kültürel Bağlam: ${culturalContext}\nAnaliz Kapsamı: ${analysisScope}\n\nKullanıcı Girdisi: ${userInput}` }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.OLLAMA.temperature.analysis)
    const analysis = safeParseJSON(result.content, {})

    return c.json({ 
      analysis, 
      model: result.model, 
      source: result.source,
      user: user?.name, 
      requestId: c.get('requestId') 
    })

  } catch (error) {
    console.error('PsychoCore-X error:', error)
    return c.json({ 
      error: 'Analiz başarısız', 
      analysis: { insights: 'Analiz şu anda yapılamıyor. Lütfen daha sonra tekrar deneyin.' } 
    }, 500)
  }
})

// ============================================
// UNIFIED ENGINE ENDPOINT - Tam Bütünleşik Analiz
// ============================================
app.post('/api/protected/unified-analysis', async (c) => {
  try {
    // Ensure engine is initialized
    if (!NEXAIUnifiedEngine) {
      await initializeUnifiedEngine()
    }

    const user = c.get('user')
    const body = await c.req.json()
    const { 
      messages = [], 
      bartData = null, 
      culturalContext = 'western',
      analysisMode = 'full' // 'full', 'quick', 'progressive'
    } = body

    // Validate input
    if (!messages || messages.length === 0) {
      return c.json({ 
        error: 'Mesaj verisi gerekli', 
        code: 'MISSING_MESSAGES' 
      }, 400)
    }

    // Create Unified Engine instance with environment config
    // Cloud deployment: önce Gemini, sonra OpenRouter, en son Ollama
    const engine = new NEXAIUnifiedEngine({
      aiProvider: 'gemini',
      geminiApiKey: c.env.GEMINI_API_KEY,
      geminiModel: AI_CONFIG.GEMINI.models.pro,
      openRouterApiKey: c.env.OPENROUTER_API_KEY,
      ollamaModel: AI_CONFIG.OLLAMA.models.pro,
      ollamaUrl: AI_CONFIG.OLLAMA.baseUrl.replace('/api', ''),
      culturalContext: culturalContext,
      language: 'tr',
      debugMode: false
    })

    // Prepare user data for analysis
    const userData = {
      messages: messages.map((m: any) => typeof m === 'string' ? m : m.content),
      bartData: bartData,
      userId: user?.id,
      userName: user?.name
    }

    // Run full analysis pipeline
    const analysisResult = await engine.runFullAnalysis(userData)

    return c.json({
      success: true,
      data: {
        sessionId: analysisResult.sessionId,
        profile: analysisResult.profile,
        recommendations: analysisResult.recommendations,
        layerResults: {
          surface: analysisResult.layerResults?.surface || {},
          middle: analysisResult.layerResults?.middle || {},
          deep: analysisResult.layerResults?.deep || {},
          cognitive: analysisResult.layerResults?.cognitive || {},
          existential: analysisResult.layerResults?.existential || {}
        },
        metadata: analysisResult.metadata
      },
      duration: analysisResult.duration,
      timestamp: analysisResult.timestamp,
      user: user?.name,
      requestId: c.get('requestId'),
      engineVersion: '5.0.0'
    })

  } catch (error) {
    console.error('Unified Analysis error:', error)
    return c.json({ 
      error: 'Bütünleşik analiz başarısız', 
      code: 'UNIFIED_ANALYSIS_ERROR',
      details: (error as any).message,
      fallbackMessage: 'Analiz şu anda yapılamıyor. Lütfen daha sonra tekrar deneyin.'
    }, 500)
  }
})

// Progressive Unified Analysis (streaming/step-by-step)
app.post('/api/protected/unified-analysis/progressive', async (c) => {
  try {
    // Ensure engine is initialized
    if (!NEXAIUnifiedEngine) {
      await initializeUnifiedEngine()
    }

    const user = c.get('user')
    const body = await c.req.json()
    const { 
      messages = [], 
      bartData = null, 
      culturalContext = 'western',
      targetLayer = 'all' // 'surface', 'middle', 'deep', 'cognitive', 'existential', 'all'
    } = body

    // Create Unified Engine - Cloud deployment config
    const engine = new NEXAIUnifiedEngine({
      aiProvider: 'gemini',
      geminiApiKey: c.env.GEMINI_API_KEY,
      geminiModel: AI_CONFIG.GEMINI.models.pro,
      openRouterApiKey: c.env.OPENROUTER_API_KEY,
      ollamaModel: AI_CONFIG.OLLAMA.models.pro,
      ollamaUrl: AI_CONFIG.OLLAMA.baseUrl.replace('/api', ''),
      culturalContext: culturalContext,
      language: 'tr',
      debugMode: true
    })

    const userData = {
      messages: messages.map((m: any) => typeof m === 'string' ? m : m.content),
      bartData: bartData
    }

    // Track progress
    const progressData: any[] = []
    
    engine.on('layer:start', (data: any) => {
      progressData.push({ event: 'layer:start', ...data, timestamp: Date.now() })
    })
    
    engine.on('layer:complete', (data: any) => {
      progressData.push({ event: 'layer:complete', ...data, timestamp: Date.now() })
    })

    const result = await engine.runFullAnalysis(userData)

    return c.json({
      success: true,
      data: result,
      progress: progressData,
      user: user?.name,
      requestId: c.get('requestId')
    })

  } catch (error) {
    console.error('Progressive Analysis error:', error)
    return c.json({ error: 'Progressive analiz başarısız' }, 500)
  }
})

// PsychoCore-ULTRA: Deep Psychological Analysis (requires DPAE profile)
app.post('/api/protected/psychocore-ultra', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { userInput = '', requestedDepth = 'Derin', culturalContext = 'western', dpaeProfile = null } = body

    // Validate input length to prevent DoS
    if (userInput.length > 10000) {
      return c.json({ error: 'Girdi çok uzun. Maksimum 10000 karakter.' }, 400)
    }

    // Build enhanced prompt with DPAE profile if available
    let contextInfo = `Kültürel Bağlam: ${culturalContext}\nDerinlik Seviyesi: ${requestedDepth}`
    
    if (dpaeProfile) {
      contextInfo += `\n\n--- DPAE PROFİL VERİLERİ ---`
      contextInfo += `\nBig Five: O=${dpaeProfile.big5?.O || 0.5}, C=${dpaeProfile.big5?.C || 0.5}, E=${dpaeProfile.big5?.E || 0.5}, A=${dpaeProfile.big5?.A || 0.5}, N=${dpaeProfile.big5?.N || 0.5}`
      contextInfo += `\nBaskın Arketip: ${dpaeProfile.jungArchetype?.dominant || 'Bilinmiyor'}`
      contextInfo += `\nGölge Arketip: ${dpaeProfile.jungArchetype?.shadow || 'Bilinmiyor'}`
      contextInfo += `\nRisk Toleransı (BART): ${dpaeProfile.bARTScore || 0}`
      contextInfo += `\nBağlanma Stili: ${dpaeProfile.attachmentStyle || 'Bilinmiyor'}`
      if (dpaeProfile.darkTriad) {
        contextInfo += `\nKaranlık Üçlü: N=${dpaeProfile.darkTriad.narcissism || 0}, M=${dpaeProfile.darkTriad.machiavellianism || 0}, P=${dpaeProfile.darkTriad.psychopathy || 0}`
      }
    }

    const messages = [
      { role: 'system', content: AGENT_PROMPTS.psychoCoreUltra },
      { role: 'user', content: `${contextInfo}\n\nKullanıcı Girdisi: ${sanitizeInput(userInput)}` }
    ]

    const result = await callAI(c.env, messages, AI_CONFIG.OLLAMA.temperature.analysis, { thinking: true })
    const analysis = safeParseJSON(result.content, {})

    return c.json({ 
      analysis, 
      model: result.model, 
      source: result.source,
      user: user?.name, 
      requestId: c.get('requestId'),
      dpaeEnhanced: !!dpaeProfile,
      warning: 'Bu derin analiz tıbbi teşhis değildir. Profesyonel destek için bir uzmana danışın.' 
    })

  } catch (error) {
    console.error('PsychoCore-ULTRA error:', error)
    return c.json({ 
      error: 'Derin analiz başarısız', 
      analysis: { synthesis: 'Derin analiz şu anda yapılamıyor. Lütfen daha sonra tekrar deneyin.' } 
    }, 500)
  }
})

// ============================================
// MAIN PAGE & LOGIN PAGE
// ============================================

app.get('/login', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXAI Giriş | Dijital Ruh Küratörü</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #0f0f11 0%, #1a1a2e 100%); }
    .gold-gradient { background: linear-gradient(135deg, #D4AF37 0%, #8B7355 100%); }
    .glass { background: rgba(26, 26, 45, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(212, 175, 55, 0.2); }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="w-20 h-20 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20">
        <i class="fas fa-atom text-4xl text-gray-900"></i>
      </div>
      <h1 class="text-3xl font-bold text-white font-['Cinzel']">NEXAI</h1>
      <p class="text-gray-400 mt-2">Dijital Ruh Küratörü</p>
    </div>

    <!-- Login Card -->
    <div class="glass rounded-2xl p-8">
      <!-- Tab Buttons -->
      <div class="flex mb-6 bg-black/30 rounded-xl p-1">
        <button onclick="showTab('login')" id="loginTab" class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all bg-yellow-500/20 text-yellow-400">
          Giriş Yap
        </button>
        <button onclick="showTab('register')" id="registerTab" class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all text-gray-400 hover:text-white">
          Kayıt Ol
        </button>
      </div>

      <!-- Login Form -->
      <form id="loginForm" onsubmit="handleLogin(event)" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email</label>
          <input type="email" id="loginEmail" required
            class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            placeholder="ornek@email.com">
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Şifre</label>
          <input type="password" id="loginPassword" required
            class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            placeholder="••••••••">
        </div>
        <button type="submit" class="w-full gold-gradient text-gray-900 font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
          Giriş Yap
        </button>
      </form>

      <!-- Register Form (Hidden) -->
      <form id="registerForm" onsubmit="handleRegister(event)" class="space-y-4 hidden">
        <div>
          <label class="block text-sm text-gray-400 mb-2">İsim</label>
          <input type="text" id="registerName" required
            class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            placeholder="İsminiz">
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email</label>
          <input type="email" id="registerEmail" required
            class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            placeholder="ornek@email.com">
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Şifre</label>
          <input type="password" id="registerPassword" required
            class="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            placeholder="En az 8 karakter">
          <p class="text-xs text-gray-500 mt-1">En az 8 karakter, büyük/küçük harf ve rakam</p>
        </div>
        <button type="submit" class="w-full gold-gradient text-gray-900 font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
          Kayıt Ol
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-1 border-t border-gray-700"></div>
        <span class="px-4 text-sm text-gray-500">veya</span>
        <div class="flex-1 border-t border-gray-700"></div>
      </div>

      <!-- OAuth Buttons -->
      <div class="space-y-3">
        <button onclick="loginWithGoogle()" class="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-100 transition-all">
          <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span>Google ile Giriş</span>
        </button>
        
        <button onclick="loginWithGitHub()" class="w-full flex items-center justify-center space-x-3 bg-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition-all">
          <i class="fab fa-github text-xl"></i>
          <span>GitHub ile Giriş</span>
        </button>
        
        <button onclick="loginWithApple()" class="w-full flex items-center justify-center space-x-3 bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-900 transition-all border border-gray-700">
          <i class="fab fa-apple text-xl"></i>
          <span>Apple ile Giriş</span>
        </button>
      </div>

      <!-- Error Message -->
      <div id="errorMsg" class="hidden mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"></div>
      
      <!-- Success Message -->
      <div id="successMsg" class="hidden mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm"></div>
    </div>

    <!-- Skip Login -->
    <div class="text-center mt-6">
      <a href="/" class="text-gray-500 hover:text-yellow-400 text-sm transition-colors">
        Giriş yapmadan devam et →
      </a>
    </div>
  </div>

  <script>
    // Check for token in URL (OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    
    if (token) {
      localStorage.setItem('nexai_token', token);
      window.location.href = '/';
    }
    
    if (error) {
      showError('Giriş başarısız: ' + error);
    }

    function showTab(tab) {
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      const loginTab = document.getElementById('loginTab');
      const registerTab = document.getElementById('registerTab');
      
      if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('bg-yellow-500/20', 'text-yellow-400');
        loginTab.classList.remove('text-gray-400');
        registerTab.classList.remove('bg-yellow-500/20', 'text-yellow-400');
        registerTab.classList.add('text-gray-400');
      } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerTab.classList.add('bg-yellow-500/20', 'text-yellow-400');
        registerTab.classList.remove('text-gray-400');
        loginTab.classList.remove('bg-yellow-500/20', 'text-yellow-400');
        loginTab.classList.add('text-gray-400');
      }
    }

    function showError(msg) {
      const el = document.getElementById('errorMsg');
      el.textContent = msg;
      el.classList.remove('hidden');
      setTimeout(() => el.classList.add('hidden'), 5000);
    }

    function showSuccess(msg) {
      const el = document.getElementById('successMsg');
      el.textContent = msg;
      el.classList.remove('hidden');
    }

    async function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('nexai_token', data.token);
          localStorage.setItem('nexai_user', JSON.stringify(data.user));
          showSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
          setTimeout(() => window.location.href = '/', 1000);
        } else {
          showError(data.error || 'Giriş başarısız');
        }
      } catch (err) {
        showError('Bir hata oluştu');
      }
    }

    async function handleRegister(e) {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        
        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('nexai_token', data.token);
          localStorage.setItem('nexai_user', JSON.stringify(data.user));
          showSuccess('Kayıt başarılı! Yönlendiriliyorsunuz...');
          setTimeout(() => window.location.href = '/', 1000);
        } else {
          showError(data.error || 'Kayıt başarısız');
        }
      } catch (err) {
        showError('Bir hata oluştu');
      }
    }

    async function loginWithGoogle() {
      const res = await fetch('/api/auth/google');
      const data = await res.json();
      window.location.href = data.authUrl;
    }

    async function loginWithGitHub() {
      const res = await fetch('/api/auth/github');
      const data = await res.json();
      window.location.href = data.authUrl;
    }

    async function loginWithApple() {
      const res = await fetch('/api/auth/apple');
      const data = await res.json();
      window.location.href = data.authUrl;
    }
  </script>
</body>
</html>`)
})

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXAI: OMNI-PRIME v5.0 | Dijital Ruh Küratörü</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com https://openrouter.ai;">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link href="/static/style.css" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            'nexai-gold': '#D4AF37',
            'nexai-dark': '#0F0F11',
            'nexai-card': '#1A1A1D',
            'nexai-border': '#2D2D30',
            'cyber-purple': '#8B5CF6',
            'cyber-blue': '#3B82F6',
            'cyber-pink': '#EC4899',
            'cyber-green': '#10B981',
          },
          fontFamily: {
            'cinzel': ['Cinzel', 'serif'],
            'playfair': ['Playfair Display', 'serif'],
            'inter': ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
</head>
<body class="dark bg-nexai-dark text-gray-100 min-h-screen font-inter">
  <div id="app"></div>
  <script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
