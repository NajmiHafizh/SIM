document.getElementById('spkForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const hargaPasar = parseFloat(document.getElementById('hargaPasar').value);
    const biayaProduksi = parseFloat(document.getElementById('biayaProduksi').value);
    const permintaan = parseFloat(document.getElementById('permintaan').value);
    const margin = parseFloat(document.getElementById('margin').value);
    
    // Bobot kriteria (harus total 1)
    const bobot = {
        hargaPasar: 0.4,
        biayaProduksi: 0.3,
        permintaan: 0.2,
        margin: 0.1
    };
    
    // Perhitungan metode Weighted Product
    const nilai = {
        hargaPasar: hargaPasar,
        biayaProduksi: biayaProduksi,
        permintaan: permintaan,
      margin: 1 + margin / 100 // margin dalam bentuk faktor (mis. 20% => 1.2)
    };
    
    let skor = 1;
    for (const kriteria in bobot) {
      // Jika biaya, dibalik nilainya (semakin rendah biaya, semakin bagus)
        const value = kriteria === 'biayaProduksi' ? 1 / nilai[kriteria] : nilai[kriteria];
      skor *= Math.pow(value, bobot[kriteria]);
    }
    
    const hargaRekomendasi = skor * 100; // dikalikan 100 untuk skala
    
    document.getElementById('hasil').innerHTML =
        `Harga jual yang direkomendasikan: <strong>Rp ${hargaRekomendasi.toFixed(2)}</strong>`;
    });
    
