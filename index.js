const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Ganti URL di bawah ini dengan URL API dari SheetDB
const SHEET_API_URL = 'https://sheetdb.io/api/v1/geyvw8mmnhdba'; // <- Ganti ini dengan milikmu

app.post('/api/reservation', async (req, res) => {
    const {
        created_at,
        conversation_id,
        display_name,
        phone_number,
        customer_name,
        treatment,
        date,
        time,
        guest_count
    } = req.body;

    // Validasi wajib
    if (!customer_name || !date || !time) {
        return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    try {
        await axios.post(SHEET_API_URL, {
            data: [
                {
                    "created_at": created_at || new Date().toISOString(),
                    "conversation_id": conversation_id || '',
                    "display_name": display_name || '',
                    "phone_number": phone_number || '',
                    "Nama Lengkap": customer_name,
                    "Treatment": treatment || '',
                    "Tanggal": date,
                    "Jam": time,
                    "Jumlah Tamu": guest_count || ''
                }
            ]
        });

        res.json({ success: true, message: 'Reservasi tersimpan ke Google Sheets' });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ success: false, message: 'Gagal menyimpan ke Google Sheets' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
