document.addEventListener('DOMContentLoaded', () => {
    // Setup do Menu Hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavList = document.querySelector('.main-navigation .nav-list');
    const primaryNav = document.getElementById('primary-navigation');

    if (menuToggle && mainNavList && primaryNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            menuToggle.classList.toggle('active');
            mainNavList.classList.toggle('active-mobile-nav');
            primaryNav.setAttribute('aria-hidden', String(isExpanded));
            document.body.classList.toggle('mobile-nav-active');
        });
    }

    // Smooth scroll para links de âncora (global)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.pathname === window.location.pathname && this.hash !== "" && document.querySelector(this.hash)) {
                e.preventDefault();
                document.querySelector(this.hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- LÓGICA GLOBAL DE AUTENTICAÇÃO ---
    function protegerPaginasAreaUsuario() {
        const paginasProtegidas = [
            '/assets/paginas/area-usuario/meu-perfil.html',
            '/assets/paginas/area-usuario/diario-usuario.html',
            '/assets/paginas/area-usuario/mapa-usuario.html',
            '/assets/paginas/area-usuario/tecnicas-autocuidado.html'
        ];
        const paginaAtual = window.location.pathname;
        const ehPaginaProtegida = paginasProtegidas.some(p => paginaAtual.endsWith(p));

        if (ehPaginaProtegida) {
            if (typeof getUsuarioLogadoEmail === 'function') {
                if (!getUsuarioLogadoEmail()) {
                    console.log("Usuário não logado, redirecionando para a página de login desde script.js.");
                    window.location.href = '/assets/paginas/cadastro-login.html';
                }
            } else {
                console.error('Função getUsuarioLogadoEmail não definida. Não é possível proteger a página.');
                // Fallback opcional: redirecionar se a função não existir.
                // window.location.href = '/assets/paginas/cadastro-login.html'; 
            }
        }
    }

    function configurarBotoesLogoutGlobais() {
        const logoutButtons = document.querySelectorAll('.btn-logout');
        logoutButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (typeof fazerLogout === 'function') {
                    fazerLogout();
                } else {
                    console.error('Função fazerLogout não definida. Logout manual.');
                    localStorage.removeItem('recomecoUsuarioLogadoEmail'); 
                    window.location.href = '/index.html';
                }
            });
        });
    }

    protegerPaginasAreaUsuario();
    configurarBotoesLogoutGlobais();
});
