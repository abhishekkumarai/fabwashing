# -*- coding: utf-8 -*-
with open(r'C:\Users\abhi3\Documents\work\sipu\fabwashing\stitch\compile_webpage.py', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add favicons in head
head_old = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>'
head_new = (
    '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>\n'
    '  <link rel="icon" type="image/png" href="./favicon.png"/>\n'
    '  <link rel="icon" href="./favicon.ico"/>'
)
code = code.replace(head_old, head_new)

# 2. Upgrade header brand button with prominent logo and official tagline
header_old = (
    '<a href="/" class="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_16px_rgba(13,59,54,0.07),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/85 hover:border-emerald-800/20 hover:shadow-[0_8px_24px_rgba(13,59,54,0.12),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group">\n'
    '        <img alt="FabWashing Logo" class="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" src="./logo.png"/>\n'
    '        <span class="text-xl text-[#0D3B36] font-extrabold tracking-tight">Fab<span class="text-[#059669]">Washing</span></span>\n'
    '      </a>'
)

header_new = (
    '<a href="/" class="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_16px_rgba(13,59,54,0.07),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-emerald-800/20 hover:shadow-[0_8px_24px_rgba(13,59,54,0.12),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group">\n'
    '        <img alt="FabWashing Logo" class="h-11 w-11 rounded-full object-contain transition-transform duration-300 group-hover:scale-105 shadow-sm border border-stone-100" src="./logo.png"/>\n'
    '        <div class="flex flex-col text-left leading-none">\n'
    '          <span class="text-lg sm:text-xl text-[#0D3B36] font-extrabold tracking-tight">Fab<span class="text-[#059669]">Washing</span></span>\n'
    '          <span class="text-[10px] text-stone-500 font-semibold tracking-wider uppercase mt-1">A New Level of Laundry</span>\n'
    '        </div>\n'
    '      </a>'
)
code = code.replace(header_old, header_new)

# 3. Upgrade footer brand header with prominent logo and tagline
footer_old = (
    '<div class="flex items-center gap-3">\n'
    '            <img alt="FabWashing Logo" class="h-8 w-auto object-contain" src="./logo.png"/>\n'
    '            <span class="text-xl text-[#0D3B36] font-bold tracking-tight">Fab<span class="text-[#059669]">Washing</span></span>\n'
    '          </div>'
)

footer_new = (
    '<div class="flex items-center gap-3.5">\n'
    '            <img alt="FabWashing Logo" class="h-12 w-12 rounded-full object-contain shadow-sm border border-stone-100" src="./logo.png"/>\n'
    '            <div class="flex flex-col leading-none">\n'
    '              <span class="text-xl text-[#0D3B36] font-bold tracking-tight">Fab<span class="text-[#059669]">Washing</span></span>\n'
    '              <span class="text-[11px] text-[#059669] font-semibold tracking-wide mt-1">A New Level of Laundry</span>\n'
    '            </div>\n'
    '          </div>'
)
code = code.replace(footer_old, footer_new)

with open(r'C:\Users\abhi3\Documents\work\sipu\fabwashing\stitch\compile_webpage.py', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated compile_webpage.py successfully!')
