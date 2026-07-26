'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/admin');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#eee4ff', padding: 'clamp(40px, 10vw, 80px) clamp(12px, 4vw, 20px)' }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: 'clamp(24px, 6vw, 40px)',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      }}>
        <h1 style={{ color: '#463280', marginBottom: '20px', textAlign: 'center', fontSize: 'clamp(22px, 5vw, 28px)' }}>Admin Login</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bda6d8', fontSize: '16px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #bda6d8', fontSize: '16px' }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              background: '#463280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            Log In
          </button>
          {error && <p style={{ color: '#d33', margin: 0 }}>{error}</p>}
        </form>
      </div>
    </main>
  );
}