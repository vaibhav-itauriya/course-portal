import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { courseService } from '../services/courseService';
import { CourseForm } from '../components/CourseForm';
import { useAuth } from '../hooks/useAuth';
import type { Course } from '../types';

export function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const fetchCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await courseService.getCourseById(courseId);
      if (data) {
        setCourse(data);
      } else {
        setError('Course not found');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (courseData: Partial<Course>) => {
    try {
      if (!course) return;
      const data = await courseService.updateCourse(course.id, courseData);
      if (data) {
        setCourse(data);
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      if (!course || !confirm('Are you sure you want to delete this course?')) return;
      await courseService.deleteCourse(course.id);
      navigate('/courses');
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

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Course not found'}</p>
          <button
            onClick={() => navigate('/courses')}
            className="text-blue-600 hover:underline flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const isOwner = course.user_id === user?.id;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/courses')}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={20} /> Back to Courses
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={course.image_url || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60'}
            alt={course.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
                <p className="text-gray-600">Course Code: {course.code}</p>
                <p className="text-gray-600">Credits: {course.credits}</p>
              </div>
              {isOwner && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={20} /> Edit
                  </button>
                  <button
                    onClick={handleDeleteCourse}
                    className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={20} /> Delete
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-700 mt-4">{course.description}</p>
          </div>
        </div>

        {isEditing && (
          <CourseForm
            onSubmit={handleUpdateCourse}
            onClose={() => setIsEditing(false)}
            initialData={course}
            title="Edit Course"
          />
        )}
      </div>
    </div>
  );
}