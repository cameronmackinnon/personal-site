import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

// const Projects = () => (
//   <Main
//     title="Projects"
//     description="Learn about Cameron MacKinnon's projects."
//   >
//     <article className="post" id="projects">
//       <header>
//         <div className="title">
//           <h3><Link to="/projects">Other Experiences</Link></h3>
//           <span>My resume includes experiences that directly pertain to my interest in software
//             and business. But I&apos;ve had numerous other experiences that make me who I am.
//             That is the goal of this page - to include the items that don&apos;t always get
//             included on my resume - to paint a fuller picture of my interests and skills.
//           </span>
//         </div>
//       </header>
//       {data.map((project) => (
//         <Cell
//           data={project}
//           key={project.title}
//         />
//       ))}
//     </article>
//   </Main>
// );

const Projects = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/projects.md')
      .then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      });
  });

  return (
    <Main
      title="Projects"
      description="Learn about Cameron MacKinnon's projects."
    >
      <article className="post" id="projects">
        <header>
          <div className="title">
            <h3>Other Experiences</h3>
            <span>My resume includes positions that pertain to software and business.
              But I&apos;ve had numerous other professional and non-professional experiences that
              contribute to who I am. That is the goal of this page - to include the items that
              don&apos;t always get included on my resume, so that you can get a fuller picture
              of my skills, interests, and pastimes.
            </span>
          </div>
        </header>
        {data.map((project) => (
          <Cell
            data={project}
            key={project.title}
          />
        ))}
        <hr />
        <Markdown>
          {markdown}
        </Markdown>
      </article>
    </Main>
  );
};

export default Projects;
