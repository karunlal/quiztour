// App.js
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import JsonViewer from './JsonViewer'
import TopicList from './TopicList'
import topics from './Topics'
import Quiz from './Quiz'
import Button from 'react-bootstrap/Button'
import './Styles.css'

const App = () => {
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
