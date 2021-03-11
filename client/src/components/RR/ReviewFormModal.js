import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import api from '../../../../helpers/api';

const ReviewFormModal = ({ productData, clickClosedReviewForm, reviewsMeta }) => {
  //prop needed is product name which I can get from app current product

  const [state, setState] = useState({
    reviewBodyForm: ''
  });


  const inputListener = (e) => {
    // console.log('name: ', e.target.name)
    // console.log('value: ', e.target.value)
    if (e.target.name !== 'photos') {
      setState({ ...state, [e.target.name]: (e.target.value) });

    } else {
      console.log('files: ', e.target.files)
      setState({ ...state, 'photos': e.target.files })
    }

  }
  // Comfort: "2"
  // Fit: "2"
  // Length: "2"
  // Quality: "2"
  // Size: "1"
  // Width: "2"
  // photos: FileList {0: File, 1: File, length: 2}
  // recommendation: "No"
  // reviewBodyForm: "body"
  // reviewFormNickname: "nickname"
  // reviewFormemail: "email"
  // reviewRatingsValue: "2"
  // reviewSummaryForm: "summary"

  const submitReview = () => {
    //does state have all the things it should?
    //big if statement
    const postBody = { product_id: Number(reviewsMeta.product_id)};

    if (state.reviewRatingsValue === undefined) {
      alert('Must select a rating for this review!')
    } else {
      postBody.rating = Number(state.reviewRatingsValue);
      if (state.reviewSummaryForm === undefined) {
        alert('must enter a review summary!')
      } else {
        postBody.summary = state.reviewSummaryForm;
        if (state.reviewBodyForm === undefined || state.reviewBodyForm.length < 50) {
          alert('Must enter a more than 50 characters in the review body!')
        } else {
          postBody.body = state.reviewBodyForm;
          if (state.recommendation === undefined) {
            alert('Must make a product recommendation, either yes or no!')
          } else {
            console.log('states recommendation before we throw it into the post object: ', state.recommendation)
            postBody.recommend = (state.recommendation === 'true');
            if (state.reviewFormNickname === undefined) {
              alert('Must enter a name!')
            } else {
              postBody.name = state.reviewFormNickname;
              if (state.reviewFormemail === undefined) {
                alert('Must enter an email!')
              } else {
                postBody.email = state.reviewFormemail;
                if (state.Size === undefined || state.Width === undefined
                  || state.Comfort === undefined || state.Quality === undefined
                  || state.Length === undefined || state.Fit === undefined) {
                  alert('Must enter all product characterstics (size, width etc.)!')
                } else {
                  //combine these into an object
                  postBody.characteristics = {
                    '14': Number(state.Size),
                    '15': Number(state.Width),
                    '16': Number(state.Comfort),
                    '17': Number(state.Quality),
                    '18': Number(state.Length),
                    '19': Number(state.Fit)
                  }
                  postBody.photos = []
                  // if (state.photos) {
                  //   process them
                  //   let formData = new FormData();
                  //   formData.append('userpic[]', state.photos[0]);
                  //   for (var key in state.photos) {
                  //   }
                  //   console.log(formData)
                  // }

                  //axios request and exit form
                  console.log(postBody)
                  api.addReview(postBody, (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('success!: ', result)
                    }
                  })

                  //alert if successful submission
                }
              }
            }
          }
        }
      }
    }
  }




// useEffect(() => {
//   let count = state.reviewBodyForm.length;
//   console.log('Count: ', count)
// }, [state.reviewBodyForm])

