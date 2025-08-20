import Link from 'next/link';
import React from 'react';

const Button = ({ 
  children, 
  href, 
  onClick, 
  className = '', 
  variant = 'outline', // 'outline' or 'solid'
  size = 'md', // 'sm', 'md', or 'lg'
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Define base styles
  const baseStyles = "inline-flex items-center justify-center rounded-full font-ivy transition-colors focus:outline-none";
  
  // Size variations
  const sizeStyles = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg"
  };
  
  // Variant styles
  const variantStyles = {
    outline: "border border-brand text-brand hover:bg-brand ",
    solid: "bg-brand  hover:bg-brand/90"
  };
  
  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`;
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;