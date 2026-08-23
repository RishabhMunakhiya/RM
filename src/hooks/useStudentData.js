import { useState, useMemo, useCallback } from 'react';
import { parseCSV } from '../services/csvParser';
import { cleanAndValidateData } from '../services/dataCleaner';

export const useStudentData = () => {
  const [rawData, setRawData] = useState([]);
  const [cleanedData, setCleanedData] = useState([]);
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('READY'); // READY, PROCESSING, ERROR
  const [filename, setFilename] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [minTotalScore, setMinTotalScore] = useState(''); // Store as string for input, parse to number

  const processFile = async (file) => {
    if (!file) return;
    
    // Check if it's a CSV file
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setStatus('ERROR');
      setErrorMsg('Please upload a valid CSV file.');
      return;
    }

    setStatus('PROCESSING');
    setFilename(file.name);
    setErrorMsg('');

    try {
      // Simulate processing time slightly for UI feedback if processing is too fast
      await new Promise(resolve => setTimeout(resolve, 600));

      const parsed = await parseCSV(file);
      
      if (parsed.errors && parsed.errors.length > 0 && parsed.data.length === 0) {
        throw new Error('Could not parse CSV. Please check the format.');
      }
      
      // Ensure required columns exist
      const requiredColumns = ['Name', 'Gender', 'Grade', 'Math', 'Science', 'English', 'Total'];
      const headers = Object.keys(parsed.data[0] || {});
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
      }

      setRawData(parsed.data);

      // Clean and validate
      const { cleanedData: resultCleaned, report: resultReport } = cleanAndValidateData(parsed.data);
      
      setCleanedData(resultCleaned);
      setReport(resultReport);
      setStatus('READY');
      
    } catch (err) {
      console.error(err);
      setStatus('ERROR');
      setErrorMsg(err.message || 'An error occurred while processing the file.');
      setRawData([]);
      setCleanedData([]);
      setReport(null);
    }
  };

  const toggleStudentStatus = useCallback((indexToToggle, newStatus) => {
    setCleanedData(prev => {
      const newData = [...prev];
      newData[indexToToggle] = { ...newData[indexToToggle], Status: newStatus };
      return newData;
    });
  }, []);

  const resetData = () => {
    setRawData([]);
    setCleanedData([]);
    setReport(null);
    setStatus('READY');
    setFilename('');
    setErrorMsg('');
    setSearchQuery('');
    setMinTotalScore('');
  };

  // Derive Shortlist
  const shortlist = useMemo(() => {
    return cleanedData.filter(student => {
      // 1. Debarred Logic
      if (student.Status !== 'Active') return false;

      // 2. Minimum Total logic
      if (minTotalScore !== '') {
        const minThreshold = Number(minTotalScore);
        if (!isNaN(minThreshold) && student.Total < minThreshold) {
          return false;
        }
      }

      // 3. Search logic
      if (searchQuery.trim() !== '') {
        const q = searchQuery.trim().toLowerCase();
        const matchesName = (student.Name || '').toLowerCase().includes(q);
        const matchesGender = (student.Gender || '').toLowerCase().includes(q);
        const matchesGrade = String(student.Grade || '').toLowerCase().includes(q);
        
        if (!matchesName && !matchesGender && !matchesGrade) {
          return false;
        }
      }

      return true;
    });
  }, [cleanedData, minTotalScore, searchQuery]);

  return {
    rawData,
    cleanedData,
    shortlist,
    report,
    status,
    filename,
    errorMsg,
    processFile,
    resetData,
    searchQuery,
    setSearchQuery,
    minTotalScore,
    setMinTotalScore,
    toggleStudentStatus
  };
};
