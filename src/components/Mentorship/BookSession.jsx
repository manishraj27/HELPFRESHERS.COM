import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, Award, Star, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const BookSession = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    background: '',
    scheduledFor: '',
    topic: ''
  });
  const [bookingStatus, setBookingStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch approved volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/volunteers/approved');
        if (response.ok) {
          const data = await response.json();
          setVolunteers(data.data || []);
          setFilteredVolunteers(data.data || []);
        } else {
          console.error('Failed to fetch volunteers');
        }
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Filter volunteers based on search and filters
  useEffect(() => {
    let filtered = volunteers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(volunteer =>
        volunteer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.areasOfExpertise.some(area => 
          area.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Expertise filter
    if (expertiseFilter !== 'all') {
      filtered = filtered.filter(volunteer =>
        volunteer.areasOfExpertise.some(area =>
          area.toLowerCase().includes(expertiseFilter.toLowerCase())
        )
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(volunteer =>
        volunteer.rolePreference === roleFilter
      );
    }

    setFilteredVolunteers(filtered);
  }, [volunteers, searchTerm, expertiseFilter, roleFilter]);

  // Get unique expertise areas for filter
  const uniqueExpertise = [...new Set(volunteers.flatMap(v => v.areasOfExpertise))];
  const uniqueRoles = [...new Set(volunteers.map(v => v.rolePreference))];

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    setBookingStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/sessions/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volunteerId: selectedVolunteer._id,
          userData: {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            background: bookingData.background
          },
          scheduledFor: bookingData.scheduledFor,
          topic: bookingData.topic
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingStatus({
          type: 'success',
          message: 'Session request sent successfully! The volunteer will be notified and will respond shortly.'
        });
        // Reset form
        setBookingData({
          name: '',
          email: '',
          phone: '',
          background: '',
          scheduledFor: '',
          topic: ''
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsBookingModalOpen(false);
          setBookingStatus({ type: '', message: '' });
        }, 3000);
      } else {
        setBookingStatus({
          type: 'error',
          message: result.message || 'Failed to book session. Please try again.'
        });
      }
    } catch (error) {
      setBookingStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatScheduleTime = (schedules) => {
    if (!schedules || schedules.length === 0) return 'Flexible';
    return schedules.join(', ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading volunteers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-[72px] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Mentorship Session</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced professionals who are ready to guide you on your journey. 
            Choose from our approved mentors and schedule a personalized session.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search mentors by name, profession, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise Areas</SelectItem>
                  {uniqueExpertise.map(expertise => (
                    <SelectItem key={expertise} value={expertise.toLowerCase()}>
                      {expertise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredVolunteers.length} of {volunteers.length} mentors
          </p>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer._id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {volunteer.firstName[0]}{volunteer.lastName[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {volunteer.firstName} {volunteer.lastName}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {volunteer.rolePreference}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="font-medium">{volunteer.profession}</span>
                  </div>
                  
                  {volunteer.organization && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span>{volunteer.organization}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{volunteer.yearsOfExperience} years experience</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{volunteer.availabilityHoursPerWeek}h/week available</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatScheduleTime(volunteer.preferredSchedule)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-sm mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {volunteer.areasOfExpertise.slice(0, 3).map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {volunteer.areasOfExpertise.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{volunteer.areasOfExpertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Dialog open={isBookingModalOpen && selectedVolunteer?._id === volunteer._id} 
                        onOpenChange={(open) => {
                          setIsBookingModalOpen(open);
                          if (open) setSelectedVolunteer(volunteer);
                        }}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setSelectedVolunteer(volunteer)}
                    >
                      Book Session
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Book Session with {volunteer.firstName} {volunteer.lastName}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to request a mentorship session
                      </DialogDescription>
                    </DialogHeader>

                    {bookingStatus.message && (
                      <Alert className={bookingStatus.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                        <AlertDescription className={bookingStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                          {bookingStatus.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={bookingData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Your phone number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="scheduledFor">Preferred Date & Time *</Label>
                        <Input
                          id="scheduledFor"
                          type="datetime-local"
                          value={bookingData.scheduledFor}
                          onChange={(e) => handleInputChange('scheduledFor', e.target.value)}
                          required
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="topic">Session Topic *</Label>
                        <Input
                          id="topic"
                          value={bookingData.topic}
                          onChange={(e) => handleInputChange('topic', e.target.value)}
                          required
                          placeholder="What would you like to discuss?"
                        />
                      </div>

                      <div>
                        <Label htmlFor="background">Your Background</Label>
                        <Textarea
                          id="background"
                          value={bookingData.background}
                          onChange={(e) => handleInputChange('background', e.target.value)}
                          placeholder="Tell us about your background, goals, or any specific questions you have..."
                          rows={4}
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsBookingModalOpen(false)}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={handleBookingSubmit}
                        >
                          {isSubmitting ? 'Sending Request...' : 'Send Request'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVolunteers.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">No mentors found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSession;