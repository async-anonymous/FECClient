/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import ShareBar from './ShareBar';
import ImageCarousel from './ImageCarousel';
import withListener from '../Tracker';
import StarRatingDisplay from './StarRatingDisplay';
import RelatedItemsLinks from './RelatedItemsLinks';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: {
        skus: {
          '': { quantity: 0, size: ' ' }
        },
        photos: [{ url: '' }]
      }
    };
    this.changeStyle = this.changeStyle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.styles !== this.props.styles) {
      this.findDefaultStyle();
    }
  }

  changeStyle(style) {
    this.setState({ currentStyle: style });
  }

  findDefaultStyle() {
    const stylesArray = this.props.styles.results || [];
    stylesArray.forEach((style) => {
      if (style['default_style']) this.changeStyle(style);
    });
  }

  render() {
    return (
      <div id="product-details" onClick={this.props.onClick}>
        <ImageCarousel style={this.state.currentStyle} product={this.props.id} isFetching={this.props.isFetching} />
        <StarRatingDisplay reviews={this.props.reviews} />
        {this.props.isFetching || (
        <ProductInfo
          name={this.props.productData.name}
          style={this.state.currentStyle}
          category={this.props.productData.category}
        />
        )}
        {this.props.isFetching || (
        <div id="product-desc-container">
          <span id="product-slogan" className="large">
            {this.props.productData.slogan}
          </span>
          <br />
          <br />
          <span id="product-desc" className="medium">
            {this.props.productData.description}
          </span>
          <br />
        </div>
        )}
        {this.props.isFetching || (
        <StyleSelector
          styles={this.props.styles || []}
          currentStyle={this.state.currentStyle}
          changeStyle={this.changeStyle}
          isFetching={this.props.isFetching}
        />
        )}
        <AddToCart style={this.state.currentStyle} isFetching={this.props.isFetching} />
        <ShareBar id={this.props.id} image={this.state.currentStyle.photos[0].url} />
        <RelatedItemsLinks
          updateData={this.props.updateData}
          related={this.props.related}
        />
      </div>
    );
  }
}

export default withListener(ProductDetails, 'Product Details');
