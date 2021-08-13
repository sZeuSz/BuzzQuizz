//Inicio Juan

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