# Recomeço - Plataforma de Apoio Psicológico Pós-Desastre

## Objetivo do Projeto

O Recomeço é uma plataforma digital dedicada a fortalecer a resiliência e o bem-estar emocional de sobreviventes de desastres naturais (incêndios, inundações, deslizamentos). Nosso objetivo é capacitar os usuários com acesso imediato a apoio psicológico, ferramentas de autocuidado baseadas em evidências, informações claras sobre trauma e recursos para a jornada de recuperação, promovendo a autonomia e a busca por uma vida mais equilibrada após o impacto.

## Estrutura de Pastas e Arquivos

O projeto está organizado da seguinte forma:

```
/ (raiz)
|-- index.html (Página Inicial)
|-- README.md (Este arquivo)
|-- assets/
|   |-- css/
|   |   |-- style.css (Estilos globais e da página inicial)
|   |   |-- autocuidado.css 
|   |   |-- cadastro-login.css
|   |   |-- contato.css
|   |   |-- diario-usuario.css
|   |   |-- entendendo_emocoes.css
|   |   |-- faq.css
|   |   |-- integrantes.css
|   |   |-- mapa-usuario.css
|   |   |-- meu_perfil.css
|   |   |-- tecnicas-autocuidado.css
|   |-- js/
|   |   |-- script.js (JavaScript geral)
|   |   |-- autocuidado.js (Exercícios e técnicas de autocuidado)
|   |   |-- cadastro-login.js (Lógica de login e registro)
|   |   |-- contato.js (Formulário de contato)
|   |   |-- dados-usuarios.js (Gerenciamento de dados de usuários)
|   |   |-- diario-usuario.js (Funcionalidades do diário emocional)
|   |   |-- entendendo_emocoes.js (Interatividade da página de emoções)
|   |   |-- faq.js (Funcionalidade do acordeão de FAQ)
|   |   |-- meu_perfil.js (Gerenciamento do perfil do usuário)
|   |-- imagens/
|       |-- icone-logo.png (Logotipo principal da plataforma)
|       |-- imagens-integrantes/ (Fotos dos integrantes da equipe)
|-- paginas/
|   |-- autocuidado.html
|   |-- cadastro-login.html
|   |-- contato.html
|   |-- entendendo_emocoes.html
|   |-- faq.html
|   |-- integrantes.html
|   |-- area-usuario/
|       |-- diario-usuario.html
|       |-- mapa-usuario.html
|       |-- meu-perfil.html
|       |-- tecnicas-autocuidado.html
```

## Tecnologia Utilizada

O projeto foi desenvolvido utilizando exclusivamente:

* **HTML5:** Para a estruturação semântica do conteúdo.
* **CSS3:** Para a estilização e design responsivo.
* **JavaScript (ES6+):** Para interatividade e manipulação do DOM.

---

## 🧪 Testando a Aplicação

Para explorar a área do usuário e testar funcionalidades, você pode utilizar as seguintes credenciais fictícias:

*   **E-mail:** `enzo.okuizumi@gmail.com`
    **Senha:** `123@mudar`
*   **E-mail:** `lucas.barros@gmail.com`
    **Senha:** `123@mudar`
*   **E-mail:** `milton.marcelino@gmail.com`
    **Senha:** `123@mudar`

**Observação:** Todos os dados são fictícios e as interações são simuladas e armazenadas apenas localmente no seu navegador (`localStorage`). O sistema inclui a funcionalidade de popular o diário com entradas fictícias para os usuários de teste.

---

## Detalhamento das Páginas e Arquivos

### Arquivos HTML

* **`index.html`**: Página inicial da plataforma Recomeço.

* **`./assets/paginas/autocuidado.html`**: Apresenta técnicas e exercícios de autocuidado.
* **`./assets/paginas/cadastro-login.html`**: Página para registro e login de usuários.
* **`./assets/paginas/contato.html`**: Formulário de contato e informações.
* **`./assets/paginas/entendendo_emocoes.html`**: Conteúdo educativo sobre emoções.
* **`./assets/paginas/faq.html`**: Perguntas frequentes.
* **`./assets/paginas/integrantes.html`**: Apresentação da equipe de desenvolvimento.

