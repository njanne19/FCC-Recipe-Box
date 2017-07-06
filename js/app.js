import React from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import { Panel } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'



var defaultRecipes = [
        {
          name: "Baklava",
          ingredients: [
            "Flower",
            "Baking soda",
            "Pistachios",
            "Honey",
            "Puff Pastry",
            "Love",
            "Wawa"
          ],
          image:
            "http://assets.simplyrecipes.com/wp-content/uploads/2008/02/baklava-horiz-a-640.jpg"
        },
        {
          name: "Chips N' Dip",
          ingredients: ["Chips", "Dip"],
          image:
            "http://dinnerthendessert.com/wp-content/uploads/2015/09/Chips-and-Guac-Small-680x453.jpg"
        }
      ];

function updateStorage () {
  var importedRecipes = [];
    if(typeof localStorage["recipes"] == "undefined" || localStorage["recipes"] == "undefined") {
     localStorage.recipes = JSON.stringify(defaultRecipes);
    }
}

updateStorage();


//This requires a recipe props of food, ingredietns, and an optional image, and prints specifically the recipe data
//The component deals with the drop down part of every recipe along with the buttons
class CollapseableRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showModal: false
    };
  }
  close() {
    this.setState({ showModal: false });
  }
  deleteRecipe () {
    this.setState({
      showModal: true
    });
  }
  render() {
    const title = (
      <div>
        <a
          className="panelHead"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          {this.props.food}
        </a>
        <ButtonGroup className="add-delete">
          <Button onClick={()=> this.deleteRecipe()}bsStyle="danger">Delete Recipe</Button>
        </ButtonGroup>
      <Modal
        show={this.state.showModal}
        onHide={() => this.close()}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Deletion confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Are you sure you want to  delete the recipe for {this.props.food}?</h2>
          <Button bsStyle="danger" onClick={()=>{ this.props.delete(this.props.food); this.close();}}>Yes, I'm sure. Delete</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="secondary" id="addRec" onClick={() => this.close()}>
            No, this was an accident
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
    let ingredients = this.props.ingredients.map(item => {
      return <ListGroupItem key={item}>{item}</ListGroupItem>;
    });
    let style = {
      width: "100%",
      height: "100%",
      borderColor: "rgb(42, 42, 42)",
      borderWidth: "5px",
      borderRadius: "10px",
      marginBottom: "2%"
    };
    return (
      <div>
        <Panel collapsible expanded={this.state.open} header={title}>
          <div>
            <h1 className="text-center">{this.props.food}</h1>
            {this.props.image && <img src={this.props.image} style={style} />}
            <ListGroup>
              {ingredients}
            </ListGroup>
          </div>
        </Panel>
      </div>
    );
  }
}

class AddToList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
    this.updateRecipes = this.updateRecipes.bind(this);
  }
  handleClick() {
    this.setState({ showModal: true });
  }
  close() {
    this.setState({ showModal: false });
  }
  updateRecipes() {
    if ($("#title").val() && $("#ingredients").val()) {
      let recipe = {
        name: $("#title").val(),
        ingredients: $("#ingredients").val().split(',')
      };
      if ($("#image").val()) {
        recipe["image"] = $("#image").val();
      }

      this.props.update(recipe);
      this.close();
    } else {
      alert("Hold up! You gotta fill in the necessary boxes!");
    }
  }
  render() {
    $("body").click(function(event) {
      if (
        !$(event.target).closest("#openModal").length &&
        !$(event.target).is("#openModal")
      ) {
        $(".modalDialog").hide();
      }
    });
    const myModal = (
      <Modal
        show={this.state.showModal}
        onHide={() => this.close()}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Add a new recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h3>Name of Dish</h3>
            <input
              type="text"
              label="Recipe"
              placeholder="Recipe Name"
              id="title"
            />
            <h3>Ingredients</h3>
            <input
              type="textarea"
              label="Ingredients"
              placeholder="Enter Ingredients(commas to separate)"
              id="ingredients"
            />
            <h3>Image</h3>
            <input
              type="textarea"
              label="Image"
              placeholder="Enter a URL to an image(optional)"
              id="image"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="success"
            id="addRec"
            onClick={() => this.updateRecipes()}
          >
            Add Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    );
    return (
      <div>
        <button onClick={() => this.handleClick()} className="addThings">
          +
        </button>
        {myModal}
      </div>
    );
  }
}

class FullBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: JSON.parse(localStorage.recipes)
    };
    this.updateStatefulRecipes = this.updateStatefulRecipes.bind(this);
    this.deleteStatefulRecipes = this.deleteStatefulRecipes.bind(this);
  }
  deleteStatefulRecipes(food) {
    var index;
    for (var i = 0; i<this.state.recipes.length; i++) {
      if (this.state.recipes[i].name == food) {
        index = i;
        var newArr = this.state.recipes;
        newArr.splice(index, 1);
        localStorage.recipes = JSON.stringify(newArr);
        this.setState({
        recipes: newArr
        });
        break;
      }
    }
  }
  updateStatefulRecipes(recipe) {
    var newArr = this.state.recipes.concat(recipe);
    localStorage.recipes = JSON.stringify(newArr);
    this.setState({
      recipes: newArr
    });
  }
  render() {
    let localRecipes = this.state.recipes.map(item => {
      return (
        <CollapseableRecipe
          key={item["name"]}
          food={item["name"]}
          ingredients={item["ingredients"]}
          image={item["image"]}
          delete={this.deleteStatefulRecipes}
        />
      );
    });
    return (
      <div>
        {localRecipes}
        <AddToList
          update={this.updateStatefulRecipes}
          recipes={this.state.recipes}
        />

      </div>
    );
  }
}


ReactDOM.render(<FullBox />, document.getElementById("render-target"));
