const urlLoterias = 'https://loteriascaixa-api.herokuapp.com/api';

// Função para preencher o select com as loterias
function populateLoterias() {
    fetch(urlLoterias)
        .then(response => {
            if (!response.ok) {
                throw new Error(`ERRO: Não foi possível buscar loterias. ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const option = document.getElementById('loteria');
            console.log('Loterias disponíveis:', data);
            
            // Limpa o select antes de adicionar novas opções
            option.innerHTML = '';

            // Adiciona opções ao select
            for (let createOptions of data) {
                let newOption = document.createElement('option');
                newOption.text = createOptions;
                newOption.value = createOptions;
                option.appendChild(newOption);
            }
        })
        .catch(error => {
            console.error('Erro na requisição: ', error);
        });
}

// Função para realizar a requisição com base na loteria selecionada
function searchLoteria() {
    const selectElement = document.getElementById('loteria');
    const resultLatest = document.getElementById('latest');
    const selectedLoteria = selectElement.value;
    
    if (!selectedLoteria) {
        console.error('Nenhuma loteria selecionada');
        return;
    }

    // Verifica e corrige a URL base
    const urlLatest = `${urlLoterias}/${selectedLoteria}/latest`;
    console.log('URL da API:', urlLatest);

    fetch(urlLatest)
        .then(response => {
            if (!response.ok) {
                throw new Error(`ERRO: Não foi possível buscar o resultado da loteria. ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resultado da Loteria:', data);
            
            // Limpa o conteúdo anterior
            resultLatest.innerHTML = '';

            // Verifique a estrutura de `data` e ajuste conforme necessário
            if (data && data.dezenas) {
                const dezenas = document.createElement('p');
                dezenas.textContent = `Dezenas: ${data.dezenas.join(', ')}`; // Ajuste conforme a estrutura dos dados
                resultLatest.appendChild(dezenas);
            } else {
                console.log('Estrutura de dados inesperada:', data);
            }
        })
        .catch(error => {
            console.error('Erro na requisição: ', error);
        });
}

function buy(){
    let numeros;

    for(let i = 1; i <= 60; i++){
        if(document.getElementById(`checkbox-${i}`) === true){
            //continuar depois
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateLoterias(); // Preenche o select ao carregar a página

    // Adiciona o listener ao botão
    document.getElementById('pesquisaLoterias').addEventListener('click', searchLoteria);
});

const container = document.getElementById('numbers');

        // Loop para criar checkboxes de 1 a 60
        for (let i = 1; i <= 60; i++) {
            // Cria um label e checkbox
            const label = document.createElement('label');
            label.textContent = i; // Define o texto do label com o número
            label.setAttribute('for', `checkbox-${i}`); // Define o atributo for para o label

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox'; // Define o tipo como checkbox
            checkbox.id = `checkbox-${i}`; // Define o id único para o checkbox
            checkbox.name = `number-${i}`; // Define o name para o checkbox

            // Adiciona o checkbox e o label ao contêiner
            const div = document.createElement('div');
            div.className = 'checkbox-item';
            div.appendChild(checkbox);
            div.appendChild(label);
            const br = document.createElement('br');
            if((i === 10) || (i === 20) || (i === 30) || (i === 40) || (i === 50)){
                div.appendChild(br);
            }
            container.appendChild(div);
        }