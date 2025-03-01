document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const avatarGrid = document.getElementById('avatarGrid');
    const selectedAvatarInput = document.getElementById('selectedAvatar');
    const termsCheck = document.getElementById('termsCheck');

    // Efeito de digitação no título
    const title = document.querySelector('h2');
    const titleText = title.textContent;
    title.textContent = '';
    let titleIndex = 0;

    function typeWriter() {
        if (titleIndex < titleText.length) {
            title.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();

    // Validação de senha em tempo real
    const requirements = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        number: /[0-9]/,
        special: /[^A-Za-z0-9]/
    };

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        Object.keys(requirements).forEach(requirement => {
            const element = document.querySelector(`[data-requirement="${requirement}"]`);
            const isValid = requirements[requirement].test(password);
            element.classList.toggle('valid', isValid);
        });
    });

    // Validação de email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Mostrar erro
    function showError(element, message) {
        element.classList.add('shake');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--error-color)';
        element.parentElement.appendChild(errorDiv);
        
        setTimeout(() => {
            element.classList.remove('shake');
            setTimeout(() => errorDiv.remove(), 3000);
        }, 500);
    }

    // Seleção de avatar
    avatarGrid.addEventListener('click', (e) => {
        const avatarOption = e.target.closest('.avatar-option');
        if (!avatarOption) return;

        document.querySelectorAll('.avatar-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        avatarOption.classList.add('selected');
        selectedAvatarInput.value = avatarOption.dataset.avatar;
    });

    // Submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validações
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Email inválido');
            isValid = false;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'As senhas não coincidem');
            isValid = false;
        }

        if (!selectedAvatarInput.value) {
            showError(avatarGrid, 'Selecione um avatar');
            isValid = false;
        }

        if (!termsCheck.checked) {
            showError(termsCheck, 'Você precisa aceitar os termos');
            isValid = false;
        }

        if (isValid) {
            const button = form.querySelector('button');
            const btnText = button.querySelector('.btn-text');
            const btnLoader = button.querySelector('.btn-loader');
            
            // Loading state
            button.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';

            try {
                // Simula chamada de API
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Sucesso
                button.style.backgroundColor = 'var(--success-color)';
                btnLoader.style.display = 'none';
                btnText.textContent = 'Conta Criada! 🎮';
                btnText.style.display = 'block';

                // Redireciona
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);

            } catch (error) {
                console.error('Erro no registro:', error);
                button.disabled = false;
                btnLoader.style.display = 'none';
                btnText.style.display = 'block';
                showError(button, 'Erro ao criar conta. Tente novamente.');
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