import { articles } from '../data/articles';

export const pageSEOMap = {
  home: {
    title: 'Free Dynamic QR Code Generator with Analytics | QRLoop',
    desc: 'Create free dynamic QR codes with editable URLs, custom branding, high-resolution PNG, SVG and PDF downloads, and QR scan analytics. No expiration or watermark.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/',
    schemaType: 'WebSite',
  },
  'dynamic-qr': {
    title: 'Dynamic QR Code Generator: Edit URLs After Printing | QRLoop',
    desc: 'Create a trackable dynamic QR code, change its destination URL anytime, and monitor scans by device and location. Free QR code generator with no expiration.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/dynamic-qr',
    schemaType: 'WebApplication',
  },
  'static-qr': {
    title: 'Free Static QR Code Generator for URLs, Wi-Fi & vCards | QRLoop',
    desc: 'Generate a permanent static QR code for a website, Wi-Fi network, contact card, text, email or phone number. Download PNG, SVG or PDF without an account.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/static-qr',
    schemaType: 'WebApplication',
  },
  dashboard: {
    title: 'My Dynamic QR Codes - Real-Time Management Dashboard | QRLoop',
    desc: 'Manage your active dynamic QR codes, update destination URLs on the fly, export print standees, and inspect live scan telemetry.',
    indexable: false,
    canonical: 'https://qrloop4.vercel.app/dashboard',
  },
  analytics: {
    title: 'QR Code Scan Analytics & Real-Time Telemetry | QRLoop',
    desc: 'Track QR code performance with real-time scan volume, device breakdown, operating systems, browsers, and top geographic locations.',
    indexable: false,
    canonical: 'https://qrloop4.vercel.app/analytics',
  },
  blog: {
    title: 'QR Code Guides & Technical Tutorials | QRLoop Knowledge Hub',
    desc: 'Comprehensive guides on dynamic QR redirects, scanning distance ratios, vector print specifications, quishing security, and smart retail barcodes.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/blog',
    schemaType: 'Blog',
  },
  compare: {
    title: 'QR Code Generator Comparison: Free Dynamic QR Alternatives | QRLoop',
    desc: 'Compare QRLoop with paid QR code platforms for editable links, scan analytics, QR customization, exports, pricing and expiration policies.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/compare',
    schemaType: 'WebPage',
  },
  community: {
    title: 'Community Discussions & Creator Forum | QRLoop',
    desc: 'Join the QRLoop creator community. Ask questions, troubleshoot scanning issues, showcase custom QR designs, and discuss dynamic redirect best practices.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/community',
    schemaType: 'DiscussionForumPosting',
  },
  about: {
    title: 'About QRLoop - Our Mission for Free & Open Dynamic QR Codes',
    desc: 'Learn about QRLoop’s mission to eliminate 14-day expired dynamic QR paywalls, our sub-50ms edge redirect architecture, and commitment to open web standards.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/about',
    schemaType: 'AboutPage',
  },
  contact: {
    title: 'Contact QRLoop - Customer Support, API Inquiries & Security Desk',
    desc: 'Get in touch with the QRLoop engineering and support team. Fast 24-hour turnaround for technical questions, custom integrations, or abuse reports.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/contact',
    schemaType: 'ContactPage',
  },
  privacy: {
    title: 'Privacy Policy & Google AdSense Disclosures | QRLoop',
    desc: 'Read QRLoop’s privacy policy, including Google AdSense DoubleClick DART cookie disclosures, server-side IP anonymization, and GDPR/CCPA rights.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/privacy',
    schemaType: 'WebPage',
  },
  terms: {
    title: 'Terms of Service & Acceptable Use Policy | QRLoop',
    desc: 'Review the terms of service governing QRLoop’s dynamic QR generator, redirection infrastructure, acceptable use policies, and intellectual property rights.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/terms',
    schemaType: 'WebPage',
  },
  cookies: {
    title: 'Cookie Policy & Consent Management | QRLoop',
    desc: 'Understand how QRLoop and third-party advertising partners (Google AdSense) use cookies, plus instructions on managing and disabling tracking.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/cookies',
    schemaType: 'WebPage',
  },
  'qr-code-for-restaurants': {
    title: 'QR Code Generator for Restaurants and Menus | QRLoop',
    desc: 'Create a branded restaurant menu QR code you can update after printing. Track scans and download print-ready QR codes with QRLoop.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/qr-code-for-restaurants',
    schemaType: 'WebPage',
  },
  'qr-code-for-events': {
    title: 'QR Code Generator for Events and Campaigns | QRLoop',
    desc: 'Create editable event QR codes for registration, schedules, tickets, maps, and feedback. Customize and export with QRLoop.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/qr-code-for-events',
    schemaType: 'WebPage',
  },
  'qr-code-for-wifi': {
    title: 'Free Wi-Fi QR Code Generator | QRLoop',
    desc: 'Generate a free Wi-Fi QR code for cafes, offices, hotels, and homes. Download a clean static code with no login required.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/qr-code-for-wifi',
    schemaType: 'WebPage',
  },
  'qr-code-for-business-cards': {
    title: 'QR Code Generator for Digital Business Cards | QRLoop',
    desc: 'Create a branded QR code for your digital business card, portfolio, profile, or vCard. Export a sharp code for professional printing.',
    indexable: true,
    canonical: 'https://qrloop4.vercel.app/qr-code-for-business-cards',
    schemaType: 'WebPage',
  },
};

