import React from 'react';
import { MapPin, Mail, Phone, Github, Linkedin, Link as LinkIcon, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import {  ResumePreviewProps } from '../../lib/resumeData';

const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
  // Format date ranges
  const formatDateRange = (start: string, end: string) => {
    if (!start && !end) return '';
    return `${start || ''} – ${end || 'Present'}`;
  };

//   // Calculate total experience
//   const calculateTotalExperience = () => {
//     if (data.experience.length === 0) return null;
    
//     try {
//       const sortedExp = [...data.experience].sort((a, b) => 
//         new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
//       );
      
//       const earliestDate = new Date(sortedExp[0].startDate);
//       const currentDate = new Date();
      
//       const diffInMonths = (currentDate.getFullYear() - earliestDate.getFullYear()) * 12 
//         + (currentDate.getMonth() - earliestDate.getMonth());
      
//       const years = Math.floor(diffInMonths / 12);
//       const months = diffInMonths % 12;
      
//       return `${years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : ''} 
//               ${months > 0 ? `${months} ${months === 1 ? 'month' : 'months'}` : ''}`.trim();
//     } catch {
//       return null;
//     }
//   };

//   const totalExperience = calculateTotalExperience();

  return (
    <div 
      ref={ref} 
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      style={{
        maxWidth: '210mm', // Standard A4 width
        minHeight: '297mm', // Standard A4 height
        margin: '0 auto'
      }}
    >
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1A3636] mb-2">{data.personal.name}</h1>
{/*         
        {data.personal.title && (
          <h2 className="text-xl text-[#677D6A] mb-4">{data.personal.title}</h2>
        )}
        
        {totalExperience && (
          <p className="text-sm text-gray-500 mb-4">
            <Briefcase className="inline-block mr-1" size={14} />
            {totalExperience} of professional experience
          </p>
        )} */}

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-[#40534C]">
          {data.personal.location && (
            <span className="flex items-center">
              <MapPin size={14} className="mr-1.5 text-[#677D6A]" />
              {data.personal.location}
            </span>
          )}
          {data.personal.email && (
            <span className="flex items-center">
              <Mail size={14} className="mr-1.5 text-[#677D6A]" />
              <a href={`mailto:${data.personal.email}`} className="hover:underline">
                {data.personal.email}
              </a>
            </span>
          )}
          {data.personal.phone && (
            <span className="flex items-center">
              <Phone size={14} className="mr-1.5 text-[#677D6A]" />
              <a href={`tel:${data.personal.phone}`} className="hover:underline">
                {data.personal.phone}
              </a>
            </span>
          )}
          {data.personal.website && (
            <span className="flex items-center">
              <LinkIcon size={14} className="mr-1.5 text-[#677D6A]" />
              <a 
                href={data.personal.website.startsWith('http') ? data.personal.website : `https://${data.personal.website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                {data.personal.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {data.personal.linkedin && (
            <span className="flex items-center">
              <Linkedin size={14} className="mr-1.5 text-[#677D6A]" />
              <a 
                href={`https://linkedin.com/in/${data.personal.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                {data.personal.linkedin}
              </a>
            </span>
          )}
          {data.personal.github && (
            <span className="flex items-center">
              <Github size={14} className="mr-1.5 text-[#677D6A]" />
              <a 
                href={`https://github.com/${data.personal.github}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                {data.personal.github}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3636] border-b-2 border-[#D6BD98] pb-1.5 mb-3 flex items-center">
            <Briefcase className="mr-2" size={18} />
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3636] border-b-2 border-[#D6BD98] pb-1.5 mb-3 flex items-center">
            <Briefcase className="mr-2" size={18} />
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <article key={index} className="pl-4 border-l-2 border-[#677D6A]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-lg font-semibold text-[#1A3636]">{exp.title}</h3>
                  <span className="text-sm text-[#40534C] whitespace-nowrap">
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <p className="text-[#677D6A] font-medium">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-[#40534C] flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {exp.location}
                    </p>
                  )}
                </div>
                {exp.description && (
                  <ul className="mt-3 space-y-1.5 pl-5 list-disc text-gray-700">
                    {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                      <li key={i} className="leading-snug">{line}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3636] border-b-2 border-[#D6BD98] pb-1.5 mb-3 flex items-center">
            <GraduationCap className="mr-2" size={18} />
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <article key={index} className="pl-4 border-l-2 border-[#677D6A]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-lg font-semibold text-[#1A3636]">{edu.university}</h3>
                  <span className="text-sm text-[#40534C] whitespace-nowrap">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <p className="text-[#677D6A] font-medium">{edu.degree}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  {edu.gpa && (
                    <p><span className="font-medium">GPA:</span> {edu.gpa}</p>
                  )}
                  {edu.description && (
                    <ul className="pl-5 list-disc">
                      {edu.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

{/* Skills Section */}
{data.skills.length > 0 && (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-[#1A3636] border-b border-[#D6BD98] pb-1 mb-3">Skills</h2>
    <div className="space-y-2">
      {data.skills.map((skillCat, index) => (
        <div key={index} className="pl-4 border-l-2 border-[#677D6A]">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-[#1A3636]">{skillCat.category}:</span> {skillCat.list}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3636] border-b-2 border-[#D6BD98] pb-1.5 mb-3 flex items-center">
            <BookOpen className="mr-2" size={18} />
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((proj, index) => (
              <article key={index} className="pl-4 border-l-2 border-[#677D6A]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-lg font-semibold text-[#1A3636]">{proj.title}</h3>
                  {proj.link && (
                    <a 
                      href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-[#677D6A] hover:underline flex items-center"
                    >
                      <LinkIcon size={14} className="mr-1" />
                      {proj.link.replace(/^https?:\/\//, '').split('/')[0]}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-gray-700 mt-1">{proj.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Awards Section */}
      {data.awards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3636] border-b-2 border-[#D6BD98] pb-1.5 mb-3 flex items-center">
            <Award className="mr-2" size={18} />
            Awards & Honors
          </h2>
          <div className="space-y-4">
            {data.awards.map((award, index) => (
              <article key={index} className="pl-4 border-l-2 border-[#677D6A]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-lg font-semibold text-[#1A3636]">{award.name}</h3>
                  <span className="text-sm text-[#40534C] whitespace-nowrap">
                    {award.year}
                  </span>
                </div>
                <div className="text-gray-700">
                  {award.year && <p className="text-[#677D6A] font-medium">{award.year}</p>}
                  {award.description && <p className="mt-1">{award.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#1A3636] border-b-2 border-[#D6BD98] pb-1.5 mb-3 flex items-center">
            <Award className="mr-2" size={18} />
            Certifications
          </h2>
          <div className="space-y-4">
            {data.certifications.map((cert, index) => (
              <article key={index} className="pl-4 border-l-2 border-[#677D6A]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-lg font-semibold text-[#1A3636]">{cert.name}</h3>
                  <span className="text-sm text-[#40534C] whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>
                <div className="text-gray-700">
                  <p className="text-[#677D6A] font-medium">{cert.issuer}</p>
                  {/* {cert.credentialId && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Credential ID:</span> {cert.credentialId}
                    </p>
                  )} */}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;