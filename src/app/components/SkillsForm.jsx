import React from 'react';
import { Input } from './Input';
import { Code, Lightbulb, BookOpen, Link as LinkIcon } from 'lucide-react';

export const SkillsForm = ({ skillsData, onSkillsChange }) => {
  return (
    <>
      <Input
        label="Languages (comma-separated)"
        name="languages"
        value={skillsData.languages}
        onChange={onSkillsChange}
        icon={<Code size={18} className="text-[#677D6A]" />}
      />
      <Input
        label="Frameworks (comma-separated)"
        name="frameworks"
        value={skillsData.frameworks}
        onChange={onSkillsChange}
        icon={<Lightbulb size={18} className="text-[#677D6A]" />}
      />
      <Input
        label="Databases (comma-separated)"
        name="databases"
        value={skillsData.databases}
        onChange={onSkillsChange}
        icon={<BookOpen size={18} className="text-[#677D6A]" />}
      />
      <Input
        label="Tools (comma-separated)"
        name="tools"
        value={skillsData.tools}
        onChange={onSkillsChange}
        icon={<LinkIcon size={18} className="text-[#677D6A]" />}
      />
    </>
  );
};