import React from 'react'
import SearchResult from '../../components/pages/search/SearchResult'
import UserLayout from '../../components/shared/layouts/UserLayout'

const Search = () => {
  return (
    <UserLayout className='search'>
        <SearchResult />
    </UserLayout>
  )
}

export default Search