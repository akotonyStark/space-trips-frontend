import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useSearchBox } from 'react-instantsearch-hooks'

import { AppContext } from '../App'
import { useHits } from 'react-instantsearch-hooks'

const StyledInput = styled.input`
  color: #f1f1f1;
  background-color: inherit;
  height: 30px;
  width: 100%;
  padding-left: 10px;
  border: 0px;
`

const ResultsItem = styled.div`
  color: black;
  border-bottom: 1px solid #cecece;
  padding: 8px;
`

const StyledHits = styled.div`
  background: white;
  position: absolute;
  width: inherit;
  z-index: 1000;
  margin: 0;
  max-height: 200px;
  overflow: auto;
`

const SearchInput = (props) => {
  const { query, refine } = useSearchBox(props)
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef(null)
  const [isSearching, setIsSearching] = useState(false)

  const { hits } = useHits()

  const [, setSpaceCenters, , ,] = useContext(AppContext)

  useEffect(() => {
    if (query !== inputValue) {
      refine(inputValue)
    }

    setSpaceCenters(hits)
  }, [inputValue, refine, hits, query])

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // Bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (document.activeElement !== inputRef.current && query !== inputValue) {
      setInputValue(query)
    }
  }, [query])

  return (
    <div>
      <StyledInput
        placeholder='Search for Space Trips'
        ref={inputRef}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        type='search'
        value={inputValue}
        onKeyUp={() => setIsSearching(true)}
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />

      <StyledHits>
        {isSearching &&
          hits.map((res) => (
            <ResultsItem
              key={res.objectID}
              onClick={() => {
                setIsSearching(false)
                setInputValue(res.name)
              }}
            >
              {res.name}
            </ResultsItem>
          ))}
      </StyledHits>
    </div>
  )
}

export default SearchInput
