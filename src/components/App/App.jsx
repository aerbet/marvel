import AppHeader from "../AppHeader/AppHeader.jsx";
import RandomChar from "../RandomChar/RandomChar.jsx";
import CharList from "../CharList/CharList.jsx";
import CharInfo from "../CharInfo/CharInfo.jsx";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";

import decoration from '../../resources/img/vision.png';
import {Component} from "react";

class App extends Component {
  
  state = {
    selectedChar: null,
  }
  
  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    })
  }
  
  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <ErrorBoundary>
            <RandomChar/>
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    )
  }
}

export default App;