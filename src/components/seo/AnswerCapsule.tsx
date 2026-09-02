import React from 'react';

interface AnswerCapsuleProps {
  children: React.ReactNode;
  className?: string;
}

/** GEO answer block — 40–60 word direct answer near top of page for snippet/AI eligibility. */
export function AnswerCapsule({ children, className = '' }: AnswerCapsuleProps) {
  return (
    <section
      id="answer"
      aria-label="Quick Answer"
      className={`rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 leading-relaxed ${className}`}
    >
      <p>
        <strong className="text-slate-900">Quick Answer:</strong> {children}
      </p>
    </section>
  );
}
