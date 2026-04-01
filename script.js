document.addEventListener('DOMContentLoaded', () => {

    // 1. Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Typing Effect
    const textElement = document.getElementById('typing-text');

    if (textElement) {

        const words = [
            "Scalable Backends",
            "Modern UI/UX",
            "Creative Solutions",
            "Flutter Specialist"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {

            const currentWord = words[wordIndex];

            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex--);
            } else {
                textElement.textContent = currentWord.substring(0, charIndex++);
            }

            if (!isDeleting && charIndex === currentWord.length) {

                isDeleting = true;
                setTimeout(type, 2000);

            } else if (isDeleting && charIndex === 0) {

                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);

            } else {

                setTimeout(type, isDeleting ? 50 : 120);

            }

        }

        type();
    }


    // 3. CONTACT FORM (Node.js Backend)

    const contactForm = document.getElementById('contactForm');
    const successOverlay = document.getElementById('successOverlay');

    if (contactForm) {

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const submitBtn = document.getElementById('submitButton');
            const btnSpan = submitBtn.querySelector('span');

            const originalText = btnSpan.innerText;

            btnSpan.innerText = 'Gönderiliyor...';
            submitBtn.disabled = true;

            const formData = {

                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value

            };

            try {

                // Render'a yüklediğinde sana vereceği URL'i buraya yapıştıracaksın bro.
// Şimdilik test ediyorsan localhost kalsın ama canlıya geçerken değiştir.
const API_URL = "https://yousefbozan-github-io.onrender.com/api/contact"; 

const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});

                const result = await response.json();

                if (result.success) {

                    successOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    successOverlay.classList.add('opacity-100', 'pointer-events-auto');

                    contactForm.reset();

                } else {

                    alert('Mesaj gönderilemedi bro.');

                }

            } catch (error) {

                console.error('Connection error:', error);
                alert('Backend çalışmıyor olabilir bro.');

            } finally {

                btnSpan.innerText = originalText;
                submitBtn.disabled = false;

            }

        });

    }

});


// 4. Overlay kapatma
function resetForm() {

    const successOverlay = document.getElementById('successOverlay');

    if (successOverlay) {

        successOverlay.classList.add('opacity-0', 'pointer-events-none');
        successOverlay.classList.remove('opacity-100', 'pointer-events-auto');

    }

}


// 5. Modal

function openModal(projectId) {

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const dataElement = document.getElementById('data-' + projectId);

    if (modal && modalBody && dataElement) {

        modalBody.innerHTML = dataElement.innerHTML;
        modal.style.display = 'flex';

        document.body.style.overflow = 'hidden';

    }

}

function closeModal() {

    const modal = document.getElementById('project-modal');

    if (modal) {

        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

    }

}


// 6. Skill Progress Animation

window.onload = () => {

    const progressFills = document.querySelectorAll('.progress-fill');

    progressFills.forEach(fill => {

        const percent = fill.getAttribute('data-percent');
        fill.style.width = percent + '%';

    });

};


// 7. Navbar Scroll Effect

window.addEventListener('scroll', () => {

    const nav = document.querySelector('.navbar');

    if (nav) {

        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

    }

});
<<<<<<< HEAD

// --- MOBİL MENÜ ENTEGRASYONU ---
=======
// Sayfa yüklendiğinde Lucide ikonlarını başlat
if (window.lucide) {
    lucide.createIcons();
}

>>>>>>> 3c7c72f (mobil menu ve script guncellemesi)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
<<<<<<< HEAD
    // Hamburger butonuna tıklayınca menüyü aç/kapat
    mobileMenuBtn.addEventListener('click', () => {
        // Menüyü kaydırarak açan class (active)
        navLinks.classList.toggle('active');
        
        // Senin eski kodundaki 'toggle' animasyonu (CSS'de varsa çalışır)
        mobileMenuBtn.classList.toggle('toggle');

        // İkonun Menu'den X'e dönüşmesi (Lucide kullanıyorsan)
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            // Lucide ikonlarını yeniden oluştur ki değişiklik görünsün
=======
    mobileMenuBtn.addEventListener('click', (e) => {
        // Sayfanın yenilenmesini veya garip davranmasını engelle
        e.preventDefault();
        
        // Menüyü aç/kapat
        navLinks.classList.toggle('active');
        
        // İkonu değiştir
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            const isOpened = navLinks.classList.contains('active');
            icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
            
            // Lucide'i zorla güncelle
>>>>>>> 3c7c72f (mobil menu ve script guncellemesi)
            if (window.lucide) {
                lucide.createIcons();
            }
        }
<<<<<<< HEAD
    });

    // Menüdeki bir linke tıklandığında menüyü otomatik kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Menüyü kapat
            navLinks.classList.remove('active');
            
            // İkonu tekrar 'menu' haline getir
            mobileMenuBtn.classList.remove('toggle');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) {
                    lucide.createIcons();
                }
            }
        });
    });
}
=======
        
        console.log("Butona tıklandı, menü durumu:", navLinks.classList.contains('active'));
    });

    // Menü dışına veya linke tıklandığında kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}
>>>>>>> 3c7c72f (mobil menu ve script guncellemesi)
