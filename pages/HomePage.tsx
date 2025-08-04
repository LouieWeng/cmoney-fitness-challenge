import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_DRIVE_URL, SIGNUP_FORM_URL } from '../constants';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-300">{children}</p>
  </div>
);

const TimelineStep: React.FC<{ date: string; title: string; description: string }> = ({ date, title, description }) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-700 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#92FFFE] after:border-4 after:box-content after:border-slate-800 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
      <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-[#92FFFE] bg-[#92FFFE]/20 rounded-full">{date}</time>
      <div className="text-xl font-bold text-white">{title}</div>
    </div>
    <p className="text-slate-400 mt-2">{description}</p>
  </div>
);

const RuleStep: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => {
    const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";
    return (
        <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-slate-800 border-2 border-[#92FFFE]/50">
                <span className={`text-3xl font-bold ${gradientText}`}>{number}</span>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    );
};

const PrizeCard: React.FC<{ title: string; prizes: { place: string; reward: string; color: string; icon: string; }[] }> = ({ title, prizes }) => (
    <div className="bg-slate-800 p-8 rounded-lg shadow-lg flex flex-col h-full">
        <h3 className="text-2xl font-bold text-center text-white mb-6">{title}</h3>
        <ul className="space-y-4 flex-grow">
            {prizes.map((prize, index) => (
                <li key={index} className="flex justify-between items-center text-lg">
                    <span>{prize.icon} {prize.place}</span>
                    <span className={`font-bold ${prize.color}`}>{prize.reward}</span>
                </li>
            ))}
        </ul>
    </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";

  const menPrizes = [
    { place: '第一名', reward: '$4,000禮券', color: 'text-[#C4FF77]', icon: '🥇' },
    { place: '第二名', reward: '$2,000禮券', color: 'text-slate-300', icon: '🥈' },
    { place: '第三名', reward: '$1,000禮券', color: 'text-yellow-600', icon: '🥉' },
  ];
  const womenPrizes = [...menPrizes];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-16 items-center pt-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            <span className={gradientText}>增肌減脂挑戰賽</span>正式開戰
          </h1>
          <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-slate-300">
            2人一組，進行2個月的增肌減脂對決。和你的隊友互相督促，一起為健康與獎金而戰！
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <a href={"https://forms.gle/RjWVDVjESkKVapJf6"} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all">
              立即報名
            </a>
            <button onClick={() => navigate('/ranking')} className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
              每週賽況
            </button>
          </div>
        </div>
        <div className="flex justify-center">
            <img 
                src="/exercise.png" 
                alt="CM增肌減脂比賽" 
                className="rounded-lg shadow-2xl object-cover w-full h-full max-h-[500px]" 
            />
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-white mb-12">為什麼要參加？</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title="活得更健康" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}>
            想要成為有規律運動習慣，又能確實飲控的人嗎？加入這個挑戰，兩個月後的你絕對會比現在更健康！
          </FeatureCard>
          <FeatureCard title="提升團隊凝聚力" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}>
            和你的神隊友一起互相激勵、互相凱瑞，有共同目標會讓你們更麻吉！
          </FeatureCard>
          <FeatureCard title="抱走豐厚獎金" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>}>
            成為前三名，不僅可以拿到豐厚獎品，還能獲得增肌減脂王的封號！以後說到增肌減脂大家就會想到你！
          </FeatureCard>
        </div>
      </section>

      {/* Timeline Section */}
      <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">活動時程</h2>
          <div className="max-w-3xl mx-auto">
              <TimelineStep date="報名時程" title="7/25 (五)- 7/30 (三)" description="以Google表單填寫報名資訊，報名後會邀請參賽者加入Chat群組，公告組別號碼" />
              <TimelineStep date="賽前測量" title="8/1 (五) 10:00-12:00" description="依據報名結果區分量測時段，統一使用公司的 InBody 儀器測量，以及拍照紀錄、建檔" />
              <TimelineStep date="正式開賽" title="8/4 (一)" description="全體參賽者開始紀錄運動與飲食，展開8週的健身挑戰之旅，累積團隊總分" />
              <TimelineStep date="比賽結束" title="9/25 (四)" description="挑戰正式結束，停止分數累積，準備進行最終的成果彙整" />
              <TimelineStep date="賽後測量" title="9/26 (五) 10:00-12:00" description="量測 InBody、拍照紀錄，加總分數決定最終勝利隊伍" />
              <TimelineStep date="公告頒獎" title="10/1(三)" description="公布優勝隊伍，頒發獎金！" />
          </div>
      </section>

      {/* How to Compete Section */}
      <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">參加的話，我需要做什麼？</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <RuleStep number={1} title="團隊合作" description="和你的隊友一起合作、互相激勵，成為彼此的神隊友" />
              <RuleStep number={2} title="每週運動打卡" description="每人每週運動3次，每次30分鐘，上傳認證照後可為團隊+1分" />
              <RuleStep number={3} title="驚喜小任務" description="活動過程可能會有驚喜小任務，或許是與其他隊伍拉開差距的好機會" />
              <RuleStep number={4} title="測量身體數值" description="參與賽前與賽後測量，計算肌肉與體脂變化" />
          </div>
          <div className="text-center mt-12">
              <a href="https://docs.google.com/document/d/16-CGEZQCYxAekVy1dXnMB1hbricRomGm5XHLoN4Rcro/edit?tab=t.0#heading=h.w8y7f4xkl558"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
                看完整規則
              </a>
          </div>
      </section>

      {/* Prize Section */}
      <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">你準備好拿走 <span className={gradientText}>豐厚獎金了嗎？</span></h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PrizeCard title="男生組" prizes={menPrizes} />
              <PrizeCard title="女生組" prizes={womenPrizes} />
          </div>
          <p className="text-center text-slate-400 mt-8 max-w-2xl mx-auto">
              平手將優先比較增肌減脂分數，其次為運動打卡分數。詳見完整規則。
          </p>
      </section>

      {/* Sign up Section */}
      <section className="bg-slate-800 rounded-lg p-8">
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
                </a>*/}
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;