import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import { url } from '../api';
import { geoApiOptions } from '../api';

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = async (inputValue, loadedOptions = [], { page = 1 } = {}) => {
        if (!inputValue) {
          return { options: [] };
        }
        try {
          const response = await fetch(`${url}?namePrefix=${inputValue}&offset=${(page - 1) * 10}&limit=10`, geoApiOptions);
          const result = await response.json();
    
          // Log the result to inspect the API response
          console.log('API Response:', result);
    
          // Map the results to the format expected by AsyncPaginate
          const newOptions = result.data.map((item) => ({
            label: `${item.name}, ${item.countryCode}`, // Adjust according to your API response structure
            value: `${item.latitude} ${item.longitude}`,
          }));
    
          // Check if there are more pages to load
          const hasMore = (result.metadata.totalCount > (page * 10));
    
          return {
            options: [...loadedOptions, ...newOptions],
            hasMore,
            additional: {
              page: page + 1,
            },
          };
        } catch (error) {
          console.error(error);
          return { options: [] };
        }
      };
  return (
    <div>
      <AsyncPaginate 
      placeholder="Search for city" debounceTimeout={600} value={search} onChange={handleOnChange}
      loadOptions={loadOptions}
      
      />
    </div>
  )
}

export default Search;
