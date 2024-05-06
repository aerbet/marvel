class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=b2369f17d55c02a70dd7558499d79efa';
  
  getResource = async (url) => {
    let res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
  }
  
  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=360&${this._apiKey}`);
    
    return res.data.results.map(this._transformCharacter)
  }
  
  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description === '' ? 'The character does not have description.' : char.description.slice(0, 214) + '...',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    }
  }
  
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0])
  }
}

export default MarvelService;