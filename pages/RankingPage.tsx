// pages/RankingPage.tsx
import React, { useState } from 'react';
import { TEAMS_DATA } from '../constants';
import { Team } from '../types';

/** 獎盃圖示（與你原本相同） */
const getTrophyIcon = (rank: number) => {
  const iconClass = 'h-6 w-6 inline-block mr-2';
  if (rank === 1) return <span className={`${iconClass} text-yellow-400`}>🏆</span>;
  if (rank === 2) return <span className={`${iconClass} text-slate-300`}>🥈</span>;
  if (rank === 3) return <span className={`${iconClass} text-yellow-600`}>🥉</span>;
  return <span className={`${iconClass} text-transparent`}>{rank}</span>;
};

const gradientText =
  'bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text';

const WEEK_COUNT = 8;

/** 額外欄位：在 W2 與 W8 後各插入一欄 */
type ExtraCol = { afterWeek: number; key: string; header: React.ReactNode };
const EXTRA_COLS: ExtraCol[] = [
  { afterWeek: 2, key: 'bonusW2', header: <span role="img" aria-label="bonus2">🎁健康餐</span> },
  { afterWeek: 8, key: 'bonusW8', header: <span role="img" aria-label="bonus8">💪增肌減脂</span> },
];

/** 「未填 / 特殊值」判斷：缺席、null、-1、或字串 "-" 視為待填 */
const isPending = (v: unknown) =>
  v === undefined ||
  v === null ||
  v === -1 ||
  (typeof v === 'string' && v.trim() === '-');

/** 取回 W1~W8 的「原始值」（保留待填狀態） */
const getWeeklyRaw = (t: Team): unknown[] => {
  const anyT = t as any;
  let arr: unknown[] | undefined = anyT.weekly || anyT.weeks || anyT.exerciseWeeks;
  if (!Array.isArray(arr)) {
    const keys = ['w1','w2','w3','w4','w5','w6','w7','w8'];
    if (keys.some(k => k in anyT)) arr = keys.map(k => anyT[k]);
  }
  return Array.from({ length: WEEK_COUNT }, (_, i) => (arr ? arr[i] : undefined));
};

/** 顯示：若待填顯示灰色 "—"，否則顯示 +數字 */
const renderCell = (v: unknown) =>
  isPending(v)
    ? <span className="text-slate-500">—</span>
    : <>+{Number(v) || 0}</>;

/** 轉數字：待填視為 0 */
const toNum = (v: unknown) => (isPending(v) ? 0 : Number(v) || 0);

/** 額外欄位原始值／數值 */
const getExtraRaw = (t: Team, key: string): unknown => (t as any)[key];
const getExtraNum = (t: Team, key: string): number => toNum(getExtraRaw(t, key));

/** 新公式：
 * 當前積分 = (W1~W8 + bonusW2) 的總和 × 0.4 ＋ (bonusW8) × 0.6
 * （待填值不計入＝當作 0）
 */
const calcTotal = (t: Team): number => {
  const weeklySum = getWeeklyRaw(t).reduce((s, v) => s + toNum(v), 0);
  const bonus2 = getExtraNum(t, 'bonusW2');
  const bonus8 = getExtraNum(t, 'bonusW8');
  return (weeklySum + bonus2) * 0.4 + bonus8 * 0.6;
};

/** 四捨五入到 1 位小數 */
const format1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1);

