import './charInfo.scss';

import MarvelService from "../../services/MarvelService";

import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeleton from "../Skeleton/Skeleton";

import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const marvelService = new MarvelService();
  const { charId } = props;
  
  useEffect(() => {
    updateChar();
  }, [charId]);
  
  const updateChar = () => {
    const {charId} = props;
    
    if (!charId) {
      return;
    }
    
    onCharLoading();
    
    marvelService
      .getCharacter(charId)
      .then(onCharLoaded)
      .catch(onError);
  }
  
  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  }
  
  const onCharLoading = () => {
    setLoading(true);
  }
  
  const onError = () => {
    setLoading(false)
    setError(true);
  }
    
  const skeleton = char || loading || error ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;
  
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const imgStyle = {'objectFit' : 'inherit'};
  const comicsChar = comics.length === 0 ? 'Character does not have comics' : null;
  
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail}
             alt={name}
             style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
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
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics: {comicsChar}</div>
      <ul className="char__comics-list">
        {
          comics.slice(0, 10).map((item, i) => {
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

View.propTypes = {
  char: PropTypes.object,
  name: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.object,
  homepage: PropTypes.object,
  wiki: PropTypes.object,
  comics: PropTypes.array,
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;