import { Component } from 'react';
import {PropTypes} from 'prop-types';
import s from './Modal.module.css';
// =================================

export class Modal extends Component{

  componentDidMount(){
    window.addEventListener("keydown",this.handleModal);
  }

  componentWillUnmount(){
    window.removeEventListener("keydown",this.handleModal);
  }

  handleModal=(e)=>{
    if (e.currentTarget === e.target||e.code==="Escape"){
      this.props.onCloseModal();
    }
  }

  render(){
    const{image,tags}=this.props;
    return(
      <div className={s.overlay} onClick={this.handleModal}>
        <div className={s.modal} >
          <img className={s.img}src={image} alt={tags} width="980"/>
        </div>
      </div>
    )
  }
}

Modal.propTypes={
  image:PropTypes.string.isRequired,
  tags:PropTypes.string.isRequired,
  onCloseModal:PropTypes.func.isRequired,
}