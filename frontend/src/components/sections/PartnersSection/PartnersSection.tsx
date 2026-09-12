"use client";

import React from "react";
import styles from "./PartnersSection.module.css";

const row1 = [
  "Apex Dynamics",
  "Vanguard Tech",
  "Nexlify Global",
  "Hyperion Media",
  "Synapse AI",
  "Krypton Labs",
];

const row2 = [
  "Quantum Leap",
  "CyberPulse",
  "Aura Digital",
  "Orbit Studios",
  "Velocity Works",
  "Elysium Cloud",
];

const row3 = [
  "Starlight Studios",
  "EchoVentures",
  "Nova Systems",
  "Atlas Creative",
  "Matrix Flow",
  "Zenith Partners",
];

export function PartnersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>
          Trusted by Industry Leaders Worldwide
        </div>

        <div className={styles.rowsContainer}>
          {/* Row 1: Leftward */}
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrackLeft}>
              {[...row1, ...row1, ...row1].map((name, i) => (
                <div key={`r1-${i}`} className={styles.partnerCard}>
                  <span className={styles.partnerDot} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward (Reverse) */}
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrackRight}>
              {[...row2, ...row2, ...row2].map((name, i) => (
                <div key={`r2-${i}`} className={styles.partnerCard}>
                  <span className={styles.partnerDot} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Leftward (Desktop & Large Tablet Only) */}
          <div className={`${styles.marqueeRow} ${styles.desktopOnlyRow}`}>
            <div className={styles.marqueeTrackFast}>
              {[...row3, ...row3, ...row3].map((name, i) => (
                <div key={`r3-${i}`} className={styles.partnerCard}>
                  <span className={styles.partnerDot} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}