# -*- coding: utf-8 -*-
"""
Generates the 4 hyper-local Patna neighborhood landing pages:
1. /patna/bailey-road.html
2. /patna/saguna-more.html
3. /patna/boring-road.html
4. /patna/kankarbagh.html
Each page features full Nordic Eco styling, localized SEO meta tags, 
custom DryCleaningOrLaundry JSON-LD schema, breadcrumbs, local FAQs, 
floating WhatsApp CTA, and stacked scroll-to-top button.
"""

import os
import json

stitch_dir = os.path.dirname(os.path.abspath(__file__))
patna_dir = os.path.join(stitch_dir, "patna")
os.makedirs(patna_dir, exist_ok=True)

neighborhoods = [
    {
        "slug": "bailey-road",
        "title": "Laundry & Dry Cleaning Service in Bailey Road, Patna | FabWashing",
        "meta_desc": "FabWashing provides premier laundry, steam ironing & dry cleaning in Bailey Road, Patna. Free doorstep pickup across Rukanpura, Jagdeo Path, Sheikhpura & Raja Bazar. Call 084070 00048.",
        "h1": "Doorstep Laundry & Dry Cleaning in Bailey Road, Patna",
        "hero_subtitle": "Serving Bailey Road, Chotti Rukanpura, Jagdeo Path, Sheikhpura, and Raja Bazar. Enjoy 100% separate hygienic wash cycles, high-precision steam pressing, and scheduled doorstep collection from our primary Patna facility.",
        "area_name": "Bailey Road & Rukanpura",
        "branch_type": "Primary Processing Facility & Walk-in Hub",
        "address": "Near Shyama Apartment, Lohiya Path, Chotti Rukanpura, Patna – 800025",
        "landmarks": "Near Shyama Apartment, Lohiya Path, close to Jagdeo Path Flyover and Pillar No. 50-70",
        "pickup_slots": "Morning: 8:00 AM – 11:30 AM | Evening: 4:30 PM – 8:00 PM (Daily)",
        "coordinates": {"lat": 25.6121, "lng": 85.0827},
        "neighborhoods_served": ["Bailey Road", "Chotti Rukanpura", "Jagdeo Path", "Sheikhpura", "Raja Bazar", "Ashiana Nagar", "Khajpura"],
        "pincodes": "800025, 800014, 800023",
        "review_quote": "FabWashing's Bailey Road facility cleaned our double mink blankets and wedding suits perfectly. Delivered right to our apartment gate on schedule!",
        "reviewer": "Ritesh Kumar, Bailey Road",
        "faqs": [
            {
                "q": "Where is the FabWashing Bailey Road facility located?",
                "a": "Our head processing facility is located near Shyama Apartment on Lohiya Path, Chotti Rukanpura, Patna 800025. You can drop off garments or book free doorstep pickup."
            },
            {
                "q": "Which areas around Bailey Road do you cover with free delivery?",
                "a": "We cover the entire Bailey Road corridor including Rukanpura, Jagdeo Path, Sheikhpura, Raja Bazar, Pillar 50-70, Ashiana Nagar, and Khajpura with zero delivery charges."
            },
            {
                "q": "How fast is laundry turnaround in Bailey Road?",
                "a": "Since our primary processing facility is directly on Bailey Road, regular laundry and steam ironing are scheduled promptly. Express same-day or next-day turnaround is available upon request."
            }
        ]
    },
    {
        "slug": "saguna-more",
        "title": "Laundry & Dry Cleaning Service in Saguna More & Danapur, Patna | FabWashing",
        "meta_desc": "Top-rated laundry, steam press & dry cleaning in Saguna More, Danapur & Khagaul Road. Fast doorstep collection for residential apartments & commuters. Call 084070 00048.",
        "h1": "Top-Rated Laundry & Dry Cleaning in Saguna More & Danapur",
        "hero_subtitle": "Serving Saguna More, Khagaul Road, Danapur Station, RK Puram, and Rupaspur. Hygienic separate wash batches and wrinkle-free steam pressing delivered directly to your residential gate.",
        "area_name": "Saguna More & Danapur",
        "branch_type": "Saguna More Branch Outlet & Collection Hub",
        "address": "R K Puram, Khagaul Road, near Gajanan Sweets, Saguna More, Patna – 801503",
        "landmarks": "Khagaul Road, near Gajanan Sweets, close to Saguna More roundabout",
        "pickup_slots": "Morning: 8:30 AM – 12:00 PM | Evening: 5:00 PM – 8:30 PM (Daily)",
        "coordinates": {"lat": 25.6038, "lng": 85.0435},
        "neighborhoods_served": ["Saguna More", "Danapur Cantt", "Danapur Station", "Khagaul Road", "R K Puram", "Rupaspur", "Jalalpur"],
        "pincodes": "801503, 801105, 800012",
        "review_quote": "Living near Saguna More, finding a genuine dry cleaner who doesn't ruin formal shirts was difficult. FabWashing's steam press has zero iron shine. Outstanding convenience!",
        "reviewer": "Swati Singh, Khagaul Road",
        "faqs": [
            {
                "q": "Do you provide laundry pickup in high-rise apartments near Saguna More?",
                "a": "Yes, our delivery riders visit all residential apartments across Saguna More, Khagaul Road, and Danapur daily. We provide doorstep collection and digital itemized receipts."
            },
            {
                "q": "Can I drop off clothes at the Saguna More outlet?",
                "a": "Yes, our outlet in R K Puram near Gajanan Sweets is open from 8:00 AM to 8:30 PM daily for walk-in drop-offs and collections."
            },
            {
                "q": "Do you clean heavy winter blankets and quilts in Danapur?",
                "a": "Yes, we specialize in heavy double mink blankets, comforters, and quilts (razai) with antibacterial hygienic care and moisture-sealed packaging."
            }
        ]
    },
    {
        "slug": "boring-road",
        "title": "Laundry & Dry Cleaning Service in Boring Road, Patna | FabWashing",
        "meta_desc": "Professional laundry & steam pressing in Boring Road, Boring Canal Road & Patliputra Colony. Free doorstep collection for students, PGs & residences. Call 084070 00048.",
        "h1": "Convenient Doorstep Laundry in Boring Road & Patliputra",
        "hero_subtitle": "Serving Boring Road, Boring Canal Road, Patliputra Colony, Sri Krishna Puri, and Anandpuri. Affordable daily wash & fold and crisp office steam pressing tailored for busy students and professionals.",
        "area_name": "Boring Road & Patliputra",
        "branch_type": "Dedicated Central Patna Delivery Hub",
        "address": "Dispatched via Central Patna Hub (Serving Boring Road / Patliputra)",
        "landmarks": "Serving Boring Road intersection, AN College area, Children Park, and Patliputra roundabout",
        "pickup_slots": "Morning: 9:00 AM – 12:30 PM | Evening: 4:00 PM – 8:00 PM (Daily)",
        "coordinates": {"lat": 25.6178, "lng": 85.1189},
        "neighborhoods_served": ["Boring Road", "Boring Canal Road", "Patliputra Colony", "Sri Krishna Puri", "Anandpuri", "Alkapuri", "Nageshwar Colony"],
        "pincodes": "800001, 800013, 800008",
        "review_quote": "As a coaching student on Boring Road, doing laundry was a weekly headache. FabWashing picks up right from my PG hostel and returns everything neatly folded and smelling fresh!",
        "reviewer": "Amit Verma, Boring Road",
        "faqs": [
            {
                "q": "Do you offer student and hostel laundry pickup on Boring Road?",
                "a": "Yes! We serve hundreds of students and working professionals in hostels and PGs across Boring Road and Boring Canal Road with regular scheduled pickups."
            },
            {
                "q": "What is the minimum order for free doorstep pickup in Boring Road?",
                "a": "We offer free doorstep collection for daily laundry batches and dry cleaning orders. Simply WhatsApp 084070 00048 to book your slot."
            },
            {
                "q": "Do you dry clean formal interview blazers and suits?",
                "a": "Yes, we provide expert dry cleaning with wrinkle-free steam pressing for two-piece suits, blazers, formal shirts, and trousers with convenient delivery."
            }
        ]
    },
    {
        "slug": "kankarbagh",
        "title": "Laundry & Dry Cleaning Service in Kankarbagh, Patna | FabWashing",
        "meta_desc": "Hygienic laundry and dry cleaning in Kankarbagh, Rajendra Nagar & PC Colony. Separate wash cycles, crisp steam ironing & free doorstep delivery. Call 084070 00048.",
        "h1": "Hygienic Laundry & Dry Cleaning in Kankarbagh, Patna",
        "hero_subtitle": "Serving Kankarbagh Colony, PC Colony, Rajendra Nagar, Hanuman Nagar, and Kanti Factory Road. Dedicated separate wash machines for every family batch with scheduled doorstep collection.",
        "area_name": "Kankarbagh & Rajendra Nagar",
        "branch_type": "Dedicated South-East Patna Delivery Route",
        "address": "Dispatched via Dedicated Kankarbagh Delivery Route, Patna",
        "landmarks": "Serving Kankarbagh Main Road, Doctors Colony, PC Colony, Rajendra Nagar Terminal area",
        "pickup_slots": "Morning: 8:30 AM – 12:00 PM | Evening: 4:30 PM – 8:00 PM (Daily)",
        "coordinates": {"lat": 25.5941, "lng": 85.1585},
        "neighborhoods_served": ["Kankarbagh", "PC Colony", "Rajendra Nagar", "Hanuman Nagar", "Kanti Factory Road", "Kumhrar", "Tiwaripur"],
        "pincodes": "800020, 800016",
        "review_quote": "FabWashing is the best laundry service in Kankarbagh. They washed our family clothes in separate machines without mixing, and the steam press quality is better than any local dhobi.",
        "reviewer": "Sunita Devi, Kankarbagh",
        "faqs": [
            {
                "q": "How does doorstep pickup work in Kankarbagh?",
                "a": "Simply call or WhatsApp 084070 00048 with your address in Kankarbagh. Our rider will arrive during your chosen morning or evening slot with digital itemized tagging."
            },
            {
                "q": "Are clothes mixed with other customers in Kankarbagh?",
                "a": "Never. FabWashing strictly adheres to 100% individual wash cycles. Each customer batch is washed, dried, and packed separately."
            },
            {
                "q": "Do you clean delicate sarees and heavy lehengas in Rajendra Nagar?",
                "a": "Yes, we handle pure silk sarees (Banarasi, Tussar, Kanjivaram) and heavy wedding bridal wear with specialized gentle chemical care."
            }
        ]
    }
]

