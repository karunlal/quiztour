// App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import JsonViewer from './JsonViewer';
import TopicList from './TopicList';
import fetchData from './DataService';
import Quiz from './Quiz';
//import DatabaseLink from './DatabaseLink'; // Import DatabaseLink component
import './Styles.css';

const App = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchDataFromLink = async () => {
      try {
        const data = await fetchData(
          'https://script.googleusercontent.com/macros/echo?user_content_key=wenjJF6TRFEaH0dKomxpTeKSQos5ocGV1hI1zkQKr4FsfW558_Zz2kFA1t34Btcrv1J8iQg0jMwqMPvCc6AH6GA1GF_sgUMHm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAdD5CtlJ11ucnPP1D54129qsoM-e-_yvEF1HoD61auLEEADr4s_bVq-tWUrybmF_RlX0jhgdld4s2gO3cQw7F-dJoCw8JvXDg&lib=MdqEA5bqoDmq289fmHQdM4TQM98uU350M'
        );
        setTopics(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromLink();
  }, []);

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
  );
};

export default App;
