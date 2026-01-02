"use client";

import { useMemo, useState } from "react";

type Audience =
  | "founders"
  | "enterprise"
  | "creators"
  | "students"
  | "internalTeams";

type Platform = "web" | "mobile" | "desktop" | "multiplatform";

type Monetization = "subscription" | "freemium" | "transaction" | "enterprise";

type FormState = {
  concept: string;
  challenge: string;
  audience: Audience;
  platform: Platform;
  monetization: Monetization;
  ambition: number;
  constraints: string;
  launchWindow: string;
  tone: "visionary" | "pragmatic" | "experimental";
};

type BlueprintSection = {
  title: string;
  summary: string;
  deliverables: string[];
};

type ScoreBreakdown = {
  viability: number;
  differentiation: number;
  feasibility: number;
  readiness: number;
};

type GeneratedResult = {
  blueprint: BlueprintSection[];
  evaluation: {
    rating: number;
    verdict: string;
    highlights: string[];
    risks: string[];
    score: ScoreBreakdown;
  };
  stack: {
    architecture: string[];
    experience: string[];
    operations: string[];
  };
  timeline: {
    phase: string;
    focus: string;
    duration: string;
  }[];
  id: string;
  createdAt: number;
};

const defaultForm: FormState = {
  concept: "",
  challenge: "",
  audience: "founders",
  platform: "web",
  monetization: "subscription",
  ambition: 3,
  constraints: "",
  launchWindow: "6 weeks",
  tone: "visionary",
};

const AUDIENCE_LABELS: Record<Audience, string> = {
  founders: "Startup Founders",
  enterprise: "Enterprise Teams",
  creators: "Creators & Influencers",
  students: "Learners & Students",
  internalTeams: "Internal Company Teams",
};

const PLATFORM_LABELS: Record<Platform, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  multiplatform: "Multi-Platform",
};

const MONETIZATION_LABELS: Record<Monetization, string> = {
  subscription: "Subscription",
  freemium: "Freemium",
  transaction: "Per Transaction",
  enterprise: "Enterprise Contracts",
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function createBlueprint(form: FormState): BlueprintSection[] {
  const featurePool: Record<Platform, string[]> = {
    web: [
      "Progressive onboarding with actionable dashboards",
      "Scenario-based analytics with instant simulations",
      "Modular workflows with drag-and-drop automation",
      "Permission-aware collaboration spaces",
      "Adaptive UI themes for stakeholder roles",
      "Insight timeline with decision snapshots",
    ],
    mobile: [
      "Context-aware push notifications with smart batching",
      "Offline-first task execution with background sync",
      "Camera-powered data capture workflows",
      "Haptic-first micro interactions",
      "Voice shortcut library for power users",
      "Adaptive home screen widgets for fast actions",
    ],
    desktop: [
      "Workspace dashboards with resizable canvases",
      "Advanced keyboard-first navigation schema",
      "Modular plugin system for power automations",
      "High-density data visualisation presets",
      "Multi-window focus modes",
      "Deep system integration bridge",
    ],
    multiplatform: [
      "Shared design system with platform-specific polish",
      "Continuity handoff between devices",
      "Unified state layer with optimistic updates",
      "Context-aware notifications per surface",
      "Cross-platform automation recipes",
      "Consistent analytics storytelling",
    ],
  };

  const ambitionMultiplier = 1 + form.ambition * 0.15;
  const featureCount = Math.min(
    5,
    Math.max(3, Math.round(ambitionMultiplier + form.challenge.length / 120)),
  );

  const curatedFeatures = featurePool[form.platform]
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, featureCount);

  return [
    {
      title: "North Star Experience",
      summary: `Deliver a coherent story for ${AUDIENCE_LABELS[form.audience]} tackling "${form.challenge || "the core pain"}" with a ${PLATFORM_LABELS[form.platform]} experience that feels ${form.tone}.`,
      deliverables: [
        `Narrative storyboard that anchors the product promise in three beats`,
        `Reference flows mapping ${curatedFeatures.length} standout interactions`,
        `Experience principles to ensure the ${form.tone} voice stays consistent`,
      ],
    },
    {
      title: "System Blueprint",
      summary:
        "Translate the experience into pragmatic systems with clear ownership and integration points.",
      deliverables: [
        `Architecture canvas covering data, automation, and external connectors`,
        `Measurement framework linked to ${MONETIZATION_LABELS[form.monetization]} outcomes`,
        `Guardrails for constraints like ${form.constraints || "performance and compliance"} to stay explicit`,
      ],
    },
    {
      title: "Execution Tracks",
      summary:
        "Break momentum into accountable sprints with room for discovery spikes.",
      deliverables: [
        "Sprint briefs describing core hypotheses and success signals",
        "Prototype validation kit with scripts, metrics, and follow-up loops",
        "Enablement plan for operators and launch comms",
      ],
    },
  ].map((section) => ({
    ...section,
    deliverables: [...section.deliverables, ...curatedFeatures],
  }));
}

