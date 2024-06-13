import React from 'react';
import StarRatings from 'react-star-ratings';

export default function ListReviews({ reviews }) {
  return (
    <div className="reviews w-75">
      <h3>Reseñas de otros:</h3>
      <hr />
      {reviews?.map((review) => (
        <div className="review-card my-3" key={review.id}>
          <div className="row">
            <div className="col-1">
              <img
                src={review?.url || '../images/default_avatar.jpg'}
                alt="User Name"
                width="50"
                height="50"
                className="rounded-circle"
              />
            </div>
            <div className="col-11">
              <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="1px"
              />
              <p className="review_user">por {review?.name}</p>
              <p className="review_comment">{review?.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
