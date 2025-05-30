// assets/js/dados-usuarios.js
const DADOS_USUARIOS_STORAGE_KEY = 'recomecoDadosUsuarios';
const USUARIO_LOGADO_EMAIL_KEY = 'recomecoUsuarioLogadoEmail';
const CHAVE_DIARIO_FICTICIO_POPULADO = 'recomecoDiarioFicticioPopulado';

// Dados iniciais/padrão, usando email como chave primária
const dadosIniciaisUsuariosRecomeco = {
    "enzo.okuizumi@gmail.com": {
        nomeCompleto: "Enzo Okuizumi",
        dataNascimento: "30/10/2006",
        email: "enzo.okuizumi@gmail.com",
        telefone: "(11) 98765-4321",
        senha: "123@mudar",
    },
    "lucas.barros@gmail.com": {
        nomeCompleto: "Lucas Barros",
        dataNascimento: "22/09/1992",
        email: "lucas.barros@gmail.com",
        telefone: "(11) 91234-5678",
        senha: "123@mudar",
    },
    "milton.marcelino@gmail.com": {
        nomeCompleto: "Milton Marcelino",
        dataNascimento: "05/03/1978",
        email: "milton.marcelino@gmail.com",
        telefone: "(11) 90987-6543",
        senha: "123@mudar",
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
    if (dadosUsuarios[email] && dadosUsuarios[email].senha === senhaInput) {
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
        senha: dadosNovoUsuario.senha
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
    window.location.href = '/index.html';
}

function atualizarDadosUsuarioLogado(novosDados) {
    const emailLogado = getUsuarioLogadoEmail();
    if (!emailLogado || !dadosUsuarios[emailLogado]) {
        console.error("Nenhum usuário logado ou dados não encontrados para atualizar.");
        return false;
    }

    // Atualiza apenas os campos fornecidos em novosDados
    // Não se deve permitir alteração de e-mail por aqui, pois é a chave.
    if (novosDados.nomeCompleto) {
        dadosUsuarios[emailLogado].nomeCompleto = novosDados.nomeCompleto;
    }
    if (novosDados.telefone) {
        dadosUsuarios[emailLogado].telefone = novosDados.telefone;
    }
    if (novosDados.dataNascimento) {
        dadosUsuarios[emailLogado].dataNascimento = novosDados.dataNascimento;
    }
    // Atualiza a senha apenas se uma nova senha for fornecida e não estiver vazia
    if (novosDados.senha && novosDados.senha.trim() !== "") {
        dadosUsuarios[emailLogado].senha = novosDados.senha;
    }
    saveAllUsuariosData(dadosUsuarios); // Salva todos os dados de usuários atualizados
    return true;
}

// Função para popular o diário com entradas fictícias se estiver vazio para os usuários padrão
function popularDiarioFicticio() {
    const CHAVE_STORAGE_DIARIO = 'recomecoDiarioEmocional';

    // Verifica se o diário fictício já foi populado uma vez desde a última limpeza do localStorage específico
    if (localStorage.getItem(CHAVE_DIARIO_FICTICIO_POPULADO) === 'true') {
        return;
    }

    let todasAsEntradasTodosUsuarios = JSON.parse(localStorage.getItem(CHAVE_STORAGE_DIARIO) || '{}');
    let dadosModificados = false;

    const usuariosParaPopular = [
        "enzo.okuizumi@gmail.com",
        "lucas.barros@gmail.com",
        "milton.marcelino@gmail.com"
    ];

    const entradasFicticiasBase = [
        {
            titulo: "Um dia de reflexão",
            texto: "Hoje tirei um tempo para pensar sobre tudo o que aconteceu. Foi difícil, mas sinto que estou começando a processar as coisas. A caminhada que fiz ajudou a clarear a mente.",
            emocao: "calmo"
        },
        {
            titulo: "Pequenos progressos",
            texto: "Consegui organizar uma parte da casa e conversei com um vizinho. Pequenos passos, mas me senti um pouco mais produtivo e conectado. A saudade ainda aperta, mas a esperança resiste.",
            emocao: "esperançoso"
        },
        {
            titulo: "Sentimentos mistos",
            texto: "O dia foi uma montanha-russa. Horas de tristeza, mas também momentos em que consegui sorrir ao lembrar de coisas boas. Aprender a conviver com essa dualidade é um desafio.",
            emocao: "confuso"
        },
        {
            titulo: "Buscando forças",
            texto: "Alguns dias são mais difíceis que outros. Hoje a energia estava baixa, mas li um artigo sobre resiliência que me deu um novo ânimo para continuar.",
            emocao: "cansado"
        },
        {
            titulo: "A importância do apoio",
            texto: "Falei com um amigo querido hoje e me senti muito acolhido. É incrível como uma boa conversa pode aliviar o peso que carregamos. Gratidão.",
            emocao: "feliz"
        },
        {
            titulo: "Lidando com a ansiedade",
            texto: "A noite passada foi complicada, muita ansiedade. Tentei focar na respiração e fazer alguns exercícios de relaxamento. Aos poucos, a calma retornou.",
            emocao: "ansioso"
        }
    ];

    usuariosParaPopular.forEach(email => {
        if (!getAllUsuariosData()[email]) { // Verifica se o usuário existe nos dados principais
            console.warn(`Usuário ${email} não encontrado nos dados principais. Não populando diário para este usuário.`);
            return;
        }

        if (!todasAsEntradasTodosUsuarios[email] || todasAsEntradasTodosUsuarios[email].length === 0) {
            console.log(`Populando diário para ${email}...`);
            todasAsEntradasTodosUsuarios[email] = [];
            // Pega 3 entradas aleatórias da base para cada usuário
            const entradasUnicasParaUsuario = [...entradasFicticiasBase].sort(() => 0.5 - Math.random()).slice(0, 3);

            entradasUnicasParaUsuario.forEach((baseEntrada, index) => {
                // Simula datas diferentes para cada entrada
                const data = new Date();
                data.setDate(data.getDate() - (index * 3 + Math.floor(Math.random() * 3))); // Dias anteriores variados

                todasAsEntradasTodosUsuarios[email].push({
                    id: Date.now() + email + index, // ID único
                    data: data.toISOString().split('T')[0], // Formato AAAA-MM-DD
                    titulo: baseEntrada.titulo,
                    texto: baseEntrada.texto,
                    emocao: baseEntrada.emocao
                });
            });
            dadosModificados = true;
        }
    });

    if (dadosModificados) {
        localStorage.setItem(CHAVE_STORAGE_DIARIO, JSON.stringify(todasAsEntradasTodosUsuarios));
        localStorage.setItem(CHAVE_DIARIO_FICTICIO_POPULADO, 'true'); // Marca como populado para não repetir sem limpeza manual
        console.log("Diário fictício populado e salvo no localStorage.");
    }
}

// Chama a função para popular o diário ao carregar o script, se necessário
popularDiarioFicticio(); 