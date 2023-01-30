import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { searchRoute } from "../utils/apiRoutes";

const SearchBar = ({setSymbol}) => {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchOpen = useRef()
  const searchText = useRef()
  
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

  const handleFocus = (e) => {
    searchOpen.current.style.height = "100vh"
  }

  const handleFocusOut = (e) => {
    // searchText.current.value = ""
    // setInputText("")
    setTimeout(() => {
      searchOpen.current.style.height = "70px"
    }, 2000);
      
  }

  return (
    <FormContainer ref={searchOpen} >
      <div className="">
        <input ref={searchText} placeholder="Search for various companies here..."  onFocus={handleFocus} onBlur={handleFocusOut} type="text" onChange={handleSearch} value={inputText} />
        <div className="results">
          {
            searchResults.length > 0 && 
            searchResults.map((result,i) => {
              return <div key={i} onClick={()=>{
                setInputText("")
                setSearchResults([])
                setSymbol(result.symbol)}}>{result.shortname}</div>;
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
  transition: all 1s ease-in-out ;
  height: ${Math.max((window.innerHeight * 10) / 100, 70)}px;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0px;
  left: 0px;
  div{
    overflow: hidden;
    input{
      width: 500px;
      border-radius: 5px;
      height: 20px;
      padding: 5px;
      margin-top: 5px;
    }
    div{
      padding: 20px;
      div{
        cursor: pointer;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
        &:hover{
          background-color: #f2f2f2;
        }
        &:active{
          background-color: #e6e6e6;
        } 
        &:focus{
          outline: none;
        }
      }
    }
  }

`;

export default SearchBar;
