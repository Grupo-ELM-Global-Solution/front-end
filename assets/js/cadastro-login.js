document.addEventListener('DOMContentLoaded', () => {
    const showLoginBtn = document.getElementById('showLoginBtn');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegisterLink = document.getElementById('switchToRegisterLink');
    const switchToLoginLink = document.getElementById('switchToLoginLink');
    const formFeedback = document.getElementById('formFeedback');

    function displayFeedback(message, type) {
        if (formFeedback) {
            formFeedback.textContent = message;
            formFeedback.className = `form-feedback ${type}`;
        }
    }

    function clearFeedback() {
        if (formFeedback) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
        }
    }

    function showForm(formToShow, btnToActivate) {
        clearFeedback();
        if (loginForm) loginForm.classList.remove('active');
        if (registerForm) registerForm.classList.remove('active');
        if (showLoginBtn) showLoginBtn.classList.remove('active');
        if (showRegisterBtn) showRegisterBtn.classList.remove('active');

        if (formToShow) formToShow.classList.add('active');
        if (btnToActivate) btnToActivate.classList.add('active');
    }

    if (showLoginBtn && showRegisterBtn && loginForm && registerForm) {
        showLoginBtn.addEventListener('click', () => showForm(loginForm, showLoginBtn));
        showRegisterBtn.addEventListener('click', () => showForm(registerForm, showRegisterBtn));

        if (switchToRegisterLink) {
            switchToRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                showForm(registerForm, showRegisterBtn);
            });
        }

        if (switchToLoginLink) {
            switchToLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                showForm(loginForm, showLoginBtn);
            });
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Lógica de login (simulada)
            const email = loginForm.loginEmail.value;
            console.log('Tentativa de login com:', email);
            displayFeedback('Login não implementado. Funcionalidade de back-end necessária.', 'error');
            // Em um cenário real, você enviaria os dados para um servidor aqui
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = registerForm.registerName.value;
            const email = registerForm.registerEmail.value;
            const password = registerForm.registerPassword.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (password !== confirmPassword) {
                displayFeedback('As senhas não coincidem.', 'error');
                return;
            }
            if (password.length < 6) {
                displayFeedback('A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }

            console.log('Tentativa de cadastro com:', name, email);
            displayFeedback('Cadastro não implementado. Funcionalidade de back-end necessária.', 'error');
            // Em um cenário real, você enviaria os dados para um servidor aqui
        });
    }

    // Mostrar formulário de login por padrão
    if(loginForm && showLoginBtn){
        showForm(loginForm, showLoginBtn);
    }
}); 