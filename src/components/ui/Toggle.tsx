
interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={() => onChange(!checked)}
          />
          <div className={`block w-10 h-6 rounded-full transition-colors ${
            checked ? 'bg-[#1A3636]' : 'bg-gray-300'
          }`}></div>
          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? 'transform translate-x-4' : ''
          }`}></div>
        </div>
        <div className="ml-3 text-sm font-medium text-gray-700">
          {label}
        </div>
      </label>
    </div>
  );
};

export default Toggle;