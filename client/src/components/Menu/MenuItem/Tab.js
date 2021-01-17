import React, { useState, useRef, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from '../../Link/Link';
import s from './tab.scss';

const Tab = ({
  item: { path, text, icon, type, name, items },
  onClick,
  currentTab,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [isCurrent, setIsCurrent] = useState('');
  const blockReference = useRef();
  const itemsReference = useRef();

  const currentLocation = () => {
    switch (currentTab) {
      case 'Profile':
        setIsCurrent('profile');
        break;
      case 'Login':
        setIsCurrent('profile');
        break;
      case 'SignUp':
        setIsCurrent('profile');
        break;
      case 'Chats':
        setIsCurrent('chats');
        break;
      case 'Users':
        setIsCurrent('users');
        break;
      case 'Analytics':
        setIsCurrent('analytics');
        break;
      case 'About':
        setIsCurrent('about');
        break;
      default:
        break;
    }
  };

  // const handleClickOutside = (event) => {
  //   if (
  //     event.current !== blockReference &&
  //     event.current !== itemsReference &&
  //     isShow
  //   )
  //     setIsShow(false);
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // });

  useEffect(() => currentLocation(), [currentTab]);

  if (type === 'select') {
    return (
      <div
        className={s.wrapper}
        onClick={() => setIsShow(!isShow)}
        ref={blockReference}
      >
        <div className={s.content}>
          {text && (
            <p
              className={classNames(s.text, {
                [s.red]: isCurrent === name,
              })}
            >
              {text}
            </p>
          )}
          {/* {icon && <img src={icon} alt="menu-item" />} */}
        </div>
        <div
          className={classNames(s.listItems, {
            [s.displaynone]: !isShow,
          })}
        >
          {items.map(object => {
            if (object.text === text) return;
            if (object.path) {
              return (
                <Link
                  to={object.path}
                  onClick={() => onClick(object.type, object.text)}
                  ref={itemsReference}
                  key={object.text}
                >
                  <p className={(s.text, s.black)}>{object.text}</p>
                </Link>
              );
            }
            return (
              <p
                onClick={() => {
                  onClick(object.type, object.text);
                  null;
                }}
                ref={blockReference}
                className={(s.text, s.black)}
              >
                {object.text}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <Link to={path} className={s.wrapper}>
      <div className={s.content}>
        {text && (
          <p
            className={classNames(s.text, {
              [s.red]: isCurrent === name,
            })}
          >
            {text}
          </p>
        )}
        {/* {icon && <img src={icon} alt="menu-item" />} */}
      </div>
    </Link>
  );
};

Tab.propTypes = {
  item: PropTypes.shape({
    currentTab: PropTypes.string,
    icon: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    path: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(s)(Tab);
