const axios = require('axios');
const regeneratorRuntime = require('regenerator-runtime');
const config = require('../config.js');

axios.defaults.headers.common.authorization = config.API_TOKEN;

// INTERACTION WIDGET HELPER

const sendClickData = async (data) => {
  try {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/interactions';
    const response = await axios.post(url, data);


  } catch (error) {
    console.log(error);
  }
};

// PRODUCTS DETAIL WIDGET HELPERS

// http://app-hrsei-api.herokuapp.com/api/fec2/hr-bld:8080/products/:product_id/
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}
const getProductData = async (id) => {
  try {
    const response = await axios.get(`http://3.142.191.146/products/${id}`);
    console.log('Product Data: ', response.data); // for DB research
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// http://app-hrsei-api.herokuapp.com/api/fec2/hr-bld:8080/products/:product_id/styles
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}/styles
const getStyles = async (id) => {
  try {
    const response = await axios.get(`http://3.142.191.146/products/${id}/styles`);
    console.log('Product Styles: ', response.data); // for DB research
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// http://app-hrsei-api.herokuapp.com/api/fec2/hr-bld:8080/products/:product_id/related
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}/related
const getRelated = async (id) => {
  try {
    const response = await axios.get(`http://3.142.191.146/products/${id}/related`);
    console.log('Related Products: ', response.data); // for DB research
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// RATINGS/REVIEWS WIDGET HELPERS


//get onePage helper function
const getNextPage = async (page, id, sort) => {
  // console.log('from inner recursive get next page func: ', sort)
  const url = `http://3.142.102.81/reviews/?sort=${sort}&page=${page}&count=500&product_id=${id}`;
  // console.log(url)
  const response = await axios.get(url);
  return response.data;
};

const getReviews = async (id, sort) => {
  // console.log(sort)

    const reviews = [];
    let page = 0;

    try {
      do {
        var onePage = await getNextPage(page + 1, id, sort);
        reviews.push(onePage);
        page++;
      } while (onePage.length > 0);

      return reviews.flat();
    }
    catch (error) {
      console.log(error);
    }

};

const getReviewsMeta = async (id) => {
  try {
    const response = await axios.get(`http://3.142.102.81/reviews/meta?product_id=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const markHelpful = (reviewId, cb) => {
  axios.put(`http://3.142.102.81/reviews/${reviewId}/helpful`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const reportReview = (reviewId, cb) => {
  axios.put(`http://3.142.102.81/reviews/${reviewId}/report`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const addReview = (reviewFormObj, cb) => {
  console.log(reviewFormObj);
  axios.post('http://3.142.102.81/reviews', reviewFormObj)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    })
}

module.exports = {
  getProductData,
  getStyles,
  getRelated,
  getReviews,
  getReviewsMeta,
  markHelpful,
  reportReview,
  sendClickData,
  addReview
};
