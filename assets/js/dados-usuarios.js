// assets/js/dados-usuarios.js (RecomeçaSP - Adaptado para login com Email)

const DADOS_USUARIOS_STORAGE_KEY = 'recomecoDadosUsuarios';
const USUARIO_LOGADO_EMAIL_KEY = 'recomecoUsuarioLogadoEmail';

// Dados iniciais/padrão, usando email como chave primária
const dadosIniciaisUsuariosRecomeco = {
    "enzo.okuizumi@gmail.com": {
        nomeCompleto: "Enzo Okuizumi",
        dataNascimento: "30/10/2006",
        email: "enzo.okuizumi@gmail.com",
        telefone: "(11) 98765-4321",
        senhaPlana: "123@mudar",
    },
    "lucas.barros@gmail.com": {
        nomeCompleto: "Lucas Barros",
        dataNascimento: "22/09/1992",
        email: "lucas.barros@gmail.com",
        telefone: "(11) 91234-5678",
        senhaPlana: "123@mudar",
    },
    "milton.marcelino@gmail.com": {
        nomeCompleto: "Milton Marcelino",
        dataNascimento: "05/03/1978",
        email: "milton.marcelino@gmail.com",
        telefone: "(11) 90987-6543",
        senhaPlana: "123@mudar",
    }
};

function getAllUsuariosData() {
    const dadosString = localStorage.getItem(DADOS_USUARIOS_STORAGE_KEY);
    if (dadosString) {
        return JSON.parse(dadosString);
    }
    localStorage.setItem(DADOS_USUARIOS_STORAGE_KEY, JSON.stringify(dadosIniciaisUsuariosRecomeco));
    return dadosIniciaisUsuariosRecomeco;
}

function saveAllUsuariosData(todosOsDados) {
    localStorage.setItem(DADOS_USUARIOS_STORAGE_KEY, JSON.stringify(todosOsDados));
}

let dadosUsuarios = getAllUsuariosData();

function autenticarUsuario(emailInput, senhaInput) {
    const email = emailInput.trim().toLowerCase();
    if (dadosUsuarios[email] && dadosUsuarios[email].senhaPlana === senhaInput) {
        localStorage.setItem(USUARIO_LOGADO_EMAIL_KEY, email);
        return true;
    }
    return false;
}

function registrarNovoUsuario(dadosNovoUsuario) {
    const email = dadosNovoUsuario.email.trim().toLowerCase();

    if (dadosUsuarios[email]) {
        console.error("Tentativa de registrar Email já existente:", email);
        return false;
    }
    dadosUsuarios[email] = {
        nomeCompleto: dadosNovoUsuario.nome,
        dataNascimento: dadosNovoUsuario.dataNascimento,
        email: email,
        telefone: dadosNovoUsuario.telefone,
        senhaPlana: dadosNovoUsuario.senha,
    };
    saveAllUsuariosData(dadosUsuarios);
    return true;
}

function getUsuarioLogadoEmail() {
    return localStorage.getItem(USUARIO_LOGADO_EMAIL_KEY);
}

function getDadosUsuarioLogado() {
    const emailLogado = getUsuarioLogadoEmail();
    if (!emailLogado) return null;
    return dadosUsuarios[emailLogado] || null;
}

function fazerLogout() {
    localStorage.removeItem(USUARIO_LOGADO_EMAIL_KEY);
}

// A função atualizarDadosUsuarioLogado precisaria ser adaptada para usar email como chave
// e para os campos que agora existem, se for implementada. 