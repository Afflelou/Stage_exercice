import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    // clear form
    this.setState({
      name: "",
      type: "",
      price: "",
      rating: "",
      warranty_years: ""
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
          floatingLabelFixed
        />
        <br />
        <TextField
          name="type"
          hintText="Type"
          floatingLabelText="Type"
          value={this.state.type}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="price"
          hintText="Price"
          floatingLabelText="Price"
          value={this.state.price}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="rating"
          hintText="Rating"
          floatingLabelText="Rating"
          value={this.state.rating}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="warranty_years"
          hintText="Warranty_years"
          floatingLabelText="Warranty_years"
          value={this.state.warranty_years}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="ADD" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
