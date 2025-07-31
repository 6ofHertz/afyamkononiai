export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  format: 'article' | 'flashcard' | 'video' | 'interactive' | 'audio';
  content: LearningContent;
  culturalNotes?: string;
  ageGroup?: string;
  imageUrl?: string;
}

export interface LearningContent {
  overview: string;
  keyPoints: string[];
  detailedSections?: LearningSection[];
  quickTips?: string[];
  myths?: MythFact[];
  quiz?: QuizQuestion[];
  resources?: string[];
}

export interface LearningSection {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface MythFact {
  myth: string;
  fact: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const SEX_EDUCATION_MODULES: LearningModule[] = [
  {
    id: "sex-ed-001",
    title: "Understanding Your Body",
    description: "A gentle introduction to anatomy and reproductive health for teens and young adults",
    category: "sex-education",
    estimatedTime: "10 minutes",
    difficulty: "beginner",
    format: "interactive",
    ageGroup: "13-18",
    content: {
      overview: "Learning about your body is the first step to taking care of your health. This module covers basic anatomy in a respectful, educational way.",
      keyPoints: [
        "Every body is unique and normal",
        "Understanding changes during puberty",
        "Knowing when to seek healthcare",
        "Respecting your body and others"
      ],
      detailedSections: [
        {
          title: "Physical Changes During Puberty",
          content: "Puberty is a natural process that happens to everyone. For girls, this includes breast development, menstruation, and growth spurts. For boys, voice changes, growth spurts, and other developments occur. These changes are completely normal and happen at different times for different people."
        },
        {
          title: "Menstrual Health",
          content: "Menstruation is a natural part of the reproductive cycle. Understanding what's normal, managing discomfort, and knowing when to seek help are important life skills. Every person's cycle is different."
        }
      ],
      myths: [
        {
          myth: "You can't exercise during menstruation",
          fact: "Exercise is actually beneficial during menstruation and can help reduce cramps and improve mood"
        },
        {
          myth: "Puberty happens at the same age for everyone",
          fact: "Puberty typically begins between ages 8-14 and varies greatly from person to person"
        }
      ]
    },
    culturalNotes: "This content respects diverse cultural backgrounds while providing essential health information."
  },
  {
    id: "sex-ed-002",
    title: "Healthy Relationships",
    description: "Understanding consent, communication, and respect in all relationships",
    category: "sex-education",
    estimatedTime: "15 minutes",
    difficulty: "intermediate",
    format: "article",
    ageGroup: "16+",
    content: {
      overview: "Healthy relationships are built on trust, respect, and communication. This applies to friendships, family relationships, and romantic relationships.",
      keyPoints: [
        "Consent is ongoing and can be withdrawn",
        "Communication is key to healthy relationships",
        "Respecting boundaries - yours and others'",
        "Recognizing unhealthy relationship patterns"
      ],
      detailedSections: [
        {
          title: "Understanding Consent",
          content: "Consent means agreeing to something freely, without pressure. It must be clear, ongoing, and can be changed at any time. This applies to physical contact, sharing personal information, and making decisions together."
        },
        {
          title: "Healthy Communication",
          content: "Good relationships involve open, honest communication. This means expressing your feelings clearly, listening to others, and working together to solve problems."
        }
      ],
      quickTips: [
        "Check in with your partner regularly about comfort levels",
        "Practice saying 'no' - it's a complete sentence",
        "Trust your instincts if something feels wrong",
        "Healthy relationships make you feel good about yourself"
      ]
    }
  },
  {
    id: "sex-ed-003",
    title: "Sexual Health Basics",
    description: "Essential information about sexual health, protection, and wellness",
    category: "sex-education",
    estimatedTime: "20 minutes",
    difficulty: "intermediate",
    format: "article",
    ageGroup: "18+",
    content: {
      overview: "Sexual health is an important part of overall wellness. This includes understanding protection, regular health check-ups, and making informed decisions.",
      keyPoints: [
        "Regular health screenings are important",
        "Understanding contraception options",
        "Recognizing signs of infections",
        "Open communication with healthcare providers"
      ],
      detailedSections: [
        {
          title: "Contraception Education",
          content: "There are many safe and effective contraception methods available. Each has different benefits and considerations. Speaking with a healthcare provider can help you choose what's right for your situation."
        },
        {
          title: "Sexual Health Screenings",
          content: "Regular check-ups with healthcare providers include sexual health screenings. These are routine, confidential, and help catch any issues early. Most sexually active people should have regular screenings."
        }
      ],
      myths: [
        {
          myth: "You can't get pregnant the first time",
          fact: "Pregnancy can occur any time during unprotected sex, including the first time"
        },
        {
          myth: "STI testing is only needed if you have symptoms",
          fact: "Many STIs have no symptoms, which is why regular testing is recommended for sexually active individuals"
        }
      ]
    }
  }
];

export const PREGNANCY_STAGES_MODULES: LearningModule[] = [
  {
    id: "preg-001",
    title: "First Trimester Journey",
    description: "What to expect in weeks 1-12 of pregnancy",
    category: "pregnancy-stages",
    estimatedTime: "12 minutes",
    difficulty: "beginner",
    format: "interactive",
    content: {
      overview: "The first trimester is an exciting and important time. Your body is changing rapidly to support your growing baby.",
      keyPoints: [
        "Baby's major organs begin developing",
        "Morning sickness is common and usually temporary",
        "Fatigue is normal as your body adjusts",
        "Prenatal vitamins support healthy development"
      ],
      detailedSections: [
        {
          title: "Week-by-Week Development",
          content: "Week 4-6: Baby's heart begins beating. Week 8: Major organs start forming. Week 12: Baby can move, though you can't feel it yet."
        },
        {
          title: "Managing Common Symptoms",
          content: "Nausea: Try eating small, frequent meals. Fatigue: Rest when you can. Mood changes: Talk to your support system. Always contact your healthcare provider with concerns."
        }
      ],
      quickTips: [
        "Take prenatal vitamins daily",
        "Stay hydrated with small sips throughout the day",
        "Rest when your body tells you to",
        "Avoid alcohol, smoking, and raw foods"
      ]
    }
  },
  {
    id: "preg-002",
    title: "Second Trimester Wellness",
    description: "Months 4-6: Often called the 'golden period' of pregnancy",
    category: "pregnancy-stages",
    estimatedTime: "15 minutes",
    difficulty: "beginner",
    format: "article",
    content: {
      overview: "Many people feel their best during the second trimester. Energy often returns and you might start feeling baby's movements.",
      keyPoints: [
        "Energy levels often improve",
        "You may start feeling baby move (quickening)",
        "Anatomy scans can reveal baby's development",
        "Good time for moderate exercise and preparation"
      ],
      detailedSections: [
        {
          title: "Feeling Baby Move",
          content: "First movements feel like butterflies or gas bubbles. As baby grows, movements become stronger and more regular. This is one of pregnancy's most magical experiences."
        },
        {
          title: "Staying Active Safely",
          content: "Moderate exercise is beneficial for most pregnancies. Walking, swimming, and prenatal yoga are excellent options. Always check with your healthcare provider before starting new activities."
        }
      ]
    }
  },
  {
    id: "preg-003",
    title: "Third Trimester Preparation",
    description: "Final months: Getting ready for baby's arrival",
    category: "pregnancy-stages",
    estimatedTime: "18 minutes",
    difficulty: "intermediate",
    format: "article",
    content: {
      overview: "The third trimester focuses on baby's growth and preparing for birth. Your body is working hard to support your baby's final development.",
      keyPoints: [
        "Baby gains most of their weight now",
        "Braxton Hicks contractions may start",
        "Prepare your birth plan and hospital bag",
        "Baby's movements may feel different as space gets tight"
      ],
      detailedSections: [
        {
          title: "Recognizing Labor Signs",
          content: "True labor contractions are regular, get stronger over time, and don't stop with rest. Other signs include water breaking or bloody show. Contact your healthcare provider when contractions are 5 minutes apart for an hour."
        },
        {
          title: "Preparing for Baby",
          content: "Pack your hospital bag by 36 weeks. Prepare your space at home. Consider taking a childbirth class. Discuss your birth preferences with your healthcare team."
        }
      ]
    }
  }
];

export const NUTRITION_MODULES: LearningModule[] = [
  {
    id: "nutr-001",
    title: "Pregnancy Nutrition Basics",
    description: "Essential nutrients for a healthy pregnancy",
    category: "nutrition",
    estimatedTime: "10 minutes",
    difficulty: "beginner",
    format: "flashcard",
    content: {
      overview: "Good nutrition supports both your health and baby's development. You don't need to eat for two, but you do need to eat well.",
      keyPoints: [
        "Focus on nutrient-dense foods",
        "Folic acid prevents birth defects",
        "Iron supports increased blood volume",
        "Calcium builds strong bones and teeth"
      ],
      detailedSections: [
        {
          title: "Key Nutrients",
          content: "Folic acid: Found in leafy greens, citrus, fortified grains. Iron: Lean meats, beans, fortified cereals. Calcium: Dairy, leafy greens, fortified plant milks. Omega-3s: Fish, walnuts, flax seeds."
        },
        {
          title: "Foods to Limit",
          content: "High-mercury fish, raw or undercooked meats, unpasteurized dairy, excessive caffeine. These precautions help protect your developing baby."
        }
      ],
      quickTips: [
        "Take prenatal vitamins as recommended",
        "Eat a variety of colorful fruits and vegetables",
        "Choose whole grains over refined grains",
        "Stay hydrated with water throughout the day"
      ]
    }
  },
  {
    id: "nutr-002",
    title: "Breastfeeding Nutrition",
    description: "Nourishing yourself while nursing your baby",
    category: "nutrition",
    estimatedTime: "12 minutes",
    difficulty: "intermediate",
    format: "article",
    content: {
      overview: "Breastfeeding requires extra energy and nutrients. Taking care of your nutrition helps ensure quality milk production and maintains your energy.",
      keyPoints: [
        "You need about 500 extra calories while breastfeeding",
        "Continue taking prenatal vitamins",
        "Stay well-hydrated",
        "Eat when you're hungry - nursing burns calories"
      ],
      detailedSections: [
        {
          title: "Hydration is Key",
          content: "Breastfeeding can make you very thirsty. Keep water nearby when nursing. Aim for clear or light yellow urine as a hydration guide."
        },
        {
          title: "Foods that Support Milk Production",
          content: "Oats, almonds, fennel, and green leafy vegetables are traditionally thought to support milk production. Most importantly, eat a balanced diet and trust your body."
        }
      ]
    }
  },
  {
    id: "nutr-003",
    title: "Baby's First Foods",
    description: "Introduction to solid foods around 6 months",
    category: "nutrition",
    estimatedTime: "15 minutes",
    difficulty: "beginner",
    format: "interactive",
    content: {
      overview: "Starting solid foods is an exciting milestone. Most babies are ready around 6 months when they can sit up and show interest in food.",
      keyPoints: [
        "Start around 6 months of age",
        "Begin with single-ingredient foods",
        "Iron-rich foods are important first foods",
        "Let baby self-feed when possible"
      ],
      detailedSections: [
        {
          title: "Signs Baby is Ready",
          content: "Baby can sit up with support, has lost the tongue-thrust reflex, shows interest in food, and can pick up objects and bring them to their mouth."
        },
        {
          title: "First Food Ideas",
          content: "Iron-fortified baby cereal, pureed meats, mashed avocado, sweet potato, or banana. Introduce one new food at a time and wait 3-5 days before trying another."
        }
      ],
      quickTips: [
        "Breast milk or formula remains primary nutrition until age 1",
        "Expect mess - it's part of learning!",
        "Offer the same food multiple times",
        "Avoid honey, choking hazards, and added salt or sugar"
      ]
    }
  },
  {
    id: "nutr-004",
    title: "Toddler Nutrition",
    description: "Feeding your growing toddler (1-3 years)",
    category: "nutrition",
    estimatedTime: "14 minutes",
    difficulty: "intermediate",
    format: "article",
    content: {
      overview: "Toddlers are learning to eat family foods while developing their own preferences. This stage can be challenging but is important for establishing healthy habits.",
      keyPoints: [
        "Offer variety, even if initially rejected",
        "Toddlers need fat for brain development",
        "Avoid becoming a short-order cook",
        "Model healthy eating behaviors"
      ],
      detailedSections: [
        {
          title: "Dealing with Picky Eating",
          content: "Picky eating is normal for toddlers. Continue offering variety without pressure. It can take 10+ exposures to a new food before acceptance. Stay patient and positive."
        },
        {
          title: "Portion Sizes",
          content: "Toddler portions are smaller than adult portions. A toddler serving is about 1/4 to 1/2 of an adult serving. Trust your toddler to eat what they need."
        }
      ]
    }
  }
];

// Cultural adaptation suggestions
export const CULTURAL_ADAPTATIONS = {
  imageSuggestions: {
    sexEducation: [
      "Diverse young people in educational settings",
      "Healthcare providers of various backgrounds",
      "Inclusive family structures",
      "Cultural symbols of growth and wisdom"
    ],
    pregnancy: [
      "Pregnant women from various cultural backgrounds",
      "Families celebrating pregnancy milestones",
      "Traditional and modern prenatal care settings",
      "Cultural pregnancy traditions and celebrations"
    ],
    nutrition: [
      "Traditional healthy foods from various cultures",
      "Families sharing meals together",
      "Breast feeding in diverse cultural contexts",
      "Local markets with fresh, healthy foods"
    ]
  },
  
  languageAdaptations: {
    terminology: "Use culturally appropriate terms for body parts and reproductive health",
    familyStructures: "Acknowledge diverse family structures and support systems",
    religiousConsiderations: "Respect various religious perspectives on health and sexuality",
    communityValues: "Emphasize community support and collective well-being"
  },
  
  formatSuggestions: {
    audio: "For communities with lower literacy rates or visual learners",
    storytelling: "Traditional story formats for sharing health information",
    communityDiscussion: "Group learning formats that respect collective decision-making",
    visualGuides: "Image-heavy content for universal understanding"
  }
};

export const getAllLearningModules = (): LearningModule[] => {
  return [
    ...SEX_EDUCATION_MODULES,
    ...PREGNANCY_STAGES_MODULES,
    ...NUTRITION_MODULES
  ];
};

export const getModulesByCategory = (category: string): LearningModule[] => {
  return getAllLearningModules().filter(module => module.category === category);
};

export const getModulesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): LearningModule[] => {
  return getAllLearningModules().filter(module => module.difficulty === difficulty);
};