#### Área do Usuário (`./assets/paginas/area-usuario/`):

* **`diario-usuario.html`**: Diário emocional do usuário.
* **`mapa-usuario.html`**: Mapa de apoio com recursos e alertas.
* **`meu-perfil.html`**: Perfil do usuário e configurações.
* **`tecnicas-autocuidado.html`**: Área para o usuário explorar técnicas de autocuidado personalizadas ou salvas.


### Arquivos CSS (`./assets/css/`)

* **`style.css`**: Estilos globais e base do site.
* **`autocuidado.css`**: Estilos para a página de autocuidado.
* **`cadastro-login.css`**: Estilos para os formulários de autenticação.
* **`contato.css`**: Estilos para a página de contato.
* **`diario-usuario.css`**: Estilos para o diário do usuário.
* **`entendendo_emocoes.css`**: Estilos para a página de entendimento das emoções.
* **`faq.css`**: Estilos para o sistema de acordeão do FAQ.
* **`integrantes.css`**: Estilos para a página da equipe.
* **`mapa-usuario.css`**: Estilos para a página do mapa de apoio.
* **`meu_perfil.css`**: Estilos para a página de perfil do usuário.
* **`tecnicas-autocuidado.css`**: Estilos para a página de técnicas de autocuidado da área do usuário.


### Arquivos JavaScript (`./assets/js/`)

O JavaScript é responsável pela interatividade, gerenciamento de dados do usuário, lógica de componentes e funcionalidades específicas de cada página.

---

#### `script.js`
- **Função:** Responsável por scripts globais, como menu de navegação, sistema de abas, smooth scroll e controle de acesso às páginas da área do usuário.
- **Principais funcionalidades:**
  - Controle do menu hambúrguer para navegação mobile (abre/fecha, atributos ARIA).
  - Gerenciamento de sistema de abas (ativação, persistência da aba ativa via `localStorage`).
  - Implementação de rolagem suave (smooth scroll) para links de âncora internos.
  - `protegerPaginaUsuario()`: Verifica se o usuário está logado ao tentar acessar páginas protegidas da área do usuário. Redireciona para a página de login caso não esteja.
  - `configurarLogoutGlobal()`: Adiciona funcionalidade de logout aos botões com a classe `.btn-logout`.
- **Exemplo de uso:** Incluído em todas as páginas que necessitam de funcionalidades globais ou proteção de rota.

---

#### `dados-usuarios.js`
- **Função:** Simula um backend para gerenciamento de dados de usuários e autenticação, utilizando o `localStorage` do navegador.
- **Principais funcionalidades:**
  - `getAllUsuariosData()`: Carrega os dados dos usuários do `localStorage` ou inicializa com dados fictícios.
  - `saveAllUsuariosData()`: Salva os dados dos usuários no `localStorage`.
  - `autenticarUsuario(email, senha)`: Valida credenciais e armazena o email do usuário logado.
  - `registrarNovoUsuario(dadosNovoUsuario)`: Cadastra um novo usuário.
  - `getUsuarioLogadoEmail()`: Retorna o email do usuário logado.
  - `getDadosUsuarioLogado()`: Retorna o objeto completo com os dados do usuário logado.
  - `fazerLogout()`: Remove os dados de login do usuário e redireciona para a página inicial.
  - `atualizarDadosUsuarioLogado(novosDados)`: Permite atualizar informações do perfil do usuário (nome, telefone, data de nascimento, senha).
  - `popularDiarioFicticio()`: Adiciona entradas fictícias ao diário dos usuários de teste para fins de demonstração.
- **Observação:** Todos os dados são fictícios e armazenados apenas no navegador do usuário. As senhas são armazenadas como texto plano (prática insegura para produção, mas aceitável para este projeto de front-end).

---

