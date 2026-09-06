// public-header.js
export const UNIVERSITY_COLORS = {
  '愛知学院大学': '#C97DE6',
  '名古屋商科大学 軽音学部': '#61C253',
  '中京大学 サウンドコミュニケーション': '#C25361',
  '愛知教育大学 軽音学部': '#5399C2'
};

export function getUnivColor(name) {
  return UNIVERSITY_COLORS[name] || '#64748B';
}

export function initHeader({ onDayChange }) {
  const headerContainer = document.getElementById('public-header-container');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <!-- ヘッダー -->
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-5 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="https://ul.h3z.jp/fH2qvbZo.png" alt="Logo" class="h-8 w-auto object-contain">
        <span class="text-xs font-bold tracking-wider text-slate-400 uppercase">Live Schedule</span>
      </div>
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>LIVE</span>
      </div>
    </header>

    <!-- 日程切り替えタブ -->
    <div class="max-w-xl mx-auto px-4 pt-4">
      <div class="flex items-center gap-2 bg-slate-200/70 p-1 rounded-2xl">
        <button id="tab-day1" class="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition bg-white text-blue-600 shadow-sm text-center">
          1日目 (Day 1)
        </button>
        <button id="tab-day2" class="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition text-slate-500 hover:text-slate-800 text-center">
          2日目 (Day 2)
        </button>
      </div>
    </div>
  `;

  const tabDay1 = document.getElementById('tab-day1');
  const tabDay2 = document.getElementById('tab-day2');

  const switchTab = (day) => {
    if (day === 'day1') {
      tabDay1.className = 'flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition bg-white text-blue-600 shadow-sm text-center';
      tabDay2.className = 'flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition text-slate-500 hover:text-slate-800 text-center';
    } else {
      tabDay2.className = 'flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition bg-white text-blue-600 shadow-sm text-center';
      tabDay1.className = 'flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition text-slate-500 hover:text-slate-800 text-center';
    }
    if (onDayChange) onDayChange(day);
  };

  tabDay1.addEventListener('click', () => switchTab('day1'));
  tabDay2.addEventListener('click', () => switchTab('day2'));

  if (window.lucide) window.lucide.createIcons();
}
