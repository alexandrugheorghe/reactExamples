'use strict';

var Square = React.createClass({
	getInitialState: function(){
		return {value: this.props.value};
	},

	render: function(){
		return (
			<div className="square">
				{this.state.value}
			</div>
		);
	}
});

var Board = React.createClass({
	
	getInitialState: function(){
		return {squares: ['','','','','','','','','']};
	},
	render: function(){
	
		var squares = this.state.squares.map(function(value){
			return (<Square value={value}/>);
		});
	
		return (
			<div className="board">
				{squares}
			</div>
		);
	}
});

var Game = React.createClass({
	render: function(){
		return (
			<Board/>
		);
	}
});

React.render(
	<Game/>,
	document.getElementById('container')
);