import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload as UploadIcon, FileText, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [requirements, setRequirements] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const textFiles = files.filter(file => 
      file.type === 'text/plain' || 
      file.name.endsWith('.txt') || 
      file.name.endsWith('.md')
    );

    if (textFiles.length > 0) {
      const file = textFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setRequirements(content);
        toast({
          title: "File uploaded successfully",
          description: `Loaded ${file.name}`,
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a text file (.txt or .md)",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleProcess = async () => {
    if (!requirements.trim()) {
      toast({
        title: "No requirements provided",
        description: "Please enter or upload your requirements first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Processing complete!",
        description: "Your test cases have been generated successfully.",
      });
      navigate("/output");
    }, 3000);
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground">Upload Requirements</h1>
        <p className="text-xl text-muted-foreground">
          Convert your healthcare software requirements into compliant test cases
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Area */}
        <Card className="glass-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UploadIcon className="h-5 w-5 text-primary" />
              <span>Upload Documents</span>
            </CardTitle>
            <CardDescription>
              Drag and drop your requirements document or click to select
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-glass-border hover:border-primary/50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop your files here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports .txt, .md files
                  </p>
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  Choose File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Input */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Manual Input</span>
            </CardTitle>
            <CardDescription>
              Paste your requirements directly into the text area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your healthcare software requirements here...

Example:
- The system shall validate user credentials within 3 seconds
- All patient data must be encrypted at rest using AES-256
- The application must maintain audit logs for all data access
- System must be compliant with HIPAA regulations"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="min-h-[200px] glass-input resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Processing Section */}
      {requirements && (
        <Card className="glass-card animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Ready to Process</h3>
                <p className="text-sm text-muted-foreground">
                  {requirements.length} characters loaded • AI-powered test case generation
                </p>
              </div>
              <Button 
                onClick={handleProcess} 
                disabled={isProcessing}
                className="flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Test Cases</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Preview */}
      <div className="grid gap-4 md:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI analyzes your requirements and generates comprehensive test cases
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Compliant</h3>
            <p className="text-sm text-muted-foreground">
              Ensures all test cases meet healthcare industry standards and regulations
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Traceable</h3>
            <p className="text-sm text-muted-foreground">
              Maintains full traceability from requirements to test cases
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;