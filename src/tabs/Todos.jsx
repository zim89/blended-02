import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleInput = value => {
    const newTodos = { text: value, id: nanoid() };
    this.setState(prevState => ({ todos: [...prevState.todos, newTodos] }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };
  componentDidMount() {
    const savedtodos = JSON.parse(localStorage.getItem('todos'));
    if (savedtodos) {
      this.setState({ todos: savedtodos });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const {todos} = this.state;
    if (prevState.todos !== todos) {localStorage.setItem('todos', JSON.stringify(todos));}
  }
  render() {
    console.log(this.state.todos);
    return (
      <>
        <SearchForm onSubmit={this.handleInput} />;
        <Grid>
          {this.state.todos.map((todo, idx) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} idx={idx} deleteTodo={this.deleteTodo} />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
