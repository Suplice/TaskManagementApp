import './SearchBar.css';
import { useState } from 'react';

function SearchBar({ Tasks,  onTextChange }) {

    const [placeholder, setPlaceholder] = useState('Search...');


    return (<div id="SearchBarBox">
        <input id="SearchText" placeholder={placeholder} onBlur={() => { setPlaceholder('Search...') }} onFocus={() => { setPlaceholder('') }}></input>
        <img src='/public/SearchIcon.png'></img>
    </div>);
}

export default SearchBar;