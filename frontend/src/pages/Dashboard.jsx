import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import CsvUploader from '../components/CsvUploader';
import SmsStatus from '../components/SmsStatus';
import Notification from '../components/Notification';

const Dashboard = () => {
  const [stats, setStats] = useState({ queued: 0, sent: 0, failed: 0 });
  const [notif, setNotif] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/sms/status');
        setStats(response.data);
      } catch (error) {
        setNotif({ message: 'Failed to fetch SMS status.', type: 'error' });
      }
    };

    fetchStats();
  }, []);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/import/csv', formData);
      setNotif({ message: 'CSV uploaded successfully!', type: 'success' });
      // Optionally, refetch stats or other data
    } catch (error) {
      setNotif({ message: 'CSV upload failed.', type: 'error' });
    }
  };

  return (
    <Layout>
      <h2>Dashboard</h2>
      <Notification message={notif.message} type={notif.type} />
      <CsvUploader onUpload={handleUpload} />
      <SmsStatus stats={stats} />
    </Layout>
  );
};

export default Dashboard;