import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Pill,
  FileStack,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  LogOut,
} from 'lucide-react';
import { ViewType } from './Dashboard';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
  { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
  { id: 'notes', label: 'Doctor Notes', icon: <FileText className="w-5 h-5" /> },
  { id: 'prescriptions', label: 'Prescriptions', icon: <Pill className="w-5 h-5" /> },
  { id: 'reports', label: 'Medical Reports', icon: <FileStack className="w-5 h-5" /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar({ currentView, onViewChange, collapsed, onToggleCollapse }: SidebarProps) {
  const { signOut } = useAuth();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">MediCare</h1>
                  <p className="text-xs text-gray-600">Doctor Portal</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              {item.icon}
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => signOut()}
            className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>

          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
