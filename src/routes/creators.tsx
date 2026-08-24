import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Video, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/kp/ui";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Kreative Planet Creator Network — Create. Grow. Connect." },
      {
        name: "description",
        content:
          "Creative support, growth guidance and brand collaboration opportunities for creators. Join the Kreative Planet Creator Network.",
      },
      { property: "og:title", content: "Kreative Planet Creator Network — Create. Grow. Connect." },
      {
        property: "og:description",
        content: "Creative support, growth guidance and brand collaboration opportunities for creators.",
      },
    ],
  }),
  component: CreatorsLandingPage,
});

function CreatorsLandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1300px]">
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl kp-glass border border-white/10 p-8 md:p-16 text-center">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-kp-pink/20 blur-[100px] pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-kp-purple/20 blur-[100px] pointer-events-none" />

          <Reveal>
            <span className="kp-eyebrow inline-flex items-center gap-2 rounded-full border border-kp-pink/30 bg-kp-pink/10 px-4 py-1.5 text-kp-pink">
              <Sparkles className="h-3.5 w-3.5" /> Kreative Planet Creator Network
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-8 text-5xl font-extrabold uppercase tracking-tight sm:text-7xl md:text-8xl leading-none">
              CREATE. GROW. <span className="kp-gradient-text">CONNECT.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-3xl text-base text-foreground/80 md:text-xl font-normal leading-relaxed">
              Join the Kreative Planet Creator Network and get the creative support, growth guidance and brand opportunities you need to grow as a creator.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/creators/join"
                className="kp-gradient-bg inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] transition-transform hover:scale-105"
              >
                JOIN THE NETWORK <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/creators/login"
                className="kp-hairline inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-white/10 transition-colors"
              >
                LOGIN <ArrowRight className="h-4 w-4 text-kp-pink" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Reveal delay={100}>
            <div className="kp-hairline h-full rounded-3xl bg-card/40 p-8 transition-transform hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-kp-pink/15 text-kp-pink">
                <Video className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-extrabold uppercase">CREATIVE SUPPORT</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Get help with editing, content ideas, shooting guidance and creative execution tailored for your style.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="kp-hairline h-full rounded-3xl bg-card/40 p-8 transition-transform hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-kp-orange/15 text-kp-orange">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-extrabold uppercase">GROWTH SUPPORT</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Get content strategy and organic growth guidance designed around your niche, voice, and target audience.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="kp-hairline h-full rounded-3xl bg-card/40 p-8 transition-transform hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-kp-purple/15 text-kp-purple">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-extrabold uppercase">BRAND COLLABORATIONS</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Get access to relevant brand collaboration opportunities and paid creator campaigns through our network.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Why Join Section */}
        <div className="mt-20 rounded-3xl kp-hairline bg-card/30 p-8 md:p-14">
          <Reveal>
            <span className="kp-eyebrow text-kp-orange">CREATOR ECOSYSTEM</span>
            <h2 className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl">
              WHY JOIN <span className="kp-gradient-text">KREATIVE PLANET?</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Content strategy support",
              "Video editing support",
              "Content calendar support",
              "Shooting guidance",
              "Organic growth guidance",
              "Brand collaboration opportunities",
            ].map((item, idx) => (
              <Reveal key={item} delay={idx * 60}>
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-background/60 p-4">
                  <CheckCircle2 className="h-5 w-5 text-kp-pink shrink-0" />
                  <span className="text-sm font-semibold uppercase">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-10 border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="max-w-2xl text-base text-foreground/80 italic font-medium">
                "You don't join Kreative Planet only for brand deals. You join because you have a dedicated creative team and network supporting your creator journey."
              </p>
              <Link
                to="/creators/join"
                className="kp-gradient-bg shrink-0 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:scale-105 transition-transform"
              >
                Apply Now →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
