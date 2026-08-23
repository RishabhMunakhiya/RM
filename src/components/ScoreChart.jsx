import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ScoreChart = ({ shortlist }) => {
  const data = useMemo(() => {
    if (!shortlist || shortlist.length === 0) return [];

    // Create bins for Total scores (e.g., 0-50, 51-100, etc.)
    // But since Max Total is typically 300 (Math + Science + English), let's use sensible bins.
    const maxScore = Math.max(...shortlist.map(s => s.Total), 300);
    const minScore = Math.min(...shortlist.map(s => s.Total), 0);
    
    // Determine dynamic bin size
    const range = Math.max(maxScore - minScore, 30); // minimum range
    const numBins = 6;
    const binSize = Math.ceil(range / numBins / 10) * 10; // round to nearest 10
    const startBin = Math.floor(minScore / binSize) * binSize;

    const bins = Array.from({ length: numBins }, (_, i) => ({
      name: `${startBin + i * binSize}-${startBin + (i + 1) * binSize - 1}`,
      count: 0,
      min: startBin + i * binSize,
      max: startBin + (i + 1) * binSize - 1
    }));

    shortlist.forEach(student => {
      for (let i = 0; i < bins.length; i++) {
        if (student.Total >= bins[i].min && student.Total <= bins[i].max) {
          bins[i].count++;
          break;
        }
      }
      // Handle edge case if it exceeds max bin exactly
      if (student.Total > bins[bins.length - 1].max) {
        bins[bins.length - 1].count++;
      }
    });

    return bins.filter(b => b.count > 0 || b.name);
  }, [shortlist]);

  if (data.length === 0) return null;

  return (
    <div className="chart-container">
      <h3 className="section-title">Score Distribution</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #2d313a', borderRadius: '6px' }}
              itemStyle={{ color: '#f3f4f6' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;
