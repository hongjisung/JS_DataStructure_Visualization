import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputCode from './InputCode'
import InputData from './InputData'
import '../stylesheet/InputSection.css'

class InputSection extends Component {
  constructor() {
    super()
    this.state = {submit:false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {submit} = this.state;
    return !submit && nextState.submit
  }
  componentDidUpdate() {
    this.setState({submit: false})
  }

  render() {
    return (
      <section className='input-section'>
        <div className='text-input1'>코드 작성</div>
        <button className='input-button' onClick={input => this.setState({submit: true})}>제출</button>
        <InputCode submit={this.state.submit} getCode={this.props.getCode}/>
        <div className='text-input2'>인풋 데이타 json</div>
        <InputData submit={this.state.submit} getData={this.props.getData}/>
      </section>
    )
  }
}

InputSection.propTypes = {
  getCode: PropTypes.func,
  getData: PropTypes.func,
  inputdata: PropTypes.object
}

InputSection.defaultProps = {
  getCode: f=>f,
  getData: f=>f
}

export default InputSection