#### `cadastro-login.js`
- **Função:** Gerencia a lógica dos formulários de login e cadastro na página `cadastro-login.html`.
- **Principais funcionalidades:**
  - Alterna a exibição entre os formulários de login e cadastro.
  - Coleta os dados dos formulários.
  - Realiza validações básicas (campos preenchidos, senhas coincidem, tamanho mínimo da senha).
  - Utiliza `autenticarUsuario()` e `registrarNovoUsuario()` do `dados-usuarios.js` para processar login e registro.
  - Exibe feedback (mensagens de sucesso ou erro) para o usuário.
  - Redireciona o usuário para a página de perfil (`meu-perfil.html`) após login ou cadastro bem-sucedido.
- **Exemplo de uso:** Incluído exclusivamente em `cadastro-login.html`.

---

#### `meu_perfil.js` 
- **Função:** Controla a exibição dos dados do usuário na página `meu-perfil.html` e a funcionalidade de edição do perfil através de um modal.
- **Principais funcionalidades:**
  - `displayUserData()`: Exibe nome, email e foto de perfil (genérica) do usuário logado.
  - Gerencia a abertura e fechamento do modal de edição de perfil.
  - Preenche o formulário do modal com os dados atuais do usuário.
  - Coleta os dados do formulário de edição (nome completo, telefone, data de nascimento, nova senha).
  - Utiliza `atualizarDadosUsuarioLogado()` do `dados-usuarios.js` para salvar as alterações.
  - Exibe feedback sobre o processo de atualização no modal.
  - Atualiza dinamicamente os dados exibidos na página após a edição.
- **Exemplo de uso:** Incluído exclusivamente em `meu-perfil.html`.

---

#### `faq.js`
- **Função:** Adiciona interatividade ao componente de acordeão (accordion) na página de FAQ.
- **Principais funcionalidades:**
  - Permite expandir/recolher as respostas ao clicar nas perguntas.
  - Garante que apenas uma resposta fique aberta por vez (comportamento de acordeão).
  - Atualiza atributos ARIA (`aria-expanded`, `aria-hidden`) para acessibilidade.
  - Controla a altura máxima do conteúdo para criar o efeito de animação de abertura/fechamento.
- **Exemplo de uso:** Incluído exclusivamente em `faq.html`.

---

#### `contato.js`
- **Função:** Gerencia a interatividade do formulário de contato na página `contato.html`.
- **Principais funcionalidades:**
  - Previne o envio padrão do formulário.
  - Realiza uma validação básica dos campos (embora o HTML já use `required`).
  - Simula o envio da mensagem.
  - Exibe uma mensagem de feedback de sucesso para o usuário.
  - Limpa o formulário após o envio simulado.
  - Remove a mensagem de feedback após alguns segundos.
- **Exemplo de uso:** Incluído exclusivamente em `contato.html`.

---

#### `autocuidado.js`
- **Função:** Controla as funcionalidades interativas da página `autocuidado.html`, incluindo o exercício de respiração guiada, o sistema de abas para técnicas por tipo de desastre e animações de scroll.
- **Principais funcionalidades:**
  - **Exercício de Respiração:**
    - Gerencia o ciclo de inspiração, segurar e expiração com tempos definidos.
    - Controla a animação visual de um círculo que representa a respiração.
    - Atualiza as instruções de texto (`Inspire`, `Segure`, `Expire`).
    - Exibe um timer para cada fase da respiração.
    - Permite iniciar e parar o exercício.
  - **Sistema de Abas (Técnicas por Desastre):**
    - Permite alternar entre diferentes conteúdos (técnicas específicas para incêndios, inundações, deslizamentos) clicando nos botões de aba.
    - Garante acessibilidade (atributos ARIA).
    - Ativa a primeira aba por padrão ou a aba previamente selecionada.
  - **Animação de Scroll (`scroll-fade-in`):**
    - Utiliza `IntersectionObserver` para aplicar uma animação de fade-in a elementos quando eles se tornam visíveis no viewport durante a rolagem da página.
- **Exemplo de uso:** Incluído exclusivamente em `autocuidado.html`.

---

