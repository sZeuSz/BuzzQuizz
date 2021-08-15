//Inicio Juan
const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes"
buscarQuizzes();

function buscarQuizzes (){
    const promise = axios.get(URL_QUIZZES);
    promise.then(renderizarQuizzes)
}

function renderizarQuizzes(resposta){
    // console.log(resposta);

    for (let i=0; i<resposta.data.length; i++){
    let title = resposta.data[i].title;
    let image = resposta.data[i].image;   
    let divDosQuizzes = document.querySelector(".todos-os-quizzes");
    divDosQuizzes.innerHTML+=   
            `<div onclick="abrirQuizz(this)" class="box" id="${i}">
                <div class="background-linear"></div>
                <img src="${image}">
                <p>${title}</p>
            </div>`
    }    
}

//funçao pra mostrar quizzes:
// function abrirQuizz(element){
//     console.log(element);

//     const IDdoQuizz = element.id;
//     const quizzIndividual = listaIdDosQuizzes[IDdoQuizz];
//     const quizzImage = quizzIndividual.image;
//     const quizzTitulo = quizzIndividual.title;


//Fim Juan





//Inicio Roseno
//Formulário 1 Criar Quiz
let tituloDoQuiz;
let tituloUrlDaImagem;
let qtdPerguntas;
let qtdNiveis;
let perguntaAtual = 1;

//Formulário 2 Criar Quiz
let textoPergunta;
let cor;
let respostaCorreta;
let respostaCorretaImagem1;
let respostaIncorreta1;
let respostaIncorreta2;
let respostaIncorreta3;
let respostaIncorretaImagem1;
let respostaIncorretaImagem2;
let respostaIncorretaImagem3;

let pergunta = {
        title: "Título da pergunta 1",
        color: "#123456",
        answers: [
            {
                text: "Texto da resposta 1",
                image: "https://http.cat/411.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Texto da resposta 2",
                image: "https://http.cat/412.jpg",
                isCorrectAnswer: false
            }
        ]
    }
let nivel = {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
    }
let quiz = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: []
		}],
    levels: []
    }

function criarQuiz(){
    console.log("criando quiz...")
    let home = document.querySelector(".home");
    let tela1 = document.querySelector(".tela1.content");

    home.classList.toggle("esconder"); 
    tela1.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}

/*Funções tela1 de criar Quiz */
function renderizarCriacaoDePerguntas(){
    let perguntasForms = document.querySelector(".tela2.content .perguntas");
    qtdPerguntas = 3//apague
    for(let i = 2; i <= qtdPerguntas; i++){

        perguntasForms.innerHTML += `<div class="alinha ${i}"> 
                                        <h1 class="exemplo">Pergunta ${i}</h1>
                                        <img onclick="novaPergunta(this);" class="icone" src="assets/imagens/Vector.png" alt="Icone de inserir pergunta">
                                    </div>`
    }
}

function ehQuizzInvalido(){
    let invalida = false;
    let tituloQuiz = document.querySelector(".titulo");
    let urlImagem = document.querySelector(".url-imagem")
    qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    qtdNiveis = document.querySelector(".qtd-niveis").value;
    
    const ehUrlValida = function (string){
        try { return Boolean(new URL(string)); }
        catch(e){ invalid = true; return false; }
    }

    if(tituloQuiz.value.length < 20 || tituloQuiz.value.length > 65){
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres")
        invalida = true;
        return true;
    }

    if(ehUrlValida(urlImagem.value) === false){
        alert("A url da Imagem deve ter formato de URL")
        invalida = true;
        return true;
    }
    if(qtdPerguntas < 3){
        alert("A quantidade de perguntas deve ter no mínimo 3 perguntas")
        invalida = true;
        return true;
    }

    if(qtdNiveis < 2){
        alert("A quantidade de níveis deve ter no mínimo 2 níveis")
        invalida = true;
        return true;
    }

    tituloDoQuiz = tituloQuiz.value;
    tituloUrlDaImagem = urlImagem.value;

    quiz.title = tituloQuiz.value;
    quiz.image = urlImagem.value;

    
    console.log("salvou todas, passou");
    console.log("titulo do quiz: ", tituloDoQuiz);
    console.log("url imagem do quiz: ", tituloUrlDaImagem);
    console.log("quantidade de perguntas do quiz: ", qtdPerguntas);
    console.log("quantidade de níveis do quiz: ", qtdNiveis);

    console.log(quiz);

    //return invalida;
    return false;
}

