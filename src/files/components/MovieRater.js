import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function MovieRater({ movieObject, reviews }) {
  const appContext = useContext(AppContext);
  const [raterOn, setRaterOn] = useState(false);
  const [prevRevObj, setPrevRevObj] = useState();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [starRating, setStarRating] = useState(0);
  const [starMemory, setStarMemory] = useState(0);

  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState();

  useEffect(() => {
    /**If prevRevObj exists, pre-set the rating to that*/
    if (appContext.user && reviews && reviews.length > 0) {
      let priorReview = reviews.find((rev) => {
        return rev.userId === appContext.user.uid;
      });
      if (priorReview) {
        setPrevRevObj(priorReview);
        setStarRating(priorReview.stars);
        setStarMemory(priorReview.stars)
        setReviewText(priorReview.text);
      }
    } else {
      setPrevRevObj();
      setStarRating(0);
      setReviewText();
    }
  }, [reviews, appContext.user]);

  /*Detect if clicked outside of element to close it*/
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // close it
          close();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function close() {
    if (raterOn) document.querySelector(".reviewTextArea").value = "";
    setStarRating(0);
    setHover(0);
    setRaterOn(false);
  }

  /* Edit: if prevRevObj exists, find and change that in the db. 
  Otherwise, add a new review. */
  function submitReview(e) {
    e.preventDefault();
    let reviewText = document.querySelector(".reviewTextArea").value;
    let newRevObj = {
      movieId: movieObject.id,
      title: movieObject.title,
      stars: starRating,
      text: reviewText,
    };
    // console.log(newRevObj);

    if (prevRevObj) {
      appContext.editPrevReview(prevRevObj, newRevObj);
    } else {
      appContext.submitNewReview(newRevObj);
    }
    close();
  }

  return (
    <div ref={wrapperRef}>
      <button
        disabled={appContext.user ? false : true}
        className="moviePageAddBtn"
        onClick={() => {
          setRaterOn(!raterOn);
        }}
      >
        <div>
          Rate
          <div>
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </button>

      {raterOn && (
        <div className="popupAdder">
          <form className="reviewForm" onSubmit={submitReview}>
            <div>
              {prevRevObj
                ? `You have previously rated this movie as shown below. Would you
                like to change it?`
                : `Choose a star rating: ${starRating}`}
            </div>
            {/*  https://w3collective.com/react-star-rating-component/ */}
            <div className="starRating">
              {[...Array(10)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={`starButton ${
                      index <= (hover || starMemory) ? "starOn" : "starOff"
                    }`}
                    onMouseEnter={() => {
                      setHover(index);
                    }}
                    onMouseLeave={() => {
                      setHover(0);
                    }}
                    onMouseDown={() => {
                      setStarRating(index);
                    }}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
            <textarea
              className="reviewTextArea"
              defaultValue={reviewText ? reviewText : ""}
              type="text"
              placeholder="Write a review"
            >
              {/* {reviewText} */}
            </textarea>
            <div>
              <button
                className="submitReviewBtn"
                type="submit"
                disabled={starRating === 0 ? true : false}
              >
                Submit
              </button>
            </div>
          </form>
          <button
            className="closeBtn"
            style={{ position: "absolute", top: "5px", right: "5px" }}
            onClick={() => {
              close();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
