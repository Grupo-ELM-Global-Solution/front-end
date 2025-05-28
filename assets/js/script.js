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

});