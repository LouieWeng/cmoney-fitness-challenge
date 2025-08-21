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

const gradientText = 'bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text';

/** 當前積分：兩人的增肌減脂分數加總 × 60% ＋ 兩人的團隊打卡分數加總 × 40% */
const getTotal = (t: Team): number => {
  // points = 兩人的增肌減脂分數加總（你的資料已是兩人加總）
  const body = (t.points ?? 0) * 0.6;
  // exercise = 兩人的每週運動打卡加總； surprise 可能不存在 -> 當 0
  const exercise = (t.exercise ?? 0) + ((t as any).surprise ?? 0);
  const sport = exercise * 0.4;
  const total = body + sport;
  // 如果你想固定一位小數可改成：Number(total.toFixed(1))
  return total;
};

const RankingPage: React.FC = () => {
  /** 男女頁籤（保留你的 UI 行為） */
  const [gender, setGender] = useState<'male' | 'female'>('male');
  /** 當前積分的小 i tooltip（保留你的 UI 行為） */
  const [showScoreTip, setShowScoreTip] = useState(false);

  /** 過濾/排序（用總分排序） */
  const filteredTeams = TEAMS_DATA
    .filter((team) => team.gender === gender)
    .sort((a, b) => getTotal(b) - getTotal(a));

  /** 同分同名次（1,1,3…），用「總分」判斷是否同分 */
  const withRanks = filteredTeams.reduce(
    (acc: Array<{ team: Team; rank: number }>, team, i) => {
      const prev = acc[i - 1];
      const rank = i > 0 && prev && getTotal(team) === getTotal(prev.team) ? prev.rank : i + 1;
      acc.push({ team, rank });
      return acc;
    },
    []
  );

  /** 計算前 3 名總數（>5 就不顯示獎盃/獎牌） */
  const top3Count = withRanks.filter((r) => r.rank <= 3).length;

  return (
    <div className="space-y-12">
      {/* ====== 頁面標題（保持你原本樣式） ====== */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          快來關注 <span className={gradientText}>每週賽況</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          每週五前將結算前一週的運動打卡分數，並且更新到賽況。
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">網站更新中，目前分數都是錯的，請先忽略！！！</p>
      </section>

      {/* ====== 男女子組頁籤（保持你原本樣式） ====== */}
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

      {/* ====== 只有「table 區塊」做事、其他不動 ====== */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    排名
                  </th>
                  {/*<th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    組別
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    成員
                  </th>*/}
                  {/* 組別（含成員） */}
                  <td className="px-6 py-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-600 text-white text-xs font-bold px-[6px] py-[2px] rounded-md">
                        #{team.id}
                      </span>
                      <span className="font-medium">{team.name}</span>
                    </div>
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

                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                    每週運動打卡
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                    驚喜任務
                  </th>
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
                        <div className="absolute right-0 mt-2 w-72 text-left whitespace-normal bg-slate-900 text-slate-100 text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-slate-700 z-50">
                          團隊總分 = 兩人的增肌減脂分數加總 × 60% + 兩人的團隊打卡分數加總 × 40%
                        </div>
                      )}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {withRanks.map(({ team, rank }) => (
                  <tr key={team.id} className={rank <= 3 ? 'bg-slate-700/30' : ''}>
                    {/* 排名 + 獎盃規則（前 3 名總數 > 5 就不顯示） */}
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                      {rank <= 3 && top3Count <= 5 ? getTrophyIcon(rank) : null}
                      <span className="hidden sm:inline">{rank}</span>
                    </td>

                    {/* 組別（#編號 + 隊名） */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      <span className="bg-slate-600 text-white text-sm font-bold px-[4px] py-[2px] rounded-md mr-2 inline-block">
                        #{team.id}
                      </span>
                      {team.name}
                    </td>

                    {/* 成員：A & B，中間 & 變淺灰 */}
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {team.members.map((m, i) => (
                        <span key={i}>
                          {m}
                          {i < team.members.length - 1 && (
                            <span className="text-slate-400"> &nbsp;&amp;&nbsp; </span>
                          )}
                        </span>
                      ))}
                    </td>

                    {/* 每週運動打卡 */}
                    <td className="px-6 py-4 whitespace-normal break-words text-white text-center">
                      +{team.exercise ?? 0}
                    </td>

                    {/* 驚喜任務（沒有就顯示 +0） */}
                    <td className="px-6 py-4 whitespace-nowrap text-white text-center">
                      +{(team as any).surprise ?? 0}
                    </td>

                    {/* 當前積分（套用公式），維持你的漸層文字 */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold">
                      <span className={gradientText}>{getTotal(team)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 備註（保留你的樣式內容） */}
        <p className="text-center text-slate-400 mt-4 text-sm">
          提醒：每週需確實完成3次運動打卡，並上傳認證照至雲端，審核通過才會認列積分。
        </p>
      </section>
    </div>
  );
};

export default RankingPage;

