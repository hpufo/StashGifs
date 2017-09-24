import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = "VTZpQYKKtSWvHjQbymKexlQD8yF08kVB";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      message: '',
      results: []   //{src,url}
    };
  }
  onTextChange = (event) => {
    this.setState({
      query: event.target.value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    const query = encodeURIComponent(this.state.query);
    let results = [];
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`)
    .then(response => {
      for(let item of response.data.data){
        results.push({ src: item.images.original.url, url: item.url});
      }
      this.setState({results: results});
    })
    .catch(error => this.setState({message: "API call failed"}));
  }
  renderGIFs(){
    if(this.state.results.length > 0){
      return this.state.results.map((gif,i) => {
        return (<img className="gif" src={gif.src} alt="gif" />);
      });
    }
  }
  render() {
    let message = null;
    if(this.state.message)
      message = <label>{this.state.message}</label>;
      
    return (
      <div className="App">
        <h1>Stash GIFs</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="txt" onChange={this.onTextChange} />
          <input type="submit" className="btn" value="search" />
        </form>
        <div className="gifContainer">
          {message}
          {this.renderGIFs()}
        </div>
      </div>
    );
  }
}