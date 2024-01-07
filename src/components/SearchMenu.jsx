import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchMenu = () => {

    const navigate = useNavigate()
    const handleSubmit = (event) => {
      event.preventDefault()
      navigate(`/search/${search}`)
    }
    const [search, setSearch] = useState("")
  return (
      <form className='inline-flex gap-2' onSubmit={e => handleSubmit(e)}>
        <input
              type="text"
              className="bg-gray-200 rounded-xl py-2 w-96 px-4 outline-none placeholder-gray-500"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit' className="px-4 py-2 bg-yellow-500 rounded-xl">
            <FontAwesomeIcon icon={faSearch} />
          </button>
      </form>
  )
}

export default SearchMenu