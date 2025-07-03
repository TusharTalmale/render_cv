import React from 'react';
import { Input } from './Input';
import { Plus, Trash2 } from 'lucide-react';

export const CertificationsForm = ({ certificationsData, onDynamicChange, addDynamicItem, removeDynamicItem }) => {
  return (
    <>
      {certificationsData.map((cert, index) => (
        <div key={index} className="relative p-6 border-l-4 border-[#677D6A] bg-white rounded-lg shadow-sm mb-6">
          <Input
            label="Certification Name"
            name="name"
            value={cert.name}
            onChange={(e) => onDynamicChange('certifications', index, e)}
          />
          <Input
            label="Issuer"
            name="issuer"
            value={cert.issuer}
            onChange={(e) => onDynamicChange('certifications', index, e)}
          />
          <Input
            label="Date"
            name="date"
            value={cert.date}
            onChange={(e) => onDynamicChange('certifications', index, e)}
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
    </>
  );
};