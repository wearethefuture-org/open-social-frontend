import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useSelector } from 'react-redux';
import s from './About.scss';
import textData from '../../utils/lib/languages';

const About = () => {
  const lang = useSelector(store => store.menu.lang);
  const { aboutPage } = textData;

  return (
    <div className={s.root}>
      <div className={s.container}>{aboutPage.title[lang]}</div>
    </div>
  );
};
About.whyDidYouRender = true;
export default withStyles(s)(React.memo(About));
