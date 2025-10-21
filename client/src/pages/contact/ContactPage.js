import styles from "./ContactPage.module.css";
import { Mail, Phone, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const email = "contact@eisservice.ro";
  const phone = "0735 520 990";
  const whatsappLink = `https://wa.me/+40735520990`;
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.0000000000005!2d25.589999999999997!3d45.642000000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b7e0d0d0d0d%3A0x0d0d0d0d0d0d0d0d!2sStrada%20Baciului%204%2C%20Bra%C8%99ov%20500000!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro"; // Exemplu pentru Strada Baciului nr. 4, Brașov

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Contactează-ne</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Informații de Contact</h2>
          <p className={styles.paragraph}>
            Suntem aici pentru a te ajuta! Ne poți contacta prin email, telefon
            sau WhatsApp.
          </p>
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <Mail size={24} className={styles.contactIcon} />
              <a href={`mailto:${email}`} className={styles.contactLink}>
                {email}
              </a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={24} className={styles.contactIcon} />
              <a href={`tel:${phone}`} className={styles.contactLink}>
                {phone}
              </a>
            </div>
            <div className={styles.contactItem}>
              <MessageCircle size={24} className={styles.contactIcon} />
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                Trimite mesaj pe WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Locația Noastră</h2>
          <p className={styles.paragraph}>
            Ne găsești la sediul nostru din Brașov. Vezi harta de mai jos pentru
            indicații.
          </p>
          <div className={styles.mapContainer}>
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locația E.I.S. Service Complete S.R.L."
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
