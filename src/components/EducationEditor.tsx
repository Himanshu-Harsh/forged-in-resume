
import React from 'react';
import { Education } from '@/types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface EducationEditorProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

const EducationEditor: React.FC<EducationEditorProps> = ({ education, onUpdate }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onUpdate([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    onUpdate(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onUpdate(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-900">Education</CardTitle>
          <Button onClick={addEducation} className="bg-green-600 hover:bg-green-700">
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900">Education #{index + 1}</h4>
              <Button
                onClick={() => removeEducation(edu.id)}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No education added yet. Click "Add Education" to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationEditor;
