document.addEventListener('DOMContentLoaded', () => {
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