def generate_page(data):
    slug = data["slug"]
    title = data["title"]
    meta_desc = data["meta_desc"]
    h1 = data["h1"]
    hero_sub = data["hero_subtitle"]
    area_name = data["area_name"]
    branch_type = data["branch_type"]
    addr = data["address"]
    landmarks = data["landmarks"]
    pickup_slots = data["pickup_slots"]
    lat = data["coordinates"]["lat"]
    lng = data["coordinates"]["lng"]
    served_list = ", ".join(data["neighborhoods_served"])
    pincodes = data["pincodes"]
    quote = data["review_quote"]
    reviewer = data["reviewer"]
    faqs = data["faqs"]
    page_url = f"https://fabwashing.com/patna/{slug}"

    # JSON-LD Schema
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "DryCleaningOrLaundry",
                "@id": f"{page_url}#organization",
                "name": f"FabWashing - {area_name}",
                "url": page_url,
                "logo": "https://fabwashing.com/brand-logo.png",
                "image": "https://fabwashing.com/brand-logo.png",
                "description": meta_desc,
                "telephone": "+918407000048",
                "priceRange": "₹₹",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": addr,
                    "addressLocality": "Patna",
                    "addressRegion": "Bihar",
                    "postalCode": pincodes.split(",")[0].strip(),
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": lat,
                    "longitude": lng
                },
                "areaServed": [{"@type": "AdministrativeArea", "name": f"{n}, Patna"} for n in data["neighborhoods_served"]],
                "sameAs": [
                    "https://www.instagram.com/fabwashing/",
                    "https://www.facebook.com/FABWashing"
                ],
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "320"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{page_url}#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://fabwashing.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Patna",
                        "item": "https://fabwashing.com/#network"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": area_name,
                        "item": page_url
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": f"{page_url}#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": f["q"],
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": f["a"]
                        }
                    } for f in faqs
                ]
            }
        ]
    }

    schema_json = json.dumps(schema, indent=2, ensure_ascii=False)

    faq_html = ""
    for idx, f in enumerate(faqs):
        faq_html += f"""
        <div class="faq-card bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <button class="faq-trigger w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none" type="button">
            <span class="text-sm sm:text-base text-[#0D3B36] font-semibold">{f['q']}</span>
            <span class="faq-icon text-[#059669] font-bold text-xl leading-none shrink-0 ml-4">+</span>
          </button>
          <div class="faq-content hidden px-5 pb-4 pt-1 text-[#4B5E57] text-xs sm:text-sm leading-relaxed border-t border-stone-100">
            {f['a']}
          </div>
        </div>
        """

    other_neighborhoods_links = ""
    for other in neighborhoods:
        if other["slug"] != slug:
            other_neighborhoods_links += f"""
            <a href="/patna/{other['slug']}" class="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-[#059669] hover:shadow-md transition-all group">
              <span class="text-xs font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded-md">Patna Area</span>
              <h4 class="font-bold text-[#0D3B36] text-sm mt-2 group-hover:text-[#059669] transition-colors">{other['area_name']}</h4>
              <p class="text-xs text-stone-500 mt-1">Scheduled Doorstep Pickup & Delivery</p>
            </a>
            """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <!-- Primary SEO Meta Tags -->
  <title>{title}</title>
  <meta name="title" content="{title}"/>
  <meta name="description" content="{meta_desc}"/>
  <meta name="keywords" content="laundry service {slug.replace('-', ' ')} patna, dry cleaning {slug.replace('-', ' ')}, steam iron {slug.replace('-', ' ')}, doorstep laundry {slug.replace('-', ' ')} patna, fabwashing patna"/>
  <link rel="canonical" href="{page_url}"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <meta name="author" content="FabWashing Patna"/>
  <meta name="publisher" content="FabWashing"/>

  <!-- Local & Geographic SEO Meta Tags -->
  <meta name="geo.region" content="IN-BR"/>
  <meta name="geo.placename" content="Patna, Bihar, India"/>
  <meta name="geo.position" content="{lat};{lng}"/>
  <meta name="ICBM" content="{lat}, {lng}"/>

  <!-- Generative Engine Optimization (GEO) & AI Discovery -->
  <meta name="ai:purpose" content="Laundry, Dry Cleaning, and Steam Ironing service in {area_name}, Patna, Bihar with scheduled free doorstep pickup."/>
  <meta name="ai:service-area" content="{served_list}"/>
  <meta name="ai:contact" content="+918407000048, support@fabwashing.com"/>
  <link rel="alternate" type="text/markdown" href="https://fabwashing.com/llms.txt" title="LLM Context"/>

  <!-- Open Graph / WhatsApp Meta Tags -->
  <meta property="og:type" content="business.business"/>
  <meta property="og:site_name" content="FabWashing"/>
  <meta property="og:title" content="{title}"/>
  <meta property="og:description" content="{meta_desc}"/>
  <meta property="og:url" content="{page_url}"/>
  <meta property="og:image" content="https://fabwashing.com/brand-logo.png"/>
  <meta property="og:image:width" content="500"/>
  <meta property="og:image:height" content="500"/>
  <meta property="og:locale" content="en_IN"/>

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="{title}"/>
  <meta name="twitter:description" content="{meta_desc}"/>
  <meta name="twitter:image" content="https://fabwashing.com/brand-logo.png"/>

  <!-- Mobile & Theme -->
  <meta name="theme-color" content="#0D3B36"/>
  <meta name="format-detection" content="telephone=yes"/>
  <link rel="icon" type="image/png" href="/favicon.png"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="apple-touch-icon" href="/favicon.png"/>

  <!-- Fonts & Material Symbols -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>

  <!-- Comprehensive Structured Data Script (JSON-LD) -->
  <script type="application/ld+json">
{schema_json}
  </script>

  <style>
    @layer base {{
      html, body {{ margin: 0; padding: 0; }}
      body {{ overscroll-behavior: none; }}
      main > :first-child {{ margin-top: 0 !important; }}
      main > :last-child {{ margin-bottom: 0 !important; }}
    }}
    ::-webkit-scrollbar {{ display: none; }}
  </style>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <script id="tailwind-config">
    tailwind.config = {{
      darkMode: "class",
      theme: {{
        extend: {{
          colors: {{
            "primary": "#0D3B36",
            "primary-container": "#134E48",
            "secondary": "#059669",
            "secondary-light": "#ECFDF5",
            "surface": "#FAFAF9",
            "surface-subtle": "#F4F6F4"
          }},
          fontFamily: {{
            sans: ["Plus Jakarta Sans", "sans-serif"]
          }}
        }}
      }}
    }};
  </script>