/**
 * Updates DOM meta tags, OpenGraph tags, canonical link, and JSON-LD schema.
 */
export function applyPageSEO(tabName) {
  if (typeof document === 'undefined') return;

  let config = pageSEOMap[tabName] || pageSEOMap.home;

  // Check if viewing a specific blog article
  if (tabName === 'blog' && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article') || window.location.pathname.split('/')[2];
    if (articleId) {
      const art = articles.find((a) => a.id === articleId);
      if (art) {
        config = {
          title: `${art.title} | QRLoop Guides`,
          desc: art.summary,
          indexable: true,
          canonical: `https://qrloop4.vercel.app/blog?article=${art.id}`,
          schemaType: 'Article',
          article: art,
        };
      }
    }
  }

  // Title
  document.title = config.title;

  // Meta Name Tags
  setMeta('title', config.title);
  setMeta('description', config.desc);
  setMeta(
    'robots',
    config.indexable
      ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      : 'noindex, nofollow'
  );

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', config.canonical);

  // Open Graph
  setMeta('og:title', config.title, 'property');
  setMeta('og:description', config.desc, 'property');
  setMeta('og:url', config.canonical, 'property');

  // Twitter
  setMeta('twitter:title', config.title, 'name');
  setMeta('twitter:description', config.desc, 'name');
  setMeta('twitter:url', config.canonical, 'name');

  // Page Specific Schema.org JSON-LD
  updateRouteSchema(tabName, config);
  updateBreadcrumbSchema(tabName, config);
  updateFaqSchema(tabName);
}

