import React, {useEffect,useState} from 'react';
import './App.css';
import { JsxElement } from 'typescript';

function List(props: { lst: { id: number; title: string; memo: string }[], select:(id:number)=>void}) {
  return (
    <ul>
      {props.lst.map((item) => (
        <li className='todos'>
          <a href={'todo'+item.id} key={item.id} onClick={(event)=>{
            event.preventDefault();
            props.select(item.id);
          }}>
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}


function App() {

  const [id,setId] = useState(0);
  const [nextId, setNextId] = useState(2);
  const [mode,setMode]=useState('Main');

  const [todoList, setTodoList]=useState([
    {id:0,title:'todo1',memo:'none'},
    {id:1,title:'todo2',memo:'none'}
  ]);

  //메인 페이지 & 세부 정보
  let content=null;
  if (mode==='Main'){
    content=<div>
      메인 페이지입니다.
      <form onSubmit={(event)=>{
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form)

          console.log(formData.get('title'));

          const title = formData.get('title') as string;
          const memo = formData.get('memo') as string;
          if (title===''){
            alert('일정 제목을 입력해주세요');
          }
          else{
            const newTodo = {id:nextId,title:title,memo:memo};
            const newTodoList = [...todoList,newTodo];
            setTodoList(newTodoList);
          }
        }} >
        <p><input type='text' name='title' placeholder='일정 제목'></input></p>
        <p><textarea name='memo' placeholder='메모'></textarea></p>
        <p><input type='submit' value='새 일정 만들기'></input></p>
      </form>

    </div>
  } else if (mode==='READ'){
    let title:string='';
    let memo:string='';
    for (let i=0;i<todoList.length;i++){
      if (i===id){
        title=todoList[i].title;
        memo=todoList[i].memo;
      }
      content=<div>
        <div>{title}</div>
        <div>{memo}</div>
      </div>;
    }
  } else if (mode==='Create'){
    
  }
  

  return (
    <div className='App'>
      <h1><a href='/' onClick={(event)=>{
        event.preventDefault();
        setMode('Main');
        setId(0);
      }}>TodoList</a></h1>
      {content}
      <List lst={todoList} select={(id:number)=>{
        setMode('READ');
        setId(id);
      }}></List>
    </div>
  );
}

export default App;
