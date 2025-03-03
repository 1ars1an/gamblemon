import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { z } from 'zod';
import { AuthForm } from '../../components/ui/authform';
import { formSchema } from '../../components/ui/authform';

export const Route = createFileRoute('/app/login')({
  component: ProfileForm,
});

function ProfileForm() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log('hi');
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-red-50 h-full">
        <AuthForm onSubmit={onSubmit}></AuthForm>
        <div>
          <Link to="/app/register">New User? Register Now!</Link>
        </div>
      </div>
    </>
  );
}
