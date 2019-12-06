import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const dogsApi = axios.create({
  baseURL: "https://dog.ceo/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const searched = term => breed => 
  breed.toLowerCase().includes(term.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
      searchTerm: ''
    };

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    dogsApi.get("/breeds/list/all").then(res => {
      this.setState({ breeds: res.data.message });
    });
  }

  onSearch(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h2>Breeds</h2>
        <form>
          <input type="text" onChange={this.onSearch} />
        </form>
        <ul>
          {Object.keys(this.state.breeds).filter(searched(this.state.searchTerm)).map(breed => (
            <li key={breed.toString()}>{breed}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
