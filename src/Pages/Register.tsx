import React, { startTransition, useState } from 'react';
import { Stack, Typography, Button, Alert } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import InputComponent from '../reUsableComponents/InputComponent';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/userAuth';
import { AxiosError } from 'axios';
import { useAuth } from '../Context/AuthProvider';
const validationSchema = Yup.object({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface Data {
  email: string;
  password: string;
  username: string;
}

const Register: React.FC = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (data: Data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await registerUser(data);
      if (res) {
        const { token, safeUser } = res.data.data;
        login(token, safeUser.id);

        startTransition(() => {
          navigate('/');
        });
      } else {
        setErrorMessage('Unexpected error occurred.');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const serverMessage = (axiosError.response?.data as { message?: string })?.message || 'Server error';
        setErrorMessage(serverMessage);
      } else if (axiosError.request) {
        setErrorMessage('Network error: No response received.');
      } else {
        setErrorMessage('Unexpected error: ' + axiosError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      spacing={2}
      alignContent={'center'}
      justifyContent={'center'}
      sx={{
        backgroundColor: '#fff',
        padding: '30px 8px',
        borderRadius: 2,
        width: '100%',
        maxWidth: '450px',
        margin: '0px auto',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', color: 'black' }}>
        Register
      </Typography>

      {/* ✅ Error Message UI */}
      {errorMessage && (
        <Alert severity="error" sx={{ maxWidth: '300px', margin: 'auto' }}>
          {errorMessage}
        </Alert>
      )}

      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {() => (
          <Form>
            <Stack spacing={2} sx={{ maxWidth: '300px', margin: 'auto' }}>
              <InputComponent id="username" label="Name" placeholder="Please enter name" />
              <InputComponent id="email" label="Email" placeholder="Please enter email address" />
              <InputComponent id="password" type='password' label="Password" placeholder="Please enter password" />

              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                style={{ width: 'fit-content', margin: 'auto', marginTop: '24px' }}
              >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
              <Link to="/login" style={{ textAlign: 'center' }}>
                Already have Account ? Login.
              </Link>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default Register;
