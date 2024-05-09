import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import Spinner from "../Spinner/Spinner.jsx";

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
    }
    
    marvelService = new MarvelService();
    
    componentDidMount() {
        this.marvelService.getAllCharacters()
          .then(this.onCharLoaded)
          .catch(this.handleError)
    }
    
    
    onCharLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            error: false,
        });
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
        const { charList, loading, error } = this.state;
        
        const content = this.getCharacters(charList);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        
        return (
          <div className="char__list">
                  {errorMessage}
                  {spinner}
                  {content}
              <button className="button button__main button__long">
                  <div className="inner">load more</div>
              </button>
          </div>
        )
    }
}

export default CharList;