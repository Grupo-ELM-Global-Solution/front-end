document.addEventListener('DOMContentLoaded', () => {
    // Lógica para o Acordeão (FAQ)
    const accordionItems = document.querySelectorAll('.faq-accordion-section .accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon'); 

            if (header && content) {
                header.addEventListener('click', () => {
                    const isExpanded = header.getAttribute('aria-expanded') === 'true';

                    // Fecha todos os outros itens (opcional, para acordeão "um por vez")
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherHeader = otherItem.querySelector('.accordion-header');
                            otherHeader.setAttribute('aria-expanded', 'false');
                            const otherContent = otherItem.querySelector('.accordion-content');
                            otherContent.style.maxHeight = null;
                            otherContent.setAttribute('aria-hidden', 'true');
                            otherHeader.classList.remove('active'); 
                            const otherIcon = otherHeader.querySelector('.accordion-icon');
                            if (otherIcon) otherIcon.textContent = '+'; // Garante que o ícone dos outros itens volte para '+'
                        }
                    });

                    if (isExpanded) {
                        header.setAttribute('aria-expanded', 'false');
                        content.style.maxHeight = null; 
                        content.setAttribute('aria-hidden', 'true');
                        header.classList.remove('active'); 
                        if (icon) icon.textContent = '+'; 
                    } else {
                        header.setAttribute('aria-expanded', 'true');
                        content.style.maxHeight = content.scrollHeight + "px"; 
                        content.setAttribute('aria-hidden', 'false');
                        header.classList.add('active'); 
                        if (icon) icon.textContent = '−'; 
                    }
                });

                // Inicializa o conteúdo escondido e o estado do ícone
                if (header.getAttribute('aria-expanded') === 'false') {
                    content.style.maxHeight = null;
                    content.setAttribute('aria-hidden', 'true');
                    header.classList.remove('active');
                    if (icon) icon.textContent = '+';
                } else { 
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.setAttribute('aria-hidden', 'false');
                    header.classList.add('active');
                    if (icon) icon.textContent = '−';
                }
            }
        });
    }
}); // Fim do DOMContentLoaded 