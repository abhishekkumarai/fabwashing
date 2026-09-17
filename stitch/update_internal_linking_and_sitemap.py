# -*- coding: utf-8 -*-
"""
Updates compile_webpage.py with:
1. Explicit image dimensions (width/height) on branding logos for 0.00 CLS.
2. Interactive links on the 4 neighborhood network cards pointing to:
   - /patna/bailey-road
   - /patna/saguna-more
   - /patna/boring-road
   - /patna/kankarbagh
3. Footer links to all 4 neighborhood hubs.
4. Updates sitemap.xml with all 5 URLs.
5. Updates llms.txt with neighborhood directory for AI search models.
"""

import os
import re

stitch_dir = os.path.dirname(os.path.abspath(__file__))
compile_py_path = os.path.join(stitch_dir, "compile_webpage.py")

with open(compile_py_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update logo image tags to include explicit width and height
content = content.replace(
    '<img alt="FabWashing Logo" class="h-11 w-11 rounded-full object-contain transition-transform duration-300 group-hover:scale-105 shadow-sm border border-stone-100" src="./logo.png"/>',
    '<img alt="FabWashing Logo" width="44" height="44" class="h-11 w-11 rounded-full object-contain transition-transform duration-300 group-hover:scale-105 shadow-sm border border-stone-100" src="./logo.png"/>'
)
content = content.replace(
    '<img alt="FabWashing Logo" class="h-12 w-12 rounded-full object-contain shadow-sm border border-stone-100" src="./logo.png"/>',
    '<img alt="FabWashing Logo" width="48" height="48" class="h-12 w-12 rounded-full object-contain shadow-sm border border-stone-100" src="./logo.png"/>'
)

# 2. Update the 4 Branch Locations Grid to be clickable interactive links
old_grid_pattern = r'<!-- 4 Branch Locations Grid -->\s*<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">.*?<!-- SECTION 4: HOW FABWASHING WORKS -->'

new_grid_html = """<!-- 4 Branch Locations Grid (Interactive Local SEO Hubs) -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <!-- Branch 1: Bailey Road / Chotti Rukanpura -->
                <a href="/patna/bailey-road" class="group/card bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#059669] hover:-translate-y-0.5 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded-md">Head Facility</span>
                      <span class="text-xs text-[#059669] font-bold">★ 4.8</span>
                    </div>
                    <h3 class="font-bold text-[#0D3B36] text-sm group-hover/card:text-[#059669] transition-colors">Bailey Road / Rukanpura</h3>
                    <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Near Shyama Apartment, Lohiya Path, Chotti Rukanpura, Patna – 800025.
                    </p>
                  </div>
                  <div class="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span class="text-stone-500">Bailey Rd, Boring Rd</span>
                    <span class="text-[#059669] font-bold group-hover/card:translate-x-0.5 transition-transform">Explore Hub →</span>
                  </div>
                </a>

                <!-- Branch 2: Saguna More / Danapur -->
                <a href="/patna/saguna-more" class="group/card bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#059669] hover:-translate-y-0.5 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded-md">Saguna Outlet</span>
                      <span class="text-xs text-[#059669] font-bold">★ 5.0</span>
                    </div>
                    <h3 class="font-bold text-[#0D3B36] text-sm group-hover/card:text-[#059669] transition-colors">Saguna More / Danapur</h3>
                    <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      R K Puram, Khagaul Road, near Gajanan Sweets, Saguna More, Patna.
                    </p>
                  </div>
                  <div class="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span class="text-stone-500">Danapur, Khagaul Rd</span>
                    <span class="text-[#059669] font-bold group-hover/card:translate-x-0.5 transition-transform">Explore Hub →</span>
                  </div>
                </a>

                <!-- Branch 3: Boring Road / Patliputra Hub -->
                <a href="/patna/boring-road" class="group/card bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#059669] hover:-translate-y-0.5 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded-md">Central Patna</span>
                      <span class="text-xs text-[#059669] font-bold">★ 4.9</span>
                    </div>
                    <h3 class="font-bold text-[#0D3B36] text-sm group-hover/card:text-[#059669] transition-colors">Boring Road / Patliputra</h3>
                    <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Scheduled doorstep collection for student PGs, hostels, and residences.
                    </p>
                  </div>
                  <div class="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span class="text-stone-500">Boring Rd, SK Puri</span>
                    <span class="text-[#059669] font-bold group-hover/card:translate-x-0.5 transition-transform">Explore Hub →</span>
                  </div>
                </a>

                <!-- Branch 4: Kankarbagh & Rajendra Nagar -->
                <a href="/patna/kankarbagh" class="group/card bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#059669] hover:-translate-y-0.5 transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-bold text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded-md">South-East Hub</span>
                      <span class="text-xs text-[#059669] font-bold">★ 4.8</span>
                    </div>
                    <h3 class="font-bold text-[#0D3B36] text-sm group-hover/card:text-[#059669] transition-colors">Kankarbagh / Rajendra Nagar</h3>
                    <p class="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Dedicated doorstep route for Kankarbagh Colony, PC Colony & Hanuman Nagar.
                    </p>
                  </div>
                  <div class="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span class="text-stone-500">Kankarbagh, PC Colony</span>
                    <span class="text-[#059669] font-bold group-hover/card:translate-x-0.5 transition-transform">Explore Hub →</span>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: HOW FABWASHING WORKS -->"""

content = re.sub(old_grid_pattern, new_grid_html, content, flags=re.DOTALL)

# 3. Update footer branch text with clickable links
old_footer_text = '<p class="text-stone-400">Branches at Bailey Road · Dhanaut · Saguna More · Anisabad</p>'
new_footer_text = """<div class="flex flex-wrap items-center gap-2 text-stone-500 text-xs">
          <span>Neighborhood Hubs:</span>
          <a href="/patna/bailey-road" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Bailey Road</a>
          <span>·</span>
          <a href="/patna/saguna-more" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Saguna More</a>
          <span>·</span>
          <a href="/patna/boring-road" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Boring Road</a>
          <span>·</span>
          <a href="/patna/kankarbagh" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Kankarbagh</a>
        </div>"""

content = content.replace(old_footer_text, new_footer_text)

with open(compile_py_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated compile_webpage.py successfully!")

# 4. Update sitemap.xml with all 5 URLs
sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fabwashing.com/</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fabwashing.com/patna/bailey-road</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fabwashing.com/patna/saguna-more</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fabwashing.com/patna/boring-road</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fabwashing.com/patna/kankarbagh</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
"""
with open(os.path.join(stitch_dir, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(sitemap_xml)
print("Updated sitemap.xml with 5 URLs successfully!")

# 5. Update llms.txt with dedicated neighborhood landing pages
llms_path = os.path.join(stitch_dir, "llms.txt")
with open(llms_path, "r", encoding="utf-8") as f:
    llms_content = f.read()

neighborhood_llms_section = """
## Dedicated Patna Neighborhood Landing Pages & Delivery Hubs
- **Bailey Road / Rukanpura Hub**: https://fabwashing.com/patna/bailey-road
  - Primary coverage: Bailey Road, Chotti Rukanpura, Jagdeo Path, Sheikhpura, Raja Bazar, Ashiana Nagar.
- **Saguna More & Danapur Hub**: https://fabwashing.com/patna/saguna-more
  - Primary coverage: Saguna More, Danapur Station, Khagaul Road, RK Puram, Rupaspur.
- **Boring Road & Patliputra Hub**: https://fabwashing.com/patna/boring-road
  - Primary coverage: Boring Road, Boring Canal Road, Patliputra Colony, Sri Krishna Puri, Anandpuri.
- **Kankarbagh & Rajendra Nagar Hub**: https://fabwashing.com/patna/kankarbagh
  - Primary coverage: Kankarbagh Colony, PC Colony, Rajendra Nagar, Hanuman Nagar, Kanti Factory Road.
"""

if "## Dedicated Patna Neighborhood Landing Pages" not in llms_content:
    llms_content = llms_content.replace("## Services Offered", neighborhood_llms_section + "\n## Services Offered")
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write(llms_content)
    print("Updated llms.txt with neighborhood directory successfully!")
