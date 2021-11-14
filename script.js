var modal = document.getElementById("modal");

    let qtdHomem = document.getElementById('qtdHomem');
    let qtdMulher = document.getElementById('qtdMulher');
    let qtdCrianca = document.getElementById('qtdCrianca');
    let qtdtempo = document.getElementById('qtdtempo');


  
function calcular(){

    // Verificando se for selecionado algum tipo de carne
    let carnes = document.getElementsByClassName('carne');
    let selecionados = 0;
    for (var i = 0; i < carnes.length; i++){
        if(carnes[i].checked == true){
            selecionados ++;
        }
    }
    
    // verificando se preencheu no minimo um convidado e a duraçao do envento caso algum desses itens nao foram confirmados ele nao segue adiante do programa
    if(qtdHomem.value == "" && qtdMulher.value == "" && qtdCrianca.value == ""){
        alert('Por favor, preencha algum campo de Convidado');
    }else if(qtdtempo.value == ""){
        alert('Por favor, preencha o campo Duração');  
        
    }else if (selecionados == 0){
        alert('Por favor, marque no minimo uma Opção de Carne'); 
    }else {

    // aplicando a propriedade CSS para abrir o modal com resultando     
    modal.style.display = "block";
    document.body.style.overflow = "hidden";


    // iniciando as variaveis para fazer o calculo     
    let homens = parseInt(convidado(qtdHomem.value));
    let mulheres = parseInt(convidado(qtdMulher.value));
    let criancas = parseInt(convidado(qtdCrianca.value));
    let tempo = parseInt(convidado(qtdtempo.value));
    
    // variavel convidados soma todos os convidados preenchido no HTML  
    let convidados = homens + mulheres + criancas;

    // exibição do resultado de total de convidados 
    let tdConvidados = document.getElementById('tdConvidados');
    tdConvidados.innerHTML = `Total de convidados: ${convidados}`;
    
    // exibição do resultado de total de horas 
    let tdTempo = document.getElementById('tdTempo');
    tdTempo.innerHTML = `Duração do seu churracos: ${tempo} horas`;

    // Cauculando o total de carne e dividindo por totoal de carnes selecionadas no checkbox 
    let qdtTotalCarne = ((carnePP(tempo) * homens ) + ((carnePP(tempo) * mulheres) * 0.80)) + ((carnePP(tempo) * criancas) / 2);
    let divisao = parseFloat(qdtTotalCarne) / parseFloat(selecionados);
    
    
    let resultadosCarne = document.getElementById('resultadoCarne');
    // verificando se se valor corresponde com que foi selecionado e exibindo o resultando de cada item 
    for (var i = 0; i < carnes.length; i++){
        if(carnes[i].checked){
            if(carnes[i].value == "Bovino"){
                resultadosCarne.innerHTML = `<li><strong>Bovino:</strong><span>${(divisao/1000).toFixed(3)} kg</span></li>`;
            }else if (carnes[i].value == "Porco"){
                resultadosCarne.innerHTML += `<li><strong>Porco:</strong><span>${(divisao/1000).toFixed(3)} kg</span></li>`;
            }else if (carnes[i].value == "Frango"){
                resultadosCarne.innerHTML += `<li><strong>Frango:</strong><span>${(divisao/1000).toFixed(3)} kg</span></li>`;
            }else if(carnes[i].value == "Linguiça"){
                resultadosCarne.innerHTML += `<li><strong>Linguiça:</strong><span>${(divisao/1000).toFixed(3)} kg</span></li>`;
            }
        }
    }
    resultadosCarne.innerHTML += `<li><strong>Total:</strong><span>${(qdtTotalCarne/1000).toFixed(3)} kg</span></li>`;


    let resultadosBebidas = document.getElementById('resultadosBebidas');
    // verificando se tem alguma bebida selecionada
    let bebidas = document.getElementsByClassName('bebidas');
    let select = 0;
    for (var i = 0; i < bebidas.length; i++){
        if(bebidas[i].checked == true){
            select ++;
        }
    }
    // setando as variaveis para calculo da bebida
    let qdtTotalCerveja = 0;
    let qdtTotalRefrigerente = 0;
    let qdtTotalSuco = 0;
    let qdtTotalAgua = 0;
    let qdtTotalBebidas = 0;

    // Caso o selecionado for igual a 0 ele nao faz nenhum calculo referente a bebeida pois nao existe bebida caso tenha ele faz somente da bebida que foi selecionada
    if(select != 0 ){
        for (var i = 0; i < bebidas.length; i++){
            if(bebidas[i].checked){
                if(bebidas[i].value == "Cerveja"){
                    qdtTotalCerveja = (homens + mulheres) * cervejaAdultos(tempo);
                    resultadosBebidas.innerHTML = `<li><strong>Cerveja:</strong><span>${Math.ceil(qdtTotalCerveja/1000)} Garrafas de 1 L cada</span></li>`;
                }else if(bebidas[i].value == "Refrigerante"){
                    qdtTotalRefrigerente = (refriPP(tempo) * (homens + mulheres)) + ((criancas / 2) * refriPP(tempo));
                    resultadosBebidas.innerHTML += `<li><strong>Refrigerante:</strong><span>${(Math.ceil(qdtTotalRefrigerente/1000))/2} Garrafas de 2 L cada</span></li>`;
                }else if(bebidas[i].value == "Suco"){
                    qdtTotalSuco = (sucoPP(tempo) * (homens + mulheres)) + ((criancas / 2) * sucoPP(tempo));
                    resultadosBebidas.innerHTML += `<li><strong>Suco:</strong><span>${Math.ceil(qdtTotalSuco/1000)} Caixa de 1 L cada</span></li>`;
                }else if(bebidas[i].value == "Agua"){
                    qdtTotalAgua = (aguaPP(tempo) * (homens + mulheres)) + (criancas / 2 * aguaPP(tempo));
                    resultadosBebidas.innerHTML += `<li><strong>Agua:</strong><span>${Math.ceil(qdtTotalAgua/1000)} L</span></li>`;
                }
            }
        }
        qdtTotalBebidas = qdtTotalCerveja + qdtTotalRefrigerente + qdtTotalSuco + qdtTotalAgua;
        resultadosBebidas.innerHTML += `<li><strong>Total:</strong><span>${Math.ceil(qdtTotalBebidas/1000)} L</span></li>`;
    
        }else{
            resultadosBebidas.innerHTML += `<li><strong>Total:</strong><span>${qdtTotalBebidas} L</span></li>`;
        }
    }
 
 
}
// funçao que fecha o modal e volta recarregando a pagina para fazer outro calculo 
function back(){
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    window.location.reload();
}


function carnePP(duracao){
    return duracao >= 6 ? 650 : 400;
}
function cervejaAdultos(duracao){
    return duracao >= 6 ? 2000 : 1000;
}
function refriPP(duracao){
    return duracao >= 6 ? 2000 : 1500;
}
function sucoPP(duracao){
    return duracao >= 6 ? 1600 : 1000;
}
function aguaPP(duracao){
    return duracao >= 6 ? 2000 : 1000;
}
function convidado(quantidade){
    return quantidade == "" ? 0 : quantidade;
}
