import React, { useState, useEffect, useRef } from 'react';

// SkillCard Component for displaying individual skills categories
const SkillCard = ({ title, skills }) => (
  <div className="skill-card">
    <h3 className="skill-card-title">{title}</h3>
    <ul className="skill-list">
      {skills.map((skill, index) => (
        <li key={index} className="skill-item">
          <svg className="skill-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          {skill}
        </li>
      ))}
    </ul>
  </div>
);

// ProjectCard Component for displaying individual projects
const ProjectCard = ({ title, description, technologies, image, liveLink, githubLink }) => (
  <div className="project-card">
    <img src={image} alt={title} className="project-image" />
    <div className="project-content">
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      <div className="project-tech-container">
        {technologies.map((tech, index) => (
          <span key={index} className="project-tech-tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="project-links">
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link-button"
        >
          <svg className="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          Live Demo
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link-button github"
        >
          <svg className="project-link-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.406 2.862 8.125 6.837 9.488.5.087.687-.216.687-.487 0-.24-.007-.874-.012-1.712-2.782.603-3.37-1.34-3.37-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.705.997.865 2.62.775 3.25.593.1-.464.393-.864.717-1.06-2.477-.282-5.093-1.24-5.093-5.52 0-1.22.437-2.22 1.15-3.007-.116-.28-.5-1.423.11-2.966 0 0 .937-.301 3.07 1.149 2.1-.587 4.38-.587 6.48 0 2.13-1.45 3.067-1.149 3.067-1.149.61 1.543.22 2.686.11 2.966.713.787 1.15 1.787 1.15 3.007 0 4.29-2.62 5.23-5.105 5.508.4.348.76.918.76 1.855 0 1.335-.012 2.415-.012 2.74C20.138 20.334 23 16.617 23 12.017 23 6.484 18.522 2 13 2h-1z" clipRule="evenodd"></path>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </div>
);

// UserCard Component for displaying a brief profile on the home page
const UserCard = ({ user, onReadMore }) => (
  <div className="user-card">
    <img src={user.profileImage} alt={user.name} className="user-profile-image" />
    <h2 className="user-name">{user.name}</h2>
    <p className="user-profession">{user.profession}</p>
    <button onClick={() => onReadMore(user.id)} className="read-more-button">
      Read More
    </button>
  </div>
);

// ProfileModal Component to display individual user details
const ProfileModal = ({ user, onClose }) => {
  if (!user) return null; // Don't render if no user is selected

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        <h2 className="section-title modal-title">{user.name}'s Profile</h2>

        {/* About Section */}
        <section className="section-base modal-section about-section">
          <div className="container">
            <h3 className="section-subtitle">About Me</h3>
            <div className="about-content">
              <div className="about-image-wrapper md-w-1-2 md-mb-0">
                <img src={user.aboutImage} alt={user.name} className="about-image" />
              </div>
              <div className="about-text-wrapper md-w-1-2">
                {user.bio.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section-base modal-section skills-section">
          <div className="container">
            <h3 className="section-subtitle">Skills</h3>
            <div className="skills-grid">
              {user.skills.frontend && <SkillCard title="Front-end Development" skills={user.skills.frontend} />}
              {user.skills.backend && <SkillCard title="Back-end Development" skills={user.skills.backend} />}
              {user.skills.tools && <SkillCard title="Tools & Technologies" skills={user.skills.tools} />}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section-base modal-section projects-section">
          <div className="container">
            <h3 className="section-subtitle">Projects</h3>
            <div className="projects-grid">
              {user.projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  image={project.image}
                  liveLink={project.liveLink}
                  githubLink={project.githubLink}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Social Links Section (simplified contact) */}
        <section className="section-base modal-section contact-section">
          <div className="container">
            <h3 className="section-subtitle">Connect with {user.name}</h3>
            <div className="contact-info-container">
              <p>Email: <a href={`mailto:${user.contact.email}`} className="contact-link">{user.contact.email}</a></p>
              <div className="footer-social-links">
                {user.contact.linkedin && <a href={user.contact.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>}
                {user.contact.github && <a href={user.contact.github} target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>}
                {user.contact.twitter && <a href={user.contact.twitter} target="_blank" rel="noopener noreferrer" className="footer-social-link">Twitter</a>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


// Main App component
const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // User Data
  const users = [
    {
      id: 'person1',
      name: 'Jayesh Gaur',
      profession: 'Python Developer, AI Developer, Full-stack Developer',
      profileImage: 'https://ionn.in/assets/team/Jayesh.jpg',
      aboutImage: 'https://i.pinimg.com/originals/a6/fd/83/a6fd83789e21252a51f0aace55cfc146.jpg',
      bio: `Hi, I'm Jayesh Gaur, a passionate Python Developer with a keen interest in AI and Full-stack Development. I have a strong foundation in Python and its frameworks, and I love building scalable web applications.`,
      skills: {
        frontend: ['React', 'JavaScript ', 'HTML5', 'CSS', ],
        backend: ['Node.js', 'Express.js', 'Python', 'Django', 'MongoDB'],
        tools: ['Git', 'VS Code']
      },
      projects: [
        {
          title: 'Discord Moderation Bot',
          description: 'A comprehensive e-commerce solution with user authentication, product management, shopping cart, and secure payment processing.',
          technologies: ['Python', 'Discord API'],
          image: 'https://static.beebom.com/wp-content/uploads/2018/02/discord-bots.jpg',
          githubLink: 'https://github.com/tdc9/DiscordAnimeBot'
        },
        {
          title: 'Weather App',
          description: 'A Web Based Weather Application that provides real-time weather updates and forecasts for any location.',
          technologies: ['HTML', 'CSS', 'JS', 'Python', 'django'],
          image: 'https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1705077031869-51b60754302a%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Dweather%252Bapp%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8Mnx8d2VhdGhlciUyMGFwcHxlbnwwfHx8fDE3NTA4OTk3OTV8MA%26ixlib%3Drb-4.1.0&blend-w=1&auto=format&fit=crop&q=60',
          githubLink: 'https://github.com/tdc9/weather-app'
        },
      ],
      contact: {
        email: 'jayesh.ionn@gmail.com',
        linkedin: 'https://www.linkedin.com/in/tdc9/',
        github: 'https://github.com/tdc9/',
      }
    },
    {
      id: 'person2',
      name: 'Dharna Bisht',
      profession: 'Frontend Developer, Python Developer',
      profileImage: 'https://ionn.in/assets/team/Dharna.jpg',
      aboutImage: 'https://cdn.rafled.com/anime-icons/images/06dd97d14fd7f31fca7cfa724330ecafe9f3bc3871a6b0fae64ae3fab2b3607f.jpg',
      bio: `I'm a 3rd year B.Tech CSE student, eager to learn, explore, and grow in the field of technology. Looking forward to connecting and discovering new opportunities.`,
      skills: {
        frontend: ['HTML5', 'CSS', 'JS', 'React'],
        tools: ['VS Code', 'Canva', 'Git']
      },
      projects: [
        {
          
          title: 'Discord Moderation Bot',
          description: 'A comprehensive e-commerce solution with user authentication, product management, shopping cart, and secure payment processing.',
          technologies: ['Python', 'Discord API'],
          image: 'https://static.beebom.com/wp-content/uploads/2018/02/discord-bots.jpg',
          githubLink: 'https://github.com/tdc9/DiscordAnimeBot'
        },
        
      ],
      contact: {
        email: 'dharna.ionn@gmail.com',
        linkedin: 'https://www.linkedin.com/in/tdc6',
        github: 'https://github.com/tdc6',
      }
    }
  ];

  // Get the currently selected user object
  const user = users.find(u => u.id === selectedUserId);

  // Home section ref for scroll tracking
  const homeRef = useRef(null);

  // Effect to disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Clean up on unmount
    };
  }, [isModalOpen]);

  // Function to handle "Read More" click
  const handleReadMoreClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };


  return (
    <>
      <style>
        {`
          /* Base Styles */
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1a202c; /* bg-gray-900 */
            color: #f7fafc; /* text-gray-100 */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* General Section Styles */
          .section-base {
            padding: 4rem 1.5rem; /* py-16 px-6 */
            margin: 1rem; /* m-4 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          }
          .section-title {
            font-size: 2.25rem; /* text-4xl */
            font-weight: bold;
            text-align: center;
            color: #818cf8; /* text-indigo-400 */
            margin-bottom: 3rem; /* mb-12 */
          }
          .section-subtitle {
            font-size: 2rem; /* text-3xl */
            font-weight: bold;
            color: #818cf8; /* text-indigo-400 */
            margin-bottom: 2rem; /* mb-8 */
            text-align: center; /* Center subtitles too */
          }
          .container {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem; /* px-6 */
            padding-right: 1.5rem; /* px-6 */
          }
          @media (min-width: 768px) {
            .container {
                padding-left: 3rem; /* md:px-12 */
                padding-right: 3rem; /* md:px-12 */
            }
            .section-base {
                padding-left: 3rem; /* md:px-12 */
                padding-right: 3rem; /* md:px-12 */
            }
          }

          /* Navigation Bar (removed, but keeping related styles for modal's "Back to Home") */
          .navbar {
            display: none; /* Hide the navbar */
          }
          .nav-button {
            background-color: #f6e05e; /* bg-yellow-500 */
            color: #1a202c; /* text-gray-900 */
            font-weight: bold;
            padding: 0.5rem 1.5rem; /* py-2 px-6 */
            border-radius: 9999px; /* rounded-full */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
            transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
            border: none;
            cursor: pointer;
          }
          .nav-button:hover {
            background-color: #ecc94b; /* hover:bg-yellow-600 */
            transform: scale(1.05); /* hover:scale-105 */
          }

          /* Main Content Padding */
          .main-content {
            padding-top: 0; /* pt-0 - no navbar offset needed */
          }

          /* Home Section */
          .home-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff; /* text-white */
            padding: 4rem 1.5rem; /* py-16 px-4 */
            position: relative;
            overflow: hidden;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }
          .home-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: #000000; /* bg-black */
            opacity: 0.6; /* opacity-60 */
          }
          .home-content {
            text-align: center;
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            gap: 2rem; /* space-y-8 */
          }
          @media (min-width: 768px) {
            .home-content {
              flex-direction: row;
              gap: 4rem; /* space-x-16 */
            }
          }

          /* User Card on Home */
          .user-card {
            background-color: rgba(45, 55, 72, 0.9); /* bg-gray-800 with opacity */
            padding: 2rem; /* p-8 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex: 1; /* flex-1 */
            max-width: 300px; /* max-w-sm */
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            border: 1px solid #4a5568; /* border border-gray-700 */
          }
          .user-card:hover {
            transform: translateY(-0.5rem); /* hover:-translate-y-2 */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* hover:shadow-2xl */
          }
          .user-profile-image {
            border-radius: 9999px; /* rounded-full */
            width: 120px; /* w-32 */
            height: 120px; /* h-32 */
            object-fit: cover;
            margin-bottom: 1rem; /* mb-4 */
            border: 3px solid #818cf8; /* border-3 border-indigo-400 */
          }
          .user-name {
            font-size: 1.875rem; /* text-3xl */
            font-weight: bold;
            color: #e0e7ff; /* text-indigo-100 */
            margin-bottom: 0.5rem; /* mb-2 */
          }
          .user-profession {
            font-size: 1rem; /* text-base */
            color: #a0aec0; /* text-gray-400 */
            margin-bottom: 1.5rem; /* mb-6 */
          }
          .read-more-button {
            background-color:rgb(255, 124, 227); /* bg-yellow-500 */
            color: #1a202c; /* text-gray-900 */
            font-weight: bold;
            padding: 0.75rem 1.5rem; /* py-3 px-6 */
            border-radius: 9999px; /* rounded-full */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
            transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
            border: none;
            cursor: pointer;
          }
          .read-more-button:hover {
            background-color: #ecc94b; /* hover:bg-yellow-600 */
            transform: scale(1.05); /* hover:scale-105 */
          }


          /* About Section */
          .about-section {
            background-color: #2d3748; /* bg-gray-800 */
          }
          .about-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          @media (min-width: 768px) { /* md */
            .about-content {
              flex-direction: row;
              gap: 3rem; /* md:space-x-12 */
            }
          }
          .about-image-wrapper {
            margin-bottom: 2rem; /* mb-8 */
          }
          @media (min-width: 768px) { /* md */
            .about-image-wrapper {
              width: 50%; /* md:w-1/2 */
              margin-bottom: 0; /* md:mb-0 */
            }
          }
          .about-image {
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
            width: 100%;
            height: auto;
          }
          .about-text-wrapper {
            font-size: 1.125rem; /* text-lg */
            line-height: 1.625; /* leading-relaxed */
            color: #d1d5db; /* text-gray-300 */
          }
          @media (min-width: 768px) { /* md */
            .about-text-wrapper {
              width: 50%; /* md:w-1/2 */
            }
          }
          .about-text-wrapper p {
            margin-bottom: 1rem; /* mb-4 */
          }

          /* Skills Section */
          .skills-section {
            background-color: #1a202c; /* bg-gray-900 */
          }
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr; /* grid-cols-1 */
            gap: 2rem; /* gap-8 */
          }
          @media (min-width: 640px) { /* sm */
            .skills-grid {
              grid-template-columns: repeat(2, 1fr); /* sm:grid-cols-2 */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .skills-grid {
              grid-template-columns: repeat(3, 1fr); /* lg:grid-cols-3 */
            }
          }
          .skill-card {
            background-color: #2d3748; /* bg-gray-800 */
            padding: 2rem; /* p-8 */
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .skill-card:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* hover:shadow-2xl */
            transform: translateY(-0.5rem); /* hover:-translate-y-2 */
          }
          .skill-card-title {
            font-size: 1.5rem; /* text-2xl */
            font-weight: bold;
            color: #818cf8; /* text-indigo-400 */
            margin-bottom: 1rem; /* mb-4 */
            text-align: center;
          }
          .skill-list {
            list-style-type: none; /* remove default list-disc */
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem; /* space-y-2 */
            color: #d1d5db; /* text-gray-300 */
          }
          .skill-item {
            display: flex;
            align-items: center;
          }
          .skill-icon {
            width: 1rem; /* w-4 */
            height: 1rem; /* h-4 */
            color: #34d399; /* text-green-500 */
            margin-right: 0.5rem; /* mr-2 */
          }


          /* Projects Section */
          .projects-section {
            background-color: #2d3748; /* bg-gray-800 */
          }
          .projects-grid {
            display: grid;
            grid-template-columns: 1fr; /* grid-cols-1 */
            gap: 2.5rem; /* gap-10 */
          }
          @media (min-width: 768px) { /* md */
            .projects-grid {
              grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .projects-grid {
              grid-template-columns: repeat(3, 1fr); /* lg:grid-cols-3 */
            }
          }
          .project-card {
            background-color: #2d3748; /* bg-gray-800 */
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            overflow: hidden;
          }
          .project-card:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* hover:shadow-2xl */
            transform: translateY(-0.5rem); /* hover:-translate-y-2 */
          }
          .project-image {
            width: 100%;
            height: 13rem; /* h-52 */
            object-fit: cover;
          }
          .project-content {
            padding: 1.5rem; /* p-6 */
          }
          .project-title {
            font-size: 1.5rem; /* text-2xl */
            font-weight: bold;
            color: #818cf8; /* text-indigo-400 */
            margin-bottom: 0.75rem; /* mb-3 */
          }
          .project-description {
            color: #d1d5db; /* text-gray-300 */
            margin-bottom: 1rem; /* mb-4 */
            font-size: 0.875rem; /* text-sm */
          }
          .project-tech-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem; /* gap-2 */
            margin-bottom: 1rem; /* mb-4 */
          }
          .project-tech-tag {
            background-color: #4338ca; /* bg-indigo-700 */
            color: #e0e7ff; /* text-indigo-100 */
            font-size: 0.75rem; /* text-xs */
            font-weight: 600; /* font-semibold */
            padding: 0.25rem 0.625rem; /* px-2.5 py-0.5 */
            border-radius: 9999px; /* rounded-full */
          }
          .project-links {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem; /* mt-4 */
          }
          .project-link-button {
            background-color: #4f46e5; /* bg-indigo-600 */
            color: #ffffff; /* text-white */
            font-weight: 600; /* font-semibold */
            padding: 0.5rem 1rem; /* py-2 px-4 */
            border-radius: 9999px; /* rounded-full */
            font-size: 0.875rem; /* text-sm */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
            text-decoration: none;
            display: flex;
            align-items: center;
          }
          .project-link-button:hover {
            background-color: #4338ca; /* hover:bg-indigo-700 */
            transform: scale(1.05); /* hover:scale-105 */
          }
          .project-link-button.github {
            background-color: #374151; /* bg-gray-700 */
          }
          .project-link-button.github:hover {
            background-color: #4b5563; /* hover:bg-gray-600 */
          }
          .project-link-icon {
            width: 1rem; /* w-4 */
            height: 1rem; /* h-4 */
            margin-right: 0.5rem; /* mr-2 */
          }

          /* Contact Section */
          .contact-section {
            background-color: #1a202c; /* bg-gray-900 */
          }
          .contact-form-container {
            max-width: 32rem; /* max-w-xl */
            margin-left: auto;
            margin-right: auto;
            background-color: #2d3748; /* bg-gray-800 */
            padding: 2rem; /* p-8 */
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          }
          .contact-form-container p {
            text-align: center;
            color: #d1d5db; /* text-gray-300 */
            margin-bottom: 1.5rem; /* mb-6 */
          }
          .form-group {
            margin-bottom: 1rem; /* mb-4 */
          }
          .form-label {
            display: block;
            color: #d1d5db; /* text-gray-300 */
            font-size: 0.875rem; /* text-sm */
            font-weight: bold;
            margin-bottom: 0.5rem; /* mb-2 */
          }
          .form-input,
          .form-textarea {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
            appearance: none;
            border: 1px solid #4a5568; /* border-gray-700 */
            border-radius: 0.25rem; /* rounded */
            width: 100%;
            padding: 0.5rem 0.75rem; /* py-2 px-3 */
            color: #f7fafc; /* text-gray-100 */
            line-height: 1.25; /* leading-tight */
            outline: none;
            background-color: #4a5568; /* bg-gray-700 */
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .form-input:focus,
          .form-textarea:focus {
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); /* focus:ring-2 focus:ring-indigo-500 */
          }
          .form-textarea {
            resize: vertical; /* resize-y */
            min-height: 5rem; /* rows="5" implies a default height */
            margin-bottom: 1.5rem; /* mb-6 */
          }
          .form-button-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .form-submit-button {
            background-color: #4f46e5; /* bg-indigo-600 */
            color: #ffffff; /* text-white */
            font-weight: bold;
            padding: 0.75rem 2rem; /* py-3 px-8 */
            border-radius: 9999px; /* rounded-full */
            outline: none;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* focus:shadow-outline */
            transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
            border: none;
            cursor: pointer;
          }
          .form-submit-button:hover {
            background-color: #4338ca; /* hover:bg-indigo-700 */
            transform: scale(1.05); /* hover:scale-105 */
          }

          /* Footer */
          .footer {
            background-color: #2d3748; /* bg-gray-800 */
            color: #ffffff; /* text-white */
            padding: 2rem 1.5rem; /* py-8 px-4 */
            text-align: center;
            border-top-left-radius: 0.75rem; /* rounded-t-xl */
            border-top-right-radius: 0.75rem; /* rounded-t-xl */
            margin: 1rem; /* m-4 */
          }
          @media (min-width: 768px) { /* md */
            .footer {
                padding-left: 3rem; /* md:px-12 */
                padding-right: 3rem; /* md:px-12 */
            }
          }
          .footer-social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem; /* space-x-6 */
            margin-top: 1rem; /* mt-4 */
          }
          .footer-social-link {
            color: #ffffff; /* text-white */
            transition: color 0.3s ease-in-out;
            text-decoration: none;
          }
          .footer-social-link:hover {
            color: #818cf8; /* hover:text-indigo-400 */
          }

          /* General Utility Classes for Responsiveness (converted from Tailwind) */
          @media (min-width: 768px) {
            .md-flex { display: flex; }
            .md-space-x-12 > *:not(:last-child) { margin-right: 3rem; }
            .md-w-1-2 { width: 50%; }
            .md-mb-0 { margin-bottom: 0; }
            .md-px-12 { padding-left: 3rem; padding-right: 3rem; }
            .md-block { display: block; }
            .md-hidden { display: none; }
          }

          /* Modal Specific Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            overflow-y: auto; /* Allow scrolling within the overlay */
            padding: 20px 0; /* Add some padding for better spacing */
          }

          .modal-content {
            background-color: #1a202c; /* bg-gray-900 */
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
            position: relative;
            width: 90%;
            max-width: 1000px; /* Limit max width */
            margin: auto; /* Center in the available space */
            color: #f7fafc;
          }
          @media (min-width: 768px) {
            .modal-content {
              padding: 3rem;
            }
          }

          .modal-close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            color: #d1d5db;
            cursor: pointer;
            transition: color 0.3s ease-in-out;
          }
          .modal-close-button:hover {
            color: #818cf8;
          }
          .modal-title {
            margin-top: 1rem;
            margin-bottom: 3rem;
            font-size: 2.5rem; /* Larger title for modal */
          }
          .modal-section {
            margin: 2rem 0; /* Adjust spacing between sections in modal */
            border-radius: 0.5rem; /* Slightly smaller border-radius for modal sections */
          }
          .contact-info-container {
            text-align: center;
            font-size: 1.125rem;
            color: #d1d5db;
          }
          .contact-info-container p {
            margin-bottom: 1rem;
          }
          .contact-link {
            color: #818cf8;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
          }
          .contact-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="portfolio-app-wrapper"> {/* Overall wrapper to apply font and base colors */}
        {/* Main Content Sections */}
        <main className="main-content">
          {/* Home Section with background image placeholder */}
          <section
            ref={homeRef}
            id="home"
            className="home-section"
            style={{
              backgroundImage: `url('https://ionn.in/assets/team/Banner.png')` // Placeholder image URL
            }}
          >
            {/* Overlay for better text readability */}
            <div className="home-overlay"></div>
            <div className="home-content">
              {users.map(user => (
                <UserCard key={user.id} user={user} onReadMore={handleReadMoreClick} />
              ))}
            </div>
          </section>

          {/* Render Profile Modal if a user is selected and modal is open */}
          {isModalOpen && <ProfileModal user={user} onClose={() => setIsModalOpen(false)} />}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Team Ionn All Rights Reserved</p>
          <p>Made with ❤️ by Team Ionn</p>
          <p>Follow us on:</p>
          <div className="footer-social-links">
            {/* General social links for the team/website */}
            <a href="https://www.linkedin.com/company/ionn-enterprises/" className="footer-social-link">LinkedIn (Team)</a>
            <a href="#" className="footer-social-link">Instagram (Team)</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
