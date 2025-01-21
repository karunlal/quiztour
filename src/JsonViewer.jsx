import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Quiz from './Quiz'
import fetchData from './DataService'
import './css/JsonViewer.css'

const JsonViewer = ({ topics }) => {
  const { topicId, subtopicId } = useParams()

  const selectedTopic = topics.find((topic) => topic.id === topicId)
  const selectedSubtopic = selectedTopic?.subtopics.find(
    (subtopic) => subtopic.id === subtopicId
  )

  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDataForSubtopic = async () => {
      try {
        if (selectedSubtopic) {
          const data = await fetchData(selectedSubtopic.jsonUrl)
          setJsonData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(`Error: ${error.message}`)
      }
    }

    fetchDataForSubtopic()
  }, [selectedSubtopic])

  return (
    <div>
      {selectedTopic && <h2>Topic: {selectedTopic.name}</h2>}
      {selectedSubtopic && (
        <div>
          <h3>Subtopic: {selectedSubtopic.name}</h3>
          {jsonData ? (
            <Quiz jsonData={jsonData} />
          ) : (
            <p>{error || 'Loading...'}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default JsonViewer
