
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Resume } from '@/types/resume';
import { saveResume } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    // Helper function to add text with page break handling
    const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.text(text, 20, yPosition);
      yPosition += lineHeight;
    };

    // Personal Information
    addText(resume.personalInfo.fullName, 18, true);
    if (resume.personalInfo.email) addText(resume.personalInfo.email);
    if (resume.personalInfo.phone) addText(resume.personalInfo.phone);
    if (resume.personalInfo.location) addText(resume.personalInfo.location);
    yPosition += 5;
    
    if (resume.personalInfo.summary) {
      addText('PROFESSIONAL SUMMARY', 14, true);
      const summaryLines = doc.splitTextToSize(resume.personalInfo.summary, 170);
      summaryLines.forEach((line: string) => addText(line));
      yPosition += 5;
    }

    // Experience
    if (resume.experience.length > 0) {
      addText('WORK EXPERIENCE', 14, true);
      resume.experience.forEach((exp) => {
        addText(`${exp.position} at ${exp.company}`, 12, true);
        addText(`${exp.startDate} - ${exp.endDate || 'Present'}`);
        if (exp.description) {
          const descLines = doc.splitTextToSize(exp.description, 170);
          descLines.forEach((line: string) => addText(line));
        }
        yPosition += 3;
      });
      yPosition += 2;
    }

    // Education
    if (resume.education.length > 0) {
      addText('EDUCATION', 14, true);
      resume.education.forEach((edu) => {
        addText(`${edu.degree} in ${edu.field}`, 12, true);
        addText(`${edu.institution} (${edu.endDate})`);
        yPosition += 3;
      });
      yPosition += 2;
    }

    // Skills
    if (resume.skills.length > 0) {
      addText('SKILLS', 14, true);
      const skillsText = resume.skills.map(s => s.name).join(', ');
      const skillsLines = doc.splitTextToSize(skillsText, 170);
      skillsLines.forEach((line: string) => addText(line));
    }

    const fileName = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast({
      title: "PDF downloaded!",
      description: "Your ATS-friendly resume has been downloaded.",
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
            onClick={handleDownloadPDF}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 flex-1 sm:flex-none"
          >
            📄 Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeActions;
