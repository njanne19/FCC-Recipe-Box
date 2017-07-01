import React from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'

let statelessFunctionalRecipe = (props) => {
  let source = null;
  if(props.image) {
    source = props.image;
  }
  let ingredients = this.props.ingredients.map((item) => {
    return (<ListGroupItem>{this.props.ingredients[item]}</ListGroupItem>)
  });

  return (
    <div>
    <h1 className ="text-center">{this.props.food}</h1>
    <img src={source}/>
    <ListGroup>
        {ingredients}
    </ListGroup>
    </div>
  );
};

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let ingredients = ["Flakes", "Milk", "Butter"];
    let image = "http://assets.simplyrecipes.com/wp-content/uploads/2008/02/baklava-horiz-a-640.jpg"
    return (
      <statelessFunctionalRecipe image={ image } food="Baklava" ingredients={ ingredients } />
    );
  }
}

ReactDOM.render(<RecipeBox />, document.getElementById('render-target'));
