// ExampleComponent.js
import React from 'react'
import JsonViewer from './JsonViewer'
import topics from './Topics'

const ExampleComponent = () => {
  const jsonUrl = topics[0].subtopics[0].jsonUrl

  return (
    <div>
      <h1>Example Component</h1>
      <JsonViewer jsonUrl={jsonUrl} />
    </div>
  )
}

export default ExampleComponent
