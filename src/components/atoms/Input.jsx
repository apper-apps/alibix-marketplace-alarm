import React, { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  type = 'text',
  placeholder,
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border border-gray-300
    focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder-gray-400
    transition-all duration-200
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${className}
  `;

  const containerClasses = `
    ${fullWidth ? 'w-full' : ''}
    ${containerClassName}
  `;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              size={18} 
              className={`text-gray-400 ${error ? 'text-red-500' : ''}`} 
            />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              size={18} 
              className={`text-gray-400 ${error ? 'text-red-500' : ''}`} 
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;