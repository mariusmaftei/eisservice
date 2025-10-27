import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config({ debug: false });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/eisservice";

const electricianPosts = [
  {
    categoryInformation: {
      slug: "electrician",
      name: "electrician",
      displayName: "Electrician Brașov",
      shortDescription:
        "Electricieni autorizați pentru instalații electrice și reparații în Brașov",
      description: "Servicii profesionale de electricitate în Brașov",
      providerCount: 0,
      isActive: true,
    },
    pageMainTitle: {
      pageTitle: "Electrician Brașov",
      pageSubtitle: "Servicii Profesionale de Electricitate",
    },
    professionalContent: {
      title: "Electrician Brașov – Servicii Profesionale de Electricitate",
      paragraphs: [
        "Cauți un electrician autorizat în Brașov? Echipa noastră oferă servicii complete de electricitate pentru locuințe și spații comerciale.",
        "Lucrăm cu echipamente moderne și respectăm toate normele de siguranță pentru a-ți oferi servicii de calitate.",
        "Oferim consultanță gratuită și garanție pentru toate lucrările efectuate.",
      ],
    },
    whyChooseUs: {
      title: "De ce să alegi un electrician Brașov din platforma noastră",
      paragraphs: [
        "Electricienii noștri sunt autorizați și cu experiență în domeniu, oferind servicii sigure și conforme cu normele în vigoare.",
        "Oferim garanție pentru toate lucrările efectuate și folosim doar materiale de calitate superioară.",
        "Intervenim rapid în caz de urgențe și oferim consultanță gratuită pentru proiectele tale.",
      ],
    },
    aboutUs: {
      title: "Despre Noi",
      description:
        "Suntem o echipă de electricieni profesioniști cu experiență în domeniul serviciilor electrice din Brașov.",
    },
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
      {
        title: "Urgențe electrice",
        description:
          "Intervenim rapid în caz de probleme electrice urgente, 24/7, pentru a-ți asigura siguranța.",
      },
    ],
    prestatoriValabili: "Brașov",
    city: "brasov",
    seoMetadata: {
      title: "Electrician Brașov – Servicii Profesionale de Electricitate",
      description:
        "Electricieni autorizați în Brașov pentru instalații electrice și reparații. Intervenim rapid, cu garanție și consultanță gratuită.",
      keywords: [
        "electrician brasov",
        "instalatii electrice",
        "reparatii electrice",
        "electrician autorizat",
        "servicii electrice brasov",
      ],
      ogTitle: "Electrician Brașov – Servicii Profesionale",
      ogDescription:
        "Servicii complete de electricitate în Brașov. Electricieni autorizați cu experiență.",
      twitterTitle: "Electrician Brașov",
      twitterDescription: "Servicii profesionale de electricitate în Brașov.",
      canonicalUrl: "https://eisservice.ro/servicii/electrician/brasov",
    },
  },
  {
    categoryInformation: {
      slug: "electrician",
      name: "electrician",
      displayName: "Electrician București",
      shortDescription:
        "Electricieni autorizați pentru instalații electrice și reparații în București",
      description: "Servicii profesionale de electricitate în București",
      providerCount: 0,
      isActive: true,
    },
    pageMainTitle: {
      pageTitle: "Electrician București",
      pageSubtitle: "Servicii Profesionale de Electricitate",
    },
    professionalContent: {
      title: "Electrician București – Servicii Profesionale de Electricitate",
      paragraphs: [
        "Cauți un electrician autorizat în București? Echipa noastră oferă servicii complete de electricitate pentru locuințe și spații comerciale.",
        "Lucrăm cu echipamente moderne și respectăm toate normele de siguranță pentru a-ți oferi servicii de calitate.",
        "Oferim consultanță gratuită și garanție pentru toate lucrările efectuate.",
      ],
    },
    whyChooseUs: {
      title: "De ce să alegi un electrician București din platforma noastră",
      paragraphs: [
        "Electricienii noștri sunt autorizați și cu experiență în domeniu, oferind servicii sigure și conforme cu normele în vigoare.",
        "Oferim garanție pentru toate lucrările efectuate și folosim doar materiale de calitate superioară.",
        "Intervenim rapid în caz de urgențe și oferim consultanță gratuită pentru proiectele tale.",
      ],
    },
    aboutUs: {
      title: "Despre Noi",
      description:
        "Suntem o echipă de electricieni profesioniști cu experiență în domeniul serviciilor electrice din București.",
    },
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
      {
        title: "Urgențe electrice",
        description:
          "Intervenim rapid în caz de probleme electrice urgente, 24/7, pentru a-ți asigura siguranța.",
      },
    ],
    prestatoriValabili: "București",
    city: "bucuresti",
    seoMetadata: {
      title: "Electrician București – Servicii Profesionale de Electricitate",
      description:
        "Electricieni autorizați în București pentru instalații electrice și reparații. Intervenim rapid, cu garanție și consultanță gratuită.",
      keywords: [
        "electrician bucuresti",
        "instalatii electrice",
        "reparatii electrice",
        "electrician autorizat",
        "servicii electrice bucuresti",
      ],
      ogTitle: "Electrician București – Servicii Profesionale",
      ogDescription:
        "Servicii complete de electricitate în București. Electricieni autorizați cu experiență.",
      twitterTitle: "Electrician București",
      twitterDescription:
        "Servicii profesionale de electricitate în București.",
      canonicalUrl: "https://eisservice.ro/servicii/electrician/bucuresti",
    },
  },
];

const createElectricianPosts = async () => {
  try {
    console.log("Starting electrician posts creation...");
    console.log("MongoDB URI:", MONGODB_URI);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if electrician posts already exist
    for (const post of electricianPosts) {
      const existingPost = await Category.findOne({
        "categoryInformation.slug": "electrician",
        city: post.city,
      });

      if (existingPost) {
        console.log(
          `Electrician post for ${post.city} already exists. Skipping...`
        );
      } else {
        const result = await Category.create(post);
        console.log(`Created electrician post for ${post.city}: ${result._id}`);
      }
    }

    // Close connection
    await mongoose.connection.close();
    console.log("Electrician posts creation completed successfully");
  } catch (error) {
    console.error("Error creating electrician posts:", error);
    process.exit(1);
  }
};

// Run
console.log("Running createElectricianPosts...");
createElectricianPosts();

export default createElectricianPosts;
