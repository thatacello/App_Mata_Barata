var altura = 0
var largura = 0
var vidas = 3
var tempo = 15

//tempo que a barata leva para desaparecer
var criaBarataTempo = 1000

//search retorna somente o que está à direita do ponto de ? na url e o ponto de ?
var nivelEscolhido = window.location.search
//excluindo o ponto de interrogação da url de nivel escolhido
nivelEscolhido = nivelEscolhido.replace('?', '')

if(nivelEscolhido === 'normal'){
    criaBarataTempo = 2000
} else if(nivelEscolhido === 'dificil'){
    criaBarataTempo = 1000
} else if(nivelEscolhido === 'chucknorris'){
    criaBarataTempo = 700
}

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){
    
    tempo--
    if(tempo < 0){
        //pára as funções
        clearInterval(cronometro)
        clearInterval(criaBarata)
        window.location.href="vitoria.html"
    } else {
        //inner é o que está entre as tags
        //nesse caso, a tag é a <span> que possui 'cronometro'
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

function posicaoRandomica(){

    //remover a barata anterior (caso exista)
    if(document.getElementById('barata')){
        document.getElementById('barata').remove()

        if(vidas < 1){
            window.location.href = 'game_over.html'
        } else {
            document.getElementById('v' + vidas).src= "imagens/coracao_vazio.png"
            vidas--
        }
        
    }

    var posicaoX = Math.floor(Math.random() * largura) - 210
    var posicaoY = Math.floor(Math.random() * altura) - 210

    //eliminar a possibilidade de uma posição negativa
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //criar elemento HTML (DOM)
    var barata = document.createElement('img')
    barata.src = 'imagens/barata.png'
    barata.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    barata.style.left = posicaoX + 'px'
    barata.style.top = posicaoY + 'px'
    barata.style.position = 'absolute'
    barata.id = 'barata'
    barata.onclick = function(){
        this.remove() //remove o objeto ao ser clicado
    }

    document.body.appendChild(barata)

}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:
            return 'barata' //return substitui o break
        case 1:
            return 'barata1'
        case 2:
            return 'barata2'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

function iniciarJogo(){
    var nivel = document.getElementById('nivel').value
    
    if(nivel === ''){
        alert('Selecione um nível para iniciar o jogo')
        return false
    }

    window.location.href='app.html?' + nivel //não convencional
}