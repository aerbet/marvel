import './charList.scss';

import MarvelService from "../../services/MarvelService";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";

import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

const CharList = (props) =>  {
    
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(304);
    const [charEnded, setCharEnded] = useState(false);
    
    const marvelService = new MarvelService();
    
    useEffect(() => {
        onRequest();
    }, []);
    
    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
          .then(onCharLoaded)
          .catch(handleError)
    }
    
    const onCharListLoading = () => {
        setNewItemLoading(true);
    }
    
    const onCharLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        
        setCharList(charList => [...charList, ...newCharList])
        setLoading(false)
        setError(false)
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }
    
    const handleError = () => {
        setLoading(false);
        setError(true)
    }
    
    let itemRefs = useRef([]);
    
    const focusOnCard = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    
    const getCharacters = (arr) => {
        const items = arr.map((item, index) => {
            const imgStyle = {'objectFit' : 'unset'};
            
            return (
              <li className="char__item"
                  ref={el => itemRefs.current[index] = el}
                  key={item.id}
                  tabIndex={item.id}
                  onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnCard(index);
              }}
              >
                  <img src={item.thumbnail}
                       alt={item.name}
                       style={imgStyle}/>
                  <div className="char__name">{item.name}</div>
              </li>
            )
        });
        
        return (
          <ul className="char__grid">
              {items}
          </ul>
        )
    }
    
    const content = getCharacters(charList);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    
    return (
      <div className="char__list">
              {errorMessage}
              {spinner}
              {content}
          <button
            className="button button__main button__long"
            style={{'display': charEnded ? 'none' : 'block'}}
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
          >
              <div className="inner">load more</div>
          </button>
      </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;