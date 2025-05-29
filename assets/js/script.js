document.addEventListener('DOMContentLoaded', function() {

    // Menu Hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavList = document.querySelector('.main-navigation .nav-list');

    if (menuToggle && mainNavList) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNavList.classList.toggle('active-mobile-nav');
            // Atualiza aria-expanded
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Carrossel de Depoimentos
    const carouselInner = document.querySelector('.testimonials-section .carousel-inner');
    const carouselItems = document.querySelectorAll('.testimonials-section .carousel-item');
    const prevButton = document.querySelector('.testimonials-section .carousel-control.prev');
    const nextButton = document.querySelector('.testimonials-section .carousel-control.next');
    const indicatorsContainer = document.querySelector('.testimonials-section .carousel-indicators');

    if (carouselInner && carouselItems.length > 0) {
        let currentIndex = 0;
        const totalItems = carouselItems.length;

        function updateCarouselUi() {
            carouselItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentIndex) {
                    item.classList.add('active');
                }
            });

            if (indicatorsContainer) {
                const indicators = indicatorsContainer.querySelectorAll('button');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }
        }

        function createIndicators() {
            if (!indicatorsContainer) return;
            indicatorsContainer.innerHTML = ''; // Limpa indicadores existentes
            for (let i = 0; i < totalItems; i++) {
                const button = document.createElement('button');
                button.setAttribute('aria-label', `Ir para o depoimento ${i + 1}`);
                if (i === currentIndex) button.classList.add('active');
                button.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarouselUi();
                });
                indicatorsContainer.appendChild(button);
            }
        }

        function showNextItem() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarouselUi();
        }

        function showPrevItem() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarouselUi();
        }

        if (nextButton) nextButton.addEventListener('click', showNextItem);
        if (prevButton) prevButton.addEventListener('click', showPrevItem);

        createIndicators(); // Cria os indicadores
        updateCarouselUi(); // Garante que o primeiro item esteja visível

        // Autoplay (opcional)
        // setInterval(showNextItem, 7000); // Muda a cada 7 segundos
    }

    // Exercício de Respiração Guiada
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingInstruction = document.getElementById('breathingInstruction');
    const breathingTimerDisplay = document.getElementById('breathingTimer'); // Elemento para o timer
    const startBreathingBtn = document.getElementById('startBreathingBtn');
    
    let mainBreathingInterval;
    let timerInterval;
    let fasesRespiração = ['inspire', 'segure', 'expire']; 
    let faseAtual = -1; 

    const tempoInspiração = 4; // Segundos
    const tempoSegurar = 7;    // Segundos
    const tempoExpiração = 8;    // Segundos

    function iniciarTimer(duracaoSegundos) {
        clearInterval(timerInterval);
        let tempoRestante = duracaoSegundos;
        breathingTimerDisplay.textContent = `(${tempoRestante}s)`;

        timerInterval = setInterval(() => {
            tempoRestante--;
            breathingTimerDisplay.textContent = `(${tempoRestante}s)`;
            if (tempoRestante <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function executarFaseRespiração() {
        faseAtual = (faseAtual + 1) % fasesRespiração.length;
        let proximaFaseDelayMs;
        let duracaoFaseAtualSegundos;

        switch (fasesRespiração[faseAtual]) {
            case 'inspire':
                breathingInstruction.firstChild.textContent = 'Inspire profundamente';
                breathingCircle.classList.remove('exhale');
                breathingCircle.classList.add('inhale');
                duracaoFaseAtualSegundos = tempoInspiração;
                proximaFaseDelayMs = tempoInspiração * 1000;
                break;
            case 'segure':
                breathingInstruction.firstChild.textContent = 'Segure';
                duracaoFaseAtualSegundos = tempoSegurar;
                proximaFaseDelayMs = tempoSegurar * 1000;
                break;
            case 'expire':
                breathingInstruction.firstChild.textContent = 'Expire lentamente';
                breathingCircle.classList.remove('inhale');
                breathingCircle.classList.add('exhale');
                duracaoFaseAtualSegundos = tempoExpiração;
                proximaFaseDelayMs = tempoExpiração * 1000;
                break;
        }
        iniciarTimer(duracaoFaseAtualSegundos);
        mainBreathingInterval = setTimeout(executarFaseRespiração, proximaFaseDelayMs);
    }

    if (startBreathingBtn && breathingCircle && breathingInstruction && breathingTimerDisplay) {
        startBreathingBtn.addEventListener('click', () => {
            if (startBreathingBtn.textContent === 'Iniciar Exercício') {
                startBreathingBtn.textContent = 'Parar Exercício';
                faseAtual = -1; 
                clearTimeout(mainBreathingInterval);
                clearInterval(timerInterval);
                executarFaseRespiração();
            } else {
                clearTimeout(mainBreathingInterval);
                clearInterval(timerInterval);
                startBreathingBtn.textContent = 'Iniciar Exercício';
                breathingInstruction.firstChild.textContent = 'Prepare-se';
                breathingTimerDisplay.textContent = '';
                breathingCircle.classList.remove('inhale', 'exhale');
                faseAtual = -1;
            }
        });
    }

    // Smooth scroll para links de âncora (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lógica para as Abas na página de Autocuidado (com acessibilidade ARIA)
    const tabList = document.querySelector('.techniques-by-disaster-section .tab-buttons'); // Supondo que os botões estão em um container com essa classe
    const tabButtons = document.querySelectorAll('.techniques-by-disaster-section .tab-button');
    const tabContentsAutocuidado = document.querySelectorAll('.techniques-by-disaster-section .tab-pane');

    if (tabList && tabButtons.length > 0 && tabContentsAutocuidado.length > 0) {
        // Definir role="tablist" no container dos botões
        tabList.setAttribute('role', 'tablist');

        tabButtons.forEach((button, index) => {
            const targetTabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);

            // Definir atributos ARIA nos botões
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-controls', targetTabId);
            button.setAttribute('id', 'tab-' + targetTabId); // ID para o botão

            // Definir atributos ARIA nos conteúdos
            if (targetContent) {
                targetContent.setAttribute('role', 'tabpanel');
                targetContent.setAttribute('aria-labelledby', 'tab-' + targetTabId);
            }

            // Definir aria-selected inicial e estado ativo
            if (button.classList.contains('active')) {
                button.setAttribute('aria-selected', 'true');
                if (targetContent) targetContent.classList.add('active'); // Garante que o conteúdo ativo correspondente seja exibido
            } else {
                button.setAttribute('aria-selected', 'false');
                if (targetContent) targetContent.classList.remove('active');
            }

            button.addEventListener('click', () => {
                // Remover a classe active e aria-selected de todos os botões
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                // Remover a classe active de todos os conteúdos
                tabContentsAutocuidado.forEach(content => {
                    content.classList.remove('active');
                });

                // Adicionar a classe active e aria-selected ao botão clicado
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                // Adicionar a classe active ao conteúdo correspondente
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

});