#### `diario-usuario.js`
- **Função:** Gerencia toda a lógica do diário emocional do usuário na página `diario-usuario.html`.
- **Principais funcionalidades:**
  - `carregarEntradas()`: Carrega e exibe as entradas do diário do usuário logado, armazenadas no `localStorage`. As entradas são ordenadas da mais recente para a mais antiga.
  - `salvarNovaEntrada()`: Coleta dados do formulário de nova entrada (data, título, texto, emoção), salva a nova entrada no `localStorage` associada ao usuário logado e atualiza a exibição.
  - `excluirEntrada(idEntrada)`: Remove uma entrada específica do diário do usuário no `localStorage` e atualiza a exibição.
  - Define a data atual por padrão no campo de data do formulário.
  - Previne XSS básico ao exibir os textos das entradas utilizando uma função `escapeHtml`.
- **Dependências:** Utiliza `getUsuarioLogadoEmail()` do `dados-usuarios.js`.
- **Exemplo de uso:** Incluído exclusivamente em `diario-usuario.html`.

---

#### `entendendo_emocoes.js`
- **Função:** Controla o formulário interativo de autoavaliação de reações/emoções na página `entendendo_emocoes.html`.
- **Principais funcionalidades:**
  - `setupReflexionForm()`: Inicializa o formulário.
  - `updateReflexionFeedback()`:
    - Conta quantas caixas de seleção (checkboxes) foram marcadas pelo usuário.
    - Exibe um contador de itens marcados.
    - Apresenta mensagens de feedback personalizadas com base no número de itens marcados, oferecendo orientação e sugestões.
  - O feedback é atualizado dinamicamente conforme o usuário marca ou desmarca os itens.
- **Exemplo de uso:** Incluído exclusivamente em `entendendo_emocoes.html`.

--- 

## 👥 Integrantes da Equipe

<table>
  <tr>
    <th>Foto</th>
    <th>Nome</th>
    <th>RM</th>
    <th>Turma</th>
    <th>GitHub</th>
    <th>LinkedIn</th>
  </tr>
  <tr>
    <td align="center">
      <img src="assets/imagens/imagens-integrantes/foto-enzo.jpeg" width="100px" alt="Foto de Enzo"/>
    </td>
    <td>Enzo Okuizumi</td>
    <td>561432</td>
    <td>1TDSPG</td>
    <td><a href="https://github.com/EnzoOkuizumiFiap">EnzoOkuizumiFiap</a></td>
    <td><a href="https://www.linkedin.com/in/enzo-okuizumi-b60292256/">Enzo Okuizumi</a></td>
  </tr>
  <tr>
    <td align="center">
      <img src="assets/imagens/imagens-integrantes/foto-lucas.jpg" width="100px" alt="Foto de Lucas"/>
    </td>
    <td>Lucas Barros Gouveia</td>
    <td>566422</td>
    <td>1TDSPG</td>
    <td><a href="https://github.com/LuzBGouveia">LuzBGouveia</a></td>
    <td><a href="https://www.linkedin.com/in/luz-barros-gouveia-09b147355/">Lucas Barros Gouveia</a></td>
  </tr>
  <tr>
    <td align="center">
      <img src="assets/imagens/imagens-integrantes/foto-milton.jpeg" width="100px" alt="Foto de Milton"/>
    </td>
    <td>Milton Marcelino</td>
    <td>564836</td>
    <td>1TDSPG</td>
    <td><a href="https://github.com/MiltonMarcelino">MiltonMarcelino</a></td>
    <td><a href="http://linkedin.com/in/milton-marcelino-250298142">Milton Marcelino</a></td>
  </tr>
</table>


## Endereço do Repositório do Projeto no GitHub

[Link Repositório Front-end](https://github.com/Grupo-Challenge-EML-1TDSPG/front-end-design-engineering)

---

**Nota Importante:** O Recomeço se dedica a ser um farol de esperança e um guia com ferramentas valiosas para sua jornada de autocuidado e compreensão emocional após um desastre. Contudo, é crucial lembrar que os recursos aqui disponibilizados são para fins educacionais e de apoio psicossocial, não substituindo o diagnóstico, aconselhamento ou tratamento de um profissional de saúde mental qualificado. Se você está enfrentando uma crise aguda ou sente que precisa de um acompanhamento individualizado, por favor, procure imediatamente um especialista ou os serviços de emergência indicados. Seu bem-estar é a prioridade.
