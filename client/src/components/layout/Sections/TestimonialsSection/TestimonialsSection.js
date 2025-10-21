import { Star } from "lucide-react";
import styles from "./TestimonialsSection.module.css";

const TestimonialsSection = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsContainer}>
        <h2 className={styles.testimonialsTitle}>Ce spun clienții noștri</h2>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "Am găsit rapid un electrician pentru casa mea. Serviciul a fost
                excelent și prețul corect. Recomand cu încredere!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Maria Popescu</div>
                  <div className={styles.authorLocation}>București</div>
                </div>
                <div className={styles.testimonialRating}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star
                    size={16}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "Platforma EIS m-a ajutat să cresc afacerea mea. Am primit multe
                cereri de servicii și clienții sunt foarte mulțumiți."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Ion Ionescu</div>
                  <div className={styles.authorLocation}>Cluj-Napoca</div>
                </div>
                <div className={styles.testimonialRating}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "Serviciul de curățenie găsit prin EIS a fost perfect. Echipa a
                fost profesională și am fost foarte mulțumită de rezultat."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Ana Dumitrescu</div>
                  <div className={styles.authorLocation}>Timișoara</div>
                </div>
                <div className={styles.testimonialRating}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star
                    size={16}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "Am avut nevoie urgentă de un instalator și prin EIS am găsit
                rapid un profesionist competent. Totul a fost rezolvat în
                aceeași zi!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Mihai Constantinescu</div>
                  <div className={styles.authorLocation}>Constanța</div>
                </div>
                <div className={styles.testimonialRating}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "Ca prestator de servicii, EIS mi-a oferit multe oportunități de
                business. Platforma este ușor de folosit și clienții sunt de
                calitate."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Cristina Marinescu</div>
                  <div className={styles.authorLocation}>Iași</div>
                </div>
                <div className={styles.testimonialRating}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star
                    size={16}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "Serviciul de zugrăvit găsit prin EIS a depășit așteptările
                mele. Calitatea lucrării și profesionalismul echipei au fost
                remarcabile."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Alexandru Radu</div>
                  <div className={styles.authorLocation}>Brașov</div>
                </div>
                <div className={styles.testimonialRating}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
