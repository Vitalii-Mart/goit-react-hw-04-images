import React, { Component } from 'react';
import PropTypes from 'prop-types';
 import { toast } from 'react-toastify';
 import {
  SearchbarStyle,
  SearchForm,
  SearchButton,
  SearchFormInput,
  Icon,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  handleChange = e => {
    this.setState({ searchImage: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchImage.trim() === '') {
      toast.error('Please enter valid search');
      return;
    }
    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
    this.props.onClearImages();
  };

  render() {
    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <Icon/>
          </SearchButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchImage}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClearImages: PropTypes.func.isRequired,
};