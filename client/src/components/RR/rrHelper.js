// helper function for sorting ratings and reviews

const relevance = (reviewArray) => {
  const score = (objArray) => {
    function dateDiffInDays(a, b) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    const sortedArray = [];
    for (const obj of objArray) {
      // calculate score
      const hScore = obj.helpfulness * 3;
      const dateScore = Math.abs(dateDiffInDays(new Date(obj.date), new Date())) * -0.5;
      sortedArray.push([obj, hScore + dateScore]);
    }
    return sortedArray;
  };
  const newScore = score(reviewArray);
  // bubble sort that array based on the scores
  const bubbleSort = (nestedArray) => {
    // takes a nested array, compares the second value of the the current index with the second value of the next index

    const sorted = (nestedArray) => {
      for (let i = 0; i < nestedArray.length - 1; i++) {
        if (nestedArray[i][1] < nestedArray[i + 1][1]) {
          return false;
        }
      }
      return true;
    };

    var innerRecurse = (array) => {
      // base case, no swaps
      if (sorted(array)) {
        return array;
      }

      for (let i = 0; i < array.length - 1; i++) {
        // if index i < index i + 1 => swap
        if (array[i][1] < array[i + 1][1]) {
          // swap
          const currentElement = array[i];
          const oneElementForward = array[i + 1];
          array[i] = oneElementForward;
          array[i + 1] = currentElement;
        }
      }
      return innerRecurse(array);
    };
    return innerRecurse(nestedArray);
  };

  // return the reviewArray sorted correctly
  const newOrder = bubbleSort(newScore);
  // place into a new array and return that
  const newCollection = [];
  for (const e of newOrder) {
    newCollection.push(e[0]);
  }
  return newCollection;
};

const filterStars = (starCount, sortedReviewsArray) => {
  // IOCE -input is current starCount filter state number
  // output is an array of reviews that match that star count

  const collection = [];

  for (const review of sortedReviewsArray) {
    if (review.rating === starCount) {
      collection.push(review);
    }
  }

  return collection;
};

module.exports = {
  relevance,
  filterStars,
};
