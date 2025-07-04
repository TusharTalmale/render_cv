// src/components/ui/SectionTitle.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Define the exact type for section keys that matches ResumeForm.tsx
// It's best to define this in a shared types file if possible,
// but for this specific fix, we can define it here.
type ExpandedSectionKeys = "personal" | "summary" | "education" | "experience" | "skills" | "projects" | "awards" | "certifications";

interface SectionTitleProps {
  title: string;
  sectionKey: ExpandedSectionKeys; // Change type to be specific
  toggleSection: (key: ExpandedSectionKeys) => void; // Change type to be specific
  expanded: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, sectionKey, toggleSection, expanded }) => (
  <h2
    className="text-2xl font-bold text-[#1A3636] cursor-pointer flex justify-between items-center"
    onClick={() => toggleSection(sectionKey)}
  >
    {title}
    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
  </h2>
);

export default SectionTitle;