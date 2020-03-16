import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Modifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.changing.name,
      type: this.props.changing.type,
      price: this.props.changing.price,
      rating: this.props.changing.rating,
      warranty_years: this.props.changing.warranty_years
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onValid(this.state);
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form>
        <TextField
          name="name"
          hintText="Name"
          floatingLabelText="Name"
          value={this.state.name}
          onChange={e => this.change(e)}
        />
        <TextField
          name="type"
          hintText="Type"
          floatingLabelText="Type"
          value={this.state.type}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <TextField
          name="price"
          hintText="Price"
          floatingLabelText="Price"
          value={this.state.price}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <TextField
          name="rating"
          hintText="Rating"
          floatingLabelText="Rating"
          value={this.state.rating}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <TextField
          name="warranty_years"
          hintText="Warranty_years"
          floatingLabelText="Warranty_years"
          value={this.state.warranty_years}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <RaisedButton label="SAVE" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
