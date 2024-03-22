import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState({})
  const [history, setHistory] = useState([])
  const [banList, setBanList] = useState([])

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
    let result = null;
    let traits = [];
  
    while (!result || traits.some(trait => banList.includes(trait))) {
      try {
        const response = await fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions);
        const data = await response.json();
        result = data[0];
        console.log(data)
        traits = result.breeds[0].temperament.split(" ").join("").split(",")

      } catch (error) {
        console.error('Error fetching picture:', error);
      }
    }
  
    if (result) {
      if (current.url !== undefined) {
        setHistory([...history, current]);
      }
      setCurrent(result);
    }
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

  function renderBanList() {
    return banList.map((trait, key) => {
      return (
        <p key={key}>{trait}</p>
      )
    })
  }

  function renderAttributes() {
    if (current.breeds != undefined) {
      const temperament = current.breeds[0].temperament.split(" ").join("").split(",")
      return (
        <>
        <button className='attribute-button' onClick={() => {addToBanList(temperament[0])}}>{temperament[0]}</button>
        <button className='attribute-button' onClick={() => {addToBanList(temperament[1])}}>{temperament[1]}</button>
        <button className='attribute-button'onClick={() => {addToBanList(temperament[2])}}>{temperament[2]}</button>
        </>
      )
    }
  }

  function addToBanList(trait) {
    if (!banList.includes(trait)) {
      setBanList([...banList, trait])
    }
    console.log(banList)
  }

  return (
    <>
      <div className='App'>
      <div className='history'>
        <h1 className='section-header'>History</h1>
        {renderHistory()}
        </div>
        <div className='middle-section'>
          <h1>Lets find you some dogs!</h1>
          <div className='attribute-section'>
            {renderAttributes()}
          </div>
          <div className='animal-container'>
            {renderAnimal()}
          </div>
          <button onClick={getPicture}>Find Dog</button>
        </div>
        <div className='ban-list'>
          <h1 className='section-header'>Banned List</h1>
          {renderBanList()}
          </div>
      </div>
    </>
  )
}

export default App
