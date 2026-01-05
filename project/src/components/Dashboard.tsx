import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardOverview from './DashboardOverview';
import PatientManagement from './PatientManagement';
import AppointmentManagement from './AppointmentManagement';
import DoctorNotes from './DoctorNotes';
import Prescriptions from './Prescriptions';
import MedicalReports from './MedicalReports';
import Payments from './Payments';
import Settings from './Settings';

export type ViewType =
  | 'dashboard'
  | 'patients'
  | 'appointments'
  | 'notes'
  | 'prescriptions'
  | 'reports'
  | 'payments'
  | 'settings';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { doctor } = useAuth();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'notes':
        return <DoctorNotes />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'reports':
        return <MedicalReports />;
      case 'payments':
        return <Payments />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header doctor={doctor} />

        <main className="p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
