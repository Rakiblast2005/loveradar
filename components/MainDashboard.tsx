import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Location, Contact, User } from '../types';
import Map from './Map';
import SettingsModal from './SettingsModal';
import ProximityAlert from './ProximityAlert';
import ExcuseGenerator from './ExcuseGenerator';
import { SettingsIcon, WifiOffIcon, ZapIcon } from './icons';

const MAP_SIZE = 500;

// Helper function to calculate distance
const calculateDistance = (loc1: Location, loc2: Location): number => {
  const dx = loc1.x - loc2.x;
  const dy = loc1.y - loc2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const MainDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [user, setUser] = useState<User>({
    id: 'user_me',
    name: 'You',
    location: { x: MAP_SIZE / 2, y: MAP_SIZE / 2 },
  });

  const initialContacts: Contact[] = useMemo(() => [
    { id: 1, name: 'Alice (Friend)', type: 'Friend', location: { x: 50, y: 50 } },
    { id: 2, name: 'Bob (Work)', type: 'Work', location: { x: 450, y: 450 } },
    { id: 3, name: 'Charlie (Family)', type: 'Family', location: { x: 100, y: 400 } },
    { id: 4, name: 'Diana (Friend)', type: 'Friend', location: { x: 400, y: 100 } },
  ], []);

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isDateMode, setIsDateMode] = useState(false);
  const [radius, setRadius] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alertContact, setAlertContact] = useState<Contact | null>(null);

  const moveContact = useCallback((contact: Contact) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 5;
    let newX = contact.location.x + Math.cos(angle) * distance;
    let newY = contact.location.y + Math.sin(angle) * distance;

    // Boundary check to keep them on the map
    newX = Math.max(0, Math.min(MAP_SIZE, newX));
    newY = Math.max(0, Math.min(MAP_SIZE, newY));
    
    return { ...contact, location: { x: newX, y: newY } };
  }, []);

  // Effect for moving contacts when in date mode
  useEffect(() => {
    if (!isDateMode) {
      return;
    }

    const intervalId: number = window.setInterval(() => {
      setContacts(prevContacts => prevContacts.map(moveContact));
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isDateMode, moveContact]);

  // Effect for checking proximity and setting alerts
  useEffect(() => {
    if (!isDateMode) {
        setAlertContact(null);
        return;
    }

    const nearbyContact = contacts.find(
      (c) => calculateDistance(user.location, c.location) < radius
    );
    
    if (nearbyContact) {
        setAlertContact(currentAlertContact => {
            if (!currentAlertContact || currentAlertContact.id !== nearbyContact.id) {
                return nearbyContact;
            }
            return currentAlertContact;
        });
    } else {
        setAlertContact(null);
    }

  }, [isDateMode, contacts, user.location, radius]);


  const toggleDateMode = () => {
    setIsDateMode(prevIsDateMode => {
        const newIsDateMode = !prevIsDateMode;
        if (newIsDateMode) {
           // Reset contacts to initial positions when starting mode
           setContacts(initialContacts);
        }
        return newIsDateMode;
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white overflow-hidden">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
          <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-full bg-gray-800 hover:bg-cyan-500 transition-colors">
              <SettingsIcon className="w-6 h-6" />
          </button>
          <button onClick={onLogout} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            Logout
          </button>
      </div>

      <div className="w-full max-w-lg mx-auto text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Love<span className="text-cyan-400">Radar</span>
        </h1>
        <p className="mt-2 text-gray-400">
            {isDateMode ? "Date Mode is active. We're watching your back." : "Activate Date Mode to start monitoring."}
        </p>
      </div>

      <Map user={user} contacts={contacts} radius={isDateMode ? radius : 0} mapSize={MAP_SIZE} />

      <div className="mt-6 w-full max-w-lg flex flex-col items-center space-y-4">
        <button
          onClick={toggleDateMode}
          className={`w-full max-w-xs px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 ease-in-out flex items-center justify-center space-x-3
          ${isDateMode 
            ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
            : 'bg-cyan-500 hover:bg-cyan-600 text-gray-900 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
          }`}
        >
          {isDateMode ? <WifiOffIcon className="w-6 h-6" /> : <ZapIcon className="w-6 h-6" />}
          <span>{isDateMode ? 'Deactivate Date Mode' : 'Activate Date Mode'}</span>
        </button>
        {alertContact && <ProximityAlert contact={alertContact} onClose={() => setAlertContact(null)} />}
        <div className="w-full pt-4">
            <ExcuseGenerator isVisible={!!alertContact} />
        </div>
      </div>
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        radius={radius}
        setRadius={setRadius}
        contacts={initialContacts}
      />
    </div>
  );
};

export default MainDashboard;