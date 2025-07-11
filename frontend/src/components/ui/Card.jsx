import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  variant = 'default',
  className = '',
  onClick,
  hover = false
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden';
  const variantClasses = {
    default: '',
    elevated: 'shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300',
    interactive: 'cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1'
  };

  const hoverClass = hover ? 'hover:shadow-md transition-all duration-200' : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card; 