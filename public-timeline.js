// public-timeline.js
import { getUnivColor } from './public-header.js';

export function renderTimelineList({ slotsCache, bandsMap, songsMap, activeDay }) {
  const timelineList = document.getElementById('timeline-list');
  const slotCountLabel = document.getElementById('slot-count');
  const heading = document.getElementById('current-day-heading');

  if (heading) {
    heading.textContent = activeDay === 'day1' ? '1日目 スケジュール' : '2日目 スケジュール';
  }

  const timeToMinutes = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const filteredSlots = [];
  slotsCache.forEach((data, id) => {
    if (data.day === activeDay) filteredSlots.push({ id, ...data });
  });

  filteredSlots.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  if (slotCountLabel) slotCountLabel.textContent = `${filteredSlots.length} 枠`;

  if (filteredSlots.length === 0) {
    timelineList.innerHTML = `
      <div class="text-center py-16 text-slate-400 bg-white rounded-3xl border border-slate-100">
        <i data-lucide="calendar-x" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
        <p class="text-xs">スケジュールが登録されていません</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let html = '';
  let bandIndexCounter = 1;

  filteredSlots.forEach((slot) => {
    const slotType = slot.type || 'band';
    const durationMin = (slot.startTime && slot.endTime)
      ? timeToMinutes(slot.endTime) - timeToMinutes(slot.startTime)
      : 0;

    // 昼休憩
    if (slotType === 'lunch') {
      html += `
        <div class="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <i data-lucide="coffee" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-sm font-bold text-amber-950">${slot.startTime} 〜 ${slot.endTime}</span>
              <span class="text-[10px] font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">昼休憩 (${durationMin}分)</span>
            </div>
            ${slot.note ? `<p class="text-[11px] text-amber-800/80 mt-0.5">${slot.note}</p>` : ''}
          </div>
        </div>
      `;
      return;
    }

    // 転換
    if (slotType === 'transition') {
      html += `
        <div class="bg-purple-50/60 border border-purple-200/70 rounded-2xl p-3 flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold text-purple-950">${slot.startTime} 〜 ${slot.endTime}</span>
            <span class="text-[10px] font-bold text-purple-700 bg-purple-200/60 px-1.5 py-0.5 rounded-md">転換 (${durationMin}分)</span>
          </div>
        </div>
      `;
      return;
    }

    // 調整時間
    if (slotType === 'adjustment') {
      html += `
        <div class="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-3 flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold text-emerald-950">${slot.startTime} 〜 ${slot.endTime}</span>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-200/60 px-1.5 py-0.5 rounded-md">調整 (${durationMin}分)</span>
          </div>
        </div>
      `;
      return;
    }

    // バンド演奏枠
    const band = bandsMap.get(slot.bandId) || { name: '未定', university: '-', members: [], songIds: [] };
    const univColor = getUnivColor(band.university);
    const stageNo = bandIndexCounter++;

    const members = band.members || [];
    const memberTagsHtml = members.map(m => `
      <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
        <span class="font-bold text-blue-600">${m.part}</span>
        <span>${m.name}</span>
      </span>
    `).join('');

    const songIds = band.songIds || [];
    const setlistTagsHtml = songIds.map((sid, sIdx) => {
      const song = songsMap.get(sid) || { title: '曲', duration: '', isMC: false };
      const isMc = song.isMC === true;
      return `
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
          isMc 
            ? 'bg-amber-50 text-amber-800 border-amber-200' 
            : 'bg-white text-slate-700 border-slate-200'
        }">
          <span class="font-mono text-[10px] ${isMc ? 'text-amber-500' : 'text-slate-400'}">${sIdx + 1}.</span>
          ${isMc ? '<i data-lucide="mic" class="w-2.5 h-2.5 text-amber-600"></i>' : ''}
          <span class="truncate max-w-[130px]">${song.title}</span>
          ${song.duration ? `<span class="text-[10px] opacity-60">(${song.duration})</span>` : ''}
        </span>
      `;
    }).join('');

    html += `
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-4 space-y-2.5" style="border-left: 4px solid ${univColor};">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono text-[11px] font-bold">
              #${stageNo}
            </span>
            <span class="font-mono text-base font-extrabold text-slate-900 tracking-tight">
              ${slot.startTime} 〜 ${slot.endTime}
            </span>
          </div>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style="background-color: ${univColor}15; color: ${univColor}; border: 1px solid ${univColor}40;">
            <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${univColor};"></span>
            ${band.university || '-'}
          </span>
        </div>

        <div>
          <h4 class="text-base font-bold text-slate-900 leading-snug">${band.name}</h4>
        </div>

        ${songIds.length > 0 ? `
          <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">セットリスト</p>
            <div class="flex flex-wrap gap-1.5">
              ${setlistTagsHtml}
            </div>
          </div>
        ` : ''}

        <div class="flex flex-wrap gap-1 pt-0.5">
          ${memberTagsHtml || '<span class="text-[10px] text-slate-400">メンバー情報なし</span>'}
        </div>
      </div>
    `;
  });

  timelineList.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}
