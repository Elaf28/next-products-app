'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientPage() {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/hello');
        setData(res.data);
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className='flex min-h-screen items-center justify-center p-4 bg-muted/40'>
        <Card className='w-full max-w-md shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold tracking-tight'>
              API Data Fetcher
            </CardTitle>
            <CardDescription>
              Fetching data from your local Next.js endpoint.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            {/* Loading State */}
            {loading && (
              <div className='space-y-3'>
                <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                  <Loader2 className='h-4 w-4 animate-spin text-primary' />
                  <span>Loading resources...</span>
                </div>
                <Skeleton className='h-12 w-full rounded-lg' />
              </div>
            )}

            {/* Error State */}
            {errors && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors}</AlertDescription>
              </Alert>
            )}

            {/* Data State */}
            {!loading && data && (
              <div className='rounded-lg border bg-card p-4 text-card-foreground shadow-sm'>
                <span className='text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2'>
                  Response Data
                </span>
                <p className='text-sm font-medium text-foreground'>
                  {typeof data === 'object' ? data.message || JSON.stringify(data) : data}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
