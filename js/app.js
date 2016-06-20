'use strict';

var Card = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentDidMount: function(){
		var component = this;
		console.log('User component mounted.');
		$.get('https://api.github.com/users/' + this.props.username, function(res){
			console.log(res);
			component.setState(res);
		});
	},
	render: function(){
		return (
		<div>
			<img src={this.state.avatar_url} width="80" />
			<h3>{this.state.name}</h3>
			<hr/>
		</div>
		);
	}
});

var Form = React.createClass({	
	componentDidMount: function(){
		console.log('Form component mounted.');
	},	
	handleSubmit: function(e){
		e.preventDefault();
		var username = React.findDOMNode(this.refs.login_username);
		this.props.addUser(username.value);
		username.value = '';
	},
	render: function(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="GitHub Username" ref="login_username"/>
				<button>Login</button>
			</form>
		);
	}
});

var Main = React.createClass({
	componentDidMount:function(){
		console.log('Main component mounted.');
	},
	getInitialState: function(){
		return {users: []};
	},
	addUser: function(userToAdd){
		this.setState({users: this.state.users.concat(userToAdd)});
	},
	render: function(){
		var users = this.state.users.map(function(username){
			return (<Card username={username} />);
		});
		return (
			<div>
				<Form addUser={this.addUser}/>
				{users}
			</div>
		);		
	}
});

React.render(<Main />, document.getElementById('container'));