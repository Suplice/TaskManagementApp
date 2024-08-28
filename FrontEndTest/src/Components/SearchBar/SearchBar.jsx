import './SearchBar.css';
import { useState } from 'react';

function SearchBar({ onSearch }) {

    const [placeholder, setPlaceholder] = useState('Search...');
    const [text, setText] = useState('');

    const handleSearchClick = () => {
        onSearch(text);
    }


    return (<div id="SearchBarBox">
        <input id="SearchText" value={text}  onChange={(event) => { setText(event.target.value) }} placeholder={placeholder} onBlur={() => { setPlaceholder('Search...') }} onFocus={() => { setPlaceholder('') }}></input>
        <img src='/public/SearchIcon.png' onClick={ handleSearchClick }></img>
    </div>);
}

export default SearchBar;