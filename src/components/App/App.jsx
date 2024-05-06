import AppHeader from "../AppHeader/AppHeader.jsx";
import RandomChar from "../RandomChar/RandomChar.jsx";
import CharList from "../CharList/CharList.jsx";
import CharInfo from "../CharInfo/CharInfo.jsx";

import decoration from '../../resources/img/vision.png';

const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;