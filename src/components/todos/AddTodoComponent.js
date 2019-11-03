import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddTodoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleValue: '',
            isError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        event.preventDefault();
        this.setState({
            titleValue: event.target.value,
            isError: false
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.titleValue) {
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: this.state.titleValue,
                    checked: false
                })
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.props.loadTodos();
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            this.setState({
                titleValue: ''
            });
        } else {
            this.setState({
                isError: true
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container
                      spacing={8}
                      classes={{
                          root: 'marginContainer'
                      }}
                >
                    <Grid item
                          xs={9}
                    >
                        <TextField label="Title"
                                   value={this.state.titleValue}
                                   onChange={this.handleChange}
                                   error={this.state.isError} // применяем значение ошибки
                                   fullWidth
                        />
                    </Grid>
                    <Grid item
                          xs={3}
                          container
                          justify="flex-end"
                    >
                        <Button color="primary"
                                variant="contained"
                                type="submit"
                                size="large"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default AddTodoComponent;
