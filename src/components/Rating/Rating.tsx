import React from 'react';

interface IRating {
  ratingType: string;
  ratingValue: number;
}

const Rating: React.FC<IRating> = (props) => {
  const { ratingType, ratingValue } = props;

  const buildRatings = (ratingValue: number, ratingType: string) => {
    const stars = [];
    let precision = false;
    if (ratingValue % 1 > 0) precision = true;
    const ratingValueWithoutPrecision = Math.floor(ratingValue);
    for (let i = 0; i < 5; i++) {
      if (ratingValueWithoutPrecision > i) {
        ratingType === 'star'
          ? stars.push(<img key={i} src="./images/star-fill.svg" />)
          : stars.push(<img key={i} src="./images/circle-fill.svg" />);
      } else if (precision) {
        precision = false;
        ratingType === 'star'
          ? stars.push(<img key={i} src="./images/star-half.svg" />)
          : stars.push(<img key={i} src="./images/circle-half.svg" />);
      } else {
        ratingType === 'star'
          ? stars.push(<img key={i} src="./images/star.svg" />)
          : stars.push(<img key={i} src="./images/circle.svg" />);
      }
    }
    return stars;
  };

  return <p className="card-text">{buildRatings(ratingValue, ratingType)}</p>;
};

export default Rating;
