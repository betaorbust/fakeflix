(function(){ // As we're skipping module loading for now, this keeps the components out of window.

	// Basic data provided for this project.
	// Note, we're only going to target Chorome for this, as webp isn't supported otherwise.
	var data={
		mylist:[
			{title:"Futurama",id:1,img:"http://cdn1.nflximg.net/webp/7621/3787621.webp"},
			{title:"The Interview",id:2,img:"http://cdn1.nflximg.net/webp/1381/11971381.webp"},
			{title:"Gilmore Girls",id:3,img:"http://cdn1.nflximg.net/webp/7451/11317451.webp"}
		],
		recommendations:[
			{title:"Family Guy",id:4,img:"http://cdn5.nflximg.net/webp/5815/2515815.webp"},
			{title:"The Croods",id:5,img:"http://cdn3.nflximg.net/webp/2353/3862353.webp"},
			{title:"Friends",id:6,img:"http://cdn0.nflximg.net/webp/3200/9163200.webp"}
		]
	};

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	/**
	 * A basic button component. Settable class, clickHandler, and button content.
	 */
	var Button = React.createClass({
		render: function(){
			return (
				<button
					className={this.props.class}
					onClick={this.props.clickHandler}>
						{this.props.title}
				</button>
			);
		}
	});

	/**
	 * A box shot. Represents a box single movie.
	 */
	var BoxShot = React.createClass({
		render: function(){
			return (
				<li className="box-shot">
					<img
						className="box-shot-image"
						src={this.props.movie.img}
						alt={this.props.movie.title} />
					<Button
						class={'box-shot-action'}
						clickHandler={this.props.action.callback.bind(this, this.props.movie)}
						title={this.props.action.title} />
				</li>
			);
		}
	});

	/**
	 * A set of movies. Rendered with a category title.
	 */
	var MovieSet = React.createClass({
		render: function(){
			var displayedMovies = this.props.movies.map(function(movie){
				return (
					<BoxShot key={movie.id} movie={movie} action={this.props.action} />
				);
			}.bind(this));

			// Todo: ths should be a class.
			var emptyAlert = displayedMovies.length === 0 ? <p key="this.props.title">Looks like you need to add some titles!</p> : '';
			return(
				<section className="movie-set">
					<h2>{this.props.title}</h2>
					<ReactCSSTransitionGroup transitionName="delay-alert" transitionLeave={false}>
						{emptyAlert}
					</ReactCSSTransitionGroup>
					<ul className="movie-set-list">
						<ReactCSSTransitionGroup transitionName="slide-fade">
							{displayedMovies}
						</ReactCSSTransitionGroup>
					</ul>
				</section>
			);
		}
	});
	/**
	 * A set of movie titles.
	 */
	var TitleList = React.createClass({
		render: function(){
			var titles = this.props.movies.map(function(movie){return movie.title;});
			return (
				<section>
					<h3>{this.props.title}</h3>
					<span>{titles.length>0 ? titles.join(', ') : 'There\'s nothing in your list!'}</span>
				</section>
			);
		}
	});

	/**
	 * The main homepage app. Sets up catgories, click functionaility, and title list.
	 */
	var HomePage = React.createClass({
		getInitialState: function() {
			return data;
		},
		render: function(){
			var addToMyList = function(movie){
				if(this.state.mylist.indexOf(movie) === -1){
					this.setState({'mylist': this.state.mylist.concat([movie])});
				}
			}.bind(this);
			var removeFromMyList = function(movie){
				this.setState({'mylist': _.without(this.state.mylist, movie)});
			}.bind(this);
			return(
				<div>
					<MovieSet
						movies={this.state.mylist}
						title="My List"
						action={{title: 'Remove', callback:removeFromMyList}} />
					<MovieSet
						movies={this.state.recommendations}
						title="Recommendations"
						action={{title: 'Add', callback:addToMyList}} />
					<TitleList
						title={'My List Titles'}
						movies = {this.state.mylist} />
				</div>
			);
		}
	});

	/**
	 * Release the Kraken!
	 */
	React.render(
		<HomePage />,
		document.getElementById('app')
	);
})();