function evaluate(form: FormState, blueprint: BlueprintSection[]) {
  const base = 55;
  const conceptScore = Math.min(20, form.concept.length / 6);
  const challengeScore = Math.min(18, form.challenge.length / 8);
  const ambitionBonus = form.ambition * 4;
  const constraintPenalty = Math.max(
    0,
    10 - Math.min(10, form.constraints.length / 12),
  );
  const monetizationBias =
    form.monetization === "subscription"
      ? 6
      : form.monetization === "enterprise"
        ? 8
        : 4;
  const toneBonus = form.tone === "experimental" ? 6 : form.tone === "visionary" ? 4 : 2;

  const rawScore =
    base +
    conceptScore +
    challengeScore +
    ambitionBonus +
    monetizationBias +
    toneBonus -
    constraintPenalty;

  const score: ScoreBreakdown = {
    viability: clampScore(rawScore - 8 + monetizationBias),
    differentiation: clampScore(rawScore - 4 + toneBonus),
    feasibility: clampScore(rawScore - constraintPenalty - 6),
    readiness: clampScore(52 + blueprint.length * 4 + form.ambition * 5),
  };

  const rating = clampScore(
    (score.viability +
      score.differentiation +
      score.feasibility +
      score.readiness) /
      4,
  );

  const verdict =
    rating >= 88
      ? "Invest immediately"
      : rating >= 75
        ? "Green-lit with targeted safeguards"
        : rating >= 62
          ? "Prototype before committing budget"
          : "Park the effort until the narrative sharpens";

  const highlights = [
    `Concept clarity score ${clampScore(conceptScore + 60)}/100 with ${AUDIENCE_LABELS[form.audience]} resonance`,
    `Monetisation path "${MONETIZATION_LABELS[form.monetization]}" shows ${monetizationBias >= 7 ? "strong" : "emerging"} alignment`,
    `${blueprint[0]?.deliverables.length ?? 0} signature interactions lined up for rapid validation`,
  ];

  const risks = [
    constraintPenalty > 6
      ? "Constraints feel under-articulated — document explicit boundaries."
      : "Keep constraints living in discovery rituals to avoid scope creep.",
    score.feasibility < 65
      ? "Technical feasibility requires explicit risk burndown per sprint."
      : "Bake in spike time to derisk platform integrations.",
    form.tone === "experimental"
      ? "Experimental tone needs storytelling guardrails during launch."
      : "Protect narrative polarity so the promise stays sharp.",
  ];

  return { rating, verdict, highlights, risks, score };
}

function recommendedStack(form: FormState) {
  const architecture: Record<Platform, string[]> = {
    web: ["Next.js App Router", "Edge Functions for personalization", "PostgreSQL with Row Level Security"],
    mobile: ["Expo + React Native", "GraphQL Gateway with persisted queries", "Supabase for real-time sync"],
    desktop: ["Tauri shell", "TRPC orchestration layer", "SQLite local-first cache with background sync"],
    multiplatform: ["GraphQL Federation layer", "Event-driven orchestrations with Inngest", "Supabase realtime core"],
  };

  const experience: Record<Audience, string[]> = {
    founders: ["Metric storytelling dashboards", "Self-serve integrations marketplace", "Adaptive pricing experiments"],
    enterprise: ["Role-based access with audit-ready logs", "SAML SSO & Just-In-Time provisioning", "Compliance grade data residency"],
    creators: ["Audience intelligence canvas", "Branded microsite generator", "Revenue split automation"],
    students: ["Guided learning paths", "Peer feedback loops", "Gamified mastery badges"],
    internalTeams: ["Operational playbooks", "Performance telemetry HUD", "Feedback cadences baked into flows"],
  };

  const operations = [
    "Infrastructure-as-Code with Deno Deploy previews",
    "Synthetic monitoring of critical journeys",
    "Data quality contracts with automatic alerts",
  ];

  return {
    architecture: architecture[form.platform],
    experience: experience[form.audience],
    operations,
  };
}

