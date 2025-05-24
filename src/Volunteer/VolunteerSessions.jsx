import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Video, Check, X, AlertCircle, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VolunteerSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'accept' or 'reject'
  const [meetLink, setMeetLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('pending');
  const [volunteerProfile, setVolunteerProfile] = useState(null);
  
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  // Fetch volunteer profile first
  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/volunteers/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setVolunteerProfile(data.data);
        } else {
          console.error('Failed to fetch volunteer profile');
        }
      } catch (error) {
        console.error('Error fetching volunteer profile:', error);
      }
    };

    if (token && isAuthenticated) {
      fetchVolunteerProfile();
    }
  }, [token, isAuthenticated]);

  // Fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      if (!volunteerProfile?._id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/sessions/volunteer/${volunteerProfile._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data.data || []);
        } else {
          console.error('Failed to fetch sessions');
          setSessions([]);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [volunteerProfile?._id, token]);

  // Filter sessions
  useEffect(() => {
    let filtered = sessions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.topic?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter);
    }

    setFilteredSessions(filtered);
  }, [sessions, searchTerm, statusFilter]);

  const handleSessionAction = async () => {
    if (!selectedSession || !actionType) return;

    setIsSubmitting(true);
    setStatusMessage({ type: '', message: '' });

    try {
      const payload = {
        status: actionType === 'accept' ? 'accepted' : 'rejected'
      };

      if (actionType === 'accept' && meetLink) {
        payload.meetLink = meetLink;
      }

      const response = await fetch(`http://localhost:5000/api/sessions/${selectedSession._id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({
          type: 'success',
          message: `Session ${actionType === 'accept' ? 'accepted' : 'rejected'} successfully!`
        });

        // Update sessions list
        setSessions(prev => prev.map(session =>
          session._id === selectedSession._id
            ? { ...session, status: payload.status, meetLink: payload.meetLink }
            : session
        ));

        // Close modal after delay
        setTimeout(() => {
          setIsActionModalOpen(false);
          setStatusMessage({ type: '', message: '' });
          setMeetLink('');
          setSelectedSession(null);
          setActionType('');
        }, 2000);
      } else {
        setStatusMessage({
          type: 'error',
          message: result.message || `Failed to ${actionType} session`
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Network error. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openActionModal = (session, action) => {
    setSelectedSession(session);
    setActionType(action);
    setIsActionModalOpen(true);
    setMeetLink(session.meetLink || '');
    setStatusMessage({ type: '', message: '' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSessionsByStatus = (status) => {
    return filteredSessions.filter(session => session.status === status);
  };

  const SessionCard = ({ session }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{session.user?.name || 'Unknown User'}</CardTitle>
          <Badge className={`${getStatusColor(session.status)} capitalize`}>
            {session.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formatDate(session.scheduledFor)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{session.user?.email || 'No email'}</span>
          </div>
          
          {session.user?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{session.user.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{session.duration || 60} minutes</span>
          </div>
          
          {session.topic && (
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span>{session.topic}</span>
            </div>
          )}
        </div>

        {session.user?.background && (
          <div>
            <h4 className="font-medium text-sm mb-1">Background:</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{session.user.background}</p>
          </div>
        )}

        {session.meetLink && (
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
            <Video className="w-4 h-4 text-blue-600" />
            <a 
              href={session.meetLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Join Meeting
            </a>
          </div>
        )}

        <Separator />

        <div className="flex gap-2">
          {session.status === 'pending' && (
            <>
              <Button
                onClick={() => openActionModal(session, 'accept')}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Check className="w-4 h-4 mr-1" />
                Accept
              </Button>
              <Button
                onClick={() => openActionModal(session, 'reject')}
                variant="destructive"
                className="flex-1"
                size="sm"
              >
                <X className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </>
          )}
          
          {session.status === 'accepted' && (
            <Button
              onClick={() => openActionModal(session, 'accept')}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Video className="w-4 h-4 mr-1" />
              Update Meeting Link
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
            <p className="text-gray-600">Please log in to view your sessions.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
          <p className="text-gray-600">Manage your mentorship session requests</p>
          {sessions.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Total sessions: {sessions.length}
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by student name, email, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="relative">
              Pending
              {getSessionsByStatus('pending').length > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-yellow-500">
                  {getSessionsByStatus('pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Accepted
              {getSessionsByStatus('accepted').length > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-green-500">
                  {getSessionsByStatus('accepted').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {getSessionsByStatus('pending').length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending sessions</h3>
                  <p className="text-gray-600">You don't have any pending session requests at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getSessionsByStatus('pending').map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {getSessionsByStatus('accepted').length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Check className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted sessions</h3>
                  <p className="text-gray-600">You haven't accepted any sessions yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getSessionsByStatus('accepted').map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {getSessionsByStatus('rejected').length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <X className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected sessions</h3>
                  <p className="text-gray-600">You haven't rejected any sessions.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getSessionsByStatus('rejected').map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {getSessionsByStatus('completed').length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed sessions</h3>
                  <p className="text-gray-600">You don't have any completed sessions yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getSessionsByStatus('completed').map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Action Modal */}
        <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {actionType === 'accept' ? 'Accept Session' : 'Reject Session'}
              </DialogTitle>
              <DialogDescription>
                {actionType === 'accept' 
                  ? 'Provide a meeting link to confirm the session'
                  : 'Are you sure you want to reject this session request?'
                }
              </DialogDescription>
            </DialogHeader>

            {statusMessage.message && (
              <Alert className={statusMessage.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <AlertDescription className={statusMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {statusMessage.message}
                </AlertDescription>
              </Alert>
            )}

            {selectedSession && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Session Details:</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Student:</strong> {selectedSession.user?.name || 'Unknown'}</p>
                    <p><strong>Topic:</strong> {selectedSession.topic || 'No topic specified'}</p>
                    <p><strong>Scheduled:</strong> {formatDate(selectedSession.scheduledFor)}</p>
                  </div>
                </div>

                {actionType === 'accept' && (
                  <div>
                    <Label htmlFor="meetLink">Meeting Link *</Label>
                    <Input
                      id="meetLink"
                      value={meetLink}
                      onChange={(e) => setMeetLink(e.target.value)}
                      placeholder="Enter Google Meet, Zoom, or other meeting link"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsActionModalOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSessionAction}
                    disabled={isSubmitting || (actionType === 'accept' && !meetLink)}
                    className={actionType === 'accept' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                  >
                    {isSubmitting 
                      ? (actionType === 'accept' ? 'Accepting...' : 'Rejecting...') 
                      : (actionType === 'accept' ? 'Accept Session' : 'Reject Session')
                    }
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VolunteerSessions; 