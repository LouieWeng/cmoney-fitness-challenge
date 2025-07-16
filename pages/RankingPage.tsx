
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
  const sortedTeams: Team[] = [...TEAMS_DATA].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Current <span className="text-emerald-400">Standings</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
          The leaderboard is heating up! Keep checking in to climb the ranks.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {sortedTeams.map((team, index) => (
                  <tr key={team.id} className={index < 3 ? 'bg-slate-700/30' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                      {getTrophyIcon(index + 1)}
                      <span className="hidden sm:inline">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">Team #{team.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{team.members.join(' & ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-emerald-400 font-bold text-lg">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-slate-400 mt-4 text-sm">
            Reminder: Points are awarded for completing at least three 30-min workouts per week.
        </p>
      </section>

      <section className="bg-slate-800 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">Ready to Make Your Move?</h2>
                <p className="text-slate-300 mt-1">Join the competition or upload your latest workout to earn points!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors text-center">
                    Sign Up Now
                </a>
                <a href={GOOGLE_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-sky-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-600 transition-colors text-center">
                    Upload Proof
                </a>
            </div>
        </div>
      </section>
    </div>
  );
};

export default RankingPage;
