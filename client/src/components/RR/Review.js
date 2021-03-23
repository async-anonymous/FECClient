import Rating from '@material-ui/lab/Rating';
import React, { useRef, useState, useEffect } from 'react';
import { Modal } from '@material-ui/core'
const api = require('../../../../helpers/api.js');

var Review = ({ sortOrder, review, reviewsMeta, updateReviews }) => {
  // body: "Esse qui et nesciunt. Rerum dicta autem placeat. Eligendi amet reiciendis rerum voluptate et quas maxime consectetur."
  // date: "2020-09-09T00:00:00.000Z"
  // helpfulness: 22
  // photos: (2) [{…}, {…}]
  // rating: 3
  // recommend: true
  // response: ""Ullam et in.""
  // review_id: 210512
  // reviewer_name: "Imelda24"
  // summary: "Aut repellendus vel."

  // meta data:
  // characteristics:
  // Comfort: {id: 61908, value: "2.2941176470588235"}
  // Quality: {id: 61909, value: "2.7647058823529412"}
  // Size: {id: 61906, value: "2.9411764705882353"}
  // Width: {id: 61907, value: "2.9411764705882353"}
  // __proto__: Object
  // product_id: "18445"
  // ratings:
  // 1: "7"
  // 2: "2"
  // 3: "3"
  // 4: "2"
  // 5: "3"
  // __proto__: Object
  // recommended: {false: "7", true: "10"}

  const [date, setDate] = useState('');
  const [isImg, setImage] = useState(false);
  const [imgArray, setNewImageArray] = useState([{ url: '' }]);
  const [showImgModal, setShowImgModal] = useState(false);
  const [imgModal, setImgModal] = useState('')
  const [showResponse, setShowResponse] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  // const [clickedHelpful, setClickedHelpful] = useState(
  //   localStorage.getItem(review.review_id) || false
  // );

  const onClickThumbnail = (img) => {
    setImgModal(img);
    setShowImgModal(true);
  }
  const onClickCloseThumbmail = () => {
    setShowImgModal(false);
  }

  const setHelpFullClicked = (reviewId) => {
    //get review id send a axios put request to increment helpfulness count for specific review id
    //persist it in browser local storage by setting localStorage.setItem(unique_id, true)
    //this will work as long as I don't use the unqiue_Id for other things in local storage
    // console.log(reviewId)
    // console.log('state: ', clickedHelpful)
    //lookup in local state and set state appropriately
    if (localStorage.getItem(reviewId)) {
      alert('Can only select once!');
    } else {
      console.log('can add')
      api.markHelpful(reviewId, (err, response) => {
        if (err) {
          console.log('Response did not go through: ', err);
        } else {
          updateReviews(reviewsMeta.product_id);
        }

      })
      localStorage.setItem(reviewId, true);
      // setClickedHelpful(true);
      }

    }

  const reportReview = (reviewId) => {
    api.reportReview(reviewId, (err, response) => {
      if (err) {
        console.log('Didn\'t go through: ', err);
      } else {
        // console.log('Went through: ', response);
        updateReviews(reviewsMeta.product_id);
      }
    })
  }


    useEffect(() => {
      //change date into the format we want
      const newDate = new Date(review.date);
      const month = newDate.toLocaleString('default', { month: 'long' });
      const day = newDate.getDate();
      const year = newDate.getFullYear();
      const date = month + ' ' + day + ', ' + year;

      if (review.response !== undefined && review.response !== null && review.response !== '' && review.response !== 'null') {
        setResponseContent(review.response);
        setShowResponse(true);
      } else {
        setShowResponse(false);
      }

      //filter for images or not
      if (review.photos.length > 0 && review.photos.url) {
        setNewImageArray(review.photos)
        setImage(true);
      } else {
        setImage(false);
        //set a cannot display image image

      }

      setDate(date);
      // console.log(review)
    })

    return (
      <div className="review">
        <div className="tileStarContainer">
          <Rating
            className="reviewSummary"
            value={Number(review.rating)}
            max={5}
            readOnly={true}
            precision={0.25}
            size="small"
          />
          <span className="small" >{`${review.reviewer_name}, ${date}`}</span>
        </div>
        <div className="large summary">{review.summary}</div>
        <div className="medium body">{review.body}</div>
        {isImg ? (
          <div className="reviewThumbnails">
            {imgArray.map((img, i) => (
              // how to only display as a thumbnail?  in table?
              <img
                onClick={() => { onClickThumbnail(img.url) }}
                key={i}
                className="reviewImg"
                src={img.url}
                alt="no image"
              />
            ))}
            {showImgModal ? (
              <div className="showImg">
                <img
                  className="showImg"
                  src={imgModal}
                  alt="no image"
                />
                <span
                  onClick={onClickCloseThumbmail}
                  className="closeThumbnail">
                  &times;
              </span>
              </div>
            ) : (
              <></>
            )
            }
          </div>
        ) : (
          <></>
        )}
        {showResponse ? (
          <div className="response">
            <div className="rContent">Response:</div>
            <div>{responseContent}</div>
          </div>
        ) : (
          <></>
        )}
        <div className="small reviewBottom">
          <span>Helpful?</span>
          <span
            className="reviewBottomUnderline"
            onClick={() => { setHelpFullClicked(review.reviews_id) }}
          >Yes ({review.helpfulness})
          </span>
          <span>|</span>
          {/* <span className="reviewBottomUnderline">No (0)</span>
        <span>|</span> */}
          <span onClick={() => {reportReview(review.reviews_id)}}
          className="reviewBottomUnderline">Report</span>
        </div>
      </div>


    )

  };

  export default Review;