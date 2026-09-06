// public-nav.js
export function renderPublicNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const isHome = currentPath === 'index.html' || currentPath === '';
  const isTimetable = currentPath === 'timetable.html';

  const navContainer = document.getElementById('public-nav-container');
  if (!navContainer) return;

  navContainer.innerHTML = `
    <!-- トップヘッダー -->
    <header class="bg-white/85 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-5 py-3 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2.5">
        <img src="https://ul.h3z.jp/fH2qvbZo.png" alt="Logo" class="h-8 w-auto object-contain">
      </a>
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>LIVE</span>
      </div>
    </header>

    <!-- モバイル固定ボトムナビ -->
    <nav class="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/70 py-2 px-6 z-40 flex justify-around items-center max-w-xl mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <a href="index.html" class="flex flex-col items-center gap-1 transition ${isHome ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'}">
        <i data-lucide="home" class="w-5 h-5"></i>
        <span class="text-[10px]">ホーム</span>
      </a>
      <a href="timetable.html" class="flex flex-col items-center gap-1 transition ${isTimetable ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'}">
        <i data-lucide="clock" class="w-5 h-5"></i>
        <span class="text-[10px]">タイムテーブル</span>
      </a>
    </nav>
  `;

  if (window.lucide) window.lucide.createIcons();
}
