import React from 'react';
import { SeoHead } from '../seo/SeoHead';
import { SITE_NAME } from '../../lib/seo/site';
import { ResourceKicker, ResourcePageShell } from './ResourcePageShell';
import { SUPPORT_EMAIL } from '../../data/resources';

interface AboutUsPageProps {
  onNavigate: (path: string) => void;
}

const TEAM = [
  {
    name: 'Tom',
    role: 'Customer chat',
    paragraphs: [
      "Hi, I'm Tom. I'm 35 and I've spent the last 14 years lifting, cycling and digging through every bit of bodybuilding info I could find. Forums, books, podcasts, late-night Reddit threads, you name it.",
      "I'm the person you'll talk to if you DM the shop. I'll give you a straight answer about cycles, dosing, food, training. No fluff, no upselling. If a product is wrong for what you want, I'll tell you to skip it.",
      "Easiest way to reach me is the live chat on any page, usually within the hour during UK daytime.",
    ],
  },
  {
    name: 'Patrick',
    role: 'Cycle advice',
    paragraphs: [
      "I'm Patrick, 28, and the practical side of the team. My focus is anabolic cycles, SARMs, peptides and growth hormones, in real-world use rather than theory.",
      "I help with personalised cycle advice and I'm the one testing new batches before they hit the catalogue. If you're planning a cycle and want a second pair of eyes on it, drop me an email and we'll talk through goals, current stats and side-effect risk.",
    ],
  },
  {
    name: 'Dr. Aditya K. S.',
    role: 'Medical advisor',
    paragraphs: [
      "I'm Dr. Aditya K. S., an MCh Urologist with a foundation in General Surgery (MS) and a gold medal from KGMU. I've spent over two decades in clinical practice in Lucknow and I sit on the team as the medical advisor.",
      "I'm here to keep the conversation grounded. Health markers, side-effect management, when to pause a cycle, when to see your own doctor. If something you read in a forum doesn't add up, ask. Honest, medical-grounded answers, not opinions.",
    ],
  },
];

const STANDARDS = [
  'Independent lab testing on every batch',
  'Royal Mail tracked delivery, signed for at your door',
  'Plain unmarked packaging, neutral sender name',
  'Reship guarantee if a parcel goes missing in transit',
  'Same-day dispatch on orders paid before 12:00',
  'Crypto and Bank Transfer accepted',
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title={`About Us | ${SITE_NAME}`}
        description="Real people, real bodybuilding, shipped from a UK warehouse. Lab-tested catalogue run by lifters who answer your messages."
        canonical={`${window.location.origin}/about-us`}
      />
      <ResourcePageShell
        kicker="About"
        title="Real people, real bodybuilding, shipped from a UK warehouse."
        intro="We serve the UK bodybuilding community, both men and women, with lab-tested gear from manufacturers we know by name. The shop is run by lifters and a medical advisor who actually answer your messages."
        currentPath="/about-us"
        onNavigate={onNavigate}
      >
        <section>
          <ResourceKicker>Who we are</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The UK's largest online shop for lab-tested anabolic steroids.
          </h2>
          <div className="mt-5 space-y-4 text-[15px] text-slate-600 leading-relaxed max-w-3xl">
            <p>
              At our shop, we take pride in serving the dedicated community of male and female bodybuilders. We offer
              only the highest quality, lab-tested stuff. Our selection features premium brands, carefully selected to
              ensure our customers receive tested and safe anabolic steroids.
            </p>
            <p>
              Our qualified team is deeply knowledgeable about all aspects of anabolic steroids and bodybuilding. We are
              committed to promoting healthy bodybuilding practices, with value knowledge in terms of using anabolic
              steroids based on our personal experience.
            </p>
            <p>
              We understand the demands of the sport and the importance of using reliable substances. That's why we stand
              by our promise of exceptional quality and trusted expertise to enhance your athletic performance and overall
              well-being.
            </p>
          </div>
        </section>

        <section>
          <ResourceKicker>The team</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The people you'll actually talk to.
          </h2>
          <p className="text-[15px] text-slate-600 mt-3 mb-6">
            Three of us run this. We sign every reply with a name and we don't outsource the advice.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {TEAM.map((member) => (
              <article key={member.name} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-12 w-12 rounded-full bg-[#003d30] text-white font-black flex items-center justify-center">
                    {member.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-black text-slate-900">{member.name}</p>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#157a62]">{member.role}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  {member.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <ResourceKicker>What you get with every order</ResourceKicker>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
            Six things we hold ourselves to.
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {STANDARDS.map((item, i) => (
              <li
                key={item}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4 text-sm font-semibold text-slate-800 flex gap-3"
              >
                <span className="text-[#157a62] font-black shrink-0">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-[#003d30] text-white p-8 md:p-10">
          <h2 className="text-2xl font-black tracking-tight">Got a question before you order?</h2>
          <p className="text-sm text-emerald-100 mt-3 max-w-2xl leading-relaxed">
            Drop us a message in the chat or by email. Tom, Patrick or the duty advisor will get back to you, usually
            within the hour during UK working time.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="rounded-full bg-white text-[#003d30] px-5 py-2.5 text-xs font-black"
            >
              Contact the team
            </a>
            <button
              type="button"
              onClick={() => onNavigate('/shop')}
              className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-black cursor-pointer"
            >
              Browse the shop
            </button>
          </div>
          <p className="text-[11px] text-emerald-200/80 mt-8 leading-relaxed">
            Products sold by {SITE_NAME} are research compounds. By purchasing you confirm you are 18 or older and that
            you are buying for research purposes.
          </p>
        </section>
      </ResourcePageShell>
    </>
  );
};
