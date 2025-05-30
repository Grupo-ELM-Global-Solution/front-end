document.addEventListener('DOMContentLoaded', () => {
    // As chaves de localStorage são gerenciadas em dados-usuarios.js
    // const LOGGED_IN_USER_KEY = 'loggedInUserRecomeco'; // Não é mais necessário aqui

    const dadosUsuario = getDadosUsuarioLogado(); // Usar a função de dados-usuarios.js

    // Redireciona para login/cadastro se não estiver logado
    if (!dadosUsuario) {
        window.location.href = '/assets/paginas/cadastro-login.html';
        return;
    }

    const profileNameElement = document.getElementById('profileName');
    const profileEmailElement = document.getElementById('profileEmail');
    const profilePictureImgElement = document.getElementById('profilePictureImg'); // Seleciona a imagem
    const logoutButton = document.querySelector('.btn-logout');

    const genericProfilePicUrl = "https://cdn-icons-png.flaticon.com/512/9706/9706583.png";

    // Modal elements
    const editProfileModal = document.getElementById('editProfileModal');
    const editProfileButton = document.querySelector('.btn-edit-profile'); // Botão na sidebar
    const openEditProfileModalCard = document.getElementById('openEditProfileModalCard'); // Card de Configurações
    const closeModalBtn = editProfileModal.querySelector('.close-modal-btn');
    const cancelEditBtn = editProfileModal.querySelector('.btn-cancel-edit');
    const editProfileForm = document.getElementById('editProfileForm');
    const editProfileFeedback = document.getElementById('editProfileFeedback');

    function displayUserData() {
        const currentUser = getDadosUsuarioLogado(); // Pega os dados mais recentes
        if (currentUser) {
            if (profileNameElement) profileNameElement.textContent = currentUser.nomeCompleto;
            if (profileEmailElement) profileEmailElement.textContent = currentUser.email;
            
            if (profilePictureImgElement) {
                profilePictureImgElement.src = genericProfilePicUrl;
            }
        } else {
            // Se não houver usuário logado, redireciona para a página de login
            // alert("Você não está logado. Redirecionando para login...");


            // Ou, para permitir visualização da estrutura da página de perfil mesmo sem login (para desenvolvimento):
            if (profileNameElement) profileNameElement.textContent = "Visitante";
            if (profileEmailElement) profileEmailElement.textContent = "Faça login para ver seus dados.";
            if (profilePictureImgElement) profilePictureImgElement.src = genericProfilePicUrl; // Imagem genérica se não logado
            
            console.warn("Nenhum usuário logado. Para testar, faça login ou cadastre-se.");
        }
    }

    function openModal() {
        const currentUser = getDadosUsuarioLogado();
        if (!currentUser) {
            alert("Você precisa estar logado para editar o perfil.");
            return;
        }
        // Preenche o formulário do modal com os dados atuais
        editProfileForm.nomeCompleto.value = currentUser.nomeCompleto || '';
        editProfileForm.email.value = currentUser.email || ''; // Readonly
        editProfileForm.telefone.value = currentUser.telefone || '';
        editProfileForm.dataNascimento.value = currentUser.dataNascimento || '';
        editProfileForm.senha.value = ''; // Limpa campos de senha
        editProfileForm.confirmSenha.value = '';
        editProfileFeedback.style.display = 'none';
        editProfileFeedback.textContent = '';

        editProfileModal.style.display = 'block';
        document.body.classList.add('modal-open-no-scroll'); // Impede a rolagem do body
    }

    function closeModal() {
        editProfileModal.style.display = 'none';
        document.body.classList.remove('modal-open-no-scroll'); // Restaura a rolagem do body
    }

    if (editProfileButton) {
        editProfileButton.addEventListener('click', openModal);
    }
    if (openEditProfileModalCard) {
        openEditProfileModalCard.addEventListener('click', openModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeModal);
    }
    // Fecha o modal se clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            closeModal();
        }
    });

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nomeCompleto = editProfileForm.nomeCompleto.value.trim();
            const telefone = editProfileForm.telefone.value.trim();
            const dataNascimento = editProfileForm.dataNascimento.value.trim();
            const novaSenha = editProfileForm.senha.value;
            const confirmaNovaSenha = editProfileForm.confirmSenha.value;

            if (novaSenha !== confirmaNovaSenha) {
                editProfileFeedback.textContent = "As senhas não coincidem.";
                editProfileFeedback.style.color = "red";
                editProfileFeedback.style.display = "block";
                return;
            }

            const dadosAtualizados = {
                nomeCompleto: nomeCompleto,
                telefone: telefone,
                dataNascimento: dataNascimento,
                // Só inclui a senha se ela for alterada
                ...(novaSenha && { senha: novaSenha })
            };

            if (atualizarDadosUsuarioLogado(dadosAtualizados)) {
                editProfileFeedback.textContent = "Perfil atualizado com sucesso!";
                editProfileFeedback.style.color = "green";
                editProfileFeedback.style.display = "block";
                displayUserData(); // Atualiza os dados na página
                setTimeout(() => {
                    closeModal();
                }, 1500); // Fecha o modal após um tempo
            } else {
                editProfileFeedback.textContent = "Erro ao atualizar o perfil. Tente novamente.";
                editProfileFeedback.style.color = "red";
                editProfileFeedback.style.display = "block";
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            fazerLogout();
            window.location.href = '/index.html'; // Agora sempre vai para a raiz do projeto
        });
    }

    // Exibição inicial dos dados do usuário
    displayUserData(); 
}); 