import React, { useState } from 'react';
import logo from '../Breddit logo.png';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder=" Search...  "
            />
            <button type="submit" className='search-button'>
                <img src={logo} alt="Search"  />
            </button>
        </form>
    );
};

export default SearchBar;
