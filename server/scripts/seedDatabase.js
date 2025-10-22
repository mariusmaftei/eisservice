import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/eisservice";

const sampleCategories = [
  {
    slug: "zugrav-brasov",
    name: "zugrav",
    displayName: "Zugrav Brașov",
    description: "Servicii profesionale de zugrăvit și vopsitorie în Brașov",
    shortDescription:
      "Zugravi profesioniști pentru vopsitorie interioară și exterioară",
    image:
      "/assets/images/category-images/Zugrav Brașov – Servicii Profesionale.png",
    workingImage:
      "/assets/images/category-images/Zugrav Brașov vopsind un perete alb într-un apartament modern.png",
    services: [
      {
        title: "Zugrăvit pereți și tavane",
        description:
          "Aplicații de vopsea lavabilă mată sau satinată, culori uniforme, fără urme sau diferențe de nuanță. Lucrăm cu vopsele premium pentru rezultate durabile și un aspect modern.",
      },
      {
        title: "Reparații și pregătire pereți",
        description:
          "Decapare, gletuire, șlefuire și amorsare profesională înainte de zugrăvit, pentru o aderență perfectă. Verificăm planeitatea și integritatea suprafeței pentru a preveni fisurile.",
      },
      {
        title: "Zugrăveli decorative",
        description:
          "Realizăm efecte decorative moderne (stucco, sablat, beton aparent, vopsea texturată, tapet decorativ) pentru un design unic și elegant.",
      },
      {
        title: "Vopsitorie uși, tâmplărie și elemente din lemn",
        description:
          "Folosim lacuri și vopsele ecologice, rezistente la zgârieturi și umezeală, pentru uși, tocuri, scări și mobilier din lemn masiv.",
      },
      {
        title: "Zugrăvit fațade și spații exterioare",
        description:
          "Aplicații rezistente la intemperii, protejând clădirea de umezeală, raze UV și variații de temperatură.",
      },
      {
        title: "Finisaje premium pentru spații comerciale",
        description:
          "Zugrăvim birouri, restaurante, hoteluri și magazine, respectând cerințele de design și termenele stricte.",
      },
    ],
    whyChooseUs: {
      title: "De ce să alegi un zugrav Brașov din platforma noastră",
      paragraphs: [
        "Colaborând cu un zugrav Brașov din platforma noastră, beneficiezi de siguranța unei lucrări executate corect, la timp și la preț corect. Toți zugravii înscriși sunt profesioniști verificați, cu experiență reală și recomandări de la clienți anteriori.",
        "Platforma noastră îți oferă transparență și confort pe tot parcursul proiectului. Poți solicita oferte rapid, comunica direct cu zugravul și urmări progresul lucrării, astfel încât renovarea sau vopsirea locuinței tale să fie fără stres și cu rezultate impecabile.",
        "Alegând platforma noastră, economisești timp și eviți riscul de a colabora cu persoane necalificate. Fiecare zugrav are un profil complet, cu poze din lucrări, prețuri orientative și recenzii de la clienți reali din Brașov.",
      ],
    },
    professionalContent: {
      title:
        "Zugrav Brașov – Servicii Profesionale de Vopsitorie, Finisaje Interioare și Renovări Complete",
      paragraphs: [
        "Cauți un zugrav Brasov profesionist care să îți transforme casa, biroul sau apartamentul? Echipa noastră de zugravi autorizați oferă servicii complete de vopsitorie și finisaje interioare, cu atenție la detalii, respectarea termenelor și rezultate impecabile.",
        "Indiferent dacă dorești o simplă reîmprospătare a culorilor sau o renovare completă, zugravii noștri folosesc materiale de calitate superioară și tehnici moderne pentru o aplicare uniformă, curată și durabilă. Ne ocupăm de tot procesul – de la pregătirea pereților până la aplicarea finală a vopselei – astfel încât spațiul tău să arate perfect, fără stres sau mizerie.",
        "Înainte de începerea lucrării, oferim consultanță gratuită pentru alegerea culorilor, tipului de vopsea și finisajului potrivit fiecărei camere. Lucrăm curat, protejăm mobilierul și pardoseala, iar la final curățăm totul, lăsând locuința impecabilă.",
      ],
    },
    seo: {
      title: "Zugrav Brașov – Servicii Profesionale de Vopsitorie",
      description:
        "Acasa / Zugrav Brașov - Servicii Profesionale de Vopsitorie",
      keywords: [
        "zugrav brasov",
        "vopsitorie brasov",
        "servicii zugrav",
        "renovare brasov",
        "finisaje interioare",
      ],
    },
  },
  {
    slug: "electrician-brasov",
    name: "electrician",
    displayName: "Electrician Brașov",
    description: "Servicii profesionale de electricitate în Brașov",
    shortDescription:
      "Electricieni autorizați pentru instalații electrice și reparații",
    image: "/assets/images/category-images/electrician-image.webp",
    workingImage: "/assets/images/illustration/electrician-image.webp",
    services: [
      {
        title: "Instalații electrice noi",
        description:
          "Instalăm instalații electrice complete pentru case noi, apartamente și spații comerciale, respectând normele de siguranță.",
      },
      {
        title: "Reparații și mentenanță",
        description:
          "Reparăm defecte electrice, înlocuim prize, întrerupătoare și rezolvăm probleme de siguranță.",
      },
      {
        title: "Instalare aparate electrice",
        description:
          "Instalăm și conectăm aparate electrice, sisteme de iluminat și automatizări casnice.",
      },
    ],
    whyChooseUs: {
      title: "De ce să alegi un electrician Brașov din platforma noastră",
      paragraphs: [
        "Electricienii noștri sunt autorizați și cu experiență în domeniu, oferind servicii sigure și conforme cu normele în vigoare.",
        "Oferim garanție pentru toate lucrările efectuate și folosim doar materiale de calitate superioară.",
        "Intervenim rapid în caz de urgențe și oferim consultanță gratuită pentru proiectele tale.",
      ],
    },
    professionalContent: {
      title: "Electrician Brașov – Servicii Profesionale de Electricitate",
      paragraphs: [
        "Cauți un electrician autorizat în Brașov? Echipa noastră oferă servicii complete de electricitate pentru locuințe și spații comerciale.",
        "Lucrăm cu echipamente moderne și respectăm toate normele de siguranță pentru a-ți oferi servicii de calitate.",
        "Oferim consultanță gratuită și garanție pentru toate lucrările efectuate.",
      ],
    },
    seo: {
      title: "Electrician Brașov – Servicii Profesionale de Electricitate",
      description:
        "Electricieni autorizați în Brașov pentru instalații electrice și reparații",
      keywords: [
        "electrician brasov",
        "instalatii electrice",
        "reparatii electrice",
        "electrician autorizat",
      ],
    },
  },
];

const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    console.log("MongoDB URI:", MONGODB_URI);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Insert sample categories
    const result = await Category.insertMany(sampleCategories);
    console.log(`Seeded database with ${result.length} sample categories`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run seeding
console.log("Running seedDatabase...");
seedDatabase();

export default seedDatabase;
