interface RatingProps {
  ratingType: 'self' | 'star';
  ratingValue: number;
}

const Rating = ({ ratingType, ratingValue }: RatingProps) => {
  const buildRatings = () => {
    const stars = [];
    const hasHalf = ratingValue % 1 > 0;
    const wholeStars = Math.floor(ratingValue);

    for (let i = 0; i < 5; i++) {
      if (i < wholeStars) {
        const src =
          ratingType === 'star'
            ? `${process.env.PUBLIC_URL}/images/star-fill.svg`
            : `${process.env.PUBLIC_URL}/images/circle-fill.svg`;
        stars.push(<img key={i} src={src} alt="filled rating" />);
      } else if (i === wholeStars && hasHalf) {
        const src =
          ratingType === 'star'
            ? `${process.env.PUBLIC_URL}/images/star-half.svg`
            : `${process.env.PUBLIC_URL}/images/circle-half.svg`;
        stars.push(<img key={i} src={src} alt="half rating" />);
      } else {
        const src =
          ratingType === 'star'
            ? `${process.env.PUBLIC_URL}/images/star.svg`
            : `${process.env.PUBLIC_URL}/images/circle.svg`;
        stars.push(<img key={i} src={src} alt="empty rating" />);
      }
    }
    return stars;
  };

  return <p className="card-text">{buildRatings()}</p>;
};

export default Rating;
