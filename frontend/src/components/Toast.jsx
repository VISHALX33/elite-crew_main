import { toast } from 'react-toastify';

// Custom toast configurations
const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Success toast
export const showSuccess = (message) => {
  toast.success(message, {
    ...toastConfig,
    icon: '✅',
    style: {
      background: '#f0fdf4',
      color: '#166534',
      border: '1px solid #bbf7d0',
    },
  });
};

// Error toast
export const showError = (message) => {
  toast.error(message, {
    ...toastConfig,
    icon: '❌',
    style: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca',
    },
  });
};

// Info toast
export const showInfo = (message) => {
  toast.info(message, {
    ...toastConfig,
    icon: 'ℹ️',
    style: {
      background: '#eff6ff',
      color: '#2563eb',
      border: '1px solid #bfdbfe',
    },
  });
};

// Warning toast
export const showWarning = (message) => {
  toast.warning(message, {
    ...toastConfig,
    icon: '⚠️',
    style: {
      background: '#fffbeb',
      color: '#d97706',
      border: '1px solid #fed7aa',
    },
  });
};

// Payment success toast
export const showPaymentSuccess = (amount) => {
  toast.success(`Payment successful! ₹${amount} has been processed.`, {
    ...toastConfig,
    icon: '💳',
    autoClose: 5000,
    style: {
      background: '#f0fdf4',
      color: '#166534',
      border: '1px solid #bbf7d0',
    },
  });
};

// Order success toast
export const showOrderSuccess = (type) => {
  toast.success(`${type} placed successfully!`, {
    ...toastConfig,
    icon: '🎉',
    autoClose: 4000,
    style: {
      background: '#f0fdf4',
      color: '#166534',
      border: '1px solid #bbf7d0',
    },
  });
};

// Booking success toast
export const showBookingSuccess = () => {
  toast.success('Service booked successfully!', {
    ...toastConfig,
    icon: '📅',
    autoClose: 4000,
    style: {
      background: '#f0fdf4',
      color: '#166534',
      border: '1px solid #bbf7d0',
    },
  });
}; 