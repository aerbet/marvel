import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import MarvelService from "./services/MarvelService";

import './style/style.scss'

const marvelService = new MarvelService();

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
