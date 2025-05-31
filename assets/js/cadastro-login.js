document.addEventListener('DOMContentLoaded', () => {
    const showLoginBtn = document.getElementById('showLoginBtn');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegisterLink = document.getElementById('switchToRegisterLink');
    const switchToLoginLink = document.getElementById('switchToLoginLink');
    const formFeedback = document.getElementById('formFeedback');

    // Campo de Data de Nascimento para formatação automática
    const dataNascimentoInput = document.getElementById('registerDataNascimento');

    // Campo de Telefone para formatação automática
    const telefoneInput = document.getElementById('registerTelefone');

    // Constante para a chave do usuário logado no localStorage (para consistência)
    const LOGGED_IN_USER_KEY = 'loggedInUserRecomeco';

    function displayFeedback(message, type) {
        if (formFeedback) {
            formFeedback.textContent = message;
            formFeedback.className = `form-feedback ${type}`;
            formFeedback.style.display = 'block';
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback';
                }
            }, 5000);
        }
    }

    function clearFeedback() {
        if (formFeedback) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
            formFeedback.style.display = 'none';
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

        // Formulário de Login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearFeedback();
            const email = loginForm.loginEmail.value.trim();
            const password = loginForm.loginPassword.value;

            if (!email || !password) {
                displayFeedback('Por favor, preencha email e senha.', 'error');
                return;
            }

            // Utiliza a função autenticarUsuario de dados-pacientes.js
            if (autenticarUsuario(email, password)) { 
                const loggedInUserDetails = getDadosUsuarioLogado(); // Pega os detalhes do usuário para salvar
                localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify({ name: loggedInUserDetails.nomeCompleto, email: loggedInUserDetails.email }));
                displayFeedback('Login realizado com sucesso! Redirecionando...', 'success');
                setTimeout(() => {
                    window.location.href = './area-usuario/meu-perfil.html'; 
                }, 1500);
            } else {
                displayFeedback('Email ou senha inválidos.', 'error');
            }
        });

        // Formulário de Cadastro
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearFeedback();
            const name = registerForm.registerName.value.trim();
            const email = registerForm.registerEmail.value.trim();
            const dataNascimento = registerForm.registerDataNascimento.value.trim();
            const telefone = registerForm.registerTelefone.value.trim();
            const password = registerForm.registerPassword.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (!name || !email || !dataNascimento || !telefone || !password || !confirmPassword) {
                displayFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            if (password !== confirmPassword) {
                displayFeedback('As senhas não coincidem.', 'error');
                return;
            }
            if (password.length < 6) {
                displayFeedback('A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }

            const novoUsuario = {
                nome: name,
                email: email,
                dataNascimento: dataNascimento,
                telefone: telefone,
                senha: password
            };

            // Utiliza a função registrarNovoUsuario de dados-pacientes.js
            if (registrarNovoUsuario(novoUsuario)) {
                localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify({ name: novoUsuario.nome, email: novoUsuario.email }));
                displayFeedback('Cadastro realizado com sucesso! Redirecionando...', 'success');
                registerForm.reset();
                setTimeout(() => {
                    window.location.href = './area-usuario/meu-perfil.html';
                }, 2000);
            } else {
                displayFeedback('Este email já está cadastrado. Tente fazer login.', 'error');
            }
        });
    }

    // Mostrar formulário de login por padrão
    if (loginForm && showLoginBtn) {
        showForm(loginForm, showLoginBtn);
    }

    // Formatação automática do campo de Data de Nascimento
    if (dataNascimentoInput) {
        dataNascimentoInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length > 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }
            e.target.value = value.substring(0, 10); // Limita a 10 caracteres (DD/MM/AAAA)
        });
    }

    // Formatação automática do campo de Telefone (XX) XXXXX-XXXX
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            value = value.substring(0, 11); // Limita a 11 dígitos (XX XXXXX XXXX)
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue = '(' + value.substring(0, Math.min(2, value.length));
            }
            if (value.length > 2) {
                formattedValue += ') ' + value.substring(2, Math.min(7, value.length));
            }
            if (value.length > 7) {
                formattedValue += '-' + value.substring(7, 11);
            }
            e.target.value = formattedValue;
        });
    }
}); 