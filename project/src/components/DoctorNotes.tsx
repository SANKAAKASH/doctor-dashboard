import { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DoctorNote, Patient } from '../types';

export default function DoctorNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<DoctorNote[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<DoctorNote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadNotes();
      loadPatients();
    }
  }, [user]);

  const loadNotes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('doctor_notes')
      .select('*, patient:patients(*)')
      .eq('doctor_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setNotes(data as DoctorNote[]);
    }
    setLoading(false);
  };

  const loadPatients = async () => {
    const { data } = await supabase
      .from('patients')
      .select('*')
      .eq('doctor_id', user?.id);

    if (data) {
      setPatients(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingNote) {
      await supabase
        .from('doctor_notes')
        .update({
          content: formData.get('content') as string,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingNote.id);
    } else {
      await supabase.from('doctor_notes').insert({
        doctor_id: user?.id,
        patient_id: formData.get('patient_id') as string,
        content: formData.get('content') as string,
      });
    }

    setShowAddModal(false);
    setEditingNote(null);
    loadNotes();
  };

  const handleDelete = async (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      await supabase.from('doctor_notes').delete().eq('id', noteId);
      loadNotes();
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.patient?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Notes</h1>
          <p className="text-gray-600 mt-1">Manage your patient notes and observations</p>
        </div>
        <button
          onClick={() => {
            setEditingNote(null);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Note
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-3 text-gray-300" />
              <p>No notes found</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{note.patient?.full_name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(note.created_at).toLocaleString()}
                      {note.updated_at !== note.created_at && ' (edited)'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingNote(note);
                        setShowAddModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingNote ? 'Edit Note' : 'Add New Note'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingNote(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {!editingNote && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                  <select
                    name="patient_id"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note Content *</label>
                <textarea
                  name="content"
                  rows={6}
                  required
                  defaultValue={editingNote?.content || ''}
                  placeholder="Enter your notes here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingNote ? 'Update Note' : 'Add Note'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingNote(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
