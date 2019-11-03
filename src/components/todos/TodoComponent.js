import React from 'react';
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Close from '@material-ui/icons/Close';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

function TodoComponent(props) {
	console.log(props);
	const handleChange = event => {
		console.log(event.target.checked);
		props.onCheckTodo(props.id, event.target.checked);
	};

	const handleClick = () => {
		fetch(`http://localhost:3000/todos/${props.id}`, {
			method: 'DELETE'
		})
			.then(res => {
				if (res.status === 200) {
					props.loadTodos();
				}
			})
			.catch(e => {
				console.log(e);
			});
	};

	return (
		<Grid item
		      container
		      xs={12}
		      classes={{
		      	item: 'perfectTodo'
		      }}
		>
			<Grid item
			      xs={3}
			      container
			      alignItems="center"
			>
				<Checkbox checked={props.checked}
				          onChange={handleChange}
				/>
			</Grid>
			<Grid item
			      xs={6}
			      container
			      alignItems="center"
			>
				<Typography variant="h5"
				            classes={{
				            	root: props.checked ? 'line' : 'defaultText'
				            }}
				>
					{props.title}
				</Typography>
			</Grid>
			<Grid item
			      xs={3}
			>
				<Fab onClick={handleClick}>
					<Close />
				</Fab>
			</Grid>
		</Grid>
	);
}

export default TodoComponent;
