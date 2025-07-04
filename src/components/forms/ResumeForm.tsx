// src/components/forms/ResumeForm.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Download, Plus, Trash2, Clipboard, Check,  FileText, MapPin, Mail, Phone, Github, Linkedin, Link as LinkIcon, User, Code } from 'lucide-react';

// Import shared interfaces and data
import {
  ResumeData,
  EducationEntry,
  ExperienceEntry,
  SkillCategory,
  ProjectEntry,
  AwardEntry,
  CertificationEntry,
  defaultResumeData,
} from '../../lib/resumeData';
import { generateLatex } from '../../lib/latexGenerator';

// Import UI components
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Section from '../ui/Section';
import Modal from '../ui/Modal';
import SectionTitle from '../ui/SectionTitle';

// Import template components
import ResumePreview from '../templates/ResumePreview';


export default function ResumeForm() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
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
  const [activePreviewTab, setActivePreviewTab] = useState('code'); // 'code' or 'resume'
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const toggleSection = (sectionKey: keyof typeof expandedSections) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionKey]: !prevState[sectionKey]
    }));
  };

  useEffect(() => {
    setGeneratedLatex(generateLatex(resumeData));
  }, [resumeData]);
type ArraySectionKeys = 'education' | 'experience' | 'projects' | 'awards' | 'certifications' | 'skills';
type ArraySectionItem = EducationEntry | ExperienceEntry | SkillCategory | ProjectEntry | AwardEntry | CertificationEntry;

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prevData => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        [name]: value,
      },
    }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prevData => ({
      ...prevData,
      summary: e.target.value,
    }));
  };

  const handleSkillsChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prevData => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [name]: value,
      };
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };


const handleDynamicChange = (
  section: ArraySectionKeys,
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setResumeData(prevData => {
    // Create a mutable copy of the specific section array with a general item type
    let updatedSection: ArraySectionItem[] = [];

    // Use a switch statement to narrow the type of the array based on 'section'
    switch (section) {
      case 'education':
        updatedSection = [...prevData.education];
        (updatedSection[index] as EducationEntry)[name as keyof EducationEntry] = value;
        break;
      case 'experience':
        updatedSection = [...prevData.experience];
        (updatedSection[index] as ExperienceEntry)[name as keyof ExperienceEntry] = value;
        break;
      case 'skills':
        updatedSection = [...prevData.skills];
        (updatedSection[index] as SkillCategory)[name as keyof SkillCategory] = value;
        break;
      case 'projects':
        updatedSection = [...prevData.projects];
        (updatedSection[index] as ProjectEntry)[name as keyof ProjectEntry] = value;
        break;
      case 'awards':
        updatedSection = [...prevData.awards];
        (updatedSection[index] as AwardEntry)[name as keyof AwardEntry] = value;
        break;
      case 'certifications':
        updatedSection = [...prevData.certifications];
        (updatedSection[index] as CertificationEntry)[name as keyof CertificationEntry] = value;
        break;
      default:
        // This case should ideally not be reached if `ArraySectionKeys` is exhaustive.
        console.error(`Unknown section for handleDynamicChange: ${section}`);
        return prevData;
    }

    // Return the new state. TypeScript can now correctly infer the type of `updatedSection`
    // within the switch branches, making `[section]: updatedSection` type-safe.
    return {
      ...prevData,
      [section]: updatedSection as typeof prevData[typeof section], // This cast is the most precise for dynamic keys
    };
  });
};

