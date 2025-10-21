import { useState, useEffect, useRef } from "react";
import { Calendar, Wrench, Smile } from "lucide-react";
import styles from "./StatisticsSection.module.css";

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    interventions: 0,
  });
  const sectionRef = useRef(null);

  const statistics = [
    {
      id: "years",
      icon: Calendar,
      target: 10,
      label: "Ani de experiență",
      suffix: "+",
    },
    {
      id: "clients",
      icon: Smile,
      target: 500,
      label: "Clienți mulțumiți",
      suffix: "+",
    },
    {
      id: "interventions",
      icon: Wrench,
      target: 1000,
      label: "Intervenții efectuate",
      suffix: "+",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    const animateCount = (key, target) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounts((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, stepDuration);
    };

    // Start animations with slight delays for staggered effect
    setTimeout(() => animateCount("years", 10), 0);
    setTimeout(() => animateCount("clients", 500), 200);
    setTimeout(() => animateCount("interventions", 1000), 400);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={styles.statisticsSection}>
      <div className={styles.statisticsContainer}>
        <div className={styles.statisticsIntro}>
          <p className={styles.introText}>
            Suntem opțiunea perfectă pentru alegerea unui electrician Brașov, cu
            mii de intervenții reușite și clienți mulțumiți.
          </p>
        </div>
        <div className={styles.statisticsContent}>
          {statistics.map((stat, index) => {
            return (
              <div key={stat.id} className={styles.statisticItem}>
                <div className={styles.statisticIcon}>
                  {typeof stat.icon === "string" ? (
                    <span style={{ fontSize: "32px" }}>{stat.icon}</span>
                  ) : (
                    <stat.icon size={32} />
                  )}
                </div>
                <div className={styles.statisticNumber}>
                  {counts[stat.id]}
                  {stat.suffix}
                </div>
                <div className={styles.statisticLabel}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
