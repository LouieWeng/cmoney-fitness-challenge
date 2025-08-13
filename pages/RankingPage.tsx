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

  // 篩選 + 依分數排序
  const filteredTeams = TEAMS_DATA
    .filter((team) => team.gender === gender)
    .sort((a, b) => b.points - a.points);

  // 同分同名次 (standard competition ranking: 1,1,3,4…)
  const withRanks: Array<{ team: Team; rank: number }> = filteredTeams.reduce(
    (acc, team, i) => {
      const prev = acc[i - 1];
      const rank =
        i > 0 && prev && team.points === prev.team.points ? prev.rank : i + 1;
      acc.push({ team, rank });
      return acc;
    },
    [] as Array<{ team: Team; rank: number }>
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
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                    排名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    組別
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    成員
                  </th>
                  <th
                    className="
                      px-3 sm:px-6 py-3
                      text-center text-xs font-medium text-slate-300 uppercase tracking-wider
                      whitespace-normal leading-snug
                      min-w-[72px]   /* 給手機一個最小寬度，避免被擠成直排 */
                    "
                  >
                    {/* 桌機顯示一行 */}
                    <span className="hidden sm:inline">每週運動打卡</span>
                    {/* 手機顯示兩行 */}
                    <span className="sm:hidden">每週<br />運動打卡</span>
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <span className="align-middle">當前積分</span>
                    <span className="relative inline-block ml-2">
                      <button
                        type="button"
                        onClick={() => setShowScoreTip((v) => !v)}
                        onBlur={() => setShowScoreTip(false)}
                        className="align-middle inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-500 text-slate-200 text-[10px] font-bold"
                        aria-label="顯示說明"
                        aria-expanded={showScoreTip}
                      >
                        i
                      </button>
                      {showScoreTip && (
                        <div className="absolute right-0 mt-2 w-72 text-left whitespace-normal bg-slate-900 text-slate-100 text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-slate-700 z-50">
                          團隊總分 = 兩人的增肌減脂分數加總後 × 60% + 兩人的運動打卡加總 × 40%
                        </div>
                      )}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {withRanks.map(({ team, rank }) => (
                  <tr key={team.id} className={rank <= 3 ? 'bg-slate-700/30' : ''}>
                    {/* 排名欄：前三名總數 <= 5 才顯示獎盃/獎牌 */}
                   <td className="px-6 py-4 whitespace-nowrap text-lg font-bold flex items-center gap-2">
                      {rank <= 3 && top3Count <= 5 ? getTrophyIcon(rank) : null}
                      <span>{rank}</span>
                   </td>


                    {/* 組別欄 */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      <span className="bg-slate-600 text-white text-sm font-bold px-[4px] py-[2px] rounded-md mr-2 inline-block">
                        #{team.id}
                      </span>
                      {team.name}
                    </td>

                    {/* 成員欄（& 用淺灰） */}
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {team.members.map((m, i) => (
                        <span key={i}>
                          {m}
                          {i < team.members.length - 1 && (
                            <span className="text-slate-400"> & </span>
                          )}
                        </span>
                      ))}
                    </td>

                    {/* 每週運動打卡欄 */}
                    <td className="px-6 py-4 whitespace-normal break-words text-white text-center">
                      +{team.exercise ?? 0}
                    </td>

                    {/* 當前積分欄（漸層字） */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold">
                      <span className={gradientText}>{team.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-4 text-sm">
          提醒：每週需確實完成3次運動打卡，並上傳認證照至雲端，審核通過才會認列積分。
        </p>
      </section>

      {/* Upload Photo Section */}
      <section className="bg-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">看完戰況忍不住想運動了嗎？</h2>
                <p className="text-slate-300 mt-1">快去揮灑汗水並上傳照片吧！</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a href={"https://forms.gle/RjWVDVjESkKVapJf6"} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all">
                    上傳認證照
                </a>
                <a href={"https://drive.google.com/drive/u/0/folders/1d-JmO9mOgzwFn-2AMeuIUuh-IM_5qSrv"} target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
                    上傳認證照
                </a>
            </div>
        </div>
      </section>

    </div>
  );
};

export default RankingPage;
