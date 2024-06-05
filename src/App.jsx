import React from 'react'
import './App.css'
import Hero from './components/Hero'
import Demo from './components/Demo'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <main>
        <div className='main'>
            <div className='gradient'/>
        </div>
        <div  className='app'>
            <Hero/>
            <Demo/>
        </div>
    </main>
  )
}

export default App
