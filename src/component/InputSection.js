import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputCode from './InputCode'
import InputData from './InputData'
import '../stylesheet/InputSection.css'

class InputSection extends Component {
  constructor() {
    super()
    this.state = {
      submit:false,
      showCaution: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {submit, showCaution} = this.state;
    return (!submit && nextState.submit) || (showCaution !== nextState.showCaution)
  }
  componentDidUpdate() {
    this.setState({submit: false})
  }

  changeShow = () => {
    console.log('click')
    this.setState({showCaution: !this.state.showCaution})
  }

  render() {
    return (
      <section className='input-section'>
        <div className='text-input1'>Write Code</div>
        <button className='precaution' onClick={this.changeShow}><img className='cautionImg' src={require('../public/caution.png')} alt='caution'/></button>    
        <button className='input-button' onClick={input => this.setState({submit: true})}>submit</button>
        <InputCode submit={this.state.submit} getCode={this.props.getCode}/>
        <div className='text-input2'>Input Data JSON</div>
        <InputData submit={this.state.submit} getData={this.props.getData}/>
        {(this.state.showCaution)?
        <div className='coverDom'>
        <div className='cautionContent'>
          <p>1. Declare variables at the top of the scope block.</p>
          <p>2. Method Chaining does not animationized</p>
          <p>3. The method in parameter does not animationized</p>
          <p>4. Semicolon is need to the end of line</p>
          <p>5. paste the '.' and name</p>
          <button className='input-button' onClick={this.changeShow}>close</button>
        </div>
        </div>
        :null}
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