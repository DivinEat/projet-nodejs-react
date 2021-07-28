import React, {useState} from 'react';
import Button from "../lib/Button";

const SearchBar = ({submit}) => {
    const BarStyling = {width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem"};
    const [query, setQuery] = useState();
    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    return (
        <>
            <input
                style={BarStyling}
                value={query}
                placeholder={"Search transactions"}
                onChange={handleChange}
            />
            <Button className="btn-credential" title="Search"
                    onClick={() => submit(query)}/>
        </>
    );
}

export default SearchBar