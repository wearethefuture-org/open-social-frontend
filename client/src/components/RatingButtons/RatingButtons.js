import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import s from './RatingButtons.scss';

const RatingButtons = ({ likes = 0 }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(likes);
  }, []);

  const [voted, setVoted] = useState('');

  const handleVoted = ({ currentTarget: { name } }) => {
    const result = name === 'like' ? counter + 1 : counter - 1;
    setCounter(result);
    setVoted(name);
  };

  return (
    <div className={s.container}>
      <button
        onClick={handleVoted}
        name="like"
        type="button"
        className={voted === 'like' ? s.buttonActive : s.button}
      >
        <ThumbUpAltIcon className={s.buttonIconLike} />
      </button>
      <span className={s.counter}>{counter}</span>
      <button
        onClick={handleVoted}
        name="dislike"
        type="button"
        className={voted === 'dislike' ? s.buttonActive : s.button}
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
