'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();

  const [serverErrors, setServerErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitLogic(data) {
    try {
      setLoading(true);
      setServerErrors('');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerErrors(result.message);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setServerErrors('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10'>
      <div className='w-full max-w-md'>
        <Card className="border-muted shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submitLogic)} className="space-y-6">
              <FieldGroup className="space-y-4">
                {/* Email Field */}
                <Field className="space-y-1.5">
                  <FieldLabel htmlFor='email' className="text-sm font-medium">Email address</FieldLabel>
                  <Input
                    id='email'
                    type='email'
                    placeholder='name@example.com'
                    className="h-10"
                    {...register('email', { required: 'Email is required' })}
                  />
                  <FieldError className="text-xs text-red-500 mt-1">
                    {errors.email && <span>{errors.email.message}</span>}
                  </FieldError>
                </Field>

                {/* Password Field */}
                <Field className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor='password' className="text-sm font-medium">Password</FieldLabel>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    placeholder='••••••••'
                    className="h-10"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                  <FieldError className="text-xs text-red-500 mt-1">
                    {errors.password && <span>{errors.password.message}</span>}
                  </FieldError>
                </Field>
              </FieldGroup>

              {/* Server Error Alert */}
              {serverErrors && (
                <div className='p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600 text-center font-medium dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400'>
                  {serverErrors}
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex flex-col gap-3'>
                <Button type='submit' className="w-full h-10 font-medium" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}