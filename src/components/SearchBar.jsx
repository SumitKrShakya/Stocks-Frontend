import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { searchRoute } from "../utils/apiRoutes";

const SearchBar = ({setSymbol}) => {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchOpen = useRef()
  
  useEffect(() => {
    console.log(searchOpen.current.focus())
  }, [])
  

  const handleSearch = async (e) => {
    console.log(inputText);

    setInputText(e.target.value);
    if(e.target.value.length ===0){
      setSearchResults([]);
      return;
    }
    const response = await axios.post(`${searchRoute}`, {
      inputText: e.target.value,
    });
    const responseData = response.data;
    setSearchResults(responseData.quotes);
    console.log(responseData.quotes);
  };

  return (
    <FormContainer>
      <div className="">
        <input ref={searchOpen} type="text" onChange={handleSearch} value={inputText} />
        <div className="results">
          {
            searchResults.length > 0 && 
            searchResults.map((result,i) => {
              return <div key={i} onClick={()=>{setSymbol(result.symbol)}}>{result.shortname}</div>;
            })
          }
        </div>
      </div>
    </FormContainer>
  );
};
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 100vw;
  height: ${Math.max((window.innerHeight * 10) / 100, 70)}px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0px;
  left: 0px;
`;

export default SearchBar;
