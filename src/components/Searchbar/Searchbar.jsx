import { Component } from 'react';
import {PropTypes} from 'prop-types';
import s from './Searchbar.module.css';
// =========================================

export class Searchbar extends Component {
  state = {
    input: "",
  };

  onInputChange=(e)=>{
    const {value} = e.target;   
    this.setState({
      input:value
    })
  }

  onFormSubmit=(e)=>{
    e.preventDefault();
    const {input} = this.state;
    this.props.onSubmit(input);
  }

  render() {
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={this.onFormSubmit}>
            <button type="submit" className={s.searchFormButton}>             
              <span className={s.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={s.searchFormInput}
              onChange={this.onInputChange}
              name="input"
              value={this.state.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes={
  onSubmit:PropTypes.func.isRequired,
}
