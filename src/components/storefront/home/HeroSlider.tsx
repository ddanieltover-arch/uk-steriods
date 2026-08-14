import React, { useEffect, useRef, useState } from 'react';
import {
  Beaker,
  Check,
  FileText,
  FlaskConical,
  Lock,
  Microscope,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Users,
} from 'lucide-react';
import { HERO_CARDS, HERO_SLIDE_PAIRS, type HeroCampaignCard, type HeroFeatureIcon } from '../../../data/homepage';

interface HeroSliderProps {
  onNavigate: (href: string) => void;
}

const HEX_BG =
  'radial-gradient(circle at 78% 42%, rgba(255,255,255,0.08), transparent 42%), linear-gradient(135deg, #111827 0%, #1e293b 55%, #0f172a 100%)';

const FeatureIcon: React.FC<{ name: HeroFeatureIcon; className?: string }> = ({ name, className }) => {
  const cls = className ?? 'h-4 w-4';
  switch (name) {
    case 'shield':
      return <ShieldCheck className={cls} />;
    case 'flask':
      return <FlaskConical className={cls} />;
    case 'microscope':
      return <Microscope className={cls} />;
    case 'star':
      return <Star className={cls} />;
    case 'truck':
      return <Truck className={cls} />;
    case 'lock':
      return <Lock className={cls} />;
    case 'users':
      return <Users className={cls} />;
    case 'check':
      return <Check className={cls} />;
    default:
      return <Beaker className={cls} />;
  }
};

const HexGrid: React.FC = () => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
      <defs>
        <pattern id={id} width="28" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

const Pedestal: React.FC<{ images: string[] }> = ({ images }) => {
  if (!images.length) return null;
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] sm:block">
      <div className="absolute bottom-5 left-1/2 h-28 w-44 -translate-x-1/2 rounded-full bg-[#39ff8a]/35 blur-2xl" />
      <div className="absolute bottom-6 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full border-2 border-[#39ff8a] bg-[#04150f] shadow-[0_0_28px_#39ff8a]" />
      <div className="absolute inset-x-0 bottom-10 flex items-end justify-center gap-1 px-2">
        {images.slice(0, 4).map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className={`object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] ${
              images.length === 1 ? 'h-[78%] max-h-[260px] w-auto' : 'h-[58%] max-h-[200px] w-[42%]'
            }`}
            style={{ transform: i % 2 === 1 ? 'rotate(8deg) translateY(8px)' : undefined }}
          />
        ))}
      </div>
    </div>
  );
};

const UkMapGlow: React.FC = () => (
  <svg viewBox="0 0 200 280" className="pointer-events-none absolute right-6 top-8 h-[78%] w-[42%] opacity-40" aria-hidden>
    <path
      d="M92 8c18 6 28 22 24 40-8 10-4 22 8 28 10 4 18 18 10 30-12 8-6 22 6 28 8 18-10 28-22 40-6 18 4 28 2 44-16 12-28 8-40 20-10-16-28-10-38-24 4-18-8-22-6-38 14-10 8-26 18-36-2-16 14-18 12-34 12-10 4-26 16-34 4-16 12-20 10-34z"
      fill="none"
      stroke="#39ff8a"
      strokeWidth="3"
      filter="url(#ukglow)"
    />
    <defs>
      <filter id="ukglow">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
  </svg>
);

const TrustShield: React.FC = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center sm:flex">
    <div className="absolute bottom-8 h-28 w-44 rounded-full bg-[#39ff8a]/30 blur-2xl" />
    <div className="absolute bottom-10 h-3 w-40 rounded-full border-2 border-[#39ff8a] shadow-[0_0_28px_#39ff8a]" />
    <div className="relative mb-8 flex h-44 w-36 flex-col items-center justify-center rounded-[2rem] border border-[#39ff8a]/40 bg-gradient-to-b from-slate-200 to-slate-500 shadow-[0_0_40px_rgba(57,255,138,0.35)]">
      <Shield className="mb-1 h-8 w-8 text-[#003d30]" />
      <p className="text-center text-[10px] font-black uppercase tracking-wider text-[#003d30]">Steroids UK</p>
      <div className="mt-2 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-1 text-xs font-black text-[#003d30]">5.0 / 5</p>
    </div>
  </div>
);

const QuizFigure: React.FC = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] sm:block">
    <div className="absolute right-4 top-8 h-[80%] w-40 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(174,218,194,0.35),transparent_70%)]" />
    <div className="absolute bottom-10 right-10 h-48 w-28 rounded-t-[80px] bg-gradient-to-t from-[#04150f] via-[#1a5c3a] to-[#aedac2] opacity-70" />
  </div>
);

