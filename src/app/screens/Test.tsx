//@ts-nocheck
import React,{Component} from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeDetail = () => {
    this.setState({color: "blue", brand: "Tesla", model: "Model S", year: 2025});
  }
componentDidMount() {
   console.log("componentDidMount") ;
   //runss after first render => RETRIEVE DATA FROM BACKEND
};

componentWillUnmount(){
    console.log("componentWillMount");
//runs before the component unmount
}

componentDidUpdate(){
    
}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color:{this.state.color}-
          MOdel:{this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeDetail}
        >change. Detailr</button>
      </div>
    );
  }
}

export default Test;