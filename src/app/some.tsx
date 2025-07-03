"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { Download, Plus, Trash2, Clipboard, Check, ChevronDown, ChevronUp, FileText, MapPin, Mail, Phone, Github, Linkedin, Link as LinkIcon, User, Award, BookOpen, Code, Lightbulb } from 'lucide-react';

// Helper Components (assuming these are custom components you've defined)

const Input = ({ label, name, value, onChange, type = "text", icon: Icon }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
      {Icon && Icon}
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677D6A] focus:border-transparent"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677D6A] focus:border-transparent"
    ></textarea>
  </div>
);

const Section = ({ title, children, className = "", id }) => {
  return (
    <section id={id} className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      {title}
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
};

// Main App Component
export default function App() {
  const [resumeData, setResumeData] = useState({
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
  });

  const [generatedLatex, setGeneratedLatex] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    summary: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    awards: true,
    certifications: true,
  });

  const toggleSection = (sectionKey) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionKey]: !prevState[sectionKey]
    }));
  };

  const SectionTitle = ({ title, sectionKey }) => (
    <h2
      className="text-2xl font-bold text-[#1A3636] cursor-pointer flex justify-between items-center"
      onClick={() => toggleSection(sectionKey)}
    >
      {title}
      {expandedSections[sectionKey] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </h2>
  );

  const generateLatex = useCallback((data) => {
    const escapeLatex = (text) => {
      if (typeof text !== 'string') return '';
      return text
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}')
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/-/g, '{-}') // Handle hyphens for better line breaks
        .replace(/\n/g, '\\\\'); // Newlines for multiline text
    };

    let latexContent = `\\documentclass[letterpaper,10pt]{article}
\\usepackage{latexsym}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage{ragged2e}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{fontawesome5} % For icons like GitHub, LinkedIn

% Colors for the template
\\definecolor{primary}{HTML}{1A3636}
\\definecolor{secondary}{HTML}{40534C}
\\definecolor{accent}{HTML}{D6BD98}
\\definecolor{textgray}{HTML}{677D6A}

% Adjust margins
\\addtolength{\\textwidth}{1in}
\\addtolength{\\textheight}{1in}
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\topmargin}{-0.5in}

\\pagestyle{empty} % No page numbers

% Sections formatting
\\titleformat{\\section}{\\vspace{-4pt}\\raggedright\\Large\\bfseries\\color{primary}}{}{0em}{}[\\color{accent}\\rule{\\linewidth}{0.8pt}\\vspace{-2pt}]
\\titlespacing{\\section}{0pt}{1ex}{0.8ex}

\\begin{document}

%----------------------------------------------------------------------------------------
%   PERSONAL INFORMATION
%----------------------------------------------------------------------------------------

\\begin{center}
    \\textbf{\\Huge \\color{primary} ${escapeLatex(data.personal.name)}} \\[5pt]
    \\color{textgray} \\faPhone \\ ${escapeLatex(data.personal.phone)} \\textperiodcentered\\ 
    \\faEnvelope \\ \\href{mailto:${escapeLatex(data.personal.email)}}{${escapeLatex(data.personal.email)}} \\textperiodcentered\\ 
    \\faMapMarkerAlt \\ ${escapeLatex(data.personal.location)} \\textperiodcentered\\ 
    \\faGlobe \\ \\href{${escapeLatex(data.personal.website)}}{${escapeLatex(data.personal.website)}} \\textperiodcentered\\ 
    \\faLinkedin \\ \\href{https://linkedin.com/in/${escapeLatex(data.personal.linkedin)}}{${escapeLatex(data.personal.linkedin)}} \\textperiodcentered\\ 
    \\faGithub \\ \\href{https://github.com/${escapeLatex(data.personal.github)}}{${escapeLatex(data.personal.github)}}
\\end{center}

%----------------------------------------------------------------------------------------
%   SUMMARY
%----------------------------------------------------------------------------------------
${data.summary ? `
\\section*{Summary}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
    \\item ${escapeLatex(data.summary)}
\\end{itemize}
` : ''}

%----------------------------------------------------------------------------------------
%   EDUCATION
%----------------------------------------------------------------------------------------
${data.education.length > 0 ? `
\\section*{Education}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
${data.education.map(edu => `
    \\item \\textbf{${escapeLatex(edu.university)}} \\hfill ${escapeLatex(edu.startDate)} -- ${escapeLatex(edu.endDate)}
    \\begin{itemize}[leftmargin=0.8em,labelsep=0.5em,itemsep=0ex,parsep=0ex]
        \\item \\textit{${escapeLatex(edu.degree)}} ${edu.gpa ? `\\textperiodcentered\\ GPA: ${escapeLatex(edu.gpa)}` : ''}
        ${edu.description ? `\\item ${escapeLatex(edu.description)}` : ''}
    \\end{itemize}
`).join('\n')}
\\end{itemize}
` : ''}

%----------------------------------------------------------------------------------------
%   EXPERIENCE
%----------------------------------------------------------------------------------------
${data.experience.length > 0 ? `
\\section*{Experience}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
${data.experience.map(exp => `
    \\item \\textbf{${escapeLatex(exp.title)}} at ${escapeLatex(exp.company)} \\hfill ${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}
    \\begin{itemize}[leftmargin=0.8em,labelsep=0.5em,itemsep=0ex,parsep=0ex]
        \\item \\textit{${escapeLatex(exp.location)}}
        ${exp.description.split('\n').filter(line => line.trim() !== '').map(line => `\\item ${escapeLatex(line.trim())}`).join('\n        ')}
    \\end{itemize}
`).join('\n')}
\\end{itemize}
` : ''}

%----------------------------------------------------------------------------------------
%   SKILLS
%----------------------------------------------------------------------------------------
${Object.values(data.skills).some(skill => skill) ? `
\\section*{Skills}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
${data.skills.languages ? `    \\item \\textbf{Languages:} ${escapeLatex(data.skills.languages)}` : ''}
${data.skills.frameworks ? `    \\item \\textbf{Frameworks:} ${escapeLatex(data.skills.frameworks)}` : ''}
${data.skills.databases ? `    \\item \\textbf{Databases:} ${escapeLatex(data.skills.databases)}` : ''}
${data.skills.tools ? `    \\item \\textbf{Tools:} ${escapeLatex(data.skills.tools)}` : ''}
\\end{itemize}
` : ''}

%----------------------------------------------------------------------------------------
%   PROJECTS
%----------------------------------------------------------------------------------------
${data.projects.length > 0 ? `
\\section*{Projects}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
${data.projects.map(proj => `
    \\item \\textbf{${escapeLatex(proj.title)}} \\hfill \\href{${escapeLatex(proj.link)}}{${escapeLatex(proj.link)}}
    \\begin{itemize}[leftmargin=0.8em,labelsep=0.5em,itemsep=0ex,parsep=0ex]
        \\item ${escapeLatex(proj.description)}
    \\end{itemize}
`).join('\n')}
\\end{itemize}
` : ''}

%----------------------------------------------------------------------------------------
%   AWARDS
%----------------------------------------------------------------------------------------
${data.awards.length > 0 ? `
\\section*{Awards}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
${data.awards.map(award => `
    \\item \\textbf{${escapeLatex(award.name)}} (${escapeLatex(award.year)})
    \\begin{itemize}[leftmargin=0.8em,labelsep=0.5em,itemsep=0ex,parsep=0ex]
        \\item ${escapeLatex(award.description)}
    \\end{itemize}
`).join('\n')}
\\end{itemize}
` : ''}

%----------------------------------------------------------------------------------------
%   CERTIFICATIONS
%----------------------------------------------------------------------------------------
${data.certifications.length > 0 ? `
\\section*{Certifications}
\\vspace{-5pt}
\\begin{itemize}[leftmargin=*,labelsep=0.5em,itemsep=0ex,parsep=0ex]
${data.certifications.map(cert => `
    \\item \\textbf{${escapeLatex(cert.name)}} \\hfill ${escapeLatex(cert.date)}
    \\begin{itemize}[leftmargin=0.8em,labelsep=0.5em,itemsep=0ex,parsep=0ex]
        \\item Issuer: ${escapeLatex(cert.issuer)}
    \\end{itemize}
`).join('\n')}
\\end{itemize}
` : ''}

\\end{document}`;

    return latexContent;
  }, []);

  useEffect(() => {
    setGeneratedLatex(generateLatex(resumeData));
  }, [resumeData, generateLatex]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prevData => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        [name]: value,
      },
    }));
  };

  const handleSummaryChange = (e) => {
    setResumeData(prevData => ({
      ...prevData,
      summary: e.target.value,
    }));
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prevData => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [name]: value,
      },
    }));
  };

  const handleDynamicChange = (section, index, e) => {
    const { name, value } = e.target;
    setResumeData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [name]: value,
      };
      return {
        ...prevData,
        [section]: updatedSection,
      };
    });
  };

  const addDynamicItem = (section, newItem) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };

  const removeDynamicItem = (section, index) => {
    setResumeData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection.splice(index, 1);
      return {
        ...prevData,
        [section]: updatedSection,
      };
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLatex], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.tex';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleOpenInOverleaf = () => {
    const overleafBaseUrl = "https://www.overleaf.com/docs";
    // This is a simplified approach. Overleaf usually requires a project ID or a specific API.
    // For a real integration, you'd likely need to use their API or a more robust method.
    // As a workaround, you can provide instructions to the user to copy-paste.
    alert("To open in Overleaf, please copy the LaTeX code and paste it into a new Overleaf project.");
    handleCopy(); // Also copy the code to make it easy for the user
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-gray-800">
      {/* --- New Navigation Bar --- */}
      <nav className="bg-[#1A3636] text-white shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="text-[#D6BD98]" size={24} />
            <span className="text-xl font-bold">RenderCV</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#personal" className="hover:text-[#D6BD98] transition">Personal</a>
            <a href="#summary" className="hover:text-[#D6BD98] transition">Summary</a>
            <a href="#experience" className="hover:text-[#D6BD98] transition">Experience</a>
            <a href="#education" className="hover:text-[#D6BD98] transition">Education</a>
            <a href="#skills" className="hover:text-[#D6BD98] transition">Skills</a>
            <a href="#projects" className="hover:text-[#D6BD98] transition">Projects</a>
            <a href="#awards" className="hover:text-[#D6BD98] transition">Awards</a>
            <a href="#certifications" className="hover:text-[#D6BD98] transition">Certifications</a>
          </div>
          <button className="md:hidden text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="bg-[#40534C] text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional LaTeX Resume Generator</h1>
          <p className="text-xl md:text-2xl text-[#D6BD98] mb-6">Create a polished, ATS-friendly resume in LaTeX format</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownload}
              className="bg-[#D6BD98] hover:bg-[#c5ab7f] text-[#1A3636] font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
            >
              <Download size={20} /> Download Template
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Form Column --- */}
        <div className="lg:col-span-2 space-y-8">
          <Section
            title={<SectionTitle title="Personal Information" sectionKey="personal" />}
            className="border-t-4 border-[#1A3636]"
            id="personal"
          >
            {expandedSections.personal && <>
              <Input
                label="Full Name"
                name="name"
                value={resumeData.personal.name}
                onChange={handlePersonalChange}
                icon={<User size={18} className="text-[#677D6A]" />}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  name="email"
                  value={resumeData.personal.email}
                  onChange={handlePersonalChange}
                  icon={<Mail size={18} className="text-[#677D6A]" />}
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={resumeData.personal.phone}
                  onChange={handlePersonalChange}
                  icon={<Phone size={18} className="text-[#677D6A]" />}
                />
              </div>
              <Input
                label="Location"
                name="location"
                value={resumeData.personal.location}
                onChange={handlePersonalChange}
                icon={<MapPin size={18} className="text-[#677D6A]" />}
              />
              <Input
                label="Website"
                name="website"
                value={resumeData.personal.website}
                onChange={handlePersonalChange}
                icon={<LinkIcon size={18} className="text-[#677D6A]" />}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="LinkedIn Username"
                  name="linkedin"
                  value={resumeData.personal.linkedin}
                  onChange={handlePersonalChange}
                  icon={<Linkedin size={18} className="text-[#677D6A]" />}
                />
                <Input
                  label="GitHub Username"
                  name="github"
                  value={resumeData.personal.github}
                  onChange={handlePersonalChange}
                  icon={<Github size={18} className="text-[#677D6A]" />}
                />
              </div>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Summary" sectionKey="summary" />}
            className="border-t-4 border-[#1A3636]"
            id="summary"
          >
            {expandedSections.summary && (
              <Textarea
                label="Professional Summary"
                name="summary"
                value={resumeData.summary}
                onChange={handleSummaryChange}
              />
            )}
          </Section>

          <Section
            title={<SectionTitle title="Experience" sectionKey="experience" />}
            className="border-t-4 border-[#1A3636]"
            id="experience"
          >
            {expandedSections.experience && <>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Job Title"
                      name="title"
                      value={exp.title}
                      onChange={(e) => handleDynamicChange('experience', index, e)}
                    />
                    <Input
                      label="Company"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleDynamicChange('experience', index, e)}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-2">
                    <Input
                      label="Start Date"
                      name="startDate"
                      value={exp.startDate}
                      onChange={(e) => handleDynamicChange('experience', index, e)}
                    />
                    <Input
                      label="End Date"
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleDynamicChange('experience', index, e)}
                    />
                    <Input
                      label="Location"
                      name="location"
                      value={exp.location}
                      onChange={(e) => handleDynamicChange('experience', index, e)}
                    />
                  </div>
                  <Textarea
                    label="Description (one bullet per line)"
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleDynamicChange('experience', index, e)}
                    className="mt-4"
                  />
                  <button
                    onClick={() => removeDynamicItem('experience', index)}
                    className="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDynamicItem('experience', { company: '', title: '', startDate: '', endDate: '', location: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Experience
              </button>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Education" sectionKey="education" />}
            className="border-t-4 border-[#1A3636]"
            id="education"
          >
            {expandedSections.education && <>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
                  <Input
                    label="University/Institution"
                    name="university"
                    value={edu.university}
                    onChange={(e) => handleDynamicChange('education', index, e)}
                  />
                  <Input
                    label="Degree/Field of Study"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleDynamicChange('education', index, e)}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      name="startDate"
                      value={edu.startDate}
                      onChange={(e) => handleDynamicChange('education', index, e)}
                    />
                    <Input
                      label="End Date"
                      name="endDate"
                      value={edu.endDate}
                      onChange={(e) => handleDynamicChange('education', index, e)}
                    />
                  </div>
                  <Input
                    label="GPA (Optional)"
                    name="gpa"
                    value={edu.gpa}
                    onChange={(e) => handleDynamicChange('education', index, e)}
                  />
                  <Textarea
                    label="Description (e.g., relevant coursework)"
                    name="description"
                    value={edu.description}
                    onChange={(e) => handleDynamicChange('education', index, e)}
                    className="mt-4"
                  />
                  <button
                    onClick={() => removeDynamicItem('education', index)}
                    className="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDynamicItem('education', { university: '', degree: '', startDate: '', endDate: '', gpa: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Education
              </button>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Skills" sectionKey="skills" />}
            className="border-t-4 border-[#1A3636]"
            id="skills"
          >
            {expandedSections.skills && <>
              <Input
                label="Languages (comma-separated)"
                name="languages"
                value={resumeData.skills.languages}
                onChange={handleSkillsChange}
                icon={<Code size={18} className="text-[#677D6A]" />}
              />
              <Input
                label="Frameworks (comma-separated)"
                name="frameworks"
                value={resumeData.skills.frameworks}
                onChange={handleSkillsChange}
                icon={<Lightbulb size={18} className="text-[#677D6A]" />}
              />
              <Input
                label="Databases (comma-separated)"
                name="databases"
                value={resumeData.skills.databases}
                onChange={handleSkillsChange}
                icon={<BookOpen size={18} className="text-[#677D6A]" />}
              />
              <Input
                label="Tools (comma-separated)"
                name="tools"
                value={resumeData.skills.tools}
                onChange={handleSkillsChange}
                icon={<LinkIcon size={18} className="text-[#677D6A]" />}
              />
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Projects" sectionKey="projects" />}
            className="border-t-4 border-[#1A3636]"
            id="projects"
          >
            {expandedSections.projects && <>
              {resumeData.projects.map((proj, index) => (
                <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
                  <Input
                    label="Project Title"
                    name="title"
                    value={proj.title}
                    onChange={(e) => handleDynamicChange('projects', index, e)}
                  />
                  <Input
                    label="Project Link (Optional)"
                    name="link"
                    value={proj.link}
                    onChange={(e) => handleDynamicChange('projects', index, e)}
                  />
                  <Textarea
                    label="Description"
                    name="description"
                    value={proj.description}
                    onChange={(e) => handleDynamicChange('projects', index, e)}
                    className="mt-4"
                  />
                  <button
                    onClick={() => removeDynamicItem('projects', index)}
                    className="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDynamicItem('projects', { title: '', link: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Project
              </button>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Awards" sectionKey="awards" />}
            className="border-t-4 border-[#1A3636]"
            id="awards"
          >
            {expandedSections.awards && <>
              {resumeData.awards.map((award, index) => (
                <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
                  <Input
                    label="Award Name"
                    name="name"
                    value={award.name}
                    onChange={(e) => handleDynamicChange('awards', index, e)}
                  />
                  <Input
                    label="Year"
                    name="year"
                    value={award.year}
                    onChange={(e) => handleDynamicChange('awards', index, e)}
                  />
                  <Textarea
                    label="Description"
                    name="description"
                    value={award.description}
                    onChange={(e) => handleDynamicChange('awards', index, e)}
                    className="mt-4"
                  />
                  <button
                    onClick={() => removeDynamicItem('awards', index)}
                    className="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDynamicItem('awards', { name: '', year: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Award
              </button>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Certifications" sectionKey="certifications" />}
            className="border-t-4 border-[#1A3636]"
            id="certifications"
          >
            {expandedSections.certifications && <>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
                  <Input
                    label="Certification Name"
                    name="name"
                    value={cert.name}
                    onChange={(e) => handleDynamicChange('certifications', index, e)}
                  />
                  <Input
                    label="Issuer"
                    name="issuer"
                    value={cert.issuer}
                    onChange={(e) => handleDynamicChange('certifications', index, e)}
                  />
                  <Input
                    label="Date"
                    name="date"
                    value={cert.date}
                    onChange={(e) => handleDynamicChange('certifications', index, e)}
                  />
                  <button
                    onClick={() => removeDynamicItem('certifications', index)}
                    className="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDynamicItem('certifications', { name: '', issuer: '', date: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Certification
              </button>
            </>}
          </Section>

        </div>

        {/* --- Preview Column --- */}
        <div className="lg:col-span-1 space-y-8">
          <div className="sticky top-8 space-y-8">
            <Section
              title={<h2 className="text-2xl font-bold text-[#1A3636]">LaTeX Preview</h2>}
              className="border-t-4 border-[#1A3636]"
            >
              <div className="mb-6 p-4 bg-[#D6BD98] bg-opacity-20 rounded-lg border border-[#D6BD98]">
                <h3 className="font-bold text-[#1A3636] flex items-center gap-2">
                  <FileText size={18} className="text-[#1A3636]" />
                  RenderCV Template
                </h3>
                <p className="text-sm text-[#40534C] mt-1">
                  Professional two-column LaTeX resume template with modern design
                </p>
              </div>
              <div className="relative bg-[#1A3636] text-gray-200 font-mono text-xs p-4 rounded-lg h-96 overflow-auto border border-[#40534C]">
                <pre className="whitespace-pre-wrap"><code>{generatedLatex.substring(0, 1000)}...</code></pre>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3636] to-transparent pointer-events-none"></div>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#40534C] text-white font-bold rounded-lg shadow hover:bg-[#344741] focus:outline-none transition"
                >
                  {copied ? <Check size={20} /> : <Clipboard size={20} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1A3636] text-white font-bold rounded-lg shadow hover:bg-[#122424] focus:outline-none transition"
                >
                  <Download size={20} /> Download .tex
                </button>
                <button
                  onClick={handleOpenInOverleaf}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#677D6A] text-white font-bold rounded-lg shadow hover:bg-[#5a6d5f] focus:outline-none transition"
                >
                  <FileText size={20} /> Open in Overleaf
                </button>
              </div>
            </Section>

            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-[#1A3636] text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="text-[#D6BD98]" size={24} />
                RenderCV
              </h3>
              <p className="text-[#D6BD98] mt-1">Create professional LaTeX resumes with ease</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-[#D6BD98] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#D6BD98] transition">Terms of Service</a>
              <a href="#" className="hover:text-[#D6BD98] transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-[#40534C] mt-6 pt-6 text-center text-sm text-[#D6BD98]">
            © {new Date().getFullYear()} RenderCV. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enhanced ResumePreview component with new styling
const ResumePreview = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#1A3636]">{data.personal.name}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-[#40534C]">
          {data.personal.location && (
            <span className="flex items-center">
              <MapPin size={14} className="mr-1 text-[#677D6A]" />
              {data.personal.location}
            </span>
          )}
          {data.personal.email && (
            <span className="flex items-center">
              <Mail size={14} className="mr-1 text-[#677D6A]" />
              {data.personal.email}
            </span>
          )}
          {data.personal.phone && (
            <span className="flex items-center">
              <Phone size={14} className="mr-1 text-[#677D6A]" />
              {data.personal.phone}
            </span>
          )}
          {data.personal.website && (
            <span className="flex items-center">
              <LinkIcon size={14} className="mr-1 text-[#677D6A]" />
              <a href={`https://${data.personal.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.website}</a>
            </span>
          )}
          {data.personal.linkedin && (
            <span className="flex items-center">
              <Linkedin size={14} className="mr-1 text-[#677D6A]" />
              <a href={`https://linkedin.com/in/${data.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.linkedin}</a>
            </span>
          )}
          {data.personal.github && (
            <span className="flex items-center">
              <Github size={14} className="mr-1 text-[#677D6A]" />
              <a href={`https://github.com/${data.personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.personal.github}</a>
            </span>
          )}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Enhanced Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#1A3636]">{exp.title}</h3>
                  <p className="text-[#677D6A] italic">{exp.company}</p>
                </div>
                <span className="text-sm text-[#40534C] whitespace-nowrap">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-[#40534C] mt-1">{exp.location}</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Education Section */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#1A3636]">{edu.university}</h3>
                  <p className="text-[#677D6A] italic">{edu.degree}</p>
                </div>
                <span className="text-sm text-[#40534C] whitespace-nowrap">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {edu.gpa && (
                <p className="text-sm mt-1">
                  <span className="font-medium">GPA:</span> {edu.gpa}
                </p>
              )}
              {edu.description && (
                <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Skills Section */}
      {Object.values(data.skills).some(skill => skill) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
            {data.skills.languages && <p><span className="font-medium text-[#1A3636]">Languages:</span> {data.skills.languages}</p>}
            {data.skills.frameworks && <p><span className="font-medium text-[#1A3636]">Frameworks:</span> {data.skills.frameworks}</p>}
            {data.skills.databases && <p><span className="font-medium text-[#1A3636]">Databases:</span> {data.skills.databases}</p>}
            {data.skills.tools && <p><span className="font-medium text-[#1A3636]">Tools:</span> {data.skills.tools}</p>}
          </div>
        </div>
      )}

      {/* Enhanced Projects Section */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[#1A3636]">{proj.title}</h3>
                {proj.link && (
                  <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#677D6A] hover:underline">
                    <LinkIcon size={14} className="inline-block mr-1" />{proj.link}
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Awards Section */}
      {data.awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Awards</h2>
          {data.awards.map((award, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[#1A3636]">{award.name}</h3>
                <span className="text-sm text-[#40534C] whitespace-nowrap">{award.year}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{award.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Certifications Section */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Certifications</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[#1A3636]">{cert.name}</h3>
                <span className="text-sm text-[#40534C] whitespace-nowrap">{cert.date}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">Issuer: {cert.issuer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};