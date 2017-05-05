import React from 'react';
import { Link } from 'react-router';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './style.scss';

const ErrorPage = () => (
  <section className="not-found-page">
    <Header />
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