const HeroCard: React.FC<{
  card: HeroCampaignCard;
  onNavigate: (href: string) => void;
}> = ({ card, onNavigate }) => {
  const isQuiz = card.layout === 'quiz';
  const isTrust = card.layout === 'trust';

  if (card.fullBleed) {
    return (
      <button
        type="button"
        onClick={() => onNavigate(card.href)}
        className="relative block aspect-[960/513] w-full cursor-pointer overflow-hidden rounded-2xl"
        aria-label={card.cta}
      >
        <img src={card.fullBleed} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </button>
    );
  }

  return (
    <article
      className="relative aspect-[960/518] overflow-hidden rounded-2xl ring-1 ring-slate-200"
      style={{ background: HEX_BG }}
    >
      <HexGrid />
      {card.watermark ? (
        <p className="pointer-events-none absolute right-4 top-10 select-none text-5xl font-black tracking-[0.2em] text-white/5 sm:text-7xl">
          {card.watermark}
        </p>
      ) : null}
      {isTrust ? <UkMapGlow /> : null}
      {isTrust ? <TrustShield /> : null}
      {isQuiz ? <QuizFigure /> : null}
      {!isQuiz && !isTrust ? <Pedestal images={card.images} /> : null}

      <div className="relative z-10 flex h-full flex-col justify-center px-5 py-6 sm:px-7 lg:max-w-[58%]">
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#39ff8a]/40 bg-[#04150f]/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
          {card.badgeIcon === 'sparkle' ? <Sparkles className="h-3 w-3 text-[#39ff8a]" /> : null}
          {card.badgeIcon === 'star' ? <Star className="h-3 w-3 text-[#39ff8a]" /> : null}
          {card.badgeIcon === 'check' ? <Check className="h-3 w-3 text-[#39ff8a]" /> : null}
          {card.badgeIcon === 'shield' ? <Shield className="h-3 w-3 text-[#39ff8a]" /> : null}
          {card.badge}
        </span>

        {card.kicker ? (
          <p className="text-sm font-semibold text-[#7dffb4]">{card.kicker}</p>
        ) : null}

        {isTrust ? (
          <h2 className="mt-1 text-3xl font-black leading-[0.95] tracking-tight sm:text-4xl">
            <span className="block text-5xl text-[#39ff8a] sm:text-6xl">UK</span>
            <span className="text-white"> {card.titleWhite} </span>
            <span className="text-[#39ff8a]">{card.titleAccent}</span>
          </h2>
        ) : (
          <h2 className="mt-1 text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-[2.15rem]">
            {card.titleWhite}{' '}
            {card.titleAccent ? <span className="text-[#39ff8a]">{card.titleAccent}</span> : null}
          </h2>
        )}

        {card.guarantee ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            <Check className="h-4 w-4 text-[#39ff8a]" />
            {card.guarantee}
          </p>
        ) : null}

        {card.subtitle ? (
          <p className={`mt-2 text-sm ${isTrust ? 'font-black uppercase tracking-widest text-white' : 'text-[#b7f5d0]'}`}>
            {card.subtitle}
          </p>
        ) : null}

        {card.features?.length ? (
          <ul
            className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 ${
              isQuiz ? 'text-white' : 'text-white/90'
            }`}
          >
            {card.features.map((f) => (
              <li key={f.label} className="flex items-start gap-1.5 text-[10px] font-bold uppercase tracking-wide">
                <FeatureIcon name={f.icon} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#39ff8a]" />
                <span>
                  {f.label}
                  {f.sub ? <span className="block font-semibold normal-case tracking-normal text-white/70">{f.sub}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          onClick={() => onNavigate(card.href)}
          className={`mt-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-wider ${
            card.ctaStyle === 'white'
              ? 'bg-white text-[#157a62]'
              : 'bg-[#2ee57a] text-white'
          }`}
        >
          {card.ctaIcon === 'cart' ? <ShoppingCart className="h-3.5 w-3.5" /> : null}
          {card.ctaIcon === 'file' ? <FileText className="h-3.5 w-3.5" /> : null}
          {card.cta}
        </button>
      </div>
    </article>
  );
};

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const apply = () => {
      setNarrow(mq.matches);
      setIndex(0);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const length = narrow ? HERO_CARDS.length : HERO_SLIDE_PAIRS.length;

  useEffect(() => {
    if (paused || length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, length]);

  const go = (next: number) => setIndex((next + length) % length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx > 40) go(index - 1);
    else if (dx < -40) go(index + 1);
  };

  return (
    <section
      className="bg-white px-3 py-4 sm:px-6 sm:py-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured promotions"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden">
          {narrow ? (
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {HERO_CARDS.map((card) => (
                <div key={card.id} className="w-full shrink-0 px-1">
                  <HeroCard card={card} onNavigate={onNavigate} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {HERO_SLIDE_PAIRS.map((pair) => (
                <div key={pair[0].id} className="grid w-full shrink-0 grid-cols-2 gap-4 px-1">
                  <HeroCard card={pair[0]} onNavigate={onNavigate} />
                  <HeroCard card={pair[1]} onNavigate={onNavigate} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 cursor-pointer rounded-full transition-all ${
                i === index ? 'w-6 bg-[#157a62]' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
