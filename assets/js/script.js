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
    
    // Setup do Exercício de Respiração
    const breathExerciseContainer = document.querySelector('.breathing-exercise-section');
    if (breathExerciseContainer) {
        const circle = breathExerciseContainer.querySelector('.breathing-circle');
        const instructions = breathExerciseContainer.querySelector('.breathing-instructions');
        const timerDisplay = breathExerciseContainer.querySelector('.breathing-timer');
        const startStopButton = breathExerciseContainer.querySelector('#startStopBreath');
        let breathingInterval;
        let phase = 0; 
        let currentTimer = 0;

        const breathPhases = [
            { name: "Inspire...", duration: 4, circleClass: 'inhale' },
            { name: "Segure o ar", duration: 7, circleClass: 'hold' },
            { name: "Expire lentamente...", duration: 8, circleClass: 'exhale' }
        ];

        function updateBreathUI() {
            if (phase === 0) {
                instructions.textContent = "Clique em Iniciar para começar";
                circle.className = 'breathing-circle';
                timerDisplay.textContent = "";
                if (startStopButton) startStopButton.textContent = "Iniciar Exercício";
                return;
            }

            const currentPhaseData = breathPhases[phase - 1];
            instructions.textContent = currentPhaseData.name;
            circle.className = 'breathing-circle ' + currentPhaseData.circleClass;
            timerDisplay.textContent = currentTimer;
        }

        function cyclePhases() {
            if (phase === 0) return;

            currentTimer--;

            if (currentTimer < 0) {
                phase++;
                if (phase > breathPhases.length) {
                    phase = 1;
                }
                currentTimer = breathPhases[phase - 1].duration;
            }
            updateBreathUI();
        }

        if (startStopButton) {
            startStopButton.addEventListener('click', () => {
                if (breathingInterval) {
                    clearInterval(breathingInterval);
                    breathingInterval = null;
                    phase = 0;
                    updateBreathUI();
                } else {
                    phase = 1;
                    currentTimer = breathPhases[phase - 1].duration;
                    updateBreathUI();
                    startStopButton.textContent = "Parar Exercício";
                    breathingInterval = setInterval(cyclePhases, 1000);
                }
            });
        }
        updateBreathUI(); 
    }

    // Smooth scroll para links de âncora (global)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Verifica se o link é APENAS uma âncora na mesma página
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
                    // Se o seletor for inválido (ex: href="#" apenas), não faz nada
                    console.warn('Smooth scroll target not found or invalid selector:', targetId);
                }
            }
        });
    });
});
