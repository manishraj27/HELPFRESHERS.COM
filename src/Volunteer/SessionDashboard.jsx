import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const SessionDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetLink, setMeetLink] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    fetchSessions();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/sessions/volunteer/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.data.success) {
        setSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      showAlert('error', 'Failed to fetch sessions');
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
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.data.success) {
        showAlert('success', `Session ${status} successfully`);
        fetchSessions();
        setMeetLink('');
      }
    } catch (error) {
      console.error('Error updating session status:', error);
      showAlert('error', 'Failed to update session status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Session Requests</h1>

      {alert.message && (
        <Alert variant={alert.type === 'error' ? 'destructive' : 'default'} className="mb-4">
          <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No session requests yet.
            </CardContent>
          </Card>
        ) : (
          sessions.map((session) => (
            <Card key={session._id}>
              <CardHeader>
                <CardTitle>{session.user.name}</CardTitle>
                <CardDescription>
                  Requested on {format(new Date(session.createdAt), 'PPP')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>Email:</strong> {session.user.email}
                </div>
                <div>
                  <strong>Phone:</strong> {session.user.phone}
                </div>
                <div>
                  <strong>Topic:</strong> {session.topic}
                </div>
                <div>
                  <strong>Background:</strong> {session.user.background}
                </div>
                <div>
                  <strong>Scheduled For:</strong>{' '}
                  {format(new Date(session.scheduledFor), 'PPP p')}
                </div>
                <div>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      session.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : session.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
              </CardContent>
              {session.status === 'pending' && (
                <CardFooter className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Accept Session Request</DialogTitle>
                        <DialogDescription>
                          Please provide a Google Meet link for the session.
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        placeholder="Enter Google Meet link"
                        value={meetLink}
                        onChange={(e) => setMeetLink(e.target.value)}
                      />
                      <DialogFooter>
                        <Button
                          onClick={() => handleSessionStatus(session._id, 'accepted')}
                          disabled={!meetLink}
                        >
                          Accept Session
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

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
          ))
        )}
      </div>
    </div>
  );
};

export default SessionDashboard;
