import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from '../Link/Link';
import s from './Home.scss';
import message from '../../assets/message.jpg';

class Home extends PureComponent {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>Users information</div>
        <Container>
          <Row>
            <Col>
              <Link to="/chats">
                <img src={message} alt="logo" />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
Home.whyDidYouRender = true;
export default withStyles(s)(React.memo(Home));
