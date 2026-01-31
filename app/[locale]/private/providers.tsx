"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function ToastContainer({ items, onDismiss }: { items: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {items.map((toast) => {
        const color = toast.variant === 'error' ? 'bg-red-600' : toast.variant === 'success' ? 'bg-emerald-600' : 'bg-slate-800';
        return (
          <div
            key={toast.id}
            className={`text-white shadow-lg rounded-lg px-4 py-3 w-80 border border-white/10 ${color}`}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                {toast.title && <div className="font-semibold text-sm">{toast.title}</div>}
                {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
              </div>
              <button
                aria-label="Close notification"
                className="text-white/70 hover:text-white text-xs"
                onClick={() => onDismiss(toast.id)}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const next: ToastItem = { id, ...toast };
    setItems((prev) => [...prev, next]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer items={items} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
