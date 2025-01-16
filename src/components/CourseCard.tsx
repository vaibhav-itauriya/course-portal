import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  isOwner: boolean;
}

export function CourseCard({ course, onEdit, onDelete, isOwner }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/courses/${course.id}`}>
        <img 
          src={course.image_url || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60'} 
          alt={course.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/courses/${course.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{course.name}</h2>
        </Link>
        <p className="text-gray-600">Code: {course.code}</p>
        <p className="text-gray-600">Credits: {course.credits}</p>
        <p className="text-gray-700 mt-2 line-clamp-2">{course.description}</p>
        
        {isOwner && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onEdit(course)}
              className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}