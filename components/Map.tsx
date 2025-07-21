
import React from 'react';
import { User, Contact } from '../types';
import { UserIcon } from './icons';

interface MapProps {
  user: User;
  contacts: Contact[];
  radius: number;
  mapSize: number;
}

const Map: React.FC<MapProps> = ({ user, contacts, radius, mapSize }) => {
  const getContactColor = (type: Contact['type']) => {
    switch (type) {
      case 'Friend': return 'bg-yellow-400';
      case 'Family': return 'bg-green-400';
      case 'Work': return 'bg-purple-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div 
      className="relative bg-gray-800 border-2 border-blue-500/30 rounded-full shadow-2xl"
      style={{ width: mapSize, height: mapSize, background: 'radial-gradient(circle, #1f2937 0%, #111827 70%)' }}
    >
      {/* Grid Lines */}
      {[...Array(9)].map((_, i) => (
        <React.Fragment key={i}>
            <div className="absolute left-0 w-full h-px bg-blue-500/10" style={{top: `${(i + 1) * 10}%`}}></div>
            <div className="absolute top-0 h-full w-px bg-blue-500/10" style={{left: `${(i + 1) * 10}%`}}></div>
        </React.Fragment>
      ))}
      
      {/* Radar Ping Animation */}
      {radius > 0 && 
        <div 
            className="absolute bg-cyan-400/20 rounded-full animate-ping"
            style={{
                left: user.location.x - radius,
                top: user.location.y - radius,
                width: radius * 2,
                height: radius * 2,
            }}
        />
      }

      {/* Radius Circle */}
      {radius > 0 && 
        <div 
          className="absolute border-2 border-dashed border-cyan-400 rounded-full"
          style={{
            left: user.location.x - radius,
            top: user.location.y - radius,
            width: radius * 2,
            height: radius * 2,
          }}
        />
      }

      {/* User Dot */}
      <div
        className="absolute w-8 h-8 rounded-full flex items-center justify-center bg-cyan-500 shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: user.location.x, top: user.location.y }}
        title={user.name}
      >
        <UserIcon className="w-5 h-5 text-gray-900" />
      </div>

      {/* Contact Dots */}
      {contacts.map(contact => (
        <div
          key={contact.id}
          className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear ${getContactColor(contact.type)}`}
          style={{ left: contact.location.x, top: contact.location.y }}
          title={contact.name}
        />
      ))}
    </div>
  );
};

export default Map;
