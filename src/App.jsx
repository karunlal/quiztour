import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import JsonViewer from './JsonViewer'
import TopicList from './TopicList'
import TopicsData from './Topics.json' // Importing the JSON file
import './Styles.css'

const App = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // Using the locally imported JSON data
    setTopics(TopicsData)
  }, [])

  return (
    <div>
      <Router>
        <>
          <Switch>
            <Route path="/topics/:topicId/:subtopicId">
              <JsonViewer topics={topics} />
            </Route>
            <Route path="/">
              <TopicList topics={topics} />
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  )
}

export default App
