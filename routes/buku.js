
const express = require("express");
const router = express.Router();

const {
    tampilkanBuku,
    tambahBuku,
    cariBuku,
    ubahBuku,
    hapusBuku,
    ringkasanBuku
} = require("../controllers/buku");

router.get("/", tampilkanBuku);
router.post("/", tambahBuku);
router.get("/ringkasan", ringkasanBuku);
router.get("/:id", cariBuku);
router.put("/:id", ubahBuku);
router.delete("/:id", hapusBuku);

module.exports = router;
