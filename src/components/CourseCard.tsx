import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-600">{course.code}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(course)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(course.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Credits:</span> {course.credits}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Timings:</span> {course.timings}
        </p>
        <p className="text-gray-700 line-clamp-2">{course.description}</p>
      </div>
    </div>
  );
}