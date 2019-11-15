import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
// import Home from './Home'
import AdminIndex from './AdminIndex'

function Main() {
    return (
        <Router>
            <Route path='/login' exact component={Login} />
            {/* <Route path='/home' exact component={Home} /> */}
            <Route path='/index' exact component={AdminIndex}/>
        </Router>
    )
    
}

export default Main