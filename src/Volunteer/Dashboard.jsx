import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const VolunteerDashboard = () => {
  const [volunteerData, setVolunteerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/volunteers/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVolunteerData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!volunteerData) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Volunteer Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1">{volunteerData.firstName} {volunteerData.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1">{volunteerData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1">{volunteerData.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  volunteerData.status === 'approved' ? 'bg-green-100 text-green-800' :
                  volunteerData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {volunteerData.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Profession</label>
              <p className="mt-1">{volunteerData.profession}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expertise</label>
              <p className="mt-1">{volunteerData.expertise}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <p className="mt-1">{volunteerData.experience} years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;