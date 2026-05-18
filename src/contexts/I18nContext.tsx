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
      "By accessing and using KatMitra, you agree to comply with the following terms. Please read them carefully.",
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
      "User data is securely stored and encrypted.",
      "KatMitra is not responsible for data loss caused by user negligence.",
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
    ],
    "terms.contactHeading": "Contact for Policy Queries",
    "terms.emailLabel": "Email",
    "terms.phoneLabel": "Phone",
    "privacy.pageTitle": "Privacy Policy",
    "privacy.intro":
      "This Privacy Policy explains how Katmitra collects, uses, and protects information when you use our website and mobile application.",
    "privacy.effectiveDate": "Effective date: 23 April 2026",
    "privacy.collect.title": "1. Information We Collect",
    "privacy.collect.items": [
      "Account and profile data such as your name, email address, phone number, password, and business details when you sign up or update your profile in the mobile app.",
      "Operational data such as bookings, quotations, menu items, customer details, and support requests that you create while using Katmitra.",
      "Contact form data from the website, including your name, email, phone number, and message.",
    ],
    "privacy.use.title": "2. How We Use Your Information",
    "privacy.use.items": [
      "To create and manage your account, authenticate users, and provide core catering management features.",
      "To respond to support requests, improve service quality, and maintain platform security.",
    ],
    "privacy.permissions.title": "3. Device Permissions and Notifications (Mobile App)",
    "privacy.permissions.items": [
      "The mobile app may request access to notifications, camera, photo library, and related device capabilities to support app features such as alerts and image uploads.",
      "If notifications are enabled, device/app notification tokens may be used to deliver service messages.",
    ],
    "privacy.storage.title": "4. Storage and Security",
    "privacy.storage.items": [
      "We use industry-standard safeguards to protect data in transit and at rest. No method of transmission or storage is completely risk-free.",
      "Some app preferences and session-related data are stored locally on your device to keep you signed in and preserve your experience.",
    ],
    "privacy.sharing.title": "5. Data Sharing",
    "privacy.sharing.items": [
      "We do not sell your personal information.",
      "We may share data with service providers and infrastructure partners only as needed to operate Katmitra, or when required by law.",
    ],
    "privacy.retention.title": "6. Data Retention",
    "privacy.retention.items": [
      "We retain data for as long as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements.",
      "Retention periods may vary based on the type of information and legal requirements.",
    ],
    "privacy.choices.title": "7. Your Choices",
    "privacy.choices.items": [
      "You can update account and business information from within the app where available.",
      "You may contact us to request account-related help, including privacy questions.",
    ],
    "privacy.updates.title": "8. Updates to This Policy",
    "privacy.updates.items": [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date.",
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
      "KatMitra का उपयोग करने पर आप निम्न शर्तों से सहमत होते हैं। कृपया इन्हें ध्यान से पढ़ें।",
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
      "उपयोगकर्ता डेटा सुरक्षित रूप से संग्रहीत और एन्क्रिप्टेड है।",
      "उपयोगकर्ता की लापरवाही से हुए डेटा हानि के लिए KatMitra ज़िम्मेदार नहीं है।",
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
    ],
    "terms.contactHeading": "नीति संबंधी प्रश्नों के लिए संपर्क",
    "terms.emailLabel": "ईमेल",
    "terms.phoneLabel": "फोन",
    "privacy.pageTitle": "गोपनीयता नीति",
    "privacy.intro":
      "यह गोपनीयता नीति बताती है कि आपके द्वारा हमारी वेबसाइट और मोबाइल एप्लिकेशन का उपयोग करते समय Katmitra जानकारी एकत्र, उपयोग और सुरक्षित कैसे करता है।",
    "privacy.effectiveDate": "प्रभावी तारीख: 23 अप्रैल 2026",
    "privacy.collect.title": "1. जो जानकारी हम एकत्र करते हैं",
    "privacy.collect.items": [
      "खाते और प्रोफ़ाइल डेटा जैसे नाम, ईमेल, फोन, पासवर्ड और व्यवसाय संबंधी विवरण, जब आप मोबाइल एप में साइन अप या प्रोफ़ाइल अपडेट करते हैं।",
      "ऑपरेशनल डेटा जैसे बुकिंग, कोटेशन, मेनू आइटम, ग्राहक विवरण और सहायता अनुरोध जो आप Katmitra उपयोग करते समय बनाते हैं।",
      "वेबसाइट के संपर्क फॉर्म का डेटा, जिसमें नाम, ईमेल, फोन और संदेश शामिल है।",
    ],
    "privacy.use.title": "2. हम आपकी जानकारी का उपयोग कैसे करते हैं",
    "privacy.use.items": [
      "आपके खाते को बनाने व प्रबंधित करने, उपयोगकर्ताओं को प्रमाणित करने और मुख्य कैटरिंग प्रबंधन सुविधाओं का प्रदान।",
      "सहायता अनुरोधों का जवाब, सेवा गुणवत्ता सुधारना और मंच सुरक्षा बनाए रखना।",
    ],
    "privacy.permissions.title": "3. डिवाइस अनुमतियाँ और सूचनाएँ (मोबाइल ऐप)",
    "privacy.permissions.items": [
      "मोबाइल ऐप सूचनाओं, कैमरे, फ़ोटो लाइब्रेरी और संबंधित क्षमताओं का अनुरोध कर सकता है ताकि अलर्ट और इमेज अपलोड जैसी सुविधाओं का समर्थन हो।",
      "अगर सूचनाएँ सक्षम हैं, तो सर्विस संदेश देने के लिए डिवाइस/ऐप नोटिफिकेशन टोकन का उपयोग किया जा सकता है।",
    ],
    "privacy.storage.title": "4. संचय और सुरक्षा",
    "privacy.storage.items": [
      "हम डेटा के संचरण और संग्रहण के दौरान उद्योग-मानक सुरक्षा उपायों का उपयोग करते हैं। कोई भी तरीका पूर्णतया जोखिम-मुक्त नहीं है।",
      "कुछ ऐप प्राथमिकताएँ और सत्र डेटा आपके डिवाइस पर स्थानीय रूप से संग्रहित हो सकते हैं ताकि आप लॉग-इन रहें और अनुभव सहेजा जाए।",
    ],
    "privacy.sharing.title": "5. डेटा साझाकरण",
    "privacy.sharing.items": [
      "हम आपकी व्यक्तिगत जानकारी नहीं बेचते।",
      "हम डेटा केवल सर्विस प्रदाताओं और बुनियादी भागीदारों के साथ साझा कर सकते हैं जितना Katmitra चलाने के लिए ज़रूरी हो, या जब कानून से आवश्यक हो।",
    ],
    "privacy.retention.title": "6. डेटा प्रतिधारण",
    "privacy.retention.items": [
      "हम डेटा तब तक रखते हैं जब तक सेवाएँ प्रदान करने, कानूनी बाध्यता, विवाद सुलझाने और करार लागू करने की आवश्यकता हो।",
      "प्रतिधारण अवधि जानकारी के प्रकार और कानूनी आवश्यकता के आधार पर भिन्न हो सकती है।",
    ],
    "privacy.choices.title": "7. आपकी पसंद",
    "privacy.choices.items": [
      "जहाँ उपलब्ध हो, आप ऐप के भीतर से खाता और व्यावसायिक जानकारी अपडेट कर सकते हैं।",
      "आप खाते से जुड़ी मदद या गोपनीयता से संबंधित प्रश्नों के लिए हमसे संपर्क कर सकते हैं।",
    ],
    "privacy.updates.title": "8. इस नीति में अपडेट",
    "privacy.updates.items": [
      "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। अपडेट किया संस्करण संशोधित प्रभावी तारीख के साथ इस पृष्ठ पर पोस्ट किया जाएगा।",
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
      "KatMitra નો ઉપયોગ કરીને તમે નીચેની શરતોને સ્વીકારો છો. કૃપા કરીને ધ્યાનથી વાંચો.",
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
      "વપરાશકર્તા ડેટા સુરક્ષિત રીતે સંગ્રહિત અને એન્ક્રિપ્ટેડ છે.",
      "વપરાશકર્તાની બેદરકારીથી થતા ડેટા નુકસાન માટે KatMitra જવાબદાર નથી.",
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
    ],
    "terms.contactHeading": "પોલિસી સંબંધી પ્રશ્નો માટે સંપર્ક",
    "terms.emailLabel": "ઇમેઇલ",
    "terms.phoneLabel": "ફોન",
    "privacy.pageTitle": "પ્રાઇવસી પોલિસી",
    "privacy.intro":
      "આ પ્રાઇવસી પોલિસી સમજાવે છે કે જ્યારે તમે અમની વેબસાઇટ અને મોબાઇલ એપ્લિકેશનનો ઉપયોગ કરો ત્યારે Katmitra માહિતી કેવી રીતે ભેગી, ઉપયોગ અને સલામત રાખે છે.",
    "privacy.effectiveDate": "અસરકારક તારીખ: 23 એપ્રિલ 2026",
    "privacy.collect.title": "1. અમે કઈ માહિતી ભેગી કરીએ છીએ",
    "privacy.collect.items": [
      "એકાઉન્ટ અને પ્રોફાઇલ ડેટા જેવા કે નામ, ઇમેઇલ, ફોન નંબર, પાસવર્ડ અને વ્યવસાય વિગતો, જ્યારે તમે મોબાઇલ એપમાં નોંધણી કરો અથવા પ્રોફાઇલ અપડેટ કરો.",
      "ઓપરેશનલ ડેટા જેવા બુકિંગ્સ, ક્વોટેશન્સ, મેનુ આઇટમ્સ, ગ્રાહક વિગતો અને સપોર્ટ વિનંતીઓ જે તમે Katmitra વપરાતાં બનાવો છો.",
      "વેબસાઇટના સંપર્ક ફોર્મની માહિતી જેમાં નામ, ઇમેઇલ, ફોન અને સંદેશ શામેલ છે.",
    ],
    "privacy.use.title": "2. અમે તમારી માહિતીનો ઉપયોગ કેવી રીતે કરીએ છીએ",
    "privacy.use.items": [
      "તમારું એકાઉન્ટ બનાવવા અને મેનેજ કરવા, વપરાશકર્તાઓની ખાતરી કરવા અને મુખ્ય કેટરિંગ વ્યવસ્થાપન સુવિધાઓ પૂરી પાડવા માટે.",
      "સપોર્ટ વિનંતીઓનો જવાબ આપવા, સર્વિસ ગુણવત્તા સુધારવા અને પ્લેટફોર્મ સુરક્ષા જાળવવા માટે.",
    ],
    "privacy.permissions.title": "3. ડિવાઇસ મંજૂરી અને સૂચનાઓ (મોબાઇલ એપ)",
    "privacy.permissions.items": [
      "મોબાઇલ એપ સૂચના, કૅમેરો, ફોટો લાઇબ્રેરી અને સંબંધિત સુવિધાઓ માટે ઍક્સેસની વિનંતી કરી શકે છે જેથી એલર્ટ અને ઇમેજ અપલોડ જેવી વિશેષતાઓ સપોર્ટ થાય.",
      "જો સૂચનાઓ સક્ષમ હોય, તો સર્વિસ મેસેજ પહોંચાડવા ડિવાઇસ/એપ નોટિફિકેશન ટોકન વપરાઈ શકે છે.",
    ],
    "privacy.storage.title": "4. સંગ્રહ અને સુરક્ષા",
    "privacy.storage.items": [
      "માહિતી મોકલતી અને રાખતી વખતે આમ માન્ય સલામતી દ્વારા અમે ડેટા સલામત રાખીએ છીએ. કોઈ પણ પદ્ધતિ સંપૂર્ણ જોખમ વિના નથી.",
      "એપ પસંદગીઓ અને સત્રને લગતો કેટલોક ડેટા સાઇન ઇન જાળવવા અને અનુભવ સંભાળવા તમારા ડિવાઇસ પર સ્થાનિકપણે સંગ્રહ પણ થઈ શકે છે.",
    ],
    "privacy.sharing.title": "5. ડેટા શેરિંગ",
    "privacy.sharing.items": [
      "અમે તમારો વ્યક્તિગત ડેટા વેચતા નથી.",
      "Katmitra ચલાવવા જરૂરી જેટલું અથવા કાનૂની રીતે જ્યારે જોઈતું હોય ત્યારે જ અમે સર્વિસ પ્રોવાઇડર્સ અને ઇન્ફ્રાસ્ટ્રક્ચર ભાગીદારો સાથે ડેટા શેર કરી શકીએ છીએ.",
    ],
    "privacy.retention.title": "6. ડેટા રિટેંશન",
    "privacy.retention.items": [
      "સેવાઓ આપવા, કાનૂની દાયિત્વોનું પાલન કરવા, વિવાદો ઉકેલવા અને કરાર લાગુ કરવા જેટલા સમય સુધી અમે ડેટા રાખીએ છીએ.",
      "માહિતીના પ્રકાર અને કાનૂની જરૂરિયાત મુજબ રિટેંશન સમયગાળો અલગ હોઈ શકે છે.",
    ],
    "privacy.choices.title": "7. તમારી પસંદગીઓ",
    "privacy.choices.items": [
      "જ્યાં ઉપલબ્ધ હોય ત્યાં તમે એપ દ્વારા એકાઉન્ટ અને વ્યવસાયિક વિગતો અપડેટ કરી શકો છો.",
      "ખાતું સંબંધિત મદદ અથવા ગોપનીયતા પ્રશ્નો માટે તમે અમારો સંપર્ક કરી શકો છો.",
    ],
    "privacy.updates.title": "8. આ પોલિસીમાં અપડેટ",
    "privacy.updates.items": [
      "અમે સમયાંતરે આ પ્રાઇવસી પોલિસી અપડેટ કરી શકીએ છીએ. નવું સંસ્કરણ સુધારેલ અસરકારક તારીખ સાથે આ પૃષ્ઠ પર મૂકાશે.",
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
