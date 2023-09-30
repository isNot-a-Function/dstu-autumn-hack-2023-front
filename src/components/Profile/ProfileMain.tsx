import React, { useState, useEffect } from 'react';
import Input from '../UI/SearchInput';

const ProfileMain: React.FC = () => {
  const [value, setValue] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(value), 500);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return (
    <div className="container">
      <h2>ProfileMain</h2>
      <Input value={value} setValue={setValue} placeholder="Введите название предмета" />
      <h1>{displayMessage}</h1>
    </div>
  );
};

export default ProfileMain;
