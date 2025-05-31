document.addEventListener('DOMContentLoaded', () => {
    const profileNameElement = document.getElementById('profileName');
    const profileEmailElement = document.getElementById('profileEmail');
    const profilePictureImgElement = document.getElementById('profilePictureImg');
    const genericProfilePicUrl = "https://cdn-icons-png.flaticon.com/512/9706/9706583.png";

    // Modal elements
    const editProfileModal = document.getElementById('editProfileModal');
    const editProfileButton = document.querySelector('.btn-edit-profile');
    const openEditProfileModalCard = document.getElementById('openEditProfileModalCard');
    const closeModalBtn = editProfileModal ? editProfileModal.querySelector('.close-modal-btn') : null;
    const cancelEditBtn = editProfileModal ? editProfileModal.querySelector('.btn-cancel-edit') : null;
    const editProfileForm = document.getElementById('editProfileForm');
    const editProfileFeedback = document.getElementById('editProfileFeedback');

    function displayUserData() {
        // Assegura que getDadosUsuarioLogado está disponível (de dados-usuarios.js)
        if (typeof getDadosUsuarioLogado !== 'function') {
            console.error("Função getDadosUsuarioLogado não encontrada. Verifique a ordem de carregamento dos scripts.");
            if (profileNameElement) profileNameElement.textContent = "Erro ao carregar dados";
            if (profileEmailElement) profileEmailElement.textContent = "-";
            if (profilePictureImgElement) profilePictureImgElement.src = genericProfilePicUrl;
            return;
        }

        const currentUser = getDadosUsuarioLogado(); 
        if (currentUser) {
            if (profileNameElement) profileNameElement.textContent = currentUser.nomeCompleto;
            if (profileEmailElement) profileEmailElement.textContent = currentUser.email;
            if (profilePictureImgElement) {
                profilePictureImgElement.src = currentUser.fotoUrl || genericProfilePicUrl;
            }
            // Preenche campos do formulário do modal se o modal e o formulário existirem
            if (editProfileModal && editProfileForm && editProfileForm.elements.length > 0) { 
                editProfileForm.nomeCompleto.value = currentUser.nomeCompleto || '';
                editProfileForm.email.value = currentUser.email || ''; 
                editProfileForm.telefone.value = currentUser.telefone || '';
                editProfileForm.dataNascimento.value = currentUser.dataNascimento || '';
            }
        } else {
            console.warn("Página de perfil acessada sem usuário logado ou dados não encontrados.");
            if (profileNameElement) profileNameElement.textContent = "Visitante";
            if (profileEmailElement) profileEmailElement.textContent = "N/A";
            if (profilePictureImgElement) profilePictureImgElement.src = genericProfilePicUrl;
        }
    }

    function openModal() {
        if (typeof getDadosUsuarioLogado !== 'function' || !getDadosUsuarioLogado()) {
            // A proteção global já deve ter redirecionado, mas como segurança adicional:
            alert("Você precisa estar logado para editar o perfil.");
             // window.location.href = '/assets/paginas/cadastro-login.html'; // Opcional, pois script.js já faz
            return;
        }
        // displayUserData já deve ter sido chamado ou será chamado, mas podemos garantir que os dados do form estão atualizados
        const currentUser = getDadosUsuarioLogado(); // Garante dados frescos
        if (currentUser && editProfileForm && editProfileForm.elements.length > 0) {
            editProfileForm.nomeCompleto.value = currentUser.nomeCompleto || '';
            editProfileForm.email.value = currentUser.email || '';
            editProfileForm.telefone.value = currentUser.telefone || '';
            editProfileForm.dataNascimento.value = currentUser.dataNascimento || '';
            editProfileForm.senha.value = '';
            editProfileForm.confirmSenha.value = '';
        }
        if (editProfileFeedback) {
             editProfileFeedback.style.display = 'none';
             editProfileFeedback.textContent = '';
        }
        if (editProfileModal) {
            editProfileModal.style.display = 'block';
            document.body.classList.add('modal-open-no-scroll');
        }
    }

    function closeModal() {
        if (editProfileModal) {
            editProfileModal.style.display = 'none';
            document.body.classList.remove('modal-open-no-scroll');
        }
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
    
    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            closeModal();
        }
    });

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof atualizarDadosUsuarioLogado !== 'function') {
                console.error("Função atualizarDadosUsuarioLogado não definida.");
                if(editProfileFeedback) {
                    editProfileFeedback.textContent = "Erro crítico ao salvar. Tente mais tarde.";
                    editProfileFeedback.style.color = "red";
                    editProfileFeedback.style.display = "block";
                }
                return;
            }

            const nomeCompleto = editProfileForm.nomeCompleto.value.trim();
            const telefone = editProfileForm.telefone.value.trim();
            const dataNascimento = editProfileForm.dataNascimento.value.trim();
            const novaSenha = editProfileForm.senha.value;
            const confirmaNovaSenha = editProfileForm.confirmSenha.value;

            if (novaSenha !== confirmaNovaSenha) {
                if(editProfileFeedback) {
                    editProfileFeedback.textContent = "As senhas não coincidem.";
                    editProfileFeedback.style.color = "red";
                    editProfileFeedback.style.display = "block";
                }
                return;
            }

            const dadosAtualizados = {
                nomeCompleto: nomeCompleto,
                telefone: telefone,
                dataNascimento: dataNascimento,
                ...(novaSenha && { senha: novaSenha })
            };

            if (atualizarDadosUsuarioLogado(dadosAtualizados)) {
                if(editProfileFeedback) {
                    editProfileFeedback.textContent = "Perfil atualizado com sucesso!";
                    editProfileFeedback.style.color = "green";
                    editProfileFeedback.style.display = "block";
                }
                displayUserData(); 
                setTimeout(() => {
                    closeModal();
                }, 1500);
            } else {
                if(editProfileFeedback) {
                    editProfileFeedback.textContent = "Erro ao atualizar o perfil. Tente novamente.";
                    editProfileFeedback.style.color = "red";
                    editProfileFeedback.style.display = "block";
                }
            }
        });
    }

    // Exibição inicial dos dados
    displayUserData();
}); 