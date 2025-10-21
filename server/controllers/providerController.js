import { providerTransporter } from "../config/transporter.js";

export const sendProviderEmail = async (req, res) => {
  try {
    const {
      nume,
      prenume,
      localitate,
      telefon,
      email,
      serviciiOferite,
      descriereExperienta,
      disponibilitate,
      gdprConsent,
    } = req.body;

    // Validation
    if (
      !nume ||
      !prenume ||
      !localitate ||
      !telefon ||
      !email ||
      !serviciiOferite ||
      !descriereExperienta ||
      !disponibilitate
    ) {
      return res.status(400).json({
        success: false,
        message: "Toate câmpurile sunt obligatorii",
      });
    }

    // GDPR Consent validation
    if (
      !gdprConsent ||
      !gdprConsent.dataProcessingConsent ||
      !gdprConsent.privacyPolicyAccepted
    ) {
      return res.status(400).json({
        success: false,
        message: "Consent required to process data.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Adresa de email nu este validă",
      });
    }

    // Phone validation (Romanian format)
    const phoneRegex = /^(\+40|0040|0)[0-9]{9}$/;
    if (!phoneRegex.test(telefon.replace(/\s/g, ""))) {
      return res.status(400).json({
        success: false,
        message: "Numărul de telefon nu este valid",
      });
    }

    // Services validation (should be an array)
    if (!Array.isArray(serviciiOferite) || serviciiOferite.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vă rugăm să selectați cel puțin un serviciu",
      });
    }

    // Email content for admin notification
    const adminEmailContent = `
      <h2>Nouă înregistrare prestator - E.I.S. Service</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h3>Detalii prestator:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Nume complet:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${nume} ${prenume}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefon:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${telefon}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Localitate:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${localitate}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Servicii oferite:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
              <ul style="margin: 0; padding-left: 20px;">
                ${serviciiOferite
                  .map((serviciu) => `<li>${serviciu}</li>`)
                  .join("")}
              </ul>
            </td>
          </tr>
        </table>
        
        <h3>Experiența și calificările:</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0056b3; margin-bottom: 20px;">
          ${descriereExperienta.replace(/\n/g, "<br>")}
        </div>
        
        <h3>Disponibilitate:</h3>
        <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #00a0e9; margin-bottom: 20px;">
          ${disponibilitate.replace(/\n/g, "<br>")}
        </div>
        
        <h3>Consimțământ GDPR:</h3>
        <div style="background-color: #e6f0ff; padding: 15px; border-left: 4px solid #0056b3; margin-bottom: 20px;">
          <p><strong>Prelucrare date:</strong> ${
            gdprConsent.dataProcessingConsent ? "Acceptat" : "Refuzat"
          }</p>
          <p><strong>Politica de confidențialitate:</strong> ${
            gdprConsent.privacyPolicyAccepted ? "Acceptată" : "Refuzată"
          }</p>
          <p><strong>Marketing:</strong> ${
            gdprConsent.marketingConsent ? "Acceptat" : "Refuzat"
          }</p>
          <p><strong>Timestamp:</strong> ${gdprConsent.timestamp}</p>
        </div>
        
        <p style="color: #666; font-size: 12px;">
          Această înregistrare a fost trimisă prin formularul de pe site-ul eisservice.ro la data de ${new Date().toLocaleString(
            "ro-RO"
          )}.
        </p>
      </div>
    `;

    // Email content for provider confirmation
    const providerEmailContent = `
      <h2>Confirmarea înregistrării dumneavoastră - E.I.S. Service</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>Stimate/Stimată ${nume} ${prenume},</p>
        
        <p>Vă mulțumim pentru interesul manifestat în a deveni prestator în rețeaua E.I.S. Service!</p>
        
        <p>Am primit cererea dumneavoastră de înregistrare cu următoarele detalii:</p>
        
        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0056b3; margin-top: 0;">Serviciile pe care doriți să le prestați:</h3>
          <ul style="color: #333;">
            ${serviciiOferite
              .map((serviciu) => `<li>${serviciu}</li>`)
              .join("")}
          </ul>
          <p><strong>Zona de activitate:</strong> ${localitate}</p>
        </div>
        
        <p>Echipa noastră va analiza cererea dumneavoastră și vă va contacta în cel mai scurt timp posibil pentru următorii pași ai procesului de înregistrare.</p>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <h4 style="color: #856404; margin-top: 0;">Următorii pași:</h4>
          <ol style="color: #856404; margin-bottom: 0;">
            <li>Verificarea documentelor și calificărilor</li>
            <li>Interviu telefonic sau video</li>
            <li>Activarea contului în platformă</li>
            <li>Instruire pentru utilizarea sistemului</li>
          </ol>
        </div>
        
        <p>Pentru întrebări suplimentare, ne puteți contacta:</p>
        <ul>
          <li>Email: contact@eisservice.ro</li>
          <li>Telefon:  0735 520 990</li>
        </ul>
        
        <p>Cu stimă,<br>
        <strong>Echipa E.I.S. Service</strong></p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          Acest email a fost generat automat la data de ${new Date().toLocaleString(
            "ro-RO"
          )}.
        </p>
      </div>
    `;

    // Send email to admin
    await providerTransporter.sendMail({
      from: process.env.PROVIDER_EMAIL,
      to: process.env.ADMIN_EMAIL || process.env.PROVIDER_EMAIL,
      subject: `Nouă înregistrare prestator: ${serviciiOferite.join(
        ", "
      )} - ${nume} ${prenume}`,
      html: adminEmailContent,
    });

    // Send confirmation email to provider
    await providerTransporter.sendMail({
      from: `E.I.S. Service ${process.env.PROVIDER_EMAIL}`,
      to: email,
      subject: "Confirmarea înregistrării dumneavoastră - E.I.S. Service",
      html: providerEmailContent,
    });

    res.status(200).json({
      success: true,
      message:
        "Înregistrarea a fost trimisă cu succes! Veți fi contactat în curând pentru următorii pași.",
    });
  } catch (error) {
    console.error("Error sending provider email:", error);
    res.status(500).json({
      success: false,
      message:
        "A apărut o eroare la trimiterea înregistrării. Vă rugăm să încercați din nou.",
    });
  }
};
