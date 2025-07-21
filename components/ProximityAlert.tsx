
import React from 'react';
import { Contact } from '../types';

interface ProximityAlertProps {
  contact: Contact;
  onClose: () => void;
}

const ProximityAlert: React.FC<ProximityAlertProps> = ({ contact, onClose }) => {
  return (
    <div className="w-full max-w-lg p-4 bg-red-500/20 border border-red-500 rounded-lg shadow-lg animate-pulse flex items-center justify-between">
      <div>
        <h4 className="font-bold text-red-400">PROXIMITY ALERT!</h4>
        <p className="text-white">{contact.name} is nearby!</p>
      </div>
      <button onClick={onClose} className="text-sm font-semibold px-3 py-1 bg-red-600/50 hover:bg-red-600 rounded-md transition-colors">
        Dismiss
      </button>
    </div>
  );
};

export default ProximityAlert;
