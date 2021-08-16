//Inicio Juan
const URL_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes"

buscarQuizzes();


function buscarQuizzes (){
    const promise = axios.get(URL_QUIZZES);
    promise.then(renderizarQuizzes);
}

function renderizarQuizzes(resposta){
    let QuizUsuario = JSON.parse(localStorage.getItem("ids"));
    for (let i=0; i<resposta.data.length; i++){
        let title = resposta.data[i].title;
        let image = resposta.data[i].image;
        let id = resposta.data[i].id   
        let divDosQuizzes = document.querySelector(".container:not(.user) .todos-os-quizzes");
        if(QuizUsuario.map(function(quiz) {return quiz.id;}).indexOf(id) === -1){
            divDosQuizzes.innerHTML+=   
                `<div onclick="urlDosIDs(this),esconderTela()" class="box" id="${id}">
                    <div class="background-linear"></div>
                    <img src="${image}">
                    <p>${title}</p>
                </div>`
        }
    }
}

function esconderTela(){
    document.querySelector(".home").classList.toggle("esconder");
    document.querySelector(".pagina-de-um-quizz").classList.toggle("esconder");
}



//funçao pra mostrar quizzes:
function urlDosIDs(elemento){
    const promise = axios.get(URL_QUIZZES + "/" + elemento.id);
    promise.then(abrirQuizz);
}


let arrayDasRespostas = [];
let arrayLevels;
function abrirQuizz(respostaIndividual){
    const quizzIndividual = respostaIndividual.data;
    const quizId = quizzIndividual.id;
    const quizzImage = quizzIndividual.image;
    const quizzTitle = quizzIndividual.title;
    let arrayQuestions = quizzIndividual.questions;
    console.log(quizzIndividual.levels)
    arrayLevels = quizzIndividual.levels;
    const imageLevel = arrayLevels.image;       
    const minValueLevel = arrayLevels.minValue;
    const textLevel = arrayLevels.text;  
    const titleLevel = arrayLevels.title;
    
    document.querySelector(".pagina-de-um-quizz").innerHTML =   `<div                                    
                                                                class="foto-de-capa-quizz">
                                                                <img src="${quizzImage}"><p>${quizzTitle}</p>
                                                                </div>`
    
    
    console.log(arrayQuestions.length)
    for (let i=0; i< arrayQuestions.length; i++){
        console.log("debugger")
        let questionTitle = arrayQuestions[i].title;
        let questionColor = arrayQuestions[i].color;
        
        let lugarDaPergunta = document.querySelector(".pagina-de-um-quizz");
        lugarDaPergunta.innerHTML += `<div class="caixa-com-pergunta-e-opcao">
                                        <div class="topo-pergunta" style="background-color: ${questionColor}" >
                                        <p>${questionTitle}</p>
                                        </div>
                                        <div class="div-das-respostas div-das-respostas-${i}"></div>
                                      </div>`
    //CRIAÇAO DO LEVEL
    //<template <string>>
    //FIM DA CRIAÇÃO DO LEVEL
            arrayQuestions[i].answers.sort(comparador);

            for (let index=0; index<arrayQuestions[i].answers.length; index++){
                let resposta = arrayQuestions[i].answers[index].text;
                let imagem = arrayQuestions[i].answers[index].image;
                let ehRespostaCorreta = arrayQuestions[i].answers[index].isCorrectAnswer;
 
                let lugarDasRespostas = document.querySelector(`.div-das-respostas-${i}`); 
                 
                 lugarDasRespostas.innerHTML += 
                                                `<div class="box-das-respostas box-das-respostas-${i}${index}" onclick="tentarAcertar(this)"id="${i}${index}"><img src="${imagem}"><p>${resposta}</p></div>`

                let boxDaResposta = document.querySelector(`.box-das-respostas-${i}${index}`);
                if(ehRespostaCorreta === true){
                    boxDaResposta.classList.add("acertou");
                }else{
                    boxDaResposta.classList.add("errou");
                }
            }
    }
}
       
function comparador() { 
    return Math.random() - 0.5; 
};

