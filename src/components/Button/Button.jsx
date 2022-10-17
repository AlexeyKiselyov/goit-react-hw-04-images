import {PropTypes} from 'prop-types';
import s from './Button.module.css';
// ================================

export const Button=({loadMore})=>{
  return(
    <>
    <button className={s.button} onClick={loadMore} type="button">Load more</button>
    </>
  )
}

Button.propTypes = {
  loadMore:PropTypes.func.isRequired
}