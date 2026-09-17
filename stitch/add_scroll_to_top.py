# -*- coding: utf-8 -*-
"""
Adds floating scroll-to-top arrow button and interactive script to compile_webpage.py
"""

import os

stitch_dir = os.path.dirname(os.path.abspath(__file__))
compile_py_path = os.path.join(stitch_dir, "compile_webpage.py")

with open(compile_py_path, "r", encoding="utf-8") as f:
    content = f.read()

scroll_button_code = """  <!-- Floating Scroll-To-Top Button -->
  <button id="scroll-to-top" aria-label="Scroll to top" title="Scroll to top" class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-[#0D3B36] shadow-[0_4px_16px_rgba(13,59,54,0.12),0_2px_4px_rgba(0,0,0,0.06)] hover:bg-[#0D3B36] hover:text-white hover:border-[#0D3B36] hover:shadow-[0_8px_24px_rgba(13,59,54,0.22)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 opacity-0 translate-y-6 pointer-events-none focus:outline-none group">
    <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
  </button>

  <!-- Interactive Scroll-to-Top Script -->
  <script>
    (function() {
      const scrollBtn = document.getElementById('scroll-to-top');
      if (!scrollBtn) return;
      
      let ticking = false;
      const toggleVisibility = () => {
        if (window.scrollY > 300) {
          scrollBtn.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
          scrollBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
          scrollBtn.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
          scrollBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(toggleVisibility);
          ticking = true;
        }
      }, { passive: true });

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    })();
  </script>
"""

target_marker = "  </footer>\n\n</body>"
replacement_marker = "  </footer>\n\n" + scroll_button_code + "\n</body>"

if target_marker in content:
    content = content.replace(target_marker, replacement_marker, 1)
    with open(compile_py_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated compile_webpage.py with scroll-to-top button successfully!")
else:
    print("Could not find target marker in compile_webpage.py")
