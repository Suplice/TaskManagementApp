import './SearchBar.css';
import { useState, useEffect } from 'react';

function SearchBar({ onSearch, tasks }) {

    const [placeholder, setPlaceholder] = useState('Search...');
    const [text, setText] = useState('');
    const [removeIconVisibility, setRemoveIconVisibility] = useState(false);
    const [isSearchFastResultsVisible, setIsSearchResultsVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

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


    useEffect(() => {
        function mapResults() {

            const filteredTasks = tasks.filter(task =>
                task.title.toLowerCase().includes(text.toLowerCase())
            );

            if (filteredTasks.length === 0) {
                setSearchResults(<div id="noSearchTasksFound"> No tasks found</div>)
            }
            else {
                setSearchResults(filteredTasks.map((task) => (
                    <div id="searchItem" key={task.taskId} > {task.title} </div>
                )));
            }


            setIsSearchResultsVisible(true);
        }

        if (text == '') {
            setIsSearchResultsVisible(false);
            return;
        }

        mapResults();


    }, [text, tasks]);

    const handleSearchClick = () => {
        onSearch(text);
    }

    const handleRemoveIconClick = () => {
        setText('');
        onSearch('');
    };

  

    return (<div id="searchSection">
        <div id="SearchBarBox">
        <input id="SearchText" autoComplete="off" value={text} onChange={(event) => { setText(event.target.value) }} placeholder={placeholder} onBlur={() => { setPlaceholder('Search...') }} onFocus={() => { setPlaceholder('') }}></input>
        <img src='/public/removeSearchIcon.jpg' id='removeIcon' hidden={removeIconVisibility} onClick={handleRemoveIconClick }></img>
        <img src='/public/SearchIcon.png' id='searchIcon' onClick={handleSearchClick}></img>
        </div>
        {isSearchFastResultsVisible && <div id="lowerSection">
            {searchResults}
        </div> }
    </div>);
}

export default SearchBar;