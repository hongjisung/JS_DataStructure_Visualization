import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/DocPage.css'

const DocPage = ({ docLink='' }) =>
  <div className='doc-page'>
  <a href={docLink} className ='doc-address'>Doc 페이지</a>
  </div>

DocPage.propTypes = {
  docLink: PropTypes.string
}

export default DocPage
