import { useState } from 'react';
import { PropTypes } from 'prop-types';
import s from './Searchbar.module.css';
// =========================================

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const onInputChange = e => {
    const { value } = e.target;
    setInput(value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <>
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={onFormSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            onChange={onInputChange}
            name="input"
            value={input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
