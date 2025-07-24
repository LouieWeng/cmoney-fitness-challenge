import React from 'react';
import { TEAMS_DATA, SIGNUP_FORM_URL, GOOGLE_DRIVE_URL } from '../constants';
import { Team } from '../types';

const getTrophyIcon = (rank: number) => {
  const iconClass = "h-6 w-6 inline-block mr-2";
  if (rank === 1) return <span className={`${iconClass} text-yellow-400`}>🏆</span>;
  if (rank === 2) return <span className={`${iconClass} text-slate-300`}>🥈</span>;
  if (rank === 3) return <span className={`${iconClass} text-yellow-600`}>🥉</span>;
  return <span className={`${iconClass} text-transparent`}>{rank}</span>;
};

const RankingPage: React.FC = () => {
  // 計算總分（60% 增肌減脂分數 + 40% 運動打卡分數）
  const sortedTeams: Team[] = [...TEAMS_DATA]
    .map(team => ({
      ...team,
      totalScore: Math.round((team.muscleFatScore ?? 0) * 0.6 + (team.workoutScore ?? 0) * 0.4),
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          快來關注<span className={gradientText}>每週賽況</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          每週一將結算前一週的運動打卡分數，並且更新到賽況。
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          最近更新：2025/07/22
        </p>
      </section>

      <section className="max-w-6xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">排名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">組別</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">成員</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">增肌減脂</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">運動打卡</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">總分</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {sortedTeams.map((team, index) => (
                  <tr key={team.id} className={index < 3 ? 'bg-slate-700/30' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                      {getTrophyIcon(index + 1)}
                      <span className="hidden sm:inline">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">#{team.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{team.members.join(' & ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-white">{team.muscleFatScore}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-white">{team.workoutScore}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-emerald-400 font-bold text-lg">{team.totalScore}</td>
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

      <section className="bg-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">準備好要變更建康了嗎</h2>
            <p className="text-slate-300 mt-1">找到你的神隊友後，就趕快填表單報名吧！男女生各限15組</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all"
            >
              立即報名
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RankingPage;
