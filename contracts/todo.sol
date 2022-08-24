//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;


contract Todo {

    event AddTodo(address recipient, uint taskId);
    event DeleteTodo(uint taskId, bool isDeleted);
    event CompletedTodo(uint taskId, bool isDeleted);


    struct Todos{
        uint id;
        string description;
        bool isDeleted;
        bool isCompleted;
    }

    Todos[] private _todos;
 
    mapping(uint256 => address)  owner;

    modifier OnlyOwner(uint todoId) {
        require(owner[todoId] == msg.sender, "only owner can delete todo");
        _;

    }

    function addTodo(string memory description, bool isDeleted ) external {
        bool isCompletedTodo = false;
        uint todoId = _todos.length;
        _todos.push(Todos(todoId, description, isDeleted,isCompletedTodo));
        owner[todoId] = msg.sender;
        emit AddTodo(msg.sender, todoId);        
    }

    function setTodoAsComplete(uint todoId, bool isCompleted) external OnlyOwner(todoId) {
            _todos[todoId].isCompleted = isCompleted;
            emit CompletedTodo(todoId, isCompleted);
    }

    function deleteTodo(uint todoId, bool isDeleted) external OnlyOwner(todoId) {
            _todos[todoId].isDeleted = isDeleted;
            emit DeleteTodo(todoId, isDeleted);
    } 

    function getTodos() external view returns (Todos[] memory){
        Todos[] memory allTodos = new Todos[](_todos.length);
        uint count = 0;
        for(uint i =0; i < _todos.length; i++){
            if(owner[i] == msg.sender && _todos[i].isDeleted == false){
                allTodos[count] = _todos[i];
                count++;
            }
        }

        Todos[] memory getAllTodos = new Todos[](count);
        for(uint i = 0; i<count; i++){
            getAllTodos[i] = allTodos[i];
        }

        return getAllTodos;
    }
}