
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_DRIVE_URL, SIGNUP_FORM_URL } from '../constants';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-300">{children}</p>
  </div>
);

const TimelineStep: React.FC<{ date: string; title: string; description: string }> = ({ date, title, description }) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-700 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-emerald-500 after:border-4 after:box-content after:border-slate-800 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
      <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-400 bg-emerald-900/50 rounded-full">{date}</time>
      <div className="text-xl font-bold text-white">{title}</div>
    </div>
    <p className="text-slate-400 mt-2">{description}</p>
  </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Transform <span className="text-emerald-400">Together</span>.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
          Grab a partner, crush your fitness goals, and win big! Two months of sweat, strength, and success await in the CMoney Fitness Challenge.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">
            Join The Challenge
          </a>
          <button onClick={() => navigate('/ranking')} className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
            View Rankings
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-white mb-12">Why You Should Join</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title="Boost Your Health" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}>
            Feel more energetic, improve your physical well-being, and build sustainable healthy habits that last a lifetime.
          </FeatureCard>
          <FeatureCard title="Build Team Spirit" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}>
            Collaborate with a colleague, motivate each other, and strengthen your professional and personal bonds.
          </FeatureCard>
          <FeatureCard title="Win Awesome Prizes" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>}>
            Compete for the grand prize, bragging rights, and the title of CMoney Fitness Champion!
          </FeatureCard>
        </div>
      </section>
      
      {/* Rules Section */}
      <section className="bg-slate-800 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-8">How It Works</h2>
        <ol className="relative border-l border-slate-700 space-y-6">
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full -left-3 ring-8 ring-slate-800 text-white font-bold">1</span>
            <h3 className="text-lg font-semibold text-white">Team Up</h3>
            <p className="text-slate-300">Find a partner and form a dynamic duo. Register your team using the official sign-up form.</p>
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full -left-3 ring-8 ring-slate-800 text-white font-bold">2</span>
            <h3 className="text-lg font-semibold text-white">Work Out & Earn Points</h3>
            <p className="text-slate-300">Each team member must complete at least three 30-minute exercises per week. Every qualifying week earns +1 point for your team.</p>
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full -left-3 ring-8 ring-slate-800 text-white font-bold">3</span>
            <h3 className="text-lg font-semibold text-white">Log Your Progress</h3>
            <p className="text-slate-300">Upload a photo proof of each workout to the shared Google Drive folder. Honesty and consistency are key!</p>
          </li>
           <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full -left-3 ring-8 ring-slate-800 text-white font-bold">4</span>
            <h3 className="text-lg font-semibold text-white">Get Measured</h3>
            <p className="text-slate-300">Attend three mandatory body composition measurements to track fat loss and muscle gain. The biggest transformation wins big!</p>
          </li>
        </ol>
      </section>

      {/* Timeline Section */}
      <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">Contest Timeline</h2>
          <div className="max-w-3xl mx-auto">
              <TimelineStep date="Week 1" title="Kick-off & Initial Measurement" description="Let the games begin! Get your starting body composition stats recorded." />
              <TimelineStep date="Week 4" title="Mid-point Check-in" description="A midway checkpoint to see your progress and recalibrate your strategy." />
              <TimelineStep date="Week 8" title="Final Measurement & Victory" description="The final weigh-in. We'll crown the champions based on points and transformation!" />
          </div>
      </section>

    </div>
  );
};

export default HomePage;
