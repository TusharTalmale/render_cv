// src/components/ui/Section.tsx
import React from 'react';

interface SectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "", id }) => {
  return (
    <section id={id} className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      {title}
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
};

export default Section;
