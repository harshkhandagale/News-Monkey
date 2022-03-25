import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import{
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
const App =()=>{
  const pageSize=10;
  //apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar color='#f11946' progress={progress}/>
        <Switch>
          <Route exact path="/"> <News setProgress={setProgress}  key="general" pageSize={pageSize}   country="in" category="general"/></Route>
          <Route exact path="/Business"> <News setProgress={setProgress} key="Business" pageSize={pageSize}   country="in" category="Business"/></Route>
          <Route exact path="/Entertainment"> <News setProgress={setProgress} key="Entertainment" pageSize={pageSize}   country="in" category="Entertainment"/></Route>
          <Route exact path="/General"> <News setProgress={setProgress} key="General" pageSize={pageSize}   country="in" category="General"/></Route>
          <Route exact path="/Health"><News setProgress={setProgress} key="Health"  pageSize={pageSize}   country="in" category="Health"/></Route>
          <Route exact path="/Science">  <News setProgress={setProgress} key="Science" pageSize={pageSize}   country="in" category="Science"/></Route>
          <Route exact path="/Sports"><News setProgress={setProgress} key="Sports" pageSize={pageSize}   country="in" category="Sports"/></Route>
          <Route exact path="/Technology"><News setProgress={setProgress}  key="Technology" pageSize={pageSize}   country="in" category="Technology"/></Route>
        </Switch>
        </Router>
      </div>
    )
    }
    export default App;