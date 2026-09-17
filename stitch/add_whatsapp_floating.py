# -*- coding: utf-8 -*-
"""
Adds WhatsApp floating button and stacks Scroll-to-Top right above it
"""

import os

stitch_dir = os.path.dirname(os.path.abspath(__file__))
compile_py_path = os.path.join(stitch_dir, "compile_webpage.py")

with open(compile_py_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the scroll-to-top block with both WhatsApp floating button and Scroll-to-Top stacked above it
old_floating_block = """  <!-- Floating Scroll-To-Top Button -->
  <button id="scroll-to-top" aria-label="Scroll to top" title="Scroll to top" class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-[#0D3B36] shadow-[0_4px_16px_rgba(13,59,54,0.12),0_2px_4px_rgba(0,0,0,0.06)] hover:bg-[#0D3B36] hover:text-white hover:border-[#0D3B36] hover:shadow-[0_8px_24px_rgba(13,59,54,0.22)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 opacity-0 translate-y-6 pointer-events-none focus:outline-none group">
    <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
  </button>"""

new_floating_block = """  <!-- Floating WhatsApp Action Button -->
  <a href="https://wa.me/918407000048?text=Hi%20FabWashing,%20I%20would%20like%20to%20book%20a%20laundry%20pickup%20in%20Patna" target="_blank" rel="noopener noreferrer" aria-label="Book Laundry on WhatsApp" title="Chat on WhatsApp" class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.4),0_2px_6px_rgba(0,0,0,0.12)] hover:bg-[#20bd5a] hover:shadow-[0_8px_26px_rgba(37,211,102,0.55)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group">
    <svg class="w-6 h-6 fill-current shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
      <path fill-rule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.807.478 3.518 1.31 5.013L2 22l5.127-1.282c1.442.784 3.093 1.229 4.848 1.229 5.541 0 10.031-4.49 10.031-10.031C22.006 6.49 17.572 2 12.031 2zm0 18.258c-1.579 0-3.072-.424-4.372-1.164l-.314-.18-3.045.762.775-2.969-.197-.333a8.217 8.217 0 01-1.26-4.343c0-4.566 3.714-8.28 8.28-8.28 4.566 0 8.28 3.714 8.28 8.28 0 4.566-3.714 8.28-8.28 8.28zm4.536-6.195c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.165.248-.642.807-.787.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.737-.658-1.235-1.47-1.38-1.718-.145-.248-.015-.382.109-.505.112-.111.248-.29.372-.435.124-.145.166-.248.249-.414.083-.165.041-.31-.021-.435-.062-.124-.56-1.347-.766-1.844-.202-.484-.407-.419-.56-.427l-.477-.008c-.165 0-.435.062-.663.31-.228.248-.87 0.85-.87 2.073s.891 2.404 1.015 2.57c.124.165 1.753 2.677 4.247 3.754.593.256 1.056.409 1.417.524.595.189 1.137.162 1.565.099.477-.071 1.468-.6 1.675-1.18.207-.579.207-1.076.145-1.18-.062-.103-.228-.165-.476-.289z" clip-rule="evenodd"/>
    </svg>
    <span class="hidden sm:inline-block font-bold text-xs tracking-wide">Book on WhatsApp</span>
  </a>

  <!-- Floating Scroll-To-Top Button (Stacked neatly above WhatsApp) -->
  <button id="scroll-to-top" aria-label="Scroll to top" title="Scroll to top" class="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-[#0D3B36] shadow-[0_4px_16px_rgba(13,59,54,0.12),0_2px_4px_rgba(0,0,0,0.06)] hover:bg-[#0D3B36] hover:text-white hover:border-[#0D3B36] hover:shadow-[0_8px_24px_rgba(13,59,54,0.22)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 opacity-0 translate-y-6 pointer-events-none focus:outline-none group">
    <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
  </button>"""

if old_floating_block in content:
    content = content.replace(old_floating_block, new_floating_block)
    with open(compile_py_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated compile_webpage.py with WhatsApp floating icon and stacked scroll-to-top button!")
else:
    print("Could not find old_floating_block in compile_webpage.py")
