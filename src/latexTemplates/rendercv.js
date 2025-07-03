// src/latexTemplates/rendercv.js

// Import the raw LaTeX template content
import RENDERCV_TEMPLATE from './rendercv_template.tex?raw'; // Use ?raw to import as string

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

export const generateRenderCVLatex = (data) => {
  const { personal, summary, education, experience, skills, projects, awards, certifications } = data;

  // --- Generate dynamic parts ---

  // Contact Line
  const contactLine = `
      ${personal.location ? `\\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${escapeLatex(personal.location)}}` : ''}%
      ${personal.email ? `\\kern 0.25 cm\\AND\\kern 0.25 cm\\mbox{\\hrefWithoutArrow{mailto:${escapeLatex(personal.email)}}{\\color{black}{\\footnotesize\\faEnvelope[regular]}\\hspace*{0.13cm}${escapeLatex(personal.email)}}}` : ''}%
      ${personal.phone ? `\\kern 0.25 cm\\AND\\kern 0.25 cm\\mbox{\\hrefWithoutArrow{tel:${escapeLatex(personal.phone)}}{\\color{black}{\\footnotesize\\faPhone*}\\hspace*{0.13cm}${escapeLatex(personal.phone)}}}` : ''}%
      ${personal.website ? `\\kern 0.25 cm\\AND\\kern 0.25 cm\\mbox{\\hrefWithoutArrow{https://${escapeLatex(personal.website)}}{\\color{black}{\\footnotesize\\faLink}\\hspace*{0.13cm}${escapeLatex(personal.website)}}}` : ''}%
      ${personal.linkedin ? `\\kern 0.25 cm\\AND\\kern 0.25 cm\\mbox{\\hrefWithoutArrow{https://linkedin.com/in/${escapeLatex(personal.linkedin)}}{\\color{black}{\\footnotesize\\faLinkedinIn}\\hspace*{0.13cm}${escapeLatex(personal.linkedin)}}}` : ''}%
      ${personal.github ? `\\kern 0.25 cm\\AND\\kern 0.25 cm\\mbox{\\hrefWithoutArrow{https://github.com/${escapeLatex(personal.github)}}{\\color{black}{\\footnotesize\\faGithub}\\hspace*{0.13cm}${escapeLatex(personal.github)}}}` : ''}
  `.trim(); // Trim to remove leading/trailing whitespace

  // Summary Section
  const summarySection = summary ? `
    \\section{Summary}
    \\begin{onecolentry}
        ${escapeLatex(summary)}
    \\end{onecolentry}
  ` : '';

  // Education Section
  const educationSection = education.length > 0 ? `
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
                ${edu.gpa ? `\\item \\textbf{GPA:} ${escapeLatex(edu.gpa)}` : ''}
                ${edu.description ? `\\item \\textbf{Coursework:} ${escapeLatex(edu.description)}` : ''}
            \\end{highlights}
        \\end{onecolentry}
        ` : ''}
    `).join('\n')}
  ` : '';

  // Experience Section
  const experienceSection = experience.length > 0 ? `
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
  ` : '';

  // Projects Section
  const projectsSection = projects.length > 0 ? `
    \\section{Projects}
    ${projects.map(proj => `
        \\begin{twocolentry}{
            ${proj.link ? `\\textit{\\href{https://${escapeLatex(proj.link)}}{${escapeLatex(proj.link)}}}` : ''}
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
  ` : '';

  // Awards Section
  const awardsSection = awards.length > 0 ? `
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
  ` : '';

  // Certifications Section
  const certificationsSection = certifications.length > 0 ? `
    \\section{Certifications}
    ${certifications.map(cert => `
        \\begin{twocolentry}{
            ${escapeLatex(cert.date)}
        }
            \\textbf{${escapeLatex(cert.name)}}
            
            \\textit{${escapeLatex(cert.issuer)}}
        \\end{twocolentry}
    `).join('\n')}
  ` : '';

  // Skills Section
  const skillsSection = skills ? `
    \\section{Skills}
    \\begin{onecolentry}
        \\textbf{Technical Skills:} ${escapeLatex(skills)}
    \\end{onecolentry}
  ` : '';

  // Publication Section (Placeholder, as it's in your static file but not in your data structure)
  // You'll need to add a 'publications' array to your resumeData if you want to make this dynamic
  const publicationsSection = `
    \\section{Publications}
    \\begin{samepage}
        \\begin{twocolentry}{
            Jan 2004
        }
            \\textbf{3D Finite Element Analysis of No-Insulation Coils}

            \\vspace{0.10 cm}

            \\mbox{Frodo Baggins}, \\mbox{\\textbf{\\textit{John Doe}}}, \\mbox{Samwise Gamgee}
        \\end{twocolentry}

        \\vspace{0.10 cm}

        \\begin{onecolentry}
            \\href{https://doi.org/10.1109/TASC.2023.3340648}{10.1109/TASC.2023.3340648}
        \\end{onecolentry}
    \\end{samepage}
  `;


  // --- Replace placeholders in the template ---
  let finalLatex = RENDERCV_TEMPLATE;

  finalLatex = finalLatex.replace(/\{\{\{personal\.name\}\}\}/g, escapeLatex(personal.name || ''));
  finalLatex = finalLatex.replace(/\{\{\{contact_line\}\}\}/g, contactLine);
  finalLatex = finalLatex.replace(/\{\{\{summary_section\}\}\}/g, summarySection);
  finalLatex = finalLatex.replace(/\{\{\{education_section\}\}\}/g, educationSection);
  finalLatex = finalLatex.replace(/\{\{\{experience_section\}\}\}/g, experienceSection);
  finalLatex = finalLatex.replace(/\{\{\{projects_section\}\}\}/g, projectsSection);
  finalLatex = finalLatex.replace(/\{\{\{awards_section\}\}\}/g, awardsSection);
  finalLatex = finalLatex.replace(/\{\{\{certifications_section\}\}\}/g, certificationsSection);
  finalLatex = finalLatex.replace(/\{\{\{skills_section\}\}\}/g, skillsSection);
  finalLatex = finalLatex.replace(/\{\{\{publications_section\}\}\}/g, publicationsSection); // Make sure you have a corresponding section in data

  return finalLatex;
};