import './charList.scss';

import {Component} from "react";
import MarvelService from "../../services/MarvelService";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";

import PropTypes from "prop-types";

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 270,
        charEnded: false,
    }
    
    marvelService = new MarvelService();
    
    componentDidMount() {
        this.onRequest();
    }
    
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
          .then(this.onCharLoaded)
          .catch(this.handleError)
    }
    
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    
    onCharLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    }
    
    handleError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }
    
    getCharacters(arr) {
        const items = arr.map((item) => {
            const imgStyle = {'objectFit' : 'unset'};
            
            return (
              <li className="char__item char__item_selected"
                  key={item.id}
                  onClick={() => this.props.onCharSelected(item.id)}
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
    
    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;
        
        const content = this.getCharacters(charList);
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
                onClick={() => this.onRequest(offset)}
              >
                  <div className="inner">load more</div>
              </button>
          </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;