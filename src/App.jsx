// App.js
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import JsonViewer from './JsonViewer'
import TopicList from './TopicList'
import topics from './Topics'
import Quiz from './Quiz'

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Quiz App</h1>
        <Switch>
          <Route path="/topics/:topicId/:subtopicId">
            <JsonViewer topics={topics} />
          </Route>
          <Route path="/">
            <TopicList topics={topics} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
