import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/ShowSection.css'
import ShowDatas from './ShowDatas'
import ShowContainer from './ShowContainer'

const ShowSection = ({ nextStep= f=>f, dataStates=[], executingCode="", containerState={} }) =>
  <section className='show-section'>
  <div className='text-show1'>데이터 상태</div>
    <ShowDatas dataStates={dataStates} />
    <div className='text-show2'>컨테이너 상태</div>
    <div className='text-show3'>실행코드: {executingCode}</div>
    <ShowContainer nextStep = {nextStep} containerState={containerState} />
  </section>

ShowSection.propTypes = {
  dataStates: PropTypes.array,
  executingCode: PropTypes.string,
  containerState: PropTypes.object
}

export default ShowSection