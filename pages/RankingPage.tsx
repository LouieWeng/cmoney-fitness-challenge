// pages/RankingPage.tsx
import React, { useState } from 'react';
import { TEAMS_DATA } from '../constants';
import { Team } from '../types';

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

/** ✅ 增肌減脂（bonusW8）專用：紅橙漸層文字 */
const gradientTextW8 =
  'bg-[linear-gradient(90deg,#FF6600_0%,#FFBB00_100%)] bg-clip-text text-transparent';

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

/** ✅ W8Bonus 顯示（含紅橙漸層 & 負數不加 +） */
const renderW8Bonus = (v: unknown) => {
  if (isPending(v)) return <span className="text-slate-500">-</span>;
  const n = Number(v);
  if (Number.isNaN(n)) return <span className="text-slate-500">-</span>;
  const text = n < 0 ? `${n}` : `+${n}`;
  return <span className={`${gradientTextW8} font-semibold`}>{text}</span>;
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
    <div className="space-y-12">
      {/* 上面內容保持不變 ... */}

      {/* table 區塊 */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* thead 保持不變 */}
              <thead className="bg-slate-700/50">
                {/* ...你的原碼... */}
              </thead>

              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {withRanks.map(({ team, rank }) => {
                  const weekLyRaw = getWeekLyRaw(team);
                  return (
                    <tr key={team.id} className={rank <= 3 ? 'bg-slate-700/30' : ''}>
                      {/* 排名／組別保留 */}
                      {/* ...你的原碼... */}

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
                                  className="px-3 py-4 whitespace-nowrap text-center text-white"
                                >
                                  {ec.key === 'bonusW8' ? renderW8Bonus(rawExtra) : renderCell(rawExtra)}
                                </td>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}

                      {/* 當前積分保留 */}
                      {/* ...你的原碼... */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 下方提示與 CTA 保留 */}
        {/* ...你的原碼... */}
      </section>
    </div>
  );
};

export default RankingPage;
