import React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../auth';

import { z } from 'zod';
import { AuthForm } from '../../components/ui/authform';
import { formSchema } from '../../components/ui/authform';

export const Route = createFileRoute('/app/register')({
  component: RegisterForm,
});

function RegisterForm() {
  const navigate = useNavigate({ from: '/app/register' });
  const auth = useAuth();
  let [formError, setFormError] = React.useState<string>('');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    try {
      await auth.register(username, password);
      setFormError('');
      navigate({ to: '/app/login' });
      // Handle successful registration, e.g., navigate to a different page or show a success message
    } catch (error) {
      // Handle registration failure, e.g., show an error message to the user
      setFormError('Username Taken!');
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-red-50 h-full">
        <AuthForm
          onSubmit={onSubmit}
          formError={formError}
        ></AuthForm>
      </div>
    </>
  );
}