function criarPerguntas(){

    if(ehQuizzInvalido()){
        return;
    }
    


    console.log("criando perguntas...")
    let tela1 = document.querySelector(".tela1.content");
    let tela2 = document.querySelector(".tela2.content");

    tela1.classList.toggle("esconder"); 
    tela2.classList.toggle("esconder"); 

    window.scrollTo(0, 10);

    renderizarCriacaoDePerguntas();
}
/*Fim funções tela1 de criar Quiz */

/*Inicio funções tela 2 de criar Quiz */
function novaPergunta(elemento){
    let numeroDaPergunta = elemento.parentNode.classList[1];
    console.log(elemento.parentNode.classList)
    elemento.parentNode.classList.remove("alinha");
    elemento.parentNode.classList.remove(`${numeroDaPergunta}`);
    

    elemento.parentNode.classList.add(`pergunta`);
    elemento.parentNode.classList.add(`pergunta-${numeroDaPergunta}`);

    elemento.parentNode.innerHTML = `<h1 class="question">Pergunta ${numeroDaPergunta}</h1>
                                    <input class="texto" type="text" placeholder="Texto da pergunta">
                                    <input class="cor-fundo" type="text" placeholder="Cor de fundo da pergunta (Hexadecimal)">

                                    <h1 class="question">Resposta correta</h1>
                                    <input class="resposta-correta" type="text" placeholder="Resposta correta">
                                    <input class="ultimo resposta-correta-url-imagem" type="text" placeholder="URL da imagem">

                                    <h1 class="question">Respostas incorretas</h1>
                                    <input class="resposta-incorreta-1" type="text" placeholder="Resposta incorreta 1">
                                    <input class="ultimo resposta-incorreta-url-1" type="text" placeholder="URL da imagem 1">
                                    <input class="resposta-incorreta-2" type="text" placeholder="Resposta incorreta 2">
                                    <input class="ultimo resposta-incorreta-url-2" type="text" placeholder="URL da imagem 2">
                                    <input class="resposta-incorreta-3" type="text" placeholder="Resposta incorreta 3">
                                    <input class="ultimo resposta-incorreta-url-3" type="text" placeholder="URL da imagem 3">
                                    `
    
}
// #6char
// #FAFAFA
function ehHexadecimal(string) {
    if(string[0] === "#" && string.length === 7){

        string = string.substring(1);
        
        let decimal = parseInt(string, 16);
                
        if(decimal.toString(16) === string.toLowerCase()){
            console.log("se liga, e decimal", decimal.toString(16), " ->> ", string.toLowerCase());
            return true;
        }
    }

    return false;
}
const ehUrlValida = function (string){
    try { return Boolean(new URL(string)); }
    catch(e){ invalid = true; return false; }
}
function temRespostasValidas(r, img, r1, img1, r2, img2, r3, img3){
    let incorretas = 0;
    console.log(r, img)

    console.log(r1, img1)
    console.log(r2, img2)
    console.log(r3, img3)

    const ehUrlValida = function (string){
        try { return Boolean(new URL(string)); }
        catch(e){ invalid = true; return false; }
    }

    if(r === "" || r.replaceAll(" ", "") === ""){
        alert("É obrigatória a inserção da resposta correta.")
        return false;
    }

    if(!ehUrlValida(img)){
        alert("A url da imagem de resposta correta deve ter formato de url");
        return false;
    }
    //Ter de 2 à 3 respostas incorretas
    if(r1.replaceAll(" ", "").length != 0 && (img1.replaceAll(" ", "").length != 0 && ehUrlValida(img1))){incorretas++} 
    if(r2.replaceAll(" ", "").length != 0 && (img2.replaceAll(" ", "").length != 0 && ehUrlValida(img2))){incorretas++}
    if(r3.replaceAll(" ", "").length != 0 && (img3.replaceAll(" ", "").length != 0 && ehUrlValida(img3))){incorretas++}
    
    console.log(incorretas)

    if(incorretas >= 1){
        return true;
    }
    else{
        alert("É obrigatória a inserção de pelo menos 1 resposta errada.");
        alert("As url de imagens devem ter formato de url");
        return false;
    }

    
    return true;
}

