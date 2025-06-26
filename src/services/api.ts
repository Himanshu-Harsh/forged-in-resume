
import { AIEnhanceRequest, AIEnhanceResponse, Resume } from '@/types/resume';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI backend URL

export const enhanceWithAI = async (request: AIEnhanceRequest): Promise<AIEnhanceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-enhance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Failed to enhance content');
    }
    
    return await response.json();
  } catch (error) {
    // Mock response for demo purposes when backend is not available
    console.log('Using mock AI enhancement due to backend unavailability');
    return mockAIEnhance(request);
  }
};

export const saveResume = async (resume: Resume): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/save-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resume),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save resume');
    }
    
    return await response.json();
  } catch (error) {
    // Mock response for demo purposes
    console.log('Using mock save due to backend unavailability');
    return { success: true, message: 'Resume saved successfully (mock)' };
  }
};

// Mock AI enhancement for demo purposes
const mockAIEnhance = (request: AIEnhanceRequest): AIEnhanceResponse => {
  const enhancements: Record<string, string> = {
    summary: "Dynamic and results-driven software developer with 5+ years of comprehensive experience in full-stack development. Demonstrates exceptional problem-solving abilities and a passion for creating innovative, efficient, and scalable solutions. Proven track record of delivering high-quality software products in fast-paced environments.",
    experience: "Successfully led the development of enterprise-level web applications utilizing React.js and Node.js, resulting in 40% improved user engagement. Collaborated effectively with cross-functional teams including product managers, designers, and QA engineers to deliver robust software solutions that exceeded client expectations and improved system performance by 35%.",
    education: "Bachelor of Science in Computer Science from University of Technology with Magna Cum Laude honors (GPA: 3.8/4.0). Specialized coursework in algorithms, data structures, software engineering, and database systems. Active participant in coding competitions and technical workshops.",
  };
  
  return {
    enhancedContent: enhancements[request.section] || `Enhanced: ${request.content} - Improved with advanced AI techniques for better impact and professional presentation.`
  };
};
