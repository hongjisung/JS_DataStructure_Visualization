import React, { Component } from 'react';
import TopBar from './component/TopBar'
import ShowSection from './component/ShowSection'
import InputSection from './component/InputSection'
import './App.css'
import testDatas from './data/testDatas'
import parsing from './data/parsing'

class App extends Component {
  constructor() {
    super()
    this.testDatas =  testDatas
    this.state = {
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      // executingCode: testDatas[0].executingCode,
      // containerState: testDatas[0].containerState,
      code: ``,
      data: {},
      step: -1,
    }
    eval('const test = 3')
  }

  getCode = (code) => {
    this.setState({code, step: -1})//, checkCall: this.state.checkCall + 1})
  }
  getData = (data) => {
    this.setState({data, step: -1})//, checkCall: this.state.checkCall + 1})
  }

  // 여기서 data와 code로 파싱한다음 nextStep 함수를 호출한다.
  componentWillUpdate(nexpProps, nextState) {
    if(this.state.code ===`` && this.state.code !== nextState.code && this.state.data !== nextState.data) {
      // 파싱
      this.testDatas = parsing({inputCode: nextState.code, inputData: nextState.data});
      console.log(this.testDatas)
      this.nextStep();
    }
  }

  nextStep = () => {
    const nextstep = this.state.step + 1
    const lastvalue = this.testDatas.length
    if (nextstep < lastvalue) {
      this.setState({
        dataStates: this.testDatas[nextstep].dataStates,
        executingCode: this.testDatas[nextstep].executingCode,
        containerState: this.testDatas[nextstep].containerState,
        step: nextstep})
    } else if (nextstep === lastvalue) {
      this.setState({
        executingCode: '',
        containerState: {object:'', method: '', params:[]},
        code:``,
        data:{},
        step: -1
      })
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