const addDynamicItem = (section: ArraySectionKeys, newItem: ArraySectionItem) => {
  setResumeData(prevData => {
    let newSectionData: ArraySectionItem[] = []; // Initialize with the union type

    switch (section) {
      case 'education':
        newSectionData = [...prevData.education, newItem as EducationEntry];
        break;
      case 'experience':
        newSectionData = [...prevData.experience, newItem as ExperienceEntry];
        break;
      case 'skills':
        newSectionData = [...prevData.skills, newItem as SkillCategory];
        break;
      case 'projects':
        newSectionData = [...prevData.projects, newItem as ProjectEntry];
        break;
      case 'awards':
        newSectionData = [...prevData.awards, newItem as AwardEntry];
        break;
      case 'certifications':
        newSectionData = [...prevData.certifications, newItem as CertificationEntry];
        break;
      default:
        console.error(`Attempted to add item to unknown section: ${section}`);
        return prevData;
    }

    return {
      ...prevData,
      [section]: newSectionData as typeof prevData[typeof section], // Safely cast to the specific array type of that section
    };
  });
};

const removeDynamicItem = (section: ArraySectionKeys, index: number) => {
  setResumeData(prevData => {
    let currentSectionData: ArraySectionItem[] = []; // Initialize with the union type

    switch (section) {
      case 'education':
        currentSectionData = [...prevData.education];
        break;
      case 'experience':
        currentSectionData = [...prevData.experience];
        break;
      case 'skills':
        currentSectionData = [...prevData.skills];
        break;
      case 'projects':
        currentSectionData = [...prevData.projects];
        break;
      case 'awards':
        currentSectionData = [...prevData.awards];
        break;
      case 'certifications':
        currentSectionData = [...prevData.certifications];
        break;
      default:
        console.error(`Attempted to remove item from unknown section: ${section}`);
        return prevData;
    }

    currentSectionData.splice(index, 1);

    return {
      ...prevData,
      [section]: currentSectionData as typeof prevData[typeof section], // Safely cast to the specific array type of that section
    };
  });
};


  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTex = () => {
    const blob = new Blob([generatedLatex], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'LaTexresumecode.tex';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadPdf = async () => {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

  const handleOpenInOverleaf = () => {
    alert("To open in Overleaf, please copy the LaTeX code and paste it into a new Overleaf project.");
    handleCopy();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-gray-800">
      {/* --- Navigation Bar --- */}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional LaTeX Resume Code Generator</h1>
          <p className="text-xl md:text-2xl text-[#D6BD98] mb-6">Create a polished, ATS-friendly resume in LaTeX format</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownloadTex}
              className="bg-[#D6BD98] hover:bg-[#c5ab7f] text-[#1A3636] font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
            >
              <Download size={20} /> Download .tex Template
            </button>
            <button
              onClick={handleDownloadPdf}
              className="bg-[#D6BD98] hover:bg-[#c5ab7f] text-[#1A3636] font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
            >
              <Download size={20} /> Download as PDF
            </button>
                <button
      onClick={handleDownloadPdf}
      className="bg-[#D6BD98] hover:bg-[#c5ab7f] text-[#1A3636] font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
    >
      <Download size={20} /> Download as PDF
    </button>
          </div>
    
        </div>
      </header>

      <main className='container mx-auto px-12 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>

        {/* --- Form Column (1/2 width on desktop) --- */}
        <div className="lg:col-span-1 space-y-8">
          <Section
            id='personal'
            className='border-t-4 border-[#1A3636]'
            title={<SectionTitle title='Personal Information' sectionKey='personal' toggleSection={toggleSection} expanded={expandedSections.personal} />} >
            {expandedSections.personal &&
              <>
                <Input label='Full Name' name="name" value={resumeData.personal.name} onChange={handlePersonalChange} icon={<User size={18} className='text-[#677D6A]' />} />

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
              </>
            }
          </Section>

          <Section
            title={<SectionTitle title="Summary" sectionKey="summary" toggleSection={toggleSection} expanded={expandedSections.summary} />}
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
            title={<SectionTitle title="Experience" sectionKey="experience" toggleSection={toggleSection} expanded={expandedSections.experience} />}
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
                onClick={() => addDynamicItem('experience', { title: '', company: '', startDate: '', endDate: '', location: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Experience
              </button>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Education" sectionKey="education" toggleSection={toggleSection} expanded={expandedSections.education} />}
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

          {/* Dynamic Skills Section */}
          <Section
            title={<SectionTitle title="Skills" sectionKey="skills" toggleSection={toggleSection} expanded={expandedSections.skills} />}
            className="border-t-4 border-[#1A3636]"
            id="skills"
          >
            {expandedSections.skills && <>
              {resumeData.skills.map((skillCat, index) => (
                <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
                  <Input
                    label="Skill Category Name"
                    name="category"
                    value={skillCat.category}
                    onChange={(e) => handleSkillsChange(index, e)}
                    icon={<Code size={18} className="text-[#677D6A]" />}
                  />
                  <Textarea
                    label="Skills (comma-separated)"
                    name="list"
                    value={skillCat.list}
                    onChange={(e) => handleSkillsChange(index, e)}
                    className="mt-4"
                  />
                  <button
                    onClick={() => removeDynamicItem('skills', index)}
                    className="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addDynamicItem('skills', { category: '', list: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
              >
                <Plus size={18} /> Add Skill Category
              </button>
            </>}
          </Section>

          <Section
            title={<SectionTitle title="Projects" sectionKey="projects" toggleSection={toggleSection} expanded={expandedSections.projects} />}
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
            title={<SectionTitle title="Awards" sectionKey="awards" toggleSection={toggleSection} expanded={expandedSections.awards} />}
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
            title={<SectionTitle title="Certifications" sectionKey="certifications" toggleSection={toggleSection} expanded={expandedSections.certifications} />}
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
        {/* --- Preview Column (1/2 width on desktop) --- */}
        <div className="lg:col-span-1 space-y-8">
          <div className="sticky top-8 space-y-8">
            <Section
              title={<h2 className="text-2xl font-bold text-[#1A3636]">Resume Preview</h2>}
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

              {/* Shiftable / Tab functionality */}
              <div className="flex mb-4 border-b border-gray-200">
                <button
                  onClick={() => setActivePreviewTab('code')}
                  className={`py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-200 ${
                    activePreviewTab === 'code'
                      ? 'border-b-2 border-[#1A3636] text-[#1A3636]'
                      : 'text-gray-500 hover:text-[#40534C]'
                  }`}
                >
                  Live Code
                </button>
                <button
                  onClick={() => setActivePreviewTab('resume')}
                  className={`py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-200 ${
                    activePreviewTab === 'resume'
                      ? 'border-b-2 border-[#1A3636] text-[#1A3636]'
                      : 'text-gray-500 hover:text-[#40534C]'
                  }`}
                >
                  Live Resume
                </button>
              </div>

              {activePreviewTab === 'code' && (
                <div className="relative bg-[#1A3636] text-gray-200 font-mono text-xs p-4 rounded-lg border border-[#40534C] max-h-[600px] overflow-y-auto custom-scrollbar">
                  <pre className="whitespace-pre-wrap"><code>{generatedLatex}</code></pre>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3636] to-transparent pointer-events-none"></div>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#40534C] text-white font-bold rounded-lg shadow hover:bg-[#344741] focus:outline-none transition"
                    >
                      {copied ? <Check size={20} /> : <Clipboard size={20} />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                    <button
                      onClick={handleDownloadTex}
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
                </div>
              )}

              {activePreviewTab === 'resume' && (
                <div className="relative bg-white p-4 rounded-lg border border-gray-200 max-h-[600px] overflow-y-auto custom-scrollbar">
                  <ResumePreview data={resumeData} />
                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1A3636] text-white font-bold rounded-lg shadow hover:bg-[#122424] focus:outline-none transition"
                  >
                    <FileText size={20} /> View Full Resume (Pop-up)
                  </button>
                </div>
              )}
            </Section>
          </div>
        </div>
      </main>
      {/* Resume Preview Modal */}
      <Modal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        title="Live Resume Preview"
      >
        <ResumePreview data={resumeData} ref={resumePreviewRef} />
      </Modal>

      {/* Hidden ResumePreview for PDF generation */}
      {/* This ensures the component is always mounted in the DOM for the ref to work */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <ResumePreview data={resumeData} ref={resumePreviewRef} />
      </div>

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