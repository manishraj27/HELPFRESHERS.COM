import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  });
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchVolunteers();
  }, [token]);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/volunteers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Handle the new API response structure
      const volunteersData = response.data.data || [];
      setVolunteers(volunteersData);
      
      // Calculate stats
      const newStats = volunteersData.reduce((acc, volunteer) => {
        acc.total++;
        acc[volunteer.status] = (acc[volunteer.status] || 0) + 1;
        return acc;
      }, { total: 0, approved: 0, pending: 0, rejected: 0 });
      
      setStats(newStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (volunteerId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/volunteers/${volunteerId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      // Update local state
      const updatedVolunteers = volunteers.map(volunteer => 
        volunteer._id === volunteerId 
          ? { ...volunteer, status: newStatus }
          : volunteer
      );
      setVolunteers(updatedVolunteers);

      // Update stats
      const newStats = updatedVolunteers.reduce((acc, volunteer) => {
        acc.total++;
        acc[volunteer.status] = (acc[volunteer.status] || 0) + 1;
        return acc;
      }, { total: 0, approved: 0, pending: 0, rejected: 0 });
      
      setStats(newStats);
    } catch (error) {
      console.error('Error updating volunteer status:', error);
    }
  };

  const handleDelete = async (volunteerId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/volunteers/${volunteerId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      // Update local state
      const updatedVolunteers = volunteers.filter(volunteer => volunteer._id !== volunteerId);
      setVolunteers(updatedVolunteers);

      // Update stats
      const newStats = updatedVolunteers.reduce((acc, volunteer) => {
        acc.total++;
        acc[volunteer.status] = (acc[volunteer.status] || 0) + 1;
        return acc;
      }, { total: 0, approved: 0, pending: 0, rejected: 0 });
      
      setStats(newStats);
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 sm:-mx-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Name</th>
                  <th className="text-left py-4 px-4 font-medium">Email</th>
                  <th className="text-left py-4 px-4 font-medium">Expertise</th>
                  <th className="text-left py-4 px-4 font-medium">Status</th>
                  <th className="text-left py-4 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4">
                      {volunteer.firstName} {volunteer.lastName}
                    </td>
                    <td className="py-4 px-4">{volunteer.email}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {volunteer.areasOfExpertise.slice(0, 2).map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {volunteer.areasOfExpertise.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{volunteer.areasOfExpertise.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={volunteer.status === 'approved' ? 'success' :
                                volunteer.status === 'pending' ? 'warning' : 'destructive'}
                      >
                        {volunteer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Select
                          value={volunteer.status}
                          onValueChange={(value) => handleStatusUpdate(volunteer._id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approve</SelectItem>
                            <SelectItem value="rejected">Reject</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-100"
                          onClick={() => handleDelete(volunteer._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;