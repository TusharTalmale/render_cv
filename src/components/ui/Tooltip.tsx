import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string | ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'top',
  delay = 300 
}) => {
  const [active, setActive] = useState(false);
  let timeout: NodeJS.Timeout;

  const showTip = () => {
    timeout = setTimeout(() => setActive(true), delay);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`absolute z-50 px-3 py-2 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap ${
          position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
          position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
          position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' :
          'left-full top-1/2 -translate-y-1/2 ml-2'
        }`}>
          {content}
          <div className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
            position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
            position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
            'left-[-4px] top-1/2 -translate-y-1/2'
          }`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;