let contadorAcertos = 0;
let contadorErros = 0;
let resultadoFinal = 0;
let divPai;
let levelResposta;
function tentarAcertar(element){
    divPai = element.parentNode;
    let todasAsBoxDaquelePai = divPai.childNodes;
    element.classList.toggle("opacidade");
    console.log(todasAsBoxDaquelePai)
    let testeScroll = document.querySelector('.div-das-respostas')
    
    if (element.classList.contains("acertou")){
        contadorAcertos++
    } else{
        contadorErros++
    }
    
    for(i=0; i<todasAsBoxDaquelePai.length; i++){
        if(todasAsBoxDaquelePai[i].classList.contains("acertou")){
            todasAsBoxDaquelePai[i].classList.add("correta");
            contadorAcertos;
        }
        if(todasAsBoxDaquelePai[i].classList.contains("errou")){
                todasAsBoxDaquelePai[i].classList.add("errada");    
        }
        if(divPai.parentNode.nextElementSibling !== null){
            divPai.parentNode.nextElementSibling.scrollIntoView(
                {block: "end", behavior: "smooth"}
            );
        }
        console.log(divPai.parentNode.nextElementSibling); 
    }
    console.log(element.classList)    
    quantoTaPlacar();

    //<template String>
}

function quantoTaPlacar(){
    let pegardivAvo = divPai.parentNode.parentNode;
    let contadorDePerguntas = pegardivAvo.childNodes.length-1;
    console.log(contadorDePerguntas)
    if(contadorAcertos + contadorErros === contadorDePerguntas){     ///contador-1 por que?
        console.log("RESPONDEU TUDO")
        console.log('o número de acertos foi: '+contadorAcertos);
        console.log('o número de erros foi: '+contadorErros);
        let porcentagem = (contadorAcertos/(contadorAcertos+contadorErros)*100); //que viaji é essa mermão
        porcentagem = (contadorAcertos/contadorDePerguntas) * 100; //debugg
        resultadoFinal = Math.ceil(porcentagem); //arredondar pra cima
        console.log("poerc- >>> ", porcentagem);
        console.log("result final ->>>",resultadoFinal);

        setTimeout(() => {
            AparecerNivel();
        }, 2000);
    }
}

function AparecerNivel (){
    console.log("finalmente posso aparecer");
    let lugarDaPergunta = document.querySelector(".pagina-de-um-quizz");
    console.log(lugarDaPergunta)    
    /*
    lugarDaPergunta.innerHTML += `<div class="caixa-com-pergunta-e-opcao">
                                    <div class="topo-porcentagem-nivel" style="background-color: #000000"" >
                                    <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p>
                                    </div>
                                    <div class="div-do-nivel">
                                            <img src="https://www.clubeparacachorros.com.br/wp-content/uploads/2018/07/cachorro-fofo-beagle-curioso.jpg" alt="imagem-do-nivel">
                                            <span class="descricao-do-nivel">Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.</span>
                                    </div>
                                </div>
                                `
    */
    console.log(resultadoFinal);
    console.log(typeof(resultadoFinal));
    let melhorNivel = resultadoFinal;
    let posicaoCerta = 0;
    for(let i = 0; i < arrayLevels.length; i++){
        console.log(arrayLevels[i]);
        console.log(arrayLevels[i].minValue);
        if(melhorNivel >= arrayLevels[i].minValue){
            console.log(melhorNivel, "aquiiii")
            // melhorNivel = arrayLevels[i].minValue;
            posicaoCerta = i;
        }
    }
    console.log(melhorNivel, posicaoCerta);
    lugarDaPergunta.innerHTML += `<div class="caixa-com-pergunta-e-opcao">
                                    <div class="topo-porcentagem-nivel" style="background-color: #000000"" >
                                    <p>${resultadoFinal}% de acerto: ${arrayLevels[posicaoCerta].title}</p>
                                    </div>
                                    <div class="div-do-nivel">
                                            <img src="${arrayLevels[posicaoCerta].image}" alt="imagem-do-nivel">
                                            <span class="descricao-do-nivel">${arrayLevels[posicaoCerta].text}</span>
                                    </div>
                                </div>
                                `
    document.querySelector(".pagina-de-um-quizz").scrollIntoView({block: "end", behavior: "smooth"});
}
/*Template <string> cin >> File.open(`dc.cpp`) 


*/
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

//

