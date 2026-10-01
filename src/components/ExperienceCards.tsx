"use client";

import { useState } from "react";
import { PhotoPopup } from "@/components/PhotoPopup";
import { experience } from "@/lib/data";

export function ExperienceCards() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const selected = experience.find((item) => item.company === selectedCompany);

  return (
    <>
      <div className="experience-grid">
        {experience.map((item, index) => {
          const isSelected = item.company === selectedCompany;

          return (
            <button
              type="button"
              className={`experience-card experience-card-${index + 1}${isSelected ? " is-selected" : ""}`}
              key={item.company}
              aria-expanded={isSelected}
              aria-controls="experience-detail"
              onClick={() =>
                setSelectedCompany(isSelected ? null : item.company)
              }
            >
              <span className="experience-art" aria-hidden="true">
                <span className="art-label">0{index + 1}</span>
                <span className="art-mark">
                  {item.company === "OpenText" ? (
                    <span className="opentext-mark">OpenText</span>
                  ) : item.company === "Waterloo Data Science Club" ? (
                    <span className="dsc-mark">
                      DSC<span className="dsc-brackets">/</span>
                    </span>
                  ) : (
                    <span className="watai-mark">WAT.ai</span>
                  )}
                </span>
                <span className="art-orbit art-orbit-one" />
                <span className="art-orbit art-orbit-two" />
              </span>
              <span className="experience-caption">
                <span className="experience-title-line">
                  <span className="experience-company">{item.company}</span>
                  <span className="experience-period">{item.period}</span>
                </span>
                <span className="experience-role">{item.role}</span>
                <span className="experience-open">
                  {isSelected ? "Close details −" : "View details +"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <section
        className="experience-detail"
        id="experience-detail"
        aria-live="polite"
        aria-label={selected ? `${selected.company} experience details` : undefined}
        hidden={!selected}
      >
        {selected && (
          <>
            <div className="experience-detail-heading">
              <div>
                <p>{selected.role}{selected.location ? ` · ${selected.location}` : ""}</p>
                <h3>{selected.company}</h3>
              </div>
              <span>{selected.period}</span>
            </div>
            <ul>
              {(selected.bullets ?? []).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {selected.links && selected.links.length > 0 && (
              <div className="experience-detail-links">
                {selected.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
            {selected.company === "OpenText" && (
              <div className="experience-detail-links">
                <PhotoPopup
                  src="/opentext-first-coop.jpg"
                  alt="Riza with her OpenText co-op team"
                  label="Enjoying my first co-op! ↗"
                  className="experience-photo-link"
                />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
