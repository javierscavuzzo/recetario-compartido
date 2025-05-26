import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setMessage("No autorizado");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
