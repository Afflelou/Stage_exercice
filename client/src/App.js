import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Axios from "axios";
import socketIOClient from "socket.io-client";

import "./App.css";
import Form from "./Form";
import Modifier from "./Modifier";

class App extends React.Component {
  constructor() {
    super();
    this.socket = socketIOClient("http://localhost:8080");
    this.socket.on("delete", data => {
      console.log("reçu");
      this.DeleteElement(data);
    });
    this.socket.on("add", data => {
      this.AddElement(data);
    });
    this.state = {
      loaded: false,
      changing: "",
      removing: false,
      columns: [
        { title: "Name", field: "name" },
        { title: "Type", field: "type" },
        { title: "Price", field: "price", type: "numeric" },
        { title: "rating", field: "rating", type: "numeric" },
        { title: "warranty years", field: "warranty_years", type: "numeric" }
      ],
      items: []
    };
  }
  AddElement(data) {
    this.setState({
      items: [...this.state.items, data]
    });
  }
  handleValid(data) {
    this.handleAdd(data);
    this.setState({ removing: false });
    this.setState({ changing: "" });
  }
  handleAdd(data) {
    this.AddElement(data);
    this.socket.emit("add", data);
  }
  handleModify(index) {
    if (this.state.removing === false) {
      console.log(index);
      this.setState({ removing: true });
      this.setState({ changing: this.state.items[index] });
      this.handleDelete(index);
      console.log(this.state.changing);
    }
    console.log("non");
  }
  DeleteElement(index) {
    var copy = this.state.items;
    copy.splice(index, 1);
    this.setState({ items: copy });
  }
  handleDelete(index) {
    this.DeleteElement(index);
    this.socket.emit("delete", index);
  }

  async getItem() {
    const data = await Axios.get("http://localhost:8080/items");
    const data_string = JSON.stringify(data.data);
    const data_array = JSON.parse(data_string);
    this.setState({ items: data_array });
  }
  render() {
    if (this.state.loaded === false) {
      this.setState({ loaded: true });
      this.getItem();
      return (
        <div>
          <header className="App-header">Loading</header>
        </div>
      );
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form
            onSubmit={submission => {
              this.handleAdd(submission);
            }}
          />
          <TableContainer component={Paper}>
            <Table className="" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Items</TableCell>
                  <TableCell align="right">type</TableCell>
                  <TableCell align="right">price</TableCell>
                  <TableCell align="right">rating</TableCell>
                  <TableCell align="right">warranty years</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.type}</TableCell>
                    <TableCell align="right">{item.price}€</TableCell>
                    <TableCell align="right">{item.rating}</TableCell>
                    <TableCell align="right">{item.warranty_years}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.handleModify(index);
                        }}
                      >
                        modify
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          this.handleDelete(index);
                        }}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {this.state.removing ? (
            <Modifier
              changing={this.state.changing}
              onValid={submission => {
                this.handleValid(submission);
              }}
            />
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
