import { Paintbrush } from "lucide-react";

import ElectricianImage from "../assets/images/category-images/electrician-image.webp";
import MechanicAutoImage from "../assets/images/category-images/car-mechanic-image.webp";
import PlumberImage from "../assets/images/category-images/plumber-image.webp";
import HouseCleanerImage from "../assets/images/category-images/cleaning-image.webp";
import PainterImage from "../assets/images/category-images/painter-image.webp";
import GardenerImage from "../assets/images/category-images/gardener-image.webp";
import FurnitureImage from "../assets/images/category-images/furniture-image.webp";
import ApplianceRepairs from "../assets/images/category-images/appliance-repairs-image.webp";
import TransportImage from "../assets/images/category-images/transport-image.webp";
import HardwareRepair from "../assets/images/category-images/hardware-repair.webp";
import beautySalonImage from "../assets/images/category-images/beauty-salon-Image.webp";
import ManicureImage from "../assets/images/category-images/manicure-image.webp";
import ConditioningAirImage from "../assets/images/category-images/conditioning-air-image.webp";
import FaienceImage from "../assets/images/category-images/faience-image.webp";
import SolarPanelImage from "../assets/images/category-images/solar-panel-image.webp";
import WorkersImage from "../assets/images/category-images/worker-image.webp";
import OtherJobs from "../assets/images/category-images/other-jobs-image.webp";
import BrickLayerImage from "../assets/images/category-images/bricklayer-image.webp";

export const allCategories = [
  {
    id: 1,
    name: "Electrician",
    icon: "⚡",
    description: "Reparații și instalații electrice",
    count: 48,
    backgroundImage: ElectricianImage,
  },
  {
    id: 2,
    name: "Mecanic Auto",
    icon: "🔧",
    description: "Reparații și întreținere auto",
    count: 36,
    backgroundImage: MechanicAutoImage,
  },
  {
    id: 3,
    name: "Instalator",
    icon: "🚿",
    description: "Servicii și reparații de instalații",
    count: 52,
    backgroundImage: PlumberImage,
  },
  {
    id: 4,

    name: "Personal Necalificat",
    icon: "🧰",
    description: "Ajutor general, șantier, cărat, etc.",
    count: 26,
    backgroundImage: WorkersImage,
  },
  {
    id: 5,
    name: "Curățenie",
    icon: "🧹",
    description: "Curățenie pentru case și birouri",
    count: 64,
    backgroundImage: HouseCleanerImage,
  },
  {
    id: 6,
    name: "Zugrav",
    icon: <Paintbrush size={24} />,
    description: "Zugrăveli interioare și exterioare",
    count: 31,
    backgroundImage: PainterImage,
  },
  {
    id: 7,
    name: "Grădinar",
    icon: "🌿",
    description: "Îngrijire și amenajare spații verzi",
    count: 18,
    backgroundImage: GardenerImage,
  },
  {
    id: 8,
    name: "Montaj Mobilă",
    icon: "🪑",
    description: "Asamblare și montaj mobilier",
    count: 23,
    backgroundImage: FurnitureImage,
  },
  {
    id: 9,
    name: "Reparații Electrocasnice",
    icon: "📺",
    description: "Reparații pentru electrocasnice",
    count: 19,
    backgroundImage: ApplianceRepairs,
  },
  {
    id: 10,
    name: "Transport",
    icon: "🚚",
    description: "Servicii de transport",
    count: 40,
    backgroundImage: TransportImage,
  },
  {
    id: 11,
    name: "Reparații hardware",
    icon: "💻",
    description: "Diagnoză și reparații hardware",
    count: 12,
    backgroundImage: HardwareRepair,
  },
  {
    id: 12,
    name: "Frizer",
    icon: "💈",
    description: "Tunsori și îngrijire păr",

    count: 28,
    backgroundImage: beautySalonImage,
  },
  {
    id: 13,
    name: "Manichiură",
    icon: "💅",
    description: "Servicii de manichiură și pedichiură",
    count: 22,
    backgroundImage: ManicureImage,
  },
  {
    id: 14,
    name: "Aer Conditionat",
    icon: "❄️",
    description: "Montaj și întreținere AC",
    count: 17,
    backgroundImage: ConditioningAirImage,
  },
  // {
  //   id: 15,
  //   name: "Servicii Electricasnice",
  //   icon: "🔌",
  //   description: "Instalări și reparații diverse aparate",
  //   count: 15,
  //   backgroundImage: "./sd.jpg",
  // },
  {
    id: 16,
    name: "Montaj gresie si faianta",
    icon: "🧱",
    description: "Montaj gresie, faianță, plăci ceramice",
    count: 20,
    backgroundImage: FaienceImage,
  },
  {
    id: 17,
    name: "Montaj panouri solare",
    icon: "☀️",
    description: "Instalare sisteme solare",
    count: 10,
    backgroundImage: SolarPanelImage,
  },
  // {
  //   id: 18,
  //   name: "Transport / Mutări",
  //   icon: "📦",
  //   description: "Mutări locuințe și transport marfă",
  //   count: 34,
  //   backgroundImage: DefaultImage,
  // },
  {
    id: 19,
    name: "Zidar",
    icon: "🧱",
    description: "Lucrări de zidărie și construcții",
    count: 27,
    backgroundImage: BrickLayerImage,
  },
  {
    id: 20,
    name: "Alte Servicii",
    icon: "🛠️",
    description: "Servicii diverse",
    count: 11,
    backgroundImage: OtherJobs,
  },
];
