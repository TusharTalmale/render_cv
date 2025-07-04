// src/lib/latexGenerator.ts
import { ResumeData, PersonalInfo, EducationEntry, ExperienceEntry, ProjectEntry, AwardEntry, CertificationEntry, SkillCategory } from './resumeData';

/**
 * Generates a LaTeX string from the provided resume data.
 * This function is structured modularly, with helpers for escaping text,
 * formatting lists, and generating each section of the resume.
 * @param data - The resume data object.
 * @returns A string containing the full LaTeX source for the resume.
 */
export const generateLatex = (data: ResumeData): string => {

  // --- HELPER FUNCTIONS ---

  /**
   * Escapes characters that have special meaning in LaTeX.
   * @param text The input string to escape.
   * @returns The escaped string.
   */
  const escapeLatex = (text: string): string => {
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
      .replace(/-/g, '{-}')
      .replace(/\n/g, '\\\\');
  };

  /**
   * Formats a multiline string into a LaTeX itemize list.
   * @param description A string with items separated by newlines.
   * @returns A formatted string for a 'highlights' environment.
   */
  const formatHighlights = (description: string): string => {
    if (!description) return '';
    const items = description
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => `\\item ${escapeLatex(line.replace(/^•\s*/, ''))}`)
      .join('\n');

    return `
\\begin{onecolentry}
  \\begin{highlights}
    ${items}
  \\end{highlights}
\\end{onecolentry}`;
  };

  /**
   * Creates a LaTeX section if the provided content is not empty.
   * @param title The title of the section.
   * @param content The generated content for the section.
   * @returns A formatted LaTeX section string or an empty string.
   */
  const createSection = (title: string, content: string): string => {
    if (!content || content.trim() === '') return '';
    return `\\section{${title}}\n${content}`;
  };


  // --- SECTION GENERATORS ---

  const generateHeader = (personal: PersonalInfo): string => {
    const contactInfo = [
      personal.location && `\\mbox{{\\color{black}\\footnotesize\\faMapMarker*}\\hspace*{0.13cm}${escapeLatex(personal.location)}}`,
      personal.email && `\\mbox{\\hrefWithoutArrow{mailto:${escapeLatex(personal.email)}}{\\color{black}{\\footnotesize\\faEnvelope[regular]}\\hspace*{0.13cm}${escapeLatex(personal.email)}}}`,
      personal.phone && `\\mbox{\\hrefWithoutArrow{tel:${escapeLatex(personal.phone)}}{\\color{black}{\\footnotesize\\faPhone*}\\hspace*{0.13cm}${escapeLatex(personal.phone)}}}`,
      personal.website && `\\mbox{\\href{https://${escapeLatex(personal.website)}}{\\color{black}{\\footnotesize\\faLink}\\hspace*{0.13cm}${escapeLatex(personal.website)}}}`,
      personal.linkedin && `\\mbox{\\href{https://linkedin.com/in/${escapeLatex(personal.linkedin)}}{\\color{black}{\\footnotesize\\faLinkedinIn}\\hspace*{0.13cm}${escapeLatex(personal.linkedin)}}}`,
      personal.github && `\\mbox{\\href{https://github.com/${escapeLatex(personal.github)}}{\\color{black}{\\footnotesize\\faGithub}\\hspace*{0.13cm}${escapeLatex(personal.github)}}}`
    ].filter(Boolean).join('\\kern 0.25cm\\AND\\kern 0.25cm');

    return `
\\begin{header}
  {\\bfseries\\fontsize{24pt}{24pt}\\selectfont ${escapeLatex(personal.name)}}
  \\vspace{0.3cm}
  \\normalsize
  \\begin{center}
    ${contactInfo}
  \\end{center}
\\end{header}`;
  };

  const generateSummary = (summary: string): string => {
    if (!summary) return '';
    return `
\\begin{onecolentry}
  ${escapeLatex(summary)}
\\end{onecolentry}`;
  };

  const generateEducation = (education: EducationEntry[]): string => {
    if (education.length === 0) return '';
    return education.map(edu => {
      const highlights = [
        edu.gpa && `\\item \\textbf{GPA:} ${escapeLatex(edu.gpa)}`,
        edu.description && `\\item ${escapeLatex(edu.description)}`
      ].filter(Boolean).join('\n');

      return `
\\begin{twocolentry}{
  ${escapeLatex(edu.startDate)} – ${escapeLatex(edu.endDate)}
}
  \\textbf{${escapeLatex(edu.university)}}
  \\\\
  \\textit{${escapeLatex(edu.degree)}}
\\end{twocolentry}
${highlights ? `
\\begin{onecolentry}
  \\begin{highlights}
    ${highlights}
  \\end{highlights}
\\end{onecolentry}` : ''}`;
    }).join('\\vspace{0.2cm}\n');
  };

  const generateExperience = (experience: ExperienceEntry[]): string => {
    if (experience.length === 0) return '';
    return experience.map(exp => `
\\begin{twocolentry}{
  ${escapeLatex(exp.location)} \\\\
  ${escapeLatex(exp.startDate)} – ${escapeLatex(exp.endDate)}
}
  \\textbf{${escapeLatex(exp.title)}}
  \\\\
  \\textit{${escapeLatex(exp.company)}}
\\end{twocolentry}
${formatHighlights(exp.description)}`
    ).join('\\vspace{0.2cm}\n');
  };

  const generateProjects = (projects: ProjectEntry[]): string => {
    if (projects.length === 0) return '';
    return projects.map(proj => `
\\begin{twocolentry}{
  ${proj.link ? `\\textit{\\href{https://${escapeLatex(proj.link.replace(/https?:\/\//, ''))}}{${escapeLatex(proj.link)}}}` : ''}
}
  \\textbf{${escapeLatex(proj.title)}}
\\end{twocolentry}
${formatHighlights(proj.description)}`
    ).join('\\vspace{0.2cm}\n');
  };

  const generateAwards = (awards: AwardEntry[]): string => {
    if (awards.length === 0) return '';
    return awards.map(award => `
\\begin{twocolentry}{
  ${escapeLatex(award.year)}
}
  \\textbf{${escapeLatex(award.name)}}
\\end{twocolentry}
${award.description ? formatHighlights(award.description) : ''}`
    ).join('\\vspace{0.2cm}\n');
  };

  const generateCertifications = (certifications: CertificationEntry[]): string => {
    if (certifications.length === 0) return '';
    return certifications.map(cert => `
\\begin{twocolentry}{
  ${escapeLatex(cert.date)}
}
  \\textbf{${escapeLatex(cert.name)}}
  \\\\
  \\textit{${escapeLatex(cert.issuer)}}
\\end{twocolentry}`
    ).join('\\vspace{0.2cm}\n');
  };

  const generateSkills = (skills: SkillCategory[]): string => {
    if (!skills || skills.length === 0) return '';
    const skillRows = skills
      .map(skill => `\\textbf{${escapeLatex(skill.category)}} & ${escapeLatex(skill.list)}`)
      .join('\\\\ \n');
    return `
\\begin{onecolentry}
  \\begin{tabularx}{\\linewidth}{@{}lX@{}}
    ${skillRows}
  \\end{tabularx}
\\end{onecolentry}`;
  };

  // --- DOCUMENT ASSEMBLY ---

  const sections = [
    createSection('Summary', generateSummary(data.summary)),
    createSection('Education', generateEducation(data.education)),
    createSection('Experience', generateExperience(data.experience)),
    createSection('Projects', generateProjects(data.projects)),
    createSection('Skills', generateSkills(data.skills)),
    createSection('Awards', generateAwards(data.awards)),
    createSection('Certifications', generateCertifications(data.certifications)),
  ].filter(Boolean).join('\n\n');

  return `\\documentclass[10pt, letterpaper]{article}

% --- PACKAGES ---
\\usepackage[ignoreheadfoot, top=2cm, bottom=2cm, left=2cm, right=2cm, footskip=1.0cm]{geometry}
\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\definecolor{primaryColor}{RGB}{26, 54, 54}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[pdftitle={${escapeLatex(data.personal.name)}'s CV}, pdfauthor={${escapeLatex(data.personal.name)}}, colorlinks=true, urlcolor=primaryColor]{hyperref}
\\usepackage[pscoord]{eso-pic}
\\usepackage{calc}
\\usepackage{bookmark}
\\usepackage{lastpage}
\\usepackage{changepage}
\\usepackage{paracol}
\\usepackage{ifthen}
\\usepackage{needspace}
\\usepackage{iftex}

% --- FONT & ENCODING ---
\\ifPDFTeX
  \\input{glyphtounicode}
  \\pdfgentounicode=1
  \\usepackage[utf8]{inputenc}
  \\usepackage{lmodern}
\\fi

% --- LAYOUT & FORMATTING ---
\\AtBeginEnvironment{adjustwidth}{\\partopsep0pt}
\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}
\\setlength{\\topskip}{0pt}
\\setlength{\\columnsep}{0cm}

% Section title format
\\titleformat{\\section}{\\needspace{4\\baselineskip}\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule]
\\titlespacing{\\section}{-1pt}{0.3cm}{0.2cm}

% Custom list environment for highlights
\\renewcommand\\labelitemi{\\circ}
\\newenvironment{highlights}{
  \\begin{itemize}[topsep=0.10cm, parsep=0.10cm, partopsep=0pt, itemsep=0pt, leftmargin=0.4cm + 10pt]
}{
  \\end{itemize}
}

% Custom environments for resume entries
\\newenvironment{onecolentry}{
  \\begin{adjustwidth}{0.2cm + 0.00001cm}{0.2cm + 0.00001cm}
}{
  \\end{adjustwidth}
}

\\newenvironment{twocolentry}[2][]{
  \\onecolentry
  \\def\\secondColumn{#2}
  \\setcolumnwidth{\\fill, 4.5cm}
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

% --- HYPERLINK FORMATTING ---
\\let\\hrefWithoutArrow\\href
\\renewcommand{\\href}[2]{\\hrefWithoutArrow{#1}{\\ifthenelse{\\equal{#2}{}}{ }{#2 }\\raisebox{.15ex}{\\footnotesize \\faExternalLink*}}}

% --- DOCUMENT BODY ---
\\begin{document}
  \\newcommand{\\AND}{\\unskip
    \\cleaders\\copy\\ANDbox\\hskip\\wd\\ANDbox
    \\ignorespaces
  }
  \\newsavebox\\ANDbox
  \\sbox\\ANDbox{}

  ${generateHeader(data.personal)}
  \\vspace{0.3cm - 0.3cm}

  ${sections}

\\end{document}`;
};