//Listando Quizzes do Usuário
let listaDeIdsDosQuizzesDoUsuario;
let listaDeIdsSerializados;

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
    qtdPerguntas = Number(document.querySelector(".qtd-perguntas").value);
    qtdNiveis = Number(document.querySelector(".qtd-niveis").value);
    
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
    if(qtdPerguntas < 3 || isNaN(qtdPerguntas)){
        alert("A quantidade de perguntas deve ter no mínimo 3 perguntas")
        invalida = true;
        return true;
    }

    if(qtdNiveis < 2 || isNaN(qtdNiveis)){
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
// #000000 -> false debugger

function ehHexadecimal(string) {
    if(string[0] === "#" && string.length === 7){
        return (typeof string === "string") && string.substring(1).length === 6 
           && !isNaN(parseInt(string.substring(1), 16));
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
        if(Number(acertoMinimo.value) < 0 || Number(acertoMinimo.value) > 100 || acertoMinimo.value === "" || isNaN(parseInt(acertoMinimo.value))){
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

function acessarQuiz(elemento){
    document.querySelector(".tela4").classList.toggle("esconder");
    document.querySelector(".pagina-de-um-quizz").classList.remove("esconder");
    urlDosIDs(elemento);
}

function SucessoAoPostarQuiz(sucesso){
    console.log("O Post foi um sucesso meu babyssauro, bora fazer todo o processo")
    let tela3 = document.querySelector(".tela3.content");
    let tela4 = document.querySelector(".tela4");

    //debbug cout << "Fully".around()
    tela3.classList.toggle("esconder"); 
    tela4.classList.toggle("esconder"); 

    console.log(tela4.innerHTML);

    tela4.innerHTML = "";
    
    tela4.innerHTML += `<div class="tela11">
                            <p class="titulo-desktop11">Seu quizz está pronto!</p>
                            <div class="box11" onclick="acessarQuiz(this)" id="${sucesso.data.id}" >
                                <div class="background-linear11"></div>
                                <div class="icones-opcoes-modificacao"></div>
                                <img src="${sucesso.data.image}">
                                <p>${sucesso.data.title}</p>
                            </div>
                            <button type="button" onclick="acessarQuiz(this)" id="${sucesso.data.id}" class="button11">Acessar Quizz</button>
                            <p class="voltar-home11" onclick="voltarParaHome();">Voltar pra home</p>
                        </div>`

    let listaDeIdsDoUsuario = localStorage.getItem("ids");

    if(listaDeIdsDoUsuario === null){
        listaDeIdsDoUsuario = [{id: sucesso.data.id, key:sucesso.data.key}];
        listaDeIdsDoUsuario = JSON.stringify(listaDeIdsDoUsuario);
        localStorage.setItem("ids", listaDeIdsDoUsuario);
    }
    else{
        listaDeIdsDoUsuario = JSON.parse(listaDeIdsDoUsuario);
        listaDeIdsDoUsuario.push({id: sucesso.data.id, key:sucesso.data.key});
        listaDeIdsDoUsuario = JSON.stringify(listaDeIdsDoUsuario);
        localStorage.setItem("ids", listaDeIdsDoUsuario);
    }

    window.scrollTo(0, 10);
    console.log(sucesso);
}
function ErroAoPostarQuiz(erro){
    console.log(erro.response.status);
    alert("deu bug no servidor, programei errado")
    window.location.reload();
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

/*  
    ATENÇÃO NÃO ESQUEÇAM DE JOGAR ESSA FUNÇÃO LÁ PÁ CIMA
    IDEIA => BuscarQuizzesDoUsuário(){
                    (faz o negoico dos ids)
                    chama a ota função de listar todos os outros quizzes
                    BuscarTodosOsQuizzes();
            }
*/
function SucessoAoBuscarQuizzesDoUsuario(sucesso){
    let divDosQuizzes = document.querySelector(".container.user .todos-os-quizzes");
    let QuizzesDoUsuario = localStorage.getItem("ids");
    divDosQuizzes.parentNode.parentNode.classList.remove("esconder");
    QuizzesDoUsuario = JSON.parse(QuizzesDoUsuario);

    let title = sucesso.data.title;
    let image = sucesso.data.image;
    let id = sucesso.data.id   
    divDosQuizzes.innerHTML+=   
            `<div onclick="urlDosIDs(this),esconderTela()" class="box" id="${id}">
                <div class="background-linear"></div>
                <div class="icones-opcoes-modificacao" onclick="antiClick()">
                    <img onclick="testeEdit()" class="icone-editar" src="assets/imagens/Vector.png" alt="Icone de inserir pergunta">
                    <ion-icon onclick="testeDelete()" class="icone-deletar" name="trash-outline"></ion-icon>
                </div>
                <img src="${image}">
                <p>${title}</p>
            </div>`
}
/*testeEDITDELETE cin << debugger << template <string> << Olimpoyy << pair<int , FILE.open()> */
function antiClick(){
    alert("anticlicou");
    esconderTela();
}
function testeEdit(){
    alert("editando")
    esconderTela();
    esconderTela();
    criarQuiz();
}
function testeDelete(){
    confirm("tem certeza que deseja excluir o Quiz?");
    esconderTela();
    esconderTela();
}

function ErroAoBuscarQuizzesDoUsuario(erro){
    if(erro.response.error === 400){
        document.querySelector(".usuario").classList.toggle("esconder")
    }
    console.log("Sem videos do usuario, inicializando tela padron...");
}
function BuscarQuizzesDoUsuário(){
    let QuizzesDoUsuario = localStorage.getItem("ids");
    QuizzesDoUsuario = JSON.parse(QuizzesDoUsuario);

    if(QuizzesDoUsuario === null){
        ErroAoBuscarQuizzesDoUsuario({response:{error:400}});
        console.log("numtem")
        return;
    }

    for(let i = 0; i < QuizzesDoUsuario.length; i++){
        console.log(QuizzesDoUsuario[i].id)
        const promise = axios.get(URL_QUIZZES + "/" + QuizzesDoUsuario[i].id);
        promise.then(SucessoAoBuscarQuizzesDoUsuario);
        promise.catch(ErroAoBuscarQuizzesDoUsuario);
    }
}
BuscarQuizzesDoUsuário();
//Fim Roseno

function debbugerLocalStorage(){

    // cin >> while(File.open());

    // template String < template static >
    
    console.log("teste")

    //let nomes =  ["isso", "aqui", "ehdemais"];
    //nomes = JSON.stringify(nomes);
     /*
    template <typename T>
    class Array {
        private:
        T *ptr;
        int size;
        public:
        Array(T arr[], int s);
        void print();
    };

    template <typename T>
        Array<T>::Array(T arr[], int s) {
            ptr = new T[s];
            size = s;
            for(int i = 0; i < size; i++)
                ptr[i] = arr[i];
            }

    template <typename T>
    void Array<T>::print() {
        for (int i = 0; i < size; i++)
            cout<<" "<<*(ptr + i);
        cout<<endl;
    }*/
    //localStorage.setItem("jj", nomes);
    //localStorage.setItem("jj", '["jubileu"]');
    let nomes = localStorage.getItem("kk");
    let nome = "jubii"
    console.log(nomes)
    if(nomes === null){
        nomes = [nome];
        nomes = JSON.stringify(nomes);
        localStorage.setItem("kk", nomes);
    }
    else{
        nomes = JSON.parse(nomes);
        nomes.push("jujumalvada")
        nomes = JSON.stringify(nomes);
        console.log(nomes)
        localStorage.setItem("kk", nomes);
    }
    console.log(nomes)
    /*
    template <typename T>
    class Array {
        private:
        T *ptr;
        int size;
        public:
        Array(T arr[], int s);
        void print();
    };

    template <typename T>
        Array<T>::Array(T arr[], int s) {
            ptr = new T[s];
            size = s;
            for(int i = 0; i < size; i++)
                ptr[i] = arr[i];
            }

    template <typename T>
    void Array<T>::print() {
        for (int i = 0; i < size; i++)
            cout<<" "<<*(ptr + i);
        cout<<endl;
    }*/
}


// debbugerLocalStorage();


/**
 * 
 * Tentativa de fazer o bônus de deletar usando a sagacidade 
 * 
 * axios.delete(URL, 
 *  {headers: {
 *              Authorization: authorizationToken
 *          }, 
 *      data:{
 *              source: source
 *      }
 *  });
 */


function erroAoDeletarQuiz(error){
    alert("programei errado, disculpe")
}
function SucessoAoDeletarQuiz(){
    console.log("Deletou com sucesso");
    BuscarQuizzesDoUsuário();
}

function deletarQuiz(elemento){

    confirm("Deseja mesmo deletar o Quiz?")

    let QuizUsuario = JSON.parse(localStorage.getItem("ids"));
    let posicaoDoQuiz = QuizUsuario.map(function(quiz) {return quiz.id;}).indexOf(elemento.id);
    console.log("dento -:>>>> ", posicaoDoQuiz)
    console.log("dento -:>>>> ", QuizUsuario[posicaoDoQuiz].key)
    const promise = axios.delete(URL_QUIZZES + "/" + elemento.id, {
        headers:{
                "Secret-Key": QuizUsuario[posicaoDoQuiz].key
        }
    });
    QuizUsuario = QuizUsuario.splice(posicaoDoQuiz);
    QuizUsuario = JSON.stringify(QuizUsuario);
    localStorage.setItem("ids", QuizUsuario);
    
    promise.then(SucessoAoDeletarQuiz);
    promise.catch(erroAoDeletarQuiz);
}
// deletarQuiz({id:305, key: "da7b7380-9067-4e3c-b8f7-161e5304a588"})
/* 
<template> debuuger > pair<pair<pair<int>,<int> bugg>
let QuizUsuario = JSON.parse(localStorage.getItem("ids"));
console.log(QuizUsuario[0])
console.log( QuizUsuario.indexOf({"id":305}))
console.log(QuizUsuario.map(function(e) { return e.id; }).indexOf(305));
console.log(localStorage.getItem("ids"));
console.log(JSON.parse(localStorage.getItem("ids"))[2]);
*/