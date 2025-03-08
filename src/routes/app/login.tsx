import React from 'react';
import {
  createFileRoute,
  Link,
  useNavigate,
  useLocation,
} from '@tanstack/react-router';

import { useAuth } from '../../auth';

import { z } from 'zod';
import { AuthForm } from '../../components/ui/authform';
import { formSchema } from '../../components/ui/authform';

export const Route = createFileRoute('/app/login')({
  component: ProfileForm,
});

function ProfileForm() {
  const navigate = useNavigate({ from: '/app/login' });
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/app/user';

  const auth = useAuth();
  const [formError, setFormError] = React.useState<string>('');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    try {
      await auth.login(username, password);
      setFormError('');
      navigate({ to: redirectTo });
    } catch (error) {
      setFormError('Invalid Username/Password');
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-red-50 h-full">
        <AuthForm
          onSubmit={onSubmit}
          formError={formError}
        ></AuthForm>
        <div>
          <Link to="/app/register">New User? Register Now!</Link>
        </div>
      </div>
    </>
  );
}
