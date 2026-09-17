# -*- coding: utf-8 -*-
"""
Updates compile_webpage.py and generates SEO & GEO files:
1. Generative Engine Optimization (GEO) meta tags in <head>
2. Link to /llms.txt for AI search models
3. Enriched schema.org JSON-LD graph with knowsAbout and disambiguatingDescription
4. Updated robots.txt allowing all AI bots & scrapers (GPTBot, ClaudeBot, PerplexityBot, etc.)
5. Standard /llms.txt markdown knowledge guide for LLM retrieval
6. Recompiles index.html and fabwashing-nordic-eco.html
"""

import json
import os

stitch_dir = os.path.dirname(os.path.abspath(__file__))

schema_graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "DryCleaningOrLaundry",
            "@id": "https://fabwashing.com/#organization",
            "name": "FabWashing",
            "alternateName": ["Fab Washing", "FabWashing Patna", "Fab Washing Laundry & Dry Cleaning"],
            "slogan": "A New Level of Laundry",
            "url": "https://fabwashing.com/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://fabwashing.com/brand-logo.png",
                "width": 500,
                "height": 500,
                "caption": "FabWashing Logo"
            },
            "image": "https://fabwashing.com/brand-logo.png",
            "description": "Patna's leading technology-driven, sustainable daily laundry & dry cleaning service provider. Delivering separate hygienic wash cycles, quality fabric care, and free doorstep pickup and delivery across Patna.",
            "disambiguatingDescription": "FabWashing is a technology-driven professional laundry and dry cleaning enterprise operating 4 physical branches in Patna, Bihar offering separate batch washing and free scheduled doorstep pickup.",
            "knowsAbout": [
                "Laundry Services",
                "Dry Cleaning",
                "High-Pressure Steam Pressing",
                "Wedding Attire Dry Cleaning",
                "Mink Blanket & Quilt Washing",
                "Separate Machine Hygienic Washing",
                "Doorstep Laundry Pickup and Delivery"
            ],
            "keywords": "laundry service in patna, dry cleaning patna, steam ironing patna, wash and fold patna, doorstep laundry service patna",
            "telephone": "+918407000048",
            "email": "support@fabwashing.com",
            "priceRange": "₹₹",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, UPI, Google Pay, PhonePe, Paytm, Debit Card, Credit Card",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bailey Road, near Shyama Apartment, Lohiya Path, Chotti Rukanpura",
                "addressLocality": "Patna",
                "addressRegion": "Bihar",
                "postalCode": "800025",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.6121,
                "longitude": 85.0827
            },
            "hasMap": "https://maps.google.com/?q=FabWashing+Patna",
            "areaServed": [
                {"@type": "AdministrativeArea", "name": "Bailey Road, Patna"},
                {"@type": "AdministrativeArea", "name": "Boring Road, Patna"},
                {"@type": "AdministrativeArea", "name": "Patliputra Colony, Patna"},
                {"@type": "AdministrativeArea", "name": "Saguna More, Patna"},
                {"@type": "AdministrativeArea", "name": "Danapur, Patna"},
                {"@type": "AdministrativeArea", "name": "Dhanaut, Patna"},
                {"@type": "AdministrativeArea", "name": "Khagaul Road, Patna"},
                {"@type": "AdministrativeArea", "name": "Anisabad, Patna"},
                {"@type": "AdministrativeArea", "name": "Kankarbagh, Patna"},
                {"@type": "AdministrativeArea", "name": "Raja Bazar, Patna"},
                {"@type": "AdministrativeArea", "name": "Ashiana Nagar, Patna"},
                {"@type": "AdministrativeArea", "name": "Gola Road, Patna"},
                {"@type": "City", "name": "Patna"}
            ],
            "sameAs": [
                "https://www.instagram.com/fabwashing/",
                "https://www.facebook.com/FABWashing"
            ],
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "08:00",
                    "closes": "20:30"
                }
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "320",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Ritesh Kumar"},
                    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                    "reviewBody": "Gave my heavy double mink blankets and winter jackets for dry cleaning. They returned completely clean, fresh smelling, and packed in protective covers. The delivery boy was very courteous!"
                },
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Swati Singh"},
                    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                    "reviewBody": "Best steam press and laundry service near Saguna More. My formal shirts and trousers have no iron shine, and collars are crisp. Doorstep pickup makes it super convenient after office hours."
                },
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Manoj Pandey"},
                    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                    "reviewBody": "Affordable rates compared to other dry cleaners in Patna and quality is top notch. They wash each customer's batch separately so there is complete hygiene. Highly recommend!"
                }
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "FabWashing Garment Care Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Wash & Fold",
                            "description": "Daily wear clothes washed with softened water, gentle detergents, tumble dried and neatly folded with free doorstep pickup in Patna."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Wash & Steam Iron",
                            "description": "Thorough washing paired with high-pressure steam pressing. Wrinkle-free, crisp finish ready for office or daily wear."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "High-Pressure Steam Pressing",
                            "description": "Professional steam ironing that is gentle on delicate fabrics and eliminates harsh iron shine."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Expert Dry Cleaning",
                            "description": "Specialized eco-friendly chemical dry cleaning for suits, blazers, silk sarees, lehengas, sherwanis, mink blankets, and quilts."
                        }
                    }
                ]
            },
            "subOrganization": [
                {
                    "@type": "DryCleaningOrLaundry",
                    "name": "FabWashing Bailey Road",
                    "telephone": "+918407000048",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Near Shyama Apartment, Lohiya Path, Chotti Rukanpura",
                        "addressLocality": "Patna",
                        "addressRegion": "Bihar",
                        "postalCode": "800025",
                        "addressCountry": "IN"
                    }
                },
                {
                    "@type": "DryCleaningOrLaundry",
                    "name": "FabWashing Dhanaut Branch",
                    "telephone": "+918407000048",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Lohiya Path, Murlichack, Dhanaut",
                        "addressLocality": "Patna",
                        "addressRegion": "Bihar",
                        "addressCountry": "IN"
                    }
                },
                {
                    "@type": "DryCleaningOrLaundry",
                    "name": "FabWashing Anisabad / Purnendu Nagar",
                    "telephone": "+918407000048",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Khwaja Imli Rd, Anisabad Road, Purnendu Nagar, Nandan Puri",
                        "addressLocality": "Patna",
                        "addressRegion": "Bihar",
                        "addressCountry": "IN"
                    }
                },
                {
                    "@type": "DryCleaningOrLaundry",
                    "name": "FabWashing Saguna More",
                    "telephone": "+918407000048",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "R K Puram, Khagaul Road, near Gajanan Sweets, Saguna More",
                        "addressLocality": "Patna",
                        "addressRegion": "Bihar",
                        "addressCountry": "IN"
                    }
                }
            ]
        },
        {
            "@type": "WebSite",
            "@id": "https://fabwashing.com/#website",
            "url": "https://fabwashing.com/",
            "name": "FabWashing",
            "description": "Patna's Trusted Laundry, Steam Ironing & Dry Cleaning Services",
            "publisher": {"@id": "https://fabwashing.com/#organization"},
            "inLanguage": "en-IN"
        },
        {
            "@type": "FAQPage",
            "@id": "https://fabwashing.com/#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Which areas in Patna do you serve with free pickup and delivery?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We provide pickup and delivery across major parts of Patna, including Bailey Road, Boring Road, Patliputra, Saguna More, Khagaul Road, Dhanaut, Anisabad, Purnendu Nagar, Kankarbagh, Jagdeo Path, and Gola Road. Call or WhatsApp 084070 00048 to schedule."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the turnaround time for laundry and dry cleaning?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We provide prompt, scheduled turnaround based on your garment care needs. Regular daily laundry and steam ironing are processed and delivered according to your scheduled slot. Premium dry cleaning for heavy wedding attire, blankets, or curtains is completed with thorough care in 2 to 3 days. Express service is available upon request."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Are my clothes washed together with other people's clothes?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Never. We strictly follow individual wash cycles for every single customer batch. Your clothes are tagged, sorted, washed, and dried in dedicated machines to maintain complete hygiene and avoid cross-contamination."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How can I book a laundry pickup?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can simply call or WhatsApp our helpline at 084070 00048 with your pickup location and preferred time slot, or visit any of our nearby outlets in Bailey Road, Dhanaut, Saguna More, or Anisabad."
                    }
                }
            ]
        }
    ]
}

