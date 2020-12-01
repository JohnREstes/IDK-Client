import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Body from './components/Body/Body'

const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded', (e) => {
  setTimeout(() => {
    splash.classList.add('display-none');
  }, 3000)
})

function App(){
  return (
    <>
      <div  className="container-fluid">
        <Header/>
        <Body/>
      </div>
    </>
  )
}

export default App;