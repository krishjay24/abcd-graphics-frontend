import Skill from '../common/Skill';
import Tools from '../Tools';

const skillsData = {
  Development: [
    { src: '/development/html5.svg', alt: 'HTML 5' },
    { src: '/development/css3.svg', alt: 'CSS 3' },
    { src: '/development/Bootstrap.svg', alt: 'Bootstrap' },
    { src: '/development/javascript.svg', alt: 'JavaScript' },
    { src: '/development/ReactJs.svg', alt: 'React Js' },
    { src: '/development/nextJs.svg', alt: 'Next Js' },
    { src: '/development/redux.svg', alt: 'Redux' },
    { src: '/development/WordFlow.svg', alt: 'WordPress' },
    { src: '/development/drupal.svg', alt: 'Drupal' },
    { src: '/development/openCart.svg', alt: 'OpenCart' },
    { src: '/development/magento.svg', alt: 'Magento' },
    { src: '/development/webFlow.svg', alt: 'WebFlow' },
    { src: '/development/joomla.svg', alt: 'Joomla' },
    { src: '/development/cpanel.svg', alt: 'cPanel' },
  ],
  Designing: [
    { src: '/designing/photoshop.svg', alt: 'Photoshop' },
    { src: '/designing/illustrator.svg', alt: 'Illustrator' },
    { src: '/designing/indesign.svg', alt: 'InDesign' },
    { src: '/designing/afterEffects.svg', alt: 'After Effects' },
    { src: '/designing/premiere.svg', alt: 'Premiere Pro' },
    { src: '/designing/adobeXd.svg', alt: 'Adobe XD' },
    { src: '/designing/figma.svg', alt: 'Figma' },
    { src: '/designing/adobeExpress.svg', alt: 'Adobe Express' },
    { src: '/designing/interactivePdf.svg', alt: 'Interactive PDF' },
  ],
  Marketing: [
    { src: '/marketing/hubSpot.svg', alt: 'HubSpot' },
    { src: '/marketing/mailChimp.svg', alt: 'MailChimp' },
    { src: '/marketing/stripoEmail.svg', alt: 'Stripo Email' },
    { src: '/marketing/googleAnalytics.svg', alt: 'Google Analytics' },
    { src: '/marketing/googleWebConsole.svg', alt: 'Google Web Console' },
    { src: '/marketing/ahrefs.svg', alt: 'Ahrefs' },
    { src: '/marketing/semrush.svg', alt: 'Semrush' },
    { src: '/marketing/moz.svg', alt: 'MOZ' },
    { src: '/marketing/pageSpeedInsights.svg', alt: 'PageSpeed Insights' },
    { src: '/marketing/hotjar.svg', alt: 'Hotjar' },
    { src: '/marketing/sproutSocial.svg', alt: 'Sprout Social' },
  ],
};

const skills = [
  {
    title: 'DEVELOPMENT',
    skillsList: [
      { title: 'Responsive Websites', rating: 4 },
      { title: 'Bug Fixes & Debugging', rating: 4 },
      { title: 'Feature Implementation', rating: 4 },
      { title: 'Performance Optimization', rating: 4 },
      { title: 'SEO-Friendly Coding', rating: 4 },
      { title: 'Front-end Frameworks', rating: 3 },
      { title: 'CMS Development', rating: 3 },
      { title: 'API Integration', rating: 3 },
    ],
    tools: skillsData.Development,
  },
  {
    title: 'DESIGNING',
    skillsList: [
      { title: 'Creative Layouts', rating: 4 },
      { title: 'UI/UX Design', rating: 4 },
      { title: 'Typography', rating: 4 },
      { title: 'Dashboards', rating: 4 },
      { title: 'Branding Solutions', rating: 4 },
      { title: 'Print Design', rating: 4 },
      { title: 'Digital Assets', rating: 4 },
      { title: 'User Research', rating: 3 },
    ],
    tools: skillsData.Designing,
  },
  {
    title: 'MARKETING',
    skillsList: [
      { title: 'Campaign Planning', rating: 4 },
      { title: 'CRM Management', rating: 4 },
      { title: 'SEO Analytics', rating: 4 },
      { title: 'Web Optimization', rating: 4 },
      { title: 'Email Campaigns', rating: 4 },
      { title: 'Data Analysis', rating: 3 },
      { title: 'Content Strategy', rating: 4 },
      { title: 'Lead Generation', rating: 3 },
    ],
    tools: skillsData.Marketing,
  },
];

const Skills = ({ elementsRef }) => {
  const downloadPdf = () => {
    const fileUrl = '/resume.txt';
    const fileName = 'resume.txt';

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
      .catch((error) => console.error('Error downloading the File:', error));
  };

  return (
    <div
      id='technical-skills'
      data-name='TECHNICAL SKILLS'
      ref={(el) => (elementsRef.current[3] = el)}
      className='skills_section'
    >
      <div className='skills_container'>
        {skills.map((skill, index) => (
          <div key={index} className='skill-section'>
            <div className='skill_headingcolor'></div>
            <div className='Skills-ratings'>
              <h2>{skill.title}</h2>
              {skill.skillsList.map((skillItem, index) => (
                <Skill
                  key={index}
                  title={skillItem.title}
                  rating={skillItem.rating}
                />
              ))}
            </div>
            <div className='tools_section'>
              <div className='tools_line'>
                <p>TOOLS</p>
                <div className='long_line'></div>
              </div>
              <Tools imageData={skill.tools} />
            </div>
          </div>
        ))}

        <div className='dream'>
          <div className='dream_in'>
            <div className='dream-out'>
              <h2>DREAM IN REACT? LET'S BUILD IT TOGETHER!</h2>
            </div>
          </div>
          <div className='its_free'>
            <span>IT'S FREE</span>
            <span>100%</span>
          </div>
          <div className='no_catch'>
            <div className='summary-content'>
              <h2>
                NO CATCH. NO STRINGS. JUST PASSIONATE ABOUT DESIGN &
                DEVELOPMENT.
              </h2>
              <p>
                If you have a React-based idea or project in mind, I'll bring it
                to life—<span>for free</span>. Why? Because I believe in turning
                ideas into experiences while showcasing my skills.
              </p>
              <p>
                Reach out now, and let's kickstart your project together. Your
                vision deserves the best—let's make it happen!
              </p>
            </div>

            <button className='register-form'>
              <p className='btn-text'>I'm Waitinggg!</p>
              <span className='btn-ani-bg'></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
