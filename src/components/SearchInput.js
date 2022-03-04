import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSearchBox } from 'react-instantsearch-hooks'

const StyledInput = styled.input`
  color: #f1f1f1;
  background-color: inherit;
  height: 30px;
  width: 100%;
  padding-left: 10px;
  border: 0px;
`

const SearchInput = (props) => {
  const { query, refine, isSearchStalled } = useSearchBox(props)
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  function handleReset(event) {
    event.preventDefault()
    event.stopPropagation()

    setInputValue('')

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== inputValue) {
      refine(inputValue)
    }
  }, [inputValue, refine])

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
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
    </div>
  )
}

export default SearchInput
