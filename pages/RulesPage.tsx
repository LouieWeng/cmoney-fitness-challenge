import React from 'react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="font-bold text-lg text-white mb-2">{question}</h3>
        <p className="text-slate-300">{children}</p>
    </div>
);

const RulesPage: React.FC = () => {
    const gradientText = "bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] text-transparent bg-clip-text";
    
  return (
    <div className="space-y-20">
        <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Contest <span className={gradientText}>Rules</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
                Follow these rules to ensure fair play and maximize your points. Good luck!
            </p>
        </section>

        <div className="max-w-4xl mx-auto space-y-16">
            <section>
                <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
                <ol className="relative border-l border-slate-700 space-y-8">
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] rounded-full -left-4 ring-8 ring-slate-900 text-slate-900 font-bold">1</span>
                        <h3 className="text-xl font-semibold text-white">Team Up</h3>
                        <p className="text-slate-300 mt-1">Find a partner and form a dynamic duo. Register your team using the official sign-up form.</p>
                    </li>
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] rounded-full -left-4 ring-8 ring-slate-900 text-slate-900 font-bold">2</span>
                        <h3 className="text-xl font-semibold text-white">Work Out & Earn Points</h3>
                        <p className="text-slate-300 mt-1">Each team member must complete at least three 30-minute exercises per week. Every qualifying week earns +1 point for your team.</p>
                    </li>
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] rounded-full -left-4 ring-8 ring-slate-900 text-slate-900 font-bold">3</span>
                        <h3 className="text-xl font-semibold text-white">Log Your Progress</h3>
                        <p className="text-slate-300 mt-1">Upload a photo proof of each workout to the shared Google Drive folder. Honesty and consistency are key!</p>
                    </li>
                    <li className="ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#92FFFE] to-[#C4FF77] rounded-full -left-4 ring-8 ring-slate-900 text-slate-900 font-bold">4</span>
                        <h3 className="text-xl font-semibold text-white">Get Measured for Prizes</h3>
                        <p className="text-slate-300 mt-1">Attend three mandatory body composition measurements to track fat loss and muscle gain. The biggest transformation wins the prizes!</p>
                    </li>
                </ol>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Frequently Asked <span className={gradientText}>Questions</span>
                </h2>
                <div className="space-y-6">
                    <FaqItem question="What counts as a workout?">
                        Any physical activity lasting at least 30 minutes with the intention of raising your heart rate. This includes running, weightlifting, HIIT, yoga, hiking, cycling, swimming, and team sports.
                    </FaqItem>
                    <FaqItem question="What if my partner and I can't work out together?">
                        No problem! You can work out separately. Just make sure you both log your three weekly workouts to earn your team point for the week.
                    </FaqItem>
                    <FaqItem question="How is the 'biggest transformation' measured for prizes?">
                        It will be based on a combination of percentage of body fat lost and percentage of muscle mass gained, as determined by the official body composition measurements at the start and end of the contest.
                    </FaqItem>
                    <FaqItem question="What if I miss a week of workouts?">
                        You won't earn a team point for that week, but you can jump right back in the following week. There are no penalties for missing a week.
                    </FaqItem>
                    <FaqItem question="How do I sign up or log my workouts?">
                        You can find links to sign up or upload your workout proof on the Rankings page. Let's get moving!
                    </FaqItem>
                </div>
            </section>
        </div>
    </div>
  );
};

export default RulesPage;