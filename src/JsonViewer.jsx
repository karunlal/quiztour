// JsonViewer.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Quiz from './Quiz'
import fetchData from './DataService'
//import './Styles.css'
import './css/JsonViewer.css'

const JsonViewer = ({ topics }) => {
  const { topicId, subtopicId } = useParams()

  const selectedTopic = topics.find((topic) => topic.id === topicId)
  const selectedSubtopic = selectedTopic?.subtopics.find(
    (subtopic) => subtopic.id === subtopicId
  )

  const [jsonData, setJsonData] = useState(null)

  useEffect(() => {
    const fetchDataForSubtopic = async () => {
      try {
        console.log('Fetching data for subtopic:', selectedSubtopic)
        if (selectedSubtopic) {
          const data = await fetchData(selectedSubtopic.jsonUrl)
          console.log('Fetched data:', data)
          setJsonData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setJsonData(null)
      }
    }

    fetchDataForSubtopic()
  }, [selectedSubtopic])

  useEffect(() => {
    console.log('Render - selectedSubtopic:', selectedSubtopic)
    console.log('Render - jsonData:', jsonData)
  }, [selectedSubtopic, jsonData])

  return (
    <div>
      {selectedTopic && <h2>Topic: {selectedTopic.name}</h2>}

      {selectedSubtopic && (
        <div>
          <h3>Subtopic: {selectedSubtopic.name}</h3>
          {jsonData ? (
            <div>
              <Quiz jsonData={jsonData} />
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default JsonViewer
