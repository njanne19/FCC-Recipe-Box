import React from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import { Panel } from 'react-bootstrap'


//This requires a recipe props of food, ingredietns, and an optional image
const StatelessFunctionalRecipe = (props) => {
  let ingredients = props.ingredients.map((item) => {
    return (<ListGroupItem key={item}>{item}</ListGroupItem>)
  });
  let style = {
    "width": "100%",
    "height": "100%",
    "borderColor": "rgb(42, 42, 42)",
    "borderWidth": "5px",
    "borderRadius": "10px",
    "marginBottom": "2%"
  }
  return (
    <div>
    <h1 className ="text-center">{props.food}</h1>
    {props.image &&
      <img src={props.image} style={style}></img>
    }
    <ListGroup>
        {ingredients}
    </ListGroup>
    </div>
  );
};

class CollapseableRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    const title = (
      <div>
      <a className="panelHead"onClick={()=>this.setState({open: !this.state.open})}>{this.props.food}</a>
      <a className="plus"><i className = "fa fa-plus"></i></a>
      </div>
    )
    return (
      <div>
        <Panel collapsible expanded={this.state.open} header={title}>
          <StatelessFunctionalRecipe food={this.props.food} ingredients={this.props.ingredients} image={this.props.image} />
        </Panel>
      </div>
    )
  }
}

class FullBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let ingredients = ["Flower", "Baking soda", "Pistachios", "Honey", "Puff Pastry", "Love"];
    let image = "http://assets.simplyrecipes.com/wp-content/uploads/2008/02/baklava-horiz-a-640.jpg";
    let food = "Baklava";
    return (
      <div>
        <CollapseableRecipe ingredients = {ingredients} image = {image} food = {food} />
      </div>
    )
  }
};

ReactDOM.render(<FullBox />, document.getElementById('render-target'));