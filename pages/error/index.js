import React from 'react';
import { Link } from 'react-router';

import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import guidesIcon from '../../static/images/icn-guides.svg';
import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

import './style.scss';

const ErrorPage = () => (
  <section className="not-found-page">
    <Header>
      <HeaderNav
        href="/guides/"
        img={guidesIcon}
        text="Guides"
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
    <section className="container">
      <div className="content">
        <h1>Oops!</h1>
        <p>
          Page not found.
        </p>
        <p>
          What are you looking for?
        </p>
        <nav>
          <Link className="link" to="/">Take me home</Link>
        </nav>
      </div>
    </section>
    <Footer />
  </section>
);

export default ErrorPage;
