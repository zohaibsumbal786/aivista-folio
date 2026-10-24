export type ProjectDetail = {
  title: string;
  desc: string;
  bullets: string[];
  tags: string[];
  category?: string;
  featured?: boolean;
  links?: { label: string; href: string }[];
};

export const projects: ProjectDetail[] = [
  // ===== Featured =====
  {
    title: "Non-Invasive Glucose Monitoring Kiosk",
    category: "Embedded AI",
    featured: true,
    desc: "Multi-parameter biometric health kiosk on ESP32-S3 with a context-aware ML glucose algorithm — 87% Clarke Zone A+B accuracy at ~USD 38 prototype cost.",
    tags: ["ESP32-S3", "FreeRTOS", "MAX30102", "MLX90614", "TFT Display", "Embedded ML"],
    bullets: [
      "MAX30102 + MLX90614 sensors with FreeRTOS dual-core scheduling.",
      "3.2 BPM HR MAE and 1.4% SpO2 MAE across test subjects.",
      "Context-aware ML glucose estimation with full 3.5\" TFT UI.",
    ],
  },
  {
    title: "AI Collection Engine — Accounts Receivable",
    category: "AR Automation",
    featured: true,
    desc: "Production AR automation with AI reminders, aging analysis, Stripe payment links, and cash-flow analytics.",
    tags: ["React", "Node.js", "Express", "SQLite", "Claude API", "Stripe", "TypeScript"],
    bullets: [
      "Automated smart reminders at 7/30/60 days overdue.",
      "Real-time DSO tracking and cash-flow prediction.",
      "Auto-escalation for high-value invoices above $10k.",
    ],
  },
  {
    title: "IoT Pet Monitoring System",
    category: "IoT System",
    featured: true,
    desc: "Real-time pet tracking and environment monitoring on ESP32 streaming to a React dashboard.",
    tags: ["ESP32", "MQTT", "Sensors", "React", "WebSocket", "Node.js"],
    bullets: [
      "Live sensor telemetry (temp, humidity, motion, GPS).",
      "Motion + environment alerting to any device.",
      "Low-power sampling for wearable collar battery life.",
    ],
  },

  // ===== Conversational / Agentic AI =====
  {
    title: "AI WhatsApp Business Assistant",
    category: "Conversational AI",
    desc: "Multilingual WhatsApp AI agent that qualifies leads, books appointments, and handles 24/7 support with CRM handoff.",
    tags: ["LangChain", "Twilio", "OpenAI GPT-4", "Node.js", "CRM Integration", "WebHooks"],
    bullets: [
      "80%+ of queries resolved autonomously.",
      "24/7 availability without human staff.",
      "Integrated with existing CRM pipeline and human handoff.",
    ],
  },
  {
    title: "Autonomous Lead Generation Agent",
    category: "Agentic AI",
    desc: "Outbound agent that researches prospects, personalizes cold outreach, follows up, and books qualified meetings.",
    tags: ["Python", "LangChain", "GPT-4", "Zapier", "HubSpot", "LinkedIn API"],
    bullets: [
      "Fully automated prospect research pipeline.",
      "Personalized outreach at scale with intelligent follow-ups.",
      "Qualified meetings delivered directly to calendar.",
    ],
  },
  {
    title: "Stateful AI Assistant with Long-Term Memory",
    category: "AI Memory Agent",
    desc: "Production AI assistant with short + long-term memory, semantic retrieval, and preference learning.",
    tags: ["LangChain", "LangGraph", "GPT-4", "Pinecone", "PostgreSQL", "FastAPI", "Redis"],
    bullets: [
      "Remembers user context across sessions.",
      "Personalized tone and response style per user.",
      "Memory compression + semantic retrieval with vector embeddings.",
    ],
  },
  {
    title: "Social Media AI Agent with HITL Approval",
    category: "Social Media AI",
    desc: "Enterprise-grade agent that drafts, awaits human approval, and publishes across Twitter, IG, LinkedIn, TikTok, and Facebook.",
    tags: ["LangGraph", "GPT-4", "Celery", "Redis", "React", "APScheduler", "Tweepy"],
    bullets: [
      "Multi-platform automated publishing with scheduling.",
      "Human approval gate before every post.",
      "Learns from feedback to improve content quality.",
    ],
  },
  {
    title: "Dubai AI Business Agent (WhatsApp SaaS)",
    category: "WhatsApp SaaS",
    desc: "Production SaaS for UAE SMEs with WhatsApp AI, RAG engine, Stripe billing, and Arabic + English bilingual support.",
    tags: ["Next.js", "Express", "OpenAI", "PostgreSQL", "pgvector", "Stripe", "WhatsApp API"],
    bullets: [
      "Full bilingual Arabic/English conversations.",
      "Real-time WhatsApp AI with RAG over business docs.",
      "Stripe subscription billing integrated end-to-end.",
    ],
  },

  // ===== Computer Vision / ML =====
  {
    title: "AI Virtual Try-On System",
    category: "Computer Vision",
    desc: "Deep learning system that digitally fits garments onto human body images for e-commerce visualization.",
    tags: ["PyTorch", "OpenCV", "GANs", "MediaPipe", "Python", "CUDA"],
    bullets: [
      "Realistic garment rendering on real body images.",
      "Supports multiple garment categories and body types.",
      "Real-time inference pipeline.",
    ],
  },
  {
    title: "Car Violation Detection System",
    category: "Object Detection",
    desc: "Automated traffic surveillance using YOLO + OCR for plate recognition and headlight violation detection.",
    tags: ["YOLOv8", "OpenCV", "Python", "TensorFlow", "OCR", "ALPR"],
    bullets: [
      "Real-time violation detection from CCTV feeds.",
      "Automated license plate recognition.",
      "Violation logging and reporting dashboard.",
    ],
  },
  {
    title: "Fraud Detection System",
    category: "Machine Learning",
    desc: "Production ML pipeline for real-time financial fraud detection with explainable model outputs.",
    tags: ["scikit-learn", "XGBoost", "Python", "Pandas", "SHAP", "Feature Engineering"],
    bullets: [
      "High-precision anomaly classification.",
      "Real-time scoring per transaction.",
      "Explainable outputs for compliance teams.",
    ],
  },
  {
    title: "Spam Voice Detection System",
    category: "Audio ML",
    desc: "Audio signal processing + ML pipeline that classifies spam, robocall, and fraudulent voice patterns.",
    tags: ["Librosa", "scikit-learn", "Python", "FFmpeg", "MFCC", "SVM"],
    bullets: [
      "Real-time call classification.",
      "High accuracy on robocall patterns.",
      "Deployable as an API endpoint.",
    ],
  },
  {
    title: "Medical Store Demand Prediction",
    category: "Healthcare AI",
    desc: "Predictive analytics for pharmacy inventory — forecasting demand from sales history and seasonality.",
    tags: ["Python", "XGBoost", "Pandas", "Matplotlib", "ARIMA", "Feature Eng."],
    bullets: [
      "Accurate 30-day demand forecasts.",
      "Reduced stockout and overstock incidents.",
      "Integrated with POS system data.",
    ],
  },

  // ===== IoT =====
  {
    title: "IoT Bird Repellent System",
    category: "IoT Automation",
    desc: "Smart agricultural automation detecting bird activity and triggering automated deterrents.",
    tags: ["Arduino", "PIR Sensors", "Python", "ESP32", "Relay Module", "Image Classification"],
    bullets: [
      "Automated bird detection and response.",
      "Configurable deterrent timing.",
      "Activity logging dashboard.",
    ],
  },

  // ===== Software / SaaS =====
  {
    title: "Invoice & Inventory Management System",
    category: "Operations Software",
    desc: "End-to-end platform automating invoicing, multi-location inventory, POs, and financial reporting.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind", "REST API", "PDF Generation"],
    bullets: [
      "Fully automated invoice generation.",
      "Multi-location inventory tracking.",
      "Real-time financial reporting.",
    ],
  },
  {
    title: "Power BI & Tableau Dashboards",
    category: "Business Intelligence",
    desc: "Interactive BI dashboards for executive decisions across retail, SaaS, and services with automated refresh.",
    tags: ["Power BI", "Tableau", "DAX", "SQL", "Python", "ETL Pipelines"],
    bullets: [
      "Unified data from 5+ sources.",
      "Custom drill-downs per business unit.",
      "Automated daily data refresh.",
    ],
  },
  {
    title: "Audio & Video Downloader Tools",
    category: "Utility Tool",
    desc: "Python automation utilities for SoundCloud audio and multi-platform video downloads with batch support.",
    tags: ["Python", "yt-dlp", "requests", "CLI", "Async IO", "Metadata"],
    bullets: [
      "Multi-platform support.",
      "Batch download capability.",
      "Clean CLI and configuration interface.",
    ],
  },
  {
    title: "AI Compliance Engine",
    category: "Compliance SaaS",
    desc: "Open-source compliance management with multi-channel consent tracking, real-time opt-out, and audit evidence.",
    tags: ["FastAPI", "React", "PostgreSQL", "TimescaleDB", "Redis", "Celery", "Docker"],
    bullets: [
      "Real-time opt-out across all channels in <30 seconds.",
      "One-click audit evidence pack generation.",
      "7 background jobs + full webhook system, GDPR/CCPA/TCPA.",
    ],
  },
  {
    title: "AI Procurement System",
    category: "Procurement AI",
    desc: "Procurement automation with AI demand forecasting, supplier management, and human-approved auto-POs.",
    tags: ["React", "Vite", "Node.js", "SQLite", "Claude API", "TypeScript", "Zustand"],
    bullets: [
      "AI-powered demand forecasting from sales history.",
      "Auto-generated POs with business justification.",
      "Human approval gate with approve/reject workflow.",
    ],
  },
  {
    title: "AI Recruitment Pipeline System",
    category: "HR Automation",
    desc: "Recruitment automation with CV parsing, bias-free screening, AI interview questions, and Google Calendar scheduling.",
    tags: ["React", "Node.js", "PostgreSQL", "Groq API", "TypeScript", "Nodemailer", "Docker"],
    bullets: [
      "Automated CV parsing and candidate scoring.",
      "Bias-free anonymized screening profiles.",
      "Automated interview invites with .ics calendar files.",
    ],
  },
  {
    title: "AI Tracking Engine — SOP Gap Detection",
    category: "Documentation AI",
    desc: "Documentation system with RAG Q&A, weekly question clustering, gap detection, and Kanban update tracking.",
    tags: ["React", "Node.js", "Together AI", "Supabase", "Qdrant", "TypeScript", "dnd-kit"],
    bullets: [
      "Confidence-scored answers from internal docs.",
      "Auto-clustering of similar employee questions.",
      "Drag-and-drop Kanban for SOP update management.",
    ],
  },
  {
    title: "Stock Market AI Assistant",
    category: "Finance AI",
    desc: "AI stock analysis tool combining yfinance data with GPT-4 reasoning, 12+ indicators, and backtesting.",
    tags: ["Python", "FastAPI", "Streamlit", "OpenAI", "yfinance", "LangChain", "Plotly"],
    bullets: [
      "12+ technical indicators (RSI, MACD, Bollinger Bands).",
      "4 backtesting strategies with Sharpe ratio metrics.",
      "GPT-4 educational analysis with risk assessment.",
    ],
  },
  {
    title: "E-Health Diabetes Monitoring Platform",
    category: "HealthTech",
    desc: "Diabetes management platform for MNS-UAM Multan with real-time glucose monitoring and AI health insights.",
    tags: ["Django", "JavaScript", "MySQL", "Chart.js", "TailwindCSS", "Django REST", "JWT"],
    bullets: [
      "4-role RBAC (Doctor, Patient, Caretaker, Admin).",
      "AI insights: GMI, TIR, glycemic variability, forecasting.",
      "IoT device integration + real-time WebSocket updates.",
    ],
  },
];
