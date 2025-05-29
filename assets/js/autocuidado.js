document.addEventListener('DOMContentLoaded', () => {
    // Exercício de Respiração Guiada
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingInstruction = document.getElementById('breathingInstruction');
    const breathingTimerDisplay = document.getElementById('breathingTimer');
    const startBreathingBtn = document.getElementById('startBreathingBtn');

    if (startBreathingBtn && breathingCircle && breathingInstruction && breathingTimerDisplay) {
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
            if (breathingTimerDisplay) breathingTimerDisplay.textContent = `(${tempoRestante}s)`;

            timerInterval = setInterval(() => {
                tempoRestante--;
                if (breathingTimerDisplay) breathingTimerDisplay.textContent = `(${tempoRestante}s)`;
                if (tempoRestante <= 0) {
                    clearInterval(timerInterval);
                }
            }, 1000);
        }

        function executarFaseRespiração() {
            faseAtual = (faseAtual + 1) % fasesRespiração.length;
            let proximaFaseDelayMs;
            let duracaoFaseAtualSegundos;

            if (!breathingInstruction || !breathingCircle) return;

            switch (fasesRespiração[faseAtual]) {
                case 'inspire':
                    if (breathingInstruction.firstChild) breathingInstruction.firstChild.textContent = 'Inspire profundamente';
                    breathingCircle.classList.remove('exhale');
                    breathingCircle.classList.add('inhale');
                    duracaoFaseAtualSegundos = tempoInspiração;
                    proximaFaseDelayMs = tempoInspiração * 1000;
                    break;
                case 'segure':
                    if (breathingInstruction.firstChild) breathingInstruction.firstChild.textContent = 'Segure';
                    duracaoFaseAtualSegundos = tempoSegurar;
                    proximaFaseDelayMs = tempoSegurar * 1000;
                    break;
                case 'expire':
                    if (breathingInstruction.firstChild) breathingInstruction.firstChild.textContent = 'Expire lentamente';
                    breathingCircle.classList.remove('inhale');
                    breathingCircle.classList.add('exhale');
                    duracaoFaseAtualSegundos = tempoExpiração;
                    proximaFaseDelayMs = tempoExpiração * 1000;
                    break;
            }
            iniciarTimer(duracaoFaseAtualSegundos);
            mainBreathingInterval = setTimeout(executarFaseRespiração, proximaFaseDelayMs);
        }

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
                if (breathingInstruction && breathingInstruction.firstChild) breathingInstruction.firstChild.textContent = 'Prepare-se';
                if (breathingTimerDisplay) breathingTimerDisplay.textContent = '';
                if (breathingCircle) breathingCircle.classList.remove('inhale', 'exhale');
                faseAtual = -1;
            }
        });
    }

    // Lógica para as Abas na página de Autocuidado (com acessibilidade ARIA)
    const tabList = document.querySelector('.techniques-by-disaster-section .tab-buttons');
    const tabButtonsAutocuidado = document.querySelectorAll('.techniques-by-disaster-section .tab-button'); // Renomeado para evitar conflito
    const tabContentsAutocuidado = document.querySelectorAll('.techniques-by-disaster-section .tab-pane');

    if (tabList && tabButtonsAutocuidado.length > 0 && tabContentsAutocuidado.length > 0) {
        tabList.setAttribute('role', 'tablist');

        tabButtonsAutocuidado.forEach((button) => {
            const targetTabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);

            button.setAttribute('role', 'tab');
            button.setAttribute('aria-controls', targetTabId);
            button.setAttribute('id', 'tab-' + targetTabId);

            if (targetContent) {
                targetContent.setAttribute('role', 'tabpanel');
                targetContent.setAttribute('aria-labelledby', 'tab-' + targetTabId);
            }

            if (button.classList.contains('active')) {
                button.setAttribute('aria-selected', 'true');
                if (targetContent) targetContent.classList.add('active');
            } else {
                button.setAttribute('aria-selected', 'false');
                if (targetContent) targetContent.classList.remove('active');
            }

            button.addEventListener('click', () => {
                tabButtonsAutocuidado.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                tabContentsAutocuidado.forEach(content => {
                    content.classList.remove('active');
                });

                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Ativa a primeira aba se nenhuma estiver ativa (ou a aba salva em localStorage, se preferir)
        // Para simplificar, vamos apenas ativar a primeira se nenhuma estiver marcada como ativa no HTML.
        let anyTabActive = false;
        tabButtonsAutocuidado.forEach(btn => {
            if (btn.classList.contains('active')) {
                anyTabActive = true;
            }
        });
        if (!anyTabActive && tabButtonsAutocuidado.length > 0) {
            tabButtonsAutocuidado[0].click(); // Dispara o evento de clique para configurar tudo.
        }
    }
});
