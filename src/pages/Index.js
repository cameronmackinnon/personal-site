import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description="cam website"
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">Welcome!</Link></h2>
          <p>
            A personal website to learn more about Cam
          </p>
        </div>
      </header>
      <p>I built this site to expand my software skills and to have a platform to display my resume.
        I hope you enjoy. To get started, you can read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link> {' '} or
        <Link to="/projects"> other experiences</Link>.
      </p>
      <p> <b>DISCLAIMER:</b> I forked <a href="https://github.com/mldangelo/personal-site">this repo</a> to make this site.
        The app was
        developed, in the author&apos;s words, as a &quot;responsive, statically-generated, react
        application written with modern javascript&quot;.
        I cannot take credit for a large portion of the work; however, I have made several
        stylistic changes
        (layout, formatting, structure, etc.) so that the site better suited my needs.
        To learn more about what exactly I changed, please check out the {' '}
        <a href="https://github.com/cameronmackinnon/cameronmackinnon.github.io/blob/main/README.md">README</a>.
      </p>
    </article>
  </Main>
);

export default Index;
