import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const typeStyles = {
  success: 'bg-green-600',
  error: 'bg-red-600',
};

/**
 * Toast notification container.
 * Renders a list of toasts fixed to the bottom-right of the viewport.
 *
 * @param {object} props
 * @param {Array}    props.toasts      - Array of { id, message, type }
 * @param {Function} props.removeToast - Callback to dismiss a toast by id
 */
export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${
              typeStyles[toast.type] || typeStyles.success
            }`}
          >
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded p-0.5 transition-colors hover:bg-white/20"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
