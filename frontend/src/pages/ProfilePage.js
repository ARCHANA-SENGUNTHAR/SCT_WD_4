import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>Loading profile...</p>;

 return (
  <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto', background: '#f7f7f7', borderRadius: '8px' }}>
    <h2>My Profile</h2>
    <p><strong>Name:</strong> {user.name || 'Not Available'}</p>
    <p><strong>Email:</strong> {user.email || 'Not Available'}</p>
  </div>
);
}

export default ProfilePage;
