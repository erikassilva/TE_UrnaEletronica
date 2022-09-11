//Criação das Variáveis de Ambiente
let seuVotoPara = document.querySelector('.estrutura-1-l1 span');
let cargo = document.querySelector('.estrutura-1-l2 span');
let descricao = document.querySelector('.estrutura-1-l4');
let aviso = document.querySelector('.estrutura-2');
let lateral = document.querySelector('.estrutura-1-right');
let numeros = document.querySelector('.estrutura-1-l3');
let numero = '';
let votoNulo = false;
let votos = [];

function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter(function(item){ //buscando candidato
        if(item.numero == numero)
            return true;
        else
            return false;
    });
    if (candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}<br />`;
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            fotosHtml += `<div class="estrutura-1-r1"><img src="img/${candidato.fotos[i].URL}" alt=""/>${candidato.fotos[i].legenda}</figure></div>`;
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class ="aviso--grande pisca"> VOTO NULO</div>'
        votoNulo = true;
    }

}
function clicou(n) {
    let digNumero = document.querySelector('.numero.pisca');
    if (digNumero != null){ 
        digNumero.innerHTML = n; 
        numero = `${numero}${n}`; //concatenação
        digNumero.classList.remove('pisca');
        if(digNumero.nextElementSibling != null) //verifica se há algum elemento após o anterior
            digNumero.nextElementSibling.classList.add('pisca'); //verifica se são similares à classe e adiciona a classe pisca
        else
            atualizarInterface(); //valida numeros
    }
}

//Identificação da Etapa Atual
let etapaAtual = 0;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = ''; //inicialização da variável
    votoBranco = false; //inicialização da variável
    votoNulo = false; //inicialização da variável
    for(let count=0; count < etapa.numeros; count++){
        if(count == 0)
            numeroHtml += '<div class="numero pisca"></div>';
        else
            numeroHtml += '<div class="numero"></div>';
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
comecarEtapa();

function corrige() {
    comecarEtapa();
}

function branco() {
    if (numero == '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class ="aviso--grande pisca"> VOTO BRANCO</div>';
    }
    else
        alert("Para votar BRANCO não pode haver nenhum número digitado");
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if (votoBranco) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length == etapa.numeros) {
        votoConfirmado = true;
        if(votoNulo){
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'nulo'
            });
        } else {
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            });
        }
    }
    if (votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] != undefined) { //Inicia a próxima etapa de votação
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class ="aviso--superGrande pisca"> FIM</div>';
            console.log(votos);
        }
    }
}

