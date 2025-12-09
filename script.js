async function loadContent(pageUrl, buttonElement) {
    const contentArea = document.getElementById('content-area');

    contentArea.style.opacity = '0.5';

    try {
        const response = await fetch(pageUrl);
        if (response.ok) {
            const htmlText = await response.text();
            contentArea.innerHTML = htmlText;
            window.scrollTo(0, 0); 
        } else {
            contentArea.innerHTML = "<h2>Error 404: Page not found</h2>";
        }
    } catch (error) {
        contentArea.innerHTML = "<h2>Failed to load, make sure live server is active.</h2>";
        console.error(error);
    }

    contentArea.style.opacity = '1';

    // UPDATE TOMBOL AKTIF
    let navButtons = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove("active");
    }

    if (buttonElement) {
        buttonElement.classList.add("active");
    }

    // --- TAMBAHAN KHUSUS MOBILE ---
    // Jika layar kecil (HP), tutup menu sidebar setelah user klik salah satu tombol
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const btn = document.querySelector('.mobile-menu-btn');
        if (sidebar) {
            sidebar.style.display = "none";
            btn.innerHTML = "☰ Click menu to open categories";
        }
    }
}

// --- FUNGSI BARU UNTUK TOMBOL HEADER ---
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.querySelector('.mobile-menu-btn');

    // Cek apakah sidebar sedang tampil atau sembunyi
    // Kita gunakan getComputedStyle karena style default di CSS adalah 'none'
    const currentDisplay = window.getComputedStyle(sidebar).display;

    if (currentDisplay === "none") {
        sidebar.style.display = "block";
        btn.innerHTML = "✕ Closed menu";
    } else {
        sidebar.style.display = "none";
        btn.innerHTML = "☰ Click to open categories";
    }
}