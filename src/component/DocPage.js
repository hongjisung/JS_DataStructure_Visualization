import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/DocPage.css'

const DocPage = ({ docLink='' }) =>
  <div className='doc-page'>
    <a href={docLink} className ='doc-address'>Doc Page</a>
  </div>

DocPage.propTypes = {
  docLink: PropTypes.string
}

export default DocPage
