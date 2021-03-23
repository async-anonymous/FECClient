/* eslint-disable react/prop-types */
import React from 'react';

import Thumbnail from './Thumbnail';

const AnswerThumbnails = ({ thumbnails }) => (
  <div className="QA-AnswerThumbnails">
    {
      thumbnails.map((thumbnail) => (
        thumbnail.url !== null && thumbnail.url !== 'null'
          ? (
            <Thumbnail
              thumbnail={thumbnail.url}
              key={thumbnail.id}
            />
          ) : null
      ))
    }
  </div>
);

export default AnswerThumbnails;
