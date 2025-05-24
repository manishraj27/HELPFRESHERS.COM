import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Headphones,
    Building,
    Lightbulb,
    UserCheck,
    Users,
    ExternalLink,
    Search,
    Clock,
    Calendar,
    Briefcase,
    Mail,
    Phone,
    LinkedinIcon,
    Star,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { TooltipContent } from "../ui/tooltip";



const Mentorship = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterExpertise, setFilterExpertise] = useState("");
    const [filterRole, setFilterRole] = useState("");

    // Fetch volunteers data
    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/volunteers");
                if (response.data.success) {
                    setVolunteers(response.data.data);
                } else {
                    setError("Failed to fetch volunteers");
                }
            } catch (err) {
                setError("An error occurred while fetching data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteers();
    }, []);

    // Filter volunteers based on search, expertise filter, and role filter
    const filteredVolunteers = volunteers.filter(volunteer => {
        const matchesSearch = searchTerm === "" ||
            `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesExpertise = filterExpertise === "all" || filterExpertise === "" ||
            volunteer.areasOfExpertise?.some(area => area.toLowerCase().includes(filterExpertise.toLowerCase()));
        
        const matchesRole = filterRole === "all" || filterRole === "" ||
            volunteer.rolePreference === filterRole;

        return matchesSearch && matchesExpertise && matchesRole;
    });

    // Extract unique expertise areas for filter dropdown
    const expertiseAreas = [...new Set(
        volunteers
            .flatMap(volunteer => volunteer.areasOfExpertise || [])
            .filter(area => area)
    )];

    return (
        <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-16">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        Get Expert Mentorship from Industry Professionals
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Connect with experienced mentors who can guide you through your career journey,
                        help you develop essential skills, and provide valuable industry insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="gap-2">
                            <Link to="/mentorship/book-a-session">
                                <Headphones className="h-5 w-5" />
                                Book a Session
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link to="/volunteer">
                                <UserCheck className="h-5 w-5" />
                                Become a Mentor
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                                <Building className="text-primary h-6 w-6" />
                            </div>
                            <CardTitle>Company-wise Mentors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="min-h-[80px]">
                                Find mentors from specific companies like Google, Microsoft, Amazon, and more to get relevant industry insights.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" className="gap-2 text-primary">
                                <Link to="/mentorship/company">
                                    Browse mentors <ExternalLink size={16} />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                                <Lightbulb className="text-primary h-6 w-6" />
                            </div>
                            <CardTitle>Subject-wise Mentors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="min-h-[80px]">
                                Connect with experts in specific domains like Web Development, Data Science, Machine Learning, and more.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" className="gap-2 text-primary">
                                <Link to="/mentorship/subject">
                                    Find experts <ExternalLink size={16} />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                                <Users className="text-primary h-6 w-6" />
                            </div>
                            <CardTitle>Success Stories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="min-h-[80px]">
                                Read how mentorship has helped freshers land their dream jobs and accelerate their professional growth.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" className="gap-2 text-primary">
                                <Link to="/mentorship/success-stories">
                                    Read stories <ExternalLink size={16} />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-accent/5 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How Mentorship Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                            <h3 className="text-xl font-medium mb-3">Browse Mentors</h3>
                            <p className="text-muted-foreground">
                                Explore our diverse pool of industry professionals based on companies, expertise areas, or specific skills.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                            <h3 className="text-xl font-medium mb-3">Book a Session</h3>
                            <p className="text-muted-foreground">
                                Choose a mentor, select a convenient time slot, and submit your specific questions or topics for discussion.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                            <h3 className="text-xl font-medium mb-3">Get Guidance</h3>
                            <p className="text-muted-foreground">
                                Connect with your mentor via video call and receive personalized guidance, feedback, and industry insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits of Mentorship */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Benefits of Mentorship</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Mentorship provides invaluable guidance and support that can significantly accelerate your career growth and professional development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>For Mentees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Get personalized career guidance and actionable feedback</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Build professional skills and learn industry best practices</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Access insider knowledge and perspectives from experienced professionals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Gain confidence in your career decisions and professional growth</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Expand your professional network with valuable connections</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>For Mentors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Share your knowledge and experience to make a meaningful impact</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Develop your leadership and communication skills</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Gain fresh perspectives and stay connected with emerging trends</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Build your professional brand and network</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>Experience the fulfillment of helping others succeed</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Our Volunteer Mentors */}
            <section className="container mx-auto px-4 py-16 bg-accent/5 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Our Volunteer Mentors</h2>
                        <p className="text-muted-foreground">
                            Meet the professionals who have volunteered to help freshers navigate their career journey.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search mentors, skills..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3">
                            {/* Expertise Area Select */}
                            <Select value={filterExpertise} onValueChange={setFilterExpertise}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Expertise Area" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="all">All Areas</SelectItem>
                                    {expertiseAreas.map((area, index) => (
                                        <SelectItem key={index} value={area}>{area}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Role Select */}
                            <Select value={filterRole} onValueChange={setFilterRole}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                              
                                <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="Mentor">Mentors</SelectItem>
                                    <SelectItem value="Industry Expert">Industry Experts</SelectItem>
                                    <SelectItem value="Career Coach">Career Coaches</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        <span className="ml-2 text-muted-foreground">Loading volunteers...</span>
                    </div>
                ) : error ? (
                    <Card className="bg-destructive/10 border-destructive/20 text-destructive">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Error Loading Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{error}</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="border-destructive/30 text-destructive"
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </Button>
                        </CardFooter>
                    </Card>
                ) : filteredVolunteers.length === 0 ? (
                    <Card className="text-center py-12 bg-accent/5">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-medium mb-2">No mentors found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filters to find mentors.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilterExpertise("");
                                    setFilterRole("");
                                }}
                            >
                                Clear Filters
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Tabs defaultValue="grid">
                        <div className="flex justify-end mb-4">
                            <TabsList>
                                <TabsTrigger value="grid" className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="7" height="7" x="3" y="3" rx="1" />
                                        <rect width="7" height="7" x="14" y="3" rx="1" />
                                        <rect width="7" height="7" x="14" y="14" rx="1" />
                                        <rect width="7" height="7" x="3" y="14" rx="1" />
                                    </svg>
                                    Grid
                                </TabsTrigger>
                                <TabsTrigger value="list" className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="21" x2="3" y1="6" y2="6" />
                                        <line x1="21" x2="3" y1="12" y2="12" />
                                        <line x1="21" x2="3" y1="18" y2="18" />
                                    </svg>
                                    List
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="grid" className="mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredVolunteers.map((volunteer) => (
                                    <Card key={volunteer._id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center text-lg font-medium">
                                                        {volunteer.firstName.charAt(0)}{volunteer.lastName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-lg">
                                                            {volunteer.firstName} {volunteer.lastName}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            {volunteer.profession} at {volunteer.organization}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Badge variant={volunteer.status === "approved" ? "success" : "secondary"} className="ml-auto">
                                                                {volunteer.status === "approved" ? "Active" : "Pending"}
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {volunteer.status === "approved"
                                                                ? "This mentor is active and available for sessions"
                                                                : "This volunteer is pending review"}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                                                <Clock size={12} />
                                                <span>{volunteer.yearsOfExperience} years of experience</span>
                                            </div>

                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="expertise">
                                                    <AccordionTrigger className="text-sm font-medium py-1">Areas of Expertise</AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                                            {volunteer.areasOfExpertise?.map((area, index) => (
                                                                <Badge key={index} variant="outline" className="bg-accent/10">
                                                                    {area}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="skills">
                                                    <AccordionTrigger className="text-sm font-medium py-1">Skills</AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {volunteer.skills?.map((skill, index) => (
                                                                <Badge key={index} variant="secondary" className="bg-secondary/10">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>

                                                <AccordionItem value="availability">
                                                    <AccordionTrigger className="text-sm font-medium py-1">Availability</AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Clock size={14} className="text-muted-foreground" />
                                                                <span>{volunteer.availabilityHoursPerWeek} hours/week</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {volunteer.preferredSchedule?.map((schedule, index) => (
                                                                    <Badge key={index} variant="outline">
                                                                        {schedule}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </CardContent>
                                        <CardFooter className="flex justify-between pt-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="rounded-full p-2" asChild>
                                                            <a href={volunteer.linkedinProfile} target="_blank" rel="noopener noreferrer">
                                                                <LinkedinIcon size={18} />
                                                            </a>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>LinkedIn Profile</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            {volunteer.status === "approved" && (
                                                <Button size="sm">Book a Session</Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="list" className="mt-2">
                            <div className="space-y-4">
                                {filteredVolunteers.map((volunteer) => (
                                    <Card key={volunteer._id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <div className="p-4 md:p-6 flex-grow">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center text-lg font-medium shrink-0">
                                                        {volunteer.firstName.charAt(0)}{volunteer.lastName.charAt(0)}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h3 className="font-medium text-lg">{volunteer.firstName} {volunteer.lastName}</h3>
                                                                <p className="text-muted-foreground">{volunteer.profession} at {volunteer.organization}</p>
                                                            </div>
                                                            <Badge variant={volunteer.status === "approved" ? "success" : "secondary"}>
                                                                {volunteer.status === "approved" ? "Active" : "Pending"}
                                                            </Badge>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                            <div>
                                                                <h4 className="text-sm font-medium mb-1">Experience</h4>
                                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                    <Briefcase size={14} />
                                                                    <span>{volunteer.yearsOfExperience} years</span>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-sm font-medium mb-1">Availability</h4>
                                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                    <Clock size={14} />
                                                                    <span>{volunteer.availabilityHoursPerWeek} hours/week</span>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-sm font-medium mb-1">Contact</h4>
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                        <Mail size={14} />
                                                                        <span className="truncate max-w-[150px]">{volunteer.email}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4">
                                                            <h4 className="text-sm font-medium mb-2">Areas of Expertise</h4>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {volunteer.areasOfExpertise?.map((area, index) => (
                                                                    <Badge key={index} variant="outline" className="bg-accent/10">
                                                                        {area}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="mt-3">
                                                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {volunteer.skills?.map((skill, index) => (
                                                                    <Badge key={index} variant="secondary" className="bg-secondary/10">
                                                                        {skill}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-6 py-4 md:py-6 border-t md:border-t-0 md:border-l border-border flex md:flex-col gap-3 justify-between items-center">
                                                <a
                                                    href={volunteer.linkedinProfile}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary/80 transition-colors"
                                                >
                                                    <LinkedinIcon size={24} />
                                                </a>

                                                {volunteer.status === "approved" && (
                                                    <Button>Book a Session</Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}

                {/* Show more button if needed */}
                {filteredVolunteers.length > 12 && (
                    <div className="flex justify-center mt-8">
                        <Button variant="outline" className="gap-1">
                            Show More <ChevronDown size={16} />
                        </Button>
                    </div>
                )}
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Get answers to commonly asked questions about our mentorship program.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I book a mentorship session?</AccordionTrigger>
                            <AccordionContent>
                                To book a mentorship session, browse through our available mentors, select the one that aligns with your needs, and click on "Book a Session." You'll be able to choose a time slot that works for both of you and specify your questions or topics for discussion.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>Are mentorship sessions free or paid?</AccordionTrigger>
                            <AccordionContent>
                                Our mentorship program is primarily volunteer-based, so most sessions are offered free of charge. However, some specialized or extended sessions might have a nominal fee. The pricing details (if any) will be clearly indicated on each mentor's profile.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>How long is a typical mentorship session?</AccordionTrigger>
                            <AccordionContent>
                                A standard mentorship session is typically 30-45 minutes long, but this can vary based on the mentor's availability and the complexity of your questions. Some mentors also offer extended sessions for deeper discussions.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger>How do I become a mentor?</AccordionTrigger>
                            <AccordionContent>
                                If you'd like to volunteer as a mentor, you can click on the "Become a Mentor" button and fill out the application form. Our team will review your application and reach out to you with the next steps. We welcome professionals from all industries with at least 2+ years of experience.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger>What happens if I need to cancel a session?</AccordionTrigger>
                            <AccordionContent>
                                We understand that plans change. If you need to cancel a session, please do so at least 24 hours in advance so the mentor can adjust their schedule. You can easily reschedule through your dashboard or by contacting support.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="flex justify-center mt-8">
                    <Button asChild variant="outline">
                        <Link to="/about/faq">View All FAQs</Link>
                    </Button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Ready to accelerate your career?</h3>
                            <p className="text-muted-foreground">
                                Book a session with an industry expert today and get personalized guidance.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="gap-2">
                                <Link to="/mentorship/book">
                                    <Headphones className="h-5 w-5" />
                                    Book a Session
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link to="/mentorship/browse">Browse All Mentors</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default Mentorship;