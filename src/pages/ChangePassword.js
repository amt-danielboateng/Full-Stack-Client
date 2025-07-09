import React,{useState} from 'react';
import axios from 'axios';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleChangePassword = async () => {
      try {
        const response = await axios.post('http://localhost:3001/auth/changepassword', {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }, {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        });
        setMessage(response.data);
      } catch (error) {
        setMessage(error.response.data);
      }
    };
  return (
    <div>
      <h1>Change Your Password</h1>
      <input type="password" placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)}/>
      <input type="password" placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)}/>
      <button onClick={handleChangePassword}>Save Changes</button>
    </div>
  )
}

export default ChangePassword
