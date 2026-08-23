import React from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { exportToCSV } from '../services/exportService';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  minTotalScore, 
  setMinTotalScore,
  shortlistData 
}) => {
  const handleExport = () => {
    if (shortlistData && shortlistData.length > 0) {
      exportToCSV(shortlistData);
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-group search-group">
        <Search size={16} className="input-icon" />
        <input 
          type="text" 
          placeholder="Search students..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group score-group">
        <label htmlFor="minScore" className="filter-label">Min Score:</label>
        <div className="input-wrapper">
          <Filter size={16} className="input-icon" />
          <input 
            id="minScore"
            type="number" 
            placeholder="e.g. 250" 
            value={minTotalScore}
            onChange={(e) => setMinTotalScore(e.target.value)}
            className="score-input"
            min="0"
          />
        </div>
      </div>

      <div className="filter-actions">
        <button 
          className="btn btn-primary export-btn" 
          onClick={handleExport}
          disabled={!shortlistData || shortlistData.length === 0}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
