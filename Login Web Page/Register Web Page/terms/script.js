document.addEventListener('DOMContentLoaded', () => {
    // Anima as seções conforme scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-20px)';
        section.style.transition = 'all 0.5s ease';
        observer.observe(section);
    });
});

// Função pra aceitar os termos
function acceptTerms() {
    // Animação de sucesso
    const acceptBtn = document.querySelector('.accept-btn');
    acceptBtn.innerHTML = '<i class="fas fa-check"></i> Termos Aceitos!';
    acceptBtn.style.backgroundColor = 'var(--success-color)';
    
    // Salva no localStorage
    localStorage.setItem('termsAccepted', 'true');
    
    // Fecha a janela e atualiza o checkbox na página principal
    setTimeout(() => {
        if (window.opener && !window.opener.closed) {
            const checkbox = window.opener.document.getElementById('termsCheck');
            if (checkbox) checkbox.checked = true;
        }
        window.close();
    }, 1500);
}

// Função pra recusar os termos
function declineTerms() {
    // Animação de recusa
    const declineBtn = document.querySelector('.decline-btn');
    declineBtn.innerHTML = '<i class="fas fa-times"></i> Termos Recusados';
    declineBtn.style.backgroundColor = 'var(--error-color)';
    
    // Remove do localStorage
    localStorage.removeItem('termsAccepted');
    
    // Fecha a janela e desmarca o checkbox
    setTimeout(() => {
        if (window.opener && !window.opener.closed) {
            const checkbox = window.opener.document.getElementById('termsCheck');
            if (checkbox) checkbox.checked = false;
        }
        window.close();
    }, 1500);
}

// Easter egg: Konami Code
let konamiCode = [];
const validCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(validCode)) {
        document.body.style.animation = 'matrix 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});