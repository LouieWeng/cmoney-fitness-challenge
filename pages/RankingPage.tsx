import React, { useState } from 'react';
import { TEAMS_DATA } from '../constants';
import { Team } from '../types';

// 獎盃 / 獎牌
const getTrophyIcon = (rank: number) => {
  const iconClass = 'h-6 w-6 inline-block mr-2';
  if (rank === 1) return <span className={`${iconClass} text-yellow-400`}>🏆</span>;
  if (rank === 2) return <span className={`${iconClass} text-slate-300`}>🥈</span>;
  if (rank === 3) return <span className={`${iconClass} text-yellow-600`}>🥉</span>;
  return <span className={`${iconClass} text-transparent`}>{rank}</span>;
};

const RankingPage: React.FC = () => {
  const gradientText =
    'bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text';

  // 性別頁籤
  const [gender, setGender] = useState<'male' | 'female'>('male');
  // 當前積分表頭的小 i tooltip
  const [showScoreTip, setShowScoreTip] = useState(false);
  // 計算總分（包含驚喜任務）
  const getTotal = (t: Team) => (t.points ?? 0) + ((t as any).surprise ?? 0);


  // 篩選 + 依分數排序
  const filteredTeams = TEAMS_DATA
  .filter((team) => team.gender === gender)
  .sort((a, b) => getTotal(b) - getTotal(a));


  // 同分同名次 (standard competition ranking: 1,1,3,4…)
   const withRanks = filteredTeams.reduce(
    (acc: Array<{ team: Team; rank: number }>, team, i) => {
      const prev = acc[i - 1];
      const rank =
        i > 0 && prev && getTotal(team) === getTotal(prev.team) ? prev.rank : i + 1;
      acc.push({ team, rank });
      return acc;
    },
    []
  );

  // 前三名總數（>5 就全部不顯示獎盃/獎牌）
  const top3Count = withRanks.filter((r) => r.rank <= 3).length;

  return (
    <div className="space-y-12">
      {/* 頁面標題 */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          快來關注<span className={gradientText}>每週賽況</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          每週五前將結算前一週的運動打卡分數，並且更新到賽況。
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          最近更新：2025/08/12
        </p>
      </section>

      {/* 男女子組頁籤（樣式維持不變，只加滑動動畫） */}
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
            className={`relative z-10 px-6 py-2 text-center font-bold rounded-full min-w-[96px] transition ${
              gender === 'female' ? 'text-slate-900' : 'text-white'
            }`}
          >
            女子組
          </button>
        </div>
      </div>

      {/* 排行表 */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">


          
{/* ====== 只改 table 區塊：從這裡開始 ====== */}
      <div className="overflow-x-auto">
        {/*
          這裡只在 table 區塊內宣告小工具，不影響外面其它程式。
          - 週欄位鍵值：W1~W8
          - 合計、公式、排名處理
        */}
        {(() => {
          type AnyTeam = Team & {
            // 若你的資料結構不是 w1~w8，請把下面 key 換成你自己的欄位名稱
            w1?: number; w2?: number; w3?: number; w4?: number;
            w5?: number; w6?: number; w7?: number; w8?: number;
            exercise?: number;   // 額外小計（可有可無）
            surprise?: number;   // 驚喜任務
            points?: number;     // 增肌減脂分數加總
            name?: string;       // 隊名
            members: string[];
          };

          const weekKeys = ['w1','w2','w3','w4','w5','w6','w7','w8'] as const;
          const getWeek = (t: AnyTeam, k: typeof weekKeys[number]) =>
            Number(((t as any)[k] ?? 0) || 0);
          const sumWeeks = (t: AnyTeam) =>
            weekKeys.reduce((s, k) => s + getWeek(t, k), 0);

          // 💪 打卡總和（8 週加總 + 額外 exercise）
          const getWorkoutSum = (t: AnyTeam) =>
            sumWeeks(t) + (t.exercise ?? 0);

          // ✅ 當前積分公式：
          // 兩人的增肌減脂分數加總 × 60% ＋ 兩人的（運動打卡 + 驚喜任務）加總 × 40%
          const getTotalScore = (t: AnyTeam) => {
            const body = t.points ?? 0;
            const activity = getWorkoutSum(t) + (t.surprise ?? 0);
            return body * 0.6 + activity * 0.4;
          };

          const fmt1 = (n: number) => (Math.round(n * 10) / 10).toFixed(1).replace(/\.0$/, '.0');

          // 以新總分做排序＋同分同名次（1,1,3,4 …）
          const baseRows = [...TEAMS_DATA.filter(t => t.gender === gender)] as AnyTeam[];
          const sorted = baseRows
            .map(t => ({ team: t, total: getTotalScore(t) }))
            .sort((a, b) => b.total - a.total);

          let prevVal: number | null = null;
          let visualRank = 0;
          let place = 0;
          const rows = sorted.map(r => {
            place += 1;
            if (prevVal === null || r.total !== prevVal) {
              visualRank = place;
              prevVal = r.total;
            }
            return { ...r, rank: visualRank };
          });

          return (
            <table className="min-w-[1000px] md:min-w-[1100px] lg:min-w-[1200px]">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                    排名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                    組別／成員
                  </th>

                  {/* W1 ~ W8 */}
                  {weekKeys.map((wk) => (
                    <th
                      key={wk}
                      className="px-3 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      {wk.toUpperCase()}
                    </th>
                  ))}

                  {/* 💪 打卡總和 */}
                  <th className="px-3 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                    💪
                  </th>

                  {/* 驚喜任務 */}
                  <th className="px-3 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                    驚喜任務
                  </th>

                  {/* 當前積分（i 說明保留原本樣式） */}
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                    <span className="align-middle">當前積分</span>
                    <span className="relative inline-block ml-2 align-middle">
                      <button
                        type="button"
                        onClick={() => setShowScoreTip(v => !v)}
                        onBlur={() => setShowScoreTip(false)}
                        className="align-middle inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold"
                        aria-label="顯示說明"
                        aria-expanded={showScoreTip}
                      >
                        i
                      </button>
                      {showScoreTip && (
                        <div className="absolute right-0 mt-2 w-72 text-left whitespace-normal bg-slate-900 text-slate-100 text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-slate-700 z-50">
                          團隊總分 = 兩人的增肌減脂分數加總 × 60% ＋ 兩人的（運動打卡 + 驚喜任務）加總 × 40%
                        </div>
                      )}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {rows.map(({ team, rank, total }) => {
                  const workoutSum = getWorkoutSum(team as AnyTeam);
                  const surprise = (team as AnyTeam).surprise ?? 0;

                  return (
                    <tr key={team.id} className={rank <= 3 ? 'bg-slate-700/30' : ''}>
                      {/* 排名 */}
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                        {/* 若你有獎盃圖示函式，可在這裡補上 */}
                        <span className="hidden sm:inline">{rank}</span>
                      </td>

                      {/* 組別／成員（合併） */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-600 text-white text-xs font-bold px-[6px] py-[2px] rounded-md inline-block">
                            #{team.id}
                          </span>
                          <span className="text-white font-medium">{team.name ?? `#${team.id}`}</span>
                        </div>
                        <div className="text-slate-300 text-sm mt-1">
                          {team.members.join(' & ')}
                        </div>
                      </td>

                      {/* W1~W8 逐欄 */}
                      {weekKeys.map((wk) => {
                        const v = getWeek(team as AnyTeam, wk);
                        return (
                          <td
                            key={wk}
                            className="px-3 py-4 text-center whitespace-nowrap text-white"
                          >
                            {v ? `+${v}` : '–'}
                          </td>
                        );
                      })}

                      {/* 💪 打卡總和 */}
                      <td className="px-3 py-4 text-center whitespace-nowrap text-white">
                        {workoutSum ? `+${workoutSum}` : '+0'}
                      </td>

                      {/* 驚喜任務 */}
                      <td className="px-3 py-4 text-center whitespace-nowrap text-white">
                        {surprise ? `+${surprise}` : '+0'}
                      </td>

                      {/* 當前積分（依公式） */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold">
                        <span className="bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text">
                          {fmt1(total)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })()}
      </div>
      {/* ====== 只改 table 區塊：到這裡結束 ====== */}


        <p className="text-center text-slate-400 mt-4 text-sm">
          提醒：每週需確實完成3次運動打卡，並上傳認證照至雲端，審核通過才會認列積分。
        </p>


      {/* Upload Photo Section */}
      <section className="bg-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white whitespace-nowrap">看完戰況忍不住想運動了嗎？</h2>
                <p className="text-slate-300 mt-1">快去揮灑汗水並上傳照片吧！</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a href={"https://drive.google.com/drive/u/0/folders/1d-JmO9mOgzwFn-2AMeuIUuh-IM_5qSrv"} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all">
                    上傳認證照
                </a>
            </div>
        </div>
      </section>


  );
};

export default RankingPage;