function buildTimeline(form: FormState): GeneratedResult["timeline"] {
  const ambition = form.ambition;
  return [
    {
      phase: "Sprint 0 · Positioning Lab",
      focus: "Define sharp product thesis, align on value moments, draft launch promise.",
      duration: "1 week",
    },
    {
      phase: "Discovery Sprints",
      focus: `Prototype and validate ${ambition >= 4 ? "advanced" : "core"} interactions with target users.`,
      duration: ambition >= 4 ? "3 weeks" : "2 weeks",
    },
    {
      phase: "Build Momentum",
      focus: "Ship production-ready vertical slice, wire telemetry, prep enablement assets.",
      duration: ambition >= 4 ? "4 weeks" : "3 weeks",
    },
    {
      phase: "Launch & Iterate",
      focus: `Deploy across ${PLATFORM_LABELS[form.platform]} surface, run experiments on monetisation levers.`,
      duration: form.launchWindow || "2 weeks",
    },
  ];
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [history, setHistory] = useState<GeneratedResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const recentHistory = useMemo(
    () =>
      history
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 3),
    [history],
  );

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isGenerating) return;
    setIsGenerating(true);

    window.setTimeout(() => {
      setIsGenerating(false);
    }, 600);

    const blueprint = createBlueprint(form);
    const evaluation = evaluate(form, blueprint);
    const stack = recommendedStack(form);
    const timeline = buildTimeline(form);

    const payload: GeneratedResult = {
      blueprint,
      evaluation,
      stack,
      timeline,
      id: generateId(),
      createdAt: Date.now(),
    };

    setResult(payload);
    setHistory((prev) => [payload, ...prev].slice(0, 5));
  }

  function handleReset() {
    setForm(defaultForm);
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-14 sm:pt-16 md:flex-row">
        <aside className="md:w-[360px]">
          <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <header className="mb-8 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
                Agentic Builder
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300"></span>
              </span>
              <h1 className="text-3xl font-semibold leading-tight text-white">
                Baue &nbsp;bewerte&nbsp; Apps mit einem strategischen Agenten
              </h1>
              <p className="text-sm leading-relaxed text-slate-300">
                Beschreibe deine Produktidee, und der Agent entwirft einen
                umsetzbaren Bauplan inklusive Bewertung, Tech-Stack und
                Launch-Timeline.
              </p>
            </header>

            <form className="space-y-5" onSubmit={handleGenerate}>
              <fieldset className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  Produktvision
                </label>
                <textarea
                  required
                  value={form.concept}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      concept: event.target.value,
                    }))
                  }
                  className="min-h-[88px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white caret-cyan-300 outline-none transition focus:border-cyan-400/50 focus:bg-slate-900/60"
                  placeholder="Beschreibe kurz, was deine App einzigartig macht."
                />
              </fieldset>

              <fieldset className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  Kernproblem
                </label>
                <textarea
                  required
                  value={form.challenge}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      challenge: event.target.value,
                    }))
                  }
                  className="min-h-[88px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white caret-cyan-300 outline-none transition focus:border-cyan-400/50 focus:bg-slate-900/60"
                  placeholder="Welche Herausforderung löst du konkret?"
                />
              </fieldset>

              <fieldset className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  Zielgruppe
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(AUDIENCE_LABELS) as Audience[]).map(
                    (audienceKey) => {
                      const isActive = form.audience === audienceKey;
                      return (
                        <button
                          key={audienceKey}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              audience: audienceKey,
                            }))
                          }
                          className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                            isActive
                              ? "border-cyan-300 bg-cyan-500/15 text-white"
                              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                          }`}
                        >
                          {AUDIENCE_LABELS[audienceKey]}
                        </button>
                      );
                    },
                  )}
                </div>
              </fieldset>

              <div className="grid grid-cols-2 gap-4">
                <fieldset className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                    Plattform
                  </label>
                  <select
                    value={form.platform}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        platform: event.target.value as Platform,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-slate-900/60"
                  >
                    {(Object.keys(PLATFORM_LABELS) as Platform[]).map(
                      (platformKey) => (
                        <option
                          key={platformKey}
                          value={platformKey}
                          className="bg-slate-900 text-white"
                        >
                          {PLATFORM_LABELS[platformKey]}
                        </option>
                      ),
                    )}
                  </select>
                </fieldset>

                <fieldset className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                    Monetarisierung
                  </label>
                  <select
                    value={form.monetization}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        monetization: event.target.value as Monetization,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-slate-900/60"
                  >
                    {(
                      Object.keys(MONETIZATION_LABELS) as Monetization[]
                    ).map((monetizationKey) => (
                      <option
                        key={monetizationKey}
                        value={monetizationKey}
                        className="bg-slate-900 text-white"
                      >
                        {MONETIZATION_LABELS[monetizationKey]}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>

              <fieldset className="space-y-2">
                <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-slate-300">
                  Ambitionsgrad
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-200">
                    {form.ambition}/5
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={form.ambition}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      ambition: Number(event.target.value),
                    }))
                  }
                  className="w-full accent-cyan-300"
                />
              </fieldset>

              <fieldset className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  Rahmenbedingungen
                </label>
                <input
                  value={form.constraints}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      constraints: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-slate-900/60"
                  placeholder="z. B. DSGVO, knappe Ressourcen, bestehende Tools"
                />
              </fieldset>

              <div className="grid grid-cols-2 gap-4">
                <fieldset className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                    Launch-Zeitfenster
                  </label>
                  <input
                    value={form.launchWindow}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        launchWindow: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-slate-900/60"
                    placeholder="z. B. 8 Wochen"
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                    Tonalität
                  </label>
                  <div className="flex gap-2">
                    {(["visionary", "pragmatic", "experimental"] as FormState["tone"][]).map(
                      (toneOption) => {
                        const isActive = form.tone === toneOption;
                        return (
                          <button
                            key={toneOption}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                tone: toneOption,
                              }))
                            }
                            className={`flex-1 rounded-2xl border px-3 py-2 text-sm capitalize transition ${
                              isActive
                                ? "border-cyan-300 bg-cyan-500/15 text-white"
                                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            {toneOption}
                          </button>
                        );
                      },
                    )}
                  </div>
                </fieldset>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99]"
                >
                  {isGenerating ? "Wird erstellt…" : "Agent starten"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-white/30"
                >
                  Reset
                </button>
              </div>
            </form>

            {recentHistory.length > 0 && (
              <section className="mt-8 space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Letzte Entwürfe
                </h2>
                <ul className="space-y-2 text-xs text-slate-400">
                  {recentHistory.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2"
                    >
                      <span className="truncate pr-2">
                        Score: {entry.evaluation.rating}/100 ·{" "}
                        {entry.blueprint[0]?.title}
                      </span>
                      <span className="text-[10px] uppercase">
                        {new Date(entry.createdAt).toLocaleTimeString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          {result ? (
            <>
              <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-transparent p-8 text-slate-100 shadow-lg shadow-cyan-500/10 backdrop-blur">
                <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                      Bewertungsergebnis
                    </p>
                    <h2 className="text-3xl font-semibold text-white">
                      {result.evaluation.verdict}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 px-5 py-4">
                    <span className="text-xs uppercase tracking-widest text-cyan-200">
                      Score
                    </span>
                    <span className="text-4xl font-bold text-white">
                      {result.evaluation.rating}
                    </span>
                    <div className="flex flex-col text-xs text-slate-200">
                      <span>Viability {result.evaluation.score.viability}</span>
                      <span>
                        Differentiation {result.evaluation.score.differentiation}
                      </span>
                      <span>
                        Feasibility {result.evaluation.score.feasibility}
                      </span>
                      <span>Readiness {result.evaluation.score.readiness}</span>
                    </div>
                  </div>
                </header>
                <div className="grid gap-6 pt-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
                      Highlights
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-200">
                      {result.evaluation.highlights.map((item, index) => (
                        <li
                          key={index}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
                      Risiken & To-Dos
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-200">
                      {result.evaluation.risks.map((item, index) => (
                        <li
                          key={index}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Agentischer Bauplan
                  </h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Blueprint
                  </span>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {result.blueprint.map((section) => (
                    <article
                      key={section.title}
                      className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6"
                    >
                      <h4 className="text-lg font-semibold text-white">
                        {section.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {section.summary}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-slate-200">
                        {section.deliverables.map((deliverable, index) => (
                          <li
                            key={index}
                            className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2"
                          >
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Stack-Empfehlung
                  </h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Tech System
                  </span>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <StackCard
                    title="Architektur"
                    items={result.stack.architecture}
                    accent="border-cyan-400/40 bg-cyan-500/10"
                  />
                  <StackCard
                    title="Erlebnis"
                    items={result.stack.experience}
                    accent="border-emerald-400/40 bg-emerald-500/10"
                  />
                  <StackCard
                    title="Operations"
                    items={result.stack.operations}
                    accent="border-indigo-400/40 bg-indigo-500/10"
                  />
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Launch-Timeline
                  </h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Momentum
                  </span>
                </div>
                <div className="space-y-3">
                  {result.timeline.map((phase) => (
                    <div
                      key={phase.phase}
                      className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/5 to-transparent p-5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-base font-semibold text-white">
                          {phase.phase}
                        </p>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-slate-200">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{phase.focus}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 text-center text-slate-300">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">
                Agent Wartet
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                Befülle links das Briefing, dann baut der Agent deinen Blueprint.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                Der Agent kombiniert Produktstrategie, Bauplan, Tech-Stack und
                Bewertung in einem Schritt. Keine KI-API, 100% deterministic.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

type StackCardProps = {
  title: string;
  items: string[];
  accent: string;
};

function StackCard({ title, items, accent }: StackCardProps) {
  return (
    <article
      className={`flex h-full flex-col gap-3 rounded-3xl border bg-white/5 p-5 ${accent}`}
    >
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <ul className="space-y-2 text-sm text-slate-200">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
