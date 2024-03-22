import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState({})
  const [history, setHistory] = useState([])

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_hbN3XjSGMN99JWMOlNvQZII9Z6FtMorF0fv0V9ICuzYatmnmAVZI8pbxYw8pM5PX"
  });

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: 'follow'
  };

  async function getPicture() {
    console.log(history)
    await fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (current.url != undefined) {
        setHistory([...history, current])
      }
      setCurrent(result[0])
    })
    .catch(error => console.log('error', error));
  }

  function renderAnimal() {
    if (current.url !== undefined) {
      return (
        <img className="dog-image" src={current.url}></img>
      )
    }
  }

  function renderHistory() {
    return history.map((animal, key) => {
      return (
        <img className="history-image" src={animal.url} key={key}></img>
      )
    })
  }

  return (
    <>
      <div className='App'>
      <div className='history'>
        <h1>History</h1>
        {renderHistory()}
        </div>
        <div className='middle-section'>
          {renderAnimal()}
          <button onClick={getPicture}>Call API</button>
        </div>
        <div className='ban-list'>
          <h1>Banned List</h1>
          </div>
      </div>
    </>
  )
}

export default App
