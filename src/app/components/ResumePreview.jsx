import React from 'react';
import { MapPin, Mail, Phone, Github, Linkedin, Link as LinkIcon } from 'lucide-react';

export const ResumePreview = ({ data }) => {
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