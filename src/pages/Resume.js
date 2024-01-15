import React from 'react';
// import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Internships from '../components/Resume/Internships';
import Skills from '../components/Resume/Skills';
import Courses from '../components/Resume/Courses';
// import References from '../components/Resume/References';

import courses from '../data/resume/courses';
import degrees from '../data/resume/degrees';
import work from '../data/resume/work';
import internships from '../data/resume/internships';
import { skills, categories } from '../data/resume/skills';

// NOTE: sections are displayed in order defined.
const sections = {
  Education: () => <Education data={degrees} />,
  'Professional Experience': () => <Experience data={work} />,
  'Internships & Entrepreneurship': () => <Internships data={internships} />,
  'Technical Skills': () => <Skills skills={skills} categories={categories} />,
  'Notable Courses': () => <Courses data={courses} />,
};

// const Resume = () => (
//   <Main
//     title="Resume"
//     description="Cameron MacKinnon's Resume."
//   >
//     <article className="post" id="resume">
//       <header>
//         <div className="title">
//           <h2><Link to="resume">Resume</Link></h2>
//           <div className="link-container">
//             {Object.keys(sections).map((sec) => (
//               <h4 key={sec}>
//                 <a href={`#${sec.toLowerCase()}`}>{sec}</a>
//               </h4>))}
//           </div>
//         </div>
//       </header>
//       {Object.entries(sections).map(([name, Section]) => (
//         <Section key={name} />
//       ))}
//     </article>
//   </Main>
// );

const Resume = () => (
  <Main
    title="Resume"
    description="Cameron MacKinnon's Resume."
  >
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2>Resume</h2>
          <div className="link-container">
            {Object.keys(sections).map((sec, index, array) => (
              <React.Fragment key={sec}>
                <h4>
                  <a href={`#${sec.toLowerCase()}`}>{sec}</a>
                </h4>
                {index < array.length - 1 && <span> || </span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>
      {Object.entries(sections).map(([name, Section]) => (
        <Section key={name} />
      ))}
    </article>
  </Main>
);

export default Resume;
