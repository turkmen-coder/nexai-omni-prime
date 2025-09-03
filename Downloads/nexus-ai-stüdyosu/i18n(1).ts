import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: "NEXUS AI Studio",
        name: "NEXUS AI",
        description: "A modern AI Assistant and Prompt Builder interface. Supports Gemini, OpenAI, and Claude AI models. Features interactive prompt creation, a template system, an advanced chat interface, and secure API key management."
      },
      sidebar: {
        studio: "Studio",
        promptBuilder: "Prompt Builder",
        chat: "Chat",
        settings: "Settings"
      },
      studio: {
        title: "NEXUS AI Studio",
        description: "Your Modern AI Assistant and Prompt Crafting Hub. Powered by Gemini, OpenAI, and Claude.",
        launchBuilder: "Launch Prompt Builder",
        startChat: "Start Chat"
      },
      promptBuilder: {
        title: "Prompt Builder",
        description: "Interactively build the perfect AI prompt.",
        completion: "{{percentage}}% complete",
        labels: {
          role: "Role",
          task: "Task",
          context: "Context",
          tone: "Tone",
          format: "Format"
        },
        placeholders: {
          role: "e.g., An experienced marketer",
          task: "e.g., Create a slogan for a new product",
          context: "e.g., The product is an AI-powered note-taking app",
          tone: "e.g., Professional yet witty",
          format: "e.g., A list of 3 alternatives"
        },
        generatedPrompt: "Generated Prompt",
        basePrompt: "You are {{role}}. Your task is to {{task}}. You must perform this task within the context of {{context}}. The tone you should use is {{tone}}. You must present the result in the following format: {{format}}.",
        placeholdersInPrompt: {
          role: "[ROLE]",
          task: "[TASK]",
          context: "[CONTEXT]",
          tone: "[TONE]",
          format: "[FORMAT]"
        },
        advancedTechniques: "Advanced Techniques",
        templates: "Templates"
      },
      chat: {
        placeholder: "Message with {{provider}}...",
        testMode: "TEST MODE",
        errorPrefix: "Error",
        unknownProvider: "Unknown provider selected.",
        mockResponse: "This is a sample response from test mode. No API key is required. Real responses will come from Gemini, OpenAI, or Claude. This interface is designed to demonstrate real-time streaming capabilities."
      },
      settings: {
        title: "Settings",
        description: "Manage application behavior and API keys.",
        testMode: {
          title: "Test Mode",
          enable: "Enable Test Mode",
          description: "Test the chat interface without API keys."
        },
        apiKeys: {
          title: "API Keys",
          gemini: "Gemini API Key",
          geminiConfigured: "Configured from environment variables",
          geminiStatus: "Configured",
          openai: "OpenAI API Key",
          claude: "Claude API Key",
          statusSet: "Set",
          statusNotSet: "Not Set"
        },
        modelParams: {
          title: "Model Parameters",
          temperature: "Temperature",
          temperatureDesc: "Controls the creativity of the output. Higher values yield more random results.",
          maxTokens: "Maximum Tokens",
          maxTokensDesc: "Limits the maximum length of the generated text."
        },
        language: {
          title: "Language",
          tr: "Türkçe",
          en: "English"
        }
      },
      common: {
        copied: "Copied!",
        userInitial: "U"
      },
      errors: {
        geminiApiKey: "API key for Gemini is not configured. Please set the API_KEY environment variable.",
        geminiUnknown: "An unknown error occurred with the Gemini API.",
        mockApiUnknown: "An unexpected error occurred in the Mock API."
      },
      promptCategories: {
        contentCreation: { name: "Content Creation" },
        textLanguage: { name: "Text & Language" },
        imageGeneration: { name: "Image Generation" },
        video: { name: "Video & Cinematography" },
        business: { name: "Business & Marketing" },
        rolePlaying: { name: "Role Playing (Act as a...)" },
        technical: { name: "Technical" },
        education: { name: "Education" },
        creativeWriting: { name: "Creative Writing" },
        research: { name: "Research & Analysis" },
        health: { name: "Health & Wellness" },
      },
      promptTemplates: {
        seoBlog: {
          name: "SEO Blog Post", description: "Create comprehensive, SEO-friendly blog posts with specified keywords.",
          prompt: { role: "an SEO Expert and Content Writer", task: "to write a 1500+ word blog post on the given topic, including specified keywords.", context: "The target audience has specific demographic traits and interests. A meta description of 150-160 characters is also required.", tone: "Professional, friendly, or technical, with language appropriate for the target audience.", format: "A structure including a catchy H1 title, an introduction, 3-4 main H2 sections, H3 subheadings, and a conclusion/CTA." },
          contextExamples: [ "Target audience is tech-savvy teens", "Analysis of competitor articles", "Content strategy for a product launch" ],
          toneExamples: [ "Informative and authoritative", "Friendly and conversational", "Persuasive and sales-oriented" ],
          formatExamples: [ "Listicle format", "How-to guide", "Comparison article" ]
        },
        socialMediaPost: {
          name: "Social Media Post", description: "Generate engaging posts for platforms like Twitter, Instagram, or LinkedIn.",
          prompt: { role: "a Social Media Manager", task: "to create an engaging social media post for {platform}.", context: "The post should be about {topic} and include relevant hashtags. The goal is to maximize engagement.", tone: "Catchy and informal.", format: "A short text post under 280 characters with 3-4 relevant hashtags." },
          contextExamples: [ "For a new product launch", "A company culture highlight", "A holiday-themed post" ],
          toneExamples: [ "Witty and humorous", "Inspirational and motivational", "Urgent and action-oriented" ],
          formatExamples: [ "A single text post", "A thread of 3 posts", "A post with a question to the audience" ]
        },
        summarization: { name: "Summarization", description: "Condense long texts into a brief summary.", prompt: { role: "an Analyst", task: "to summarize the following text in 3 sentences.", tone: "Concise and clear.", format: "A three-sentence paragraph." } },
        translation: { name: "Translation", description: "Translate text from one language to another.", prompt: { role: "a professional Translator", task: "to translate the following text from {source_language} to {target_language}.", tone: "Accurate and natural.", format: "The translated text only." } },
        toneChange: { name: "Tone Change", description: "Rewrite text in a different tone (e.g., formal, casual).", prompt: { role: "a Communication Expert", task: "to rewrite the following text in a {target_tone} tone.", tone: "As specified.", format: "The rewritten text." } },
        textExpansion: { name: "Text Expansion", description: "Expand a short sentence into a detailed paragraph.", prompt: { role: "a Content Writer", task: "to expand the following sentence into a 3-paragraph text.", tone: "Detailed and engaging.", format: "Three paragraphs of text." } },
        grammarFix: { name: "Grammar Correction", description: "Correct grammatical errors in a text.", prompt: { role: "an Editor", task: "to correct the grammatical errors in the following text.", tone: "Correct and formal.", format: "The corrected text." } },
        photoGeneration: { name: "Photo Generation", description: "Create a photorealistic image from a description.", prompt: { role: "a Photographer", task: "to create a photorealistic image of a couple sitting on a beach at sunset.", context: "The atmosphere should be romantic and warm.", tone: "Cinematic and detailed.", format: "A high-resolution image." } },
        logoDesign: { name: "Logo Design", description: "Generate minimalist logo concepts for a brand.", prompt: { role: "a Logo Designer", task: "to design a minimalist logo for {company_name}.", context: "The main color should be {color}. The logo should represent {company_values}.", tone: "Modern and clean.", format: "A logo concept on a white background." } },
        characterIllustration: { name: "Character Illustration", description: "Draw a unique character in a specific style.", prompt: { role: "an Illustrator", task: "to draw an anime-style female character with blue hair and glasses.", context: "The character should look studious but friendly.", tone: "Vibrant and expressive.", format: "A full-body character illustration." } },
        productImage: { name: "Product Image", description: "Create a clean, commercial-style product image.", prompt: { role: "a Product Photographer", task: "to create an image of a black smartphone on a white background.", context: "The phone should look sleek and modern, with professional lighting.", tone: "Clean and commercial.", format: "A high-quality product shot." } },
        landscapeCreation: { name: "Landscape Creation", description: "Generate a beautiful landscape image.", prompt: { role: "a Landscape Artist", task: "to create a landscape of snowy mountains with a lake in front.", context: "The colors should reflect autumn. The style should be hyperrealistic.", tone: "Epic and serene.", format: "A wide-angle landscape image." } },
        fantasyIllustration: { name: "Fantasy Illustration", description: "Create a detailed fantasy illustration.", prompt: { role: "a digital artist", task: "to create a fantasy illustration of a {subject}.", context: "It should feature {key_elements}. The weather is {weather_condition}.", tone: "Epic and detailed, in the style of digital art.", format: "A high-resolution digital painting." } },
        photorealisticProduct: { name: "Photorealistic Product", description: "Generate a realistic product shot.", prompt: { role: "a commercial photographer", task: "to create a photorealistic image of {product_name}.", context: "The product is made of {materials}. It should have {lighting_style} lighting and be presented with post-processing effects.", tone: "Highly detailed, 4k, artstation.", format: "A commercial product shot with an aspect ratio of 2:3." } },
        architecturalVisualization: { name: "Architectural Visualization", description: "Create a render of a building.", prompt: { role: "an architect and VFX artist", task: "to imagine a {building_type} on a {location}.", context: "The rendering engine style should be {rendering_engine}, with {lighting_style} lighting.", tone: "Fantasy, medieval, grand.", format: "A high-resolution architectural render." } },
        fpvDronePursuit: { name: "FPV Drone Pursuit", description: "A skier blazes down a slope, pursued by an FPV drone.", prompt: { role: "a Drone Pilot", task: "A skier blazes down a tree-lined slope, FPV drone locked in pursuit. Snow sprays in rhythmic pulses, tree shadows flicker over the terrain, and motion blur frames the rider's speed. High-altitude adrenaline, crystal-clear and untamed.", context: "Cinematic, FPV drone footage", tone: "Adrenaline, high-speed", format: "16:9 video" } },
        slowMotionCinematic: { name: "Slow Motion Cinematic Shot", description: "A colossal whale emerges from a golden sea in slow motion.", prompt: { role: "a Cinematographer", task: "A colossal whale emerges in slow motion from a golden sea, its silhouette blazing against the setting sun. Droplets scatter like stars, birds flee in flight, and mirror-like waves ripple beneath. Majestic and timeless, a tribute to nature’s grandeur.", context: "Slow motion, low-angle tracking shot", tone: "Majestic, grand", format: "16:9 video" } },
        wingsuitFlight: { name: "Wingsuit Flight", description: "An FPV drone darts behind a wingsuit flyer near cliffs.", prompt: { role: "an Action Videographer", task: "An FPV drone darts behind a wingsuit flyer weaving through razor-sharp cliff faces. The flyer’s wings flutter with speed, sunlight flares across jagged peaks, and the sky glows with electric blue. Aerial immersion, breathtaking velocity, cinematic intensity.", context: "FPV Drone, fast-paced action", tone: "Breathtaking, intense", format: "16:9 video" } },
        lowAngleMotorbike: { name: "Low-Angle Motorbike Shot", description: "Ground-hugging camera trails a motorbike soaring overhead.", prompt: { role: "a Director of Photography", task: "Ground-hugging camera trails a motorbike soaring overhead. The front wheel slices through frame, dirt bursts into the air, and a vivid sky stretches behind. Grit flies, textures crackle—pure kinetic realism with cinematic rhythm.", context: "Low-angle tracking shot", tone: "Kinetic, gritty, realistic", format: "16:9 video" } },
        slowZoomSorceress: { name: "Slow Zoom on Sorceress", description: "Camera glides in slowly as a sorceress hovers over glowing runes.", prompt: { role: "a VFX Artist", task: "The camera glides in slowly as a sorceress hovers over ancient glowing runes. Her cloak flutters in the arcane wind, radiant magic swirls around her, and the night fog parts under her power. Enigmatic, powerful, visually entrancing.", context: "Slow zoom-in, cinematic", tone: "Enigmatic, powerful", format: "16:9 video" } },
        "360SpinSoldier": { name: "360° Spin on Soldier", description: "Camera spins closely around a futuristic soldier on an alien plain.", prompt: { role: "a Sci-Fi Movie Director", task: "A futuristic soldier strides across a hostile alien plain as the camera spins closely around him. His armor reflects scattered starlight, while dust coils at his feet. Immersive, intense, and charged with narrative energy.", context: "360-degree rotating shot, close-up tracking", tone: "Immersive, intense", format: "16:9 video" } },
        swotAnalysis: {
          name: "SWOT Analysis", description: "Conduct a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).",
          prompt: { role: "a Business Strategist", task: "to conduct a detailed SWOT analysis for {company/product}.", context: "The analysis should consider internal factors (Strengths, Weaknesses) and external factors (Opportunities, Threats).", tone: "Analytical and objective.", format: "A four-quadrant layout, with at least 3 bullet points for each section (S, W, O, T)." },
          contextExamples: [ "A startup in the fintech industry", "An established e-commerce brand", "A personal career assessment" ],
          toneExamples: [ "Formal and corporate", "Direct and to-the-point", "Comprehensive and detailed" ],
          formatExamples: [ "Bulleted list for each category", "A 2x2 table", "A detailed paragraph for each section" ]
        },
        emailWriting: { name: "Email Writing", description: "Compose professional emails for various business scenarios.", prompt: { role: "a Professional Communicator", task: "to write a professional email to {recipient} about {subject}.", context: "The email should convey {key_message} and ask for {call_to_action}.", tone: "Formal and clear.", format: "A standard email format with a subject line, greeting, body, and closing." } },
        productDescription: { name: "Product Description", description: "Write compelling marketing descriptions for products.", prompt: { role: "a Marketing Copywriter", task: "to write a 200-word marketing description for {product}.", context: "The target audience is {target_audience}. Highlight key features: {features}.", tone: "Persuasive and engaging.", format: "A compelling product description." } },
        businessPlan: { name: "Business Plan Outline", description: "Create a structured outline for a business plan.", prompt: { role: "a Business Analyst", task: "to create a business plan outline for a {business_idea}.", context: "Include sections for Executive Summary, Market Analysis, and Financial Projections.", tone: "Strategic and professional.", format: "A structured business plan outline." } },
        actAsInterviewer: { name: "Act as an Interviewer", description: "Simulate a job interview for a specific role.", prompt: { role: "an Interviewer", task: "to interview me for the {position_name} position. Ask me questions one by one and wait for my answers. Do not write explanations.", context: "I am the candidate. My first sentence will be 'Hi'.", tone: "Professional and inquisitive.", format: "A back-and-forth conversational interview." } },
        actAsStoryteller: { name: "Act as a Storyteller", description: "Generate an engaging story based on a topic.", prompt: { role: "a Storyteller", task: "to tell an interesting story about {topic}.", context: "The target audience is {audience_type}. The story can be a fairy tale, educational, or historical.", tone: "Engaging, imaginative, and captivating.", format: "A well-structured story." } },
        actAsComedian: { name: "Act as a Comedian", description: "Create a stand-up routine about a topic.", prompt: { role: "a Stand-up Comedian", task: "to create a humorous take on {topic}.", context: "The routine should be based on current events and include personal anecdotes to be relatable.", tone: "Witty, creative, and observational.", format: "A stand-up comedy routine." } },
        actAsLifeCoach: { name: "Act as a Life Coach", description: "Get strategies to achieve your goals.", prompt: { role: "a Life Coach", task: "to help me with {my_goal} by developing healthier habits.", context: "My current situation is {situation} and I am struggling with {challenge}.", tone: "Supportive, strategic, and motivational.", format: "Actionable strategies and advice." } },
        actAsTechReviewer: { name: "Act as a Tech Reviewer", description: "Get a detailed review of a tech product.", prompt: { role: "a Tech Reviewer", task: "to provide an in-depth review of {product_name}.", context: "The review must include pros, cons, features, and comparisons to other technologies on the market.", tone: "Objective, detailed, and clear.", format: "A comprehensive product review." } },
        codeExplanation: { name: "Code Explanation", description: "Explain a code snippet line by line.", prompt: { role: "a Senior Developer", task: "to explain the following {language} code snippet line by line.", tone: "Clear and educational.", format: "A line-by-line explanation of the code." } },
        codeDebugging: { name: "Code Debugging", description: "Find and fix bugs in a piece of code.", prompt: { role: "a Debugging Expert", task: "to find the bug in this {language} code and correct it.", tone: "Analytical and precise.", format: "The corrected code with an explanation of the bug." } },
        algorithmCreation: { name: "Algorithm Creation", description: "Write an efficient algorithm for a specific problem.", prompt: { role: "a Computer Scientist", task: "to write an algorithm for {problem_description}.", context: "The algorithm should be efficient and well-documented.", tone: "Formal and academic.", format: "Pseudocode for the algorithm." } },
        conceptMap: { name: "Concept Map", description: "Create a concept map to visualize connections between ideas.", prompt: { role: "a Visual Learning Specialist", task: "to create a concept map for {topic}.", context: "The map should show the main ideas and their connections.", tone: "Structured and visual.", format: "A hierarchical list representing the concept map." } },
        learningObjectives: { name: "Learning Objectives", description: "Define clear, measurable learning objectives for a course.", prompt: { role: "an Instructional Designer", task: "to define 5 learning objectives for a course on {course_subject}.", context: "The objectives should be specific, measurable, achievable, relevant, and time-bound (SMART).", tone: "Formal and precise.", format: "A numbered list of learning objectives." } },
        resourceList: { name: "Resource List", description: "Compile a list of the best resources for learning a topic.", prompt: { role: "a Librarian", task: "to list the top 10 resources to learn about {topic}.", context: "Include books, websites, and videos.", tone: "Informative and helpful.", format: "A categorized list of resources with brief descriptions." } },
        dialogueWriting: { name: "Dialogue Writing", description: "Write a realistic dialogue between two characters.", prompt: { role: "a Screenwriter", task: "to write a dialogue between {character_1} and {character_2} about {topic}.", context: "The dialogue should reveal their personalities and advance the plot.", tone: "Realistic and sharp.", format: "A script-formatted dialogue." } },
        poetry: { name: "Poetry Writing", description: "Write a poem in a specific style about a chosen theme.", prompt: { role: "a Poet", task: "to write a poem in the style of {poem_type} about {theme}.", context: "The poem should evoke strong emotions and imagery.", tone: "Lyrical and metaphorical.", format: "A complete poem." } },
        screenplay: { name: "Screenplay Outline", description: "Create a one-page outline for a film or show idea.", prompt: { role: "a Screenwriter", task: "to create a one-page screenplay outline for a {film_idea}.", context: "The outline should include scene headings, character actions, and key dialogue.", tone: "Visual and concise.", format: "A standard screenplay format." } },
        literatureScan: { name: "Literature Scan", description: "Summarize key research papers on a specific topic.", prompt: { role: "an Academic Researcher", task: "to summarize key research papers on {topic} from the last 5 years.", context: "Focus on major findings and methodologies.", tone: "Academic and objective.", format: "A summarized list with citations." } },
        dataAnalysisPlan: { name: "Data Analysis Plan", description: "Create a step-by-step plan for analyzing a dataset.", prompt: { role: "a Data Scientist", task: "to create a data analysis plan for a dataset about {dataset_description}.", context: "The plan should include steps for data cleaning, exploratory analysis, and modeling.", tone: "Systematic and technical.", format: "A step-by-step analysis plan." } },
        hypothesisGeneration: { name: "Hypothesis Generation", description: "Generate testable hypotheses for a research question.", prompt: { role: "a Scientist", task: "to generate 3 possible hypotheses for the research question: {research_question}.", context: "The hypotheses should be testable.", tone: "Inquisitive and scientific.", format: "A numbered list of hypotheses." } },
        trendAnalysis: { name: "Trend Analysis", description: "Analyze recent trends in a specific industry.", prompt: { role: "a Market Analyst", task: "to analyze the trends in the {industry} over the last 5 years.", context: "Focus on technological, economic, and social trends.", tone: "Analytical and insightful.", format: "A report summarizing key trends." } },
        comparativeAnalysis: { name: "Comparative Analysis", description: "Compare two products or services in detail.", prompt: { role: "a Reviewer", task: "to compare {product_A} and {product_B}.", context: "Compare them on features, price, and user reviews.", tone: "Objective and detailed.", format: "A comparison table." } },
        stressManagement: { name: "Stress Management Tips", description: "Get practical tips for managing stress.", prompt: { role: "a Wellness Coach", task: "to provide 10 practical tips for managing stress at work.", context: "The tips should be easy to implement during a busy workday.", tone: "Calm and supportive.", format: "A numbered list of tips." } },
        sleepHygiene: { name: "Sleep Hygiene Checklist", description: "Create a checklist for habits to improve sleep quality.", prompt: { role: "a Sleep Specialist", task: "to create a sleep hygiene checklist for better sleep.", context: "The checklist should include daytime habits and pre-sleep rituals.", tone: "Informative and gentle.", format: "A checklist with actionable items." } },
        healthRisk: { name: "Health Symptom Explainer", description: "Explain potential causes for symptoms (informational).", prompt: { role: "a Health Educator", task: "to explain the potential causes for {symptoms} and when to see a doctor.", context: "This is for informational purposes only and not a medical diagnosis.", tone: "Cautious and clear.", format: "An explanation of possible causes and clear guidance on seeking professional help." } },
        bugReport: {
          name: "Bug Report", description: "Generate a clear and concise bug report for developers.",
          prompt: { role: "a QA Tester", task: "to write a detailed bug report.", context: "The bug was found in {application/feature} on {platform}. It occurs when the user performs {steps_to_reproduce}.", tone: "Technical and precise.", format: "A structured report including: Steps to Reproduce, Expected Result, Actual Result, and additional notes." },
          contextExamples: [ "A crash on an iOS application", "A UI glitch on a web page", "An API returning an incorrect status code" ],
          toneExamples: [ "Formal and structured", "Clear and easy to follow", "Objective and factual" ],
          formatExamples: [ "Standard bug report format", "Markdown file with code snippets", "A user story format" ]
        },
        codeGenerator: {
          name: "Code Generator", description: "Create functions, classes, or modules based on specified requirements.",
          prompt: { role: "a Senior {language} Developer", task: "to implement a {entity} according to specified requirements, including at least 3 test cases.", context: "Input parameters, output type, and edge cases to be handled should be specified.", tone: "Explanatory and clean coding style.", format: "A code block compliant with specified coding standards (naming, documentation) and performance constraints." },
          contextExamples: [ "To be integrated into an existing project", "For a performance-critical application", "A library for beginners" ],
          toneExamples: [ "With detailed comments", "Minimalist and clean", "Compliant with PEP-8 standards" ],
          formatExamples: [ "As a single function", "Within a class structure", "Modular and extensible" ]
        },
        apiDocs: {
          name: "API Documentation Writer", description: "Prepare clear, comprehensive, and developer-friendly documentation for API endpoints.",
          prompt: { role: "a Technical Writer", task: "to prepare comprehensive documentation for the specified API endpoint.", context: "The endpoint method, URL, authentication method, and rate-limiting information should be provided.", tone: "Technical, clear, and understandable.", format: "A structure including an endpoint description, request parameters, success/error response examples, and code samples (curl, Python, JS)." },
          contextExamples: [ "For a new REST API", "An internal GraphQL API", "Updating documentation for a legacy API" ],
          toneExamples: [ "Formal and professional", "Developer-friendly and approachable", "Extremely detailed and technical" ],
          formatExamples: [ "OpenAPI (Swagger) format", "In Markdown format", "A three-column structure (parameter, type, description)" ]
        },
        lessonPlanner: {
          name: "Lesson Planner", description: "Create structured lesson plans for a specific topic and audience.",
          prompt: { role: "an Education Specialist", task: "to create a lesson plan for the specified topic.", context: "Details such as the course level (Beginner/Intermediate/Advanced), duration, and number of participants should be given.", tone: "Educational and engaging.", format: "A lesson plan including learning objectives, modular content structure, activities, evaluation criteria, and additional resources." },
          contextExamples: [ "For first-year university students", "In-house training for software developers", "A coding workshop for children" ],
          toneExamples: [ "Academic and structured", "Interactive and gamified", "Encouraging and motivational" ],
          formatExamples: [ "Weekly course schedule", "A one-day intensive workshop plan", "Module structure for an online course" ]
        },
        expertConsultant: {
          name: "Expert Consultant", description: "Get detailed, source-based, and exemplified answers in a specific field.",
          prompt: { role: "an Expert Consultant in {field}", task: "to provide a detailed answer to the question asked. The answer should be supported by source references and examples, and offer alternative approaches.", context: "The focus should be solely on the question asked.", tone: "Informative and authoritative.", format: "A structured response starting with a brief 1-2 sentence answer, followed by a detailed explanation, practical examples, and relevant sources." },
          contextExamples: [ "Simplifying a complex scientific topic", "Cause-and-effect of a historical event", "A financial investment strategy" ],
          toneExamples: [ "Objective and evidence-based", "Simplified and understandable", "In-depth and analytical" ],
          formatExamples: [ "Question-Answer format", "A short briefing note", "A list of pros and cons" ]
        },
        quizGenerator: { name: "Quiz Generator", description: "Generate multiple-choice questions for a specific topic.", prompt: { role: "an Educator", task: "to create 5 multiple-choice questions about {topic}.", context: "The questions should be suitable for {audience_level} level.", tone: "Clear and concise.", format: "A list of questions, each with 4 options and the correct answer indicated." } },
        characterCreator: { name: "Character Creator", description: "Develop a detailed character for a story or screenplay.", prompt: { role: "a Novelist", task: "to create a main character for a story set in a dystopian future.", context: "The character should have a unique backstory, a primary motivation, and a significant flaw.", tone: "Descriptive and evocative.", format: "A detailed character profile including appearance, personality, and background." } },
        shortStory: { name: "Short Story", description: "Write a short story based on a genre and word count.", prompt: { role: "a Storyteller", task: "to write a 500-word short story in the {genre} genre.", context: "The story should have a clear beginning, middle, and end, with a central conflict.", tone: "Engaging and suspenseful.", format: "A complete short story." } },
        dietPlan: { name: "Diet Plan", description: "Create a personalized 7-day diet plan for a specific goal.", prompt: { role: "a Nutritionist", task: "to create a 7-day diet plan for the goal of {goal}.", context: "The plan should include breakfast, lunch, dinner, and snacks, with calorie estimates. Consider dietary restrictions like {restrictions}.", tone: "Supportive and informative.", format: "A day-by-day meal plan in a table format." } },
        workoutRoutine: { name: "Workout Routine", description: "Design a weekly exercise routine based on fitness goals.", prompt: { role: "a Fitness Coach", task: "to create a weekly exercise routine for the fitness goal of {goal}.", context: "The routine should balance cardio and strength training and be suitable for a {fitness_level} fitness level.", tone: "Motivating and clear.", format: "A weekly schedule with exercises, sets, and reps listed for each day." } }
      },
      promptTechniques: {
        cot: {
          name: "Chain-of-Thought (CoT)", description: "Allows the model to solve complex problems step-by-step, making the logic flow transparent.",
          template: "\n\n### Method: Let's Think Step-by-Step ###\n1. Define the main problem.\n2. Break the problem into solvable sub-steps.\n3. Solve each step in a logical sequence.\n4. Combine the sub-solutions to reach the final result.\n5. Verify the result."
        },
        tot: {
          name: "Tree of Thoughts (ToT)", description: "Explores multiple potential solution paths, evaluates them, and selects the most promising one.",
          template: "\n\n### Method: Tree of Thoughts ###\nProblem: {Main problem}\n\nThought Tree:\n- **Approach 1:** [First potential solution path]\n  - Evaluation: [Pros/cons of this path]\n- **Approach 2:** [Second potential solution path]\n  - Evaluation: [Pros/cons of this path]\n\n**Selection:** Choose the most promising approach and elaborate."
        },
        rag: {
          name: "Retrieval-Augmented Generation (RAG)", description: "Allows the model to pull in data from an external knowledge source to provide contextual and up-to-date answers.",
          template: "\n\n### Method: Retrieval-Augmented Generation ###\n1. Use the provided context from the external knowledge base.\n2. Formulate the answer based *only* on the retrieved information.\n3. Cite the source of the information."
        },
        selfConsistency: {
            name: "Self-Consistency", description: "Asks the model the same question multiple times and selects the most frequent answer as the most likely correct one.",
            template: "\n\n### Method: Self-Consistency Check ###\n1. Generate multiple diverse responses to the core task.\n2. Analyze the responses to find the most common, recurring conclusion or result.\n3. The most frequent answer is the most reliable one."
        },
        generatedKnowledge: {
            name: "Generated Knowledge", description: "Prompts the model to first generate relevant knowledge or facts before answering the final question.",
            template: "\n\n### Method: Generated Knowledge ###\n1. First, generate key facts and background information about the core subject.\n2. Using the generated knowledge, answer the main question."
        },
        selfCheck: {
            name: "Self-Check", description: "Prompts the model to critique its own answer to identify and correct potential errors or inconsistencies.",
            template: "\n\n### Method: Self-Check ###\n1. Generate an initial answer.\n2. Review the generated answer for any missing, incorrect, or contradictory points.\n3. Provide a final, revised answer based on the self-critique."
        },
        fillInTheBlank: {
          name: "Fill-in-the-Blank", description: "Turns a query into a structured, fill-in-the-blank prompt for clarity.",
          template: "\n\n### Method: Fill-in-the-Blank ###\nCreate a template for my request. I will fill in the blanks. My request: [Your request here]."
        },
        perspective: {
          name: "Perspective Prompting", description: "Asks the model to answer from multiple, specified perspectives for a comprehensive view.",
          template: "\n\n### Method: Multiple Perspectives ###\nWrite about the topic from the following perspectives:\n- **Perspective 1 ([Name/Role]):** [Argument/View]\n- **Perspective 2 ([Name/Role]):** [Argument/View]"
        },
        rgc: {
          name: "RGC Prompting", description: "Uses a Role-Goal-Context framework to structure the prompt for clarity and precision.",
          template: "\n\n### RGC Framework ###\n- **Role:** [Assign a specific expert role to the AI]\n- **Goal:** [Define the desired outcome or result]\n- **Context:** [Provide background, constraints, and other relevant information]"
        }
      }
    }
  },
  tr: {
    translation: {
      app: {
        title: "NEXUS AI Stüdyosu",
        name: "NEXUS AI",
        description: "Modern bir AI Asistanı ve Prompt Builder arayüzü. Gemini, OpenAI ve Claude AI modellerini destekler. Etkileşimli prompt oluşturma, şablon sistemi, gelişmiş sohbet arayüzü ve güvenli API anahtar yönetimi sunar."
      },
      sidebar: {
        studio: "Stüdyo",
        promptBuilder: "İstem Oluşturucu",
        chat: "Sohbet",
        settings: "Ayarlar"
      },
      studio: {
        title: "NEXUS AI Stüdyosu",
        description: "Modern AI Asistanınız ve Prompt Oluşturma Merkeziniz. Gemini, OpenAI ve Claude tarafından desteklenmektedir.",
        launchBuilder: "İstem Oluşturucuyu Başlat",
        startChat: "Sohbete Başla"
      },
      promptBuilder: {
        title: "İstem Oluşturucu",
        description: "Mükemmel AI istemini etkileşimli olarak oluşturun.",
        completion: "%{{percentage}} tamamlandı",
        labels: {
          role: "Rol",
          task: "Görev",
          context: "Bağlam",
          tone: "Ton",
          format: "Format"
        },
        placeholders: {
          role: "Örn: Deneyimli bir pazarlamacı",
          task: "Örn: Yeni bir ürün için slogan oluşturmak",
          context: "Örn: Ürün bir AI destekli not alma uygulaması",
          tone: "Örn: Profesyonel ama esprili",
          format: "Örn: 3 alternatiften oluşan bir liste"
        },
        generatedPrompt: "Oluşturulan İstem",
        basePrompt: "Sen {{role}}. Görevin {{task}}. Bu görevi {{context}} bağlamında yerine getirmelisin. Kullanacağın ton {{tone}} olmalı. Sonucu {{format}} formatında sunmalısın.",
        placeholdersInPrompt: {
          role: "[ROL]",
          task: "[GÖREV]",
          context: "[BAĞLAM]",
          tone: "[TON]",
          format: "[FORMAT]"
        },
        advancedTechniques: "Gelişmiş Teknikler",
        templates: "Şablonlar"
      },
      chat: {
        placeholder: "{{provider}} ile mesajlaş...",
        testMode: "TEST MODU",
        errorPrefix: "Hata",
        unknownProvider: "Bilinmeyen sağlayıcı seçildi.",
        mockResponse: "Bu, test modundan gelen örnek bir yanıttır. API anahtarı gerekmez. Gerçek yanıtlar Gemini, OpenAI veya Claude'dan gelecektir. Bu arayüz, gerçek zamanlı akış yeteneklerini göstermek için tasarlanmıştır."
      },
      settings: {
        title: "Ayarlar",
        description: "Uygulama davranışını ve API anahtarlarını yönetin.",
        testMode: {
          title: "Test Modu",
          enable: "Test Modunu Etkinleştir",
          description: "API anahtarları olmadan sohbet arayüzünü test edin."
        },
        apiKeys: {
          title: "API Anahtarları",
          gemini: "Gemini API Anahtarı",
          geminiConfigured: "Ortam değişkenlerinden yapılandırıldı",
          geminiStatus: "Ayarlandı",
          openai: "OpenAI API Anahtarı",
          claude: "Claude API Anahtarı",
          statusSet: "Ayarlandı",
          statusNotSet: "Ayarlanmadı"
        },
        modelParams: {
          title: "Model Parametreleri",
          temperature: "Sıcaklık",
          temperatureDesc: "Çıktının ne kadar yaratıcı olacağını kontrol eder. Daha yüksek değerler daha rastgele sonuçlar verir.",
          maxTokens: "Maksimum Token",
          maxTokensDesc: "Oluşturulacak maksimum metin uzunluğunu sınırlar."
        },
        language: {
          title: "Dil",
          tr: "Türkçe",
          en: "English"
        }
      },
      common: {
        copied: "Kopyalandı!",
        userInitial: "S"
      },
       errors: {
        geminiApiKey: "Gemini için API anahtarı yapılandırılmamış. Lütfen API_KEY ortam değişkenini ayarlayın.",
        geminiUnknown: "Gemini API'sinde bilinmeyen bir hata oluştu.",
        mockApiUnknown: "Mock API'de beklenmedik bir hata oluştu."
      },
      promptCategories: {
        contentCreation: { name: "İçerik Üretimi" },
        textLanguage: { name: "Metin & Dil" },
        imageGeneration: { name: "Görsel Üretimi" },
        video: { name: "Video & Sinematografi" },
        business: { name: "İş ve Pazarlama" },
        rolePlaying: { name: "... gibi davran" },
        technical: { name: "Teknik" },
        education: { name: "Eğitim" },
        creativeWriting: { name: "Yaratıcı Yazarlık" },
        research: { name: "Araştırma & Analiz" },
        health: { name: "Sağlık & Wellness" },
      },
      promptTemplates: {
        seoBlog: {
          name: "SEO Blog Yazısı", description: "Belirlenen anahtar kelimelerle SEO uyumlu, kapsamlı blog yazıları oluşturun.",
          prompt: { role: "bir SEO Uzmanı ve İçerik Yazarı", task: "Verilen konu hakkında 1500+ kelimelik bir blog yazısı yazmak. Yazı, belirtilen anahtar kelimeleri içermelidir.", context: "Hedef kitle, belirli demografik özelliklere ve ilgi alanlarına sahip kişilerdir. 150-160 karakterlik bir meta açıklaması da gereklidir.", tone: "Profesyonel, samimi veya teknik ve hedef kitleye uygun bir dil.", format: "Çekici bir H1 başlığı, giriş, 3-4 ana H2 bölümü, H3 alt başlıkları ve bir sonuç/CTA içeren yapı." },
          contextExamples: [ "Hedef kitle teknolojiye meraklı gençler", "Rakip makalelerin analizi", "Ürün lansmanı için içerik stratejisi" ],
          toneExamples: [ "Bilgilendirici ve otoriter", "Samimi ve sohbet havasında", "İkna edici ve satış odaklı" ],
          formatExamples: [ "Listeleme (Listicle) formatı", "Nasıl yapılır (How-to) rehberi", "Karşılaştırma makalesi" ]
        },
        socialMediaPost: {
          name: "Sosyal Medya Gönderisi", description: "Twitter, Instagram veya LinkedIn gibi platformlar için ilgi çekici gönderiler oluşturun.",
          prompt: { role: "bir Sosyal Medya Yöneticisi", task: "{platform} için ilgi çekici bir sosyal medya gönderisi oluşturmak.", context: "Gönderi {konu} hakkında olmalı ve ilgili etiketleri içermelidir. Amaç, etkileşimi en üst düzeye çıkarmaktır.", tone: "Çekici ve samimi.", format: "280 karakter altında, 3-4 ilgili etiket içeren kısa bir metin gönderisi." },
          contextExamples: [ "Yeni bir ürün lansmanı için", "Şirket kültürünü anlatan bir gönderi", "Bayram temalı bir paylaşım" ],
          toneExamples: [ "Esprili ve eğlenceli", "İlham verici ve motivasyonel", "Aciliyet bildiren ve eyleme geçirici" ],
          formatExamples: [ "Tek bir metin gönderisi", "3 gönderilik bir başlık (thread)", "Hedef kitleye soru soran bir gönderi" ]
        },
        summarization: { name: "Özet Çıkarma", description: "Uzun metinleri kısa bir özete dönüştürün.", prompt: { role: "bir Analist", task: "aşağıdaki metni 3 cümlede özetlemek.", tone: "Öz ve net.", format: "Üç cümlelik bir paragraf." } },
        translation: { name: "Dil Çevirisi", description: "Metinleri bir dilden diğerine çevirin.", prompt: { role: "profesyonel bir Çevirmen", task: "aşağıdaki metni {source_language} dilinden {target_language} diline çevirmek.", tone: "Doğru ve doğal.", format: "Sadece çevrilmiş metin." } },
        toneChange: { name: "Ton Değiştirme", description: "Bir metni farklı bir tonda (örn. resmi, samimi) yeniden yazın.", prompt: { role: "bir İletişim Uzmanı", task: "aşağıdaki metni {target_tone} bir tonda yeniden yazmak.", tone: "Belirtildiği gibi.", format: "Yeniden yazılmış metin." } },
        textExpansion: { name: "Metin Genişletme", description: "Kısa bir cümleyi detaylı bir paragrafa genişletin.", prompt: { role: "bir İçerik Yazarı", task: "aşağıdaki cümleyi 3 paragraflık bir metne genişletmek.", tone: "Detaylı ve ilgi çekici.", format: "Üç paragraflık metin." } },
        grammarFix: { name: "Gramer Düzeltme", description: "Bir metindeki dilbilgisi hatalarını düzeltin.", prompt: { role: "bir Editör", task: "aşağıdaki metindeki dilbilgisi hatalarını düzeltmek.", tone: "Doğru ve resmi.", format: "Düzeltilmiş metin." } },
        photoGeneration: { name: "Fotoğraf Oluşturma", description: "Bir açıklamadan fotogerçekçi bir görüntü oluşturun.", prompt: { role: "bir Fotoğrafçı", task: "gün batımında sahilde oturan bir çiftin fotogerçekçi bir görüntüsünü oluşturmak.", context: "Atmosfer romantik ve sıcak olmalı.", tone: "Sinematik ve detaylı.", format: "Yüksek çözünürlüklü bir görüntü." } },
        logoDesign: { name: "Logo Tasarımı", description: "Bir marka için minimalist logo konseptleri oluşturun.", prompt: { role: "bir Logo Tasarımcısı", task: "{company_name} için minimalist bir logo tasarlamak.", context: "Ana renk {color} olmalı. Logo {company_values} değerlerini temsil etmelidir.", tone: "Modern ve temiz.", format: "Beyaz arka planda bir logo konsepti." } },
        characterIllustration: { name: "Karakter İllüstrasyonu", description: "Belirli bir tarzda benzersiz bir karakter çizin.", prompt: { role: "bir İllüstratör", task: "mavi saçlı ve gözlüklü anime tarzı bir kadın karakter çizmek.", context: "Karakter çalışkan ama arkadaş canlısı görünmeli.", tone: "Canlı ve etkileyici.", format: "Tam vücut bir karakter illüstrasyonu." } },
        productImage: { name: "Ürün Görseli", description: "Temiz, ticari tarzda bir ürün görseli oluşturun.", prompt: { role: "bir Ürün Fotoğrafçısı", task: "beyaz arka planda siyah bir akıllı telefonun görüntüsünü oluşturmak.", context: "Telefon, profesyonel aydınlatma ile şık ve modern görünmeli.", tone: "Temiz ve ticari.", format: "Yüksek kaliteli bir ürün fotoğrafı." } },
        landscapeCreation: { name: "Manzara Oluşturma", description: "Güzel bir manzara resmi oluşturun.", prompt: { role: "bir Manzara Sanatçısı", task: "önünde bir göl olan karlı dağların bir manzarasını oluşturmak.", context: "Renkler sonbaharı yansıtmalı. Stil hipergerçekçi olmalı.", tone: "Epik ve sakin.", format: "Geniş açılı bir manzara görüntüsü." } },
        fantasyIllustration: { name: "Fantezi İllüstrasyonu", description: "Detaylı bir fantezi illüstrasyonu oluşturun.", prompt: { role: "bir dijital sanatçı", task: "bir {subject} fantezi illüstrasyonu oluşturmak.", context: "{key_elements} içermelidir. Hava {weather_condition}.", tone: "Epik ve detaylı, dijital sanat tarzında.", format: "Yüksek çözünürlüklü bir dijital resim." } },
        photorealisticProduct: { name: "Fotogerçekçi Ürün", description: "Gerçekçi bir ürün fotoğrafı oluşturun.", prompt: { role: "bir ticari fotoğrafçı", task: "{product_name} fotogerçekçi bir görüntüsünü oluşturmak.", context: "Ürün {materials} yapılmıştır. {lighting_style} aydınlatmaya sahip olmalı ve son işleme efektleriyle sunulmalıdır.", tone: "Son derece detaylı, 4k, artstation.", format: "2:3 en boy oranına sahip ticari bir ürün fotoğrafı." } },
        architecturalVisualization: { name: "Mimari Görselleştirme", description: "Bir binanın render'ını oluşturun.", prompt: { role: "bir mimar ve VFX sanatçısı", task: "bir {location} üzerinde bir {building_type} hayal etmek.", context: "{rendering_engine} render motoru stili, {lighting_style} aydınlatma ile olmalıdır.", tone: "Fantastik, ortaçağ, görkemli.", format: "Yüksek çözünürlüklü bir mimari render." } },
        fpvDronePursuit: { name: "FPV Drone Takibi", description: "Bir kayakçı, bir FPV drone tarafından takip edilirken yamaçtan aşağı kayıyor.", prompt: { role: "bir Drone Pilotu", task: "Bir kayakçı ağaçlı bir yamaçtan aşağı hızla kayarken, FPV drone peşine takılmış. Kar ritmik vuruşlarla savruluyor, ağaç gölgeleri arazide titreşiyor ve hareket bulanıklığı sürücünün hızını çerçeveliyor. Yüksek irtifa adrenalini, kristal berraklığında ve vahşi.", context: "Sinematik, FPV drone çekimi", tone: "Adrenalin, yüksek hız", format: "16:9 video" } },
        slowMotionCinematic: { name: "Ağır Çekim Sinematik Sahne", description: "Devasa bir balina, altın rengi bir denizden ağır çekimde beliriyor.", prompt: { role: "bir Görüntü Yönetmeni", task: "Devasa bir balina altın rengi bir denizden ağır çekimde ortaya çıkıyor, silueti batan güneşe karşı parlıyor. Damlacıklar yıldızlar gibi dağılıyor, kuşlar uçarak kaçıyor ve ayna gibi dalgalar altında dalgalanıyor. Görkemli ve zamansız, doğanın ihtişamına bir övgü.", context: "Ağır çekim, alçak açılı takip çekimi", tone: "Görkemli, büyük", format: "16:9 video" } },
        wingsuitFlight: { name: "Wingsuit Uçuşu", description: "Bir FPV drone, kayalıkların arasından süzülen bir wingsuit pilotunu takip ediyor.", prompt: { role: "bir Aksiyon Kameramanı", task: "Bir FPV drone, jilet gibi keskin kaya yüzeyleri arasından süzülen bir wingsuit pilotunun arkasından hızla ilerliyor. Pilotun kanatları hızla çırpınıyor, güneş ışığı pürüzlü zirvelerde parlıyor ve gökyüzü elektrik mavisiyle parlıyor. Havadan dalış, nefes kesen hız, sinematik yoğunluk.", context: "FPV Drone, hızlı tempolu aksiyon", tone: "Nefes kesici, yoğun", format: "16:9 video" } },
        lowAngleMotorbike: { name: "Alçak Açı Motosiklet Sahnesi", description: "Yere yakın kamera, havada süzülen bir motosikleti takip ediyor.", prompt: { role: "bir Görüntü Yönetmeni", task: "Yere yakın kamera havada süzülen bir motosikleti takip ediyor. Ön tekerlek kadrajı delip geçiyor, toprak havaya fışkırıyor ve arkada canlı bir gökyüzü uzanıyor. Toz uçuşuyor, dokular çıtırdıyor—sinematik ritimle saf kinetik gerçekçilik.", context: "Alçak açılı takip çekimi", tone: "Kinetik, cesur, gerçekçi", format: "16:9 video" } },
        slowZoomSorceress: { name: "Büyücüye Yavaş Yakınlaşma", description: "Kamera, parlayan rünlerin üzerinde duran bir büyücüye yavaşça yaklaşıyor.", prompt: { role: "bir VFX Sanatçısı", task: "Kamera, eski parlayan rünlerin üzerinde duran bir büyücüye yavaşça süzülerek yaklaşıyor. Pelerini gizemli rüzgarda dalgalanıyor, parlak sihir etrafında dönüyor ve gece sisi gücünün altında dağılıyor. Gizemli, güçlü, görsel olarak büyüleyici.", context: "Yavaş yakınlaşma, sinematik", tone: "Gizemli, güçlü", format: "16:9 video" } },
        "360SpinSoldier": { name: "Asker Etrafında 360° Dönüş", description: "Kamera, uzaylı bir düzlükte fütüristik bir askerin etrafında hızla dönüyor.", prompt: { role: "bir Bilim Kurgu Film Yönetmeni", task: "Fütüristik bir asker, düşman bir uzaylı ovasında ilerlerken kamera etrafında hızla dönüyor. Zırhı dağınık yıldız ışığını yansıtıyor, ayaklarının dibinde toz sarmalları oluşuyor. Sürükleyici, yoğun ve anlatı enerjisiyle dolu.", context: "360 derece dönen çekim, yakın takip", tone: "Sürükleyici, yoğun", format: "16:9 video" } },
        swotAnalysis: {
          name: "SWOT Analizi", description: "Bir GZFT analizi (Güçlü Yönler, Zayıf Yönler, Fırsatlar, Tehditler) yapın.",
          prompt: { role: "bir İş Stratejisti", task: "{şirket/ürün} için detaylı bir SWOT analizi yapmak.", context: "Analiz, iç faktörleri (Güçlü Yönler, Zayıf Yönler) ve dış faktörleri (Fırsatlar, Tehditler) göz önünde bulundurmalıdır.", tone: "Analitik ve objektif.", format: "Her bölüm (G, Z, F, T) için en az 3 madde içeren dört çeyrekli bir düzen." },
          contextExamples: [ "Fintek sektöründeki bir startup", "Köklü bir e-ticaret markası", "Kişisel bir kariyer değerlendirmesi" ],
          toneExamples: [ "Resmi ve kurumsal", "Doğrudan ve net", "Kapsamlı ve detaylı" ],
          formatExamples: [ "Her kategori için madde işaretli liste", "2x2 bir tablo", "Her bölüm için detaylı bir paragraf" ]
        },
        emailWriting: { name: "E-posta Yazma", description: "Çeşitli iş senaryoları için profesyonel e-postalar oluşturun.", prompt: { role: "bir Profesyonel İletişimci", task: "{recipient} adlı kişiye {subject} hakkında profesyonel bir e-posta yazmak.", context: "E-posta {key_message} mesajını iletmeli ve {call_to_action} için bir çağrıda bulunmalıdır.", tone: "Resmi ve net.", format: "Konu satırı, selamlama, gövde ve kapanış içeren standart bir e-posta formatı." } },
        productDescription: { name: "Ürün Açıklaması", description: "Ürünler için ikna edici pazarlama açıklamaları yazın.", prompt: { role: "bir Pazarlama Metin Yazarı", task: "{product} için 200 kelimelik bir pazarlama açıklaması yazmak.", context: "Hedef kitle {target_audience}. Ana özellikleri vurgulayın: {features}.", tone: "İkna edici ve ilgi çekici.", format: "Etkileyici bir ürün açıklaması." } },
        businessPlan: { name: "İş Planı Taslağı", description: "Bir iş planı için yapılandırılmış bir taslak oluşturun.", prompt: { role: "bir İş Analisti", task: "bir {business_idea} için bir iş planı taslağı oluşturmak.", context: "Yönetici Özeti, Pazar Analizi ve Finansal Projeksiyonlar için bölümler içermelidir.", tone: "Stratejik ve profesyonel.", format: "Yapılandırılmış bir iş planı taslağı." } },
        actAsInterviewer: { name: "Mülakatçı gibi davran", description: "Belirli bir rol için iş mülakatı simülasyonu yapın.", prompt: { role: "bir Mülakatçı", task: "benimle {position_name} pozisyonu için mülakat yapmak. Bana soruları tek tek sor ve cevaplarımı bekle. Açıklama yazma.", context: "Ben adayım. İlk cümlem 'Merhaba' olacak.", tone: "Profesyonel ve sorgulayıcı.", format: "Karşılıklı konuşmaya dayalı bir mülakat." } },
        actAsStoryteller: { name: "Hikaye Anlatıcısı gibi davran", description: "Bir konuya dayalı ilgi çekici bir hikaye oluşturun.", prompt: { role: "bir Hikaye Anlatıcısı", task: "{topic} hakkında ilginç bir hikaye anlatmak.", context: "Hedef kitle {audience_type}. Hikaye bir peri masalı, eğitici veya tarihi olabilir.", tone: "İlgi çekici, yaratıcı ve büyüleyici.", format: "İyi yapılandırılmış bir hikaye." } },
        actAsComedian: { name: "Komedyen gibi davran", description: "Bir konu hakkında stand-up rutini oluşturun.", prompt: { role: "bir Stand-up Komedyeni", task: "{topic} hakkında esprili bir yaklaşım oluşturmak.", context: "Rutin güncel olaylara dayanmalı ve daha bağ kurulabilir olması için kişisel anılar içermelidir.", tone: "Esprili, yaratıcı ve gözlemci.", format: "Bir stand-up komedi rutini." } },
        actAsLifeCoach: { name: "Yaşam Koçu gibi davran", description: "Hedeflerinize ulaşmak için stratejiler alın.", prompt: { role: "bir Yaşam Koçu", task: "daha sağlıklı alışkanlıklar geliştirerek {my_goal} konusunda bana yardımcı olmak.", context: "Mevcut durumum {situation} ve {challenge} ile mücadele ediyorum.", tone: "Destekleyici, stratejik ve motivasyonel.", format: "Uygulanabilir stratejiler ve tavsiyeler." } },
        actAsTechReviewer: { name: "Teknoloji Editörü gibi davran", description: "Bir teknoloji ürünü hakkında detaylı bir inceleme alın.", prompt: { role: "bir Teknoloji Editörü", task: "{product_name} hakkında derinlemesine bir inceleme sunmak.", context: "İnceleme artıları, eksileri, özellikleri ve piyasadaki diğer teknolojilerle karşılaştırmaları içermelidir.", tone: "Objektif, detaylı ve net.", format: "Kapsamlı bir ürün incelemesi." } },
        codeExplanation: { name: "Kod Açıklama", description: "Bir kod parçasını satır satır açıklayın.", prompt: { role: "kıdemli bir Geliştirici", task: "aşağıdaki {language} kod parçasını satır satır açıklamak.", tone: "Açık ve eğitici.", format: "Kodun satır satır açıklaması." } },
        codeDebugging: { name: "Kod Hata Ayıklama", description: "Bir kod parçasındaki hataları bulup düzeltin.", prompt: { role: "bir Hata Ayıklama Uzmanı", task: "bu {language} kodundaki hatayı bulup düzeltmek.", tone: "Analitik ve kesin.", format: "Hatanın açıklamasıyla birlikte düzeltilmiş kod." } },
        algorithmCreation: { name: "Algoritma Oluşturma", description: "Belirli bir problem için verimli bir algoritma yazın.", prompt: { role: "bir Bilgisayar Bilimcisi", task: "{problem_description} için bir algoritma yazmak.", context: "Algoritma verimli ve iyi belgelenmiş olmalıdır.", tone: "Resmi ve akademik.", format: "Algoritma için sözde kod (pseudocode)." } },
        conceptMap: { name: "Kavram Haritası", description: "Fikirler arasındaki bağlantıları görselleştirmek için bir kavram haritası oluşturun.", prompt: { role: "bir Görsel Öğrenme Uzmanı", task: "{topic} için bir kavram haritası oluşturmak.", context: "Harita ana fikirleri ve bağlantılarını göstermelidir.", tone: "Yapılandırılmış ve görsel.", format: "Kavram haritasını temsil eden hiyerarşik bir liste." } },
        learningObjectives: { name: "Öğrenme Hedefleri", description: "Bir kurs için açık, ölçülebilir öğrenme hedefleri belirleyin.", prompt: { role: "bir Eğitim Tasarımcısı", task: "{course_subject} üzerine bir kurs için 5 öğrenme hedefi belirlemek.", context: "Hedefler belirli, ölçülebilir, ulaşılabilir, ilgili ve zaman sınırlı (SMART) olmalıdır.", tone: "Resmi ve kesin.", format: "Numaralandırılmış bir öğrenme hedefleri listesi." } },
        resourceList: { name: "Kaynak Listesi", description: "Bir konuyu öğrenmek için en iyi kaynakların bir listesini derleyin.", prompt: { role: "bir Kütüphaneci", task: "{topic} hakkında öğrenmek için en iyi 10 kaynağı listelemek.", context: "Kitaplar, web siteleri ve videoları dahil et.", tone: "Bilgilendirici ve yardımcı.", format: "Kısa açıklamalarla kategorize edilmiş bir kaynak listesi." } },
        dialogueWriting: { name: "Diyalog Yazma", description: "İki karakter arasında gerçekçi bir diyalog yazın.", prompt: { role: "bir Senarist", task: "{character_1} ve {character_2} arasında {topic} hakkında bir diyalog yazmak.", context: "Diyalog, kişiliklerini ortaya çıkarmalı ve olay örgüsünü ilerletmelidir.", tone: "Gerçekçi ve keskin.", format: "Senaryo formatında bir diyalog." } },
        poetry: { name: "Şiir Yazma", description: "Seçilen bir tema hakkında belirli bir tarzda bir şiir yazın.", prompt: { role: "bir Şair", task: "{theme} hakkında {poem_type} tarzında bir şiir yazmak.", context: "Şiir güçlü duygular ve imgeler uyandırmalıdır.", tone: "Lirik ve metaforik.", format: "Tam bir şiir." } },
        screenplay: { name: "Senaryo Taslağı", description: "Bir film veya dizi fikri için tek sayfalık bir taslak oluşturun.", prompt: { role: "bir Senarist", task: "bir {film_idea} için tek sayfalık bir senaryo taslağı oluşturmak.", context: "Taslak, sahne başlıklarını, karakter eylemlerini ve anahtar diyalogları içermelidir.", tone: "Görsel ve öz.", format: "Standart bir senaryo formatı." } },
        literatureScan: { name: "Literatür Taraması", description: "Belirli bir konu hakkındaki önemli araştırma makalelerini özetleyin.", prompt: { role: "bir Akademik Araştırmacı", task: "{topic} üzerine son 5 yıldaki önemli araştırma makalelerini özetlemek.", context: "Ana bulgulara ve metodolojilere odaklan.", tone: "Akademik ve objektif.", format: "Alıntılarla birlikte özetlenmiş bir liste." } },
        dataAnalysisPlan: { name: "Veri Analizi Planı", description: "Bir veri setini analiz etmek için adım adım bir plan oluşturun.", prompt: { role: "bir Veri Bilimcisi", task: "{dataset_description} hakkındaki bir veri seti için bir veri analizi planı oluşturmak.", context: "Plan, veri temizleme, keşifsel analiz ve modelleme adımlarını içermelidir.", tone: "Sistematik ve teknik.", format: "Adım adım bir analiz planı." } },
        hypothesisGeneration: { name: "Hipotez Oluşturma", description: "Bir araştırma sorusu için test edilebilir hipotezler oluşturun.", prompt: { role: "bir Bilim İnsanı", task: "{research_question} araştırma sorusu için 3 olası hipotez oluşturmak.", context: "Hipotezler test edilebilir olmalıdır.", tone: "Sorgulayıcı ve bilimsel.", format: "Numaralandırılmış bir hipotez listesi." } },
        trendAnalysis: { name: "Trend Analizi", description: "Belirli bir sektördeki son trendleri analiz edin.", prompt: { role: "bir Pazar Analisti", task: "{industry} sektöründeki son 5 yılın trendlerini analiz etmek.", context: "Teknolojik, ekonomik ve sosyal trendlere odaklan.", tone: "Analitik ve anlayışlı.", format: "Ana trendleri özetleyen bir rapor." } },
        comparativeAnalysis: { name: "Karşılaştırmalı Analiz", description: "İki ürünü veya hizmeti detaylı olarak karşılaştırın.", prompt: { role: "bir İncelemeci", task: "{product_A} ve {product_B} ürünlerini karşılaştırmak.", context: "Özellikler, fiyat ve kullanıcı yorumları üzerinden karşılaştır.", tone: "Objektif ve detaylı.", format: "Bir karşılaştırma tablosu." } },
        stressManagement: { name: "Stres Yönetimi İpuçları", description: "Stresi yönetmek için pratik ipuçları alın.", prompt: { role: "bir Sağlıklı Yaşam Koçu", task: "iş yerinde stresi yönetmek için 10 pratik ipucu vermek.", context: "İpuçları yoğun bir iş gününde kolayca uygulanabilir olmalıdır.", tone: "Sakinleştirici ve destekleyici.", format: "Numaralandırılmış bir ipucu listesi." } },
        sleepHygiene: { name: "Uyku Hijyeni Kontrol Listesi", description: "Uyku kalitesini artırmak için alışkanlıklar listesi oluşturun.", prompt: { role: "bir Uyku Uzmanı", task: "daha iyi uyku için bir uyku hijyeni kontrol listesi oluşturmak.", context: "Kontrol listesi gündüz alışkanlıklarını ve uyku öncesi ritüelleri içermelidir.", tone: "Bilgilendirici ve nazik.", format: "Uygulanabilir maddeler içeren bir kontrol listesi." } },
        healthRisk: { name: "Sağlık Semptom Açıklayıcı", description: "Semptomların olası nedenlerini açıklayın (bilgilendirme amaçlı).", prompt: { role: "bir Sağlık Eğitimcisi", task: "{symptoms} için olası nedenleri ve ne zaman bir doktora başvurulması gerektiğini açıklamak.", context: "Bu sadece bilgilendirme amaçlıdır ve tıbbi bir teşhis değildir.", tone: "Tedbirli ve açık.", format: "Olası nedenlerin bir açıklaması ve profesyonel yardım arama konusunda net bir rehber." } },
        quizGenerator: { name: "Sınav Üretici", description: "Belirli bir konu için çoktan seçmeli sorular oluşturun.", prompt: { role: "bir Eğitimci", task: "{topic} hakkında 5 adet çoktan seçmeli soru oluşturmak.", context: "Sorular {audience_level} seviyesine uygun olmalıdır.", tone: "Açık ve öz.", format: "Her biri 4 seçenekli ve doğru cevabın belirtildiği bir soru listesi." } },
        characterCreator: { name: "Karakter Yaratıcı", description: "Bir hikaye veya senaryo için detaylı bir karakter geliştirin.", prompt: { role: "bir Romancı", task: "distopik bir gelecekte geçen bir hikaye için bir ana karakter oluşturmak.", context: "Karakterin benzersiz bir geçmişi, birincil bir motivasyonu ve önemli bir kusuru olmalıdır.", tone: "Tanımlayıcı ve etkileyici.", format: "Görünüm, kişilik ve geçmişi içeren detaylı bir karakter profili." } },
        shortStory: { name: "Kısa Hikaye", description: "Bir türe ve kelime sayısına göre kısa bir hikaye yazın.", prompt: { role: "bir Hikaye Anlatıcısı", task: "{genre} türünde 500 kelimelik bir kısa hikaye yazmak.", context: "Hikayenin net bir başlangıcı, ortası ve sonu ile merkezi bir çatışması olmalıdır.", tone: "İlgi çekici ve sürükleyici.", format: "Tam bir kısa hikaye." } },
        dietPlan: { name: "Diyet Planı", description: "Belirli bir hedef için kişiselleştirilmiş 7 günlük bir diyet planı oluşturun.", prompt: { role: "bir Beslenme Uzmanı", task: "{goal} hedefi için 7 günlük bir diyet planı oluşturmak.", context: "Plan, kalori tahminleri ile kahvaltı, öğle yemeği, akşam yemeği ve ara öğünleri içermelidir. {restrictions} gibi diyet kısıtlamalarını dikkate alın.", tone: "Destekleyici ve bilgilendirici.", format: "Tablo formatında günlük bir yemek planı." } },
        workoutRoutine: { name: "Egzersiz Rutini", description: "Fitness hedeflerine dayalı haftalık bir egzersiz rutini tasarlayın.", prompt: { role: "bir Fitness Koçu", task: "{goal} fitness hedefi için haftalık bir egzersiz rutini oluşturmak.", context: "Rutin, kardiyo ve kuvvet antrenmanını dengelemeli ve {fitness_level} fitness seviyesine uygun olmalıdır.", tone: "Motive edici ve açık.", format: "Her gün için egzersizler, setler ve tekrarların listelendiği haftalık bir program." } }
      },
      promptTechniques: {
        cot: {
          name: "Zincirleme Düşünce (CoT)", description: "Modelin karmaşık problemleri adım adım çözmesini sağlar, mantık akışını şeffaf hale getirir.",
          template: "\n\n### Yöntem: Adım Adım Düşünelim ###\n1. Ana problemi tanımla.\n2. Problemi çözülebilir alt adımlara ayır.\n3. Her adımı mantıksal bir sıra ile çöz.\n4. Alt çözümleri birleştirerek nihai sonuca ulaş.\n5. Sonucu doğrula."
        },
        tot: {
          name: "Düşünce Ağacı (ToT)", description: "Birden çok potansiyel çözüm yolunu keşfeder, değerlendirir ve en umut verici olanı seçer.",
          template: "\n\n### Yöntem: Düşünce Ağacı ###\nProblem: {Ana problem}\n\nDüşünce Ağacı:\n- **Yaklaşım 1:** [İlk potansiyel çözüm yolu]\n  - Değerlendirme: [Bu yolun artıları/eksileri]\n- **Yaklaşım 2:** [İkinci potansiyel çözüm yolu]\n  - Değerlendirme: [Bu yolun artıları/eksileri]\n\n**Seçim:** En umut verici yaklaşımı seç ve detaylandır."
        },
        rag: {
          name: "Geri Alma-Artırılmış Üretim (RAG)", description: "Modelin dış bir bilgi kaynağından veri çekerek bağlamlı ve güncel yanıt üretmesini sağlar.",
          template: "\n\n### Yöntem: Geri Alma-Artırılmış Üretim ###\n1. Harici bilgi tabanından sağlanan bağlamı kullan.\n2. Yanıtı *sadece* alınan bilgilere dayanarak oluştur.\n3. Bilginin kaynağını belirt."
        },
        selfConsistency: {
            name: "Öz-Tutarlılık (Self-Consistency)", description: "Modele aynı soruyu birden fazla kez sorar ve en sık tekrar eden cevabı en olası doğru olarak seçer.",
            template: "\n\n### Yöntem: Öz-Tutarlılık Kontrolü ###\n1. Ana göreve birden çok çeşitli yanıt üret.\n2. En yaygın, tekrar eden sonucu veya kararı bulmak için yanıtları analiz et.\n3. En sık tekrar eden cevap en güvenilir olanıdır."
        },
        generatedKnowledge: {
            name: "Üretilmiş Bilgi (Generated Knowledge)", description: "Nihai soruyu cevaplamadan önce modelden ilgili bilgi veya gerçekleri üretmesini ister.",
            template: "\n\n### Yöntem: Üretilmiş Bilgi ###\n1. İlk olarak, ana konu hakkında temel gerçekleri ve arka plan bilgilerini üret.\n2. Üretilen bilgiyi kullanarak ana soruyu cevapla."
        },
        selfCheck: {
            name: "Öz-Kontrol (Self-Check)", description: "Modelin potansiyel hataları veya tutarsızlıkları belirlemek ve düzeltmek için kendi cevabını eleştirmesini ister.",
            template: "\n\n### Yöntem: Öz-Kontrol ###\n1. Başlangıçta bir cevap üret.\n2. Üretilen cevabı eksik, hatalı veya çelişkili noktalar açısından gözden geçir.\n3. Öz eleştiriye dayanarak nihai, düzeltilmiş bir cevap sun."
        },
        fillInTheBlank: {
          name: "Boşluk Doldurma", description: "Bir sorguyu netlik için yapılandırılmış, boşluk doldurmalı bir isteme dönüştürür.",
          template: "\n\n### Yöntem: Boşluk Doldurma ###\nİsteğim için bir şablon oluştur. Boşlukları ben dolduracağım. İsteğim: [İsteğinizi buraya yazın]."
        },
        perspective: {
          name: "Perspektif İstemciliği", description: "Kapsamlı bir görünüm için modelden birden çok, belirtilen perspektiften yanıt vermesini ister.",
          template: "\n\n### Yöntem: Çoklu Perspektifler ###\nKonu hakkında aşağıdaki perspektiflerden yaz:\n- **Perspektif 1 ([İsim/Rol]):** [Argüman/Görüş]\n- **Perspektif 2 ([İsim/Rol]):** [Argüman/Görüş]"
        },
        rgc: {
          name: "RGC İstemciliği", description: "İstemi netlik ve kesinlik için yapılandırmak üzere bir Rol-Hedef-Bağlam çerçevesi kullanır.",
          template: "\n\n### RGC Çerçevesi ###\n- **Rol:** [AI'ya belirli bir uzman rolü ata]\n- **Hedef:** [İstenen sonucu veya çıktıyı tanımla]\n- **Bağlam:** [Arka plan, kısıtlamalar ve diğer ilgili bilgileri sağla]"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;