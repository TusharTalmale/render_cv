import React, { useState } from 'react';
import { Download, Plus, Trash2, Clipboard, Check, ChevronDown, ChevronUp, FileText } from 'lucide-react';

// Helper function to escape special LaTeX characters
const escapeLatex = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

// --- Enhanced LaTeX Template Function ---
const generateLatexSource = (data, options) => {
  const { personal, summary, education, experience, skills, projects, awards, certifications } = data;
  
  // --- LaTeX Document Structure ---
  return `
\\documentclass[10pt, letterpaper]{article}

% Packages:
\\usepackage[
    ignoreheadfoot,
    top=2 cm,
    bottom=2 cm,
    left=2 cm,
    right=2 cm,
    footskip=1.0 cm,
]{geometry}
\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\definecolor{primaryColor}{RGB}{0, 79, 144}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[
    pdftitle={${escapeLatex(personal.name)}'s CV},
    pdfauthor={${escapeLatex(personal.name)}},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref}
\\usepackage[pscoord]{eso-pic}
\\usepackage{calc}
\\usepackage{bookmark}
\\usepackage{lastpage}
\\usepackage{changepage}
\\usepackage{paracol}
\\usepackage{ifthen}
\\usepackage{needspace}
\\usepackage{iftex}

% Ensure PDF is machine readable/ATS parsable:
\\ifPDFTeX
    \\input{glyphtounicode}
    \\pdfgentounicode=1
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
\\fi

% Settings:
\\AtBeginEnvironment{adjustwidth}{\\partopsep0pt}
\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}
\\setlength{\\topskip}{0pt}
\\setlength{\\columnsep}{0cm}
\\makeatletter
\\let\\ps@customFooterStyle\\ps@plain
\\patchcmd{\\ps@customFooterStyle}{\\thepage}{
    \\color{gray}\\textit{\\small ${escapeLatex(personal.name)} - Page \\thepage{} of \\pageref*{LastPage}}
}{}{}
\\makeatother
\\pagestyle{customFooterStyle}

\\titleformat{\\section}{\\needspace{4\\baselineskip}\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule]

\\titlespacing{\\section}{
    -1pt
}{
    0.3 cm
}{
    0.2 cm
}

\\renewcommand\\labelitemi{\\$\\circ$}
\\newenvironment{highlights}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=0.4 cm + 10pt
    ]
}{
    \\end{itemize}
}

\\newenvironment{highlightsforbulletentries}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=10pt
    ]
}{
    \\end{itemize}
}

\\newenvironment{onecolentry}{
    \\begin{adjustwidth}{
        0.2 cm + 0.00001 cm
    }{
        0.2 cm + 0.00001 cm
    }
}{
    \\end{adjustwidth}
}

\\newenvironment{twocolentry}[2][]{
    \\onecolentry
    \\def\\secondColumn{#2}
    \\setcolumnwidth{\\fill, 4.5 cm}
    \\begin{paracol}{2}
}{
    \\switchcolumn \\raggedleft \\secondColumn
    \\end{paracol}
    \\endonecolentry
}

\\newenvironment{header}{
    \\setlength{\\topsep}{0pt}\\par\\kern\\topsep\\centering\\linespread{1.5}
}{
    \\par\\kern\\topsep
}

\\newcommand{\\placelastupdatedtext}{%
  \\AddToShipoutPictureFG*{%
    \\put(
        \\LenToUnit{\\paperwidth-2 cm-0.2 cm+0.05cm},
        \\LenToUnit{\\paperheight-1.0 cm}
    ){\\vtop{{\\null}\\makebox[0pt][c]{
        \\small\\color{gray}\\textit{Last updated on \\today}
    }}}%
  }%
}

\\let\\hrefWithoutArrow\\href
\\renewcommand{\\href}[2]{\\hrefWithoutArrow{#1}{\\ifthenelse{\\equal{#2}{}}{ }{#2 }\\raisebox{.15ex}{\\footnotesize \\faExternalLink*}}}

\\begin{document}
    \\newcommand{\\AND}{\\unskip
        \\cleaders\\copy\\ANDbox\\hskip\\wd\\ANDbox
        \\ignorespaces
    }
    \\newsavebox\\ANDbox
    \\sbox\\ANDbox{}

    \\placelastupdatedtext
    \\begin{header}
        \\textbf{\\fontsize{24 pt}{24 pt}\\selectfont ${escapeLatex(personal.name)}}

        \\vspace{0.3 cm}

        \\normalsize
        \\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${escapeLatex(personal.location)}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{mailto:${escapeLatex(personal.email)}}{\\color{black}{\\footnotesize\\faEnvelope[regular]}\\hspace*{0.13cm}${escapeLatex(personal.email)}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{tel:${escapeLatex(personal.phone)}}{\\color{black}{\\footnotesize\\faPhone*}\\hspace*{0.13cm}${escapeLatex(personal.phone)}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{https://${escapeLatex(personal.website)}}{\\color{black}{\\footnotesize\\faLink}\\hspace*{0.13cm}${escapeLatex(personal.website)}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{https://linkedin.com/in/${escapeLatex(personal.linkedin)}}{\\color{black}{\\footnotesize\\faLinkedinIn}\\hspace*{0.13cm}${escapeLatex(personal.linkedin)}}}%
        \\kern 0.25 cm%
        \\AND%
        \\kern 0.25 cm%
        \\mbox{\\hrefWithoutArrow{https://github.com/${escapeLatex(personal.github)}}{\\color{black}{\\footnotesize\\faGithub}\\hspace*{0.13cm}${escapeLatex(personal.github)}}}%
    \\end{header}

    \\vspace{0.3 cm - 0.3 cm}

    ${summary ? `
    \\section{Summary}
    \\begin{onecolentry}
        ${escapeLatex(summary)}
    \\end{onecolentry}
    ` : ''}

    ${education.length > 0 ? `
    \\section{Education}
    ${education.map(edu => `
        \\begin{twocolentry}{
            ${escapeLatex(edu.startDate)} – ${escapeLatex(edu.endDate)}
        }
            \\textbf{${escapeLatex(edu.university)}}
            
            \\textit{${escapeLatex(edu.degree)}}
        \\end{twocolentry}
        
        ${edu.description || edu.gpa ? `
        \\begin{onecolentry}
            \\begin{highlights}
                ${edu.gpa ? `\\item GPA: ${escapeLatex(edu.gpa)}` : ''}
                ${edu.description ? `\\item ${escapeLatex(edu.description)}` : ''}
            \\end{highlights}
        \\end{onecolentry}
        ` : ''}
    `).join('\n')}
    ` : ''}

    ${experience.length > 0 ? `
    \\section{Experience}
    ${experience.map(exp => `
        \\begin{twocolentry}{
            ${escapeLatex(exp.location)}
            
            ${escapeLatex(exp.startDate)} – ${escapeLatex(exp.endDate)}
        }
            \\textbf{${escapeLatex(exp.title)}}
            
            \\textit{${escapeLatex(exp.company)}}
        \\end{twocolentry}
        
        \\begin{onecolentry}
            \\begin{highlights}
                ${exp.description.split('\n').filter(line => line.trim() !== '').map(line => `\\item ${escapeLatex(line)}`).join('\n')}
            \\end{highlights}
        \\end{onecolentry}
    `).join('\n')}
    ` : ''}

    ${projects.length > 0 ? `
    \\section{Projects}
    ${projects.map(proj => `
        \\begin{twocolentry}{
            
            
            ${proj.link ? `\\textit{\\href{${escapeLatex(proj.link)}}{${escapeLatex(proj.link)}}` : ''}
        }
            \\textbf{${escapeLatex(proj.name)}}
        \\end{twocolentry}
        
        \\begin{onecolentry}
            \\begin{highlights}
                ${proj.description.split('\n').filter(line => line.trim() !== '').map(line => `\\item ${escapeLatex(line)}`).join('\n')}
                ${proj.technologies ? `\\item \\textbf{Tools Used:} ${escapeLatex(proj.technologies)}` : ''}
            \\end{highlights}
        \\end{onecolentry}
    `).join('\n')}
    ` : ''}

    ${awards.length > 0 ? `
    \\section{Awards}
    ${awards.map(award => `
        \\begin{twocolentry}{
            ${escapeLatex(award.date)}
        }
            \\textbf{${escapeLatex(award.title)}}
            
            \\textit{${escapeLatex(award.issuer)}}
        \\end{twocolentry}
        
        ${award.description ? `
        \\begin{onecolentry}
            \\begin{highlights}
                \\item ${escapeLatex(award.description)}
            \\end{highlights}
        \\end{onecolentry}
        ` : ''}
    `).join('\n')}
    ` : ''}

    ${certifications.length > 0 ? `
    \\section{Certifications}
    ${certifications.map(cert => `
        \\begin{twocolentry}{
            ${escapeLatex(cert.date)}
        }
            \\textbf{${escapeLatex(cert.name)}}
            
            \\textit{${escapeLatex(cert.issuer)}}
        \\end{twocolentry}
    `).join('\n')}
    ` : ''}

    ${skills ? `
    \\section{Skills}
    \\begin{onecolentry}
        \\textbf{Technical Skills:} ${escapeLatex(skills)}
    \\end{onecolentry}
    ` : ''}

\\end{document}
  `;
};

// --- React Components ---

const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
    <div className="border-b-2 border-blue-500 pb-2 mb-4">{title}</div>
    {children}
  </div>
);

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
    </div>
);

