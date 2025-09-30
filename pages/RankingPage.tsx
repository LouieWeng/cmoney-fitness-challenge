// pages/RankingPage.tsx
import React, { useState } from 'react';
import { TEAMS_DATA } from '../constants';
import { Team } from '../types';

// 你的 confetti 動畫檔（把網址換成你在 Lottie 的 .lottie 連結）
const CONFETTI_URL = 'https://lottie.host/cfe64ab9-e5dc-4596-820c-2733d4dbb243/m1oyTj6C47.lottie';

import { useEffect } from 'react';

/** 進頁自動播一次 confetti（播完自動移除） */
const ConfettiOnLoad: React.FC = () => {
  useEffect(() => {
    // 動態載入 dotlottie player（只載一次）
    if (!document.querySelector('script[data-dotlottie-player]')) {
      const s = document.createElement('script');
      s.type = 'module';
      s.dataset.dotlottiePlayer = '1';
      s.src =
        'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
      document.head.appendChild(s);
    }

    // 3 秒後把覆蓋層移除（可自行調整時間）
    const timer = setTimeout(() => {
      document.getElementById('confetti-overlay')?.remove();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // @ts-ignore: 自訂 web component
  return (
    <div
      id="confetti-overlay"
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    >
      {/* 覆蓋整個畫面，autoplay 一次即可（不用 loop） */}
      {/* @ts-ignore */}
      <dotlottie-player
        src={CONFETTI_URL}
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};



/** 排名結果海報：依性別與裝置切換 */
const RANKING_POSTERS = {
  male: {
    desktop: '/male-desktop.png',
    mobile: '/male-mobile.png',
  },
  female: {
    desktop: '/female-desktop.png',
    mobile: '/female-mobile.png',
  },
} as const;

/** 獎盃圖示（原樣保留） */
const getTrophyIcon = (rank: number) => {
  const iconClass = 'h-6 w-6 inline-block mr-2';
  if (rank === 1) return <span className={`${iconClass} text-yellow-400`}>🏆</span>;
  if (rank === 2) return <span className={`${iconClass} text-slate-300`}>🥈</span>;
  if (rank === 3) return <span className={`${iconClass} text-yellow-600`}>🥉</span>;
  return <span className={`${iconClass} text-transparent`}>{rank}</span>;
};

const gradientText =
  'bg-gradient-to-r from-[#92FFFE] to-[#4CFF77] text-transparent bg-clip-text';

/** 增肌減脂專用紅橙漸層 */
const gradientTextW8 =
  'bg-[linear-gradient(90deg,#82FFF7_0%,#82FFF7_100%)] bg-clip-text text-transparent';


const WEEK_COUNT = 8;

/** 額外欄位: 在 W2、W6、W8 後插入一欄 */
type ExtraCol = { afterWeek: number; key: string; header: React.ReactNode };
const EXTRA_COLS: ExtraCol[] = [
  { afterWeek: 2, key: 'bonusW2', header: <span role="img" aria-label="bonusW2">🍱健康餐</span> },
  { afterWeek: 6, key: 'bonusW6', header: <span role="img" aria-label="bonusW6">🎒運動裝備</span> },
  { afterWeek: 8, key: 'bonusW8', header: <span role="img" aria-label="bonusW8">💪增肌減脂</span> },
];

/** 未填 / 特殊值判斷 */
const isPending = (v: unknown) =>
  v === undefined || v === null || v === -1 || (typeof v === 'string' && v.trim() === '-');

/** 取得 W1-W8 的原始值 */
const getWeekLyRaw = (t: Team): unknown[] => {
  const anyT = t as any;
  const arr: unknown[] | undefined = anyT.weekly || anyT.weeks || anyT.exerciseWeeks;
  if (!Array.isArray(arr)) {
    const keys = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'];
    if (keys.some(k => k in anyT)) {
      return keys.map(k => anyT[k]);
    }
    return Array.from({ length: WEEK_COUNT }, (_, i) => arr ? (arr as any)[i] : undefined);
  }
  return arr;
};

/** 顯示數值：未填顯示 - */
const renderCell = (v: unknown) =>
  isPending(v) ? <span className="text-slate-500">-</span> : <>+{Number(v) || 0}</>;

/** ✅ 只有 W8Bonus 使用的顯示規則 + 紅橙漸層 */
const renderW8Bonus = (v: unknown) => {
  if (isPending(v)) return <span className="text-slate-500">-</span>;
  const n = Number(v);
  if (Number.isNaN(n)) return <span className="text-slate-500">-</span>;

  // 定義顯示文字
  const text = n < 0 ? `${n}` : `+${n}`;

  // 套用紅橙漸層樣式
  return (
    <span className="bg-[linear-gradient(90deg,#82FFF7_0%,#82FFF7_100%)] bg-clip-text text-transparent font-semibold">
      {text}
    </span>
  );
};


/** 轉數字 */
const toNum = (v: unknown) => (isPending(v) ? 0 : Number(v) || 0);

/** 額外欄位 raw/num */
const getExtraRaw = (t: Team, key: string): unknown => (t as any)[key];
const getExtraNum = (t: Team, key: string): number => toNum(getExtraRaw(t, key));

/** 總分計算 */
const calcTotal = (t: Team): number => {
  const weeklySum = getWeekLyRaw(t).reduce((s, v) => s + toNum(v), 0);
  const bonus2 = getExtraNum(t, 'bonusW2');
  const bonus6 = getExtraNum(t, 'bonusW6');
  const bonus8 = getExtraNum(t, 'bonusW8');
  return (weeklySum + bonus2 + bonus6) * 0.4 + bonus8 * 0.6;
};

/** 四捨五入到小數一位 */
const format1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1);

const RankingPage: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [showScoreTip, setShowScoreTip] = useState(false);

  const filteredTeams = TEAMS_DATA.filter(team => team.gender === gender);
  filteredTeams.sort((a, b) => calcTotal(b) - calcTotal(a));

  const withRanks = filteredTeams.reduce((acc: Array<{ team: Team; rank: number }>, team, i) => {
    const prev = acc[i - 1];
    const rank = i > 0 && calcTotal(team) === calcTotal(prev.team) ? prev.rank : i + 1;
    acc.push({ team, rank });
    return acc;
  }, []);

  const top3Count = withRanks.filter(r => r.rank <= 3).length;

  return (
    <>
    <ConfettiOnLoad />
    <div className="space-y-12">
      {/* 標題區塊 */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          最終排名出爐 <span className={gradientText}>恭喜得獎隊伍！</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          感謝大家連續 8 週的堅持與努力，不只是挑戰自我<br/>
          也將運動與飲控融入生活，所有參賽者都值得大大的掌聲👏<br/>
          比賽結束不是終點，而是健康生活的起點！
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">最近更新：09/30</p>
      </section>

      {/* 性別切換 */}
      <div className="flex justify-center mb-4">
        <div className="relative inline-flex bg-slate-800 p-1 rounded-full">
          <div
            className={`absolute inset-[2px] w-1/2 rounded-full bg-gradient-to-r from-[#92FFFE] to-[#4CFF77] transition-transform duration-300 ease-in-out ${
              gender === 'female' ? 'translate-x-[calc(100%-4px)]' : 'translate-x-0'
            }`}
          />
          <button
            onClick={() => setGender('male')}
            className={`relative z-10 px-6 py-2 text-center font-bold rounded-full min-w-[96px] transition ${
              gender === 'male' ? 'text-slate-900' : 'text-white'
            }`}
          >
            男子組
          </button>
          <button
            onClick={() => setGender('female')}
            className={`relative z-10 px-6 py-2 text-center font-bold rounded-full min-w-[96px] transition ${
              gender === 'female' ? 'text-slate-900' : 'text-white'
            }`}
          >
            女子組
          </button>
        </div>
      </div>

      {/* 排名結果海報 */}
      <section className="relative flex justify-center">
        {/* 桌機版 */}
        <img
          src={RANKING_POSTERS[gender].desktop}
          alt={`${gender === 'male' ? '男子組' : '女子組'} 排名結果（桌機版）`}
          className="hidden md:block w-[120%] max-w-none h-auto rounded-3xl shadow-lg"
        />
        {/* 手機版 */}
        <img
          src={RANKING_POSTERS[gender].mobile}
          alt={`${gender === 'male' ? '男子組' : '女子組'} 排名結果（手機版）`}
          className="md:hidden w-[120%] max-w-none h-auto rounded-3xl shadow-lg"
        />
      </section>

      {/* table 區塊 */}
      <section className="max-w-6xl mx-auto relative">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">排名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">組別 / 成員</th>

                  {Array.from({ length: WEEK_COUNT }, (_, i) => i + 1).map((wk) => (
                    <React.Fragment key={`h-w${wk}`}>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                        W{wk}
                      </th>
                      {EXTRA_COLS.filter(ec => Number(ec.afterWeek) === wk).map((ec) => (
                        <th
                          key={`h-extra${ec.key}`}
                          className="px-3 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider"
                        >
                          {ec.header}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}

                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <span className="align-middle">總積分</span>
                    <span className="relative inline-block ml-2 align-middle">
                      <button
                        type="button"
                        onClick={() => setShowScoreTip(v => !v)}
                        onBlur={() => setShowScoreTip(false)}
                        className="align-middle flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold"
                        aria-label="顯示積分說明"
                        aria-expanded={showScoreTip}
                      >
                        i
                      </button>
                      {showScoreTip && (
                        <div className="absolute right-0 mt-2 w-80 text-left whitespace-normal bg-slate-900 text-slate-100 text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-slate-700">
                          總積分（四捨五入到小數一位） = (W1~W8運動打卡分數 + 🍱健康餐分數 + 🎒運動裝備分數) × 40% + (💪增肌減脂分數) × 60%
                        </div>
                      )}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {withRanks.map(({ team, rank }) => {
                  const weekLyRaw = getWeekLyRaw(team);
                  return (
                    <tr key={team.id} className={rank <= 3 ? 'bg-slate-700/30' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                        {rank <= 3 && top3Count <= 5 ? getTrophyIcon(rank) : null}
                        <span>{rank}</span>
                      </td>

                      <td className="px-6 py-4 text-white">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="inline-flex items-center gap-2 rounded-[8px] bg-slate-600/80 px-3 py-1 text-white max-w-full"
                            title={`#${team.id} ${team.name}`}
                          >
                            <span className="text-sm font-bold whitespace-nowrap">#{team.id}</span>
                            <span className="text-sm text-base font-semibold truncate">{team.name}</span>
                          </span>
                        </div>
                        <div className="text-slate-300 text-sm mt-1">
                          {team.members.map((m, i) => (
                            <span key={i}>
                              {m}
                              {i < team.members.length - 1 && <span className="text-slate-500">&nbsp;&amp;&nbsp;</span>}
                            </span>
                          ))}
                        </div>
                      </td>

                      {weekLyRaw.map((raw, idx) => {
                        const wk = idx + 1;
                        return (
                          <React.Fragment key={`${team.id}-w${wk}`}>
                            <td className="px-4 py-4 whitespace-nowrap text-white text-center">
                              {renderCell(raw)}
                            </td>
                            {EXTRA_COLS.filter(ec => Number(ec.afterWeek) === wk).map((ec) => {
                              const rawExtra = getExtraRaw(team, ec.key);
                              return (
                                <td
                                  key={`${team.id}_extra-${ec.key}`}
                                  className="px-3 py-4 whitespace-nowrap text-white text-center"
                                >
                                  {ec.key === 'bonusW8' ? renderW8Bonus(rawExtra) : renderCell(rawExtra)}
                                </td>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}

                      <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold">
                        <span className={gradientText}>{format1(calcTotal(team))}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-4 text-sm">
          提醒：每週需完成3天運動打卡，並上傳認證照至雲端，將經過審查才會認列積分。
        </p>
      </section>

      <section className="bg-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">看完賽事排名是不是很想趕快運動了嗎？快去運動打卡吧！</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="https://drive.google.com/drive/u/0/folders/1OwkvMSo4h746QfWW-vczZGOBn-BVl89U"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#4CFF77] text-slate-900 font-bold py-2 px-4 rounded-lg"
            >
              上傳認證照
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RankingPage;
