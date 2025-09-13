"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import '../styles/auth.css';

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const sendOTP = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setEmail(data.email);
        setStep('otp');
        reset();
      } else {
        setError(result.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: data.otp }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        setError(result.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'email') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login to Manage Schools</h2>
          <p className="auth-description">
            Enter your email address to receive a one-time password
          </p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit(sendOTP)}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="auth-button">
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <p className="auth-description">
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit(verifyOTP)}>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="000000"
              maxLength="6"
              {...register('otp', {
                required: 'OTP is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'OTP must be 6 digits',
                },
              })}
            />
            {errors.otp && (
              <span className="error">{errors.otp.message}</span>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="auth-footer">
          <button 
            type="button" 
            onClick={resendOTP} 
            disabled={isLoading}
            className="resend-button"
          >
            Resend OTP
          </button>
          <button 
            type="button" 
            onClick={() => setStep('email')} 
            className="back-button"
          >
            ← Back to Email
          </button>
        </div>
      </div>
    </div>
  );
}
