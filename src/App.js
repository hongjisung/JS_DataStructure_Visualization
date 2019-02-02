import React, { Component } from 'react';
import TopBar from './component/TopBar'
import ShowSection from './component/ShowSection'
import InputSection from './component/InputSection'
import './App.css'
import {List} from 'js_dsal'

const testDatas = [
  {
    show : `new List([1 , 3, 7, 15, -10, 6, 8])`,
    executingCode: `li.pushBack(5)`,
    containerState: `{"object": this.show, "method": 'pushBack', "params": [5]}`
  },
  {
    show : `new List([1 , 3, 7, 15, -10, 6, 8])`,
    executingCode: `li.popBack()`,
    containerState: `{"object": this.show, "method": 'popBack', "params": []}`
  },
  {
    show : `new List([1 , 3, 7, 15, -10, 6, 8])`,
    executingCode: `li.pushFront(4)`,
    containerState: `{"object": this.show, "method": 'pushFront', "params": [4]}`
  },
  {
    show : `new List([1 , 3, 7, 15, -10, 6, 8])`,
    executingCode: `li.popFront()`,
    containerState: `{"object": this.show, "method": 'popFront', "params": []}`
  }
]


class App extends Component {
  constructor() {
    super()
    this.show = new List([1, 3, 7, 15, -10, 6, 8, 100, 'dfd'])
    this.executingCode = "li.pushFront(4)"
    this.state = {
      dataStates: [{name: "li", value: this.show}, {name: "i", value: 3}, {name: "arr", value: [5,10,15]}],
      containerState:{"object": this.show, "method": 'pushFront', "params": [4]},
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
