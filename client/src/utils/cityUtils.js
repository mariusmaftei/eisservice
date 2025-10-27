/**
 * Utility functions for city and location handling
 */

// Map of Romanian counties to their city slugs for URLs
const countyToCitySlugMap = {
  Alba: "alba-iulia",
  Arad: "arad",
  Argeș: "pitetsti",
  Bacău: "bacau",
  Bihor: "oradea",
  "Bistrița-Năsăud": "bistrita",
  Botoșani: "botosani",
  Brăila: "braila",
  Brașov: "brasov",
  București: "bucuresti",
  Buzău: "buzau",
  "Caraș-Severin": "resita",
  Călărași: "calarasi",
  Cluj: "cluj-napoca",
  Constanța: "constanta",
  Covasna: "sfantu-gheorghe",
  Dâmbovița: "targoviste",
  Dolj: "craiova",
  Galați: "galati",
  Giurgiu: "giurgiu",
  Gorj: "targu-jiu",
  Harghita: "miercurea-ciuc",
  Hunedoara: "deva",
  Ialomița: "slobozia",
  Iași: "iasi",
  Ilfov: "voluntari",
  Maramureș: "baia-mare",
  Mehedinți: "drobeta-turnu-severin",
  Mureș: "targu-mures",
  Neamț: "piatra-neamt",
  Olt: "slatina",
  Prahova: "ploiesti",
  Sălaj: "zalau",
  "Satu Mare": "satu-mare",
  Sibiu: "sibiu",
  Suceava: "suceava",
  Teleorman: "alexandria",
  Timiș: "timisoara",
  Tulcea: "tulcea",
  Vâlcea: "rmicu-valcea",
  Vaslui: "vaslui",
  Vrancea: "focsani",
};

/**
 * Convert Romanian county name to URL-friendly city slug
 * @param {string} county - The Romanian county name (e.g., "Brașov")
 * @returns {string} - URL-friendly city slug (e.g., "brasov")
 */
export const countyToCitySlug = (county) => {
  if (!county) return "";

  // Check if we have a direct mapping
  if (countyToCitySlugMap[county]) {
    return countyToCitySlugMap[county];
  }

  // Fallback: convert to slug format
  return county
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i");
};

/**
 * Get the county name from a city slug (reverse lookup)
 * @param {string} citySlug - The city slug (e.g., "brasov")
 * @returns {string|null} - The county name or null if not found
 */
export const citySlugToCounty = (citySlug) => {
  if (!citySlug) return null;

  const slug = citySlug.toLowerCase();

  // Reverse lookup in the map
  for (const [county, slugValue] of Object.entries(countyToCitySlugMap)) {
    if (slugValue === slug) {
      return county;
    }
  }

  return null;
};
