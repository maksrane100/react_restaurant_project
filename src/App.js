import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Grid, Card, Icon, Image, Label, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
	
	
	  constructor(props) {
      super(props);
      
      this.state = {
		  restaurants:[], 
		  indents: [],
		  cities: [],
		  totalcities: 0,
   		  city:''
   	   };
	   
		this.handleInputChange = this.handleInputChange.bind(this);    
		this.getCities = this.getCities.bind(this);  		
    }
	
	componentWillMount(){		
		this.getCities();
	}
	
	
	handleInputChange(e) {
	    // this.setState({value: e.target.value});
		var newState = {};
		newState =this.state;
		newState[e.target.name] = e.target.value;
		this.setState(newState);
		this.getRestaurants();
	}
	  
	getCities() {
	
	var url ='http://localhost:4200/restaurants/cities';
	
	axios.get(url)
		.then(response => {

			this.setState({ cities: response.data, totalcities:  response.data.length});			
			let cities = this.state.cities;
			let optionItems = cities.map((city) =>
				<option key={city} value={city}>{city}</option>
			);
			console.log('optionItems:'+optionItems);
			this.setState({ optionItems: optionItems});
		})
		.catch(function (error) {
			console.log(error);
		});	  
	}	
	
	getRestaurants() {
		
		axios.post('http://localhost:4200/restaurants/search', {
		 "city":this.state.city
		})
		.then(response => {
			console.log('response.data.length:'+response.data.length);
			this.setState({ restaurants: response.data, totalrestaurants:  response.data.length});						
		})
		.catch(function (error) {
			console.log(error);
		});
	  
		console.log('this.state.restaurants.length:'+this.state.restaurants.length);	  
	}
	
	render() {
		return (
		
			<div className="container">

				<div className="jumbotron">
				Search Restaurants
				</div>
 					
				<div className="row">
					<div className="fieldTitle">Select City</div>
					<div className="fieldValue">
						<select id="city" name="city"  value={this.state.city} onChange={this.handleInputChange}>
						<option value="">Select</option>
							{this.state.optionItems}
						</select>
					</div>
				</div>
			
				<div className="row">
					Total Restaurants: {this.state.restaurants.length}
				</div>

				<div>

					{ this.state.restaurants.map(restaurant => (
				
						<div className="card">
				
				
							<Card>
	
							<div>
								<div className="floatLeft">
									<Image src='http://www.clker.com/cliparts/E/y/s/j/w/U/home-icon-md.png' size="tiny"/>
								</div>
								<div className="name">
									<span>{restaurant.name}</span>
								</div>
							</div>
	
							<Card.Content>
     
								<Card.Description>

								<div className="row">
									<div className="fieldTitle">Food:</div><div className="fieldValue">{restaurant.title}</div>
								</div>
								<div className="row">
									<div className="fieldTitle">Speciality:</div><div className="fieldValue">{restaurant.highlight}</div>
								</div>
								<div className="row">
									<div className="fieldTitle">Location:</div>
									<div className="fieldValue">
									{restaurant.address.address1} {restaurant.address.address2} {restaurant.address.city}
									{restaurant.address.state} {restaurant.address.zip} {restaurant.address.country}
									</div>
								</div>

								</Card.Description>
							</Card.Content>
	
							<Card.Content extra>
								<div>
								<div className="row">
									<div className="fieldTitleExtra">Stars: {restaurant.star} </div>
									</div>
								<div className="row">
									<div className="fieldTitleExtra">Hours:
									{restaurant.openathour}:{restaurant.openatminute} AM - 
									{restaurant.closeathour}:{restaurant.closeatminute} PM
									</div>
								</div>

								</div>
							</Card.Content>
  
							</Card>
						</div>
				
			 ))}
			</div>
			
	</div>
	
	   );
  }
}

export default App;