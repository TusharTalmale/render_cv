// src/app/data/initialResumeData.js
export const initialResumeData = {
  personal: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 123-456-7890',
    location: 'San Francisco, CA',
    website: 'www.johndoe.com',
    linkedin: 'johndoe',
    github: 'johndoe',
  },
  summary: 'Highly motivated and results-oriented software engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in modern JavaScript frameworks and passionate about clean code and innovative solutions.',
  education: [
    {
      university: 'University of California, Berkeley',
      degree: 'M.S. in Computer Science',
      startDate: 'Aug 2019',
      endDate: 'May 2021',
      gpa: '3.9/4.0',
      description: 'Specialized in Artificial Intelligence and Machine Learning.'
    },
    {
      university: 'University of Washington',
      degree: 'B.S. in Software Engineering',
      startDate: 'Sept 2015',
      endDate: 'May 2019',
      gpa: '3.8/4.0',
      description: 'Graduated with honors. Dean\'s list recipient.'
    },
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: 'Jun 2023',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: '• Led the development of a new microservices architecture, improving system scalability by 40%.\n• Implemented robust API integrations with third-party services, reducing data latency by 20%.\n• Mentored junior developers, fostering a collaborative and productive team environment.'
    },
    {
      title: 'Software Engineer',
      company: 'Innovate Corp.',
      startDate: 'Jul 2021',
      endDate: 'May 2023',
      location: 'Seattle, WA',
      description: '• Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL.\n• Optimized database queries, resulting in a 15% improvement in application response time.\n• Collaborated with product managers to define and implement new features, enhancing user experience.'
    },
  ],
  skills: {
    languages: 'JavaScript, Python, Java, C++',
    frameworks: 'React, Node.js, Next.js, Spring Boot, Django',
    databases: 'PostgreSQL, MongoDB, MySQL',
    tools: 'Docker, Kubernetes, AWS, Git, JIRA',
  },
  projects: [
    {
      title: 'E-commerce Platform',
      link: 'github.com/johndoe/ecommerce',
      description: 'Developed a full-featured e-commerce platform with secure payment gateway integration and user authentication. Utilized React for the frontend and Node.js with Express for the backend.'
    },
    {
      title: 'Machine Learning Model for Fraud Detection',
      link: 'github.com/johndoe/fraud-detection',
      description: 'Built and deployed a machine learning model to detect fraudulent transactions, achieving 95% accuracy. Implemented using Python and scikit-learn.'
    },
  ],
  awards: [
    {
      name: 'Employee of the Year',
      year: '2023',
      description: 'Awarded for outstanding contributions to the "Project X" development.'
    },
    {
      name: 'Dean\'s List',
      year: '2016-2019',
      description: 'Recognized for academic excellence during undergraduate studies.'
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: 'March 2023'
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'CNCF',
      date: 'July 2022'
    },
  ],
};