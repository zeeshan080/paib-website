import { db } from "../lib/db"
import { users, heroSlides, management, projects, services, courses, developerProfiles } from "../lib/db/schema"
import bcrypt from "bcryptjs"

async function seed() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12)
  const [admin] = await db
    .insert(users)
    .values({
      name: "Admin User",
      email: "admin@paib.ai",
      passwordHash: adminPassword,
      role: "ADMIN",
      handle: "admin",
    })
    .returning()

  // Create developer users
  const devPassword = await bcrypt.hash("dev123", 12)
  const developers = await db
    .insert(users)
    .values([
      {
        name: "Ahmed Khan",
        email: "ahmed@paib.ai",
        passwordHash: devPassword,
        role: "DEVELOPER",
        handle: "ahmed-khan",
      },
      {
        name: "Fatima Ali",
        email: "fatima@paib.ai",
        passwordHash: devPassword,
        role: "DEVELOPER",
        handle: "fatima-ali",
      },
      {
        name: "Hassan Sheikh",
        email: "hassan@paib.ai",
        passwordHash: devPassword,
        role: "DEVELOPER",
        handle: "hassan-sheikh",
      },
    ])
    .returning()

  // Create developer profiles
  await db.insert(developerProfiles).values([
    {
      userId: developers[0].id,
      headline: "AI/ML Engineer & Full-Stack Developer",
      bio: "Passionate about building intelligent systems and scalable web applications.",
      skills: ["Python", "TensorFlow", "React", "Node.js", "PostgreSQL"],
      githubUrl: "https://github.com/ahmed-khan",
      linkedinUrl: "https://linkedin.com/in/ahmed-khan",
    },
    {
      userId: developers[1].id,
      headline: "Data Scientist & AI Researcher",
      bio: "Specializing in NLP and computer vision applications.",
      skills: ["Python", "PyTorch", "Scikit-learn", "R", "SQL"],
      githubUrl: "https://github.com/fatima-ali",
      linkedinUrl: "https://linkedin.com/in/fatima-ali",
    },
    {
      userId: developers[2].id,
      headline: "DevOps Engineer & Cloud Architect",
      bio: "Expert in cloud infrastructure and AI model deployment.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Python"],
      githubUrl: "https://github.com/hassan-sheikh",
      linkedinUrl: "https://linkedin.com/in/hassan-sheikh",
    },
  ])

  // Create hero slides
  await db.insert(heroSlides).values([
    {
      title: "Pakistan Artificial Intelligence Builders",
      subtitle: "Leading Pakistan into the AI revolution with cutting-edge solutions and innovation",
      ctaLabel: "Explore Projects",
      ctaHref: "/projects",
      order: 1,
    },
    {
      title: "AI Agents & Automation",
      subtitle: "Transform your business with intelligent automation and AI-powered solutions",
      ctaLabel: "View Services",
      ctaHref: "/services",
      order: 2,
    },
    {
      title: "Learn AI Development",
      subtitle: "Master the future of technology with our comprehensive AI and ML courses",
      ctaLabel: "Browse Courses",
      ctaHref: "/courses",
      order: 3,
    },
  ])

  // Create management profiles
  await db.insert(management).values([
    {
      slug: "dr-sarah-ahmed",
      name: "Dr. Sarah Ahmed",
      roleTitle: "Chief Executive Officer",
      bio: "Leading AI researcher with 15+ years of experience in machine learning and artificial intelligence.",
      order: 1,
    },
    {
      slug: "muhammad-hassan",
      name: "Muhammad Hassan",
      roleTitle: "Chief Technology Officer",
      bio: "Expert in scalable AI systems and cloud architecture with a passion for innovation.",
      order: 2,
    },
    {
      slug: "aisha-malik",
      name: "Aisha Malik",
      roleTitle: "Head of Research",
      bio: "PhD in Computer Science specializing in natural language processing and deep learning.",
      order: 3,
    },
  ])

  // Create projects
  await db.insert(projects).values([
    {
      slug: "intelligent-chatbot-platform",
      title: "Intelligent Chatbot Platform",
      summary: "AI-powered conversational platform for customer service automation",
      content: "A comprehensive chatbot solution built with advanced NLP capabilities...",
      status: "PUBLISHED",
      tags: ["AI", "NLP", "Chatbot"],
      tech: ["Python", "TensorFlow", "React", "Node.js"],
      authorId: developers[0].id,
    },
    {
      slug: "predictive-analytics-dashboard",
      title: "Predictive Analytics Dashboard",
      summary: "Real-time business intelligence with machine learning predictions",
      content: "Advanced analytics platform that provides actionable insights...",
      status: "PUBLISHED",
      tags: ["Analytics", "ML", "Dashboard"],
      tech: ["Python", "Scikit-learn", "React", "PostgreSQL"],
      authorId: developers[1].id,
    },
    {
      slug: "computer-vision-security",
      title: "Computer Vision Security System",
      summary: "AI-powered surveillance and security monitoring solution",
      content: "Intelligent security system using computer vision for threat detection...",
      status: "PUBLISHED",
      tags: ["Computer Vision", "Security", "AI"],
      tech: ["Python", "OpenCV", "PyTorch", "FastAPI"],
      authorId: developers[0].id,
    },
    {
      slug: "automated-content-generator",
      title: "Automated Content Generator",
      summary: "AI-driven content creation tool for marketing and social media",
      content: "Leveraging large language models to generate high-quality content...",
      status: "PUBLISHED",
      tags: ["NLP", "Content", "Automation"],
      tech: ["Python", "Transformers", "FastAPI", "React"],
      authorId: developers[1].id,
    },
    {
      slug: "smart-recommendation-engine",
      title: "Smart Recommendation Engine",
      summary: "Personalized recommendation system for e-commerce platforms",
      content: "Advanced recommendation algorithms that increase user engagement...",
      status: "PUBLISHED",
      tags: ["Recommendations", "ML", "E-commerce"],
      tech: ["Python", "TensorFlow", "Redis", "PostgreSQL"],
      authorId: developers[2].id,
    },
    {
      slug: "ai-powered-document-processor",
      title: "AI-Powered Document Processor",
      summary: "Intelligent document analysis and data extraction system",
      content: "Automated document processing using OCR and NLP technologies...",
      status: "PUBLISHED",
      tags: ["OCR", "NLP", "Automation"],
      tech: ["Python", "Tesseract", "spaCy", "FastAPI"],
      authorId: developers[0].id,
    },
  ])

  // Create services
  await db.insert(services).values([
    {
      slug: "ai-consulting",
      title: "AI Strategy Consulting",
      excerpt: "Expert guidance on AI implementation and digital transformation",
      content: "Our AI consulting services help businesses identify opportunities...",
      icon: "brain",
      priceRange: "$5,000 - $50,000",
      tags: ["Consulting", "Strategy", "AI"],
      isFeatured: true,
      order: 1,
    },
    {
      slug: "custom-ai-development",
      title: "Custom AI Development",
      excerpt: "Tailored AI solutions built specifically for your business needs",
      content: "We develop custom AI applications that solve your unique challenges...",
      icon: "code",
      priceRange: "$10,000 - $100,000",
      tags: ["Development", "Custom", "AI"],
      isFeatured: true,
      order: 2,
    },
    {
      slug: "ml-model-deployment",
      title: "ML Model Deployment",
      excerpt: "Scalable deployment and monitoring of machine learning models",
      content: "Professional ML model deployment with monitoring and maintenance...",
      icon: "server",
      priceRange: "$3,000 - $25,000",
      tags: ["Deployment", "MLOps", "Cloud"],
      order: 3,
    },
    {
      slug: "data-analytics",
      title: "Data Analytics & Insights",
      excerpt: "Transform your data into actionable business intelligence",
      content: "Comprehensive data analytics services to unlock business value...",
      icon: "bar-chart",
      priceRange: "$2,000 - $20,000",
      tags: ["Analytics", "Data", "BI"],
      order: 4,
    },
    {
      slug: "ai-training-workshops",
      title: "AI Training Workshops",
      excerpt: "Hands-on training programs for teams and organizations",
      content: "Interactive workshops to upskill your team in AI technologies...",
      icon: "graduation-cap",
      priceRange: "$1,000 - $10,000",
      tags: ["Training", "Education", "Workshops"],
      order: 5,
    },
    {
      slug: "automation-solutions",
      title: "Business Process Automation",
      excerpt: "Intelligent automation to streamline your operations",
      content: "AI-powered automation solutions to optimize business processes...",
      icon: "zap",
      priceRange: "$5,000 - $75,000",
      tags: ["Automation", "RPA", "Efficiency"],
      isFeatured: true,
      order: 6,
    },
  ])

  // Create courses
  await db.insert(courses).values([
    {
      slug: "introduction-to-ai",
      title: "Introduction to Artificial Intelligence",
      excerpt: "Learn the fundamentals of AI and machine learning",
      content: "A comprehensive introduction to AI concepts and applications...",
      level: "Beginner",
      durationMinutes: 480,
      price: 0,
      tags: ["AI", "Beginner", "Fundamentals"],
      instructors: ["ahmed-khan", "fatima-ali"],
      status: "PUBLISHED",
      publishedAt: new Date("2024-01-15"),
    },
    {
      slug: "machine-learning-bootcamp",
      title: "Machine Learning Bootcamp",
      excerpt: "Intensive hands-on training in machine learning algorithms",
      content: "Deep dive into ML algorithms with practical implementations...",
      level: "Intermediate",
      durationMinutes: 1200,
      price: 29900,
      tags: ["ML", "Python", "Algorithms"],
      instructors: ["fatima-ali"],
      status: "PUBLISHED",
      publishedAt: new Date("2024-02-01"),
    },
    {
      slug: "deep-learning-specialization",
      title: "Deep Learning Specialization",
      excerpt: "Master neural networks and deep learning techniques",
      content: "Advanced course covering neural networks, CNNs, RNNs, and more...",
      level: "Advanced",
      durationMinutes: 1800,
      price: 49900,
      tags: ["Deep Learning", "Neural Networks", "Advanced"],
      instructors: ["ahmed-khan"],
      status: "PUBLISHED",
      publishedAt: new Date("2024-03-01"),
    },
    {
      slug: "nlp-with-transformers",
      title: "Natural Language Processing with Transformers",
      excerpt: "Build modern NLP applications using transformer models",
      content: "Learn to work with BERT, GPT, and other transformer architectures...",
      level: "Advanced",
      durationMinutes: 960,
      price: 39900,
      tags: ["NLP", "Transformers", "BERT", "GPT"],
      instructors: ["fatima-ali"],
      status: "PUBLISHED",
      publishedAt: new Date("2024-04-01"),
    },
  ])

  console.log("✅ Database seeded successfully!")
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error)
  process.exit(1)
})
