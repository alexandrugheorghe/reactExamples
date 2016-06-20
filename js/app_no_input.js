'use strict';

var User = React.createClass({
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
	onSubmit: function(e){
		e.preventDefault();
		var username = React.findDOMNode(this.refs.login_username);
		this.props.addUser(username.value);
		username.value = '';
	},
	render: function(){
		return (
			<form onSubmit={this.onSubmit}>
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
	addUser: function(user){
		this.setState({users: this.state.users.concat(user)});
	},
	render: function(){
		var users = this.state.users.map(function(username){
			return (<User username={username}/>);
		});
		return (
			<div>
				<User username="zpao" />
				<User username="spicyj" />
			</div>
		);		
	}
});

React.render(<Main />, document.getElementById('container'));