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

    // Setup do Formulário de Reflexão
    setupReflexionForm();
});


// Lógica para a seção de Auto-observação Reflexiva na página entendendo_emocoes.html
function setupReflexionForm() {
    const reflexionForm = document.getElementById('reflexionForm');
    const reflexionFeedbackContainer = document.getElementById('reflexionFeedback');
    const staticFeedbackWrapper = document.getElementById('staticFeedbackWrapper'); // Pega a nova div estática

    if (reflexionForm && reflexionFeedbackContainer && staticFeedbackWrapper) {
        // Tenta encontrar elementos existentes para contador e mensagem
        let counterElement = document.getElementById('reflexionCounter');
        let messageElement = document.getElementById('reflexionMessage');

        // Se não existirem, cria e insere ANTES do staticFeedbackWrapper
        if (!counterElement) {
            counterElement = document.createElement('p');
            counterElement.id = 'reflexionCounter';
            counterElement.className = 'reflexion-counter-text';
            reflexionFeedbackContainer.insertBefore(counterElement, staticFeedbackWrapper);
        }
        if (!messageElement) {
            messageElement = document.createElement('p');
            messageElement.id = 'reflexionMessage';
            messageElement.className = 'reflexion-message-text';
            reflexionFeedbackContainer.insertBefore(messageElement, staticFeedbackWrapper);
        }

        const checkboxes = reflexionForm.querySelectorAll('input[type="checkbox"]');
        const totalCheckboxes = checkboxes.length;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateReflexionFeedback);
        });

        function updateReflexionFeedback() {
            const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
            const totalCheckboxes = checkboxes.length;
            let feedbackMessageText = '';
            let counterTextContent = '';

            // Monta o texto do contador SEMPRE
            counterTextContent = `Você marcou ${checkedCount} de ${totalCheckboxes} itens.`;

            if (checkedCount === 0) {
                feedbackMessageText = "Que bom que você está se observando. Mesmo sem marcar itens, refletir sobre seu bem-estar é um passo importante.";
            } else if (checkedCount >= 1 && checkedCount <= 3) {
                feedbackMessageText = "É comum vivenciar algumas dessas reações após um evento difícil. Observar seus sentimentos é um bom começo. Continue se cuidando e, se algo te preocupar mais intensamente ou persistir, considere conversar com alguém de confiança ou um profissional.";
            } else if (checkedCount >= 4 && checkedCount <= 6) {
                feedbackMessageText = "Marcar vários itens indica que você pode estar passando por um momento desafiador e sentindo o impacto do evento de forma mais significativa. É importante não minimizar suas experiências. Se esses sentimentos são intensos ou duram mais de algumas semanas, buscar apoio profissional pode te ajudar a lidar melhor com eles.";
            } else if (checkedCount >= 7) {
                feedbackMessageText = "Você marcou uma quantidade considerável de itens, o que sugere que o impacto emocional do evento pode estar sendo bastante intenso e afetando diversas áreas da sua vida. É muito importante que você não passe por isso sozinho(a). Considerar seriamente uma conversa com um profissional de saúde mental pode ser um passo crucial para sua recuperação e bem-estar.";
            }

            counterElement.textContent = counterTextContent;
            messageElement.textContent = feedbackMessageText;

            // Adiciona margem abaixo do contador se houver uma mensagem de feedback principal abaixo dele
            if (feedbackMessageText) {
                counterElement.style.marginBottom = '0.5em';
            } else {
                counterElement.style.marginBottom = '0';
            }
        }
        updateReflexionFeedback(); 
    }
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