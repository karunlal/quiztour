import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import JsonViewer from './JsonViewer'
import TopicList from './TopicList'
import fetchData from './DataService' // Ensure this is the correct import
import Quiz from './Quiz'
import './Styles.css'

const App = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const fetchDataFromLink = async () => {
      try {
        const data = await fetchData(
          'https://script.google.com/macros/s/AKfycbwzYNshjkKBCuP0EMtx8ao0-j7_IUeopyiqBlz-w5pgBKGSCfiN9riaBvpLn5M1wDo/exec'
        )
        setTopics(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataFromLink()
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
