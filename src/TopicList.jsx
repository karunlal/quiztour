import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './css/TopicList.css'
import DatabaseLink from './DatabaseLink'

const TopicList = ({ topics }) => {
  const history = useHistory()
  const [expandedTopics, setExpandedTopics] = useState([])

  const handleTopicClick = (topic) => {
    if (isTopicExpanded(topic)) {
      setExpandedTopics(expandedTopics.filter((id) => id !== topic.id))
    } else {
      setExpandedTopics([...expandedTopics, topic.id])
    }
  }

  const isTopicExpanded = (topic) => expandedTopics.includes(topic.id)

  const handleSubtopicClick = (subtopic, topic) => {
    if (subtopic.jsonUrl) {
      history.push(`/topics/${topic.id}/${encodeURIComponent(subtopic.id)}`)
    } else {
      console.warn('JSON URL not available for subtopic:', subtopic.name)
    }
  }

  return (
    <div>
      <button className="topic-heading-button">PSC QUIZ</button>
      <div className="topic-heading-container">
        <button className="topic-heading-button">Choose a Topic</button>
        <DatabaseLink />
      </div>
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
                    {subtopic.jsonUrl ? (
                      <button
                        className="subtopic-button"
                        onClick={() => handleSubtopicClick(subtopic, topic)}
                      >
                        {subtopic.name}
                      </button>
                    ) : (
                      <span className="subtopic-unavailable">
                        {subtopic.name} (No Data Available)
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
