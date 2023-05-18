import React, { useState } from 'react';
import PropTypes from 'prop-types';
 import { toast } from 'react-toastify';
 import {
  SearchbarStyle,
  SearchForm,
  SearchButton,
  SearchFormInput,
  Icon,
} from './Searchbar.styled';

const Searchbar = ({onSubmit}) => {
  const [searchImage, setSearchImage] = useState('');


 const handleChange = e => {
  setSearchImage( e.currentTarget.value.toLowerCase());
  };

 const handleSubmit = e => {
    e.preventDefault();
    if (searchImage.trim() === '') {
      toast.error('Please enter valid search');
      return;
    }
    onSubmit(searchImage);
    setSearchImage('');
  };

    return (
      <SearchbarStyle>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <Icon/>
          </SearchButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchImage}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }


export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