return (
  <div className="reviewFormModal">
    <div className="reviewFormTitle large">
      <div className="large">Write Your Review</div>
      <div className="reviewFormSubTitle medium">About the {productData.name}</div>
      <div className="reviewFormMandatoryItems small">Mandatory items are shown with a *</div>
    </div>
    <div className="reviewFormRating">
      *Overall rating:
        <Rating
        name="reviewRatingsValue"
        value={Number(state.reviewRatingsValue)}
        max={5}
        onChange={inputListener}
        precision={1}
        size="small"
      />
    </div>
    <div className="reviewFormRecommendation medium" onChange={inputListener}>
      <div>*Do you recommend this product?</div>
          Yes<input className="radialSoloButton" type="radio" value={true} name="recommendation" />
          No<input className="radialSoloButton" type="radio" value={false} name="recommendation" />
    </div>
    <div className="formCharacteristics">

      <div className="formCharacteristicRow" onChange={inputListener}>
        <span>*Size</span>
        <div className="formRadioButtons">
          <input type="radio" value="1" name="Size" />
          <input type="radio" value="2" name="Size" />
          <input type="radio" value="3" name="Size" />
          <input type="radio" value="4" name="Size" />
          <input type="radio" value="5" name="Size" />
        </div>
        <div className="formExplanation small">
          <span className="formExplanationFlex">A size too small</span>
          <span className="formExplanationFlex">1/2 a size to small</span>
          <span className="formExplanationFlex">Perfect</span>
          <span className="formExplanationFlex">1/2 a size too big</span>
          <span className="formExplanationFlex">A size too big</span>
        </div>
      </div>

      <div className="formCharacteristicRow" onChange={inputListener}>
        <span>*Width</span>
        <div className="formRadioButtons">
          <input type="radio" value="1" name="Width" />
          <input type="radio" value="2" name="Width" />
          <input type="radio" value="3" name="Width" />
          <input type="radio" value="4" name="Width" />
          <input type="radio" value="5" name="Width" />
        </div>
        <div className="formExplanation small">
          <span className="formExplanationFlex">Too narrow</span>
          <span className="formExplanationFlex">Slightly narrow</span>
          <span className="formExplanationFlex">Perfect</span>
          <span className="formExplanationFlex">Slightly wide</span>
          <span className="formExplanationFlex">Too wide</span>
        </div>
      </div>
      <div className="formCharacteristicRow" onChange={inputListener}>
        <span>*Comfort</span>
        <div className="formRadioButtons">
          <input type="radio" value="1" name="Comfort" />
          <input type="radio" value="2" name="Comfort" />
          <input type="radio" value="3" name="Comfort" />
          <input type="radio" value="4" name="Comfort" />
          <input type="radio" value="5" name="Comfort" />
        </div>
        <div className="formExplanation small">
          <span className="formExplanationFlex">Uncomfortable</span>
          <span className="formExplanationFlex">Slightly Uncomfortable</span>
          <span className="formExplanationFlex">Ok</span>
          <span className="formExplanationFlex">Comfortable</span>
          <span className="formExplanationFlex">Perfect</span>
        </div>
      </div>
      <div className="formCharacteristicRow" onChange={inputListener}>
        <span>*Quality</span>
        <div className="formRadioButtons">
          <input type="radio" value="1" name="Quality" />
          <input type="radio" value="2" name="Quality" />
          <input type="radio" value="3" name="Quality" />
          <input type="radio" value="4" name="Quality" />
          <input type="radio" value="5" name="Quality" />
        </div>
        <div className="formExplanation small">
          <span className="formExplanationFlex">Poor</span>
          <span className="formExplanationFlex">Below average</span>
          <span className="formExplanationFlex">What I expected</span>
          <span className="formExplanationFlex">Pretty great</span>
          <span className="formExplanationFlex">Perfect</span>
        </div>
      </div>
      <div className="formCharacteristicRow" onChange={inputListener}>
        <span>*Length</span>
        <div className="formRadioButtons">
          <input type="radio" value="1" name="Length" />
          <input type="radio" value="2" name="Length" />
          <input type="radio" value="3" name="Length" />
          <input type="radio" value="4" name="Length" />
          <input type="radio" value="5" name="Length" />
        </div>
        <div className="formExplanation small">
          <span className="formExplanationFlex">Runs Short</span>
          <span className="formExplanationFlex">Runs slightly short</span>
          <span className="formExplanationFlex">Perfect</span>
          <span className="formExplanationFlex">Runs slightly long</span>
          <span className="formExplanationFlex">Runs long</span>
        </div>
      </div>

      <div className="formCharacteristicRow" onChange={inputListener}>
        <span>*Fit</span>
        <div className="formRadioButtons">
          <input type="radio" value="1" name="Fit" />
          <input type="radio" value="2" name="Fit" />
          <input type="radio" value="3" name="Fit" />
          <input type="radio" value="4" name="Fit" />
          <input type="radio" value="5" name="Fit" />
        </div>
        <div className="formExplanation small">
          <span className="formExplanationFlex">Runs tight</span>
          <span className="formExplanationFlex">Runs slightly tight</span>
          <span className="formExplanationFlex">Perfect</span>
          <span className="formExplanationFlex">Runs slightly long</span>
          <span className="formExplanationFlex">Runs long</span>
        </div>
      </div>
    </div>

    <div className="reviewInput">
      <div className="reviewSummary">
        <input className="reviewSummaryForm"
          value={state.reviewSummaryForm || ''}
          name="reviewSummaryForm"
          onChange={inputListener}
          type="text"
          maxLength="60"
          placeholder="*Enter summary... (60 characters allowed)"

        />
      </div>
      <div className="body">
        <textarea className="reviewBodyForm"
          value={state.reviewBodyForm || ''}
          name="reviewBodyForm"
          onChange={inputListener}
          type="text"
          maxLength="1000"
          minLength="50"
          placeholder="*Enter body... (Must write up to 50 characters)"
          autoComplete="on"
          autoCorrect="on"

        />
        <div className="wordCount small">
          ({state.reviewBodyForm.length < 50 ?
            50 - state.reviewBodyForm.length + ' characters to go' :
            'minimum reached'})
            </div>
      </div>

    </div>
    <div>Upload photos
      <input
        type="file"
        className="reviewPhotoUploader"
        name="photos"
        multiple
        // value={state.photos || []}
        accept="image/*"
        encType="multipart/form-data"
        onChange={inputListener}
      />
    </div>
    <div>
      <input className="reviewSummaryForm"
        value={state.reviewFormNickname || ''}
        name="reviewFormNickname"
        onChange={inputListener}
        type="text"
        maxLength="60"
        placeholder="*Enter nickname... (60 characters allowed)"
      />
    </div>
    <div>
      <input className="reviewSummaryForm"
        value={state.reviewFormemail || ''}
        name="reviewFormemail"
        onChange={inputListener}
        type="text"
        maxLength="60"
        placeholder="*Enter email... (60 characters allowed)"
      />
    </div>

    <button
      className="SubmitForm"
      onClick={submitReview}
    >Submit Review
      </button>
    <span
      onClick={clickClosedReviewForm}
      className="closeThumbnail">
      &times;
      </span>
  </div>



)

}

export default ReviewFormModal;