function setMeta(key, value, attribute = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

export const commonFAQs = [
  {
    question: "Do dynamic QR codes created on QRLoop expire?",
    answer: "No. QRLoop dynamic QR codes feature lifetime active redirection with zero 14-day trial expirations, scan caps, or subscription paywalls. Once created, your printed dynamic QR code continues redirecting indefinitely."
  },
  {
    question: "How do I edit a QR code's destination URL after printing?",
    answer: "Because dynamic QR codes encode a short redirect link, you can log in to your QRLoop dashboard anytime, select the code, and update the destination URL. The physical QR code printed on menus, flyers, or packaging will immediately redirect visitors to the new address without re-printing."
  },
  {
    question: "What is the difference between a static and a dynamic QR code?",
    answer: "Static QR codes encode the raw destination directly into the pixel pattern, meaning they work 100% offline but can never be edited or tracked. Dynamic QR codes route through an ultra-fast edge redirect server, allowing real-time destination editing, scan volume tracking, device telemetry, and smaller, cleaner QR module patterns."
  },
  {
    question: "What is the 10:1 QR code scanning distance rule?",
    answer: "The 10:1 scanning distance rule states that the minimum printed width of a QR code should be approximately one-tenth of the distance from which users scan it. For example, a restaurant table standee scanned from 20 inches away should be at least 2.0 inches (5 cm) wide, while a poster viewed from 10 feet away should be at least 1.0 foot (30 cm) wide."
  },
  {
    question: "Are QRLoop QR scan analytics privacy-compliant?",
    answer: "Yes. QRLoop operates on a zero-cookie telemetry architecture and anonymizes visitor IP addresses before storage, ensuring full compliance with GDPR, CCPA, and international data privacy regulations without placing tracking cookies on scanners' devices."
  },
  {
    question: "Which file formats can I download for printing?",
    answer: "QRLoop offers three export formats: Lossless Vector SVG (ideal for professional commercial printing and billboards without pixelation), High-Resolution 300 DPI PNG (ideal for digital graphics and office printing), and Print-Ready A4 PDF standees with built-in folding and cut guidelines."
  },
  {
    question: "What is QR code phishing (quishing) and how can I protect my brand?",
    answer: "Quishing is a social engineering attack where malicious actors place unauthorized sticker overlays onto legitimate QR codes to redirect victims to phishing sites. Businesses can protect consumers by using branded custom domains with HTTPS previews, conducting periodic physical inspections of table standees, and using dynamic redirect platforms like QRLoop that allow immediate destination revocation if an asset is compromised."
  },
  {
    question: "Is QRLoop compatible with the GS1 Digital Link standard?",
    answer: "Yes. QRLoop dynamic redirects can resolve standardized GS1 Digital Link URIs, enabling a single 2D barcode to be scanned by point-of-sale cash registers for inventory and pricing while also connecting consumers' smartphones to digital product information."
  }
];

function updateRouteSchema(tabName, config) {
  let schemaScript = document.getElementById('qrloop-page-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'qrloop-page-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  let schemaData = null;

  if (tabName === 'home') {
    schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://qrloop4.vercel.app/#website',
          url: 'https://qrloop4.vercel.app/',
          name: 'QRLoop',
          description: config.desc,
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://qrloop4.vercel.app/dynamic-qr?url={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebApplication',
          '@id': 'https://qrloop4.vercel.app/#webapp',
          name: 'QRLoop - Free Dynamic QR Code Generator Pro',
          url: 'https://qrloop4.vercel.app/',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All, Web, iOS, Android, Windows, macOS',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    };
  } else if (tabName === 'about') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://qrloop4.vercel.app/about#webpage',
      url: 'https://qrloop4.vercel.app/about',
      name: config.title,
      description: config.desc,
      mainEntity: {
        '@type': 'Organization',
        name: 'QRLoop Technologies',
        url: 'https://qrloop4.vercel.app/',
        logo: 'https://qrloop4.vercel.app/logo.svg',
      },
    };
  } else if (tabName === 'contact') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': 'https://qrloop4.vercel.app/contact#webpage',
      url: 'https://qrloop4.vercel.app/contact',
      name: config.title,
      description: config.desc,
      mainEntity: {
        '@type': 'Organization',
        name: 'QRLoop Technologies',
        email: 'support@qrloop.io',
        url: 'https://qrloop4.vercel.app/',
      },
    };
  } else if (config.schemaType === 'Article' && config.article) {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${config.canonical}#article`,
      url: config.canonical,
      headline: config.article.title,
      description: config.article.summary,
      datePublished: '2026-09-01T00:00:00Z',
      dateModified: '2026-09-14T00:00:00Z',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      keywords: `${config.article.category}, QR code generator, dynamic QR codes, print specs, 2D barcode, QRLoop`,
      citation: config.article.citations || [],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.prose'],
      },
      author: {
        '@type': 'Organization',
        name: 'QRLoop Research & Engineering Team',
        url: 'https://qrloop4.vercel.app/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'QRLoop Technologies',
        url: 'https://qrloop4.vercel.app/',
        logo: 'https://qrloop4.vercel.app/og-image.png',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': config.canonical,
      },
    };
  } else if (tabName === 'blog') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': 'https://qrloop4.vercel.app/blog#webpage',
      url: 'https://qrloop4.vercel.app/blog',
      name: 'QRLoop Knowledge Hub & QR Code Guides',
      description: config.desc,
      publisher: {
        '@type': 'Organization',
        name: 'QRLoop Technologies',
        url: 'https://qrloop4.vercel.app/',
        logo: 'https://qrloop4.vercel.app/logo.svg',
      },
    };
  } else {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': config.schemaType || 'WebPage',
      url: config.canonical,
      name: config.title,
      description: config.desc,
      isPartOf: {
        '@type': 'WebSite',
        name: 'QRLoop',
        url: 'https://qrloop4.vercel.app/',
      },
    };
  }

  schemaScript.textContent = JSON.stringify(schemaData);
}

function updateBreadcrumbSchema(tabName, config) {
  let breadcrumbScript = document.getElementById('qrloop-breadcrumb-schema');
  if (!breadcrumbScript) {
    breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'qrloop-breadcrumb-schema';
    breadcrumbScript.type = 'application/ld+json';
    document.head.appendChild(breadcrumbScript);
  }

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://qrloop4.vercel.app/',
    }
  ];

  if (tabName === 'blog') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Knowledge Hub & Guides',
      item: 'https://qrloop4.vercel.app/blog',
    });
    if (config.article) {
      itemListElement.push({
        '@type': 'ListItem',
        position: 3,
        name: config.article.title,
        item: config.canonical,
      });
    }
  } else if (tabName !== 'home') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: config.title.split('|')[0].trim(),
      item: config.canonical,
    });
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
}

function updateFaqSchema(tabName) {
  let faqScript = document.getElementById('qrloop-faq-schema');
  
  if (['home', 'dynamic-qr', 'compare'].includes(tabName)) {
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.id = 'qrloop-faq-schema';
      faqScript.type = 'application/ld+json';
      document.head.appendChild(faqScript);
    }

    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: commonFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    faqScript.textContent = JSON.stringify(faqData);
  } else if (faqScript) {
    faqScript.remove();
  }
}
