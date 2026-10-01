import type { ReactNode } from "react";
import { profile } from "@/lib/data";
import { ExperienceCards } from "@/components/ExperienceCards";
import { TerminalPanel } from "@/components/terminal/TerminalPanel";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      className="social-link"
      href={href}
      aria-label={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="portfolio">
      <header className="intro">
        <div className="intro-copy">
          <p className="intro-kicker">SOFTWARE · AI · FINANCE</p>
          <h1>{profile.name}<span className="name-period">.</span></h1>
          <p>
            I&apos;m studying <em>Computer Science + Finance</em> at the University
            of Waterloo.
          </p>
        </div>
        <nav className="social-links" aria-label="Contact and social links">
          <SocialLink href={`https://${profile.github}`} label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.6 1.2 3.23.92.1-.72.39-1.2.71-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.29-.5-1.42.11-2.95 0 0 .94-.3 3.06 1.14a10.63 10.63 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.12 2.95.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
              />
            </svg>
          </SocialLink>
          <SocialLink
            href={`https://${profile.linkedin}`}
            label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.9H4.99V9.43h2.94v9.47ZM6.46 8.14a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm12.45 10.76h-2.94v-4.61c0-1.1-.02-2.52-1.54-2.52-1.55 0-1.79 1.2-1.79 2.44v4.69H9.7V9.43h2.82v1.29h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.57 1.95 3.57 4.48v5.22Z"
              />
            </svg>
          </SocialLink>
          <SocialLink href={`mailto:${profile.email}`} label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3.6 5h16.8A1.6 1.6 0 0 1 22 6.6v10.8a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 17.4V6.6A1.6 1.6 0 0 1 3.6 5Zm8.4 7.15 7.43-5.58H4.57L12 12.15Zm-8 5.25h16V8.57l-7.4 5.55a1 1 0 0 1-1.2 0L4 8.57v8.83Z"
              />
            </svg>
          </SocialLink>
        </nav>
      </header>

      <section className="work-section" aria-label="Current experience">
        <div className="section-heading">
          <div>
            <h2>Where I&apos;m building</h2>
          </div>
        </div>
        <ExperienceCards />
      </section>

      <TerminalPanel />
    </main>
  );
}
