import { useState, useEffect } from "react";
import styles from "./PrivacyPolicyPage.module.css";
import {
  Shield,
  Mail,
  Database,
  Users,
  Eye,
  FileText,
  Clock,
  Phone,
} from "lucide-react";
import { contactInfo } from "../../config/contactInfo";

const PrivacyPolicyPage = () => {
  const [lastUpdated] = useState("15 ianuarie 2024");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.privacyPage}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Shield size={48} />
          </div>
          <h1 className={styles.mainTitle}>Politica de Confidențialitate</h1>
          <p className={styles.subtitle}>
            Cum colectăm, utilizăm și protejăm informațiile dumneavoastră
            personale
          </p>
          <div className={styles.lastUpdated}>
            <Clock size={16} />
            <span>Ultima actualizare: {lastUpdated}</span>
          </div>
        </div>

        {/* Company Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FileText size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Informații despre Operator</h2>
          </div>
          <div className={styles.companyInfo}>
            <div className={styles.companyCard}>
              <h3>E.I.S. SERVICE COMPLETE S.R.L.</h3>
              <div className={styles.companyDetails}>
                <p>
                  <strong>Sediu social:</strong>
                  {contactInfo.registeredOffice}
                </p>
                <p>
                  <strong>Cod unic de înregistrare (CUI):</strong>{" "}
                  {contactInfo.CUI}
                </p>
                <p>
                  <strong>Nr. de ordine în Registrul Comerțului:</strong>{" "}
                  {contactInfo.tradeSerialNumber}
                </p>
                <p>
                  <strong>Email contact:</strong> {contactInfo.contactEmail}
                </p>
                <p>
                  <strong>Telefon:</strong> {contactInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Database size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Ce Date Colectăm</h2>
          </div>
          <div className={styles.content}>
            <p className={styles.intro}>
              Colectăm următoarele categorii de date personale în funcție de
              serviciul utilizat:
            </p>

            <div className={styles.dataCategories}>
              <div className={styles.dataCategory}>
                <h4>Pentru Clienți (Solicitare Servicii)</h4>
                <ul>
                  <li>Nume și prenume</li>
                  <li>Adresa de email</li>
                  <li>Numărul de telefon</li>
                  <li>Localitatea/județul</li>
                  <li>Descrierea serviciului dorit</li>
                  <li>Subiectul solicitării</li>
                </ul>
              </div>

              <div className={styles.dataCategory}>
                <h4>Pentru Prestatori (Înregistrare)</h4>
                <ul>
                  <li>Nume și prenume</li>
                  <li>Adresa de email</li>
                  <li>Numărul de telefon</li>
                  <li>Localitatea/județul de activitate</li>
                  <li>Serviciile oferite</li>
                  <li>Descrierea experienței și calificărilor</li>
                  <li>Disponibilitatea (program de lucru)</li>
                </ul>
              </div>
            </div>

            <div className={styles.automaticData}>
              <h4>Date Colectate Automat</h4>
              <ul>
                <li>Adresa IP</li>
                <li>Informații despre browser și dispozitiv</li>
                <li>Data și ora accesării site-ului</li>
                <li>Paginile vizitate</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Processing with Zoho */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Mail size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              Procesarea Datelor prin Zoho Email
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.zohoInfo}>
              <div className={styles.zohoCard}>
                <h4>🔒 Serviciul de Email Utilizat</h4>
                <p>
                  Utilizăm <strong>Zoho Mail</strong> pentru procesarea și
                  gestionarea comunicărilor prin email. Zoho Corporation este un
                  furnizor de servicii cloud recunoscut la nivel global, cu
                  sediul în India și birouri în SUA și Europa.
                </p>
              </div>

              <div className={styles.zohoDetails}>
                <h4>Cum sunt Procesate Datele prin Zoho:</h4>
                <ul>
                  <li>
                    <strong>Transmitere Securizată:</strong> Toate emailurile
                    sunt transmise prin conexiuni criptate (TLS/SSL)
                  </li>
                  <li>
                    <strong>Stocare:</strong> Datele sunt stocate pe serverele
                    Zoho în centre de date certificate
                  </li>
                  <li>
                    <strong>Acces Restricționat:</strong> Doar personalul
                    autorizat E.I.S. Service are acces la datele dumneavoastră
                  </li>
                  <li>
                    <strong>Backup și Redundanță:</strong> Zoho menține copii de
                    siguranță pentru continuitatea serviciului
                  </li>
                  <li>
                    <strong>Conformitate GDPR:</strong> Zoho respectă
                    reglementările GDPR și oferă garanții contractuale
                  </li>
                </ul>
              </div>

              <div className={styles.dataTransfer}>
                <h4>📍 Transferul Internațional de Date</h4>
                <p>
                  Datele dumneavoastră pot fi procesate pe servere Zoho situate
                  în afara Uniunii Europene. Acest transfer se realizează în
                  baza <strong>clauzelor contractuale standard</strong> aprobate
                  de Comisia Europeană și a{" "}
                  <strong>măsurilor de securitate suplimentare</strong>{" "}
                  implementate de Zoho.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose of Processing */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Users size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Scopurile Prelucrării</h2>
          </div>
          <div className={styles.content}>
            <div className={styles.purposes}>
              <div className={styles.purpose}>
                <h4>🎯 Prestarea Serviciilor</h4>
                <ul>
                  <li>Conectarea clienților cu prestatori potriviți</li>
                  <li>Facilitarea comunicării între părți</li>
                  <li>Gestionarea solicitărilor de servicii</li>
                  <li>Înregistrarea și verificarea prestatorilor</li>
                </ul>
                <p>
                  <strong>Temei legal:</strong> Executarea contractului /
                  Interesul legitim
                </p>
              </div>

              <div className={styles.purpose}>
                <h4>📧 Comunicare și Suport</h4>
                <ul>
                  <li>Răspunsuri la întrebări și solicitări</li>
                  <li>Confirmări și notificări</li>
                  <li>Suport tehnic și asistență</li>
                  <li>Informații despre servicii</li>
                </ul>
                <p>
                  <strong>Temei legal:</strong> Interesul legitim /
                  Consimțământul
                </p>
              </div>

              <div className={styles.purpose}>
                <h4>📊 Îmbunătățirea Serviciilor</h4>
                <ul>
                  <li>Analiză și statistici (date anonimizate)</li>
                  <li>Îmbunătățirea funcționalității platformei</li>
                  <li>Dezvoltarea de noi servicii</li>
                  <li>Optimizarea experienței utilizatorilor</li>
                </ul>
                <p>
                  <strong>Temei legal:</strong> Interesul legitim
                </p>
              </div>

              <div className={styles.purpose}>
                <h4>📢 Marketing (Opțional)</h4>
                <ul>
                  <li>Newsletter și actualizări</li>
                  <li>Oferte speciale și promoții</li>
                  <li>Informații despre servicii noi</li>
                  <li>Invitații la evenimente</li>
                </ul>
                <p>
                  <strong>Temei legal:</strong> Consimțământul (poate fi retras
                  oricând)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Eye size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Partajarea Datelor</h2>
          </div>
          <div className={styles.content}>
            <div className={styles.sharingInfo}>
              <div className={styles.sharingCard}>
                <h4>🤝 Cu Cine Partajăm Datele</h4>
                <ul>
                  <li>
                    <strong>Prestatori de Servicii:</strong> Datele clienților
                    sunt partajate cu prestatorii potriviți pentru facilitarea
                    serviciilor
                  </li>
                  <li>
                    <strong>Zoho Corporation:</strong> Pentru procesarea
                    emailurilor și comunicărilor
                  </li>
                  <li>
                    <strong>Autorități Competente:</strong> Doar în cazuri
                    prevăzute de lege
                  </li>
                </ul>
              </div>

              <div className={styles.noSelling}>
                <h4>❌ NU Vindem Datele</h4>
                <p>
                  <strong>Nu vindem, nu închiriem și nu comercializăm</strong>{" "}
                  datele dumneavoastră personale către terți în scopuri de
                  marketing sau publicitare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Clock size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Perioada de Păstrare</h2>
          </div>
          <div className={styles.content}>
            <div className={styles.retentionPeriods}>
              <div className={styles.retentionItem}>
                <h4>📋 Solicitări de Servicii</h4>
                <p>
                  Datele sunt păstrate <strong>2 ani</strong> de la ultima
                  interacțiune pentru urmărirea serviciilor și îmbunătățiri.
                </p>
              </div>

              <div className={styles.retentionItem}>
                <h4>👨‍💼 Profiluri Prestatori</h4>
                <p>
                  Datele sunt păstrate cât timp contul este activ plus{" "}
                  <strong>1 an</strong> după dezactivare pentru obligații
                  legale.
                </p>
              </div>

              <div className={styles.retentionItem}>
                <h4>📧 Comunicări Email</h4>
                <p>
                  Emailurile sunt păstrate în Zoho conform politicilor lor de
                  retenție, de obicei <strong>până la 7 ani</strong>.
                </p>
              </div>

              <div className={styles.retentionItem}>
                <h4>📊 Date Analitice</h4>
                <p>
                  Datele anonimizate pentru statistici sunt păstrate{" "}
                  <strong>indefinit</strong> pentru îmbunătățirea serviciilor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Rights */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              Drepturile Dumneavoastră GDPR
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.rights}>
              <div className={styles.right}>
                <h4>👁️ Dreptul de Acces</h4>
                <p>
                  Puteți solicita o copie a tuturor datelor personale pe care le
                  deținem despre dumneavoastră.
                </p>
              </div>

              <div className={styles.right}>
                <h4>✏️ Dreptul de Rectificare</h4>
                <p>
                  Puteți cere corectarea datelor inexacte sau completarea
                  datelor incomplete.
                </p>
              </div>

              <div className={styles.right}>
                <h4>🗑️ Dreptul la Ștergere</h4>
                <p>
                  Puteți solicita ștergerea datelor în anumite condiții
                  ("dreptul de a fi uitat").
                </p>
              </div>

              <div className={styles.right}>
                <h4>⏸️ Dreptul de Restricționare</h4>
                <p>
                  Puteți cere limitarea prelucrării datelor în anumite situații.
                </p>
              </div>

              <div className={styles.right}>
                <h4>📤 Dreptul la Portabilitate</h4>
                <p>
                  Puteți primi datele într-un format structurat pentru transfer
                  la alt operator.
                </p>
              </div>

              <div className={styles.right}>
                <h4>🚫 Dreptul de Opoziție</h4>
                <p>
                  Puteți vă opune prelucrării bazate pe interesul legitim,
                  inclusiv marketing direct.
                </p>
              </div>

              <div className={styles.right}>
                <h4>🔄 Retragerea Consimțământului</h4>
                <p>
                  Puteți retrage consimțământul oricând, fără a afecta
                  legalitatea prelucrării anterioare.
                </p>
              </div>

              <div className={styles.right}>
                <h4>⚖️ Dreptul la Plângere</h4>
                <p>
                  Puteți depune o plângere la Autoritatea Națională de
                  Supraveghere a Prelucrării Datelor cu Caracter Personal
                  (ANSPDCP).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Măsuri de Securitate</h2>
          </div>
          <div className={styles.content}>
            <div className={styles.securityMeasures}>
              <div className={styles.securityItem}>
                <h4>🔐 Criptare</h4>
                <p>
                  Toate datele sunt transmise prin conexiuni criptate HTTPS/TLS
                  și stocate în format securizat.
                </p>
              </div>

              <div className={styles.securityItem}>
                <h4>🔑 Control Acces</h4>
                <p>
                  Accesul la date este restricționat doar la personalul
                  autorizat și necesar pentru prestarea serviciilor.
                </p>
              </div>

              <div className={styles.securityItem}>
                <h4>🛡️ Monitorizare</h4>
                <p>
                  Monitorizăm constant sistemele pentru detectarea și prevenirea
                  accesului neautorizat.
                </p>
              </div>

              <div className={styles.securityItem}>
                <h4>💾 Backup</h4>
                <p>
                  Realizăm copii de siguranță regulate pentru a preveni
                  pierderea datelor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Phone size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              Contact pentru Protecția Datelor
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.contactInfo}>
              <p>
                Pentru exercitarea drepturilor dumneavoastră sau pentru
                întrebări despre această politică:
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <Mail size={20} />
                  <div>
                    <strong>Email:</strong>
                    <a href={`mailto:${contactInfo.contactEmail}`}>
                      {" "}
                      {contactInfo.contactEmail}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Phone size={20} />
                  <div>
                    <strong>Telefon:</strong>
                    <a href={`tel:${contactInfo.phoneFormatted}`}>
                      {" "}
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.responseTime}>
                <p>
                  <strong>Timp de răspuns:</strong> Ne angajăm să răspundem la
                  solicitările dumneavoastră în termen de{" "}
                  <strong>30 de zile</strong> de la primire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FileText size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Actualizări ale Politicii</h2>
          </div>
          <div className={styles.content}>
            <p>
              Această politică poate fi actualizată periodic pentru a reflecta
              modificările în practicile noastre sau în legislația aplicabilă.
              Vă vom notifica despre modificările importante prin email sau prin
              afișarea unui anunț pe site-ul nostru.
            </p>
            <p>
              Vă recomandăm să consultați periodic această pagină pentru a fi la
              curent cu cele mai recente informații despre cum vă protejăm
              datele.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Această politică de confidențialitate este în vigoare de la{" "}
            <strong>{lastUpdated}</strong> și se aplică tuturor utilizatorilor
            platformei eisservice.ro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
