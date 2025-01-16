import React, { useEffect, useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { courseService } from '../services/courseService';
import { useAuth } from '../hooks/useAuth';
import { CourseCard } from '../components/CourseCard';
import { CourseForm } from '../components/CourseForm';
import type { Course } from '../types';

export function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (courseData: Partial<Course>) => {
    try {
      if (!user) return;
      const data = await courseService.createCourse({
        ...courseData,
        user_id: user.id,
      } as Course);
      if (data) {
        setCourses([data, ...courses]);
        setShowAddForm(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateCourse = async (courseData: Partial<Course>) => {
    try {
      if (!editingCourse) return;
      const data = await courseService.updateCourse(editingCourse.id, courseData);
      if (data) {
        setCourses(courses.map(c => c.id === editingCourse.id ? data : c));
        setEditingCourse(null);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      if (!confirm('Are you sure you want to delete this course?')) return;
      await courseService.deleteCourse(id);
      setCourses(courses.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Course Helper</h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={setEditingCourse}
              onDelete={handleDeleteCourse}
              isOwner={course.user_id === user?.id}
            />
          ))}
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus size={24} />
        </button>

        {showAddForm && (
          <CourseForm
            onSubmit={handleAddCourse}
            onClose={() => setShowAddForm(false)}
            title="Add New Course"
          />
        )}

        {editingCourse && (
          <CourseForm
            onSubmit={handleUpdateCourse}
            onClose={() => setEditingCourse(null)}
            initialData={editingCourse}
            title="Edit Course"
          />
        )}
      </main>
    </div>
  );
}