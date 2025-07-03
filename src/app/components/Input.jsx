import React from 'react';

export const Input = ({ label, name, value, onChange, type = "text", icon: Icon }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
      {Icon && Icon}
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#677D6A] focus:border-transparent"
    />
  </div>
);