import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowSection.css'
import ShowDatas from './ShowDatas'
import ShowDataList from './ShowDataList'
import ShowMethodList from './ShowMethodList'
import ShowContainer from './ShowContainer'
import ShowSpecificData from './ShowSpecificData'

const ShowSection = ({specificData={}, showSpecificData=f=>f, methodAnimation = true, goMethod=f=>f, methodList=[], duration = 1, changeDuration = f=>f, changeStop=f=>f, stopShow=false,step=0,submitStack=0, nextStep= f=>f, dataStates=[], executingCode="", containerState={} }) =>
  <section className='show-section'>
    <div className='text-show1'>Variables</div>
    <ShowDataList showSpecificData={showSpecificData} stopShow={stopShow} dataStates={dataStates} changeStop={changeStop}/>
    <ShowMethodList stopShow={stopShow} goMethod={goMethod} methodList={methodList} changeStop={changeStop}/>
    <button className='stopping' onClick={changeStop}>{(stopShow)?'Restart':'Stop'}</button>
    <ShowDatas dataStates={dataStates} />
    {
      (methodAnimation)?
      <ShowContainer duration={duration} changeDuration={changeDuration} stopShow={stopShow} step={step} submitStack={submitStack} nextStep = {nextStep} containerState={containerState} executingCode={executingCode}/>
      :<ShowSpecificData specificData={specificData} />
    }
  </section>

ShowSection.propTypes = {
  specificData: PropTypes.object,
  showSpecificData: PropTypes.func,
  methodAnimation: PropTypes.bool,
  duration: PropTypes.string,
  changeDuration: PropTypes.func,
  changeStop: PropTypes.func,
  stopShow: PropTypes.bool,
  submitStack: PropTypes.number,
  nextStep: PropTypes.func,
  dataStates: PropTypes.array,
  executingCode: PropTypes.string,
  containerState: PropTypes.object,
  goMethod: PropTypes.func
}

export default ShowSection