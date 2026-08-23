import React from 'react';
import { Database, Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Navbar = ({ status, filename }) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'PROCESSING':
        return (
          <div className="status-indicator processing">
            <Activity size={14} className="spin-slow" />
            <span>Processing</span>
          </div>
        );
      case 'READY':
        if (filename) {
          return (
            <div className="status-indicator success">
              <CheckCircle size={14} />
              <span>Pipeline Ready</span>
            </div>
          );
        }
        return (
          <div className="status-indicator waiting">
            <Clock size={14} />
            <span>Awaiting Data</span>
          </div>
        );
      case 'ERROR':
        return (
          <div className="status-indicator error">
            <AlertCircle size={14} />
            <span>Error</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Database size={20} className="logo-icon" />
        <span className="logo-text">Student Data Pipeline</span>
        <span className="badge">Technical Assessment</span>
      </div>
      
      <div className="navbar-controls">
        {filename && <span className="filename-display">{filename}</span>}
        {getStatusDisplay()}
      </div>
    </nav>
  );
};

export default Navbar;
