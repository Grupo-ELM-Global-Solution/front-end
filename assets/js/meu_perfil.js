document.addEventListener('DOMContentLoaded', () => {
    // As chaves de localStorage são gerenciadas em dados-usuarios.js
    // const LOGGED_IN_USER_KEY = 'loggedInUserRecomeco'; // Não é mais necessário aqui

    const dadosUsuario = getDadosUsuarioLogado(); // Usar a função de dados-usuarios.js

    const profileNameElement = document.getElementById('profileName');
    const profileEmailElement = document.getElementById('profileEmail');
    const logoutButton = document.querySelector('.btn-logout');

    if (dadosUsuario && profileNameElement && profileEmailElement) {
        profileNameElement.textContent = dadosUsuario.nomeCompleto; // Ajustar para nomeCompleto
        profileEmailElement.textContent = dadosUsuario.email;
    } else {
        // Se não houver usuário logado, redireciona para a página de login
        // alert("Você não está logado. Redirecionando para login...");
        // window.location.href = '../cadastro-login.html'; // Ajuste o caminho se necessário

        // Ou, para permitir visualização da estrutura da página de perfil mesmo sem login (para desenvolvimento):
        if (profileNameElement) profileNameElement.textContent = "Visitante";
        if (profileEmailElement) profileEmailElement.textContent = "Faça login para ver seus dados.";
        console.warn("Nenhum usuário logado. Para testar, faça login ou cadastre-se.");
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            fazerLogout(); // Usar a função de dados-usuarios.js
            // Opcional: limpar também a lista de usuários se for apenas para sessão
            // localStorage.removeItem(DADOS_USUARIOS_STORAGE_KEY); // Se DADOS_USUARIOS_STORAGE_KEY for exposta ou houver função para isso
            alert('Você foi desconectado.');
            window.location.href = '../../index.html'; // Ajuste o caminho para sua página inicial
        });
    }

    const editProfileButton = document.querySelector('.btn-edit-profile');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            alert('Funcionalidade "Editar Perfil" ainda não implementada.');
        });
    }
}); 