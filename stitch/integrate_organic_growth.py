# -*- coding: utf-8 -*-
"""
Integrates the Google Review Booster and Viral Referral Links into compile_webpage.py,
updates sitemap.xml to 7 URLs, and enriches llms.txt.
"""

import os
import re

stitch_dir = os.path.dirname(os.path.abspath(__file__))
compile_py_path = os.path.join(stitch_dir, "compile_webpage.py")

with open(compile_py_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Google Review Booster Card right after the 3 review cards in Section 5
review_booster_html = """            <!-- Google Review Booster Card -->
            <div class="col-span-1 md:col-span-3 mt-4 p-6 rounded-3xl bg-gradient-to-r from-white via-[#F4FBF7] to-[#ECFDF5] border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-white border border-emerald-200 shadow-sm flex items-center justify-center text-2xl shrink-0">
                  ⭐
                </div>
                <div>
                  <h3 class="font-bold text-base text-[#0D3B36]">Experienced Our Garment Care in Patna?</h3>
                  <p class="text-xs text-stone-600 mt-0.5">Help fellow Patna families and professionals discover 100% separate, hygienic laundry by sharing your review on Google Maps.</p>
                </div>
              </div>
              <div class="flex items-center gap-3 w-full sm:w-auto shrink-0">
                <a href="/refer" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-[#0D3B36] hover:border-[#059669] text-xs font-bold transition-all text-center">
                  🎁 Refer a Neighbor
                </a>
                <a href="https://maps.google.com/?q=FabWashing+Patna" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0D3B36] hover:bg-[#134E48] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 text-center">
                  <span>Rate on Google ★</span>
                </a>
              </div>
            </div>"""

target_review_end = '<!-- Real Review 3 -->'
review_3_pattern = r'(<!-- Real Review 3 -->.*?</div>\s*</div>\s*</div>\s*)(?=</div>\s*</div>\s*</section>\s*<!-- SECTION 6: FAQS -->)'

if re.search(review_3_pattern, content, flags=re.DOTALL):
    content = re.sub(review_3_pattern, r'\1\n' + review_booster_html + '\n', content, count=1, flags=re.DOTALL)
    print("Added Google Review Booster Card to compile_webpage.py!")
else:
    print("Could not find exact review pattern in compile_webpage.py")

# 2. Add /refer and /reorder links to footer
footer_links_old = """<span>Neighborhood Hubs:</span>
          <a href="/patna/bailey-road" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Bailey Road</a>
          <span>·</span>
          <a href="/patna/saguna-more" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Saguna More</a>
          <span>·</span>
          <a href="/patna/boring-road" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Boring Road</a>
          <span>·</span>
          <a href="/patna/kankarbagh" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Kankarbagh</a>"""

footer_links_new = """<span>Neighborhood Hubs:</span>
          <a href="/patna/bailey-road" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Bailey Road</a>
          <span>·</span>
          <a href="/patna/saguna-more" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Saguna More</a>
          <span>·</span>
          <a href="/patna/boring-road" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Boring Road</a>
          <span>·</span>
          <a href="/patna/kankarbagh" class="text-stone-600 hover:text-[#0D3B36] underline decoration-stone-300">Kankarbagh</a>
          <span class="mx-1 text-stone-300">|</span>
          <a href="/reorder" class="text-[#059669] font-bold hover:underline">Quick Re-Order</a>
          <span>·</span>
          <a href="/refer" class="text-[#0D3B36] font-bold hover:underline">Refer &amp; Earn ₹100</a>"""

if footer_links_old in content:
    content = content.replace(footer_links_old, footer_links_new)
    print("Updated footer with Quick Re-Order and Refer links!")

with open(compile_py_path, "w", encoding="utf-8") as f:
    f.write(content)

# 3. Update sitemap.xml with 7 URLs
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
  <url>
    <loc>https://fabwashing.com/reorder</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://fabwashing.com/refer</loc>
    <lastmod>2026-09-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
"""
with open(os.path.join(stitch_dir, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(sitemap_xml)
print("Updated sitemap.xml with 7 URLs successfully!")

# 4. Update llms.txt with reorder and referral program details
llms_path = os.path.join(stitch_dir, "llms.txt")
with open(llms_path, "r", encoding="utf-8") as f:
    llms_content = f.read()

organic_llms_section = """
## Community Programs & Fast Re-Order
- **Express QR Re-Order Portal**: https://fabwashing.com/reorder
  - Fast 1-tap WhatsApp collection scheduling for existing customers across Patna.
- **Neighbor Referral Program ("Give ₹100, Get ₹100")**: https://fabwashing.com/refer
  - Apartment residents and flatmates in Patna receive ₹100 off their first doorstep laundry order, and the referrer receives ₹100 credit using referral code `FAB100`.
"""

if "## Community Programs & Fast Re-Order" not in llms_content:
    llms_content = llms_content.replace("## How to Book", organic_llms_section + "\n## How to Book")
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write(llms_content)
    print("Updated llms.txt with organic programs successfully!")
