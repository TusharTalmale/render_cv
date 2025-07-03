import React from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Plus, Trash2 } from 'lucide-react';

export const ProjectsForm = ({ projectsData, onDynamicChange, addDynamicItem, removeDynamicItem }) => {
  return (
    <>
      {projectsData.map((proj, index) => (
        <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
          <Input
            label="Project Title"
            name="title"
            value={proj.title}
            onChange={(e) => onDynamicChange('projects', index, e)}
          />
          <Input
            label="Project Link (Optional)"
            name="link"
            value={proj.link}
            onChange={(e) => onDynamicChange('projects', index, e)}
          />
          <Textarea
            label="Description"
            name="description"
            value={proj.description}
            onChange={(e) => onDynamicChange('projects', index, e)}
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
    </>
  );
};