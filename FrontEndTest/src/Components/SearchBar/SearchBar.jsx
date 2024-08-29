import './SearchBar.css';
import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {

    const [placeholder, setPlaceholder] = useState('Search...');
    const [text, setText] = useState('');
    const [removeIconVisibility, setRemoveIconVisibility] = useState(false);

    useEffect(() => {
        function ChangeIconVisibility() {
            if (text === '') {
                setRemoveIconVisibility(true);
            }
            else {
                setRemoveIconVisibility(false);
            }
        }

        ChangeIconVisibility();
    }, [text]);

    const handleSearchClick = () => {
        onSearch(text);
    }

    const handleRemoveIconClick = () => {
        setText('');
        onSearch('');
    };


    return (<div id="SearchBarBox">
        <input id="SearchText" value={text} onChange={(event) => { setText(event.target.value) }} placeholder={placeholder} onBlur={() => { setPlaceholder('Search...') }} onFocus={() => { setPlaceholder('') }}></input>
        <img src='/public/removeSearchIcon.jpg' id='removeIcon' hidden={removeIconVisibility} onClick={handleRemoveIconClick }></img>
        <img src='/public/SearchIcon.png' id='searchIcon' onClick={handleSearchClick}></img>
    </div>);
}

export default SearchBar;