import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import EISLogo from "../../../assets/images/logo/eis-service-logo.webp";
import { contactInfo } from "../../../config/contactInfo";

import ANPCImage1 from "../../../assets/images/anpc-images/anpc-solutionarea-alternativa-litigiilor-a.png";
import ANPCImage2 from "../../../assets/images/anpc-images/anpc-solutionarea-alternativa-litigiilor-b.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container mx-auto ${styles.container}`}>
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>
              <div className={styles.logoContainer}>
                <img
                  src={EISLogo}
                  alt="E.I.S. Logo"
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.logoText}>E.I.S. Service </span>
            </div>
            <p className={styles.description}>
              Găsește cei mai buni prestatori de servicii din zona ta. Servicii
              de calitate de la profesioniști verificați.
            </p>
            <div className={styles.socialLinks}>
              {/* Facebook */}
              <a
                href={contactInfo.facebookPage}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Youtube*/}
              <a
                href={contactInfo.youtubePage}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className={styles.socialIcon}
                  width="260px"
                  height="200px"
                  viewBox="0 0 260 180"
                >
                  <path
                    d="M220,2H40C19.01,2,2,19.01,2,40v100c0,20.99,17.01,38,38,38h180c20.99,0,38-17.01,38-38V40C258,19.01,240.99,2,220,2zM102,130V50l68,40L102,130z"
                    fill="white"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={contactInfo.instagramPage}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={contactInfo.tikTokPage}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />{" "}
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={contactInfo.whatsUpNumber}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  width="50px"
                  height="50px"
                >
                  <path
                    d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017
		c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382
		c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076
		c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427
		c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437
		c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536
		c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609
		c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611
		c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787
		c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739
		C23.307,19.268,23.307,18.533,23.214,18.38z"
                  />{" "}
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Link-uri rapide</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Acasă
                </Link>
              </li>
              <li>
                <Link href="/solicita-serviciu" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Solicită un specialist
                </Link>
              </li>
              <li>
                <Link href="/devino-prestator" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Înscrie-te ca specialist
                </Link>
              </li>
              <li>
                <Link href="/despre" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Despre noi
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Servicii</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="/" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Electrician
                </a>
              </li>
              <li>
                <a href="/" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Instalator
                </a>
              </li>
              <li>
                <a href="/" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Mecanic auto
                </a>
              </li>
              <li>
                <a href="/" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Tâmplar
                </a>
              </li>
              <li>
                <a href="/" className={styles.link}>
                  <svg
                    className={styles.linkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Curățenie
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Contactează-ne</h4>
            <address className="not-italic">
              <p className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {contactInfo.contactAddress}
              </p>
              <p className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {contactInfo.contactEmail}
              </p>
              <p className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {contactInfo.phone}
              </p>
            </address>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} E.I.S. Toate drepturile rezervate.
          </p>
          <div className={styles.consumerRights}>
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.consumerRightsLink}
            >
              <img
                src={ANPCImage1}
                alt="Soluționarea online a litigiilor"
                className={styles.consumerRightsImage}
              />
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.consumerRightsLink}
            >
              <img
                src={ANPCImage2}
                alt="ANPC - Soluționarea alternativă a litigiilor"
                className={styles.consumerRightsImage}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
