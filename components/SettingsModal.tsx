
import React from 'react';
import { Contact } from '../types';
import { UsersIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  radius: number;
  setRadius: (radius: number) => void;
  contacts: Contact[];
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, radius, setRadius, contacts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-2xl shadow-xl border border-blue-500/20 p-8 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Settings</h2>
        
        <div className="mb-8">
            <label htmlFor="radius" className="block text-sm font-medium text-gray-300 mb-2">Proximity Alert Radius: <span className="font-bold text-cyan-400">{radius}m</span></label>
            <input
                id="radius"
                type="range"
                min="50"
                max="250"
                step="10"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>

        <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center"><UsersIcon className="w-5 h-5 mr-2" /> Monitored Contacts</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                <ul className="divide-y divide-gray-700">
                    {contacts.map(contact => (
                        <li key={contact.id} className="py-2 flex justify-between items-center">
                            <span className="text-gray-200">{contact.name}</span>
                            <span className="text-xs font-mono px-2 py-1 rounded-full bg-gray-700 text-gray-300">{contact.type}</span>
                        </li>
                    ))}
                </ul>
            </div>
             <p className="text-xs text-gray-500 mt-2">Contact list is for demonstration purposes.</p>
        </div>

        <button 
            onClick={onClose} 
            className="w-full mt-4 py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors"
        >
            Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
