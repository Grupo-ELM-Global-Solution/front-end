document.addEventListener('DOMContentLoaded', () => {
    // Setup do Menu Hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation .nav-list');
    const primaryNav = document.getElementById('primary-navigation');

    if (menuToggle && mainNav && primaryNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active-mobile-nav');
            primaryNav.setAttribute('aria-hidden', isExpanded);
            document.body.classList.toggle('mobile-nav-active');
        });
    }

    // Setup das Abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        const activeTabId = localStorage.getItem('activeTab');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPaneId = button.getAttribute('aria-controls');
                
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                tabPanes.forEach(pane => {
                    if (pane.id === targetPaneId) {
                        pane.classList.add('active');
                        pane.removeAttribute('hidden');
                    } else {
                        pane.classList.remove('active');
                        pane.setAttribute('hidden', 'true');
                    }
                });
                localStorage.setItem('activeTab', targetPaneId);
            });

            if (activeTabId && button.getAttribute('aria-controls') === activeTabId) {
                button.click();
            }
        });

        if (!activeTabId && tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }
    
    // Smooth scroll para links de âncora (global)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.pathname === window.location.pathname && this.hash !== "") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } catch (error) {
                    console.warn('Smooth scroll target not found or invalid selector:', targetId);
                }
            }
        });
    });

    // Chamadas para as funções de proteção de página e logout global
    // Verifica se dados-usuarios.js carregou (e portanto as funções getUsuarioLogadoEmail e fazerLogout)
    if (typeof getUsuarioLogadoEmail === 'function' && typeof fazerLogout === 'function') {
        protegerPaginaUsuario();
        configurarLogoutGlobal();
    } else {
        console.warn('Funções de autenticação (getUsuarioLogadoEmail/fazerLogout) não encontradas. A proteção de página e o logout global podem não funcionar.');
    }
});

// Função para verificar se o usuário está logado e proteger a página
function protegerPaginaUsuario() {
    const paginasProtegidas = [
        '/assets/paginas/area-usuario/meu-perfil.html',
        '/assets/paginas/area-usuario/diario-usuario.html',
        '/assets/paginas/area-usuario/mapa-usuario.html',
        '/assets/paginas/area-usuario/tecnicas-autocuidado.html'
    ];
    const paginaAtual = window.location.pathname;

    if (paginasProtegidas.some(pagina => paginaAtual.endsWith(pagina))) {
        if (!getUsuarioLogadoEmail()) { // getUsuarioLogadoEmail já foi verificado acima
            console.log("Usuário não logado, redirecionando para a página de login.");
            window.location.href = '/assets/paginas/cadastro-login.html';
        }
    }
}

// Função para configurar o botão de logout globalmente
function configurarLogoutGlobal() {
    const logoutButtons = document.querySelectorAll('.btn-logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            fazerLogout(); // fazerLogout já foi verificado acima e já redireciona
        });
    });
}
