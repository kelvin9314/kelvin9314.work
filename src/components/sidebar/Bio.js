import React, { useState } from 'react'
import './sidebar.css'

import profileIcon from '../../images/v2.jpg'

const Bio = ({ author, tagline }) => {
  const [isSentenceShow, setIsSentenceShow] = useState(false)
  return (
    <div className="bio-main w-75">
      <img
        src={profileIcon}
        style={{ maxWidth: `100px` }}
        className="profile-img"
        alt=""
        onMouseOverCapture={() => setIsSentenceShow(!isSentenceShow)}
        onMouseOutCapture={() => setIsSentenceShow(!isSentenceShow)}
      />
      {isSentenceShow ? (
        <div style={{ fontSize: '12px', color: '#DC143C' }}>
          People should not be afraid of their government. Governments should be afraid of their people.
        </div>
      ) : null}
      <h3 className="mt-2 author-bio">{author}</h3>
      <small className="text-muted">{tagline}</small>
    </div>
  )
}

export default Bio
