import { useState, useEffect } from 'react';
import { Users, Calendar, UserPlus, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Appointment, Patient } from '../types';
import PatientChart from './PatientChart';
import AppointmentRequestPanel from './AppointmentRequestPanel';

interface Stats {
  totalPatients: number;
  todaysPatients: number;
  todaysAppointments: number;
  newPatients: number;
  oldPatients: number;
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalPatients: 0,
    todaysPatients: 0,
    todaysAppointments: 0,
    newPatients: 0,
    oldPatients: 0,
  });
  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      const [patientsRes, appointmentsRes, todaysAppointmentsRes] = await Promise.all([
        supabase.from('patients').select('*').eq('doctor_id', user?.id),
        supabase
          .from('appointments')
          .select('*')
          .eq('doctor_id', user?.id)
          .eq('appointment_date', today),
        supabase
          .from('appointments')
          .select('*, patient:patients(*)')
          .eq('doctor_id', user?.id)
          .eq('appointment_date', today)
          .order('appointment_time', { ascending: true }),
      ]);

      if (patientsRes.data) {
        const total = patientsRes.data.length;
        const newCount = patientsRes.data.filter((p) => p.is_new).length;
        const oldCount = total - newCount;

        const todaysPatientsIds = new Set(
          todaysAppointmentsRes.data?.map((a) => a.patient_id) || []
        );

        setStats({
          totalPatients: total,
          todaysPatients: todaysPatientsIds.size,
          todaysAppointments: appointmentsRes.data?.length || 0,
          newPatients: newCount,
          oldPatients: oldCount,
        });
      }

      if (todaysAppointmentsRes.data) {
        setTodaysAppointments(todaysAppointmentsRes.data as Appointment[]);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Patients',
      value: stats.totalPatients,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: "Today's Patients",
      value: stats.todaysPatients,
      icon: <UserPlus className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: "Today's Appointments",
      value: stats.todaysAppointments,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'New Patients',
      value: stats.newPatients,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'ongoing':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PatientChart
            newPatients={stats.newPatients}
            oldPatients={stats.oldPatients}
            totalPatients={stats.totalPatients}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Today's Appointments</h2>
              <span className="text-sm text-gray-600">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {todaysAppointments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                  <p>No appointments scheduled for today</p>
                </div>
              ) : (
                todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.patient?.full_name || 'Unknown Patient'}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.reason || 'General checkup'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.appointment_time}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <AppointmentRequestPanel onUpdate={loadDashboardData} />
    </div>
  );
}
