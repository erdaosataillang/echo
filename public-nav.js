// public-nav.js
export function renderPublicNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { name: 'ホーム', path: 'index.html', icon: 'home' },
    { name: 'タイムテーブル', path: 'timetable.html', icon: 'clock' },
    { name: 'ドリンク', path: 'drink.html', icon: 'glass-water' },
    { name: 'マイページ', path: 'mypage.html', icon: 'user' },
  ];

  const navHtml = navItems.map(item => {
    const isActive = currentPath === item.path || (item.path === 'index.html' && currentPath === '');
    // アクティブ時は薄紫、非アクティブ時はグレー
    const activeClass = 'text-[#B870DE] font-bold';
    const inactiveClass = 'text-slate-400 hover:text-slate-600 font-medium';

    return `
      <a href="${item.path}" class="flex flex-col items-center gap-1 transition ${isActive ? activeClass : inactiveClass}">
        <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        <span class="text-[10px]">${item.name}</span>
      </a>
    `;
  }).join('');

  const navContainer = document.getElementById('public-nav-container');
  if (!navContainer) return;

  navContainer.innerHTML = `
    <!-- トップヘッダー -->
    <header class="bg-white/85 backdrop-blur-md border-b border-purple-100/60 sticky top-0 z-30 px-5 py-3 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2.5">
        <img src="https://ul.h3z.jp/fH2qvbZo.png" alt="Logo" class="h-8 w-auto object-contain">
      </a>
      <!-- 薄紫トーンのLIVEバッジ -->
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-[#B870DE] text-xs font-semibold border border-purple-100">
        <span class="w-2 h-2 rounded-full bg-[#C97DE6] animate-pulse"></span>
        <span>LIVE</span>
      </div>
    </header>

    <!-- モバイル固定ボトムナビ -->
    <nav class="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-purple-100/80 py-2 px-3 z-40 flex justify-around items-center max-w-xl mx-auto shadow-[0_-4px_20px_rgba(184,112,222,0.05)]">
      ${navHtml}
    </nav>
  `;

  if (window.lucide) window.lucide.createIcons();
}
