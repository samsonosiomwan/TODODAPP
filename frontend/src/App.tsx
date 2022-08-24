import React, {useState, useEffect} from 'react';
import {TextField, Button} from "@mui/material";
import Todo from "./components/todos"

import { TodoContractAddress } from './  config';
import {ethers} from "ethers";
import TodoAbi from "./abi/Todo.json"

import './App.css';
import { useMetamask } from './network/useMetamask';
import { AnyNaptrRecord } from 'dns';

function App() {
  const [todos, setTodos] = useState<any>();
  const [input, setInput] = useState("");
  const [myTodo, setMytodo] = useState({
    description:"",
    isDeleted:false
  })
  const handleSetInput = (e:any) => {
    setInput(e.target.value)
  }

 
  const {currentAccount, currentNetwork, connectWallet} = useMetamask()

  const addTodo = async(e:any) => {
      e.preventDefault();
      setMytodo({
        description:input,
        isDeleted: false,
     })
     
  }

  try{
    const {ethereum}:any = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const TodoContract = new ethers.Contract(TodoContractAddress, TodoAbi.abi, signer);
      TodoContract.addTodo(myTodo?.description, myTodo?.isDeleted).then((res:any)=>{
        console.log(res)
        setTodos([...todos, myTodo]);
      }).catch(((err:any)=>{
        console.log("Erro occured while adding a new task", err);
      }))
    }else{
      console.log("Ethereum object does not exist")
    }

  }catch(error){
    console.log("Error subbmitting the task")
  }


  const deleteTodo = async(key:any)=>{
    try{
    const {ethereum}:any = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(TodoContractAddress, TodoAbi.abi, signer);
      
      let deleteTodo = await todoContract.deleteTodo(key, true);
      let allTodos = await todoContract.getTodos();
      setTodos(allTodos)
     
    }else{
      console.log("Ethereum object does not exist")
    }}catch(error:any){
      console.log(error)
    }
  }



  const getAllTodos = async(key?:any)=>{
    try{
    const {ethereum}:any = window;

    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(TodoContractAddress, TodoAbi.abi, signer);

      let allTodos = await todoContract.getTodos();
      setTodos(allTodos)
     
    }else{
      console.log("Ethereum object does not exist")
    }}catch(error:any){
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllTodos();
    connectWallet();
  },[])
  return (
    <div >
      {
        currentAccount === '' ? (
          <button className="button" onClick={connectWallet}>Connect Wallet</button>
        ): currentNetwork ? (
          <div className="App">
              <h2>Todo App</h2>
              <form>
                <TextField id="outlined-basic" label="Make Todo" variant="outlined" sx={{margin:"opx 5px"}} size="small"
                value={input} 
                onChange={handleSetInput}
                ></TextField>
                <Button variant="contained" color="primary"
                onClick={ addTodo}
                >
                  Add Todo
                </Button>
              </form>
              <ul>
                {todos?.map((todo:any)=><Todo key={todo.id} todo={todo.description} onClick={deleteTodo(todo.id)} />)}
              </ul>
          </div>
        ):(
          <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
            <div>connect to rinkeby testnet and reload the screen</div>
          </div>
        )
      }
    </div>
  );
}

export default App;
