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
    const start = 0;
    this.state = {
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      step: -1,
      // executingCode: testDatas[start].executingCode,
      // containerState: testDatas[start].containerState,
      // step: start,
      code: ``,
      data: {},
      submitStack: 0 // this is for stop the executing process now.
    }
  }

  getCode = (code) => {
    this.setState({
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      code, 
      step: -1, 
      submitStack: this.state.submitStack+1})
  }
  getData = (data) => {
    this.setState({
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      data, 
      step: -1, 
      submitStack: this.state.submitStack+1})
  }

  // 여기서 data와 code로 파싱한다음 nextStep 함수를 호출한다.
  shouldComponentUpdate(nexpProps, nextState) {
    console.log(this.state.submitStack, nextState.submitStack)
    if((this.state.submitStack !== nextState.submitStack)) {
      // 파싱
      console.log('call nextStep in update')
      this.testDatas = parsing({inputCode: nextState.code, inputData: nextState.data});
      console.log(this.testDatas)
      this.nextStep(nextState.submitStack, nextState);
      return false
    }
    return true 
  }

  nextStep = (submitStack, state = this.state) => {
    const nextstep = state.step + 1
    const lastvalue = this.testDatas.length
    console.log("stack: ",submitStack, state.submitStack)
    console.log("step: ", nextstep, lastvalue)
      
    if (submitStack === state.submitStack && nextstep < lastvalue) {
      this.setState({
        dataStates: this.testDatas[nextstep].dataStates,
        executingCode: this.testDatas[nextstep].executingCode,
        containerState: this.testDatas[nextstep].containerState,
        step: nextstep})
    } else if (submitStack === state.submitStack && nextstep === lastvalue) {
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
        <ShowSection step={this.state.step} submitStack={this.state.submitStack} nextStep={this.nextStep} dataStates={this.state.dataStates} executingCode = {this.state.executingCode} containerState={this.state.containerState}/>
        <InputSection getCode={this.getCode} getData={this.getData}/>
      </div>
    );
  }
}

export default App;
