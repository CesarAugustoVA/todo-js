import { Todo, TodoList } from "../classes";
import {todoList} from '../index'

//referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar    = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
        <li class="${(todo.completado)? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>`;
    
    const div = document.createElement('div');

    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

};

//Eventos
txtInput.addEventListener('keyup', (event)=>{

    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);//crea el todo con la clase Todo con elementos id, fecha, tarea
        todoList.nuevoTodo(nuevoTodo);//añadelos al arreglo usand oe l push del todo list nuevo todo
        crearTodoHtml(nuevoTodo);//creamos el nuevo todo
        txtInput.value = '';//al crearlo dejamos el input vacio
       
    }

});


divTodoList.addEventListener('click', (event)=>{
    const nombreElemento = event.target.localName; //input, label, button.    
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')){//si el nomvbre del elemento incluye input hizo click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //añade y quita la clase completed

    } else if (nombreElemento.includes('button')) { //si incluye el button hay que borrar el todo.
        todoList.eliminarTodo(todoId);//borramos del todoList (arreglo)
        divTodoList.removeChild(todoElemento);//borramos el html
    }

});


btnBorrar.addEventListener('click', ()=>{
    
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i>=0; i--){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);

        }

    }

});

ulFiltros.addEventListener('click', (event)=> {
    
    const filtro = event.target.text;
    if(!filtro) {return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    event.target

    for(const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch (filtro){
            
            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden');
                }
                break;

        }

    }
});