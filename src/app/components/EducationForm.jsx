import React from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = ({ educationData, onDynamicChange, addDynamicItem, removeDynamicItem }) => {
  return (
    <>
      {educationData.map((edu, index) => (
        <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
          <Input
            label="University/Institution"
            name="university"
            value={edu.university}
            onChange={(e) => onDynamicChange('education', index, e)}
          />
          <Input
            label="Degree/Field of Study"
            name="degree"
            value={edu.degree}
            onChange={(e) => onDynamicChange('education', index, e)}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              name="startDate"
              value={edu.startDate}
              onChange={(e) => onDynamicChange('education', index, e)}
            />
            <Input
              label="End Date"
              name="endDate"
              value={edu.endDate}
              onChange={(e) => onDynamicChange('education', index, e)}
            />
          </div>
          <Input
            label="GPA (Optional)"
            name="gpa"
            value={edu.gpa}
            onChange={(e) => onDynamicChange('education', index, e)}
          />
          <Textarea
            label="Description (e.g., relevant coursework)"
            name="description"
            value={edu.description}
            onChange={(e) => onDynamicChange('education', index, e)}
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
    </>
  );
};