/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';
import {
  Link,
  HashRouter as Router,
  Route,
  withRouter,
} from 'react-router-dom';
import ProductDetails from './ProductDetailsComponents/ProductDetails';
import QA from './QA/QA.js';
import RatingsReviewsParent from './RR/RatingsReviewsParent';

const rHelper = require('./RR/rrHelper');
const api = require('../../../helpers/api');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      productData: {},
      styles: { results: [] },
      related: [],
      reviews: [],
      reviewsMeta: {},
      isFetching: true,
      sort: 'newest',
      filter: 0,
    };
    this.updateData = this.updateData.bind(this);
    this.updateProductReviews = this.updateProductReviews.bind(this);
  }

  componentDidMount() {
    this.updateData(this.props.match.params.id);
  }

  updateProductReviews(productId, sort, filter) {
    console.log(productId, sort, filter);
    const getReviewCall = (productId, sort) => {
      api.getReviews(productId, sort)
        .then((res) => {
          console.log(res);
          if (this.state.sort === 'relevant') {
            const relevanceOrder = rHelper.relevance(res);
            if (this.state.filter > 0) {
            // apply the filter
              const applyFilter = rHelper.filterStars(this.state.filter, relevanceOrder);
              this.setState({ reviews: applyFilter });
            } else {
              this.setState({ reviews: relevanceOrder });
            }
          } else if (this.state.filter > 0) {
            // apply the filter
            const applyFilter = rHelper.filterStars(this.state.filter, res);
            this.setState({ reviews: applyFilter });
          } else {
            this.setState({ reviews: res });
          }
        })
        .catch((err) => {
          console.log('could not update reviews in app: ', err);
        });
    };
    // filter with 0 passed in is not undefined but is also falsy
    if (filter !== undefined) {
      this.setState({ filter }, () => {
        if (sort) {
          // change sort order, make call, re-render
          this.setState({ sort }, () => {
            // app state set, do the rest
            getReviewCall(productId, this.state.sort);
          });
        } else {
          // no sort provided preserve current sort
          getReviewCall(productId, this.state.sort);
        }
      });
    } else if (sort) {
      // change sort order, make call, re-render
      this.setState({ sort }, () => {
        // app state set, do the rest
        // console.log(this.state.sort)
        getReviewCall(productId, this.state.sort);
      });
    } else {
      // no sort provided preserve current sort
      getReviewCall(productId, this.state.sort);
    }
  }

  updateData(id) {
    this.setState({ isFetching: true });
    const updateStorage = {};

    Promise.all([
      (api.getProductData(id)),
      (api.getStyles(id)),
      (api.getRelated(id)),
      (api.getReviews(id, 'newest')),
      (api.getReviewsMeta(id))])
      .then((data) => {
        updateStorage.productData = data[0];
        updateStorage.styles = data[1];
        updateStorage.related = data[2];
        updateStorage.reviews = data[3];
        updateStorage.filter = 0;
        updateStorage.sort = 'newest';
        updateStorage.reviewsMeta = data[4];
        updateStorage.isFetching = false;
        this.setState(updateStorage);
        this.setState({ isFetching: false });
      })
      .catch((err) => console.log(`Error in promise: ${err}`));
  }

  render() {
    return (
      <>
        <ProductDetails
          id={this.props.match.params.id}
          productData={this.state.productData}
          styles={this.state.styles}
          isFetching={this.state.isFetching}
          reviews={this.state.reviews}
          related={this.state.related}
          updateData={this.updateData}
        />
        <QA
          product={this.state.productData}
          id={this.props.match.params.id}
        />

        <RatingsReviewsParent filter={this.state.filter} isFetching={this.state.isFetching} reviewsMeta={this.state.reviewsMeta} reviews={this.state.reviews} updateProductReviews={this.updateProductReviews} productData={this.state.productData} />

      </>
    );
  }
}

export default withRouter(App);
