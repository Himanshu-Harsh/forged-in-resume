
import React, { useState } from 'react';
import { Resume } from '@/types/resume';
import { mockResumeData, parseUploadedFile } from '@/utils/mockData';
import FileUpload from '@/components/FileUpload';
import PersonalInfoEditor from '@/components/PersonalInfoEditor';
import ExperienceEditor from '@/components/ExperienceEditor';
import EducationEditor from '@/components/EducationEditor';
import SkillsEditor from '@/components/SkillsEditor';
import ResumeActions from '@/components/ResumeActions';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      toast({
        title: "Processing file...",
        description: "Your resume is being parsed. This may take a moment.",
      });
      
      const parsedResume = await parseUploadedFile(file);
      setResume(parsedResume);
      
      toast({
        title: "Resume uploaded successfully!",
        description: "You can now edit your resume below.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Unable to process the uploaded file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartFromScratch = () => {
    setResume({
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
      },
      experience: [],
      education: [],
      skills: [],
    });
    
    toast({
      title: "New resume created!",
      description: "You can now start building your resume from scratch.",
    });
  };

  const updatePersonalInfo = (personalInfo: Resume['personalInfo']) => {
    if (resume) {
      setResume({ ...resume, personalInfo });
    }
  };

  const updateExperience = (experience: Resume['experience']) => {
    if (resume) {
      setResume({ ...resume, experience });
    }
  };

  const updateEducation = (education: Resume['education']) => {
    if (resume) {
      setResume({ ...resume, education });
    }
  };

  const updateSkills = (skills: Resume['skills']) => {
    if (resume) {
      setResume({ ...resume, skills });
    }
  };

  if (!resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Enhanced Resume Forge
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, edit, and enhance your resume with AI-powered assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isUploading} />
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Or start from scratch
                </h3>
                <button
                  onClick={handleStartFromScratch}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create New Resume
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Upload and parse PDF/DOCX files</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Edit all resume sections</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>AI-powered content enhancement</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Save resume to backend</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Download as JSON</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Professional, responsive design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Resume Editor
          </h1>
          <p className="text-gray-600">
            Edit your resume and enhance it with AI assistance
          </p>
        </div>

        <ResumeActions resume={resume} />
        
        <div className="space-y-6">
          <PersonalInfoEditor 
            personalInfo={resume.personalInfo} 
            onUpdate={updatePersonalInfo} 
          />
          <ExperienceEditor 
            experience={resume.experience} 
            onUpdate={updateExperience} 
          />
          <EducationEditor 
            education={resume.education} 
            onUpdate={updateEducation} 
          />
          <SkillsEditor 
            skills={resume.skills} 
            onUpdate={updateSkills} 
          />
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setResume(null)}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
