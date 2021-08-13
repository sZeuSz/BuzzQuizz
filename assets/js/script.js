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

function criarQuiz(){
    console.log("criando quiz...")
    let home = document.querySelector(".home");
    let tela1 = document.querySelector(".tela1.content");

    home.classList.toggle("esconder"); 
    tela1.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}

function criarPerguntas(){
    console.log("criando perguntas...")
    let tela1 = document.querySelector(".tela1.content");
    let tela2 = document.querySelector(".tela2.content");

    tela1.classList.toggle("esconder"); 
    tela2.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}

function criarNiveis(){
    console.log("criando niveas...")
    let tela2 = document.querySelector(".tela2.content");
    let tela3 = document.querySelector(".tela3.content");

    tela2.classList.toggle("esconder"); 
    tela3.classList.toggle("esconder"); 
    window.scrollTo(0, 10);
}
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