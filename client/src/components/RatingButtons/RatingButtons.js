import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import s from './RatingButtons.scss';

const RatingButtons = ({ likes = 0 }) => {
  const [counter, setCounter] = useState(0);
  const [localCounter, setLocalCounter] = useState(0);

  useEffect(() => {
    setCounter(likes);
  }, []);

  const [voted, setVoted] = useState('');

  const handleVoted = ({ currentTarget: { name } }) => {
    const result = name === 'like' ? localCounter + 1 : localCounter - 1;
    setLocalCounter(result);
    setVoted(name);
  };

  console.log(localCounter);

  return (
    <div className={s.container}>
      <button
        onClick={handleVoted}
        name="like"
        type="button"
        className={voted === 'like' ? s.buttonActive : s.button}
        disabled={localCounter === 1}
      >
        <ThumbUpAltIcon className={s.buttonIconLike} />
      </button>
      <span className={s.counter}>{localCounter}</span>
      <button
        onClick={handleVoted}
        name="dislike"
        type="button"
        className={voted === 'dislike' ? s.buttonActive : s.button}
        disabled={localCounter === -1}
      >
        <ThumbDownIcon className={s.buttonIconDislike} />
      </button>
    </div>
  );
};

RatingButtons.defaultProps = {
  likes: 0,
};

RatingButtons.propTypes = {
  likes: PropTypes.number,
};

export default withStyles(s)(RatingButtons);
