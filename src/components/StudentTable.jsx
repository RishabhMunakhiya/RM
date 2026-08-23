import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Ban } from 'lucide-react';

const StudentTable = ({ data, toggleStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (data.length === 0) {
    return (
      <div className="table-empty-state">
        <p>No students match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Grade</th>
              <th className="num-col">Math</th>
              <th className="num-col">Science</th>
              <th className="num-col">English</th>
              <th className="num-col highlight-col">Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, idx) => {
              const globalIdx = startIndex + idx;
              const isActive = student.Status === 'Active';
              
              return (
                <tr key={globalIdx} className={!isActive ? 'row-debarred' : ''}>
                  <td className="fw-medium">{student.Name}</td>
                  <td>{student.Gender}</td>
                  <td>{student.Grade}</td>
                  <td className="num-col">{student.Math}</td>
                  <td className="num-col">{student.Science}</td>
                  <td className="num-col">{student.English}</td>
                  <td className="num-col fw-bold">{student.Total}</td>
                  <td>
                    <button 
                      className={`status-toggle ${isActive ? 'active' : 'debarred'}`}
                      onClick={() => toggleStatus(globalIdx, isActive ? 'Debarred' : 'Active')}
                      title={isActive ? 'Mark as Debarred' : 'Mark as Active'}
                    >
                      {isActive ? (
                        <><CheckCircle2 size={14} /> <span>Active</span></>
                      ) : (
                        <><Ban size={14} /> <span>Debarred</span></>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span className="page-info">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, data.length)} of {data.length} students
          </span>
          <div className="page-controls">
            <button 
              className="btn btn-icon" 
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="current-page">Page {safeCurrentPage} of {totalPages}</span>
            <button 
              className="btn btn-icon" 
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
