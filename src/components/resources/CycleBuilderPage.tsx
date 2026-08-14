import React, { useState } from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourcePageShell } from './ResourcePageShell';
import { cn } from '../../lib/utils';

interface CycleBuilderPageProps {
  onNavigate: (path: string) => void;
}

type Answers = {
  who?: 'male' | 'female';
  experience?: 'first' | 'intermediate' | 'advanced';
  goal?: 'bulk' | 'cut' | 'recomp';
  route?: 'oral' | 'injectable' | 'mixed';
  support?: 'include-pct' | 'have-pct';
};

const QUESTIONS: {
  key: keyof Answers;
  title: string;
  body: string;
  options: { value: string; label: string; hint: string }[];
}[] = [
  {
    key: 'who',
    title: 'Who is the cycle for?',
    body: 'We tailor compounds and dosing for different physiologies. Female cycles only use mild orals with conservative dosing.',
    options: [
      { value: 'male', label: 'Male', hint: 'Full compound range' },
      { value: 'female', label: 'Female', hint: 'Anavar-led, conservative' },
    ],
  },
  {
    key: 'experience',
    title: 'What is your experience level?',
    body: 'First cycles stay simple. Advanced plans can include multi-compound stacks.',
    options: [
      { value: 'first', label: 'First cycle', hint: 'Single compound, shorter duration' },
      { value: 'intermediate', label: 'Intermediate', hint: 'Test base plus one add-on' },
      { value: 'advanced', label: 'Advanced', hint: 'Multi-compound stacks' },
    ],
  },
  {
    key: 'goal',
    title: 'What is the primary goal?',
    body: 'This decides whether we point you at mass, lean retention, or a middle path.',
    options: [
      { value: 'bulk', label: 'Bulking', hint: 'Caloric surplus, size' },
      { value: 'cut', label: 'Cutting', hint: 'Lean retention, hardness' },
      { value: 'recomp', label: 'Recomp', hint: 'Slow change at maintenance' },
    ],
  },
  {
    key: 'route',
    title: 'Preferred route?',
    body: 'Orals are convenient but liver-stressing. Injectables are typically the backbone of a plan.',
    options: [
      { value: 'oral', label: 'Oral only', hint: 'Tablets, no pins' },
      { value: 'injectable', label: 'Injectables', hint: 'Esters, fewer daily doses' },
      { value: 'mixed', label: 'Mixed', hint: 'Injectable base + oral kickstart' },
    ],
  },
  {
    key: 'support',
    title: 'Do you already have PCT?',
    body: 'Skipping PCT is the fastest route to shutdown. We always recommend a recovery plan.',
    options: [
      { value: 'include-pct', label: 'Include PCT', hint: 'Show PCT with the recommendation' },
      { value: 'have-pct', label: 'I already have PCT', hint: 'Focus on the main compounds' },
    ],
  },
];

function recommendation(a: Answers): { title: string; body: string; hrefs: { label: string; href: string }[] } {
  if (a.who === 'female') {
    return {
      title: 'Conservative Anavar-led plan',
      body: 'Female recommendations stay on mild orals at conservative doses. Speak to a clinician, get bloodwork, and keep the duration short.',
      hrefs: [
        { label: 'Shop Anavar', href: '/shop?q=anavar' },
        { label: 'PCT support', href: '/category/pct-health' },
      ],
    };
  }
  if (a.experience === 'first') {
    return {
      title: 'First-cycle testosterone base',
      body: 'Start with a single long-ester testosterone, track bloodwork, and run a full PCT. Do not stack tren or orals on a first cycle.',
      hrefs: [
        { label: 'Beginner stacks', href: '/category/stacks-bundles' },
        { label: 'Testosterone', href: '/shop?q=testosterone' },
        { label: 'PCT', href: '/category/pct-health' },
      ],
    };
  }
  if (a.goal === 'cut') {
    return {
      title: a.route === 'oral' ? 'Oral cutting support' : 'Lean-retention injectable plan',
      body: 'Cutting plans emphasise lean retention and estrogen control. Pair with a caloric deficit — compounds do not replace diet.',
      hrefs: [
        { label: 'Fat burners', href: '/category/fat-loss' },
        { label: 'Winstrol / Anavar', href: '/shop?q=winstrol' },
        { label: 'PCT', href: '/category/pct-health' },
      ],
    };
  }
  if (a.goal === 'bulk' && a.experience === 'advanced') {
    return {
      title: 'Advanced bulking stack',
      body: 'Test base plus a mass compound. Keep liver support if using orals. Bloodwork before, during and after.',
      hrefs: [
        { label: 'Bulking stacks', href: '/category/stacks-bundles' },
        { label: 'Injectables', href: '/category/injectable-steroids' },
        { label: 'PCT', href: '/category/pct-health' },
      ],
    };
  }
  return {
    title: 'Test-based mixed plan',
    body: 'A testosterone ester as the backbone, optional oral kickstart, and PCT. Educational recommendation only — not medical advice.',
    hrefs: [
      { label: 'Injectable steroids', href: '/category/injectable-steroids' },
      { label: 'Oral steroids', href: '/category/oral-steroids' },
      { label: 'PCT', href: '/category/pct-health' },
    ],
  };
}

