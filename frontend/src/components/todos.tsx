import React from 'react'
import {todosStyle} from "./style"

import {List, ListItem, ListItemText} from "@mui/material"



interface ITodos  {
    todo:string;
    onClick:any
}

const Todos = ({todo, onClick}:ITodos) => {
    return(
        <List className="todo_list">
                <ListItem>
                    <ListItemText primary = {todo}/>
                </ListItem>
                <button onClick={onClick}></button>
        </List>
    )
}

export default Todos