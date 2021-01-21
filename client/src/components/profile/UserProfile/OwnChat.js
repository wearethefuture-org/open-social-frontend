/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import withStyles from 'isomorphic-style-loader/withStyles';
import { createChat } from '../../../actions/chats';
import styles from './ProfileButton.scss';
import history from '../../../history';
import textData from '../../../utils/lib/languages.json';

// eslint-disable-next-line no-shadow
function OwnChatButton({ user: { id }, createChat, nameBtn, lang, partnerId }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {
    profilePage: { ownChat },
  } = textData;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = () => {
    // eslint-disable-next-line unicorn/explicit-length-check
    if (name.length) {
      const parameters = {
        description,
        name,
        owner_id: id,
        partner_id: partnerId,
      };
      // eslint-disable-next-line promise/catch-or-return
      createChat(parameters).then(() => history.push('/chats'));
      handleClose();
    }
  };
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const modalStyle = {
    margin: '20px',
  };

  const ProfileOwnChatButton = () => {
    return (
      <Button
        variant="primary"
        className={styles.ProfileButton}
        onClick={handleShow}
      >
        <FontAwesomeIcon className={styles.Icon} icon={faPlus} />
        {nameBtn}
      </Button>
    );
  };
  const UserOwnChatButton = () => {
    return (
      <div className={styles.buttonMessage}>
        <BorderColorIcon onClick={handleShow} fontSize="large" />
      </div>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile:id" component={ProfileOwnChatButton} />
          <Route exact path="/" component={ProfileOwnChatButton} />
          <Route exact path="/users" component={UserOwnChatButton} />
        </Switch>
      </BrowserRouter>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ownChat.title[lang]}</Modal.Title>
        </Modal.Header>
        <Form.Group style={modalStyle}>
          <Form.Control
            type="name"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder={ownChat.nameInput[lang]}
          />
        </Form.Group>
        <Form.Group style={modalStyle}>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            placeholder={ownChat.descriptionInput[lang]}
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
            {ownChat.submitText[lang]}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

OwnChatButton.propTypes = {
  createChat: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  partnerId: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  chat: state.userChats,
  lang: state.menu.lang,
  user: state.userProfile,
});

OwnChatButton.whyDidYouRender = true;
export default connect(
  mapStateToProps,
  { createChat },
)(withStyles(styles)(React.memo(OwnChatButton)));
