// DatabaseLink.js
import React from 'react'
import Button from 'react-bootstrap/Button'

const DatabaseLink = ({ disabled }) => {
  const handleButtonClick = () => {
    // Open the link in a new tab
    window.open(
      'https://docs.google.com/spreadsheets/d/19FFwGpfQV8iaYJPQITLUhBVyoF0_UBg4uZUVGQtbgBA/edit#gid=0',
      '_blank'
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
      }}
    >
      <Button variant="danger" onClick={handleButtonClick} disabled={disabled}>
        Go to Database
      </Button>
    </div>
  )
}

export default DatabaseLink
