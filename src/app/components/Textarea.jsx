import React from 'react';

export const Textarea = ({ label, name, value, onChange, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677D6A] focus:border-transparent"
    ></textarea>
  </div>
);