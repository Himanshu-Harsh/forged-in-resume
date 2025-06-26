
import React from 'react';
import { Skill } from '@/types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SkillsEditorProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onUpdate }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: '',
      level: 'Intermediate',
    };
    onUpdate([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    onUpdate(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onUpdate(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-900">Skills</CardTitle>
          <Button onClick={addSkill} className="bg-green-600 hover:bg-green-700">
            Add Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50">
            <div className="flex-1">
              <Label className="sr-only">Skill Name</Label>
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                placeholder="Skill name"
              />
            </div>
            <div className="w-40">
              <Select
                value={skill.level}
                onValueChange={(value) => updateSkill(skill.id, 'level', value as Skill['level'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => removeSkill(skill.id)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsEditor;
