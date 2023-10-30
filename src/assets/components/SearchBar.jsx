import React from "react";
import { ReactComponent as SearchIcon } from "../svg/search.svg";

function SearchBar ({ onChange }) {
    return (
        <div className="searchbar">
            <input type="text" name="sq" placeholder="Find..." onChange={onChange} />
            <SearchIcon />
        </div>
    )
}

export default SearchBar;