//import React from 'react';
import React, { useState } from 'react';
import { TEAMS_DATA, SIGNUP_FORM_URL, GOOGLE_DRIVE_URL } from '../constants';
import { Team } from '../types';

// 賽前隱藏排名
// const getTrophyIcon = (rank: number) => {
//   const iconClass = "h-6 w-6 inline-block mr-2";
//   if (rank === 1) return <span className={`${iconClass} text-yellow-400`}>🏆</span>;
//   if (rank === 2) return <span className={`${iconClass} text-slate-300`}>🥈</span>;
//   if (rank === 3) return <span className={`${iconClass} text-yellow-600`}>🥉</span>;
//   return <span className={`${iconClass} text-transparent`}>{rank}</span>;
// };

const getTrophyIcon = (rank: number) => {
  const iconClass = "h-6 w-6 inline-block mr-2";
  if (rank === 1) return <span className={`${iconClass} text-yellow-400`}>🏆</span>;
  if (rank === 2) return <span className={`${iconClass} text-slate-300`}>🥈</span>;
  if (rank === 3) return <span className={`${iconClass} text-yellow-600`}>🥉</span>;
  return <span className={`${iconClass} text-transparent`}>{rank}</span>;
};

const RankingPage: React.FC = () => {
  //const sortedTeams: Team[] = [...TEAMS_DATA].sort((a, b) => b.points - a.points);
  const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";

  //吃constants的性別資料
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const filteredTeams = TEAMS_DATA
  .filter((team) => team.gender === gender)
  .sort((a, b) => b.points - a.points);


  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          快來關注<span className={gradientText}>每週賽況</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          每週五前將結算前一週的運動打卡分數，並且更新到賽況。
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          最近更新：2025/08/04
        </p>
      </section>

      {/*男女子組頁籤*/}
      <div className="flex justify-center">
        <div className="relative inline-flex bg-slate-800 p-1 rounded-full">
          {/* 滑動底色 */}
          <div
            className={`absolute inset-[2px] w-1/2 rounded-full bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] transition-transform duration-300 ease-in-out ${
              gender === 'female' ? 'translate-x-[calc(100%-4px)]' : 'translate-x-0'
            }`}
          />
          {/* 按鈕 */}
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


      <section className="max-w-4xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">排名（賽前請先忽略)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">組別</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">成員</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">每週運動打卡</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">當前積分</th>
                </tr>
              </thead>
              {/*為了加入男女生頁籤更新這段*/}
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {filteredTeams.map((team, index) => (
                  <tr key={team.id} className={index < 3 ? 'bg-slate-700/30' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                      {getTrophyIcon(index + 1)}
                      <span className="hidden sm:inline">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      <span className="bg-slate-600 text-white text-sm font-bold px-1.5 py-0.5 rounded-md mr-2 inline-block">
                        #{team.id}
                      </span>
                      {/*<span className="text-slate-400">#{team.id}
                      </span>*/}
                       {team.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {team.members.join(' & ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white text-center">
                      +{team.exercise || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-right font-bold text-lg">
                      <span className={gradientText}>
                        {team.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/*<tbody className="bg-slate-800 divide-y divide-slate-700">
                {sortedTeams.map((team, index) => (
                  <tr key={team.id} className={index < 3 ? 'bg-slate-700/30' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                      {getTrophyIcon(index + 1)}
                      <span className="hidden sm:inline">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">#{team.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{team.members.join(' & ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-emerald-400 font-bold text-lg">{team.points}</td>
                  </tr>
                ))}
              </tbody>*/}
            </table>
          </div>
        </div>
        <p className="text-center text-slate-400 mt-4 text-sm">
            提醒：每週需確實完成3次運動打卡，並上傳認證照至雲端，審核通過才會認列積分。
        </p>
      </section>

      {/*<section className="bg-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">準備好要變更健康了嗎？</h2>
                <p className="text-slate-300 mt-1">找到你的神隊友後，就趕快填表單報名吧！男女生各限15組</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a href={"https://forms.gle/RjWVDVjESkKVapJf6"} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all">
                    立即報名
                </a>
                {/*<a href={"https://drive.google.com/drive/u/0/folders/1d-JmO9mOgzwFn-2AMeuIUuh-IM_5qSrv"} target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
                    上傳認證照
                </a>
            </div>
        </div>
      </section>*/}
    </div>
  );
};

export default RankingPage;