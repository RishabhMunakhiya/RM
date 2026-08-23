import React, { useCallback } from 'react';
import { UploadCloud, FileType } from 'lucide-react';

const DatasetUploader = ({ onUpload, status, errorMsg }) => {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  }, [onUpload]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  if (status === 'PROCESSING') {
    return (
      <div className="uploader-container processing">
        <div className="spinner"></div>
        <h3>Processing student dataset...</h3>
        <p className="processing-steps">Parsing CSV • Cleaning records • Validating scores • Preparing shortlist</p>
      </div>
    );
  }

  return (
    <div className="uploader-wrapper">
      <div 
        className="uploader-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadCloud size={48} className="upload-icon" />
        <h3>Drop your student CSV here</h3>
        <p>or</p>
        <label className="browse-btn">
          Browse file
          <input 
            type="file" 
            accept=".csv, text/csv" 
            onChange={handleChange} 
            style={{ display: 'none' }} 
          />
        </label>
        
        {errorMsg && (
          <div className="upload-error">
            <FileType size={16} />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
      
      <div className="upload-instructions">
        <h4>Expected Format:</h4>
        <p>CSV file containing: Name, Gender, Grade, Math, Science, English, Total</p>
      </div>
    </div>
  );
};

export default DatasetUploader;
