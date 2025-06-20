'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onRemove={onRemove} 
        />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const { id, message, type } = toast;
  
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-yellow-600 text-black';
      default:
        return 'bg-gray-800 text-white';
    }
  };
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-5 h-5" />;
      case 'error':
        return <FaTimesCircle className="w-5 h-5" />;
      case 'warning':
        return <FaExclamationTriangle className="w-5 h-5" />;
      default:
        return <FaInfoCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg shadow-lg min-w-[300px] max-w-[400px] animate-slide-in ${getToastStyles()}`}>
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 ml-3 hover:opacity-70 transition-opacity"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
}
