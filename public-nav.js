// public-nav.js
export function renderPublicNav() {
  const container = document.getElementById('public-nav-container');
  if (!container) return;

  // ローカルストレージからログインユーザー情報を取得
  let user = null;
  try {
    const raw = localStorage.getItem('echo_user');
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse user', e);
  }

  // ロール表示設定
  const roleConfig = {
    audience: { label: '一般', bg: 'bg-slate-100', text: 'text-slate-600' },
    performer: { label: '出演者', bg: 'bg-purple-100', text: 'text-purple-700' },
    staff: { label: '関係者', bg: 'bg-blue-100', text: 'text-blue-700' }
  };
  const roleInfo = (user && roleConfig[user.role]) ? roleConfig[user.role] : roleConfig.audience;

  // 右側の表示要素（ログイン時はユーザーチップ、未ログイン時はログインボタン）
  const rightContent = user ? `
    <a href="mypage.html" class="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-full bg-purple-50/80 hover:bg-purple-100 border border-purple-100 transition active:scale-95 group">
      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full ${roleInfo.bg} ${roleInfo.text}">
        ${roleInfo.label}
      </span>
      <span class="text-xs font-bold text-slate-800 max-w-[90px] truncate">
        ${user.name || 'ゲスト'}
      </span>
      <div class="w-6 h-6 rounded-full bg-[#B870DE] text-white flex items-center justify-center shadow-xs">
        <i data-lucide="user" class="w-3.5 h-3.5"></i>
      </div>
    </a>
  ` : `
    <a href="register.html" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-[#B870DE] text-xs font-bold transition">
      <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
      <span>ログイン</span>
    </a>
  `;

  // 現在のページ名判定（ボトムナビのアクティブ切り替え用）
  const path = window.location.pathname;
  const isHome = path.endsWith('index.html') || path.endsWith('/');
  const isTimetable = path.endsWith('timetable.html');
  const isDrink = path.endsWith('drink.html');
  const isMypage = path.endsWith('mypage.html');

  container.innerHTML = `
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100/60 transition-all">
      <div class="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-2">
          <img src="https://ul.h3z.jp/fH2qvbZo.png" alt="ECHO" class="h-6 w-auto object-contain">
        </a>
        <div class="flex items-center">
          ${rightContent}
        </div>
      </div>
    </header>

    <nav class="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-lg border-t border-purple-100/80 max-w-xl mx-auto pb-safe">
      <div class="grid grid-cols-4 h-16 items-center px-2">
        <a href="index.html" class="flex flex-col items-center justify-center gap-1 transition ${isHome ? 'text-[#B870DE]' : 'text-slate-400 hover:text-slate-600'}">
          <i data-lucide="home" class="w-5 h-5"></i>
          <span class="text-[10px] font-bold">ホーム</span>
        </a>
        <a href="timetable.html" class="flex flex-col items-center justify-center gap-1 transition ${isTimetable ? 'text-[#B870DE]' : 'text-slate-400 hover:text-slate-600'}">
          <i data-lucide="calendar" class="w-5 h-5"></i>
          <span class="text-[10px] font-bold">タイテ</span>
        </a>
        <a href="drink.html" class="flex flex-col items-center justify-center gap-1 transition ${isDrink ? 'text-[#B870DE]' : 'text-slate-400 hover:text-slate-600'}">
          <i data-lucide="cup-soda" class="w-5 h-5"></i>
          <span class="text-[10px] font-bold">ドリンク</span>
        </a>
        <a href="mypage.html" class="flex flex-col items-center justify-center gap-1 transition ${isMypage ? 'text-[#B870DE]' : 'text-slate-400 hover:text-slate-600'}">
          <i data-lucide="user" class="w-5 h-5"></i>
          <span class="text-[10px] font-bold">マイページ</span>
        </a>
      </div>
    </nav>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
