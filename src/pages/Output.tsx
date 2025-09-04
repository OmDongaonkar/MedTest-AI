import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  ExternalLink,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Output = () => {
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const { toast } = useToast();

  const testCases = [
    {
      id: "TC-001",
      title: "User Authentication Validation",
      priority: "High",
      compliance: ["HIPAA", "FDA 21 CFR Part 11"],
      requirement: "The system shall validate user credentials within 3 seconds",
      steps: [
        "Navigate to login page",
        "Enter valid username and password",
        "Click login button",
        "Measure response time"
      ],
      expectedResult: "User is authenticated successfully within 3 seconds",
      actualResult: "",
      status: "Ready",
      traceability: "REQ-001"
    },
    {
      id: "TC-002", 
      title: "Data Encryption Verification",
      priority: "Critical",
      compliance: ["HIPAA", "SOC 2"],
      requirement: "All patient data must be encrypted at rest using AES-256",
      steps: [
        "Access database storage location",
        "Verify encryption algorithm in use",
        "Attempt to read raw data files",
        "Confirm data is encrypted"
      ],
      expectedResult: "All patient data is encrypted using AES-256 encryption",
      actualResult: "",
      status: "Ready",
      traceability: "REQ-002"
    },
    {
      id: "TC-003",
      title: "Audit Log Generation",
      priority: "Medium",
      compliance: ["HIPAA", "GxP"],
      requirement: "The application must maintain audit logs for all data access",
      steps: [
        "Access patient data through the application",
        "Navigate to audit log section",
        "Verify log entry was created",
        "Check log contains required fields"
      ],
      expectedResult: "Audit log entry is created with timestamp, user ID, and action type",
      actualResult: "",
      status: "Ready",
      traceability: "REQ-003"
    }
  ];

  const complianceMapping = {
    "HIPAA": { color: "bg-blue-100 text-blue-800", count: 3 },
    "FDA 21 CFR Part 11": { color: "bg-purple-100 text-purple-800", count: 1 },
    "SOC 2": { color: "bg-green-100 text-green-800", count: 1 },
    "GxP": { color: "bg-orange-100 text-orange-800", count: 1 }
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export initiated",
      description: `Exporting test cases as ${format}...`,
    });
  };

  const copyTestCase = (testCase: any) => {
    const text = `${testCase.id}: ${testCase.title}\n\nRequirement: ${testCase.requirement}\n\nSteps:\n${testCase.steps.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}\n\nExpected Result: ${testCase.expectedResult}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Test case details copied successfully",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Generated Test Cases</h1>
          <p className="text-xl text-muted-foreground mt-2">
            AI-generated, compliant, and traceable test cases
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => handleExport("PDF")} className="glass-button">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("Excel")} className="glass-button">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button onClick={() => handleExport("JIRA")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Export to JIRA
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4 animate-slide-up">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{testCases.length}</p>
                <p className="text-sm text-muted-foreground">Test Cases</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Coverage</p>
              </div>
              <FileText className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Compliance Standards</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">Ready</p>
                <p className="text-sm text-muted-foreground">Status</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {/* Test Cases List */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>
                Generated from your requirements with full traceability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div
                  key={testCase.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTestCase === index 
                      ? 'border-primary bg-primary/5' 
                      : 'border-glass-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTestCase(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {testCase.id}
                        </Badge>
                        <Badge 
                          variant={testCase.priority === 'Critical' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {testCase.priority}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground">{testCase.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {testCase.requirement}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {testCase.compliance.map((comp) => (
                          <Badge 
                            key={comp} 
                            variant="outline" 
                            className="text-xs bg-primary/10 text-primary border-primary/20"
                          >
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Test Case Details */}
        <div>
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{testCases[selectedTestCase]?.id}</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyTestCase(testCases[selectedTestCase])}
                  className="glass-button"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {testCases[selectedTestCase]?.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass-input">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="trace">Traceability</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Requirement</h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                      {testCases[selectedTestCase]?.requirement}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Test Steps</h4>
                    <ol className="text-sm space-y-2">
                      {testCases[selectedTestCase]?.steps.map((step, i) => (
                        <li key={i} className="flex">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Expected Result</h4>
                    <p className="text-sm text-muted-foreground p-3 bg-primary/5 rounded-lg">
                      {testCases[selectedTestCase]?.expectedResult}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="trace" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Requirement Traceability</h4>
                    <Badge variant="outline" className="mb-4">
                      {testCases[selectedTestCase]?.traceability}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Compliance Standards</h4>
                    <div className="space-y-2">
                      {testCases[selectedTestCase]?.compliance.map((comp) => (
                        <div key={comp} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                          <span className="text-sm font-medium">{comp}</span>
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Output;