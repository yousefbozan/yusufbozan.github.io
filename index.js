require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// --- 1. Middleware ---
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// --- 2. MongoDB Bağlantısı ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Batman Veritabanı Bağlantısı Başarılı!'))
  .catch(err => console.error('❌ Veritabanı Hatası:', err));

// --- 3. MongoDB Şeması ---
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// --- 4. Nodemailer (Stabilizasyon Ayarı) ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }
});

// --- 5. API Endpoint ---
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // A. Veritabanına Kaydet
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log("💾 Veri DB'ye yazıldı.");

        // B. Mail Gönder
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ybozan183@gmail.com', 
            subject: `🚀 Siteden Yeni Mesaj: ${name}`,
            text: `Gönderen: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Mail kutuna uçtu!");

        res.status(200).json({ success: true, message: "Mesajın her yere ulaştı bro!" });

    } catch (error) {
        console.error("❌ Hata oluştu:", error);
        // Hata olsa bile DB'ye yazıldığını biliyoruz
        res.status(500).json({ 
            success: false, 
            message: "Hata: Mesaj kaydedildi ama mail iletilemedi bro." 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Batman Sunucusu ${PORT} portunda aktif!`);
});
// Batman v2.1 Final Check - Bu satırı unutma!