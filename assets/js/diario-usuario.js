// assets/js/diario-usuario.js
document.addEventListener('DOMContentLoaded', function() {
    const formNovaEntrada = document.getElementById('formNovaEntradaDiario');
    const listaEntradasDiario = document.getElementById('listaEntradasDiario');
    const dataEntradaField = document.getElementById('dataEntrada');

    // Define a data atual no campo de data por padrão
    if (dataEntradaField) {
        dataEntradaField.valueAsDate = new Date();
    }

    const CHAVE_STORAGE_DIARIO = 'recomecoDiarioEmocional';

    function carregarEntradas() {
        const emailUsuario = getUsuarioLogadoEmail(); // Função de dados-usuarios.js
        if (!emailUsuario) return; // Não carrega se não houver usuário

        const todasAsEntradasTodosUsuarios = JSON.parse(localStorage.getItem(CHAVE_STORAGE_DIARIO) || '{}');
        const entradasDoUsuario = todasAsEntradasTodosUsuarios[emailUsuario] || [];

        listaEntradasDiario.innerHTML = ''; // Limpa a lista atual

        if (entradasDoUsuario.length === 0) {
            listaEntradasDiario.innerHTML = '<p class="nenhuma-entrada">Nenhuma entrada no diário ainda.</p>';
            return;
        }

        entradasDoUsuario.sort((a, b) => new Date(b.data) - new Date(a.data)); // Mais recentes primeiro

        entradasDoUsuario.forEach(entrada => {
            const itemEntrada = document.createElement('div');
            itemEntrada.classList.add('entrada-item');
            itemEntrada.dataset.id = entrada.id; // Para exclusão

            let tituloHtml = entrada.titulo ? `<h3>${escapeHtml(entrada.titulo)}</h3>` : '';
            let emocaoHtml = entrada.emocao ? `<span class="emocao-entrada">${escapeHtml(entrada.emocao)}</span>` : '';

            itemEntrada.innerHTML = `
                <div class="entrada-item-header">
                    ${tituloHtml}
                    <div class="data-emocao-container">
                        <span class="data-entrada">${new Date(entrada.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                        ${emocaoHtml}
                    </div>
                </div>
                <p class="texto-entrada-salva">${escapeHtml(entrada.texto)}</p>
                <button class="btn-excluir-entrada">Excluir</button>
            `;
            listaEntradasDiario.appendChild(itemEntrada);

            itemEntrada.querySelector('.btn-excluir-entrada').addEventListener('click', function() {
                excluirEntrada(entrada.id);
            });
        });
    }

    function salvarNovaEntrada(event) {
        event.preventDefault();
        const emailUsuario = getUsuarioLogadoEmail();
        if (!emailUsuario) {
            alert('Você precisa estar logado para salvar uma entrada.');
            return;
        }

        const data = document.getElementById('dataEntrada').value;
        const titulo = document.getElementById('tituloEntrada').value.trim();
        const texto = document.getElementById('textoEntrada').value.trim();
        const emocao = document.getElementById('comoSeSente').value;

        if (!data || !texto) {
            alert('A data e o texto da entrada são obrigatórios.');
            return;
        }

        const novaEntrada = {
            id: Date.now(), // ID simples baseado no timestamp
            data: data,
            titulo: titulo,
            texto: texto,
            emocao: emocao
        };

        let todasAsEntradasTodosUsuarios = JSON.parse(localStorage.getItem(CHAVE_STORAGE_DIARIO) || '{}');
        if (!todasAsEntradasTodosUsuarios[emailUsuario]) {
            todasAsEntradasTodosUsuarios[emailUsuario] = [];
        }
        todasAsEntradasTodosUsuarios[emailUsuario].push(novaEntrada);
        localStorage.setItem(CHAVE_STORAGE_DIARIO, JSON.stringify(todasAsEntradasTodosUsuarios));

        carregarEntradas();
        formNovaEntrada.reset(); // Limpa o formulário
        if (dataEntradaField) dataEntradaField.valueAsDate = new Date(); // Redefine a data
    }

    function excluirEntrada(idEntrada) {
        const emailUsuario = getUsuarioLogadoEmail();
        if (!emailUsuario) return;

        let todasAsEntradasTodosUsuarios = JSON.parse(localStorage.getItem(CHAVE_STORAGE_DIARIO) || '{}');
        if (!todasAsEntradasTodosUsuarios[emailUsuario]) return;

        todasAsEntradasTodosUsuarios[emailUsuario] = todasAsEntradasTodosUsuarios[emailUsuario].filter(e => e.id !== idEntrada);
        localStorage.setItem(CHAVE_STORAGE_DIARIO, JSON.stringify(todasAsEntradasTodosUsuarios));
        carregarEntradas();
    }

    // Função utilitária para escapar HTML e prevenir XSS básico
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    if (formNovaEntrada) {
        formNovaEntrada.addEventListener('submit', salvarNovaEntrada);
    }

    // Carrega as entradas quando a página é carregada e o usuário está logado
    if (typeof getUsuarioLogadoEmail === 'function' && getUsuarioLogadoEmail()) {
        carregarEntradas();
    } else if (typeof getUsuarioLogadoEmail !== 'function'){
        console.error('Função getUsuarioLogadoEmail não encontrada. Não é possível carregar entradas do diário.');
    }
}); 