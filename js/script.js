'use strict';

//Enviar (setItem) transforma o JSON.stringify e para string
//Receber (getItem) transforma o JSON.parse para array

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

//Função para criar os elementos acima
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas(); //Para não ficar duplicando as informações
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem (item.tarefa, item.status, indice)); //indice par asaber qual é o item clicado
}

//Função para inserir novos itens
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status':''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';//Limpar após digitar o que quer adicionar.
    }
}

//Função para remover quando clicado no botão X
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

//Função para saber onde foi clicado
const clickitem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;//Para pegar qual o indice está sendo clicado
        removerItem(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickitem)

atualizarTela();
