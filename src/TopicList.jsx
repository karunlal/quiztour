// TopicList.js
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './TopicList.css' // Make sure to import your CSS file

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
    // Use React Router to navigate to the subtopic URL
    history.push(`/topics/${topic.id}/${encodeURIComponent(subtopic.id)}`)
  }

  return (
    <div>
      <h2>Choose a Topic:</h2>
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
                    <button
                      className="subtopic-button"
                      onClick={() => handleSubtopicClick(subtopic, topic)}
                    >
                      {subtopic.name}
                    </button>
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