function ehPerguntaValida(perguntaTexto){
    if(perguntaTexto.length < 20 || perguntaTexto.replaceAll(" ", "").length === 0){
        alert("O texto da pergunta deve ter no mínimo 20 caracteres")
        return false;
    }

    return true;
}
function renderizarCriacaoDeNiveis(){
    let niveisForms = document.querySelector(".tela3.content .niveis");

    for(let i = 2; i <= qtdNiveis; i++){

        niveisForms.innerHTML +=`<div class="alinha ${i}"> 
                                    <h1 class="exemplo">Nível ${i}</h1>
                                    <img onclick="novoNivel(this);" class="icone" src="assets/imagens/Vector.png" alt="Icone de inserir nivel">
                                </div>
                                    `
    }
}

function saoPerguntasInvalidas(){

    let perguntas = [];

    for(let i = 1; i <= qtdPerguntas; i++){

        if(document.querySelector(`.pergunta-${i}`) === null){
            alert("É obrigatório o preenchimento de cada pergunta")
            return true;
        }
        let perguntaTexto = document.querySelector(`.pergunta-${i} .texto`);
        let cor = document.querySelector(`.pergunta-${i} .cor-fundo`);
        let respostaCorreta = document.querySelector(`.pergunta-${i} .resposta-correta`);
        let imagemRespostaCorretaUrl = document.querySelector(`.pergunta-${i} .resposta-correta-url-imagem`);
        let respostaIncorreta1 = document.querySelector(`.pergunta-${i} .resposta-incorreta-1`);
        let respostaIncorretaImage1 = document.querySelector(`.pergunta-${i} .resposta-incorreta-url-1`);
        let respostaIncorreta2 = document.querySelector(`.pergunta-${i} .resposta-incorreta-2`);
        let respostaIncorretaImage2 = document.querySelector(`.pergunta-${i} .resposta-incorreta-url-2`);
        let respostaIncorreta3 = document.querySelector(`.pergunta-${i} .resposta-incorreta-3`);
        let respostaIncorretaImage3 = document.querySelector(`.pergunta-${i} .resposta-incorreta-url-3`);
        console.log("i ->>> ", i)
        console.log(perguntaTexto, cor, respostaCorreta, imagemRespostaCorretaUrl, respostaIncorreta1, respostaIncorretaImage1);

        if(!ehPerguntaValida(perguntaTexto.value)){
            console.log("Pergunta invalida");
            return true;
        }
        if(!ehHexadecimal(cor.value)){
            alert("A cor de fundo deve ser uma cor em hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)")
            return true;
        }
        if(!temRespostasValidas(respostaCorreta.value, imagemRespostaCorretaUrl.value, respostaIncorreta1.value, respostaIncorretaImage1.value, respostaIncorreta2.value, respostaIncorretaImage2.value, respostaIncorreta3.value, respostaIncorretaImage3.value)){
            console.log("As respostas estão invalidas");
            return true;
        }

        let respostas = [{
                text: respostaCorreta.value,
                image: imagemRespostaCorretaUrl.value,
                isCorrectAnswer: true
            }]

        if(respostaIncorreta1.value.replaceAll(" ", "").length != 0 && (respostaIncorretaImage1.value.replaceAll(" ", "").length != 0 && ehUrlValida(respostaIncorretaImage1.value))){
            respostas.push({
                text: respostaIncorreta1.value,
                image: respostaIncorretaImage1.value,
                isCorrectAnswer: false
            }); //Debugger
            console.log("sim")
        } 
        if(respostaIncorreta2.value.replaceAll(" ", "").length != 0 && (respostaIncorretaImage2.value.replaceAll(" ", "").length != 0 && ehUrlValida(respostaIncorretaImage2.value))){
            respostas.push({
                text: respostaIncorreta2.value,
                image: respostaIncorretaImage2.value,
                isCorrectAnswer: false
            });//Debugger
            console.log("sim")
        }
        if(respostaIncorreta3.value.replaceAll(" ", "").length != 0 && (respostaIncorretaImage3.value.replaceAll(" ", "").length != 0 && ehUrlValida(respostaIncorretaImage3.value))){
            respostas.push({
                text: respostaIncorreta3.value,
                image: respostaIncorretaImage3.value,
                isCorrectAnswer: false
            });//Debugger
            console.log("sim")
        }

        let pergunta = {
            title: perguntaTexto.value,
            color: cor.value,
            answers: respostas
        }

        perguntas.push(pergunta);
    }  
    console.log("passou");
    console.log(perguntas)
    quiz.questions = perguntas;
    console.log("QUIZ pos TELA 2");
    console.log(quiz)
    return false;
}

function criarNiveis(){
    if(saoPerguntasInvalidas()){
        return;
    }
    console.log("paaxoo")
    console.log("criando niveis...")
    let tela2 = document.querySelector(".tela2.content");
    let tela3 = document.querySelector(".tela3.content");

    tela2.classList.toggle("esconder"); 
    tela3.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
    renderizarCriacaoDeNiveis();
}
/*fim funções tela 2 de criar Quiz */

/*Inicio tela 3 de Criar Quizz */
function novoNivel(elemento){
    let numeroDoNivel = elemento.parentNode.classList[1];
    
    console.log(elemento.parentNode.classList)
    elemento.parentNode.classList.remove("alinha");
    elemento.parentNode.classList.remove(`${numeroDoNivel}`);
    

    elemento.parentNode.classList.add(`pergunta`);
    elemento.parentNode.classList.add(`nivel-${numeroDoNivel}`);
    
    elemento.parentNode.innerHTML = `<h1 class="question">Nível ${numeroDoNivel}</h1>
                                    <input class="titulo-nivel" type="text" placeholder="Título do nível">
                                    <input class="acerto-minimo" type="text" placeholder="% de acerto mínima">

                                    <input class="url-imagem-nivel" type="text" placeholder="URL da imagem do nível">
                                    <input class="descricao ultimo" type="text" placeholder="Descrição do nível">
                                    `
    
}

function ehNivelValido(){  
    let niveis = [];
    let temMinimoZero = false;

    const ehUrlValida = function (string){
        try { return Boolean(new URL(string)); }
        catch(e){ invalid = true; return false; }
    }
    
    for(let i = 1; i <= qtdNiveis; i++){ 

        if(document.querySelector(`.nivel-${i}`) === null){
            alert("É obrigatório o preenchimento de cada nível");
            return;
        }

        let tituloNivel = document.querySelector(`.nivel-${i} .titulo-nivel`);
        let acertoMinimo = document.querySelector(`.nivel-${i} .acerto-minimo`);
        let urlImagemNivel = document.querySelector(`.nivel-${i} .url-imagem-nivel`);
        let descricaoNivel = document.querySelector(`.nivel-${i} .descricao`);
        
        console.log(tituloNivel.value, acertoMinimo.value, urlImagemNivel.value, descricaoNivel.value);

        if(tituloNivel.value.length < 10){
            alert("O título do nível deve ter mínimo de 10 caracteres");
            return false;
        }
        if(Number(acertoMinimo.value) < 0 || Number(acertoMinimo.value) > 100 || acertoMinimo.value === ""){
            alert("A % de acerto mínima deve ser um número entre 0 e 100");
            return false;
        }
        if(!ehUrlValida(urlImagemNivel.value) || urlImagemNivel.value.replaceAll(" ", "") === ""){
            alert("A URL da imagem do nível deve ter formato de URL");
            return false;
        }
        if(descricaoNivel.value.length < 30){
            alert("A descrição do nível deve ter no mínimo de 30 caracteres");
            return false;
        }
        if(Number(acertoMinimo.value) === 0){
            temMinimoZero = true;
        }

        let nivel = {
            title: tituloNivel.value,
            image: urlImagemNivel.value,
            text: descricaoNivel.value,
            minValue: Number(acertoMinimo.value)
        }

        niveis.push(nivel);
        
    }//VOcê está aqui

    if(!temMinimoZero){
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%")
        return false;
    }

    quiz.levels = niveis;
    console.log("passou nos níveis")
    console.log("Quiz pos levels")
    console.log(quiz)
    return true;
}
function finalizarQuiz(){
    //validação
    if(ehNivelValido()){

        const promise = axios.post(URL_QUIZZES, quiz);
        promise.then(SucessoAoPostarQuiz);
        promise.catch(ErroAoPostarQuiz);
        console.log("Finalizando quiz...")
    }
    return;
}

function SucessoAoPostarQuiz(sucesso){
    console.log("O Post foi um sucesso meu babyssauro, bora fazer todo o processo")
    let tela2 = document.querySelector(".tela3.content");
    let tela4 = document.querySelector(".tela4");

    //debbug cout << "Fully".around()
    tela2.classList.toggle("esconder"); 
    tela4.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
    console.log(sucesso);
}
function ErroAoPostarQuiz(erro){
    console.log(erro.response.status);
    alert("deu bug no servidor, programei errado")
}
function postarQuiz(){

}
/*Inicio tela 3 de Criar Quizz */
function voltarParaHome(){
    console.log("Voltando para tela inicial...")
    let tela4 = document.querySelector(".tela4");
    let home = document.querySelector(".home");

    tela4.classList.toggle("esconder"); 
    home.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}

//Fim Roseno