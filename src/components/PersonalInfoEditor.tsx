
import React from 'react';
import { PersonalInfo } from '@/types/resume';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AIEnhanceButton from './AIEnhanceButton';

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
  onUpdate: (personalInfo: PersonalInfo) => void;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ personalInfo, onUpdate }) => {
  const handleFieldChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({
      ...personalInfo,
      [field]: value,
    });
  };

  const handleAIEnhance = (enhancedContent: string) => {
    onUpdate({
      ...personalInfo,
      summary: enhancedContent,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <AIEnhanceButton
              section="summary"
              content={personalInfo.summary}
              onEnhance={handleAIEnhance}
            />
          </div>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => handleFieldChange('summary', e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoEditor;