export default function App() {
  const [resumeData, setResumeData] = useState({
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
      description: 'Developed a new feature for the main product.\nFixed bugs and improved application performance by 15%.\nCollaborated with cross-functional teams to deliver features on time.' 
    }],
    projects: [{ 
      name: 'Personal Portfolio Website', 
      technologies: 'React, Tailwind CSS, Spring Boot', 
      link: 'github.com/johndoe/portfolio',
      description: 'Developed a personal portfolio website to showcase my projects and skills.\nImplemented responsive design for mobile and desktop users.' 
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
  });
  
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personal: true, education: true, experience: true, projects: true, skills: true, awards: true, certifications: true, summary: true
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };
  
  const handleSummaryChange = (e) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleSkillsChange = (e) => {
      setResumeData(prev => ({ ...prev, skills: e.target.value }));
  };

  const handleDynamicChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedSection = [...resumeData[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value };
    setResumeData(prev => ({ ...prev, [section]: updatedSection }));
  };
  
  const addDynamicItem = (section, itemTemplate) => {
      setResumeData(prev => ({ ...prev, [section]: [...prev[section], itemTemplate] }));
  };
  
  const removeDynamicItem = (section, index) => {
      setResumeData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const generatedLatex = generateLatexSource(resumeData);

  const handleDownload = () => {
    const blob = new Blob([generatedLatex], { type: 'text/x-latex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = generatedLatex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const SectionTitle = ({ title, sectionKey }) => (
    <h2 className="text-2xl font-bold text-gray-800 flex justify-between items-center">
        <span>{title}</span>
        <button onClick={() => toggleSection(sectionKey)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
            {expandedSections[sectionKey] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
    </h2>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
              <h1 className="text-3xl font-bold text-gray-900">RenderCV LaTeX Resume Generator</h1>
              <p className="text-gray-600 mt-1">Customize and download your professional `.tex` file.</p>
          </div>
      </header>

      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Form Column --- */}
        <div className="lg:col-span-2">
          <Section title={<SectionTitle title="Personal Information" sectionKey="personal" />}>
            {expandedSections.personal && <>
              <Input label="Full Name" name="name" value={resumeData.personal.name} onChange={handlePersonalChange} />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Email" name="email" value={resumeData.personal.email} onChange={handlePersonalChange} />
                <Input label="Phone" name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} />
              </div>
              <Input label="Location" name="location" value={resumeData.personal.location} onChange={handlePersonalChange} />
              <Input label="Website" name="website" value={resumeData.personal.website} onChange={handlePersonalChange} />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="LinkedIn Username" name="linkedin" value={resumeData.personal.linkedin} onChange={handlePersonalChange} />
                <Input label="GitHub Username" name="github" value={resumeData.personal.github} onChange={handlePersonalChange} />
              </div>
            </>}
          </Section>

          <Section title={<SectionTitle title="Professional Summary" sectionKey="summary" />}>
            {expandedSections.summary && <Textarea label="Summary" name="summary" value={resumeData.summary} onChange={handleSummaryChange} rows={4} />}
          </Section>

          <Section title={<SectionTitle title="Education" sectionKey="education" />}>
            {expandedSections.education && <>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="relative p-4 border border-gray-200 rounded-lg mb-4">
                  <Input label="University" name="university" value={edu.university} onChange={(e) => handleDynamicChange('education', index, e)} />
                  <Input label="Degree" name="degree" value={edu.degree} onChange={(e) => handleDynamicChange('education', index, e)} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Start Date" name="startDate" value={edu.startDate} onChange={(e) => handleDynamicChange('education', index, e)} />
                    <Input label="End Date" name="endDate" value={edu.endDate} onChange={(e) => handleDynamicChange('education', index, e)} />
                  </div>
                  <Input label="GPA" name="gpa" value={edu.gpa} onChange={(e) => handleDynamicChange('education', index, e)} />
                  <Textarea label="Description/Coursework" name="description" value={edu.description} onChange={(e) => handleDynamicChange('education', index, e)} rows={2} />
                  <button onClick={() => removeDynamicItem('education', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              ))}
              <button onClick={() => addDynamicItem('education', { university: '', degree: '', startDate: '', endDate: '', gpa: '', description: ''})} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"><Plus size={18} /> Add Education</button>
            </>}
          </Section>
          
          <Section title={<SectionTitle title="Experience" sectionKey="experience" />}>
            {expandedSections.experience && <>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="relative p-4 border border-gray-200 rounded-lg mb-4">
                  <Input label="Job Title" name="title" value={exp.title} onChange={(e) => handleDynamicChange('experience', index, e)} />
                  <Input label="Company" name="company" value={exp.company} onChange={(e) => handleDynamicChange('experience', index, e)} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => handleDynamicChange('experience', index, e)} />
                    <Input label="End Date" name="endDate" value={exp.endDate} onChange={(e) => handleDynamicChange('experience', index, e)} />
                  </div>
                  <Input label="Location" name="location" value={exp.location} onChange={(e) => handleDynamicChange('experience', index, e)} />
                  <Textarea label="Description (one bullet per line)" name="description" value={exp.description} onChange={(e) => handleDynamicChange('experience', index, e)} />
                  <button onClick={() => removeDynamicItem('experience', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              ))}
              <button onClick={() => addDynamicItem('experience', { company: '', title: '', startDate: '', endDate: '', location: '', description: ''})} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"><Plus size={18} /> Add Experience</button>
            </>}
          </Section>

          <Section title={<SectionTitle title="Projects" sectionKey="projects" />}>
            {expandedSections.projects && <>
              {resumeData.projects.map((proj, index) => (
                <div key={index} className="relative p-4 border border-gray-200 rounded-lg mb-4">
                  <Input label="Project Name" name="name" value={proj.name} onChange={(e) => handleDynamicChange('projects', index, e)} />
                  <Input label="Technologies Used" name="technologies" value={proj.technologies} onChange={(e) => handleDynamicChange('projects', index, e)} />
                  <Input label="Project Link" name="link" value={proj.link} onChange={(e) => handleDynamicChange('projects', index, e)} />
                  <Textarea label="Description (one bullet per line)" name="description" value={proj.description} onChange={(e) => handleDynamicChange('projects', index, e)} rows={2} />
                  <button onClick={() => removeDynamicItem('projects', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              ))}
              <button onClick={() => addDynamicItem('projects', { name: '', technologies: '', link: '', description: ''})} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"><Plus size={18} /> Add Project</button>
            </>}
          </Section>

          <Section title={<SectionTitle title="Awards & Honors" sectionKey="awards" />}>
            {expandedSections.awards && <>
              {resumeData.awards.map((award, index) => (
                <div key={index} className="relative p-4 border border-gray-200 rounded-lg mb-4">
                  <Input label="Award Title" name="title" value={award.title} onChange={(e) => handleDynamicChange('awards', index, e)} />
                  <Input label="Issuing Organization" name="issuer" value={award.issuer} onChange={(e) => handleDynamicChange('awards', index, e)} />
                  <Input label="Date" name="date" value={award.date} onChange={(e) => handleDynamicChange('awards', index, e)} />
                  <Textarea label="Description" name="description" value={award.description} onChange={(e) => handleDynamicChange('awards', index, e)} rows={2} />
                  <button onClick={() => removeDynamicItem('awards', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              ))}
              <button onClick={() => addDynamicItem('awards', { title: '', issuer: '', date: '', description: '' })} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"><Plus size={18} /> Add Award</button>
            </>}
          </Section>

          <Section title={<SectionTitle title="Certifications" sectionKey="certifications" />}>
            {expandedSections.certifications && <>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="relative p-4 border border-gray-200 rounded-lg mb-4">
                  <Input label="Certification Name" name="name" value={cert.name} onChange={(e) => handleDynamicChange('certifications', index, e)} />
                  <Input label="Issuing Organization" name="issuer" value={cert.issuer} onChange={(e) => handleDynamicChange('certifications', index, e)} />
                  <Input label="Date" name="date" value={cert.date} onChange={(e) => handleDynamicChange('certifications', index, e)} />
                  <button onClick={() => removeDynamicItem('certifications', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              ))}
              <button onClick={() => addDynamicItem('certifications', { name: '', issuer: '', date: '' })} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"><Plus size={18} /> Add Certification</button>
            </>}
          </Section>

          <Section title={<SectionTitle title="Technical Skills" sectionKey="skills" />}>
            {expandedSections.skills && <Textarea label="Skills (comma separated)" name="skills" value={resumeData.skills} onChange={handleSkillsChange} rows={4}/>}
          </Section>
        </div>

        {/* --- Preview Column --- */}
        <div className="lg:col-span-1">
            <div className="sticky top-24">
                 <Section title={<h2 className="text-2xl font-bold text-gray-800">LaTeX Preview & Download</h2>}>
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2"><FileText size={18} /> RenderCV Template</h3>
                        <p className="text-sm text-blue-700 mt-1">
                            Professional two-column LaTeX resume template
                        </p>
                    </div>
                    <div className="relative bg-gray-800 text-white font-mono text-xs p-4 rounded-lg h-[calc(100vh-400px)] overflow-auto border border-gray-700">
                        <pre><code>{generatedLatex}</code></pre>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform hover:scale-105">
                            {copied ? <Check size={20} /> : <Clipboard size={20} />} {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                        <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                            <Download size={20} /> Download .tex
                        </button>
                    </div>
                 </Section>
            </div>
        </div>
      </main>
    </div>
  );
}   