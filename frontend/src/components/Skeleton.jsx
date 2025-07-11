import React from 'react';

// Skeleton for product/service cards
export const CardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-md animate-pulse">
    <div className="w-full h-32 bg-gray-300 rounded-md mb-3"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
  </div>
);

// Skeleton for text content
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-3 bg-gray-300 rounded animate-pulse ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

// Skeleton for form inputs
export const InputSkeleton = () => (
  <div className="space-y-4">
    <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
    <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
  </div>
);

// Skeleton for buttons
export const ButtonSkeleton = ({ width = 'w-full' }) => (
  <div className={`h-10 bg-gray-300 rounded animate-pulse ${width}`}></div>
);

// Skeleton for profile/avatar
export const AvatarSkeleton = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-300 rounded-full animate-pulse`}></div>
  );
};

// Skeleton for order/booking items
export const OrderSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow-sm border animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/6"></div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 rounded w-full"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
); 