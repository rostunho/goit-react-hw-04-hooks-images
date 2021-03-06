import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Header,
  Form,
  Input,
  SearchButton,
  ButtonLabel,
} from './Searchbar.styled';

function Searchbar({ onNewQuery }) {
  const [currentInputValue, setCurrentInputValue] = useState(() => '');

  const onSubmitForm = event => {
    event.preventDefault();

    if (currentInputValue.trim() === '') {
      return toast.warn('Your search query is empty', {
        position: 'top-right',
        autoClose: 3000,
      });
    }

    onNewQuery(currentInputValue);
    setCurrentInputValue('');
  };

  return (
    <Header>
      <Form onSubmit={onSubmitForm}>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={currentInputValue}
          onChange={e => setCurrentInputValue(e.target.value)}
        />

        <SearchButton type="submit">
          <FaSearch size="24" />
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onNewQuery: PropTypes.func.isRequired,
};

export default Searchbar;
