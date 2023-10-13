import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { reset, logout } from '../features/auth/authSlice'; // Import the logout action

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  // const handleLogout = () => {
  //   dispatch(logout()); // Dispatch the logout action
  //   navigate('/login'); // Redirect to the login page
  // };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Welcome {user && user.name}</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}

export default Dashboard;
