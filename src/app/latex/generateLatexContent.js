// src/app/latex/generateLatexContent.js
import { renderCVTemplate } from './templates/renderCVTemplate'; // Import the template

export const generateLatexContent = (data) => {
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

  const formatLink = (url, text) => {
    if (!url) return escapeLatex(text);
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    return `\\href{${escapeLatex(fullUrl)}}{${escapeLatex(text)}}`;
  };

  // --- Dynamic Header Content ---
  let contactInfo = '';
  const contactParts = [];

  if (data.personal.location) {
    contactParts.push(`\\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${escapeLatex(data.personal.location)}}`);
  }
  if (data.personal.email) {
    contactParts.push(`\\mbox{\\hrefWithoutArrow{mailto:${escapeLatex(data.personal.email)}}{\\color{black}{\\footnotesize\\faEnvelope[regular]}\\hspace*{0.13cm}${escapeLatex(data.personal.email)}}}`);
  }
  if (data.personal.phone) {
    contactParts.push(`\\mbox{\\hrefWithoutArrow{tel:${escapeLatex(data.personal.phone)}}{\\color{black}{\\footnotesize\\faPhone*}\\hspace*{0.13cm}${escapeLatex(data.personal.phone)}}}`);
  }
  if (data.personal.website) {
    contactParts.push(`\\mbox{\\hrefWithoutArrow{https://${escapeLatex(data.personal.website)}}{\\color{black}{\\footnotesize\\faLink}\\hspace*{0.13cm}${escapeLatex(data.personal.website)}}}`);
  }
  if (data.personal.linkedin) {
    contactParts.push(`\\mbox{\\hrefWithoutArrow{https://linkedin.com/in/${escapeLatex(data.personal.linkedin)}}{\\color{black}{\\footnotesize\\faLinkedinIn}\\hspace*{0.13cm}${escapeLatex(data.personal.linkedin)}}}`);
  }
  if (data.personal.github) {
    contactParts.push(`\\mbox{\\hrefWithoutArrow{https://github.com/${escapeLatex(data.personal.github)}}{\\color{black}{\\footnotesize\\faGithub}\\hspace*{0.13cm}${escapeLatex(data.personal.github)}}}`);
  }

  contactInfo = contactParts.join('\\kern 0.25 cm\\AND\\kern 0.25 cm');

  // --- Dynamic Sections Content ---
  let sectionsContent = '';

  if (data.summary) {
    sectionsContent += `
    \\section{Summary}
    \\begin{onecolentry}
        ${escapeLatex(data.summary)}
    \\end{onecolentry}
`;
  }

  if (data.education.length > 0) {
    sectionsContent += `
    \\section{Education}
    ${data.education.map(edu => `
        \\begin{twocolentry}{
            ${edu.location ? `\\textit{${escapeLatex(edu.location)}}` : ''}
            \\textit{${escapeLatex(edu.startDate)} -- ${escapeLatex(edu.endDate)}}
        }
            \\textbf{${escapeLatex(edu.university)}}
            \\textit{${escapeLatex(edu.degree)}}
        \\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                ${edu.gpa ? `\\item GPA: ${escapeLatex(edu.gpa)}` : ''}
                ${edu.description ? `\\item ${escapeLatex(edu.description)}` : ''}
            \\end{highlights}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    `).join('\n').trim()}
`;
  }

  if (data.experience.length > 0) {
    sectionsContent += `
    \\section{Experience}
    ${data.experience.map(exp => `
        \\begin{twocolentry}{
            ${exp.location ? `\\textit{${escapeLatex(exp.location)}}` : ''}
            \\textit{${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}}
        }
            \\textbf{${escapeLatex(exp.title)}}
            \\textit{${escapeLatex(exp.company)}}
        \\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                ${exp.description.split('\n').filter(line => line.trim() !== '').map(line => `\\item ${escapeLatex(line.replace(/^[•*-]\s*/, '').trim())}`).join('\n                ')}
            \\end{highlights}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    `).join('\n').trim()}
`;
  }

  if (Object.values(data.skills).some(skill => skill)) {
    sectionsContent += `
    \\section{Skills}
    ${data.skills.languages ? `
        \\begin{onecolentry}
            \\textbf{Languages:} ${escapeLatex(data.skills.languages)}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    ` : ''}
    ${data.skills.frameworks ? `
        \\begin{onecolentry}
            \\textbf{Frameworks:} ${escapeLatex(data.skills.frameworks)}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    ` : ''}
    ${data.skills.databases ? `
        \\begin{onecolentry}
            \\textbf{Databases:} ${escapeLatex(data.skills.databases)}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    ` : ''}
    ${data.skills.tools ? `
        \\begin{onecolentry}
            \\textbf{Tools:} ${escapeLatex(data.skills.tools)}
        \\end{onecolentry}
    ` : ''}
`;
  }

  if (data.projects.length > 0) {
    sectionsContent += `
    \\section{Projects}
    ${data.projects.map(proj => `
        \\begin{twocolentry}{
            ${proj.link ? `\\textit{${formatLink(proj.link, proj.link)}}` : ''}
        }
            \\textbf{${escapeLatex(proj.title)}}
        \\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item ${escapeLatex(proj.description)}
            \\end{highlights}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    `).join('\n').trim()}
`;
  }

  if (data.awards.length > 0) {
    sectionsContent += `
    \\section{Awards}
    ${data.awards.map(award => `
        \\begin{samepage}
            \\begin{twocolentry}{
                ${escapeLatex(award.year)}
            }
                \\textbf{${escapeLatex(award.name)}}
            \\end{twocolentry}

            \\vspace{0.10 cm}

            \\begin{onecolentry}
                \\begin{highlights}
                    \\item ${escapeLatex(award.description)}
                \\end{highlights}
            \\end{onecolentry}
        \\end{samepage}
        \\vspace{0.2 cm}
    `).join('\n').trim()}
`;
  }

  if (data.certifications.length > 0) {
    sectionsContent += `
    \\section{Certifications}
    ${data.certifications.map(cert => `
        \\begin{twocolentry}{
            ${escapeLatex(cert.date)}
        }
            \\textbf{${escapeLatex(cert.name)}}
        \\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item Issuer: ${escapeLatex(cert.issuer)}
            \\end{highlights}
        \\end{onecolentry}
        \\vspace{0.2 cm}
    `).join('\n').trim()}
`;
  }

  // Replace placeholders in the template
  let finalLatex = renderCVTemplate
    .replace('{{{PDF_TITLE}}}', escapeLatex(data.personal.name || 'Resume') + "'s CV")
    .replace('{{{PDF_AUTHOR}}}', escapeLatex(data.personal.name || 'Resume'))
    .replace('{{{FOOTER_TEXT}}}', escapeLatex(data.personal.name || 'John Doe') + ' - Page \\thepage{} of \\pageref*{LastPage}')
    .replace('{{{LAST_UPDATED_DATE}}}', new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }))
    .replace('{{{FULL_NAME}}}', escapeLatex(data.personal.name))
    .replace('{{{CONTACT_INFO}}}', contactInfo)
    .replace('{{SECTIONS_CONTENT}}', sectionsContent);

  return finalLatex;
};