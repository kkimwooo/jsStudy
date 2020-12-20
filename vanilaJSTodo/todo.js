const textTodo = document.getElementById('textTodo');
const btnAddTodo=document.getElementById('btnAddTodo');
const btnRemoveAll = document.getElementById('btnRemoveAll');
const todoList = document.getElementById('ulTodo');
const todoItem = document.querySelectorAll('.todo-span');
const btnRemoveDone = document.querySelector('#btnRemoveDone');

function addTodo(event){
    console.log('addTodo : '+ textTodo.value);
    //중복 체크
    if(!(validCheck(textTodo.value))){
        alert('중복 항목 존재');
        return false;
    }
    //li,span 컴포넌트 만들기
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText=textTodo.value;
    span.className='todo-span';
    span.setAttribute('status','todo');
    span.onclick=makeDone;  //처음에 로딩 될때 이벤트 리스너가 없기 때문에 이렇게 해주어야 하는듯함
    li.appendChild(span);
    todoList.appendChild(li);
}

//문자열 비교 로직 수정 필요
function validCheck(todo){
   const existList =  todoList.innerText;
   console.log('validCheck');
   if(existList.indexOf(todo)>=0) //일치 하는게 없으면 -1, 있으면 0보다 큼
    {
        console.log('중복 있음');
        return false;
    }
    return true;
}

function makeDone(event){
    console.log('todo click');
    const todoItem = event.target;
    //1. status 값 확인 후 todo인지 done인지 따라 분기
    const status = todoItem.getAttribute('status');
    if(status==='todo'){
        if(confirm('완료 상태로 변경하시겠습니까?')){
            todoItem.className='done-span';
            todoItem.setAttribute('status','done');
        }
    }else{
        if(confirm('미완료 상태로 변경하시겠습니까?')){
            todoItem.className='todo-span';
            todoItem.setAttribute('status','todo');
        }        
    }
}

function removeDone(){
    console.log('완료항목 삭제');
    //1. ul 중 status done인 항목 탐색
    const doneSpan = document.querySelector('.done-span');
    if(doneSpan===null){
        return false;
    }
    doneSpan.remove();
    //2. 삭제
}

function removeAll(){
    console.log('removeAll');
    todoList.innerHTML='';
}

function init(){
    btnAddTodo.addEventListener('click',addTodo);
    btnRemoveAll.addEventListener('click',removeAll);
    btnRemoveDone.addEventListener('click',removeDone);
}

init();