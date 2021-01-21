import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import textData from '../../../utils/lib/languages.json';
import style from './chats-add-dialogs.scss';
import Link from '../../Link';

class ChatsAddDialog extends React.Component {
  render() {
    const { lang } = this.props;

    return (
      <Link
        className={style.writeButton}
        to='users'
      >
        {textData.chatsPage.dialog.addDialog[lang]}
      </Link>
    );
  }
}

ChatsAddDialog.whyDidYouRender = true;

export default connect(
  ({ menu: { lang } }) => ({ lang }),
)(withStyles(style)(React.memo(ChatsAddDialog)));
