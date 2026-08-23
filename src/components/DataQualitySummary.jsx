import React from 'react';
import { Layers, Trash2, Edit3, ShieldAlert, CheckSquare } from 'lucide-react';

const DataQualitySummary = ({ report }) => {
  if (!report) return null;

  return (
    <div className="data-quality-section">
      <h3 className="section-title">Dataset Overview</h3>
      <div className="summary-cards">
        
        <div className="summary-card">
          <div className="card-header">
            <Layers size={16} className="text-muted" />
            <span>Processed</span>
          </div>
          <div className="card-value">{report.totalRows.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Trash2 size={16} className="text-muted" />
            <span>Duplicates Removed</span>
          </div>
          <div className="card-value">{report.duplicatesRemoved.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Edit3 size={16} className="text-muted" />
            <span>Values Cleaned</span>
          </div>
          <div className="card-value">{report.valuesCleaned.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <ShieldAlert size={16} className={report.validationWarnings > 0 ? 'text-warning' : 'text-muted'} />
            <span>Warnings</span>
          </div>
          <div className="card-value">{report.validationWarnings.toLocaleString()}</div>
        </div>

        <div className="summary-card valid-card">
          <div className="card-header">
            <CheckSquare size={16} className="text-success" />
            <span>Valid Records</span>
          </div>
          <div className="card-value text-success">{report.validRecords.toLocaleString()}</div>
        </div>

      </div>
    </div>
  );
};

export default DataQualitySummary;
