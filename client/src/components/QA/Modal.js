/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const api = require('../../../../helpers/qa.js');
const helpers = require('./componentHelpers.js');

const Modal = ({ questionModal, question, product, toggleModal, getQuestions, getAnswers }) => {
  const [inputs, setInputs] = useState({ questionOrAnswer: '', nickname: '', email: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [errorExists, setErrorExists] = useState(false);
  const [submission, setSubmission] = useState(false);

  const submit = () => {
    if (questionModal) {
      const params = {
        body: inputs.questionOrAnswer,
        name: inputs.nickname,
        email: inputs.email,
        product_id: product.id
      };
      api.submitQuestion(params)
        .then((response) => getQuestions(product.id));
    } else {
      const params = {
        body: inputs.questionOrAnswer,
        name: inputs.nickname,
        email: inputs.email
      };
      api.submitAnswer(question.question_id, params)
        .then((response) => getAnswers(question.question_id));
    }

    setSubmission(false);
    toggleModal();
  };

  useEffect(() => {
    if (!errorExists && submission) {
      submit();
    } else {
      setSubmission(false);
    }
  }, [submission]);

  const validate = () => {
    if (!helpers.validateInputs(inputs)) {
      setErrorExists(true);
      setErrorMessage('Please ensure all forms are filled out and that your email is formatted correctly!');
    } else {
      setErrorExists(false);
    }

    if (!helpers.validateEmail(inputs.email)) {
      setErrorExists(true);
      setErrorMessage('Please ensure all forms are filled out and that your email is formatted correctly!');
    } else {
      setErrorExists(false);
    }

    setSubmission(true);
  };

  const handleInputChange = (e) => {
    e.persist();
    const updatedValue = {};
    updatedValue[e.target.name] = e.target.value;
    setInputs({ ...inputs, ...updatedValue });
  };

  return (
    <div className="QA-Modal">
      <div className="QA-ModalGuts">
        {questionModal
          ? (
            <>
              <div>Ask Your Question</div>
              <div className="QA-ModalHeader">
                About the
                &nbsp;
                {product.name}
                {' '}
                Here
              </div>
            </>
          ) : (
            <>
              <div className="QA-ModalHeader">Submit Your Answer</div>
              <p>
                {product.name}
                :
                {' '}
                {question.question_body}
              </p>
            </>
          )}

        {questionModal
          ? (<div className="QA-ModalBodyHeader">Your Question</div>)
          : (<div className="QA-ModalBodyHeader">Your Answer</div>)}
        <textarea className="QA-ModalBody" name="questionOrAnswer" value={inputs.questionOrAnswer} onChange={(event) => handleInputChange(event)} />

        <div className="QA-ModalNameHeader">What is your nickname?</div>
        <input className="QA-ModalName" placeholder="Example: BobRoss9000" name="nickname" value={inputs.nickname} onChange={(event) => handleInputChange(event)} />
        <p className="QA-ModalNameMessage">**For privacy reasons, do not use your full name or email address**</p>

        <div className="QA-ModalEmailHeader">Your Email</div>
        <input className="QA-ModalEmail" placeholder="Example: BobRoss9000@gmail.com" name="email" value={inputs.email} onChange={(event) => handleInputChange(event)} />
        <p className="QA-ModalEmailMessage">**For authentication reasons, you will not be emailed**</p>

        {errorExists && (<div className="QA-ModalError">{errorMessage}</div>)}

        <Button color="inherit" onClick={(event) => toggleModal(event)}>Cancel</Button>
        {questionModal
          ? (<Button color="inherit" onClick={() => validate()}>Submit Question</Button>)
          : (<Button color="inherit" onClick={() => validate()}>Submit Answer</Button>)}
      </div>
    </div>
  );
};

export default Modal;
