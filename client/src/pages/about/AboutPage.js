import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Despre Noi</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Despre eisservice.ro</h2>
          <p className={styles.paragraph}>
            eisservice.ro este platforma ta de încredere pentru a găsi rapid și
            eficient profesioniști verificați în toată România. Misiunea noastră
            este de a conecta clienții cu specialiști calificați pentru o gamă
            largă de servicii, de la reparații casnice la proiecte complexe. Ne
            dedicăm simplificării procesului de căutare și solicitare a
            serviciilor, asigurând transparență, calitate și siguranță.
          </p>
          <p className={styles.paragraph}>
            Indiferent dacă ai nevoie de un electrician, un instalator, un
            mecanic auto sau un zugrav, eisservice.ro îți oferă acces la o rețea
            extinsă de prestatori de top, gata să răspundă nevoilor tale. Credem
            în puterea comunității și în importanța serviciilor de calitate,
            construind o punte solidă între cerere și ofertă.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Despre E.I.S. SERVICE COMPLETE S.R.L.
          </h2>
          <p className={styles.paragraph}>
            E.I.S. SERVICE COMPLETE S.R.L. este compania înregistrată care
            operează platforma eisservice.ro. Suntem o echipă dedicată, cu
            sediul în Brașov, și ne propunem să revoluționăm modul în care
            oamenii găsesc și accesează servicii profesionale în România.
          </p>
          <div className={styles.companyDetails}>
            <p>
              <strong>Sediu social:</strong> Jud. Braşov, Municipiul Braşov,
              Str. Baciului nr. 4, Biroul
            </p>
            <p>
              <strong>Cod unic de înregistrare (CUI):</strong> 51955681
            </p>
            <p>
              <strong>Nr. de ordine în Registrul Comerțului:</strong>{" "}
              J2025041841001
            </p>
            <p>
              <strong>EUID:</strong> ROONRC.J2025041841001
            </p>
            <p>
              <strong>Activitate principală (CAEN):</strong> 4791 – Intermedieri
              în comerțul cu amănuntul nespecializat
            </p>
            <p>
              <strong>Data înființării:</strong> 12.06.2025
            </p>
          </div>
          <p className={styles.paragraph}>
            Activitatea noastră principală, conform codului CAEN 4791, se
            concentrează pe intermedierea în comerțul cu amănuntul
            nespecializat, ceea ce reflectă rolul nostru de a facilita conexiuni
            între clienți și prestatori de servicii. Ne angajăm să oferim o
            experiență sigură și eficientă pentru toți utilizatorii platformei
            noastre.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
