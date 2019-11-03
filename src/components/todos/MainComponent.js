import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddTodoComponent from "./AddTodoComponent";
import TodoListComponent from "./TodoListComponent";

import imgUrl from '../../img/emptyList.jpg';


// ГЛАВНЫЙ КОМПОНЕНТ, В КОТОРОМ ХРАНИТСЯ СПИСОК ДЕЛ
// И ВСЕ ФУНКЦИИ РАБОТЫ С НИМ
class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listTodo: []
        };
        this.loadTodos = this.loadTodos.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.onCheckTodo = this.onCheckTodo.bind(this);
    }

    componentDidMount() {
        console.log(111)
        fetch('http://localhost:3000/todos', {
            method: 'GET'
        }).then(response => response.json())
            .then((res) => {
                this.setState({
                    listTodo: res
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    loadTodos() {
        fetch('http://localhost:3000/todos', {
            method: 'GET'
        }).then(response => response.json())
            .then((res) => {
                this.setState({
                    listTodo: res
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    removeTodo(id) {
        this.setState({
            listTodo: this.state.listTodo.filter(todo => todo.id !== id)
        });
    }

    onCheckTodo(id, checked) {
        this.setState({
            listTodo: this.state.listTodo.map(todo => {
                if (todo.id === id) {
                    return ({
                        ...todo,
                        checked
                    });
                }

                return todo;
            })
        });
    }

    render() {
        return (
            <Grid container
                  justify="center"
            >
                <Grid item
                      xs={4}
                >
                    <Paper>
                        <AddTodoComponent loadTodos={this.loadTodos}/>
                        <div style={{
                            background: `url(${imgUrl}) no-repeat left top`,
                            backgroundSize: '100% auto',
                            minHeight: '500px'
                        }}
                        >
                            <TodoListComponent listTodo={this.state.listTodo}
                                               onCheckTodo={this.onCheckTodo}
                                               loadTodos={this.loadTodos}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default MainComponent;
