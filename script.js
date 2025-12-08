async function loadContent(pageUrl, buttonElement) {
    const contentArea = document.getElementById('content-area');

    // Tampilkan efek loading sederhana
    contentArea.style.opacity = '0.5';

    try {
        const response = await fetch(pageUrl);
        if (response.ok) {
            const htmlText = await response.text();
            contentArea.innerHTML = htmlText;
            window.scrollTo(0, 0); // Scroll ke atas setiap ganti halaman
        } else {
            contentArea.innerHTML = "<h2>Error 404: Halaman tidak ditemukan.</h2>";
        }
    } catch (error) {
        contentArea.innerHTML = "<h2>Gagal memuat. Pastikan Live Server aktif.</h2>";
        console.error(error);
    }

    // Kembalikan opacity
    contentArea.style.opacity = '1';

    // UPDATE TOMBOL AKTIF
    // 1. Hapus class 'active' dari semua tombol navigasi
    let navButtons = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove("active");
    }

    // 2. Tambahkan class 'active' ke tombol yang diklik
    if (buttonElement) {
        buttonElement.classList.add("active");
    }
}