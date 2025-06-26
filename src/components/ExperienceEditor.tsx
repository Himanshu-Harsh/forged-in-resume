
import React from 'react';
import { Experience } from '@/types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import AIEnhanceButton from './AIEnhanceButton';

interface ExperienceEditorProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
}

const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ experience, onUpdate }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onUpdate([...experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    onUpdate(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onUpdate(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleAIEnhance = (id: string, enhancedContent: string) => {
    updateExperience(id, 'description', enhancedContent);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-900">Work Experience</CardTitle>
          <Button onClick={addExperience} className="bg-green-600 hover:bg-green-700">
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900">Experience #{index + 1}</h4>
              <Button
                onClick={() => removeExperience(exp.id)}
                variant="destructive"
                size="sm"
              >
                Remove
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Description</Label>
                <AIEnhanceButton
                  section="experience"
                  content={exp.description}
                  onEnhance={(enhancedContent) => handleAIEnhance(exp.id, enhancedContent)}
                />
              </div>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        ))}
        {experience.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No work experience added yet. Click "Add Experience" to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceEditor;
