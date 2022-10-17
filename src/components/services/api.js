import axios from 'axios';
// =========================
const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '29894306-43d43bdf137881a816cea22ba';

export const requestGallery = async(query,pageNumber)=>{
  const config ={
    baseURL: BASE_URL,
    params:{
      q:query,
      key:KEY_API,
      image_type:"photo",
      orientation:"horizontal",
      page:pageNumber,
      per_page:12,
    }
  };

  const response = await axios(config);
  
  return response;
}

