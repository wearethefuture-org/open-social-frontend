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
      <Row>
        <Col lg={10}>
          <div className={s.header}>
            <div className={s.linkHeader}>
              <Link to="/">
                <div className={[s.logo, 'd-flex flex-wrap'].join(' ')}>
                  <div className={[s.logoImg, 'order-1 p-2'].join(' ')}>
                    <img src={logo} alt="logo" />
                  </div>
                  <div className={[s.logoName, 'order-2 p-2'].join(' ')}>
                    Open Social Network
                  </div>
                  <div
                    className={[
                      s.chatButton,
                      'order-3 p-2',
                      'ml-auto p-2',
                    ].join(' ')}
                  >
                    <ChatsMini />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
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
