// Fungsi untuk memuat konten dari file eksternal
async function loadContent(pageUrl, buttonElement) {
    const contentArea = document.getElementById('content-area');

    try {
        // 1. Ambil file HTML (Fetch)
        const response = await fetch(pageUrl);
        
        // 2. Jika file ditemukan (OK)
        if (response.ok) {
            const htmlText = await response.text();
            contentArea.innerHTML = htmlText; // Tempelkan isinya ke div content-area
        } else {
            contentArea.innerHTML = "<h2>Error 404: Halaman tidak ditemukan.</h2>";
        }
    } catch (error) {
        contentArea.innerHTML = "<h2>Gagal memuat konten. Pastikan Anda menggunakan Live Server.</h2>";
        console.error(error);
    }

    // 3. Update tampilan tombol Aktif
    // Hapus class 'active' dari semua tombol
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Tambahkan class 'active' ke tombol yang diklik
    if (buttonElement) {
        buttonElement.classList.add("active");
    }
}