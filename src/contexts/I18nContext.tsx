import { createContext, useContext, useMemo, useState } from "react";

export type Language = "en" | "hi" | "gu";

type TranslationValue = string | string[];

const translations: Record<Language, Record<string, TranslationValue>> = {
  en: {
    "lang.english": "English",
    "lang.hindi": "Hindi",
    "lang.gujarati": "Gujarati",
    "common.contactUs": "Contact Us",
    "common.startFreeTrial": "Start Free Trial",
    "common.bookDemo": "Book Demo",
    "common.noCard": "No credit card required • Setup in minutes",
    "header.home": "Home",
    "header.features": "Features",
    "header.howItWorks": "How It Works",
    "header.pricing": "Pricing",
    "header.clients": "Clients",
    "header.contact": "Contact",
    "header.selectLanguage": "Choose language",
    "header.darkMode": "Dark mode",
    "hero.badge": "Built for Catering Business Owners",
    "hero.titleTop": "Manage Your Entire Catering",
    "hero.titleBottom": "Business in One App",
    "hero.description":
      "From order booking to final invoice - manage events, payments, staff, utensils, and menus without Excel or paperwork.",
    "footer.ctaTitle": "Start Managing Your Catering Business Today",
    "footer.ctaDesc": "Simple, powerful, and built for catering owners.",
    "footer.startFreeNow": "Start Free Now",
    "notfound.title": "Oops! Page not found",
    "notfound.action": "Return to Home",
    "features.heading": "Everything You Need to Run Your Catering Business",
    "features.subtitle":
      "From order booking to final invoice — manage every part of your catering operations in one place.",
    "features.eventOrder.title": "Event & Order Management",
    "features.eventOrder.description":
      "Create and manage all your catering events with date, time, and location. Track past and upcoming bookings easily.",
    "features.payment.title": "Smart Payment Tracking",
    "features.payment.description":
      "Track partial payments effortlessly. Record every payment entry and always know how much is pending.",
    "features.menu.title": "Menu Management",
    "features.menu.description":
      "Create and manage your catering menus. Show menu options to customers with full item details.",
    "features.grocery.title": "Auto Grocery List",
    "features.grocery.description":
      "Automatically generate shopping lists based on selected menu items. Never miss any ingredient.",
    "features.utensil.title": "Utensil (Vasan) Management",
    "features.utensil.description":
      "Track utensils used in each event. Know what is available, in use, or damaged.",
    "features.staff.title": "Staff Management",
    "features.staff.description":
      "Assign staff to events and manage your workforce efficiently across multiple functions.",
    "features.estimation.title": "Instant Estimation",
    "features.estimation.description":
      "Generate quick cost estimates based on menu selection. Help customers decide faster.",
    "features.invoice.title": "Invoice Generation",
    "features.invoice.description":
      "Generate professional invoices automatically after completing events.",
    "features.calendar.title": "Calendar Overview",
    "features.calendar.description":
      "Get a complete view of all your events in one calendar. Never miss a booking.",
    "pricing.heading": "Simple, Transparent Pricing",
    "pricing.subtitle":
      "Start for free today. Upgrade anytime as your business grows.",
    "pricing.earlyAccessBadge": "🚀 Early Access",
    "pricing.earlyAccessPill": "Early Access",
    "pricing.starterPlan": "Starter Plan",
    "pricing.free": "Free",
    "pricing.availableEarlyAccess": "Available during early access",
    "pricing.planDescription":
      "Everything you need to manage your catering business in one place.",
    "pricing.specialPricingNote":
      "Early users will receive special pricing when plans are introduced.",
    "pricing.paidPlansNote": "Paid plans will be introduced in the future.",
    "pricing.planFeatures": [
      "Event & Order Management",
      "Smart Payment Tracking (Partial Payments)",
      "Menu Management",
      "Auto Grocery List",
      "Staff Management",
      "Utensil (Vasan) Tracking",
      "Estimation System",
      "Invoice Generation",
      "Calendar Overview",
    ],
    "howItWorks.eyebrow": "How it works",
    "howItWorks.heading": "Run Your Catering Business in 6 Simple Steps",
    "howItWorks.subtitle":
      "From creating an order to generating the final invoice — manage everything in one smooth workflow.",
    "howItWorks.createEvent.title": "Create Event",
    "howItWorks.createEvent.description":
      "Add a new catering event with date, time, location, and customer details.",
    "howItWorks.selectMenu.title": "Select Menu",
    "howItWorks.selectMenu.description":
      "Choose menu items for the event and customize based on customer needs.",
    "howItWorks.groceryList.title": "Auto Generate Grocery List",
    "howItWorks.groceryList.description":
      "Get a complete shopping list automatically based on selected menu items.",
    "howItWorks.assignStaff.title": "Assign Staff & Utensils",
    "howItWorks.assignStaff.description":
      "Allocate staff and track utensils (vasan) required for the event.",
    "howItWorks.trackPayments.title": "Track Payments",
    "howItWorks.trackPayments.description":
      "Record partial payments and keep track of pending amounts easily.",
    "howItWorks.generateInvoice.title": "Generate Invoice",
    "howItWorks.generateInvoice.description":
      "Create a professional invoice instantly after completing the event.",
    "footer.brandDescription":
      "All-in-one catering management software to manage orders, events, payments, staff, and operations.",
    "footer.builtForOwners": "Built for catering business owners",
    "footer.colProduct": "Product",
    "footer.colCompany": "Company",
    "footer.colSupport": "Support",
    "footer.faq": "FAQ",
    "footer.aboutUs": "About Us",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsAndConditions": "Terms & Conditions",
    "footer.termsShort": "Terms",
    "footer.helpSupport": "Help / Support",
    "footer.copyright": "© 2026 Katmitra. All rights reserved.",
    "footer.logoAlt": "Katmitra",
    "footer.ariaWhatsApp": "WhatsApp",
    "footer.ariaInstagram": "Instagram",
    "clients.heading": "Built for Catering Owners Like You",
    "clients.subtitle":
      "Designed to solve real problems faced by catering businesses.",
    "clients.trustPoints": [
      "Built for Indian Catering Businesses",
      "Designed for real-world use",
      "Simple & easy to use",
    ],
    "clients.eventsBadge": "500+ Events Managed",
    "benefits.heading": "Why choose KatMitra?",
    "benefits.subtitle":
      "Everything you need to run a successful catering business, all in one platform.",
    "benefits.timeCost.title": "Saves Time & Cost",
    "benefits.timeCost.description":
      "Automate repetitive tasks and reduce operational overhead significantly.",
    "benefits.orderMgmt.title": "Easy Order Management",
    "benefits.orderMgmt.description":
      "Handle multiple orders seamlessly with our intuitive dashboard.",
    "benefits.invoicing.title": "Professional Invoicing",
    "benefits.invoicing.description":
      "Generate beautiful invoices and quotations in seconds.",
    "benefits.customer.title": "Better Customer Experience",
    "benefits.customer.description":
      "Delight your clients with smooth communication and delivery.",
    "terms.pageTitle": "Terms & Conditions",
    "terms.welcome": "Welcome to KatMitra",
    "terms.intro":
      "By accessing and using KatMitra, you agree to these Terms and our Privacy Policy at https://www.katmitra.com/privacy-policy. Please read them carefully.",
    "terms.usePlatform.title": "Use of Platform",
    "terms.usePlatform.items": [
      "The platform must be used only for legal catering business operations.",
      "Users must not misuse or attempt unauthorized access to KatMitra services.",
    ],
    "terms.subscription.title": "Subscription & Payments",
    "terms.subscription.items": [
      "Plans can be upgraded, downgraded, or canceled anytime.",
      "All payments are non-refundable unless stated under a special agreement (Enterprise SLA).",
      "There are no hidden charges.",
    ],
    "terms.dataProtection.title": "Data Protection",
    "terms.dataProtection.items": [
      "User data is securely stored and encrypted in line with our Privacy Policy.",
      "KatMitra is not responsible for data loss caused by user negligence.",
      "If you distribute Katmitra through Google Play, your listing’s Data safety declarations must accurately reflect how the app handles user data.",
    ],
    "terms.support.title": "Support Services",
    "terms.support.items": [
      "Support is provided based on your active subscription plan.",
      "Enterprise users receive dedicated assistance and SLA-based support.",
    ],
    "terms.account.title": "Account Responsibility",
    "terms.account.items": [
      "You are responsible for keeping your login credentials confidential.",
      "Sharing accounts across unauthorized users may lead to termination.",
    ],
    "terms.availability.title": "Service Availability",
    "terms.availability.items": [
      "KatMitra strives for 99.9% uptime but does not guarantee uninterrupted service in cases of maintenance, updates, or technical failures.",
    ],
    "terms.termination.title": "Termination of Service",
    "terms.termination.items": [
      "KatMitra reserves the right to suspend or terminate accounts if users violate the terms.",
    ],
    "terms.updates.title": "Updates to Terms",
    "terms.updates.items": [
      "These terms may be updated periodically. Continued use means acceptance of revised terms.",
      "Material changes may also be communicated in the app or by email where appropriate.",
    ],
    "terms.privacyLink.title": "Privacy Policy & User Data",
    "terms.privacyLink.items": [
      "Our Privacy Policy at https://www.katmitra.com/privacy-policy explains what we collect, why we collect it, retention, sharing, and your choices.",
      "You must use the service in a way that is consistent with that policy and with Google Play’s Developer Program Policy and User Data policy when you publish or update the app.",
    ],
    "terms.intellectualProperty.title": "Intellectual Property",
    "terms.intellectualProperty.items": [
      "Katmitra’s name, branding, software, documentation, and user interface are protected by applicable intellectual property laws.",
      "You receive a limited, non-exclusive licence to use the platform for your internal catering business operations. You may not copy, modify, distribute, sell, reverse engineer, or attempt to extract source code except where mandatory law allows.",
    ],
    "terms.userContent.title": "Your Data & Customer Information",
    "terms.userContent.items": [
      "You are responsible for information you enter into Katmitra, including personal data about your customers or staff. You must have a lawful basis (such as consent or contract) to store that data in the service.",
      "You retain ownership of your business data; you grant Katmitra a licence to host, process, back up, and display it solely to provide the service to you.",
    ],
    "terms.governingLaw.title": "Governing Law & Disputes",
    "terms.governingLaw.items": [
      "These Terms are governed by the laws of India, without regard to conflict-of-law rules, except where prohibited by mandatory laws of your country of residence.",
      "Courts at Ahmedabad, Gujarat, India shall have exclusive jurisdiction for disputes arising from these Terms, subject to any non-waivable consumer rights where you live.",
    ],
    "terms.contactHeading": "Contact for Policy Queries",
    "terms.emailLabel": "Email",
    "terms.phoneLabel": "Phone",
    "privacy.pageTitle": "Privacy Policy",
    "privacy.intro":
      "This Privacy Policy explains how Katmitra (“we”, “us”) collects, uses, stores, and shares information when you use our website at katmitra.com and the Katmitra mobile application (including versions distributed on Google Play). By using our services, you acknowledge this policy.",
    "privacy.effectiveDate": "Effective date: 20 May 2026",
    "privacy.controller.title": "1. Who Is Responsible",
    "privacy.controller.items": [
      "Katmitra operates the Katmitra website and apps. The data controller for personal information collected through the services is Katmitra (contact details are at the end of this page).",
      "If you install the app from Google Play, Google may also process certain information as described in Google’s policies; we do not control Google’s processing.",
    ],
    "privacy.collect.title": "2. Information We Collect",
    "privacy.collect.items": [
      "Identifiers and account data: name, email address, phone number, credentials (for example passwords stored using industry-standard hashing where applicable), and business profile details when you register or update your profile.",
      "Content you create: events, orders, quotations, menu items, inventory-related information, payment tracking entries you record, staff assignments, customer names and contact details you choose to store, files or images you upload, and support messages.",
      "Technical and security data: device type, operating system version, app version, IP address, approximate timestamps of requests, authentication tokens, and diagnostic or error information needed to secure accounts and troubleshoot issues.",
      "Website contact form submissions: name, email, phone number, and message.",
    ],
    "privacy.use.title": "3. How We Use Your Information",
    "privacy.use.items": [
      "To perform our contract with you: create and manage your account, authenticate users, sync and store your operational data, and provide catering management features.",
      "For legitimate interests: operate and improve Katmitra, maintain security, prevent fraud and abuse, measure reliability (including limited analytics or crash/error reporting if present in the product), and send service-related notices.",
      "To comply with legal obligations and respond to lawful requests from authorities where applicable.",
    ],
    "privacy.permissions.title": "4. Device Permissions & Notifications (Mobile App)",
    "privacy.permissions.items": [
      "The app requests permissions only where needed for a feature you use (for example camera or photo library to upload images, notifications for reminders or alerts, storage where required to export or cache files).",
      "You can grant or deny many permissions in your device settings; denying a permission may limit related features. If push notifications are enabled, a push token may be processed by our notification provider to deliver messages.",
    ],
    "privacy.storage.title": "5. Storage & Security",
    "privacy.storage.items": [
      "We apply technical and organisational measures suited to the risk, including encryption in transit (such as HTTPS/TLS) and safeguards for databases and backups.",
      "Some data may be stored locally on your device (for example cached content or preferences). No method of storage or transmission is completely risk-free—use a strong unique password and protect your device.",
      "If we experience a personal data breach that requires notification under applicable law, we will take steps to inform affected users and regulators as required.",
    ],
    "privacy.sharing.title": "6. Sharing & Processors",
    "privacy.sharing.items": [
      "We do not sell your personal information.",
      "We use vetted service providers for hosting, email delivery, push notifications, payment processing where applicable, and security or diagnostics; they may process personal data only on our instructions under appropriate confidentiality and security terms.",
      "We may disclose information if required by law, court order, or to protect the rights, safety, and security of users, Katmitra, or the public.",
    ],
    "privacy.retention.title": "7. Data Retention",
    "privacy.retention.items": [
      "We retain data for as long as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements.",
      "Retention periods vary by data type and legal requirements. Backup copies may persist for a limited period after deletion before being overwritten.",
    ],
    "privacy.rights.title": "8. Your Rights & Account Deletion",
    "privacy.rights.items": [
      "You can access and update certain account and business information in the app where available.",
      "You may request correction of inaccurate information or ask questions about processing by contacting us using the details below.",
      "You may request account closure and deletion or anonymisation of personal data we hold, subject to legal retention needs (such as tax, accounting, or dispute records). We will respond within a reasonable period after verifying your identity.",
      "Depending on your location, you may have additional statutory privacy rights; we will honour requests in line with applicable law.",
    ],
    "privacy.international.title": "9. International Transfers",
    "privacy.international.items": [
      "Our primary operations and servers may be located in India or other regions where our hosting partners operate.",
      "If personal data is transferred across borders, we implement safeguards required by applicable law.",
    ],
    "privacy.children.title": "10. Children’s Privacy",
    "privacy.children.items": [
      "Katmitra is not directed at children under 13 (or the minimum age required by local law), and we do not knowingly collect personal data from children for those audiences.",
      "If you believe a child has provided personal data, contact us and we will take steps to delete such information where appropriate.",
    ],
    "privacy.updates.title": "11. Updates to This Policy",
    "privacy.updates.items": [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date.",
      "For material changes affecting mobile users, we may also provide notice in the app or by email where appropriate.",
    ],
  },
  hi: {
    "lang.english": "अंग्रेज़ी",
    "lang.hindi": "हिंदी",
    "lang.gujarati": "गुजराती",
    "common.contactUs": "संपर्क करें",
    "common.startFreeTrial": "फ्री ट्रायल शुरू करें",
    "common.bookDemo": "डेमो बुक करें",
    "common.noCard": "क्रेडिट कार्ड की जरूरत नहीं • मिनटों में सेटअप",
    "header.home": "होम",
    "header.features": "फीचर्स",
    "header.howItWorks": "यह कैसे काम करता है",
    "header.pricing": "प्राइसिंग",
    "header.clients": "क्लाइंट्स",
    "header.contact": "संपर्क",
    "header.selectLanguage": "भाषा चुनें",
    "header.darkMode": "डार्क मोड",
    "hero.badge": "कैटरिंग बिज़नेस मालिकों के लिए बनाया गया",
    "hero.titleTop": "अपने पूरे कैटरिंग बिज़नेस को",
    "hero.titleBottom": "एक ही ऐप में संभालें",
    "hero.description":
      "ऑर्डर बुकिंग से अंतिम इनवॉइस तक - इवेंट्स, पेमेंट्स, स्टाफ, बर्तन और मेनू बिना एक्सेल या कागज़ी काम के मैनेज करें।",
    "footer.ctaTitle": "आज ही अपना कैटरिंग बिज़नेस मैनेज करना शुरू करें",
    "footer.ctaDesc": "साधारण, शक्तिशाली, और खास कैटरिंग मालिकों के लिए।",
    "footer.startFreeNow": "अभी फ्री शुरू करें",
    "notfound.title": "ओह! पेज नहीं मिला",
    "notfound.action": "होम पर वापस जाएं",
    "features.heading": "आपके कैटरिंग बिज़नेस के लिए ज़रूरी हर सुविधा",
    "features.subtitle":
      "ऑर्डर बुकिंग से अंतिम इनवॉइस तक — अपने कैटरिंग ऑपरेशंस को एक जगह मैनेज करें।",
    "features.eventOrder.title": "इवेंट और ऑर्डर मैनेजमेंट",
    "features.eventOrder.description":
      "तारीख, समय और स्थान के साथ अपने सभी कैटरिंग इवेंट्स बनाएं और मैनेज करें। पिछली और आगामी बुकिंग आसानी से ट्रैक करें।",
    "features.payment.title": "स्मार्ट पेमेंट ट्रैकिंग",
    "features.payment.description":
      "आंशिक भुगतान आसानी से ट्रैक करें। हर भुगतान दर्ज करें और हमेशा जानें कितना बाकी है।",
    "features.menu.title": "मेनू मैनेजमेंट",
    "features.menu.description":
      "अपने कैटरिंग मेनू बनाएं और मैनेज करें। ग्राहकों को पूरी आइटम जानकारी के साथ मेनू विकल्प दिखाएं।",
    "features.grocery.title": "ऑटो किराना सूची",
    "features.grocery.description":
      "चुने गए मेनू आइटम के आधार पर खरीदारी सूची स्वचालित बनाएं। कोई सामग्री न छूटे।",
    "features.utensil.title": "बर्तन (वासन) मैनेजमेंट",
    "features.utensil.description":
      "हर इवेंट में उपयोग किए बर्तन ट्रैक करें। जानें क्या उपलब्ध है, उपयोग में है या खराब है।",
    "features.staff.title": "स्टाफ मैनेजमेंट",
    "features.staff.description":
      "इवेंट्स में स्टाफ असाइन करें और कई फंक्शनों में अपने कार्यबल को कुशलता से मैनेज करें।",
    "features.estimation.title": "तुरंत अनुमान",
    "features.estimation.description":
      "मेनू चयन के आधार पर त्वरित लागत अनुमान बनाएं। ग्राहकों को तेजी से निर्णय लेने में मदद करें।",
    "features.invoice.title": "इनवॉइस जेनरेशन",
    "features.invoice.description":
      "इवेंट पूर्ण होने के बाद स्वचालित रूप से प्रोफेशनल इनवॉइस बनाएं।",
    "features.calendar.title": "कैलेंडर ओवरव्यू",
    "features.calendar.description":
      "एक कैलेंडर में अपने सभी इवेंट्स का पूरा दृश्य पाएं। कोई बुकिंग न छूटे।",
    "pricing.heading": "सरल और पारदर्शी प्राइसिंग",
    "pricing.subtitle":
      "आज ही मुफ्त में शुरू करें। आपका बिज़नेस बढ़े तो कभी भी अपग्रेड करें।",
    "pricing.earlyAccessBadge": "🚀 अर्ली एक्सेस",
    "pricing.earlyAccessPill": "अर्ली एक्सेस",
    "pricing.starterPlan": "स्टार्टर प्लान",
    "pricing.free": "मुफ्त",
    "pricing.availableEarlyAccess": "अर्ली एक्सेस के दौरान उपलब्ध",
    "pricing.planDescription":
      "अपने कैटरिंग बिज़नेस को एक जगह मैनेज करने के लिए ज़रूरी सब कुछ।",
    "pricing.specialPricingNote":
      "प्लान लॉन्च होने पर अर्ली यूज़र्स को विशेष प्राइसिंग मिलेगी।",
    "pricing.paidPlansNote": "भविष्य में पेड प्लान पेश किए जाएंगे।",
    "pricing.planFeatures": [
      "इवेंट और ऑर्डर मैनेजमेंट",
      "स्मार्ट पेमेंट ट्रैकिंग (आंशिक भुगतान)",
      "मेनू मैनेजमेंट",
      "ऑटो किराना सूची",
      "स्टाफ मैनेजमेंट",
      "बर्तन (वासन) ट्रैकिंग",
      "अनुमान सिस्टम",
      "इनवॉइस जेनरेशन",
      "कैलेंडर ओवरव्यू",
    ],
    "howItWorks.eyebrow": "यह कैसे काम करता है",
    "howItWorks.heading": "6 आसान स्टेप्स में अपना कैटरिंग बिज़नेस चलाएं",
    "howItWorks.subtitle":
      "ऑर्डर बनाने से अंतिम इनवॉइस तक — सब कुछ एक सहज वर्कफ़्लो में मैनेज करें।",
    "howItWorks.createEvent.title": "इवेंट बनाएं",
    "howItWorks.createEvent.description":
      "तारीख, समय, स्थान और ग्राहक विवरण के साथ नया कैटरिंग इवेंट जोड़ें।",
    "howItWorks.selectMenu.title": "मेनू चुनें",
    "howItWorks.selectMenu.description":
      "इवेंट के लिए मेनू आइटम चुनें और ग्राहक की जरूरत के अनुसार कस्टमाइज़ करें।",
    "howItWorks.groceryList.title": "ऑटो किराना सूची बनाएं",
    "howItWorks.groceryList.description":
      "चुने गए मेनू आइटम के आधार पर पूरी खरीदारी सूची स्वचालित पाएं।",
    "howItWorks.assignStaff.title": "स्टाफ और बर्तन असाइन करें",
    "howItWorks.assignStaff.description":
      "इवेंट के लिए स्टाफ आवंटित करें और बर्तन (वासन) ट्रैक करें।",
    "howItWorks.trackPayments.title": "भुगतान ट्रैक करें",
    "howItWorks.trackPayments.description":
      "आंशिक भुगतान दर्ज करें और बाकी राशि आसानी से ट्रैक करें।",
    "howItWorks.generateInvoice.title": "इनवॉइस बनाएं",
    "howItWorks.generateInvoice.description":
      "इवेंट पूर्ण होने के बाद तुरंत प्रोफेशनल इनवॉइस बनाएं।",
    "footer.brandDescription":
      "ऑर्डर, इवेंट, भुगतान, स्टाफ और संचालन के लिए ऑल-इन-वन कैटरिंग मैनेजमेंट सॉफ़्टवेयर।",
    "footer.builtForOwners": "कैटरिंग बिज़नेस मालिकों के लिए बनाया गया",
    "footer.colProduct": "प्रोडक्ट",
    "footer.colCompany": "कंपनी",
    "footer.colSupport": "सहायता",
    "footer.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "footer.aboutUs": "हमारे बारे में",
    "footer.privacyPolicy": "प्राइवेसी पॉलिसी",
    "footer.termsAndConditions": "नियम और शर्तें",
    "footer.termsShort": "नियम",
    "footer.helpSupport": "मदद / सहायता",
    "footer.copyright": "© 2026 Katmitra. सर्वाधिकार सुरक्षित।",
    "footer.logoAlt": "Katmitra",
    "footer.ariaWhatsApp": "WhatsApp",
    "footer.ariaInstagram": "Instagram",
    "clients.heading": "आप जैसे कैटरिंग मालिकों के लिए बनाया गया",
    "clients.subtitle":
      "कैटरिंग बिज़नेस की असली समस्याओं को हल करने के लिए डिज़ाइन किया गया।",
    "clients.trustPoints": [
      "भारतीय कैटरिंग बिज़नेस के लिए बनाया गया",
      "वास्तविक उपयोग के लिए डिज़ाइन",
      "सरल और आसान उपयोग",
    ],
    "clients.eventsBadge": "500+ इवेंट मैनेज किए गए",
    "benefits.heading": "KatMitra क्यों चुनें?",
    "benefits.subtitle":
      "सफल कैटरिंग बिज़नेस चलाने के लिए जरूरी सब कुछ, एक ही प्लेटफॉर्म में।",
    "benefits.timeCost.title": "समय और लागत की बचत",
    "benefits.timeCost.description":
      "दोहराए जाने वाले कामों को ऑटोमेट करें और परिचालन लागत काफी कम करें।",
    "benefits.orderMgmt.title": "आसान ऑर्डर मैनेजमेंट",
    "benefits.orderMgmt.description":
      "हमारे सहज डैशबोर्ड के साथ कई ऑर्डर आसानी से संभालें।",
    "benefits.invoicing.title": "प्रोफेशनल इनवॉयसिंग",
    "benefits.invoicing.description":
      "सेकंडों में सुंदर इनवॉइस और कोटेशन बनाएं।",
    "benefits.customer.title": "बेहतर ग्राहक अनुभव",
    "benefits.customer.description":
      "सुचारू संवाद और डिलिवरी से अपने ग्राहकों को खुश रखें।",
    "terms.pageTitle": "नियम और शर्तें",
    "terms.welcome": "KatMitra में आपका स्वागत है",
    "terms.intro":
      "KatMitra का उपयोग करके आप इन नियमों और हमारी गोपनीयता नीति https://www.katmitra.com/privacy-policy से सहमत होते हैं। कृपया इन्हें ध्यान से पढ़ें।",
    "terms.usePlatform.title": "प्लेटफॉर्म का उपयोग",
    "terms.usePlatform.items": [
      "प्लेटफॉर्म का उपयोग केवल कानूनी कैटरिंग व्यवसाय संचालन के लिए होना चाहिए।",
      "उपयोगकर्ता KatMitra सेवाओं का दुरुपयोग या अनधिकृत पहुंच का प्रयास न करें।",
    ],
    "terms.subscription.title": "सदस्यता और भुगतान",
    "terms.subscription.items": [
      "प्लान कभी भी अपग्रेड, डाउनग्रेड या रद्द किए जा सकते हैं।",
      "विशेष समझौते (Enterprise SLA) में उल्लिखित होने के अलावा सभी भुगतान गैर-वापसी योग्य हैं।",
      "कोई छुपे शुल्क नहीं हैं।",
    ],
    "terms.dataProtection.title": "डेटा सुरक्षा",
    "terms.dataProtection.items": [
      "उपयोगकर्ता डेटा हमारी गोपनीयता नीति के अनुरूप सुरक्षित रूप से संग्रहीत और एन्क्रिप्टेड है।",
      "उपयोगकर्ता की लापरवाही से हुए डेटा हानि के लिए KatMitra ज़िम्मेदार नहीं है।",
      "यदि आप Katmitra को Google Play पर प्रकाशित करते हैं, तो आपकी Data safety घोषणाएँ सटीक रूप से बताएँ कि ऐप उपयोगकर्ता डेटा कैसे संभालता है।",
    ],
    "terms.support.title": "सहायता सेवाएं",
    "terms.support.items": [
      "सहायता आपके सक्रिय सदस्यता प्लान के आधार पर दी जाती है।",
      "Enterprise उपयोगकर्ताओं को समर्पित सहायता और SLA-आधारित सहायता मिलती है।",
    ],
    "terms.account.title": "खाते की जिम्मेदारी",
    "terms.account.items": [
      "अपने लॉगिन विवरण गोपनीय रखना आपकी जिम्मेदारी है।",
      "अनधिकृत उपयोगकर्ताओं के साथ खाता साझा करने पर सेवा समाप्ति हो सकती है।",
    ],
    "terms.availability.title": "सेवा उपलब्धता",
    "terms.availability.items": [
      "KatMitra 99.9% अपटाइम का लक्ष्य रखता है, लेकिन रखरखाव, अपडेट या तकनीकी खराबी की स्थिति में निर्बाध सेवा की गारंटी नहीं देता।",
    ],
    "terms.termination.title": "सेवा समाप्ति",
    "terms.termination.items": [
      "यदि उपयोगकर्ता नियमों का उल्लंघन करते हैं तो KatMitra खाते निलंबित या समाप्त करने का अधिकार सुरक्षित रखता है।",
    ],
    "terms.updates.title": "नियमों में अपडेट",
    "terms.updates.items": [
      "ये नियम समय-समय पर अपडेट किए जा सकते हैं। निरंतर उपयोग का अर्थ संशोधित नियमों की स्वीकृति है।",
      "महत्वपूर्ण बदलाव ऐप या ईमेल के माध्यम से भी सूचित किए जा सकते हैं, जहाँ उपयुक्त हो।",
    ],
    "terms.privacyLink.title": "गोपनीयता नीति और उपयोगकर्ता डेटा",
    "terms.privacyLink.items": [
      "https://www.katmitra.com/privacy-policy पर हमारी गोपनीयता नीति बताती है कि हम क्या एकत्र करते हैं, क्यों, कितने समय तक रखते हैं, साझा करना और आपके विकल्प।",
      "आपको सेवा का उपयोग उस नीति और Google Play के डेवलपर कार्यक्रम नीति व उपयोगकर्ता डेटा नीति के अनुरूप करना चाहिए जब आप ऐप प्रकाशित या अपडेट करते हैं।",
    ],
    "terms.intellectualProperty.title": "बौद्धिक संपदा",
    "terms.intellectualProperty.items": [
      "KatMitra का नाम, ब्रांडिंग, सॉफ़्टवेयर, दस्तावेज़ और उपयोगकर्ता इंटरफ़ेस लागू बौद्धिक संपदा कानूनों से सुरक्षित हैं।",
      "आपको अपने आंतरिक कैटरिंग व्यवसाय संचालन के लिए सीमित, गैर-विशिष्ट लाइसेंस मिलता है। जब तक अनिवार्य कानून अनुमति न दे, आप सेवा की प्रतिलिपि, संशोधन, वितरण, बिक्री, रिवर्स इंजीनियरिंग या स्रोत कोड निकालने का प्रयास न करें।",
    ],
    "terms.userContent.title": "आपका डेटा और ग्राहक जानकारी",
    "terms.userContent.items": [
      "KatMitra में आपके द्वारा दर्ज की गई जानकारी, जिसमें आपके ग्राहकों या स्टाफ के बारे में व्यक्तिगत डेटा शामिल है, के लिए आप जिम्मेदार हैं। सेवा में उस डेटा को संग्रहीत करने के लिए आपके पास कानूनी आधार (जैसे सहमति या अनुबंध) होना चाहिए।",
      "आपके व्यावसायिक डेटा का स्वामित्व आपके पास रहता है; आप KatMitra को केवल आपको सेवा प्रदान करने के लिए होस्ट, प्रक्रिया, बैकअप और प्रदर्शित करने का लाइसेंस देते हैं।",
    ],
    "terms.governingLaw.title": "शासी कानून और विवाद",
    "terms.governingLaw.items": [
      "इन नियमों पर भारत के कानून लागू होते हैं, आपके निवास देश के अनिवार्य उपभोक्ता कानूनों को छोड़कर संघर्ष-कानून नियम लागू नहीं होंगे।",
      "इन नियमों से उत्पन्न विवादों के लिए अहमदाबाद, गुजरात, भारत की अदालतों का विशेष क्षेत्राधिकार होगा, बशर्ते आपके पास जहाँ आप रहते हैं वहाँ अनिवार्य अधिकार हों।",
    ],
    "terms.contactHeading": "नीति संबंधी प्रश्नों के लिए संपर्क",
    "terms.emailLabel": "ईमेल",
    "terms.phoneLabel": "फोन",
    "privacy.pageTitle": "गोपनीयता नीति",
    "privacy.intro":
      "यह गोपनीयता नीति बताती है कि Katmitra (“हम”) जब आप katmitra.com वेबसाइट और Katmitra मोबाइल एप्लिकेशन (Google Play सहित वितरित संस्करण) का उपयोग करते हैं तो जानकारी कैसे एकत्र, उपयोग, संग्रहीत और साझा करता है। सेवाओं का उपयोग करके आप इस नीति को स्वीकार करते हैं।",
    "privacy.effectiveDate": "प्रभावी तारीख: 20 मई 2026",
    "privacy.controller.title": "1. जिम्मेदार कौन है",
    "privacy.controller.items": [
      "Katmitra वेबसाइट और ऐप संचालित करता है। सेवाओं के माध्यम से एकत्र व्यक्तिगत जानकारी के लिए डेटा नियंत्रक Katmitra है (संपर्क इस पृष्ठ के अंत में)।",
      "यदि आप ऐप Google Play से इंस्टॉल करते हैं, तो Google की नीतियों के अनुसार Google भी कुछ जानकारी संसाधित कर सकता है; हम Google के संसाधन को नियंत्रित नहीं करते।",
    ],
    "privacy.collect.title": "2. जो जानकारी हम एकत्र करते हैं",
    "privacy.collect.items": [
      "पहचानकर्ता और खाता डेटा: नाम, ईमेल, फोन, क्रेडेंशियल (जहाँ लागू हो उद्योग-मानक हैशिंग के साथ पासवर्ड), और पंजीकरण या प्रोफ़ाइल अपडेट पर व्यावसायिक विवरण।",
      "आपके द्वारा बनाई सामग्री: इवेंट, ऑर्डर, कोटेशन, मेनू आइटम, इन्वेंटरी संबंधी जानकारी, आपके द्वारा दर्ज भुगतान ट्रैकिंग, स्टाफ असाइनमेंट, आपके द्वारा संग्रहीत ग्राहक नाम और संपर्क, अपलोड की गई फ़ाइलें या छवियाँ, और सहायता संदेश।",
      "तकनीकी और सुरक्षा डेटा: डिवाइस प्रकार, OS संस्करण, ऐप संस्करण, IP पता, अनुरोधों के लगभग समय, प्रमाणीकरण टोकन, और खातों को सुरक्षित रखने व समस्या निवारण के लिए आवश्यक निदान या त्रुटि जानकारी।",
      "वेबसाइट संपर्क फॉर्म: नाम, ईमेल, फोन और संदेश।",
    ],
    "privacy.use.title": "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
    "privacy.use.items": [
      "आपके साथ अनुबंध निभाने के लिए: खाता बनाना और प्रबंधित करना, उपयोगकर्ताओं को प्रमाणित करना, आपके परिचालन डेटा को सिंक और संग्रहीत करना, और कैटरिंग प्रबंधन सुविधाएँ प्रदान करना।",
      "वैध हितों के लिए: Katmitra संचालित और सुधारना, सुरक्षा बनाए रखना, धोखाधड़ी व दुरुपयोग रोकना, विश्वसनीयता मापना (उत्पाद में सीमित विश्लेषण या क्रैश/त्रुटि रिपोर्टिंग यदि मौजूद हो), और सेवा संबंधी सूचनाएँ भेजना।",
      "कानूनी दायित्वों का पालन करना और जहाँ लागू हो अधिकारियों के वैध अनुरोधों का जवाब देना।",
    ],
    "privacy.permissions.title": "4. डिवाइस अनुमतियाँ और सूचनाएँ (मोबाइल ऐप)",
    "privacy.permissions.items": [
      "ऐप केवल उस सुविधा के लिए अनुमतियाँ मांगता है जिसका आप उपयोग करते हैं (उदाहरण: छवि अपलोड के लिए कैमरा या फ़ोटो लाइब्रेरी, रिमाइंडर के लिए सूचनाएँ, निर्यात या कैश के लिए संग्रहण)।",
      "आप डिवाइस सेटिंग्स में कई अनुमतियाँ दे या अस्वीकार कर सकते हैं; अस्वीकार करने पर संबंधित सुविधाएँ सीमित हो सकती हैं। पुश सूचनाएँ सक्षम होने पर संदेश देने के लिए पुश टोकन हमारे सूचना प्रदाता द्वारा संसाधित हो सकता है।",
    ],
    "privacy.storage.title": "5. संचय और सुरक्षा",
    "privacy.storage.items": [
      "हम जोखिम के अनुरूप तकनीकी और संगठनात्मक उपाय लागू करते हैं, जिसमें संचरण में एन्क्रिप्शन (जैसे HTTPS/TLS) और डेटाबेस व बैकअप सुरक्षा शामिल है।",
      "कुछ डेटा आपके डिवाइस पर स्थानीय रूप से संग्रहीत हो सकता है (जैसे कैश या प्राथमिकताएँ)। कोई भी विधि पूर्णतया जोखिम-मुक्त नहीं—मजबूत अद्वितीय पासवर्ड का उपयोग करें और अपने डिवाइस की सुरक्षा करें।",
      "यदि लागू कानून के तहत सूचना आवश्यक व्यक्तिगत डेटा उल्लंघन होता है, तो हम प्रभावित उपयोगकर्ताओं और नियामकों को आवश्यकतानुसार सूचित करने के कदम उठाएंगे।",
    ],
    "privacy.sharing.title": "6. साझाकरण और प्रोसेसर",
    "privacy.sharing.items": [
      "हम आपकी व्यक्तिगत जानकारी नहीं बेचते।",
      "हम होस्टिंग, ईमेल वितरण, पुश सूचनाएँ, जहाँ लागू हो भुगतान प्रसंस्करण, और सुरक्षा या निदान के लिए जाँचे गए सेवा प्रदाताओं का उपयोग करते हैं; वे उपयुक्त गोपनीयता और सुरक्षा शर्तों के तहत केवल हमारे निर्देशों पर व्यक्तिगत डेटा संसाधित कर सकते हैं।",
      "कानून, अदालती आदेश की आवश्यकता होने पर, या उपयोगकर्ताओं, KatMitra, या जनता के अधिकारों, सुरक्षा की रक्षा के लिए हम जानकारी प्रकट कर सकते हैं।",
    ],
    "privacy.retention.title": "7. डेटा प्रतिधारण",
    "privacy.retention.items": [
      "हम डेटा तब तक रखते हैं जब तक सेवाएँ प्रदान करने, कानूनी बाध्यता, विवाद सुलझाने और करार लागू करने की आवश्यकता हो।",
      "प्रतिधारण अवधि डेटा प्रकार और कानूनी आवश्यकता के अनुसार भिन्न हो सकती है। हटाने के बाद बैकअप प्रतियाँ अधिलेखित होने से पहले सीमित समय तक रह सकती हैं।",
    ],
    "privacy.rights.title": "8. आपके अधिकार और खाता हटाना",
    "privacy.rights.items": [
      "जहाँ उपलब्ध हो, आप ऐप में कुछ खाता और व्यावसायिक जानकारी देख और अपडेट कर सकते हैं।",
      "गलत जानकारी सुधारने या प्रसंस्करण के बारे में प्रश्न पूछने के लिए नीचे दिए विवरण से संपर्क करें।",
      "आप खाता बंद करने और हमारे पास व्यक्तिगत डेटा हटाने या गुमनाम करने का अनुरोध कर सकते हैं, कर संबंधी, लेखांकन या विवाद रिकॉर्ड जैसी कानूनी प्रतिधारण आवश्यकताओं के अधीन। पहचान सत्यापन के बाद हम उचित समय में जवाब देंगे।",
      "आपके स्थान के अनुसार आपके पास अतिरिक्त वैधानिक गोपनीयता अधिकार हो सकते हैं; हम लागू कानून के अनुरूप अनुरोधों का सम्मान करेंगे।",
    ],
    "privacy.international.title": "9. अंतर्राष्ट्रीय स्थानांतरण",
    "privacy.international.items": [
      "हमारे प्राथमिक संचालन और सर्वर भारत या हमारे होस्टिंग भागीदारों के अन्य क्षेत्रों में हो सकते हैं।",
      "यदि व्यक्तिगत डेटा सीमाओं के पार स्थानांतरित होता है, तो हम लागू कानून द्वारा आवश्यक सुरक्षा उपाय लागू करते हैं।",
    ],
    "privacy.children.title": "10. बच्चों की गोपनीयता",
    "privacy.children.items": [
      "KatMitra 13 वर्ष से कम आयु (या स्थानीय कानून द्वारा न्यूनतम आयु) के बच्चों के लिए निर्देशित नहीं है, और हम जानबूझकर उन दर्शकों से बच्चों का व्यक्तिगत डेटा एकत्र नहीं करते।",
      "यदि आपको लगता है कि किसी बच्चे ने व्यक्तिगत डेटा प्रदान किया है, तो हमसे संपर्क करें और हम उपयुक्त स्थानों पर ऐसी जानकारी हटाने के कदम उठाएंगे।",
    ],
    "privacy.updates.title": "11. इस नीति में अपडेट",
    "privacy.updates.items": [
      "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। अपडेट किया संस्करण संशोधित प्रभावी तारीख के साथ इस पृष्ठ पर पोस्ट किया जाएगा।",
      "मोबाइल उपयोगकर्ताओं को प्रभावित करने वाले महत्वपूर्ण बदलावों के लिए हम ऐप या ईमेल के माध्यम से भी सूचना दे सकते हैं, जहाँ उपयुक्त हो।",
    ],
  },
  gu: {
    "lang.english": "અંગ્રેજી",
    "lang.hindi": "હિન્દી",
    "lang.gujarati": "ગુજરાતી",
    "common.contactUs": "સંપર્ક કરો",
    "common.startFreeTrial": "ફ્રી ટ્રાયલ શરૂ કરો",
    "common.bookDemo": "ડેમો બુક કરો",
    "common.noCard": "ક્રેડિટ કાર્ડ જરૂરી નથી • મિનિટોમાં સેટઅપ",
    "header.home": "હોમ",
    "header.features": "ફીચર્સ",
    "header.howItWorks": "કેવી રીતે કામ કરે છે",
    "header.pricing": "પ્રાઇસિંગ",
    "header.clients": "ક્લાયન્ટ્સ",
    "header.contact": "સંપર્ક",
    "header.selectLanguage": "ભાષા પસંદ કરો",
    "header.darkMode": "ડાર્ક મોડ",
    "hero.badge": "કેટરિંગ બિઝનેસ માલિકો માટે બનાવેલ",
    "hero.titleTop": "તમારો સમગ્ર કેટરિંગ બિઝનેસ",
    "hero.titleBottom": "એક જ એપમાં મેનેજ કરો",
    "hero.description":
      "ઓર્ડર બુકિંગથી અંતિમ ઇન્વોઇસ સુધી - ઇવેન્ટ, પેમેન્ટ, સ્ટાફ, વાસણ અને મેનુ Excel કે પેપરવર્ક વગર મેનેજ કરો.",
    "footer.ctaTitle": "આજે જ તમારો કેટરિંગ બિઝનેસ મેનેજ કરવાનું શરૂ કરો",
    "footer.ctaDesc": "સરળ, શક્તિશાળી અને કેટરિંગ માલિકો માટે બનાવેલ.",
    "footer.startFreeNow": "હવે ફ્રી શરૂ કરો",
    "notfound.title": "અરે! પેજ મળ્યો નથી",
    "notfound.action": "હોમ પર પાછા જાઓ",
    "features.heading": "તમારા કેટરિંગ બિઝનેસ માટે જરૂરી દરેક સુવિધા",
    "features.subtitle":
      "ઓર્ડર બુકિંગથી અંતિમ ઇન્વોઇસ સુધી — તમારું કેટરિંગ ઓપરેશન એક જ જગ્યાએ મેનેજ કરો.",
    "features.eventOrder.title": "ઇવેન્ટ અને ઓર્ડર મેનેજમેન્ટ",
    "features.eventOrder.description":
      "તારીખ, સમય અને સ્થળ સાથે તમારા બધા કેટરિંગ ઇવેન્ટ્સ બનાવો અને મેનેજ કરો. ભૂતકાળ અને આગામી બુકિંગ સરળતાથી ટ્રૅક કરો.",
    "features.payment.title": "સ્માર્ટ પેમેન્ટ ટ્રૅકિંગ",
    "features.payment.description":
      "આંશિક ચુકવણી સરળતાથી ટ્રૅક કરો. દરેક ચુકવણી નોંધો અને બાકી રકમ હંમેશા જાણો.",
    "features.menu.title": "મેનૂ મેનેજમેન્ટ",
    "features.menu.description":
      "તમારા કેટરિંગ મેનૂ બનાવો અને મેનેજ કરો. ગ્રાહકોને સંપૂર્ણ આઇટમ વિગતો સાથે મેનૂ વિકલ્પો બતાવો.",
    "features.grocery.title": "ઑટો કિરાણા યાદી",
    "features.grocery.description":
      "પસંદ કરેલા મેનૂ આઇટમ પરથી ખરીદી યાદી આપમેળે બનાવો. કોઈ સામગ્રી ચૂકી ન જાય.",
    "features.utensil.title": "વાસણ મેનેજમેન્ટ",
    "features.utensil.description":
      "દરેક ઇવેન્ટમાં વપરાતા વાસણ ટ્રૅક કરો. શું ઉપલબ્ધ, વપરાશમાં અથવા નુકસાન થયું તે જાણો.",
    "features.staff.title": "સ્ટાફ મેનેજમેન્ટ",
    "features.staff.description":
      "ઇવેન્ટ્સમાં સ્ટાફ સોંપો અને અનેક ફંક્શનમાં તમારા કાર્યબળને કાર્યક્ષમતાથી મેનેજ કરો.",
    "features.estimation.title": "ત્વરિત અંદાજ",
    "features.estimation.description":
      "મેનૂ પસંદગી પરથી ઝડપી ખર્ચ અંદાજ બનાવો. ગ્રાહકોને ઝડપી નિર્ણય લેવામાં મદદ કરો.",
    "features.invoice.title": "ઇન્વૉઇસ જનરેશન",
    "features.invoice.description":
      "ઇવેન્ટ પૂર્ણ થયા પછી આપમેળે પ્રોફેશનલ ઇન્વૉઇસ બનાવો.",
    "features.calendar.title": "કૅલેન્ડર ઓવરવ્યૂ",
    "features.calendar.description":
      "એક કૅલેન્ડરમાં તમારા બધા ઇવેન્ટ્સનો સંપૂર્ણ દૃશ્ય મેળવો. કોઈ બુકિંગ ચૂકી ન જાય.",
    "pricing.heading": "સરળ અને પારદર્શક પ્રાઇસિંગ",
    "pricing.subtitle":
      "આજે જ મફતમાં શરૂ કરો. તમારો બિઝનેસ વધે ત્યારે ક્યારેય અપગ્રેડ કરો.",
    "pricing.earlyAccessBadge": "🚀 અર્લી એક્સેસ",
    "pricing.earlyAccessPill": "અર્લી એક્સેસ",
    "pricing.starterPlan": "સ્ટાર્ટર પ્લાન",
    "pricing.free": "મફત",
    "pricing.availableEarlyAccess": "અર્લી એક્સેસ દરમિયાન ઉપલબ્ધ",
    "pricing.planDescription":
      "તમારા કેટરિંગ બિઝનેસને એક જ જગ્યાએ મેનેજ કરવા માટે જરૂરી બધું.",
    "pricing.specialPricingNote":
      "પ્લાન લોન્ચ થાય ત્યારે અર્લી યુઝર્સને વિશેષ પ્રાઇસિંગ મળશે.",
    "pricing.paidPlansNote": "ભવિષ્યમાં પેઇડ પ્લાન પ્રસ્તુત કરવામાં આવશે.",
    "pricing.planFeatures": [
      "ઇવેન્ટ અને ઓર્ડર મેનેજમેન્ટ",
      "સ્માર્ટ પેમેન્ટ ટ્રૅકિંગ (આંશિક ચુકવણી)",
      "મેનૂ મેનેજમેન્ટ",
      "ઑટો કિરાણા યાદી",
      "સ્ટાફ મેનેજમેન્ટ",
      "વાસણ ટ્રૅકિંગ",
      "અંદાજ સિસ્ટમ",
      "ઇન્વૉઇસ જનરેશન",
      "કૅલેન્ડર ઓવરવ્યૂ",
    ],
    "howItWorks.eyebrow": "કેવી રીતે કામ કરે છે",
    "howItWorks.heading": "6 સરળ સ્ટેપ્સમાં તમારો કેટરિંગ બિઝનેસ ચલાવો",
    "howItWorks.subtitle":
      "ઓર્ડર બનાવવાથી અંતિમ ઇન્વોઇસ સુધી — બધું એક સરળ વર્કફ્લોમાં મેનેજ કરો.",
    "howItWorks.createEvent.title": "ઇવેન્ટ બનાવો",
    "howItWorks.createEvent.description":
      "તારીખ, સમય, સ્થળ અને ગ્રાહક વિગતો સાથે નવું કેટરિંગ ઇવેન્ટ ઉમેરો.",
    "howItWorks.selectMenu.title": "મેનૂ પસંદ કરો",
    "howItWorks.selectMenu.description":
      "ઇવેન્ટ માટે મેનૂ આઇટમ પસંદ કરો અને ગ્રાહકની જરૂરિયાત મુજબ કસ્ટમાઇઝ કરો.",
    "howItWorks.groceryList.title": "ઑટો કિરાણા યાદી બનાવો",
    "howItWorks.groceryList.description":
      "પસંદ કરેલા મેનૂ આઇટમ પરથી સંપૂર્ણ ખરીદી યાદી આપમેળે મેળવો.",
    "howItWorks.assignStaff.title": "સ્ટાફ અને વાસણ સોંપો",
    "howItWorks.assignStaff.description":
      "ઇવેન્ટ માટે સ્ટાફ ફાળવો અને વાસણ ટ્રૅક કરો.",
    "howItWorks.trackPayments.title": "ચુકવણી ટ્રૅક કરો",
    "howItWorks.trackPayments.description":
      "આંશિક ચુકવણી નોંધો અને બાકી રકમ સરળતાથી ટ્રૅક કરો.",
    "howItWorks.generateInvoice.title": "ઇન્વૉઇસ બનાવો",
    "howItWorks.generateInvoice.description":
      "ઇવેન્ટ પૂર્ણ થયા પછી ત્વરિત પ્રોફેશનલ ઇન્વૉઇસ બનાવો.",
    "footer.brandDescription":
      "ઓર્ડર, ઇવેન્ટ, ચુકવણી, સ્ટાફ અને ઓપરેશન્સ મેનેજ કરવા માટે ઓલ-ઇન-વન કેટરિંગ મેનેજમેન્ટ સૉફ્ટવેયર.",
    "footer.builtForOwners": "કેટરિંગ બિઝનેસ માલિકો માટે બનાવેલ",
    "footer.colProduct": "પ્રોડક્ટ",
    "footer.colCompany": "કંપની",
    "footer.colSupport": "સપોર્ટ",
    "footer.faq": "વારંવાર પૂછાતા પ્રશ્નો",
    "footer.privacyPolicy": "પ્રાઇવસી પોલિસી",
    "footer.termsAndConditions": "નિયમો અને શરતો",
    "footer.termsShort": "નિયમો",
    "footer.helpSupport": "મદદ / સપોર્ટ",
    "footer.copyright": "© 2026 Katmitra. બધા અધિકાર સુરક્ષિત.",
    "footer.logoAlt": "Katmitra",
    "footer.ariaWhatsApp": "WhatsApp",
    "footer.ariaInstagram": "Instagram",
    "clients.heading": "તમારા જેવા કેટરિંગ માલિકો માટે બનાવેલ",
    "clients.subtitle":
      "કેટરિંગ બિઝનેસની વાસ્તવિક સમસ્યાઓ ઉકેલવા માટે ડિઝાઇન કરેલ.",
    "clients.trustPoints": [
      "ભારતીય કેટરિંગ બિઝનેસ માટે બનાવેલ",
      "વાસ્તવિક વપરાશ માટે ડિઝાઇન",
      "સરળ અને વપરવામાં સરળ",
    ],
    "clients.eventsBadge": "500+ ઇવેન્ટ મેનેજ કર્યા",
    "benefits.heading": "KatMitra કેમ પસંદ કરશો?",
    "benefits.subtitle":
      "સફળ કેટરિંગ બિઝનેસ ચલાવવા માટે જરૂરી બધું, એક જ પ્લેટફોર્મ પર.",
    "benefits.timeCost.title": "સમય અને ખર્ચ બચત",
    "benefits.timeCost.description":
      "પુનરાવર્તિત કામો આપમેળે કરો અને ઓપરેશનલ ખર્ચ નોંધપાત્ર રીતે ઘટાડો.",
    "benefits.orderMgmt.title": "સરળ ઓર્ડર મેનેજમેન્ટ",
    "benefits.orderMgmt.description":
      "અમારા સાહજિક ડેશબોર્ડ સાથે અનેક ઓર્ડર સરળતાથી સંભાળો.",
    "benefits.invoicing.title": "વ્યવસાયિક ઇન્વૉઇસિંગ",
    "benefits.invoicing.description":
      "સેકન્ડોમાં સુંદર ઇન્વૉઇસ અને ક્વોટેશન બનાવો.",
    "benefits.customer.title": "વધુ સારો ગ્રાહક અનુભવ",
    "benefits.customer.description":
      "સરળ સંચાર અને ડિલિવરી સાથે તમારા ગ્રાહકોને રાજી રાખો.",
    "terms.pageTitle": "નિયમો અને શરતો",
    "terms.welcome": "KatMitra માં આપનું સ્વાગત છે",
    "terms.intro":
      "KatMitra નો ઉપયોગ કરીને તમે આ નિયમો અને અમારી પ્રાઇવસી પોલિસી https://www.katmitra.com/privacy-policy સ્વીકારો છો. કૃપા કરીને ધ્યાનથી વાંચો.",
    "terms.usePlatform.title": "પ્લેટફોર્મનો ઉપયોગ",
    "terms.usePlatform.items": [
      "પ્લેટફોર્મનો ઉપયોગ માત્ર કાયદેસર કેટરિંગ વ્યવસાય માટે જ હોવો જોઈએ.",
      "વપરાશકર્તાઓએ KatMitra સેવાઓનો દુરૉપયોગ કે અનધિકૃત ઍક્સેસનો પ્રયાસ ન કરવો જોઈએ.",
    ],
    "terms.subscription.title": "સબ્સ્ક્રિપ્શન અને ચુકવણી",
    "terms.subscription.items": [
      "પ્લાન ક્યારેય પણ અપગ્રેડ, ડાઉનગ્રેડ અથવા રદ કરી શકાય.",
      "વિશેષ કરાર (Enterprise SLA) હેઠળ સ્પષ્ટ લખ્યા વગર બધી ચુકવણીઓ પરત ન આવી શકે.",
      "કોઈ છુપા ચાર્જ નથી.",
    ],
    "terms.dataProtection.title": "ડેટા સુરક્ષા",
    "terms.dataProtection.items": [
      "વપરાશકર્તા ડેટા અમારી પ્રાઇવસી પોલિસી અનુસાર સુરક્ષિત રીતે સંગ્રહિત અને એન્ક્રિપ્ટેડ છે.",
      "વપરાશકર્તાની બેદરકારીથી થતા ડેટા નુકસાન માટે KatMitra જવાબદાર નથી.",
      "જો તમે Katmitra Google Play પર પ્રકાશિત કરો તો Data safety જાહેરાતો સચોટ રીતે દર્શાવે કે એપ વપરાશકર્તા ડેટા કેવી રીતે સંભાળે છે.",
    ],
    "terms.support.title": "સહાય સેવાઓ",
    "terms.support.items": [
      "સક્રિય સબ્સ્ક્રિપ્શન પ્લાન અનુસાર સહાય આપવામાં આવે છે.",
      "Enterprise વપરાશકર્તાઓને સમર્પિત સહાય અને SLA આધારિત સપોર્ટ મળે છે.",
    ],
    "terms.account.title": "એકાઉન્ટ જવાબદારી",
    "terms.account.items": [
      "લૉગિન વિગતો ગુપ્ત રાખવાની તમારી જવાબદારી છે.",
      "અનધિકૃત વપરાશકર્તાઓ સાથે એકાઉન્ટ શેર કરવાથી સેવા બંધ થઈ શકે છે.",
    ],
    "terms.availability.title": "સેવા ઉપલબ્ધતા",
    "terms.availability.items": [
      "KatMitra 99.9% અપટાઇમ માટે પ્રયત્ન કરે છે, પણ જાળવણી, અપડેટ અથવા તકનીકી નિષ્ફળતામાં નિરંતર સેવાની ખાતરી આપતું નથી.",
    ],
    "terms.termination.title": "સેવા સમાપ્તિ",
    "terms.termination.items": [
      "જો વપરાશકર્તાઓ નિયમોનું ઉલ્લંઘન કરે તો KatMitra એકાઉન્ટ સ્થગિત કે સમાપ્ત કરવાનો અધિકાર રાખે છે.",
    ],
    "terms.updates.title": "નિયમોમાં અપડેટ",
    "terms.updates.items": [
      "આ નિયમો સમયાંતરે અપડેટ થઈ શકે. સતત ઉપયોગ એટલે સંશોધિત નિયમોની સ્વીકૃતિ.",
      "મહત્વપૂર્ણ ફેરફારો એપ અથવા ઇમેઇલ દ્વારા પણ જાણ કરવામાં આવી શકે, જ્યાં યોગ્ય હોય.",
    ],
    "terms.privacyLink.title": "પ્રાઇવસી પોલિસી અને વપરાશકર્તા ડેટા",
    "terms.privacyLink.items": [
      "https://www.katmitra.com/privacy-policy પર અમારી પ્રાઇવસી પોલિસી સમજાવે છે કે અમે શું ભેગું કરીએ છીએ, શા માટે, કેટલો સમય રાખીએ છીએ, શેરિંગ અને તમારી પસંદગીઓ.",
      "જ્યારે તમે એપ પ્રકાશિત અથવા અપડેટ કરો ત્યારે તમારે સેવાનો ઉપયોગ તે પોલિસી અને Google Play ડેવલપર પ્રોગ્રામ પોલિસી અને વપરાશકર્તા ડેટા પોલિસી સાથે સુસંગત રાખવો જોઈએ.",
    ],
    "terms.intellectualProperty.title": "બૌદ્ધિક સંપત્તિ",
    "terms.intellectualProperty.items": [
      "KatMitra નું નામ, બ્રાન્ડિંગ, સૉફ્ટવેર, દસ્તાવેજીકરણ અને વપરાશકર્તા ઇન્ટરફેસ લાગુ કાયદાઓથી સુરક્ષિત છે.",
      "તમને તમારા આંતરિક કેટરિંગ વ્યવસાય માટે મર્યાદિત, ગૈર-વિશિષ્ટ લાઇસન્સ મળે છે. ફરજિયાત કાયદો મંજૂરી ન આપે ત્યાં સુધી તમે સેવાની નકલ, ફેરફાર, વિતરણ, વેચાણ, રિવર્સ એન્જિનિયરિંગ અથવા સોર્સ કોડ કાઢવાનો પ્રયાસ ન કરો.",
    ],
    "terms.userContent.title": "તમારો ડેટા અને ગ્રાહક માહિતી",
    "terms.userContent.items": [
      "તમે KatMitra માં દાખલ કરેલી માહિતી, જેમાં તમારા ગ્રાહકો અથવા સ્ટાફ વિશેનો વ્યક્તિગત ડેટા શામેલ છે, માટે તમે જવાબદાર છો. તે ડેટા સેવામાં સંગ્રહિત કરવા માટે તમારી પાસે કાયદેસર આધાર (જેમ કે સંમતિ અથવા કરાર) હોવો જોઈએ.",
      "તમારા વ્યવસાય ડેટાનું માલિકી હક તમારું રહે છે; તમે KatMitra ને ફક્ત તમને સેવા આપવા માટે હોસ્ટ, પ્રક્રિયા, બેકઅપ અને પ્રદર્શિત કરવાનું લાઇસન્સ આપો છો.",
    ],
    "terms.governingLaw.title": "શાસન કાયદો અને વિવાદો",
    "terms.governingLaw.items": [
      "આ નિયમો ભારતના કાયદાઓ હેઠળ રહે છે, તમારા નિવાસ દેશના ફરજિયાત ગ્રાહક કાયદાઓ સિવાય વિરોધાભાસી કાયદા નિયમો લાગુ નહીં થાય.",
      "આ નિયમોમાંથી ઉદ્ભવતા વિવાદો માટે અમદાવાદ, ગુજરાત, ભારતની અદાલતો પાસે વિશિષ્ટ અધિકારક્ષેત્ર રહેશે, તમે જ્યાં રહો છો ત્યાંના ફરજિયાત અધિકારો સુધી.",
    ],
    "terms.contactHeading": "પોલિસી સંબંધી પ્રશ્નો માટે સંપર્ક",
    "terms.emailLabel": "ઇમેઇલ",
    "terms.phoneLabel": "ફોન",
    "privacy.pageTitle": "પ્રાઇવસી પોલિસી",
    "privacy.intro":
      "આ પ્રાઇવસી પોલિસી સમજાવે છે કે જ્યારે તમે katmitra.com વેબસાઇટ અને Katmitra મોબાઇલ એપ્લિકેશન (Google Play પર વિતરિત સંસ્કરણો સહિત) વાપરો ત્યારે Katmitra (“અમે”) માહિતી કેવી રીતે ભેગી, ઉપયોગ, સંગ્રહ અને શેર કરે છે. સેવાઓ વાપરીને તમે આ પોલિસી સ્વીકારો છો.",
    "privacy.effectiveDate": "અસરકારક તારીખ: 20 મે 2026",
    "privacy.controller.title": "1. જવાબદાર કોણ છે",
    "privacy.controller.items": [
      "Katmitra વેબસાઇટ અને એપ્સ ચલાવે છે. સેવાઓ દ્વારા ભેગો થતો વ્યક્તિગત ડેટા માટે ડેટા નિયંત્રક Katmitra છે (સંપર્ક આ પૃષ્ઠના અંતે).",
      "જો તમે એપ Google Play પરથી ઇન્સ્ટોલ કરો તો Google ની પોલિસીઓ અનુસાર Google પણ કેટલીક માહિતી પ્રક્રિયા કરી શકે છે; અમે Google ની પ્રક્રિયા નિયંત્રિત કરતા નથી.",
    ],
    "privacy.collect.title": "2. અમે કઈ માહિતી ભેગી કરીએ છીએ",
    "privacy.collect.items": [
      "ઓળખકર્તાઓ અને એકાઉન્ટ ડેટા: નામ, ઇમેઇલ, ફોન, ક્રેડેન્શિયલ (જ્યાં લાગુ હોય ઉદ્યોગ-માનક હેશિંગ સાથે પાસવર્ડ), અને નોંધણી અથવા પ્રોફાઇલ અપડેટ પર વ્યવસાય વિગતો.",
      "તમે બનાવેલી સામગ્રી: ઇવેન્ટ્સ, ઓર્ડર્સ, ક્વોટેશન્સ, મેનુ આઇટમ્સ, ઇન્વેન્ટરી સંબંધિત માહિતી, તમે નોંધેલી ચુકવણી ટ્રૅકિંગ, સ્ટાફ સોંપણી, તમે સંગ્રહિત કરો છો તે ગ્રાહકના નામ અને સંપર્ક, અપલોડ કરેલી ફાઇલો અથવા છબીઓ, અને સપોર્ટ સંદેશાઓ.",
      "તકનીકી અને સુરક્ષા ડેટા: ડિવાઇસ પ્રકાર, OS સંસ્કરણ, એપ સંસ્કરણ, IP સરનામું, વિનંતીઓના અંદાજી સમય, પ્રમાણીકરણ ટોકન, અને એકાઉન્ટ સુરક્ષિત રાખવા અને સમસ્યા ઉકેલ માટે જરૂરી નિદાન અથવા ભૂલ માહિતી.",
      "વેબસાઇટ સંપર્ક ફોર્મ: નામ, ઇમેઇલ, ફોન અને સંદેશ.",
    ],
    "privacy.use.title": "3. અમે તમારી માહિતીનો ઉપયોગ કેવી રીતે કરીએ છીએ",
    "privacy.use.items": [
      "તમારી સાથેના કરાર પૂર્ણ કરવા: એકાઉન્ટ બનાવવું અને મેનેજ કરવું, વપરાશકર્તાઓની ખાતરી, તમારા ઓપરેશનલ ડેટાને સિંક અને સંગ્રહિત કરવું, અને કેટરિંગ મેનેજમેન્ટ સુવિધાઓ આપવી.",
      "વૈધ હિતો માટે: Katmitra ચલાવવું અને સુધારવું, સુરક્ષા જાળવવી, ધોકાધડી અને દુરૉપયોગ રોકવો, વિશ્વસનીયતા માપવી (ઉત્પાદનમાં મર્યાદિત એનાલિટિક્સ અથવા ક્રેશ/ભૂલ રિપોર્ટિંગ જો હોય), અને સેવા સંબંધિત સૂચનાઓ મોકલવી.",
      "કાનૂની ફરજોનું પાલન કરવું અને જ્યાં લાગુ પડે અધિકારીઓની વૈધ વિનંતીઓનો જવાબ આપવો.",
    ],
    "privacy.permissions.title": "4. ડિવાઇસ મંજૂરી અને સૂચનાઓ (મોબાઇલ એપ)",
    "privacy.permissions.items": [
      "એપ ફક્ત તે સુવિધા માટે મંજૂરી માંગે છે જેનો તમે ઉપયોગ કરો છો (ઉદાહરણ તરીકે છબી અપલોડ માટે કૅમેરો અથવા ફોટો લાઇબ્રેરી, રિમાઇન્ડર માટે સૂચનાઓ, નિકાસ અથવા કૅશ માટે સંગ્રહ).",
      "તમે ડિવાઇસ સેટિંગ્સમાં ઘણી મંજૂરીઓ આપી અથવા નકારી શકો છો; નકારવાથી સંબંધિત સુવિધાઓ મર્યાદિત થઈ શકે છે. પુશ સૂચનાઓ સક્ષમ હોય તો સંદેશો મોકલવા માટે પુશ ટોકન અમારા સૂચના પ્રોવાઇડર દ્વારા પ્રક્રિયા થઈ શકે છે.",
    ],
    "privacy.storage.title": "5. સંગ્રહ અને સુરક્ષા",
    "privacy.storage.items": [
      "અમે જોખમ અનુરૂપ તકનીકી અને સંસ્થાકીય પગલાં લાગુ કરીએ છીએ, જેમાં સંચાર દરમ્યાન એન્ક્રિપ્શન (જેમ કે HTTPS/TLS) અને ડેટાબેઝ અને બેકઅપ સુરક્ષા શામેલ છે.",
      "કેટલોક ડેટા તમારા ડિવાઇસ પર સ્થાનિકપણે સંગ્રહ થઈ શકે છે (જેમ કે કૅશ અથવા પસંદગીઓ). કોઈ પદ્ધતિ સંપૂર્ણ જોખમ વિના નથી—મજબૂત અનન્ય પાસવર્ડ વાપરો અને ડિવાઇસ સુરક્ષિત રાખો.",
      "જો લાગુ કાયદા હેઠળ સૂચના જરૂરી વ્યક્તિગત ડેટા ઉલ્લંઘણ થાય તો અમે પ્રભાવિત વપરાશકર્તાઓ અને નિયમનકારોને જરૂર મુજબ સૂચિત કરવા પગલાં લઈશું.",
    ],
    "privacy.sharing.title": "6. શેરિંગ અને પ્રોસેસરો",
    "privacy.sharing.items": [
      "અમે તમારો વ્યક્તિગત ડેટા વેચતા નથી.",
      "અમે હોસ્ટિંગ, ઇમેઇલ વિતરણ, પુશ સૂચનાઓ, જ્યાં લાગુ પડે ચુકવણી પ્રક્રિયા, અને સુરક્ષા અથવા નિદાન માટે તપાસેલા સેવા પ્રોવાઇડર્સ વાપરીએ છીએ; તેઓ યોગ્ય ગોપનીયતા અને સુરક્ષા શરતો હેઠળ ફક્ત અમારા સૂચનો પર વ્યક્તિગત ડેટા પ્રક્રિયા કરી શકે છે.",
      "કાયદો, અદાલતી આદેશ, અથવા વપરાશકર્તાઓ, KatMitra અથવા જનતાના અધિકારો અને સુરક્ષા માટે અમે માહિતી જાહેર કરી શકીએ છીએ.",
    ],
    "privacy.retention.title": "7. ડેટા રિટેંશન",
    "privacy.retention.items": [
      "સેવાઓ આપવા, કાનૂની દાયિત્વોનું પાલન કરવા, વિવાદો ઉકેલવા અને કરાર લાગુ કરવા જેટલા સમય સુધી અમે ડેટા રાખીએ છીએ.",
      "રિટેંશન સમયગાળો ડેટા પ્રકાર અને કાનૂની જરૂરિયાત અનુસાર અલગ હોઈ શકે છે. કાઢી નાખ્યા પછી બેકઅપ નકલો ઓવરરાઇટ થાય તે પહેલાં મર્યાદિત સમય સુધી રહી શકે છે.",
    ],
    "privacy.rights.title": "8. તમારા અધિકારો અને એકાઉન્ટ કાઢી નાખવું",
    "privacy.rights.items": [
      "જ્યાં ઉપલબ્ધ હોય ત્યાં તમે એપમાં કેટલાક એકાઉન્ટ અને વ્યવસાયિક માહિતી જોઈ અને અપડેટ કરી શકો છો.",
      "ખોટી માહિતી સુધારવા અથવા પ્રક્રિયા વિશે પ્રશ્નો માટે નીચેના વિગતો દ્વારા સંપર્ક કરો.",
      "તમે એકાઉન્ટ બંધ કરવા અને અમારી પાસેના વ્યક્તિગત ડેટાને કાઢી નાખવા અથવા અનામી કરવાની વિનંતી કરી શકો છો, કર, લેખાંકન અથવા વિવાદ રેકોર્ડ જેવી કાનૂની રિટેંશન જરૂરિયાતો હેઠળ. ઓળખ ચકાસણી પછી અમે યોગ્ય સમયમાં જવાબ આપીશું.",
      "તમારા સ્થાન અનુસાર તમને વધારાના કાયદેસર ગોપનીયતા અધિકારો હોઈ શકે છે; અમે લાગુ કાયદા અનુસાર વિનંતીઓનો સન્માન કરીશું.",
    ],
    "privacy.international.title": "9. આંતરરાષ્ટ્રીય ટ્રાન્સફર",
    "privacy.international.items": [
      "અમારા પ્રાથમિક ઓપરેશન અને સર્વર ભારત અથવા અમારા હોસ્ટિંગ ભાગીદારોના અન્ય પ્રદેશોમાં હોઈ શકે છે.",
      "જો વ્યક્તિગત ડેટા સરહદો પાર ખસેડાય તો અમે લાગુ કાયદા દ્વારા જરૂરી સલામતી પગલાં લાગુ કરીએ છીએ.",
    ],
    "privacy.children.title": "10. બાળકોની ગોપનીયતા",
    "privacy.children.items": [
      "KatMitra 13 વર્ષથી નીચેના બાળકો (અથવા સ્થાનિક કાયદા દ્વારા ન્યૂનતમ ઉંમર) માટે નિર્દેશિત નથી, અને અમે જાણતા નથી કે આ દર્શકો માટે બાળકોનો વ્યક્તિગત ડેટા ભેગો કરીએ છીએ.",
      "જો તમને લાગે કે કોઈ બાળકે વ્યક્તિગત ડેટા આપ્યો છે તો અમારો સંપર્ક કરો અને અમે યોગ્ય જગ્યાએ આ માહિતી કાઢી નાખવા પગલાં લઈશું.",
    ],
    "privacy.updates.title": "11. આ પોલિસીમાં અપડેટ",
    "privacy.updates.items": [
      "અમે સમયાંતરે આ પ્રાઇવસી પોલિસી અપડેટ કરી શકીએ છીએ. નવું સંસ્કરણ સુધારેલ અસરકારક તારીખ સાથે આ પૃષ્ઠ પર મૂકાશે.",
      "મોબાઇલ વપરાશકર્તાઓને અસર કરતા મહત્વપૂર્ણ ફેરફારો માટે અમે એપ અથવા ઇમેઇલ દ્વારા પણ સૂચના આપી શકીએ છીએ, જ્યાં યોગ્ય હોય.",
    ],
  },
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  tList: (key: string) => string[];
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "katmitra.language";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "hi" || saved === "gu") return saved;
    return "en";
  });

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        localStorage.setItem(STORAGE_KEY, nextLanguage);
        setLanguage(nextLanguage);
      },
      t: (key) => {
        const val = translations[language][key] ?? translations.en[key];
        return typeof val === "string" ? val : key;
      },
      tList: (key) => {
        const val = translations[language][key] ?? translations.en[key];
        return Array.isArray(val) ? val : [];
      },
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
};
