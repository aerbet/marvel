import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const marvelService = new MarvelService();
    
    useEffect(() => {
        updateCharacter()
    }, []);
    
    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
        setError(false);
    }
    
    const handleError = () => {
        setLoading(false);
        setError(true);
    }
    
    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011309 - 1011000) + 1011000);
        marvelService
          .getCharacter(id)
          .then(onCharLoaded)
          .catch(handleError)
    }
    
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
        
    return (
      <div className="randomchar">
          {/*{loading ? <Spinner /> : <View char={char}/>}*/} {/*условный рендеринг*/}
          {errorMessage}
          {spinner}
          {content}
          <div className="randomchar__static">
              <p className="randomchar__title">
                  Random character for today!<br/>
                  Do you want to get to know him better?
              </p>
              <p className="randomchar__title">
                  Or choose another one
              </p>
              <button onClick={updateCharacter} className="button button__main">
                  <div className="inner">try it</div>
              </button>
              <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
          </div>
      </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    
    return (
      <div className="randomchar__block">
          <img src={thumbnail}
               alt="Random character"
               className="randomchar__img"/>
          <div className="randomchar__info">
              <p className="randomchar__name">{name}</p>
              <p className="randomchar__descr">
                  {description}
              </p>
              <div className="randomchar__btns">
                  <a href={homepage}
                     className="button button__main">
                      <div className="inner">homepage</div>
                  </a>
                  <a href={wiki}
                     className="button button__secondary">
                      <div className="inner">Wiki</div>
                  </a>
              </div>
          </div>
      </div>
    )
}

View.propTypes = {
    char: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.object,
    homepage: PropTypes.object,
    wiki: PropTypes.object,
}

export default RandomChar;