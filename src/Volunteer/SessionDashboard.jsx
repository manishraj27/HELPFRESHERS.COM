import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2, CheckCircle, XCircle, Calendar, Clock, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SessionDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetLink, setMeetLink] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);


  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    fetchSessions();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 5000);
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        // Updated endpoint to use the authenticated user from token
        'http://localhost:5000/api/sessions/volunteer/sessions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      showAlert('error', error.response?.data?.message || 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionStatus = async (sessionId, status) => {
    try {
      if (status === 'accepted' && !meetLink) {
        showAlert('error', 'Please provide a Google Meet link');
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/sessions/${sessionId}/status`,
        {
          status,
          meetLink: status === 'accepted' ? meetLink : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        showAlert('success', `Session ${status} successfully`);
        fetchSessions();
        setMeetLink('');
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating session status:', error);
      showAlert('error', error.response?.data?.message || 'Failed to update session status');
    }
  };

  const pendingSessions = sessions.filter(s => s.status === 'pending');
  const upcomingSessions = sessions.filter(s => s.status === 'accepted' && new Date(s.scheduledFor) >= new Date());
  const completedSessions = sessions.filter(s => s.status === 'accepted' && new Date(s.scheduledFor) < new Date());
  const rejectedSessions = sessions.filter(s => s.status === 'rejected');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading sessions...</span>
      </div>
    );
  }

  const renderSessionCard = (session) => (
    <Card key={session._id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {session.user.name}
              <Badge variant={
                session.status === 'pending' ? 'outline' : 
                session.status === 'accepted' ? 'success' : 
                'destructive'
              }>
                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Requested on {format(new Date(session.createdAt), 'PPP')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{session.user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{session.user.phone || 'Not provided'}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-sm">{session.topic}</span>
        </div>
        
        <div className="flex flex-col gap-1.5 bg-accent/10 p-2 rounded-md">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {format(new Date(session.scheduledFor), 'EEEE, MMMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {format(new Date(session.scheduledFor), 'h:mm a')}
            </span>
          </div>
        </div>
        
        {session.meetLink && (
          <div className="mt-2 p-2 border border-primary/20 bg-primary/5 rounded-md">
            <p className="text-sm font-medium text-primary">Meeting Link:</p>
            <a 
              href={session.meetLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-primary hover:underline block truncate"
            >
              {session.meetLink}
            </a>
          </div>
        )}
      </CardContent>
      
      {session.status === 'pending' && (
        <CardFooter className="flex gap-4 pt-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              setActiveSession(session);
              setMeetLink('');
              setDialogOpen(true);
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Accept
          </Button>

          <Button
            variant="destructive"
            className="w-full"
            onClick={() => handleSessionStatus(session._id, 'rejected')}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Mentorship Sessions</h1>
      <p className="text-muted-foreground mb-8">
        Manage your mentorship session requests and scheduled meetings
      </p>

      {alert.message && (
        <Alert variant={alert.type === 'error' ? 'destructive' : 'default'} className="mb-6">
          <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pending" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingSessions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingSessions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingSessions.length === 0 ? (
              <div className="col-span-full py-10 text-center text-muted-foreground bg-accent/5 rounded-lg">
                No pending session requests.
              </div>
            ) : (
              pendingSessions.map(renderSessionCard)
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.length === 0 ? (
              <div className="col-span-full py-10 text-center text-muted-foreground bg-accent/5 rounded-lg">
                No upcoming sessions.
              </div>
            ) : (
              upcomingSessions.map(renderSessionCard)
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedSessions.length === 0 ? (
              <div className="col-span-full py-10 text-center text-muted-foreground bg-accent/5 rounded-lg">
                No completed sessions.
              </div>
            ) : (
              completedSessions.map(renderSessionCard)
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rejected">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rejectedSessions.length === 0 ? (
              <div className="col-span-full py-10 text-center text-muted-foreground bg-accent/5 rounded-lg">
                No rejected sessions.
              </div>
            ) : (
              rejectedSessions.map(renderSessionCard)
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Session Request</DialogTitle>
            <DialogDescription>
              Please provide a Google Meet link for the session with {activeSession?.user?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-medium mb-1">Topic</p>
              <p className="text-sm text-muted-foreground">{activeSession?.topic}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Scheduled For</p>
              <p className="text-sm text-muted-foreground">
                {activeSession && format(new Date(activeSession.scheduledFor), 'PPP p')}
              </p>
            </div>
            <div className="pt-2">
              <Input
                placeholder="Enter Google Meet link (e.g., https://meet.google.com/abc-defg-hij)"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Create a meeting on <a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Meet</a> and paste the link above
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => activeSession && handleSessionStatus(activeSession._id, 'accepted')}
              disabled={!meetLink || !meetLink.includes('meet.google.com')}
            >
              Accept Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionDashboard;