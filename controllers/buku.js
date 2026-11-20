
const daftarBuku = require("../data/buku");

// Menampilkan semua buku
const tampilkanBuku = (req, res) => {
    res.json({
        pesan: "Daftar seluruh buku",
        data: daftarBuku
    });
};

// Menambahkan buku
const tambahBuku = (req, res) => {
    const { judul, penulis, kategori, tahun, stok } = req.body;

    if (!judul || !penulis || !kategori || !tahun || stok === undefined) {
        return res.status(400).json({
            pesan: "Semua data buku wajib diisi"
        });
    }

    if (Number(stok) < 0 || Number(tahun) <= 0 || !Number.isInteger(Number(stok)) || !Number.isInteger(Number(tahun))) {
        return res.status(400).json({
            pesan: "Tahun dan stok harus berupa bilangan bulat yang valid"
        });
    }

    const idBaru = daftarBuku.length > 0
        ? Math.max(...daftarBuku.map(buku => buku.id)) + 1
        : 1;

    const bukuBaru = {
        id: idBaru,
        judul,
        penulis,
        kategori,
        tahun: Number(tahun),
        stok: Number(stok)
    };

    daftarBuku.push(bukuBaru);

    res.status(201).json({
        pesan: "Buku berhasil ditambahkan",
        data: bukuBaru
    });
};

// Mencari buku berdasarkan ID
const cariBuku = (req, res) => {
    const id = Number(req.params.id);

    const buku = daftarBuku.find(item => item.id === id);

    if (!buku) {
        return res.status(404).json({
            pesan: "Buku tidak ditemukan"
        });
    }

    res.json({
        pesan: "Buku berhasil ditemukan",
        data: buku
    });
};

// Mengubah data buku
const ubahBuku = (req, res) => {
    const id = Number(req.params.id);

    const buku = daftarBuku.find(item => item.id === id);

    if (!buku) {
        return res.status(404).json({
            pesan: "Buku tidak ditemukan"
        });
    }

    const { judul, penulis, kategori, tahun, stok } = req.body;

    if (tahun !== undefined && (!Number.isInteger(Number(tahun)) || Number(tahun) <= 0)) {
        return res.status(400).json({
            pesan: "Tahun harus berupa bilangan bulat positif"
        });
    }

    if (stok !== undefined && (!Number.isInteger(Number(stok)) || Number(stok) < 0)) {
        return res.status(400).json({
            pesan: "Stok harus berupa bilangan bulat dan tidak boleh negatif"
        });
    }

    if (judul !== undefined) buku.judul = judul;
    if (penulis !== undefined) buku.penulis = penulis;
    if (kategori !== undefined) buku.kategori = kategori;
    if (tahun !== undefined) buku.tahun = Number(tahun);
    if (stok !== undefined) buku.stok = Number(stok);

    res.json({
        pesan: "Data buku berhasil diubah",
        data: buku
    });
};

// Menghapus buku
const hapusBuku = (req, res) => {
    const id = Number(req.params.id);

    const index = daftarBuku.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            pesan: "Buku tidak ditemukan"
        });
    }

    const bukuDihapus = daftarBuku.splice(index, 1);

    res.json({
        pesan: "Buku berhasil dihapus",
        data: bukuDihapus[0]
    });
};

// Menghitung ringkasan perpustakaan
const ringkasanBuku = (req, res) => {
    let totalStok = 0;

    for (let i = 0; i < daftarBuku.length; i++) {
        totalStok += daftarBuku[i].stok;
    }

    res.json({
        jumlahJudul: daftarBuku.length,
        totalStok: totalStok
    });
};

module.exports = {
    tampilkanBuku,
    tambahBuku,
    cariBuku,
    ubahBuku,
    hapusBuku,
    ringkasanBuku
};
