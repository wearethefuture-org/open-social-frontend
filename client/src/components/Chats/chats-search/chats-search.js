import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import s from './chats-search.module.scss';

const ChatsSearch = () => {
  return (
    <div className={s.SearchDialogs}>
      <SearchIcon />
      <input placeholder="search dialogs" className={s.SearchInputDialog} />
    </div>
  );
};
ChatsSearch.whyDidYouRender = true;
export default withStyles(s)(React.memo(ChatsSearch));
