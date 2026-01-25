const functions = require("firebase-functions");
const admin = require("firebase-admin");
const validator = require("validator");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.submitContactForm = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      const { fullName, email, company, message } = req.body;

      // ---- Validation ----
      if (!fullName || !email || !message) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          error: "Invalid email address",
        });
      }

      if (message.length > 2000) {
        return res.status(400).json({
          error: "Message is too long",
        });
      }

      // ---- Store in Firestore ----
      await db.collection("contactMessages").add({
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || null,
        message: message.trim(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ip: req.headers["fastly-client-ip"] || req.ip || null,
      });

      return res.status(200).json({
        success: true,
        message: "Message received",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  });
});
