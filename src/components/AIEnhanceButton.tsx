
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { enhanceWithAI } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface AIEnhanceButtonProps {
  section: string;
  content: string;
  onEnhance: (enhancedContent: string) => void;
}

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({ section, content, onEnhance }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhance = async () => {
    if (!content.trim()) {
      toast({
        title: "No content to enhance",
        description: "Please add some content before enhancing with AI.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await enhanceWithAI({ section, content });
      onEnhance(response.enhancedContent);
      toast({
        title: "Content enhanced!",
        description: "Your content has been improved using AI.",
      });
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: "Unable to enhance content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnhance}
      disabled={isLoading}
      size="sm"
      className="bg-purple-600 hover:bg-purple-700 text-white"
    >
      {isLoading ? '✨ Enhancing...' : '✨ Enhance with AI'}
    </Button>
  );
};

export default AIEnhanceButton;
