import { motion } from "framer-motion";
import styles from "./AboutPage.module.css";
import Meta from "../../components/SEO/Meta";

const AboutPage = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  return (
    <>
      <Meta
        title="Despre Noi - eisservice.ro | Platforma ta de încredere pentru servicii profesionale"
        description="Descoperă povestea din spatele platformei eisservice.ro. E.I.S. SERVICE COMPLETE S.R.L. conectează clienții cu cei mai buni profesioniști verificați din România. Calitate, încredere și eficiență garantate."
        url="https://eisservice.ro/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "E.I.S. SERVICE COMPLETE S.R.L.",
          alternateName: "eisservice.ro",
          url: "https://eisservice.ro",
          logo: "https://eisservice.ro/og-image.jpg",
          description:
            "Platforma ta de încredere pentru servicii profesionale în România",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Str. Baciului nr. 4, Biroul",
            addressLocality: "Brașov",
            addressRegion: "Brașov",
            addressCountry: "RO",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            url: "https://eisservice.ro/contact",
          },
          sameAs: ["https://eisservice.ro"],
        }}
      />
      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <motion.div
          className={styles.heroSection}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>Despre Noi</h1>
            <p className={styles.heroDescription}>
              Descoperă povestea din spatele platformei care conectează clienții
              cu cei mai buni profesioniști din România
            </p>
          </div>
        </motion.div>

        {/* About eisservice.ro Section */}
        <motion.div
          className={styles.sectionWrapper}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInLeft}
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Despre eisservice.ro</h2>
              <div className={styles.sectionSubtitle}>
                Platforma ta de încredere pentru servicii profesionale
              </div>
            </div>

            <div className={styles.sectionContent}>
              <div className={styles.textContent}>
                <p className={styles.paragraph}>
                  eisservice.ro este platforma ta de încredere pentru a găsi
                  rapid și eficient profesioniști verificați în toată România.
                  Misiunea noastră este de a conecta clienții cu specialiști
                  calificați pentru o gamă largă de servicii, de la reparații
                  casnice la proiecte complexe.
                </p>
                <p className={styles.paragraph}>
                  Ne dedicăm simplificării procesului de căutare și solicitare a
                  serviciilor, asigurând transparență, calitate și siguranță
                  pentru fiecare utilizator al platformei noastre.
                </p>
                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>Profesioniști verificați și calificați</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>Proces simplu și transparent</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>Acoperire națională în toată România</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>✓</div>
                    <span>Siguranță și încredere garantate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className={styles.missionSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.missionContainer}>
            <div className={styles.missionHeader}>
              <h2 className={styles.missionTitle}>Misiunea Noastră</h2>
              <div className={styles.missionSubtitle}>
                Construim punți între cerere și ofertă
              </div>
            </div>

            <div className={styles.missionContent}>
              <div className={styles.missionIntro}>
                <div className={styles.missionText}>
                  <p className={styles.missionParagraph}>
                    Credem în puterea comunității și în importanța serviciilor
                    de calitate. Indiferent dacă ai nevoie de un electrician, un
                    instalator, un mecanic auto sau un zugrav, eisservice.ro îți
                    oferă acces la o rețea extinsă de prestatori de top, gata să
                    răspundă nevoilor tale.
                  </p>
                  <p className={styles.missionParagraph}>
                    Ne propunem să revoluționăm modul în care oamenii găsesc și
                    accesează servicii profesionale în România, construind o
                    punte solidă între cerere și ofertă, bazată pe încredere,
                    transparență și excelență.
                  </p>
                </div>
              </div>

              <div className={styles.valuesSection}>
                <div className={styles.valuesGrid}>
                  <div className={styles.valueCard}>
                    <div className={styles.valueCardHeader}>
                      <div className={styles.valueIcon}>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <h3 className={styles.valueTitle}>Calitate</h3>
                      <p className={styles.valueSubtitle}>
                        Servicii de cea mai înaltă calitate
                      </p>
                    </div>
                    <div className={styles.valueCardContent}>
                      <p className={styles.valueDescription}>
                        Ne asigurăm că fiecare prestator de servicii din rețeaua
                        noastră îndeplinește cele mai înalte standarde de
                        calitate. Verificăm calificările, experiența și
                        portofoliul fiecărui profesionist pentru a-ți garanta
                        rezultate excepționale în fiecare proiect.
                      </p>
                    </div>
                  </div>

                  <div className={styles.valueCard}>
                    <div className={styles.valueCardHeader}>
                      <div className={styles.valueIcon}>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="9"
                            cy="7"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7006C21.7033 16.047 20.9999 15.5858 20.2 15.38"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className={styles.valueTitle}>Încredere</h3>
                      <p className={styles.valueSubtitle}>
                        Profesioniști verificați și de încredere
                      </p>
                    </div>
                    <div className={styles.valueCardContent}>
                      <p className={styles.valueDescription}>
                        Transparența și încrederea sunt fundamentale în
                        relațiile noastre. Fiecare prestator este verificat
                        riguros, iar sistemul nostru de evaluări și recenzii îți
                        permite să alegi cu încredere profesionistul potrivit
                        pentru nevoile tale specifice.
                      </p>
                    </div>
                  </div>

                  <div className={styles.valueCard}>
                    <div className={styles.valueCardHeader}>
                      <div className={styles.valueIcon}>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <h3 className={styles.valueTitle}>Eficiență</h3>
                      <p className={styles.valueSubtitle}>
                        Proces rapid și simplu
                      </p>
                    </div>
                    <div className={styles.valueCardContent}>
                      <p className={styles.valueDescription}>
                        Platforma noastră este proiectată pentru eficiență
                        maximă. În doar câteva minute poți găsi și contacta
                        profesioniști calificați, economisind timp și efort.
                        Procesul nostru simplificat te conectează rapid cu
                        soluțiile de care ai nevoie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Section */}
        <motion.div
          className={styles.companySection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.companyContainer}>
            <div className={styles.companyHeader}>
              <h2 className={styles.companyTitle}>
                Despre E.I.S. SERVICE COMPLETE S.R.L.
              </h2>
              <div className={styles.companySubtitle}>
                Compania din spatele platformei eisservice.ro
              </div>
            </div>

            <div className={styles.companyContent}>
              <div className={styles.companyText}>
                <p className={styles.companyParagraph}>
                  E.I.S. SERVICE COMPLETE S.R.L. este compania înregistrată care
                  operează platforma eisservice.ro. Suntem o echipă dedicată, cu
                  sediul în Brașov, și ne propunem să revoluționăm modul în care
                  oamenii găsesc și accesează servicii profesionale în România.
                </p>
                <p className={styles.companyParagraph}>
                  Activitatea noastră principală, conform codului CAEN 4791, se
                  concentrează pe intermedierea în comerțul cu amănuntul
                  nespecializat, ceea ce reflectă rolul nostru de a facilita
                  conexiuni între clienți și prestatori de servicii.
                </p>

                {/* Map Section */}
                <motion.div
                  className={styles.mapSection}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeInUp}
                >
                  <motion.h3 className={styles.mapTitle} variants={fadeInUp}>
                    Locația Noastră
                  </motion.h3>
                  <motion.p
                    className={styles.mapDescription}
                    variants={fadeInUp}
                  >
                    Ne găsești la sediul nostru din Brașov. Vezi harta de mai
                    jos pentru indicații precise.
                  </motion.p>
                  <motion.div
                    className={styles.mapContainer}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.0000000000005!2d25.589999999999997!3d45.642000000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b7e0d0d0d0d%3A0x0d0d0d0d0d0d0d0d!2sStrada%20Baciului%204%2C%20Bra%C8%99ov%20500000!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro"
                      width="100%"
                      height="340"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Locația E.I.S. Service Complete S.R.L."
                    ></iframe>
                  </motion.div>
                </motion.div>
              </div>

              <div className={styles.companyDetails}>
                <div className={styles.detailsHeader}>
                  <div className={styles.detailsIcon}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 21H21V19C21 17.9391 20.5786 16.9217 19.8284 16.1716C19.0783 15.4214 18.0609 15 17 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 21V19C21 18.1645 20.7155 17.3541 20.2094 16.7006C19.7033 16.047 18.9999 15.5858 18.2 15.38"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className={styles.detailsTitle}>Informații Companie</h3>
                  <p className={styles.detailsSubtitle}>
                    Detalii oficiale despre E.I.S. SERVICE COMPLETE S.R.L.
                  </p>
                </div>
                <div className={styles.detailsContent}>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <strong>Sediu social:</strong>
                      <span>
                        Jud. Braşov, Municipiul Braşov, Str. Baciului nr. 4,
                        Biroul
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>CUI:</strong>
                      <span>51955681</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Nr. Registrul Comerțului:</strong>
                      <span>J2025041841001</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>EUID:</strong>
                      <span>ROONRC.J2025041841001</span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>CAEN:</strong>
                      <span>
                        4791 – Intermedieri în comerțul cu amănuntul
                        nespecializat
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Data înființării:</strong>
                      <span>12.06.2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutPage;
