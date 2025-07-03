import React from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Plus, Trash2 } from 'lucide-react';

export const ExperienceForm = ({ experienceData, onDynamicChange, addDynamicItem, removeDynamicItem }) => {
  return (
    <>
      {experienceData.map((exp, index) => (
        <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              name="title"
              value={exp.title}
              onChange={(e) => onDynamicChange('experience', index, e)}
            />
            <Input
              label="Company"
              name="company"
              value={exp.company}
              onChange={(e) => onDynamicChange('experience', index, e)}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <Input
              label="Start Date"
              name="startDate"
              value={exp.startDate}
              onChange={(e) => onDynamicChange('experience', index, e)}
            />
            <Input
              label="End Date"
              name="endDate"
              value={exp.endDate}
              onChange={(e) => onDynamicChange('experience', index, e)}
            />
            <Input
              label="Location"
              name="location"
              value={exp.location}
              onChange={(e) => onDynamicChange('experience', index, e)}
            />
          </div>
          <Textarea
            label="Description (one bullet per line)"
            name="description"
            value={exp.description}
            onChange={(e) => onDynamicChange('experience', index, e)}
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
        onClick={() => addDynamicItem('experience', { company: '', title: '', startDate: '', endDate: '', location: '', description: '' })}
        className="flex items-center gap-2 px-4 py-2 bg-[#677D6A] text-white rounded-lg hover:bg-[#5a6d5f] transition"
      >
        <Plus size={18} /> Add Experience
      </button>
    </>
  );
};