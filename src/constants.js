// src/constants.js

export const INITIAL_RESUME_DATA = {
    personal: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (123) 456-7890',
        location: 'San Francisco, CA',
        website: 'johndoe.com',
        linkedin: 'johndoe',
        github: 'johndoe'
    },
    summary: 'A motivated and detail-oriented computer science professional with demonstrated experience in developing, testing, and maintaining web applications. Seeking to leverage strong skills in software engineering and collaboration to contribute to a dynamic team.',
    education: [{
        university: 'University of Example',
        degree: 'B.S. in Computer Science',
        startDate: 'Aug 2020',
        endDate: 'May 2024',
        gpa: '3.8/4.0',
        description: 'Coursework: Algorithms, Data Structures, Machine Learning, Web Development'
    }],
    experience: [{
        company: 'Tech Corp',
        title: 'Software Engineer Intern',
        location: 'San Francisco, CA',
        startDate: 'May 2023',
        endDate: 'Aug 2023',
        description: 'Developed a new feature for the main product.\\nFixed bugs and improved application performance by 15%.\\nCollaborated with cross-functional teams to deliver features on time.'
    }],
    projects: [{
        name: 'Personal Portfolio Website',
        technologies: 'React, Tailwind CSS, Spring Boot',
        link: 'github.com/johndoe/portfolio',
        description: 'Developed a personal portfolio website to showcase my projects and skills.\\nImplemented responsive design for mobile and desktop users.'
    }],
    awards: [{
        title: 'Best Hackathon Project',
        issuer: 'Tech Conference 2023',
        date: 'Jun 2023',
        description: 'Awarded for innovative use of AI in a healthcare logistics solution.'
    }],
    certifications: [{
        name: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        date: 'Mar 2023'
    }],
    skills: 'Java, Spring Boot, Python, JavaScript, React, Node.js, SQL, Git, Docker, Kubernetes'
};

export const EDUCATION_TEMPLATE = { university: '', degree: '', startDate: '', endDate: '', gpa: '', description: '' };
export const EXPERIENCE_TEMPLATE = { company: '', title: '', startDate: '', endDate: '', location: '', description: '' };
export const PROJECT_TEMPLATE = { name: '', technologies: '', link: '', description: '' };
export const AWARD_TEMPLATE = { title: '', issuer: '', date: '', description: '' };
export const CERTIFICATION_TEMPLATE = { name: '', issuer: '', date: '' };

// You can also define the list of available formats here
export const RESUME_FORMATS = [
    { id: 'rendercv', name: 'RenderCV Format', component: 'RenderCVFormat' }, // component will map to a JSX component
    // { id: 'modern', name: 'Modern Template', component: 'ModernFormat' },
    // { id: 'classic', name: 'Classic Template', component: 'ClassicFormat' },
];