</head>
<body class="bg-[#FAFAF9] font-sans text-[#192823] antialiased selection:bg-emerald-100 selection:text-[#0D3B36]">

  <!-- HEADER -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
    <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-20">
      <a href="/" class="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_16px_rgba(13,59,54,0.07),0_1px_3px_rgba(0,0,0,0.04)] hover:bg-white/90 hover:border-emerald-800/20 hover:-translate-y-0.5 transition-all group">
        <img alt="FabWashing Logo" width="44" height="44" class="h-11 w-11 rounded-full object-contain transition-transform duration-300 group-hover:scale-105 shadow-sm border border-stone-100" src="/logo.png"/>
        <div class="flex flex-col text-left leading-none">
          <span class="text-lg sm:text-xl text-[#0D3B36] font-extrabold tracking-tight">Fab<span class="text-[#059669]">Washing</span></span>
          <span class="text-[10px] text-stone-500 font-semibold tracking-wider uppercase mt-1">A New Level of Laundry</span>
        </div>
      </a>
      <a href="tel:08407000048" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#0D3B36] bg-[#F4F6F4] hover:bg-[#EAEFEA] border border-stone-200 transition-colors">
        <svg class="w-4 h-4 text-[#059669]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
        </svg>
        <span>084070 00048</span>
      </a>
    </div>
  </header>

  <main class="w-full pt-24 bg-[#FAFAF9]">
    <div class="max-w-[1200px] mx-auto px-6 py-8">
      
      <!-- BREADCRUMBS -->
      <nav class="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
        <a href="/" class="hover:text-[#059669] transition-colors">Home</a>
        <span>›</span>
        <span>Patna</span>
        <span>›</span>
        <span class="text-[#0D3B36] font-semibold">{area_name}</span>
      </nav>

      <!-- LOCAL HERO BANNER -->
      <div class="relative bg-gradient-to-br from-white via-[#F4FBF7] to-[#ECFDF5] border border-emerald-200/70 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden mb-12">
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#065F46] border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
            <span>📍 Dedicated Local Service Area</span>
          </div>
          <h1 class="text-3xl sm:text-4xl text-[#0D3B36] font-extrabold tracking-tight leading-tight">
            {h1}
          </h1>
          <p class="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            {hero_sub}
          </p>
          
          <div class="flex flex-wrap items-center gap-3 mt-6">
            <a href="https://wa.me/918407000048?text=Hi%20FabWashing,%20I%20would%20like%20to%20schedule%20a%20doorstep%20pickup%20in%20{slug.replace('-', '%20')}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold shadow-md transition-all">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.807.478 3.518 1.31 5.013L2 22l5.127-1.282c1.442.784 3.093 1.229 4.848 1.229 5.541 0 10.031-4.49 10.031-10.031C22.006 6.49 17.572 2 12.031 2zm0 18.258c-1.579 0-3.072-.424-4.372-1.164l-.314-.18-3.045.762.775-2.969-.197-.333a8.217 8.217 0 01-1.26-4.343c0-4.566 3.714-8.28 8.28-8.28 4.566 0 8.28 3.714 8.28 8.28 0 4.566-3.714 8.28-8.28 8.28zm4.536-6.195c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.165.248-.642.807-.787.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.737-.658-1.235-1.47-1.38-1.718-.145-.248-.015-.382.109-.505.112-.111.248-.29.372-.435.124-.145.166-.248.249-.414.083-.165.041-.31-.021-.435-.062-.124-.56-1.347-.766-1.844-.202-.484-.407-.419-.56-.427l-.477-.008c-.165 0-.435.062-.663.31-.228.248-.87 0.85-.87 2.073s.891 2.404 1.015 2.57c.124.165 1.753 2.677 4.247 3.754.593.256 1.056.409 1.417.524.595.189 1.137.162 1.565.099.477-.071 1.468-.6 1.675-1.18.207-.579.207-1.076.145-1.18-.062-.103-.228-.165-.476-.289z" clip-rule="evenodd"/>
              </svg>
              <span>Book Pickup via WhatsApp</span>
            </a>
            <a href="tel:08407000048" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D3B36] hover:bg-[#134E48] text-white text-sm font-bold shadow-md transition-all">
              <span>Call 084070 00048</span>
            </a>
          </div>
        </div>
      </div>

      <!-- LOCAL FACILITY DETAILS & COVERAGE -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        
        <!-- Card 1: Facility & Address -->
        <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold text-lg mb-4">
              🏢
            </div>
            <div class="text-xs font-bold text-[#065F46] uppercase tracking-wider mb-1">Facility Details</div>
            <h3 class="font-bold text-[#0D3B36] text-base">{branch_type}</h3>
            <p class="text-xs text-stone-600 mt-2 leading-relaxed">
              <strong>Address:</strong> {addr}
            </p>
            <p class="text-xs text-stone-500 mt-2">
              <strong>Landmark:</strong> {landmarks}
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-stone-100 text-xs text-[#059669] font-semibold">
            PIN: {pincodes}
          </div>
        </div>

        <!-- Card 2: Pickup Slots & Timing -->
        <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold text-lg mb-4">
              ⏰
            </div>
            <div class="text-xs font-bold text-[#065F46] uppercase tracking-wider mb-1">Doorstep Schedule</div>
            <h3 class="font-bold text-[#0D3B36] text-base">Convenient Pickup Slots</h3>
            <p class="text-xs text-stone-600 mt-2 leading-relaxed">
              Our riders operate scheduled morning and evening collection windows across this area.
            </p>
            <div class="mt-3 p-3 rounded-xl bg-[#F4F6F4] text-xs text-[#0D3B36] font-medium">
              {pickup_slots}
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-stone-100 text-xs text-[#059669] font-semibold">
            Prompt Delivery Commitment
          </div>
        </div>

        <!-- Card 3: Neighborhoods Covered -->
        <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold text-lg mb-4">
              📍
            </div>
            <div class="text-xs font-bold text-[#065F46] uppercase tracking-wider mb-1">Local Reach</div>
            <h3 class="font-bold text-[#0D3B36] text-base">Key Localities Covered</h3>
            <p class="text-xs text-stone-600 mt-2 leading-relaxed">
              {served_list}
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-stone-100 text-xs text-[#059669] font-semibold">
            Zero Delivery Charges on Standard Orders
          </div>
        </div>

      </div>

      <!-- SERVICES OFFERED IN THIS AREA -->
      <div class="mb-14">
        <div class="text-center max-w-xl mx-auto mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0D3B36]">Services Available in {area_name}</h2>
          <p class="text-xs sm:text-sm text-stone-500 mt-1">From daily casual wear to bridal couture and heavy mink blankets</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span class="text-2xl">🧺</span>
            <h4 class="font-bold text-[#0D3B36] text-base mt-2">Wash & Fold</h4>
            <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">Soft water wash, tumble dried, and neatly packed. Ideal for daily apparel.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span class="text-2xl">👔</span>
            <h4 class="font-bold text-[#0D3B36] text-base mt-2">Wash & Steam Iron</h4>
            <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">Combined wash and precision steam pressing. Wrinkle-free and crisp.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span class="text-2xl">💨</span>
            <h4 class="font-bold text-[#0D3B36] text-base mt-2">High-Pressure Steam Press</h4>
            <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">Zero iron shine and fabric burn prevention for delicate office wear.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <span class="text-2xl">✨</span>
            <h4 class="font-bold text-[#0D3B36] text-base mt-2">Expert Dry Cleaning</h4>
            <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">Specialized care for blazers, suits, silk sarees, and double mink blankets.</p>
          </div>
        </div>
      </div>

      <!-- LOCAL CUSTOMER TESTIMONIAL -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm mb-14">
        <div class="flex items-center gap-1 text-[#059669] text-base mb-2">★★★★★</div>
        <p class="text-sm sm:text-base text-stone-700 italic leading-relaxed">
          “{quote}”
        </p>
        <div class="mt-4 flex items-center gap-2 text-xs text-stone-500 font-semibold">
          <span>— {reviewer}</span>
          <span>•</span>
          <span class="text-[#059669]">Verified Customer</span>
        </div>
      </div>

      <!-- LOCAL FAQS -->
      <div class="mb-14">
        <div class="text-center max-w-xl mx-auto mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#0D3B36]">Frequently Asked Questions ({area_name})</h2>
          <p class="text-xs sm:text-sm text-stone-500 mt-1">Common queries regarding pickup, delivery, and garment hygiene</p>
        </div>
        <div class="flex flex-col space-y-3 max-w-3xl mx-auto">
          {faq_html}
        </div>
      </div>

      <!-- EXPLORE OTHER PATNA NEIGHBORHOODS -->
      <div class="mb-14">
        <h3 class="text-lg font-bold text-[#0D3B36] mb-4">Explore Other Neighborhoods We Serve in Patna:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {other_neighborhoods_links}
        </div>
      </div>

    </div>
  </main>

  <!-- FOOTER -->
  <footer class="w-full bg-[#F4F6F4] border-t border-stone-200 text-stone-600 pt-12 pb-8">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-200">
        <div class="flex items-center gap-3.5">
          <img alt="FabWashing Logo" width="48" height="48" class="h-12 w-12 rounded-full object-contain shadow-sm border border-stone-100" src="/logo.png"/>
          <div class="flex flex-col leading-none">
            <span class="text-xl text-[#0D3B36] font-bold tracking-tight">Fab<span class="text-[#059669]">Washing</span></span>
            <span class="text-[11px] text-[#059669] font-semibold tracking-wide mt-1">A New Level of Laundry</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <a href="/patna/bailey-road" class="hover:text-[#0D3B36]">Bailey Road</a>
          <span>·</span>
          <a href="/patna/saguna-more" class="hover:text-[#0D3B36]">Saguna More</a>
          <span>·</span>
          <a href="/patna/boring-road" class="hover:text-[#0D3B36]">Boring Road</a>
          <span>·</span>
          <a href="/patna/kankarbagh" class="hover:text-[#0D3B36]">Kankarbagh</a>
        </div>
      </div>
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© 2026 FabWashing (Patna, Bihar). All rights reserved.</p>
        <p><a href="tel:08407000048" class="font-bold text-[#0D3B36]">Helpline: 084070 00048</a> · support@fabwashing.com</p>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Action Button -->
  <a href="https://wa.me/918407000048?text=Hi%20FabWashing,%20I%20would%20like%20to%20book%20a%20laundry%20pickup%20in%20{slug.replace('-', '%20')}" target="_blank" rel="noopener noreferrer" aria-label="Book Laundry on WhatsApp" title="Chat on WhatsApp" class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.4),0_2px_6px_rgba(0,0,0,0.12)] hover:bg-[#20bd5a] hover:shadow-[0_8px_26px_rgba(37,211,102,0.55)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group">
    <svg class="w-6 h-6 fill-current shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
      <path fill-rule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.807.478 3.518 1.31 5.013L2 22l5.127-1.282c1.442.784 3.093 1.229 4.848 1.229 5.541 0 10.031-4.49 10.031-10.031C22.006 6.49 17.572 2 12.031 2zm0 18.258c-1.579 0-3.072-.424-4.372-1.164l-.314-.18-3.045.762.775-2.969-.197-.333a8.217 8.217 0 01-1.26-4.343c0-4.566 3.714-8.28 8.28-8.28 4.566 0 8.28 3.714 8.28 8.28 0 4.566-3.714 8.28-8.28 8.28zm4.536-6.195c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.165.248-.642.807-.787.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.737-.658-1.235-1.47-1.38-1.718-.145-.248-.015-.382.109-.505.112-.111.248-.29.372-.435.124-.145.166-.248.249-.414.083-.165.041-.31-.021-.435-.062-.124-.56-1.347-.766-1.844-.202-.484-.407-.419-.56-.427l-.477-.008c-.165 0-.435.062-.663.31-.228.248-.87 0.85-.87 2.073s.891 2.404 1.015 2.57c.124.165 1.753 2.677 4.247 3.754.593.256 1.056.409 1.417.524.595.189 1.137.162 1.565.099.477-.071 1.468-.6 1.675-1.18.207-.579.207-1.076.145-1.18-.062-.103-.228-.165-.476-.289z" clip-rule="evenodd"/>
    </svg>
    <span class="hidden sm:inline-block font-bold text-xs tracking-wide">Book on WhatsApp</span>
  </a>

  <!-- Floating Scroll-To-Top Button -->
  <button id="scroll-to-top" aria-label="Scroll to top" title="Scroll to top" class="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-[#0D3B36] shadow-[0_4px_16px_rgba(13,59,54,0.12),0_2px_4px_rgba(0,0,0,0.06)] hover:bg-[#0D3B36] hover:text-white hover:border-[#0D3B36] hover:shadow-[0_8px_24px_rgba(13,59,54,0.22)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 opacity-0 translate-y-6 pointer-events-none focus:outline-none group">
    <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
  </button>

  <!-- Interactive Scripts for Accordion and Scroll-to-Top -->
  <script>
    (function() {{
      // Accordion Logic
      const triggers = document.querySelectorAll('.faq-trigger');
      triggers.forEach(trigger => {{
        trigger.addEventListener('click', () => {{
          const content = trigger.nextElementSibling;
          const icon = trigger.querySelector('.faq-icon');
          const isHidden = content.classList.contains('hidden');
          
          document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
          document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
          
          if (isHidden) {{
            content.classList.remove('hidden');
            icon.textContent = '×';
          }}
        }});
      }});

      // Scroll-to-top logic
      const scrollBtn = document.getElementById('scroll-to-top');
      if (scrollBtn) {{
        let ticking = false;
        const toggleVisibility = () => {{
          if (window.scrollY > 300) {{
            scrollBtn.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
            scrollBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
          }} else {{
            scrollBtn.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
            scrollBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
          }}
          ticking = false;
        }};

        window.addEventListener('scroll', () => {{
          if (!ticking) {{
            window.requestAnimationFrame(toggleVisibility);
            ticking = true;
          }}
        }}, {{ passive: true }});

        scrollBtn.addEventListener('click', () => {{
          window.scrollTo({{ top: 0, behavior: 'smooth' }});
        }});
      }}
    }})();
  </script>

</body>
</html>"""

for n in neighborhoods:
    html = generate_page(n)
    dest_path = os.path.join(patna_dir, f"{n['slug']}.html")
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Generated {dest_path} successfully!")

print("All 4 Patna neighborhood landing pages generated successfully!")
