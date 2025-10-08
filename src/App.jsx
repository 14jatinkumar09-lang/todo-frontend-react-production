import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
let port = 4000 ;
let URL = "https://todo-backend-express-weld.vercel.app" ;
function App() {
  const [TODOS, setTODOS] = useState([]) ;

    
       
 useEffect(()=>{
    setInterval(async()=>{
      await axios.get(`${URL}/`)
    .then((res)=>{
      setTODOS(res.data.todos)
      console.log(TODOS)
    })
    },1000)
  },[])
 

  return (
    <>
     <AddTodoBox />
     <button onClick={async()=>{
      await axios.get(`${URL}/deleteAll`).then(res => {
        alert(res.data.msg) ;
      })
     }}>clear</button>
     

     <AllTodos todos={TODOS} />

    </>
  )
} 


function AddTodoBox ({fetchUsers}) {

    const [title, setTitle] = useState() ;
  const [description,setdes] = useState() ;

  return <div className='add'>
    <div><label >Title : - </label>
     <input  type='text' onChange={e=>{
      setTitle(e.target.value) ;
     }}></input></div>
     <div><label >Description : - </label>
     <input type='text' onChange={e => {
      setdes(e.target.value) ;
     }} ></input></div>
     <button onClick={async()=>{
      try {
        await axios.post(`${URL}/addTodo` , {
          title : title , 
          description  : description
        })
        alert("Todo Added");
      } catch (error) {
        alert("something wemt wrong " , error) ;
      }
  
     }}>Add Todo</button>
  </div>
}

function AllTodos({todos }) {
 
  
  return  todos.map((t)=>{
    return <div key={t.title}>
    <h3>title : - {t.title}</h3>
    <h3>description :- {t.description}</h3>
    <button onClick={async ()=>{
      try{
        await axios.post(`${URL}/deleteTodo` , { _id : t._id}).then(res => {
          alert("Todo Marked Completed") ;
         
        })
      }catch(err){
        console.log("something went wrong in frontend") ;
      }
    }}>status :- {t.todoStatus?"completed":"incomplte"}</button>
  </div>
  })
}





export default App