const RankingPage: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [showScoreTip, setShowScoreTip] = useState(false);

  const filteredTeams = TEAMS_DATA
    .filter((team) => team.gender === gender)
    .sort((a, b) => calcTotal(b) - calcTotal(a));

  const withRanks = filteredTeams.reduce(
    (acc: Array<{ team: Team; rank: number }>, team, i) => {
      const prev = acc[i - 1];
      const rank =
        i > 0 && prev && calcTotal(team) === calcTotal(prev.team) ? prev.rank : i + 1;
      acc.push({ team, rank });
      return acc;
    },
    []
  );

  const top3Count = withRanks.filter((r) => r.rank <= 3).length;

  return (
    <div className="space-y-12">
      {/* ====== 標題 ====== */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          快來關注 <span className={gradientText}>每週賽況</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          每週五前將結算前一週的運動打卡分數，並且更新到賽況。
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          最近更新：08/22
        </p>
      </section>

      {/* ====== 男女子組頁籤 ====== */}
      <div className="flex justify-center">
        <div className="relative inline-flex bg-slate-800 p-1 rounded-full">
          <div
            className={`absolute inset-[2px] w-1/2 rounded-full bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] transition-transform duration-300 ease-in-out ${
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
            className={`relative z-10 px-6 py-2 text-center font-bold rounded.full min-w-[96px] transition ${
              gender === 'female' ? 'text-slate-900' : 'text-white'
            }`}
          >
            女子組
          </button>
        </div>
      </div>

      {/* ====== table 區塊 ====== */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    排名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    組別 / 成員
                  </th>

                  {/* W1~W8 ＋ 在 W2、W8 後插入額外欄位 */}
                  {Array.from({ length: WEEK_COUNT }, (_, i) => i + 1).map((wk) => (
                    <React.Fragment key={`h-w${wk}`}>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                        W{wk}
                      </th>
                      {EXTRA_COLS.filter(ec => ec.afterWeek === wk).map((ec) => (
                        <th
                          key={`h-extra-${ec.key}`}
                          className="px-3 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider"
                        >
                          {ec.header}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}

                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <span className="align-middle">當前積分</span>
                    <span className="relative inline-block ml-2 align-middle">
                      <button
                        type="button"
                        onClick={() => setShowScoreTip((v) => !v)}
                        onBlur={() => setShowScoreTip(false)}
                        className="align-middle inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold"
                        aria-label="顯示說明"
                        aria-expanded={showScoreTip}
                      >
                        i
                      </button>
                      {showScoreTip && (
                        <div className="absolute right-0 mt-2 w-80 text-left whitespace-normal bg-slate-900 text-slate-100 text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-slate-700 z-50">
                          當前積分 = (W1~W8運動打卡 + 🎁驚喜任務) 的總和 × 40% ＋ (💪增肌減脂分數) × 60%
                        </div>
                      )}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {withRanks.map(({ team, rank }) => {
                  const weeklyRaw = getWeeklyRaw(team);
                  return (
                    <tr key={team.id} className={rank <= 3 ? 'bg-slate-700/30' : ''}>
                      {/* 排名 */}
                      {/*<td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                        {rank <= 3 && top3Count <= 5 ? getTrophyIcon(rank) : null}
                        <span className="hidden sm:inline">{rank}</span>
                      </td>*/}
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold flex items-center gap-1">
                        {rank <= 3 && top3Count <= 5 ? getTrophyIcon(rank) : null}
                        <span>{rank}</span>
                      </td>

                    
                      {/* 組別 / 成員：把 #id + 隊名合併在同一個框 */}
                      <td className="px-6 py-4 text-white">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="inline-flex items-center gap-2 rounded-[8px] bg-slate-600/80 px-3 py-1 text-white max-w-full"
                            title={`#${team.id} ${team.name}`}
                          >
                            <span className="text-sm font-bold whitespace-nowrap">#{team.id}</span>
                            <span className="text-sm sm:text-base font-semibold truncate">{team.name}</span>
                          </span>
                        </div>

                        {/* 成員（維持原樣） */}
                        <div className="text-slate-300 text-sm mt-1">
                          {team.members.map((m, i) => (
                            <span key={i}>
                              {m}
                              {i < team.members.length - 1 && (
                                <span className="text-slate-500"> &nbsp;&amp;&nbsp; </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </td>


                      {/* W1~W8 + 兩個額外欄位（帶灰色「—」顯示） */}
                      {weeklyRaw.map((raw, idx) => {
                        const wk = idx + 1;
                        return (
                          <React.Fragment key={`${team.id}-w${wk}`}>
                            <td className="px-4 py-4 whitespace-nowrap text-white text-center">
                              {renderCell(raw)}
                            </td>
                            {EXTRA_COLS.filter(ec => ec.afterWeek === wk).map((ec) => {
                              const rawExtra = getExtraRaw(team, ec.key);
                              return (
                                <td
                                  key={`${team.id}-extra-${ec.key}`}
                                  className="px-3 py-4 whitespace-nowrap text-white text-center"
                                >
                                  {renderCell(rawExtra)}
                                </td>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}

                      {/* 當前積分（新公式） */}
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
          提醒：每週需確實完成3次運動打卡，並上傳認證照至雲端，審核通過才會認列積分。
        </p>
      </section>
    </div>
  );
};

export default RankingPage;


