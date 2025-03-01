// Função pra adicionar aquele efeito massa de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Quando a página carregar, aplica o efeito no título
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h2');
    typeWriter(title, 'Login Test Fun', 150);

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Sons de feedback (opcional)
    const errorSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
    const successSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');

    // Validação maneira do email
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Validação da senha com requisitos
    const isValidPassword = (password) => {
        return password.length >= 6 && 
               /[A-Z]/.test(password) && 
               /[0-9]/.test(password);
    };

    // Função pra mostrar erro com animação
    const showError = (element, message) => {
        element.classList.add('shake');
        element.style.borderBottom = '2px solid var(--error-color)';
        
        // Cria ou atualiza a mensagem de erro
        let errorDiv = element.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            element.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--error-color)';
        
        errorSound.play();
        
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    };

    // Função pra mostrar sucesso
    const showSuccess = (element) => {
        element.style.borderBottom = '2px solid var(--success-color)';
        // Remove mensagem de erro se existir
        const errorDiv = element.parentElement.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
    };

    // Efeito de partículas quando fizer login com sucesso
    const createParticles = () => {
        const particles = 30;
        const container = document.querySelector('.container');
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);
            
            const size = Math.random() * 5 + 5;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 100;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            gsap.to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    };

    // Handler do form
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validação do email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Email inválido, mano!');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        // Validação da senha
        if (!isValidPassword(passwordInput.value)) {
            showError(passwordInput, 'Senha deve ter 6+ caracteres, 1 maiúscula e 1 número');
            isValid = false;
        } else {
            showSuccess(passwordInput);
        }

        if (isValid) {
            const submitButton = loginForm.querySelector('button');
            submitButton.disabled = true;
            
            // Animação do botão
            submitButton.innerHTML = `
                <span class="loading-spinner"></span>
                <span>Entrando...</span>
            `;

            try {
                // Simula uma chamada de API
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                successSound.play();
                createParticles();
                
                submitButton.innerHTML = 'Sucesso! 🎮';
                submitButton.style.backgroundColor = 'var(--success-color)';
                
                // Redireciona após o sucesso
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
                
            } catch (error) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Tentar Novamente';
                showError(submitButton, 'Erro ao fazer login. Tenta de novo!');
            }
        }
    });

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
});