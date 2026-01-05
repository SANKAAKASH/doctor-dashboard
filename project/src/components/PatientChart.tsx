import { useState } from 'react';

interface PatientChartProps {
  newPatients: number;
  oldPatients: number;
  totalPatients: number;
}

export default function PatientChart({ newPatients, oldPatients, totalPatients }: PatientChartProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const newPercentage = totalPatients > 0 ? (newPatients / totalPatients) * 100 : 0;
  const oldPercentage = totalPatients > 0 ? (oldPatients / totalPatients) * 100 : 0;

  const circumference = 2 * Math.PI * 70;
  const newOffset = circumference - (newPercentage / 100) * circumference;
  const oldOffset = circumference - (oldPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Patient Summary</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="20"
            />

            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={newOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
              onMouseEnter={() => setHoveredSection('new')}
              onMouseLeave={() => setHoveredSection(null)}
            />

            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#FCD34D"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={oldOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{
                strokeDashoffset: oldOffset,
                transform: `rotate(${(newPercentage / 100) * 360}deg)`,
                transformOrigin: 'center',
              }}
              onMouseEnter={() => setHoveredSection('old')}
              onMouseLeave={() => setHoveredSection(null)}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
            <p className="text-sm text-gray-600">Total Patients</p>
          </div>
        </div>

        <div className="w-full mt-6 space-y-3">
          <div
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              hoveredSection === 'new' ? 'bg-blue-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-400 rounded-full" />
              <span className="text-sm font-medium text-gray-900">New Patients</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{newPatients}</p>
              <p className="text-xs text-gray-600">{newPercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              hoveredSection === 'old' ? 'bg-yellow-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-300 rounded-full" />
              <span className="text-sm font-medium text-gray-900">Returning Patients</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{oldPatients}</p>
              <p className="text-xs text-gray-600">{oldPercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
