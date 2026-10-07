const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/add-customer', (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ success: false, message: 'لطفاً شماره تماس را وارد کنید.' });
    }

    const filePath = path.join(__dirname, 'customers.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let customers = [];
        if (!err && data) {
            try {
                customers = JSON.parse(data);
            } catch (e) {
                customers = [];
            }
        }

        customers.push({
            phone: phone,
            date: new Date().toLocaleString('fa-IR')
        });

        fs.writeFile(filePath, JSON.stringify(customers, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'خطا در ذخیره‌سازی فایل.' });
            }
            res.json({ success: true, message: 'شماره با موفقیت ثبت شد!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(سرور روی پورت ${PORT} فعال شد.);
});