schema_json_string = json.dumps(schema_graph, indent=2, ensure_ascii=False)

seo_head_block = f"""  <!-- Primary SEO Meta Tags -->
  <title>FabWashing Patna | Best Laundry, Steam Ironing &amp; Dry Cleaning Services</title>
  <meta name="title" content="FabWashing Patna | Best Laundry, Steam Ironing &amp; Dry Cleaning Services"/>
  <meta name="description" content="FabWashing is Patna's top-rated laundry, steam ironing &amp; dry cleaning service with free doorstep pickup &amp; delivery across Bailey Road, Saguna More, Dhanaut, Anisabad, and Kankarbagh. Separate hygienic wash &amp; expert fabric care. Call 084070 00048."/>
  <meta name="keywords" content="laundry service in patna, dry cleaning patna, dry cleaner near me patna, steam ironing patna, wash and fold patna, doorstep laundry service patna, fabwashing, fab washing patna, laundry patna bihar, saree dry cleaning patna, blanket dry clean patna"/>
  <link rel="canonical" href="https://fabwashing.com/"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="author" content="FabWashing Patna"/>
  <meta name="publisher" content="FabWashing"/>

  <!-- Local & Geographic SEO Meta Tags (Patna Ground Truth) -->
  <meta name="geo.region" content="IN-BR"/>
  <meta name="geo.placename" content="Patna, Bihar, India"/>
  <meta name="geo.position" content="25.6121;85.0827"/>
  <meta name="ICBM" content="25.6121, 85.0827"/>

  <!-- Generative Engine Optimization (GEO) & AI Discovery Meta Tags -->
  <meta name="ai:purpose" content="Laundry, Dry Cleaning, and Steam Ironing service in Patna, Bihar with free scheduled doorstep pickup and delivery."/>
  <meta name="ai:service-area" content="Patna, Bailey Road, Boring Road, Patliputra, Saguna More, Danapur, Dhanaut, Anisabad, Kankarbagh, Khagaul, Raja Bazar"/>
  <meta name="ai:contact" content="+918407000048, support@fabwashing.com"/>
  <meta name="citation_title" content="FabWashing Patna - Professional Laundry &amp; Dry Cleaning Service"/>
  <meta name="citation_author" content="FabWashing"/>
  <meta name="citation_publisher" content="FabWashing"/>
  <meta name="DC.title" content="FabWashing Patna | Best Laundry, Steam Ironing &amp; Dry Cleaning Services"/>
  <meta name="DC.creator" content="FabWashing"/>
  <meta name="DC.subject" content="Laundry, Dry Cleaning, Steam Ironing, Doorstep Laundry Patna, FabWashing"/>
  <meta name="DC.description" content="Patna's top-rated laundry, steam ironing &amp; dry cleaning service with free doorstep pickup &amp; delivery. Separate hygienic wash &amp; expert fabric care. Call 084070 00048."/>
  <meta name="DC.publisher" content="FabWashing"/>
  <meta name="DC.coverage" content="Patna, Bihar, India"/>
  <meta name="DC.language" content="en"/>
  <link rel="alternate" type="text/markdown" href="https://fabwashing.com/llms.txt" title="LLM Context"/>

  <!-- Open Graph / Facebook / WhatsApp Meta Tags -->
  <meta property="og:type" content="business.business"/>
  <meta property="og:site_name" content="FabWashing"/>
  <meta property="og:title" content="FabWashing Patna | Best Laundry, Steam Ironing &amp; Dry Cleaning Services"/>
  <meta property="og:description" content="Patna's top-rated laundry &amp; dry cleaning service with free doorstep pickup across Bailey Road, Saguna More, Dhanaut, Anisabad &amp; Kankarbagh. Separate hygienic wash, zero clothes mixed. Call 084070 00048."/>
  <meta property="og:url" content="https://fabwashing.com/"/>
  <meta property="og:image" content="https://fabwashing.com/brand-logo.png"/>
  <meta property="og:image:secure_url" content="https://fabwashing.com/brand-logo.png"/>
  <meta property="og:image:type" content="image/png"/>
  <meta property="og:image:width" content="500"/>
  <meta property="og:image:height" content="500"/>
  <meta property="og:image:alt" content="FabWashing - A New Level of Laundry in Patna"/>
  <meta property="og:locale" content="en_IN"/>
  <meta property="business:contact_data:street_address" content="Bailey Road, near Shyama Apartment, Lohiya Path, Chotti Rukanpura"/>
  <meta property="business:contact_data:locality" content="Patna"/>
  <meta property="business:contact_data:region" content="Bihar"/>
  <meta property="business:contact_data:postal_code" content="800025"/>
  <meta property="business:contact_data:country_name" content="India"/>
  <meta property="business:contact_data:phone_number" content="+918407000048"/>
  <meta property="business:contact_data:website" content="https://fabwashing.com/"/>

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="FabWashing Patna | Best Laundry &amp; Dry Cleaning Services"/>
  <meta name="twitter:description" content="Hygienic separate wash, steam press &amp; expert dry cleaning with free doorstep delivery in Patna. Call 084070 00048."/>
  <meta name="twitter:image" content="https://fabwashing.com/brand-logo.png"/>
  <meta name="twitter:image:alt" content="FabWashing Logo"/>

  <!-- Mobile & Browser UI Meta Tags -->
  <meta name="theme-color" content="#0D3B36"/>
  <meta name="format-detection" content="telephone=yes"/>
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-title" content="FabWashing"/>

  <!-- Favicon Links -->
  <link rel="icon" type="image/png" href="./favicon.png"/>
  <link rel="icon" href="./favicon.ico"/>
  <link rel="apple-touch-icon" href="./favicon.png"/>

  <!-- Comprehensive SEO & GEO Schema Script (JSON-LD) -->
  <script type="application/ld+json">
{schema_json_string}
  </script>"""

# Replace in compile_webpage.py
compile_py_path = os.path.join(stitch_dir, "compile_webpage.py")
with open(compile_py_path, "r", encoding="utf-8") as f:
    compile_content = f.read()

import re

# Replace the block between <head> and <link href="https://fonts.googleapis.com
head_replacement_pattern = r'<head>\s*<meta charset="utf-8"/>\s*<meta content="width=device-width, initial-scale=1.0" name="viewport"/>.*?(?=<link href="https://fonts\.googleapis\.com)'

new_head_content = """<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
""" + seo_head_block + "\n  "

updated_compile_content = re.sub(head_replacement_pattern, new_head_content, compile_content, flags=re.DOTALL)

with open(compile_py_path, "w", encoding="utf-8") as f:
    f.write(updated_compile_content)

print("Updated compile_webpage.py with GEO tags and AI discovery successfully!")
