document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.faq-accordion-section .accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            if (header && content) {
                // Define os estados ARIA iniciais
                const isInitiallyExpanded = header.classList.contains('active') || header.getAttribute('aria-expanded') === 'true';
                header.setAttribute('aria-expanded', isInitiallyExpanded ? 'true' : 'false');
                content.setAttribute('aria-hidden', isInitiallyExpanded ? 'false' : 'true');
                if (isInitiallyExpanded) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }


                header.addEventListener('click', () => {
                    const isExpanded = header.getAttribute('aria-expanded') === 'true';

                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherHeader = otherItem.querySelector('.accordion-header');
                            const otherContent = otherItem.querySelector('.accordion-content');
                            if (otherHeader && otherContent) {
                                otherHeader.setAttribute('aria-expanded', 'false');
                                otherContent.style.maxHeight = null;
                                otherContent.setAttribute('aria-hidden', 'true');
                                otherHeader.classList.remove('active');
                            }
                        }
                    });

                    if (isExpanded) {
                        header.setAttribute('aria-expanded', 'false');
                        content.style.maxHeight = null;
                        content.setAttribute('aria-hidden', 'true');
                        header.classList.remove('active');
                    } else {
                        header.setAttribute('aria-expanded', 'true');
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.setAttribute('aria-hidden', 'false');
                        header.classList.add('active');
                    }
                });
            }
        });
    }
});
