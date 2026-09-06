// now-playing.js
export function initNowPlaying(slotsCache, bandsMap, getActiveDay) {
  const container = document.getElementById('now-playing-container');
  if (!container) return;

  container.innerHTML = `
    <section id="now-playing-card" class="hidden bg-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
      <div class="relative z-10 space-y-2">
        <div class="flex items-center justify-between">
          <span id="now-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500 text-white">
            NOW PLAYING
          </span>
          <span id="now-time" class="font-mono text-xs text-slate-300">--:-- 〜 --:--</span>
        </div>
        <h2 id="now-title" class="text-xl font-extrabold tracking-tight">--</h2>
        <p id="now-univ" class="text-xs text-slate-300 font-medium">--</p>
      </div>
      <i data-lucide="radio" class="absolute -right-2 -bottom-2 w-24 h-24 text-white/5 pointer-events-none"></i>
    </section>
  `;

  const timeToMinutes = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const update = () => {
    const activeDay = getActiveDay();
    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    const slots = [];
    slotsCache.forEach(d => {
      if (d.day === activeDay) slots.push(d);
    });
    slots.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

    let currentSlot = null;
    let nextSlot = null;

    for (const slot of slots) {
      const start = timeToMinutes(slot.startTime);
      const end = timeToMinutes(slot.endTime);
      if (currentMin >= start && currentMin < end) {
        currentSlot = slot;
        break;
      } else if (currentMin < start && !nextSlot) {
        nextSlot = slot;
      }
    }

    const card = document.getElementById('now-playing-card');
    const badge = document.getElementById('now-badge');
    const time = document.getElementById('now-time');
    const title = document.getElementById('now-title');
    const univ = document.getElementById('now-univ');

    const targetSlot = currentSlot || nextSlot;
    if (!targetSlot) {
      card.classList.add('hidden');
      return;
    }

    card.classList.remove('hidden');
    if (currentSlot) {
      badge.textContent = 'NOW PLAYING';
      badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white animate-pulse';
    } else {
      badge.textContent = 'UP NEXT';
      badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500 text-white';
    }

    time.textContent = `${targetSlot.startTime} 〜 ${targetSlot.endTime}`;
    if (targetSlot.type === 'lunch') {
      title.textContent = '昼休憩';
      univ.textContent = targetSlot.note || 'お昼休憩・ロビー開放';
    } else if (targetSlot.type === 'transition') {
      title.textContent = '転換時間';
      univ.textContent = targetSlot.note || 'ステージ準備・機材入れ替え';
    } else if (targetSlot.type === 'adjustment') {
      title.textContent = '調整時間';
      univ.textContent = targetSlot.note || '時間調整・サウンドチェック';
    } else {
      const b = bandsMap.get(targetSlot.bandId) || { name: '未定', university: '' };
      title.textContent = b.name;
      univ.textContent = b.university;
    }

    if (window.lucide) window.lucide.createIcons();
  };

  update();
  setInterval(update, 60000); // 1分ごとに更新
  return update;
}
