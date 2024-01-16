# Personal Website
I forked (and later cloned) this [repo](https://github.com/mldangelo/personal-site) to build this website. If you'd like to recreate this website for your own purposes, I strongly recommend referring to the original author's detailed instructions. However, I am happy to help if you encounter any bugs of your own.

Here is a rough attempt at summarizing the changes I made to the original site to adapt it to my needs.
<br><br>
<ins>Site-specific</ins>
- content on all tabs/pages
- removed stats tab; planning on adding a strava api tab for another personal project
- removed unnecessary links/urls; upgraded favicon to newest requirements
- updated html & css formatting to suit my preferences (headers, pictures, skills colours, etc.)
- added additional sections on other experiences tab

<ins>Publishing/Hosting</ins>
- purchased a domain from squarespace and set up with github pages
- switched from npm to yarn for more stable builds in github CI
- added other libraries to package.json to minimize warnings and errors
- upgraded and customized puppeteer to increase memory
