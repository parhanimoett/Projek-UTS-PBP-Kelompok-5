
const express = require("express");
const aplikasi = express();

const ruteBuku = require("./routes/buku");

aplikasi.use(express.json());

aplikasi.use("/buku", ruteBuku);

const PORT = 3000;

aplikasi.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
