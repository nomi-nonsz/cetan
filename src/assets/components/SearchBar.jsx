import React from "react";

function SearchBar ({ onChange }) {
    return (
        <div className="searchbar">
            <input type="text" name="sq" id="" placeholder="find..." onChange={onChange} />
        </div>
    )
}

export default SearchBar;