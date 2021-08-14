//Inicio Juan

//Fim Juan


//Inicio Roseno
let qtdPerguntas = 3;
let qtdNiveis;
let perguntaAtual = 1;

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
    qtdNiveis = document.querySelector(".qtd-niveis");
    
    const ehUrlValida = function (string){
        try { return Boolean(new URL(string)); }
        catch(e){ invalid = true; return false; }
    }

    if(tituloQuiz.value.length < 20 || tituloQuiz.value.length > 65){
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres")
        invalida = true;
    }

    if(ehUrlValida(urlImagem.value) === false){
        alert("A url da Imagem deve ter formato de URL")
        invalida = true;
    }
    if(qtdPerguntas < 3){
        alert("A quantidade de perguntas deve ter no mínimo 3 perguntas")
        invalida = true;
    }

    if(qtdNiveis.value < 2){
        alert("A quantidade de níveis deve ter no mínimo 2 níveis")
        invalida = true;
    }

    return invalida;
}

function criarPerguntas(){

    // if(ehQuizzInvalido()){

    //     return;
    // }
    
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
    elemento.parentNode.classList.remove("alinha");
    elemento.parentNode.classList.remove(`${numeroDaPergunta}`);
    

    elemento.parentNode.classList.add(`pergunta`);
    elemento.parentNode.classList.add(`pergunta-${numeroDaPergunta}`);

    /*
    elemento.parentNode.innerHTML = `<div class="pergunta ${numeroDaPergunta}">
                                        <h1 class="question">Pergunta ${numeroDaPergunta}</h1>
                                        <input class="texto" type="text" placeholder="Texto da pergunta">
                                        <input class="cor-fundo" type="text" placeholder="Cor de fundo da pergunta">

                                        <h1 class="question">Resposta correta</h1>
                                        <input class="" type="text" placeholder="Resposta correta">
                                        <input class="ultimo" type="text" placeholder="URL da imagem">

                                        <h1 class="question">Respostas incorretas</h1>
                                        <input class="" type="text" placeholder="Resposta incorreta 1">
                                        <input class="ultimo" type="text" placeholder="URL da imagem 1">
                                        <input class="" type="text" placeholder="Resposta incorreta 2">
                                        <input class="ultimo" type="text" placeholder="URL da imagem 2">
                                        <input class="" type="text" placeholder="Resposta incorreta 3">
                                        <input class="ultimo" type="text" placeholder="URL da imagem 3">
                                    </div>`
    */
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

    if(r1.replaceAll(" ", "").length != 0 && (img1.replaceAll(" ", "").length != 0 && ehUrlValida(img1))){incorretas++} 
    if(r2.replaceAll(" ", "").length != 0 && (img2.replaceAll(" ", "").length != 0 && ehUrlValida(img2))){incorretas++}
    if(r3.replaceAll(" ", "").length != 0 && (img3.replaceAll(" ", "").length != 0 && ehUrlValida(img3))){incorretas++}
    
    console.log(incorretas)

    if(incorretas >= 1){
        alert("pode dale negçao");
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

function criarNiveis(){
    //validação
    for(let i = 2; i <= qtdPerguntas; i++){

        if(document.querySelector(`.pergunta-${i}`) === null){
            alert("É obrigatório o preenchimento de cada pergunta")
            return;
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

        /*if(perguntaTexto.value.length < 20){
            alert("O texto da pergunta deve ter no mínimo 20 caracteres");
        }*/
        if(!ehPerguntaValida(perguntaTexto.value)){
            console.log("Pergunta invalida");
            return;
        }
        if(!ehHexadecimal(cor.value)){
            alert("A cor de fundo deve ser uma cor em hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)")
            return;
        }
        if(!temRespostasValidas(respostaCorreta.value, imagemRespostaCorretaUrl.value, respostaIncorreta1.value, respostaIncorretaImage1.value, respostaIncorreta2.value, respostaIncorretaImage2.value, respostaIncorreta3.value, respostaIncorretaImage3.value)){
            console.log("As respostas estão invalidas");
            return;
        }
    }  
    //fim validação

    console.log("paaxoo")
    console.log("criando niveas...")
    let tela2 = document.querySelector(".tela2.content");
    let tela3 = document.querySelector(".tela3.content");

    tela2.classList.toggle("esconder"); 
    tela3.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}
/*fim funções tela 2 de criar Quiz */

function finalizarQuiz(){
    console.log("Finalizando quiz...")
    let tela2 = document.querySelector(".tela3.content");
    let tela4 = document.querySelector(".tela4");

    tela2.classList.toggle("esconder"); 
    tela4.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}
function voltarParaHome(){
    console.log("Voltando para tela inicial...")
    let tela4 = document.querySelector(".tela4");
    let home = document.querySelector(".home");

    tela4.classList.toggle("esconder"); 
    home.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}

//Fim Roseno