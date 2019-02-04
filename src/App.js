import React, { Component } from 'react';
import TopBar from './component/TopBar'
import ShowSection from './component/ShowSection'
import InputSection from './component/InputSection'
import './App.css'
import testDatas from './data/testDatas'

class App extends Component {
  constructor() {
    super()
    this.state = {
      dataStates: [{name: "li", value: testDatas[0].show}, {name: "i", value: 3}, {name: "arr", value: [5,10,15]}],
      executingCode: testDatas[0].executingCode,
      containerState: testDatas[0].containerState,
      code: ``,
      data: {},
      testDatas: testDatas,
      step: 0
    }
  }

  getCode = (code) => {
    this.setState({code})
  }
  getData = (data) => {
    this.setState({data})
  }
  nextStep = () => {
    const nextstep = this.state.step + 1
    if (nextstep < 4){//Object.keys(this.state.testDatas).length) {
      this.setState({
        executingCode: this.state.testDatas[nextstep].executingCode,
        containerState: this.state.testDatas[nextstep].containerState,
        step: nextstep})
    }
  }

  render() {
    return (
      <div className="App">
        <TopBar github='https://github.com/hongjisung/DataStructure'
                docLint=''
                operationCount={{count: 0}}/>
        <ShowSection  nextStep={this.nextStep} dataStates={this.state.dataStates} executingCode = {this.state.executingCode} containerState={this.state.containerState}/>
        <InputSection getCode={this.getCode} getData={this.getData}/>
      </div>
    );
  }
}

export default App;
