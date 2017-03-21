import React from 'react';
import { Link } from 'react-router';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './styles.scss';

const ErrorPage = () => (
  <section className="not-found-page">
    <Banner>
      <Header />
    </Banner>
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
