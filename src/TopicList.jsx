// TopicList.js
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './css/TopicList.css' // Make sure to import your CSS file
//import './Styles.css'

const TopicList = ({ topics }) => {
  const history = useHistory()
  const [expandedTopics, setExpandedTopics] = useState([])

  const handleTopicClick = (topic) => {
    console.log('Clicked on topic:', topic.name)
    if (isTopicExpanded(topic)) {
      setExpandedTopics(
        expandedTopics.filter((expandedTopic) => expandedTopic !== topic.id)
      )
    } else {
      setExpandedTopics([...expandedTopics, topic.id])
    }
  }

  const isTopicExpanded = (topic) => {
    return expandedTopics.includes(topic.id)
  }

  const handleSubtopicClick = (subtopic, topic) => {
    console.log('Clicked on subtopic:', subtopic.name)

    // Check if the JSON URL is available for the subtopic
    if (subtopic.jsonUrl) {
      // Use React Router to navigate to the subtopic URL
      history.push(`/topics/${topic.id}/${encodeURIComponent(subtopic.id)}`)
    } else {
      // Handle the case where JSON URL is not available (you can hide the button or show a message)
      console.warn('JSON URL not available for subtopic:', subtopic.name)
    }
  }

  return (
    <div>
      <button className="topic-heading-button">PSC QUIZ</button>
      <br />
      <button className="topic-heading-button">Choose a Topic</button>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              className="topic-button"
              onClick={() => handleTopicClick(topic)}
            >
              <strong>{topic.name}</strong>
            </button>
            {isTopicExpanded(topic) && (
              <ul>
                {topic.subtopics.map((subtopic) => (
                  <li key={subtopic.id}>
                    {subtopic.jsonUrl ? ( // Check if JSON URL is available
                      <button
                        className="subtopic-button"
                        onClick={() => handleSubtopicClick(subtopic, topic)}
                      >
                        {subtopic.name}
                      </button>
                    ) : (
                      // You can choose to hide the button or display a message
                      <span className="subtopic-unavailable">
                        {subtopic.name} (JSON URL not available)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopicList
