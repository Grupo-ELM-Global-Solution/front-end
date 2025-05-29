document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formSubmissionFeedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            // Simulação de envio de dados
            // Em um cenário real, aqui você coletaria os dados e enviaria para um servidor
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            // Validação simples (apenas para demonstração, já que os campos são 'required' no HTML)
            if (!name || !email || !subject || !message) {
                formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                formFeedback.className = 'form-feedback error'; // Assume que você tem classes CSS para 'error'
                return;
            }

            // Exibe mensagem de sucesso (simulada)
            formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve. (Simulado)';
            formFeedback.className = 'form-feedback success'; // Assume que você tem classes CSS para 'success'

            // Limpa o formulário
            contactForm.reset();

            // Opcional: remover a mensagem de feedback após alguns segundos
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback';
            }, 5000); // Remove após 5 segundos
        });
    }
});
