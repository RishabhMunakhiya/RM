import React, { useMemo } from 'react';
import { Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ShortlistSummary = ({ shortlist, totalProcessed }) => {
  const stats = useMemo(() => {
    if (!shortlist || shortlist.length === 0) {
      return { count: 0, avg: 0, high: 0, low: 0 };
    }
    
    let sum = 0;
    let high = -Infinity;
    let low = Infinity;
    
    shortlist.forEach(student => {
      sum += student.Total;
      if (student.Total > high) high = student.Total;
      if (student.Total < low) low = student.Total;
    });

    return {
      count: shortlist.length,
      avg: Math.round(sum / shortlist.length),
      high,
      low
    };
  }, [shortlist]);

  if (stats.count === 0) return null;

  return (
    <div className="shortlist-summary">
      <h3 className="section-title">Live Shortlist Insights</h3>
      <div className="summary-cards outline-cards">
        
        <div className="summary-card highlight">
          <div className="card-header">
            <Users size={16} className="text-accent" />
            <span>Matched Students</span>
          </div>
          <div className="card-value">
            {stats.count}
            <span className="card-sub-value"> / {totalProcessed}</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <TrendingUp size={16} className="text-muted" />
            <span>Average Total</span>
          </div>
          <div className="card-value">{stats.avg}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <ArrowUpRight size={16} className="text-success" />
            <span>Highest Score</span>
          </div>
          <div className="card-value">{stats.high}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <ArrowDownRight size={16} className="text-error" />
            <span>Lowest Score</span>
          </div>
          <div className="card-value">{stats.low}</div>
        </div>

      </div>
    </div>
  );
};

export default ShortlistSummary;
