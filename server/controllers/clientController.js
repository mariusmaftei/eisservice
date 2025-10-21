import { clientTransporter } from "../config/transporter.js";

export const sendClientEmail = async (req, res) => {
  try {
    const {
      nume,
      prenume,
      localitate,
      telefon,
      email,
      subiect,
      descriereServiciu,
      gdprConsent,
    } = req.body;

    // Validation
    if (
      !nume ||
      !prenume ||
      !localitate ||
      !telefon ||
      !email ||
      !subiect ||
      !descriereServiciu
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

    // Email content for admin notification
    const adminEmailContent = `
      <h2>Nouă solicitare de serviciu - E.I.S. Service</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h3>Detalii client:</h3>
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
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Subiect:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${subiect}</td>
          </tr>
        </table>
        
        <h3>Descrierea serviciului dorit:</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0056b3; margin-bottom: 20px;">
          ${descriereServiciu.replace(/\n/g, "<br>")}
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
          Această solicitare a fost trimisă prin formularul de pe site-ul eisservice.ro la data de ${new Date().toLocaleString(
            "ro-RO"
          )}.
        </p>
      </div>
    `;

    // Email content for client confirmation
    const clientEmailContent = `
      <h2>Confirmarea solicitării dumneavoastră - E.I.S. Service</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>Stimate/Stimată ${nume} ${prenume},</p>
        
        <p>Vă mulțumim pentru că ați ales serviciile noastre! Am primit solicitarea dumneavoastră și vă confirmăm următoarele detalii:</p>
        
        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0056b3; margin-top: 0;">Detaliile solicitării:</h3>
          <p><strong>Subiect:</strong> ${subiect}</p>
          <p><strong>Localitate:</strong> ${localitate}</p>
          <p><strong>Descrierea serviciului:</strong></p>
          <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 10px;">
            ${descriereServiciu.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <p>Echipa noastră va analiza solicitarea dumneavoastră și vă va contacta în cel mai scurt timp posibil pentru a vă pune în legătură cu specialiștii potriviți din zona dumneavoastră.</p>
        
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
    await clientTransporter.sendMail({
      from: process.env.CLIENT_EMAIL,
      to: process.env.ADMIN_EMAIL || process.env.CLIENT_EMAIL,
      subject: `Nouă solicitare de serviciu: ${subiect} - ${nume} ${prenume}`,
      html: adminEmailContent,
    });

    // Send confirmation email to client
    await clientTransporter.sendMail({
      from: `E.I.S. Service ${process.env.CLIENT_EMAIL}`,
      to: email,
      subject: "Confirmarea solicitării dumneavoastră - E.I.S. Service",
      html: clientEmailContent,
    });

    res.status(200).json({
      success: true,
      message:
        "Solicitarea a fost trimisă cu succes! Veți fi contactat în curând.",
    });
  } catch (error) {
    console.error("Error sending client email:", error);
    res.status(500).json({
      success: false,
      message:
        "A apărut o eroare la trimiterea solicitării. Vă rugăm să încercați din nou.",
    });
  }
};
