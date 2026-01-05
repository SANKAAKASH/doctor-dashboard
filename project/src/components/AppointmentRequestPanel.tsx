import { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Appointment } from '../types';

interface AppointmentRequestPanelProps {
  onUpdate: () => void;
}

export default function AppointmentRequestPanel({ onUpdate }: AppointmentRequestPanelProps) {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadRequests();
    }
  }, [user]);

  const loadRequests = async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*, patient:patients(*)')
      .eq('doctor_id', user?.id)
      .eq('is_request', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) {
      setRequests(data as Appointment[]);
    }
  };

  const handleAccept = async (requestId: string) => {
    setLoading(true);
    await supabase
      .from('appointments')
      .update({ is_request: false, status: 'upcoming' })
      .eq('id', requestId);

    await supabase.from('notifications').insert({
      doctor_id: user?.id,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'You have confirmed a new appointment request',
      is_read: false,
    });

    await loadRequests();
    onUpdate();
    setLoading(false);
  };

  const handleReject = async (requestId: string) => {
    setLoading(true);
    await supabase
      .from('appointments')
      .update({ is_request: false, status: 'cancelled' })
      .eq('id', requestId);

    await loadRequests();
    onUpdate();
    setLoading(false);
  };

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">Appointment Requests</h2>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {requests.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {request.patient?.full_name || 'Unknown Patient'}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(request.appointment_date).toLocaleDateString()} at{' '}
                  {request.appointment_time}
                </p>
                <p className="text-xs text-gray-500 mt-1">{request.reason || 'No reason specified'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAccept(request.id)}
                disabled={loading}
                className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50"
                title="Accept"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleReject(request.id)}
                disabled={loading}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors disabled:opacity-50"
                title="Reject"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
