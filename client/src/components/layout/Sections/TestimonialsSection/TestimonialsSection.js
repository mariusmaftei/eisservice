import { Star } from "lucide-react";
import styles from "./TestimonialsSection.module.css";

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Am găsit rapid un electrician pentru casa mea. Serviciul a fost excelent și prețul corect. Recomand cu încredere!",
      author: "Maria Popescu",
      location: "București",
      rating: 4,
    },
    {
      text: "Platforma EIS m-a ajutat să cresc afacerea mea. Am primit multe cereri de servicii și clienții sunt foarte mulțumiți.",
      author: "Ion Ionescu",
      location: "Cluj-Napoca",
      rating: 5,
    },
    {
      text: "Serviciul de curățenie găsit prin EIS a fost perfect. Echipa a fost profesională și am fost foarte mulțumită de rezultat.",
      author: "Ana Dumitrescu",
      location: "Timișoara",
      rating: 4,
    },
    {
      text: "Am avut nevoie urgentă de un instalator și prin EIS am găsit rapid un profesionist competent. Totul a fost rezolvat în aceeași zi!",
      author: "Mihai Constantinescu",
      location: "Constanța",
      rating: 5,
    },
    {
      text: "Ca prestator de servicii, EIS mi-a oferit multe oportunități de business. Platforma este ușor de folosit și clienții sunt de calitate.",
      author: "Cristina Marinescu",
      location: "Iași",
      rating: 4,
    },
    {
      text: "Serviciul de zugrăvit găsit prin EIS a depășit așteptările mele. Calitatea lucrării și profesionalismul echipei au fost remarcabile.",
      author: "Alexandru Radu",
      location: "Brașov",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
      />
    ));
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsContainer}>
        <h2 className={styles.testimonialsTitle}>Ce spun clienții noștri</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>
                      {testimonial.author}
                    </div>
                    <div className={styles.authorLocation}>
                      {testimonial.location}
                    </div>
                  </div>
                  <div className={styles.testimonialRating}>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
