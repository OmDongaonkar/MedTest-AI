import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Building, 
  Calendar, 
  FileText, 
  Download,
  Settings,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const userInfo = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@healthtech.com",
    company: "HealthTech Solutions",
    role: "Quality Assurance Lead",
    joinDate: "March 2024",
    avatar: ""
  };

  const recentProjects = [
    {
      id: "P-001",
      name: "Patient Management System",
      date: "2024-01-15",
      testCases: 12,
      status: "Completed"
    },
    {
      id: "P-002", 
      name: "EHR Integration Module",
      date: "2024-01-10",
      testCases: 8,
      status: "In Progress"
    },
    {
      id: "P-003",
      name: "Billing System Validation",
      date: "2024-01-05",
      testCases: 15,
      status: "Completed"
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground">Profile</h1>
        <p className="text-xl text-muted-foreground">
          Manage your account and view your testing history
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <div className="md:col-span-1">
          <Card className="glass-card animate-slide-up">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{userInfo.name}</CardTitle>
              <CardDescription>{userInfo.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{userInfo.company}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {userInfo.joinDate}</span>
              </div>
              
              <div className="pt-4 border-t border-glass-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">35</p>
                    <p className="text-xs text-muted-foreground">Test Cases</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2">
          <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Tabs defaultValue="details" className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Account Details</CardTitle>
                    <CardDescription>
                      View and edit your profile information
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="glass-button"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
                <TabsList className="glass-input">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="details">
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={userInfo.name}
                        disabled={!isEditing}
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={userInfo.email}
                        disabled={!isEditing}
                        className="glass-input"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        defaultValue={userInfo.company}
                        disabled={!isEditing}
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        defaultValue={userInfo.role}
                        disabled={!isEditing}
                        className="glass-input"
                      />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="projects">
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 rounded-lg border border-glass-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="text-xs">
                                {project.id}
                              </Badge>
                              <h3 className="font-semibold">{project.name}</h3>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{project.date}</span>
                              <span>{project.testCases} test cases</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={project.status === 'Completed' ? 'default' : 'secondary'}
                            >
                              {project.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="activity">
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Generated test cases for Patient Management System</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Exported test cases to JIRA</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Updated profile information</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;