import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import normalizeCss from 'normalize.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Link from '../Link';
import Menu from '../Menu';
import logo from '../../assets/logo.png';
import s from './Layout.scss';
import ChatsMini from '../Chats/chats-mini/chats-mini';

function Layout(props) {
  const { children } = props;
  return (
    <Container fluid className={s.container}>
      <div className={s.header}>
        <div className={s.linkHeader}>
          <Link to="/">
            <div className={s.logo}>
              <div className={s.logoImg}>
                <img src={logo} alt="logo" />
              </div>
              <div className={s.logoName}>Open Social Network</div>
            </div>
          </Link>
        </div>
        <div className={s.chatButton}>
          <ChatsMini />
        </div>
      </div>
      <Row noGutters className={s.containerRow}>
        <Col lg={1}>
          <Menu />
        </Col>
        <Col lg={11}>
          <div className={s.rightContainer}>{children}</div>
        </Col>
      </Row>
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
Layout.whyDidYouRender = true;
export default withStyles(bootstrap, normalizeCss, s)(React.memo(Layout));
