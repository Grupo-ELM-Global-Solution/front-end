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

    // Carrossel de Depoimentos
    const carouselInner = document.querySelector('.testimonials-section .carousel-inner');
    const carouselItems = document.querySelectorAll('.testimonials-section .carousel-item');
    const prevButton = document.querySelector('.testimonials-section .carousel-control.prev');
    const nextButton = document.querySelector('.testimonials-section .carousel-control.next');
    const indicatorsContainer = document.querySelector('.testimonials-section .carousel-indicators');

    if (carouselInner && carouselItems.length > 0) {
        let currentIndex = 0;
        const totalItems = carouselItems.length;
        let autoSlideInterval;

        function updateCarouselUi() {
            if (!carouselInner) return; // Adiciona verificação
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            if (indicatorsContainer) { // Adiciona verificação
                const indicators = indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }

        function createIndicators() {
            if (!indicatorsContainer) return; // Adiciona verificação
            for (let i = 0; i < totalItems; i++) {
                const indicator = document.createElement('button');
                indicator.classList.add('indicator');
                indicator.setAttribute('aria-label', `Slide ${i + 1}`)
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarouselUi();
                    resetAutoSlide();
                });
                indicatorsContainer.appendChild(indicator);
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

        function startAutoSlide() {
            autoSlideInterval = setInterval(showNextItem, 5000); // Muda a cada 5 segundos
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        if (nextButton) nextButton.addEventListener('click', () => {
            showNextItem();
            resetAutoSlide();
        });
        if (prevButton) prevButton.addEventListener('click', () => {
            showPrevItem();
            resetAutoSlide();
        });

        if (totalItems > 1) {
             if (indicatorsContainer) createIndicators(); // Adiciona verificação
            startAutoSlide();
        } else if (indicatorsContainer) {
            indicatorsContainer.style.display = 'none'; // Esconde indicadores se houver apenas um item
            if(prevButton) prevButton.style.display = 'none';
            if(nextButton) nextButton.style.display = 'none';
        }
        updateCarouselUi(); 
    }

    // O código específico de cada página foi movido para arquivos dedicados:
    // - assets/js/autocuidado.js (Abas, Exercício de Respiração)
    // - assets/js/entendendo_emocoes.js (Formulário de Reflexão)
    // - assets/js/faq.js (Acordeão FAQ)
    // - O código que estava em main.js (Menu Hambúrguer, Carrossel de Depoimentos - elementos globais) agora está neste arquivo.

    console.log("Script.js principal carregado. Funcionalidades específicas em arquivos dedicados. Funcionalidades globais (menu, carrossel) incluídas aqui.");
});

// Funções que eram chamadas globalmente no DOMContentLoaded foram movidas 
// para seus respectivos arquivos e envolvidas em seus próprios DOMContentLoaded listeners.

// A função setupReflexionForm() foi movida para entendendo_emocoes.js

// A lógica do acordeão que estava solta aqui, será colocada em faq.js
// e também envolvida em um DOMContentLoaded.