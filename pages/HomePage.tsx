
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-16 items-center pt-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Transform <span className={gradientText}>Together</span>.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-slate-300">
            Grab a partner, crush your fitness goals, and win big! Two months of sweat, strength, and success await in the CMoney Fitness Challenge.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-slate-900 font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all">
              Join The Challenge
            </a>
            <button onClick={() => navigate('/ranking')} className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
              View Rankings
            </button>
          </div>
        </div>
        <div className="flex justify-center">
            <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Two women exercising together" 
                className="rounded-lg shadow-2xl object-cover w-full h-full max-h-[500px]" 
            />
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

      {/* Timeline Section */}
      <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">Contest Timeline</h2>
          <div className="max-w-3xl mx-auto">
              <TimelineStep date="Week 1" title="Kick-off & Initial Measurement" description="Let the games begin! Get your starting body composition stats recorded." />
              <TimelineStep date="Week 4" title="Mid-point Check-in" description="A midway checkpoint to see your progress and recalibrate your strategy." />
              <TimelineStep date="Week 8" title="Final Measurement & Victory" description="The final weigh-in. We'll crown the champions based on points and transformation!" />
          </div>
      </section>

      {/* How to Compete Section */}
      <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">How to Compete</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <RuleStep number={1} title="Team Up" description="Form a dynamic duo and register your team." />
              <RuleStep number={2} title="Earn Points" description="Exercise 3x a week to earn team points." />
              <RuleStep number={3} title="Log Workouts" description="Upload photo proof to Google Drive." />
              <RuleStep number={4} title="Get Measured" description="Attend three check-ins to track transformation." />
          </div>
          <div className="text-center mt-12">
              <button onClick={() => navigate('/rules')} className="inline-block bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors">
                  View Full Rules
              </button>
          </div>
      </section>

    </div>
  );
};

export default HomePage;