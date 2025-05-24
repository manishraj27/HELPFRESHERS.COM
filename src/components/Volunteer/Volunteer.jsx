import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Users, BookOpen, Code, Heart, Clock, Award, Target } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  profession: z.string().min(2, "Profession is required"),
  organization: z.string().optional(),
  yearsOfExperience: z.number().min(0),
  linkedinProfile: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  rolePreference: z.enum(["Mentor", "Content Creator", "Tech Volunteer"]),
  availabilityHoursPerWeek: z.number().min(1),
  preferredSchedule: z.array(z.string()).min(1, "At least one schedule preference is required"),
  areasOfExpertise: z.array(z.string()).min(1, "At least one area of expertise is required"),
  motivation: z.string().min(50, "Please provide a detailed motivation (minimum 50 characters)"),
  skills: z.array(z.string()).min(1, "At least one skill is required")
});

const Volunteer = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const scheduleOptions = ["Weekday Mornings", "Weekday Evenings", "Weekends"];
  const expertiseOptions = ["Web Development", "Mobile Development", "Data Science", "Machine Learning", "DevOps", "UI/UX Design", "Backend Development", "Frontend Development", "Full Stack Development", "Cloud Computing"];
  const skillsOptions = ["JavaScript", "Python", "Java", "React", "Angular", "Vue.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Docker", "Kubernetes", "Git"];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profession: "",
      organization: "",
      yearsOfExperience: 0,
      linkedinProfile: "",
      rolePreference: "Mentor",
      availabilityHoursPerWeek: 1,
      preferredSchedule: [],
      areasOfExpertise: [],
      motivation: "",
      skills: []
    }
  });

  const toggleSchedule = (schedule) => {
    const updatedSchedules = selectedSchedules.includes(schedule)
      ? selectedSchedules.filter(s => s !== schedule)
      : [...selectedSchedules, schedule];
    setSelectedSchedules(updatedSchedules);
    form.setValue('preferredSchedule', updatedSchedules);
  };

  const toggleExpertise = (expertise) => {
    const updatedExpertise = selectedExpertise.includes(expertise)
      ? selectedExpertise.filter(e => e !== expertise)
      : [...selectedExpertise, expertise];
    setSelectedExpertise(updatedExpertise);
    form.setValue('areasOfExpertise', updatedExpertise);
  };

  const toggleSkill = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);
    form.setValue('skills', updatedSkills);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/volunteers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        console.log('Registration successful:', result);
        setIsSuccess(true);
        
        // Clear form and close dialog after showing success
        setTimeout(() => {
          form.reset();
          setIsDialogOpen(false);
          setIsSuccess(false);
          setIsSubmitting(false);
        }, 2000);
      } else {
        console.error('Registration failed:', result);
        alert('Registration failed. Please try again.');
        setIsSubmitting(false);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const volunteerRoles = [
    {
      title: "Mentor",
      icon: <Users className="w-6 h-6" />,
      description: "Guide and support freshers in their career journey",
      responsibilities: ["One-on-one mentoring sessions", "Career guidance", "Goal setting and tracking", "Interview preparation"]
    },
    {
      title: "Content Creator",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Create educational content and resources",
      responsibilities: ["Write technical articles", "Create video tutorials", "Develop learning materials", "Review and edit content"]
    },
    {
      title: "Tech Volunteer",
      icon: <Code className="w-6 h-6" />,
      description: "Contribute to technical projects and initiatives",
      responsibilities: ["Code reviews", "Technical workshops", "Open source contributions", "Platform development"]
    }
  ];

  const benefits = [
    "Make a meaningful impact on freshers' careers",
    "Expand your professional network",
    "Develop leadership and mentoring skills",
    "Gain recognition in the community",
    "Flexible volunteering schedule",
    "Access to exclusive volunteer events"
  ];

  const requirements = [
    "Minimum 2 years of professional experience",
    "Strong communication skills",
    "Passion for helping others grow",
    "Commitment to regular participation",
    "Professional attitude and reliability"
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Join Our Volunteer Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Help shape the future of technology by mentoring and supporting fresh graduates 
            as they begin their professional journey.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                Register for Volunteering
              </Button>
            </DialogTrigger>
          &nbsp;&nbsp;&nbsp;&nbsp;
           <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/volunteer/login')}
            >
              Volunteer Login
            </Button>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
              <DialogHeader>
                <DialogTitle>Volunteer Registration</DialogTitle>
                <DialogDescription>
                  Join our community of volunteers and make a difference in freshers' lives.
                </DialogDescription>
              </DialogHeader>
              
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Registration Successful!</h3>
                  <p className="text-muted-foreground">Thank you for joining our volunteer community. We'll be in touch soon!</p>
                </div>
              ) : (
                <Form {...form}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Personal Information */}
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profession</FormLabel>
                            <FormControl>
                              <Input placeholder="Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization</FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedinProfile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rolePreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Mentor">Mentor</SelectItem>
                                <SelectItem value="Content Creator">Content Creator</SelectItem>
                                <SelectItem value="Tech Volunteer">Tech Volunteer</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="availabilityHoursPerWeek"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hours Available per Week</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 1)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Preferred Schedule */}
                    <FormField
                      control={form.control}
                      name="preferredSchedule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Schedule</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {scheduleOptions.map((schedule) => (
                                <Badge
                                  key={schedule}
                                  variant={selectedSchedules.includes(schedule) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => toggleSchedule(schedule)}
                                >
                                  {schedule}
                                </Badge>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Areas of Expertise */}
                    <FormField
                      control={form.control}
                      name="areasOfExpertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Areas of Expertise</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {expertiseOptions.map((expertise) => (
                                <Badge
                                  key={expertise}
                                  variant={selectedExpertise.includes(expertise) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => toggleExpertise(expertise)}
                                >
                                  {expertise}
                                </Badge>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Skills */}
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {skillsOptions.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => toggleSkill(skill)}
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivation</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us why you want to volunteer and how you can contribute..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="button" 
                      onClick={form.handleSubmit(onSubmit)}
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Volunteer Roles Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Volunteer Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {volunteerRoles.map((role, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-card text-card-foreground border-border">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {role.icon}
                    </div>
                    <CardTitle>{role.title}</CardTitle>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {role.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits and Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-600" />
                <CardTitle>Benefits of Volunteering</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-600" />
                <CardTitle>Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center">Our Impact</CardTitle>
            <CardDescription className="text-center">
              See how our volunteers are making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Freshers Mentored</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600">Active Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                <div className="text-gray-600">Hours Contributed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community today and help shape the next generation of tech professionals.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Start Your Volunteer Journey
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
