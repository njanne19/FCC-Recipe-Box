import React from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import { Panel } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'



const recipes = [                               
        {
        "name" : "Baklava",
        "ingredients": ["Flower", "Baking soda", "Pistachios", "Honey", "Puff Pastry", "Love", "Wawa"],
        "image" : "http://assets.simplyrecipes.com/wp-content/uploads/2008/02/baklava-horiz-a-640.jpg"   
        },
        {
        "name" : "Chips N' Dip",
        "ingredients": ["Chips", "Dip"],
        "image" : "http://dinnerthendessert.com/wp-content/uploads/2015/09/Chips-and-Guac-Small-680x453.jpg"   
        }
];



//This requires a recipe props of food, ingredietns, and an optional image, and prints specifically the recipe data
//The component deals with the drop down part of every recipe along with the buttons
class CollapseableRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const title = (
      <div>
      <a className="panelHead"onClick={()=>this.setState({open: !this.state.open})}>{this.props.food}</a>
      <ButtonGroup className="add-delete">
        <Button bsStyle="success">Add to shopping list</Button>
        <Button bsStyle="danger">Delete Recipe</Button>
      </ButtonGroup>
      </div>
    );
     let ingredients = this.props.ingredients.map((item) => {
     return (<ListGroupItem key={item}>{item}</ListGroupItem>)
     });
     let style = {
        "width": "100%",
        "height": "100%",
        "borderColor": "rgb(42, 42, 42)",
        "borderWidth": "5px",
        "borderRadius": "10px",
        "marginBottom": "2%"
     };
    return (
      <div>
        <Panel collapsible expanded={this.state.open} header={title}>
        <div>
        <h1 className ="text-center">{this.props.food}</h1>
        {this.props.image &&
        <img src={this.props.image} style={style}></img>
        }
        <ListGroup>
        {ingredients}
        </ListGroup>
        </div>
        </Panel>
      </div>
    )
  }
};

class AddToList extends React.Component {
		constructor(props) {
				super(props);
				this.state=({
					showModal: false
				});
		}
		handleClick() {
				this.setState({ showModal : true});
		}
  close() {
				this.setState({ showModal : false});
		}
		updateRecipes() {
				if ($('#title').val() && $('#ingredients').val()) {
						let recipe = {
								"name" : $('#title').val(),
								"ingredients" : $('#ingredients').val()
						};
					if ($('#image').val()) {
							recipe["image"] = $('#image').val();
					}
					recipes.push(recipe);
					this.close();
					console.log(recipes[2]);
				}
			 alert("Hold up! You gotta fill in the necessary boxes!");
		}
 	render() {
			$('body').click(function (event) {
   if(!$(event.target).closest('#openModal').length && !$(event.target).is('#openModal')) {
     $(".modalDialog").hide();
   	}	     
			});
			const myModal = (
					<Modal show={this.state.showModal} onHide={() => this.close()} bsSize="large" aria-labelledby="contained-modal-title-lg">
       <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Add a new recipe</Modal.Title>
       </Modal.Header>
        <Modal.Body>
											  <form>
															<h3>Name of Dish</h3>
              	<input type="text" label="Recipe" placeholder="Recipe Name" id="title" />
															<h3>Ingredients</h3>
              	<input type="textarea" label="Ingredients" placeholder="Enter Ingredients(commas to separate)" id="ingredients"/>
															<h3>Image</h3>
              	<input type="textarea" label="Image" placeholder="Enter a URL to an image(optional)" id="image"/>
            </form>
        </Modal.Body>
        <Modal.Footer>
         <Button bsStyle="success" id="addRec" onClick={()=> this.updateRecipes()}>Add Recipe</Button>
        </Modal.Footer>
      </Modal>
		);
			return (
				<div>
				<button onClick={()=> this.handleClick()} className="addThings">+</button>
				{myModal}
				</div>
		);
	}
}




class FullBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      let localRecipes = recipes.map((item) => {
         return <CollapseableRecipe key={item["name"]} food={item["name"]} ingredients={item["ingredients"]} image={item["image"]} />
      });
    return (
      <div>
        {localRecipes}
      </div>
    );
  }
};
ReactDOM.render(<FullBox />, document.getElementById('render-target'));
ReactDOM.render(<AddToList />, document.getElementById('render2'));
