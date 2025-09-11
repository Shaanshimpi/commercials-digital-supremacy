"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Star, ArrowRight, Phone, Mail, MessageCircle, Menu, X } from "lucide-react"

const WHATSAPP_NUMBER = "9689473686"
const WHATSAPP_MESSAGE = "Hi! I'm interested in your digital marketing services."

const getWhatsAppURL = (customMessage?: string) => {
  const message = customMessage || WHATSAPP_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Content object with exact reference site content
const siteContent = {
  hero: {
    badge: "OUTCOME-BASED OFFERS",
    title: "We don't sell services.\nWe deliver outcomes.",
    subtitle: "Websites that convert, marketing that scales, and governance that keeps us accountable. All budgets billed directly to Google & Meta. Pre-committed creatives each month. Weekly KPIs and monthly reviews.",
    cta: "Pre-committed. Start in 48-72 hours for industries."
  },
  
  pricing: {
    websites: {
      starter: { 
        price: { inr: { min: "1L", max: "1.25L" }, usd: { min: "1.2K", max: "1.5K" } },
        title: "Starter Website",
        features: [
          "Logo + branding kit",
          "5–7 pages (WordPress/Shopify)",
          "Conversion-focused copywriting",
          "Domain + hosting setup",
          "Essential plugins",
          "1 form, 2 revision rounds/section"
        ]
      },
      growth: { 
        price: { inr: { min: "1.75L", max: "2.5L" }, usd: { min: "2.1K", max: "3K" } },
        title: "Growth Website",
        popular: true,
        features: [
          "10–15 pages",
          "SEO-ready copywriting",
          "Blog setup + CMS training",
          "GA4 + GSC + GTM integration",
          "GBP setup + basic optimization",
          "2 forms, 2 revision rounds/section"
        ]
      },
      ecommerce: { 
        price: { inr: { min: "2.5L", max: "3.5L" }, usd: { min: "3K", max: "4.2K" } },
        title: "E-commerce Website",
        features: [
          "Shopify/WooCommerce (≤50 SKUs)",
          "Payment gateway integration (2 max)",
          "Custom Figma design",
          "Product content + images",
          "Conversion tracking (GA4, Ads pixels)",
          "GBP optimization (advanced)",
          "50 SKUs, 2 revision rounds"
        ]
      }
    },

    leadgen: {
      starter: { 
        price: { inr: { min: "50K", max: "75K" }, usd: { min: "600", max: "900" } },
        title: "Starter Marketing",
        features: [
          "SEO: 5–10 keywords, 2 blogs/mo, 5 backlinks/mo",
          "Paid Ads: 1–2 campaigns (Google OR Meta)",
          "Creatives: 2–3 statics/mo",
          "Landing Page: 1/mo (A/B ready)",
          "GBP: Optimization + 1 post/mo",
          "Experiments: 2/mo (audience or creative)",
          "Reporting: Weekly KPIs, monthly call",
          "Lead Ops: Email/Sheet delivery, spam filters"
        ]
      },
      growth: { 
        price: { inr: { min: "1L", max: "1.25L" }, usd: { min: "1.2K", max: "1.5K" } },
        title: "Growth Marketing",
        recommended: true,
        features: [
          "SEO: 10–20 keywords, 4 blogs/mo, 10 backlinks/mo",
          "Paid Ads: 3–5 campaigns (Google + Meta)",
          "Creatives: 4–6/mo (3 statics, 1 carousel, 1–2 videos)",
          "Landing Pages: 2/mo (heatmaps enabled)",
          "GBP: 2 posts/mo + review response",
          "Experiments: 4/mo (audience, creative, offer, LP headline)",
          "Reporting: Weekly KPIs, monthly strategy review",
          "Lead Ops: CRM sync, call tracking, missed-call text-back"
        ]
      },
      scale: { 
        price: { inr: { min: "1.5L", max: "2L" }, usd: { min: "1.8K", max: "2.4K" } },
        title: "Scale Marketing",
        features: [
          "SEO: 20–40 keywords, 6 blogs/mo, 20 backlinks/mo",
          "Paid Ads: 6–8 campaigns (Google + Meta + YouTube)",
          "Creatives: 8–10/mo (4 statics, 2 carousels, 2 videos, 2 UGC)",
          "Landing Pages: 3/mo + funnel dashboards",
          "GBP: Weekly posts + ≥5 reviews/mo",
          "Experiments: 6/mo (audience × creative × funnel)",
          "Reporting: Weekly dashboards, executive monthly review",
          "Lead Ops: IVR routing, server-side GTM, advanced scoring"
        ]
      }
    },

    ecommerce: {
      starter: { 
        price: { inr: { min: "75K", max: "1L" }, usd: { min: "900", max: "1.2K" } },
        title: "Starter E-com",
        features: [
          "Google PMax (Shopping + branded search) + Remarketing",
          "Merchant Center setup (titles, rules)",
          "Creatives: 2–3 statics + 1 product video",
          "Email/SMS: 2 flows (Welcome, Abandoned Cart)"
        ]
      },
      growth: { 
        price: { inr: { min: "1.25L", max: "1.75L" }, usd: { min: "1.5K", max: "2.1K" } },
        title: "Growth E-com",
        bestValue: true,
        features: [
          "Channels: PMax + non-brand search • Meta prospecting/retargeting • YouTube",
          "Feed: GTIN/MPN enrichment + sale annotations",
          "Creatives: 4–6 statics • 2 videos • 1 UGC/mo",
          "Email/SMS: 5–6 flows (Browse Abandon, Win-back, Post-purchase)",
          "CRO: Free-shipping threshold • PDP trust badges • Sticky ATC"
        ]
      },
      scale: { 
        price: { inr: { min: "2L", max: "2.75L" }, usd: { min: "2.4K", max: "3.3K" } },
        title: "Scale E-com",
        features: [
          "Channels: Full-funnel (PMax • Meta Advantage+ Shopping • YouTube Action)",
          "Feed: Advanced labels (margin, seasonality)",
          "Creatives: 8–10/mo incl. UGC + catalog ads",
          "Email/SMS: Lifecycle (VIP • churn • loyalty • referrals)",
          "Add-ons: Affiliate program • Reviews integration"
        ]
      }
    },

    bundle: {
      growth: { 
        price: { inr: { min: "5L", max: "6L" }, usd: { min: "6.1K", max: "7.3K" } },
        title: "Growth Website + 90-day Starter Marketing"
      }
    }
  },
  caseStudies: [
    {
      category: "TV REPAIR",
      company: "Prime Home Club",
      location: "Mumbai/Pune", 
      description: "Scaled to ₹5–8L/mo ad spend profitably with invalid-click defense and call optimization.",
      metrics: [
        { label: "Invalid-click refunds", value: "₹5L recovered", color: "green" },
        { label: "Qualified calls/day", value: "50–70", color: "blue" },
        { label: "Monthly ad spend", value: "₹5–8L", color: "purple" }
      ]
    },
    {
      category: "SAAS",
      company: "Lomavis",
      location: "Germany",
      description: "Reduced CPST by 50% and scaled trials 5x with combined paid + SEO strategy.",
      metrics: [
        { label: "CPST reduction", value: "€70→€30 (50%)", color: "green" },
        { label: "Monthly trials", value: "30→250", color: "blue" },
        { label: "SEO contribution", value: "20% of trials", color: "purple" }
      ]
    },
    {
      category: "STEM EDUCATION", 
      company: "Big BrainBox",
      location: "Dallas, USA",
      description: "Achieved 6x ROI with optimized lead funnel and 80%+ student recall rate.",
      metrics: [
        { label: "New students/month", value: "30+ (4-6x growth)", color: "green" },
        { label: "Revenue ROI", value: "6x ($30K/$5K)", color: "blue" },
        { label: "Student recall", value: "80%+", color: "purple" }
      ]
    },
    {
      category: "STARTUP CONSULTING",
      company: "PlanThyBusiness", 
      location: "India",
      description: "Achieved 8-10x ROI with ₹350 CPL and 107% conversion growth in 6 months.",
      metrics: [
        { label: "CPL", value: "₹350 ±50", color: "green" },
        { label: "Conversion growth", value: "+107%", color: "blue" },
        { label: "ROI", value: "8-10x", color: "purple" }
      ]
    },
    {
      category: "TRANSPORT",
      company: "NRK Travels",
      location: "Vizag", 
      description: "Met ≤₹50 CPA target with call-only campaigns and invalid-click defense.",
      metrics: [
        { label: "CPA achieved", value: "₹48/lead", color: "green" },
        { label: "Phone calls (3mo)", value: "225", color: "blue" },
        { label: "Web conversions", value: "76", color: "purple" }
      ]
    }
  ],

  experts: [
    {
      title: "Figma Designer",
      rate: "$12/hr",
      description: "UI/UX design, prototyping, design systems",
      color: "blue"
    },
    {
      title: "WordPress Developer", 
      rate: "$15/hr",
      description: "Custom themes, plugins, optimizations",
      color: "green"
    },
    {
      title: "Shopify Developer",
      rate: "$15/hr", 
      description: "Store setup, customizations, apps",
      color: "purple"
    },
    {
      title: "Performance Marketing",
      rate: "$20/hr",
      description: "PPC consultation, SEO audit, strategy", 
      color: "orange"
    }
  ],

  faqs: [
    {
      question: "What results can I expect in 90 days?",
      answer: "Lead-gen: 20–100+ qualified leads/month depending on market & tier. E‑com: baseline ROAS established with Shopping + remarketing. Results are benchmarked to your industry, geo, competition, and creative quality."
    },
    {
      question: "Do you lock us into long contracts?",
      answer: "No. Month‑to‑month retainers with a 30‑day cancel notice. First 30 days is a probation sprint; you can cancel with no penalty."
    },
    {
      question: "Who owns the accounts and assets?",
      answer: "You do. Digital Supremacy only has admin access. All ad accounts, analytics, creatives, and website assets remain client‑owned."
    },
    {
      question: "How are ad budgets billed?",
      answer: "Directly to Google & Meta platforms from your own accounts. We never mark up media spend."
    },
    {
      question: "What happens if KPIs are not met?",
      answer: "If agreed KPI bands are not reached for 2 consecutive months, you can downgrade or adjust scope. We also provide a clear remediation plan."
    },
    {
      question: "Any compliance requirements?",
      answer: "We strictly follow Google/Meta ad policies. Regulated industries must provide licenses, disclaimers, and required documentation."
    }
  ],

  governance: {
    sla: {
      standard: {
        response: "24-48h",
        channels: "Email & Slack",
        reporting: "Weekly calls & monthly deep-dives",
        setup: "Setup Team in 5-10 days"
      },
      priority: {
        response: "4-8h", 
        channels: "Email, Slack, WhatsApp calls & Zoom calls",
        reporting: "Enhanced reporting & dedicated support",
        setup: "Online Team in 24-48h"
      }
    },
    reporting: [
      "Weekly KPI snapshots (leads, CPA, CPL, ROI)",
      "Monthly strategy review + optimization log", 
      "Annual Scoreboard: GA4 + Google Ads + Meta Ads + CRM"
    ],
    guarantees: [
      "All spend is direct paid directly to platforms",
      "3 month money-back deals with $500 bounty",
      "Quarterly budget allocation",
      "Performance-based pricing on the service center"
    ]
  },

  timeline: {
    website: [
      { phase: "Discovery", duration: "3-5 days", description: "Kick-off call, sitemap" },
      { phase: "Design", duration: "7-10 days", description: "2 rounds, Figma file copy shared" },
      { phase: "Build", duration: "10-15 days", description: "Fully Responsive USA" },
      { phase: "Launch", duration: "2-3 days", description: "Marketing start running" }
    ]
  }
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currency, setCurrency] = useState('INR')

  useEffect(() => {
    // Initialize dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? JSON.parse(savedTheme) : prefersDark
    
    setIsDarkMode(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Initialize currency from localStorage
    const savedCurrency = localStorage.getItem('currency')
    if (savedCurrency) {
      setCurrency(savedCurrency)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header height
      const elementPosition = element.offsetTop - headerOffset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }


  // Use the siteContent pricing with updated values
  const pricing = siteContent.pricing

  const formatPrice = (packageType: string, packageTier: string) => {
    const packageData = pricing[packageType as keyof typeof pricing]
    if (!packageData) return "Price not found"
    
    const priceData = packageData[packageTier as keyof typeof packageData]
    if (!priceData || !priceData.price) return "Price not found"
    
    if (currency === 'USD') {
      return `$${priceData.price.usd.min} - $${priceData.price.usd.max}`
    }
    return `₹${priceData.price.inr.min} - ₹${priceData.price.inr.max}`
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={isDarkMode ? "/white-logo.png" : "/black-logo.png"}
                alt="Digital Supremacy"
                className="h-8 w-auto mr-3"
              />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Digital Supremacy</span>
            </div>

            {/* Main Navigation - Desktop */}
            <nav className="hidden lg:flex space-x-4">
              <button onClick={() => scrollToSection('websites')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm">
                Websites
              </button>
              <button onClick={() => scrollToSection('lead-gen')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm">
                Lead-Gen
              </button>
              <button onClick={() => scrollToSection('e-commerce')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm">
                E-commerce
              </button>
              <button onClick={() => scrollToSection('bundle')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm">
                Bundle
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm">
                Contact
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Currency Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 rounded p-0.5">
                <button 
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    currency === 'USD' 
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => handleCurrencyChange('USD')}
                >
                  USD
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    currency === 'INR' 
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => handleCurrencyChange('INR')}
                >
                  INR
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-yellow-400' : 'bg-gray-800'}`}></div>
              </button>

              {/* WhatsApp Button */}
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1" 
                size="sm"
                onClick={() => window.open(getWhatsAppURL(), '_blank')}
              >
                <MessageCircle className="w-3 h-3" />
                <span className="hidden sm:inline text-xs ml-1">WhatsApp</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('websites')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                Websites
              </button>
              <button onClick={() => scrollToSection('lead-gen')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                Lead-Gen
              </button>
              <button onClick={() => scrollToSection('e-commerce')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                E-commerce
              </button>
              <button onClick={() => scrollToSection('bundle')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                Bundle
              </button>
              <button onClick={() => scrollToSection('governance')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                Governance
              </button>
              <button onClick={() => scrollToSection('case-studies')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                Case Studies
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-left w-full">
                Contact
              </button>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mb-2 dark:border-gray-600 dark:text-gray-300"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'd like to book a call to discuss my marketing needs."), '_blank')}
                >
                  Book Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Badge variant="outline" className="text-sm font-medium">
              {siteContent.hero.badge}
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {siteContent.hero.title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {siteContent.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3"
              onClick={() => scrollToSection('websites')}
            >
              Explore Website Packages
            </Button>
            <Button 
              variant="outline" 
              className="px-6 sm:px-8 py-3 bg-transparent"
              onClick={() => scrollToSection('lead-gen')}
            >
              Explore Lead-Gen Plans
            </Button>
            <Button 
              variant="outline" 
              className="px-6 sm:px-8 py-3 bg-transparent"
              onClick={() => scrollToSection('e-commerce')}
            >
              Explore E-commerce Plans
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{siteContent.hero.cta}</p>
        </div>
      </section>

      {/* Track A Section */}
      <section id="websites" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Track A — Website Design & Development</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">One-time investment for lasting results</p>
          </div>

          <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-8 mb-12 transition-colors">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Website Timeline & Milestones</h3>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {siteContent.timeline.website.map((phase, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{phase.phase}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{phase.duration}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{phase.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Website Packages */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{siteContent.pricing.websites.starter.title}</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('websites', 'starter')}</div>
                <p className="text-gray-600 dark:text-gray-300">Perfect for small businesses starting online</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  {siteContent.pricing.websites.starter.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Starter Website package."), '_blank')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 border-blue-600 relative transition-colors">
              {siteContent.pricing.websites.growth.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white border-blue-600">
                  MOST POPULAR
                </Badge>
              )}
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">{siteContent.pricing.websites.growth.title}</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('websites', 'growth')}</div>
                <p className="text-gray-600 dark:text-gray-300">Ideal for growing businesses</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  {siteContent.pricing.websites.growth.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Growth Website package."), '_blank')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">{siteContent.pricing.websites.ecommerce.title}</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('websites', 'ecommerce')}</div>
                <p className="text-gray-600 dark:text-gray-300">Full-featured online store</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  {siteContent.pricing.websites.ecommerce.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the E-commerce Website package."), '_blank')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Track B Section */}
      <section id="lead-gen" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Track B — Lead-Gen Marketing (Recurring)</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">All spend billed directly to Google & Meta. Client-owned ad accounts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-green-600 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">Starter Marketing</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('leadgen', 'starter')}/mo</div>
                <p className="text-gray-600 dark:text-gray-300">Perfect for small businesses</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">₹1L - ₹2L monthly ad spend</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Google Ads + Meta Ads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Landing page optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Weekly reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Email & Slack support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Starter Marketing package."), '_blank')}
                >
                  Start Marketing
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 border-blue-600 relative transition-colors">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white border-blue-600">
                RECOMMENDED
              </Badge>
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">Growth Marketing</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('leadgen', 'growth')}/mo</div>
                <p className="text-gray-600 dark:text-gray-300">For scaling businesses</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">₹2L - ₹5L monthly ad spend</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Multi-platform campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">A/B testing & CRO</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Advanced tracking setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Weekly calls + reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">WhatsApp + Zoom support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Growth Marketing package."), '_blank')}
                >
                  Start Marketing
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">Scale Marketing</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('leadgen', 'scale')}/mo</div>
                <p className="text-gray-600 dark:text-gray-300">For enterprise-level growth</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">₹5L+ monthly ad spend</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Full-funnel optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Custom audiences & lookalikes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Monthly strategy reviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Priority support (4-8h)</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Scale Marketing package."), '_blank')}
                >
                  Start Marketing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Track C Section */}
      <section id="e-commerce" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Track C — E-commerce Marketing (Recurring)</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Maximize your online store revenue with performance-driven marketing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-purple-600 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">Starter E-com</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('ecommerce', 'starter')}/mo</div>
                <p className="text-gray-600 dark:text-gray-300">Launch your online store marketing</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">₹1.5L - ₹3L monthly ad spend</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Google Shopping + Meta Ads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Product feed optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Basic remarketing campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Weekly performance reports</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Starter E-commerce package."), '_blank')}
                >
                  Start E-com
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 border-blue-600 relative transition-colors">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white border-blue-600">
                BEST VALUE
              </Badge>
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">Growth E-com</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('ecommerce', 'growth')}/mo</div>
                <p className="text-gray-600 dark:text-gray-300">Scale your e-commerce business</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">₹3L - ₹7L monthly ad spend</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Multi-platform campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Advanced remarketing funnels</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Email marketing integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Customer lifetime value optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Bi-weekly strategy calls</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Growth E-commerce package."), '_blank')}
                >
                  Start E-com
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                  <CardTitle className="text-xl font-semibold">Scale E-com</CardTitle>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatPrice('ecommerce', 'scale')}/mo</div>
                <p className="text-gray-600 dark:text-gray-300">Enterprise e-commerce growth</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">₹7L+ monthly ad spend</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Omnichannel marketing strategy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Advanced attribution modeling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Custom audience segmentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Performance-based bonuses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Dedicated e-com specialist</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Scale E-commerce package."), '_blank')}
                >
                  Start E-com
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Growth Package */}
      <section id="bundle" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Bundle Package</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Complete solution for rapid online growth</p>
          </div>

          <Card className="bg-gray-900 text-white p-8 mb-8">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-500 rounded mr-4"></div>
                <h3 className="text-2xl font-semibold">Growth Website + 90-day Starter Marketing</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-green-400">What's Included:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">8-15 pages responsive website</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">CRO setup & landing page optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">90 days of marketing campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Google Ads + Meta Ads setup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Advanced tracking & analytics</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-green-400">Guaranteed Results:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">50-100 qualified leads generated</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">₹5-15L sales potential in 90 days</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Money-back guarantee</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Direct platform billing transparency</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Weekly performance reports</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold mb-3">Timeline & Process:</h4>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h5 className="font-medium mb-1">Week 1-3</h5>
                    <p className="text-sm text-gray-400">Website development & launch</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h5 className="font-medium mb-1">Week 4-8</h5>
                    <p className="text-sm text-gray-400">Marketing campaigns launch & optimization</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h5 className="font-medium mb-1">Week 9-12</h5>
                    <p className="text-sm text-gray-400">Scale & performance optimization</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <span className="text-3xl font-bold text-white">{formatPrice('bundle', 'growth')}</span>
                  <span className="text-gray-400 ml-2">Complete Bundle Package</span>
                </div>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white mt-4 sm:mt-0"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in the Growth Website + Marketing bundle package."), '_blank')}
                >
                  Get Started Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Real results from real clients</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs mb-2">TV REPAIR</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Prime Home Club</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Mumbai/Pune</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Scaled to ₹5–8L/mo ad spend profitably with invalid-click defense and call optimization.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Invalid-click refunds</span>
                    <span className="text-sm font-semibold text-green-600">₹5L recovered</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Qualified calls/day</span>
                    <span className="text-sm font-semibold text-blue-600">50–70</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly ad spend</span>
                    <span className="text-sm font-semibold text-purple-600">₹5–8L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs mb-2">SAAS</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lomavis</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Germany</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Reduced CPST by 50% and scaled trials 5x with combined paid + SEO strategy.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">CPST reduction</span>
                    <span className="text-sm font-semibold text-green-600">€70→€30 (50%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly trials</span>
                    <span className="text-sm font-semibold text-blue-600">30→250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">SEO contribution</span>
                    <span className="text-sm font-semibold text-purple-600">20% of trials</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs mb-2">STEM EDUCATION</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Big BrainBox</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Dallas, USA</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Achieved 6x ROI with optimized lead funnel and 80%+ student recall rate.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">New students/month</span>
                    <span className="text-sm font-semibold text-green-600">30+ (4-6x growth)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Revenue ROI</span>
                    <span className="text-sm font-semibold text-blue-600">6x ($30K/$5K)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Student recall</span>
                    <span className="text-sm font-semibold text-purple-600">80%+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs mb-2">STARTUP CONSULTING</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">PlanThyBusiness</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">India</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Achieved 8-10x ROI with ₹350 CPL and 107% conversion growth in 6 months.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">CPL</span>
                    <span className="text-sm font-semibold text-green-600">₹350 ±50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Conversion growth</span>
                    <span className="text-sm font-semibold text-blue-600">+107%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">ROI</span>
                    <span className="text-sm font-semibold text-purple-600">8-10x</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs mb-2">TRANSPORT</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">NRK Travels</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Vizag</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Met ≤₹50 CPA target with call-only campaigns and invalid-click defense.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">CPA achieved</span>
                    <span className="text-sm font-semibold text-green-600">₹48/lead</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Phone calls (3mo)</span>
                    <span className="text-sm font-semibold text-blue-600">225</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Web conversions</span>
                    <span className="text-sm font-semibold text-purple-600">76</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="px-8 py-3"
              onClick={() => window.open(getWhatsAppURL("Hi! I'd like to see more case studies and success stories."), '_blank')}
            >
              View All Case Studies <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* On-Demand Hourly Experts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">On-Demand Hourly Experts</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Get expert help when you need it, billed hourly</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Figma Designer</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">$12/hr</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">UI/UX design, prototyping, design systems</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">WordPress Developer</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">$15/hr</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Custom themes, plugins, optimizations</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shopify Developer</h3>
                <div className="text-2xl font-bold text-purple-600 mb-2">$15/hr</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Store setup, customizations, apps</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-600 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance Marketing</h3>
                <div className="text-2xl font-bold text-orange-600 mb-2">$20/hr</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">PPC consultation, SEO audit, strategy</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hourly Policies</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Minimum Booking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">2-hour minimum for all bookings</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rush Jobs</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">≤24h delivery at 1.5× rate</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reporting</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Weekly timesheet shared</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button 
              className="bg-black hover:bg-gray-800 text-white px-8 py-3"
              onClick={() => window.open(getWhatsAppURL("Hi! I'm interested in booking hourly experts for my project."), '_blank')}
            >
              Book Expert Hours
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Trusted by businesses across industries</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                  "Digital Supremacy transformed our online presence completely. From a basic website to generating ₹25L+ in revenue 
                  within 8 months. Their transparent reporting and outcome-focused approach sets them apart."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Suresh Kumar</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">CEO, TechVenture Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                  "The best marketing investment we've made. Digital Supremacy team doesn't just run ads - they understand our 
                  business and optimize for real growth. Our ROAS improved by 180% in just 4 months."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">PM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Priya Mehta</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Founder, StyleCraft Fashion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">Governance for Scale</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                <h3 className="text-xl font-semibold">SLAs & Support</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Standard</h4>
                  <p className="text-sm text-gray-600">
                    Discovery: 24-48h, Creatives: Email & Slack
                    <br />
                    Reporting: Weekly calls & monthly deep-dives
                    <br />
                    SLA: Setup Team in 5-10 days
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Priority</h4>
                  <p className="text-sm text-gray-600">
                    Response: 4-8h, Creatives: Email, Slack,
                    <br />
                    WhatsApp calls & Zoom calls
                    <br />
                    SLA: Online Team in 24-48h
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                <h3 className="text-xl font-semibold">Reporting & Cadence</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Weekly KPI snapshots (leads, CPA, CPL, ROI)</p>
                <p>• Monthly strategy review + optimization log</p>
                <p>• Annual Scoreboard: GA4 + Google Ads + Meta Ads + CRM</p>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-green-600 rounded mr-3"></div>
                <h3 className="text-xl font-semibold">Scope, Terms & Risk Reversal</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• All spend is direct paid directly to platforms</p>
                <p>• 3 month money-back deals with $500 bounty</p>
                <p>• Quarterly budget allocation</p>
                <p>• Creative refresh (Facebook creative batches)</p>
                <p>• Quarterly Ads + Creative batches delivered</p>
                <p>• Performance-based pricing on the service center</p>
                <p>• Optional performance bonus tied to 15% CPL/CPA targets</p>
                <p>• Compliance: Ad + Policy Compliance + Creative Priority for governance</p>
                <p>• Compliance: All + Project Lead + Creative: Priority for governance</p>
                <p>• Compliance: All + Project Lead + Creative: Priority for governance</p>
                <p>• Compliance: All + Project Lead + Creative: Priority for governance</p>
                <p>• Compliance: All + Project Lead + Creative: Priority for governance</p>
                <p>• We benchmark for your success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Everything you need to know about our services</p>
          </div>

          <div className="space-y-6">
            {siteContent.faqs.map((faq, index) => (
              <Card key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 transition-colors">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Book a free consultation or get in touch with us</p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Let's Talk</h3>
                <p className="text-gray-600 mb-6">
                  Ready to scale your business? Book a free 30-minute consultation to discuss your goals and see how we can help.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <a href="tel:+919689473686" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+91 96894 73686</a>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri 9AM-6PM IST</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <a href="mailto:info@digitalsupremacy.in" className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@digitalsupremacy.in</a>
                      <div className="text-sm text-gray-600 dark:text-gray-400">We respond within 4 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">WhatsApp Support</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Quick responses 10AM-8PM</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Free Consultation Includes:</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Business & marketing goals assessment
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Current marketing audit & recommendations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Custom strategy proposal
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    Transparent pricing discussion
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'd like to book a free consultation."), '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open(getWhatsAppURL("Hi! I'd like to schedule a call to discuss my marketing needs."), '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Checklist */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">Onboarding Process</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Discovery Call</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Initial consultation to understand your business goals and requirements</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Setup & Access</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Account setup, access provisioning, and project documentation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 text-center transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Launch & Optimize</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Campaign launch within 48-72 hours with continuous optimization</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => window.open(getWhatsAppURL("Hi! I'd like to discuss getting started with Digital Supremacy."), '_blank')}
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span className="font-semibold text-lg">Digital Supremacy</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                We don't sell services. We deliver outcomes. Transparent, performance-driven marketing solutions that scale your business.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <a href="mailto:info@digitalsupremacy.in" className="text-gray-400 hover:text-white transition-colors">info@digitalsupremacy.in</a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <a href="tel:+919689473686" className="text-gray-400 hover:text-white transition-colors">+91 96894 73686</a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('websites')} className="block text-gray-400 hover:text-white transition-colors text-left">Website Development</button>
                <button onClick={() => scrollToSection('lead-gen')} className="block text-gray-400 hover:text-white transition-colors text-left">Lead Generation</button>
                <button onClick={() => scrollToSection('e-commerce')} className="block text-gray-400 hover:text-white transition-colors text-left">E-commerce Marketing</button>
                <button onClick={() => scrollToSection('bundle')} className="block text-gray-400 hover:text-white transition-colors text-left">Bundle Packages</button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('case-studies')} className="block text-gray-400 hover:text-white transition-colors text-left">Case Studies</button>
                <button onClick={() => scrollToSection('governance')} className="block text-gray-400 hover:text-white transition-colors text-left">Governance</button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors text-left">Contact</button>
                <button 
                  onClick={() => window.open(getWhatsAppURL("Hi! I'd like to know more about your privacy policy."), '_blank')}
                  className="block text-gray-400 hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => window.open(getWhatsAppURL("Hi! I'd like to know more about your terms of service."), '_blank')}
                  className="block text-gray-400 hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Digital Supremacy. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
                onClick={() => window.open(getWhatsAppURL(), '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
