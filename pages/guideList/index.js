import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import TitleBar from '../../components/TitleBar/TitleBar';
import Footer from '../../components/Footer/Footer';
import LanguageLink from '../../components/LanguageLink/LanguageLink';

import guidesIcon from '../../static/images/icn-guides.svg';
import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

import './style.scss';

import ContentIndex from '../../content.index';

const GuideListItem = (props) => {
  const { title, description, baseUrl, languages } = props.guide;
  const defaultUrl = baseUrl + (languages.length > 0 ? `${languages[0]}/` : '');
  return (
    <div className="guide-list-item">
      <div className="languages">
        {languages.map(language => (
          <LanguageLink
            key={language}
            language={language}
            isActive={false}
            url={`${baseUrl}${language}/`}
            isShowEmpty
          />
        ))}
      </div>
      <Link to={defaultUrl}>
        <div className="arrow" />
      </Link>
      <div className="item-info">
        <Link to={defaultUrl}>
          <h3>{title}</h3>
        </Link>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

GuideListItem.propTypes = {
  guide: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    baseUrl: PropTypes.string.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const GuideListSection = ({ section }) => (
  <div className="guide-list-section">
    <h2 id={section.name} className="guide-list-section-title">
      {section.name}
    </h2>
    {section.guides.map(guide => (
      <GuideListItem key={guide.title} guide={guide} />
    ))}
  </div>
);

GuideListSection.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    guides: PropTypes.array,
  }).isRequired,
};

const GuideListPage = () => (
  <div className="guide-list-page">
    <Header>
      <HeaderNav
        img={guidesIcon}
        text="Guides"
        active
      />
      <HeaderNav
        href="/api-reference/"
        img={apiRefIcon}
        text="API reference"
      />
      <HeaderNav
        href="/support/"
        img={supportIcon}
        text="Support"
      />
    </Header>
    <div className="guide-list-container">
      <div className="guide-list">
        {ContentIndex.sections.map(section => (
          <GuideListSection key={section.name} section={section} />
        ))}
      </div>
      <Footer />
    </div>
  </div>
);

export default GuideListPage;
