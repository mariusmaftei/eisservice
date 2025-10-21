export const getPrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = {
      title: "Politica de Confidențialitate - E.I.S. Service",
      lastUpdated: "2024-01-15",
      content: {
        introduction:
          "Această politică de confidențialitate descrie modul în care E.I.S. SERVICE COMPLETE S.R.L. colectează, utilizează și protejează informațiile dumneavoastră personale.",
        dataCollection:
          "Colectăm următoarele tipuri de date: nume, prenume, adresa de email, numărul de telefon, localitatea și detaliile serviciilor solicitate.",
        dataUsage:
          "Utilizăm datele dumneavoastră pentru a vă pune în legătură cu prestatori de servicii calificați și pentru a îmbunătăți serviciile noastre.",
        dataProtection:
          "Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja datele dumneavoastră împotriva accesului neautorizat.",
        userRights:
          "Aveți dreptul să accesați, să rectificați, să ștergeți sau să restricționați prelucrarea datelor dumneavoastră personale.",
        contact:
          "Pentru întrebări despre această politică, ne puteți contacta la contact@eisservice.ro",
      },
    };

    res.status(200).json({
      success: true,
      data: privacyPolicy,
    });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res.status(500).json({
      success: false,
      message:
        "A apărut o eroare la încărcarea politicii de confidențialitate.",
    });
  }
};

export const getTermsOfService = async (req, res) => {
  try {
    const termsOfService = {
      title: "Termeni și Condiții - E.I.S. Service",
      lastUpdated: "2024-01-15",
      content: {
        introduction:
          "Prin utilizarea platformei E.I.S. Service, acceptați acești termeni și condiții.",
        serviceDescription:
          "E.I.S. Service este o platformă de intermediere între clienți și prestatori de servicii.",
        userObligations:
          "Utilizatorii se angajează să furnizeze informații corecte și să respecte legile în vigoare.",
        liability:
          "E.I.S. Service nu este responsabilă pentru calitatea serviciilor prestate de terți.",
        termination:
          "Ne rezervăm dreptul de a suspenda sau închide conturile care încalcă acești termeni.",
      },
    };

    res.status(200).json({
      success: true,
      data: termsOfService,
    });
  } catch (error) {
    console.error("Error fetching terms of service:", error);
    res.status(500).json({
      success: false,
      message: "A apărut o eroare la încărcarea termenilor și condițiilor.",
    });
  }
};

export const recordConsent = async (req, res) => {
  try {
    const {
      email,
      dataProcessingConsent,
      privacyPolicyAccepted,
      marketingConsent,
      timestamp,
    } = req.body;

    // Validate required consent
    if (!dataProcessingConsent || !privacyPolicyAccepted) {
      return res.status(400).json({
        success: false,
        message: "Consent required to process data.",
      });
    }

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to record consent.",
      });
    }

    // In a real application, you would save this to a database
    const consentRecord = {
      email,
      dataProcessingConsent,
      privacyPolicyAccepted,
      marketingConsent: marketingConsent || false,
      timestamp: timestamp || new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
    };

    // Log consent for audit purposes
    console.log("Consent recorded:", consentRecord);

    res.status(200).json({
      success: true,
      message: "Consimțământul a fost înregistrat cu succes.",
      data: {
        consentId: `consent_${Date.now()}`,
        timestamp: consentRecord.timestamp,
      },
    });
  } catch (error) {
    console.error("Error recording consent:", error);
    res.status(500).json({
      success: false,
      message: "A apărut o eroare la înregistrarea consimțământului.",
    });
  }
};
