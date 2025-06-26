
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Resume } from '@/types/resume';
import { saveResume } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface ResumeActionsProps {
  resume: Resume;
}

const ResumeActions: React.FC<ResumeActionsProps> = ({ resume }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveResume(resume);
      if (result.success) {
        toast({
          title: "Resume saved!",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Unable to save resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `resume_${resume.personalInfo.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Download started!",
      description: "Your resume is being downloaded as a JSON file.",
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
          >
            {isSaving ? 'Saving...' : '💾 Save Resume'}
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 flex-1 sm:flex-none"
          >
            📄 Download JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeActions;
