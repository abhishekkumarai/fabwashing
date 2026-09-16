import re

file_path = r"C:\Users\abhi3\Documents\work\sipu\fabwashing\stitch\fabwashing-nordic-eco.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace all remote Google logo URLs with local ./logo.png
remote_logo = "https://lh3.googleusercontent.com/aida/AEtjO1XJLRRX_znh4CdXrUImOE305PZO6bYRIAV4JwPXKeZIPPJtPeNe7xinud4eRnTUSe2fPiFbPma4Jc4eCS4nkFVg8N_5GjOiu5lBrlFBuKeFT6w0LZRUw19wxN-NCKnv-_gUnWc5VAsLWru-vHusUWQ8i9JDHn3QBUciB_CGtTc6ehfvQ9U4yn4oQjj0P9ijyXCrx7w28qBiVjt2ZYoh9XeEHodzHnHfuN-egf-KExPCNppCEb1oRTGdlUM"
content = content.replace(remote_logo, "./logo.png")

# New header:
# 1. No middle nav links
# 2. No right hand side menu (cart, book now, avatar removed)
# 3. Transparent boundary with depth feel for the FabWashing button:
#    - Translucent frosted glass background: bg-white/60 backdrop-blur-md
#    - Soft, transparent boundary: border border-stone-200/90
#    - Layered ambient depth shadow + subtle top inner-light bevel:
#      shadow-[0_4px_16px_rgba(13,59,54,0.07),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)]
new_header = (
    '<header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">'
    '<div class="max-w-[1200px] mx-auto px-margin flex items-center h-20">'
    '<a href="#" class="inline-flex items-center gap-space-md px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-stone-200/90 '
    'shadow-[0_4px_16px_rgba(13,59,54,0.07),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] '
    'hover:bg-white/85 hover:border-emerald-800/20 hover:shadow-[0_8px_24px_rgba(13,59,54,0.12),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] '
    'hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group">'
    '<img alt="FabWashing Eco Brand Logo" class="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" src="./logo.png"/>'
    '<span class="font-headline-sm text-headline-sm text-[#0D3B36] font-extrabold tracking-tight">'
    'Fab<span class="text-[#059669]">Washing</span>'
    '</span>'
    '</a>'
    '</div>'
    '</header>'
)

content = re.sub(r'<header.*?</header>', new_header, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Updated successfully! Total length: {len(content)}")
