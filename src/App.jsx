import React from 'react';
import Navbar from './components/Navbar';
import DatasetUploader from './components/DatasetUploader';
import DataQualitySummary from './components/DataQualitySummary';
import FilterBar from './components/FilterBar';
import StudentTable from './components/StudentTable';
import ShortlistSummary from './components/ShortlistSummary';
import ScoreChart from './components/ScoreChart';
import { useStudentData } from './hooks/useStudentData';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const {
    cleanedData,
    shortlist,
    report,
    status,
    filename,
    errorMsg,
    processFile,
    searchQuery,
    setSearchQuery,
    minTotalScore,
    setMinTotalScore,
    toggleStudentStatus
  } = useStudentData();

  const isLoaded = status === 'READY' && cleanedData.length > 0;

  return (
    <div className="app-container">
      <Navbar status={status} filename={filename} />
      
      <main className="main-content">
        <div className="content-wrapper">
          
          {!isLoaded && status !== 'PROCESSING' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-section"
            >
              <h1>Student Data Pipeline</h1>
              <p className="subtitle">Clean, validate, analyze, and shortlist student records from one workspace.</p>
              
              <DatasetUploader 
                onUpload={processFile} 
                status={status}
                errorMsg={errorMsg}
              />
            </motion.div>
          )}

          {status === 'PROCESSING' && (
            <div className="hero-section">
              <DatasetUploader status={status} />
            </div>
          )}

          <AnimatePresence>
            {isLoaded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="dashboard"
              >
                <DataQualitySummary report={report} />
                
                <div className="filters-section">
                  <FilterBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    minTotalScore={minTotalScore}
                    setMinTotalScore={setMinTotalScore}
                    shortlistData={shortlist}
                  />
                </div>
                
                <div className="data-section">
                  <StudentTable 
                    data={shortlist} 
                    toggleStatus={toggleStudentStatus}
                  />
                </div>

                <div className="insights-section grid-2-col">
                  <ShortlistSummary 
                    shortlist={shortlist} 
                    totalProcessed={cleanedData.length} 
                  />
                  <ScoreChart shortlist={shortlist} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </main>
    </div>
  );
}

export default App;