export const CycleBuilderPage: React.FC<CycleBuilderPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const current = QUESTIONS[step];
  const done = step >= QUESTIONS.length;
  const rec = done ? recommendation(answers) : null;
  const progress = done ? 100 : ((step + 1) / QUESTIONS.length) * 100;

  return (
    <>
      <SeoHead
        title={`Cycle Builder | ${SITE_NAME}`}
        description="Build a catalogue recommendation in 5 questions — compounds, support and PCT. Educational only."
        canonical={`${window.location.origin}/cycle-builder`}
      />
      <ResourcePageShell
        kicker="Interactive Cycle Builder"
        title="Build your perfect cycle in 5 questions"
        intro="From first cycle to advanced multi-compound stacks — get a complete, evidence-based plan with main compounds, on-cycle support, PCT and injection accessories. No guesswork. Educational only — not medical advice."
        currentPath="/cycle-builder"
        onNavigate={onNavigate}
      >
        <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#157a62]">
              {done ? 'Complete' : `Step ${step + 1} / ${QUESTIONS.length}`}
            </p>
            {!done && <p className="text-xs font-bold text-slate-400">Question {step + 1}</p>}
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-8">
            <div className="h-full bg-[#157a62] transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>

          {!done && current && (
            <>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{current.title}</h2>
              <p className="text-[15px] text-slate-600 mt-3 max-w-xl leading-relaxed">{current.body}</p>
              <div className={cn('grid gap-3 mt-8', current.options.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [current.key]: opt.value }));
                      setStep((s) => s + 1);
                    }}
                    className="text-left rounded-2xl border border-slate-200 bg-[#f7faf8] px-5 py-5 cursor-pointer hover:border-[#157a62] hover:bg-[#e8f6ef] transition-colors"
                  >
                    <p className="font-black text-slate-900 text-lg">{opt.label}</p>
                    <p className="text-sm text-slate-500 mt-1">{opt.hint}</p>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 text-xs font-extrabold text-slate-500 cursor-pointer"
                >
                  Back
                </button>
              )}
            </>
          )}

          {done && rec && (
            <>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#157a62]">Your recommendation</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">{rec.title}</h2>
              <p className="text-[15px] text-slate-700 mt-4 leading-relaxed">{rec.body}</p>
              {answers.support === 'include-pct' && (
                <p className="text-[15px] text-slate-700 mt-3 leading-relaxed">
                  Include a SERM-based PCT (Nolvadex / Clomid) for 4 weeks after the cycle. Skipping PCT is never optional.
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-6">
                {rec.hrefs.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => onNavigate(link.href)}
                    className="rounded-full bg-[#003d30] text-white px-5 py-2.5 text-xs font-black cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
                className="mt-5 text-xs font-extrabold text-[#157a62] cursor-pointer"
              >
                Start again
              </button>
            </>
          )}
        </div>
      </ResourcePageShell>
    </>
  );
};
