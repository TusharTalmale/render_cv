import React from 'react';

export const Section = ({ title, children, className = "", id }) => {
  return (
    <section id={id} className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      {title}
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
};