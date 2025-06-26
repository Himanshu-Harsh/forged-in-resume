
import { Resume } from '@/types/resume';

export const mockResumeData: Resume = {
  personalInfo: {
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    summary: "Experienced software developer with 5+ years of experience in full-stack development. Passionate about creating efficient and scalable solutions."
  },
  experience: [
    {
      id: "exp-1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "2021-03",
      endDate: "Present",
      description: "Led development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions."
    },
    {
      id: "exp-2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "2019-06",
      endDate: "2021-02",
      description: "Developed and maintained multiple client projects using various technologies including Python, JavaScript, and SQL databases."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      gpa: "3.8"
    }
  ],
  skills: [
    { id: "skill-1", name: "JavaScript", level: "Expert" },
    { id: "skill-2", name: "React", level: "Expert" },
    { id: "skill-3", name: "Node.js", level: "Advanced" },
    { id: "skill-4", name: "Python", level: "Advanced" },
    { id: "skill-5", name: "SQL", level: "Intermediate" }
  ]
};

export const parseUploadedFile = (file: File): Promise<Resume> => {
  return new Promise((resolve) => {
    // Mock parsing process - in real implementation, this would parse PDF/DOCX
    setTimeout(() => {
      console.log(`Parsing uploaded file: ${file.name}`);
      resolve(mockResumeData);
    }, 2000);
  });
};
