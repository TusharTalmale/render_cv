import React from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Plus, Trash2 } from 'lucide-react';

export const AwardsForm = ({ awardsData, onDynamicChange, addDynamicItem, removeDynamicItem }) => {
  return (
    <>
      {awardsData.map((award, index) => (
        <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
          <Input
            label="Award Name"
            name="name"
            value={award.name}
            onChange={(e) => onDynamicChange('awards', index, e)}
          />
          <Input
            label="Year"
            name="year"
            value={award.year}
            onChange={(e) => onDynamicChange('awards', index, e)}
          />
          <Textarea
            label="Description"
            name="description"
            value={award.description}
            onChange={(e) => onDynamicChange('awards', index, e)}
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
    </>
  );
};