// ==========================================
// 1. SYSTEM: ANIMASI SCROLL (INTERSECTION OBSERVER)
// ==========================================
const pemerhati = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tunjuk');
        }
    });
}, {
    threshold: 0.05
});

const elemenAnimasi = document.querySelectorAll('.pantau-scroll');
elemenAnimasi.forEach((el) => pemerhati.observe(el));


// ==========================================
// 2. SYSTEM: PENGURUSAN TEMA (LIGHT / DARK MODE)
// ==========================================
const butangTema = document.getElementById('theme-toggle');

if (localStorage.getItem('tema') === 'dark') {
    document.body.classList.add('dark-theme');
    if(butangTema) butangTema.textContent = '☀️';
}

if(butangTema) {
    butangTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('tema', 'dark');
            butangTema.textContent = '☀️';
        } else {
            localStorage.setItem('tema', 'light');
            butangTema.textContent = '🌙';
        }
    });
}


// ==========================================
// 3. INDEX: ANIMASI TEKS MENAIP AUTOMATIK
// ==========================================
const perkataan = ["Dalam Satu Digital Folio.", "Kisah Bahagia Kami.", "Memori Yang Abadi."];
let indeksPerkataan = 0;
let indeksHuruf = 0;
let padamTeks = false;
const elemenTeks = document.getElementById("typing-text");

function kesanMenaip() {
    if (!elemenTeks) return; // Menyentuh 'return' supaya kod berhenti jika tiada elemen ini (cth: di halaman ahli/galeri)
    
    const teksSemasa = perkataan[indeksPerkataan];
    
    if (padamTeks) {
        elemenTeks.textContent = teksSemasa.substring(0, indeksHuruf - 1);
        indeksHuruf--;
    } else {
        elemenTeks.textContent = teksSemasa.substring(0, indeksHuruf + 1);
        indeksHuruf++;
    }
    
    let kelajuan = 100;
    
    if (padamTeks) {
        kelajuan /= 2;
    }
    
    if (!padamTeks && indeksHuruf === teksSemasa.length) {
        kelajuan = 2000;
        padamTeks = true;
    } else if (padamTeks && indeksHuruf === 0) {
        padamTeks = false;
        indeksPerkataan = (indeksPerkataan + 1) % perkataan.length;
        kelajuan = 500;
    }
    
    setTimeout(kesanMenaip, kelajuan);
}


// ==========================================
// 4. AHLI: ANIMASI 3D TILT KAD KELUARGA
// ==========================================
function aktifkan3DTilt() {
    const semuaKad = document.querySelectorAll('.kad-premium');
    if (semuaKad.length === 0) return; // Mengelakkan ralat jika tiada kad premium di halaman lain

    semuaKad.forEach(kad => {
        kad.addEventListener('mousemove', (e) => {
            const posisiKotak = kad.getBoundingClientRect();
            const x = e.clientX - posisiKotak.left; 
            const y = e.clientY - posisiKotak.top;  
            
            const tengahX = posisiKotak.width / 2;
            const tengahY = posisiKotak.height / 2;
            
            const darjahX = ((y - tengahY) / tengahY) * -15;
            const darjahY = ((x - tengahX) / tengahX) * 15;
            
            kad.style.transform = `rotateX(${darjahX}deg) rotateY(${darjahY}deg) translateY(-5px)`;
            kad.style.boxShadow = `${-darjahY * 1.5}px ${darjahX * 1.5}px 40px -10px rgba(168, 85, 247, 0.4)`;
        });
        
        kad.addEventListener('mouseleave', () => {
            kad.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
            kad.style.boxShadow = 'var(--shadow)';
        });
    });
}


// ==========================================
// 5. PENYALUR UTAMA (INITIALIZATION ENGINE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    kesanMenaip();  /* Menjalankan fungsi taip jika berada di index.html */
    aktifkan3DTilt(); /* Menjalankan fungsi tilt jika berada di ahli.html */
});