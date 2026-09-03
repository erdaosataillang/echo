// layout.js
function renderLayout() {
  // 現在のファイル名を取得（未指定時は index.html）
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const menuItems = [
    { name: 'ダッシュボード', path: 'index.html', icon: 'home' },
    { name: 'バンド', path: 'bands.html', icon: 'music' },
    { name: 'レジ', path: 'register.html', icon: 'receipt' },
    { name: '動員状況', path: 'attendance.html', icon: 'users' },
    { name: 'タイムテーブル', path: 'timetable.html', icon: 'clock' },
  ];

  // メニューリンクの生成（カレント判定）
  const navHtml = menuItems.map(item => {
    const isActive = currentPath === item.path;
    const activeClass = 'text-blue-600 bg-blue-50/70 font-semibold';
    const inactiveClass = 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium';

    return `
      <a href="${item.path}" class="flex items-center gap-3 px-4 py-3 text-sm rounded-2xl transition ${isActive ? activeClass : inactiveClass}">
        <i data-lucide="${item.icon}" class="w-4 h-4"></i>
        ${item.name}
      </a>
    `;
  }).join('');

  // 共通サイドバーHTML
  const layoutHtml = `
    <!-- モバイル用トップバー -->
    <div class="md:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100 sticky top-0 z-30">
      <img src="https://ul.h3z.jp/fH2qvbZo.png" alt="Logo" class="h-8 w-auto object-contain">
      <button id="menu-btn" class="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition focus:outline-none">
        <i data-lucide="menu" class="w-6 h-6"></i>
      </button>
    </div>

    <!-- モバイル用背景オーバーレイ -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 hidden md:hidden transition-opacity"></div>

    <!-- サイドバー -->
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-6 shrink-0 transform -translate-x-full md:translate-x-0 md:static md:h-screen transition-transform duration-200 ease-in-out">
      <div class="space-y-6">
        <!-- ロゴ＆閉じるボタン（スマホのみ） -->
        <div class="flex items-center justify-between px-2">
          <img src="https://ul.h3z.jp/fH2qvbZo.png" alt="Logo" class="h-10 w-auto object-contain">
          <button id="close-btn" class="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- ナビゲーション -->
        <nav class="space-y-1">
          <div class="px-3 pb-2 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">MAIN MENU</div>
          ${navHtml}
        </nav>
      </div>

      <!-- プロフィール -->
      <div class="bg-slate-50/80 p-3 rounded-2xl flex items-center justify-between border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">A</div>
          <span class="text-sm font-semibold text-slate-800">Admin</span>
        </div>
        <button class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition">
          <i data-lucide="log-out" class="w-4 h-4"></i>
        </button>
      </div>
    </aside>
  `;

  // コンテナへの挿入
  const container = document.getElementById('layout-container');
  if (container) {
    container.innerHTML = layoutHtml;
  }

  // スマホ用開閉イベント登録
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  menuBtn?.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  });

  const closeSidebar = () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  };

  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Lucideアイコンの初期化
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', renderLayout);
