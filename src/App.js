import React, { Component } from 'react';
import TopBar from './component/TopBar'
import ShowSection from './component/ShowSection'
import InputSection from './component/InputSection'
import './App.css'
import {List} from 'js_dsal'

class App extends Component {
  constructor() {
    super()
    this.show = new List([1,3,7, 15, -10, 6, 8])
    this.executingCode = "li.pushBack(5)"
    this.state = {
      dataStates: [{name: "li", value: this.show}, {name: "i", value: 3}, {name: "arr", value: [5,10,15]}],
      containerState:{"object": this.show, "method": 'pushBack', "params": [5]},
      code: ``,
      data: {},
    }
  }

  getCode = (code) => {
    this.setState({code})
    console.log(this.state.code)
  }
  getData = (data) => {
    this.setState({data})
    console.log(this.state.data)
  }
  render() {
    return (
      <div className="App">
        <TopBar github='https://github.com/hongjisung/DataStructure'
                docLint=''
                operationCount={{count: 0}}/>
        <ShowSection dataStates={this.state.dataStates} executingCode = {this.executingCode} containerState={this.state.containerState}/>
        <InputSection getCode={this.getCode} getData={this.getData}/>
      </div>
    );
  }
}

export default App;
