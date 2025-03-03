import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';
import { AuthForm } from '../../components/ui/authform';
import { formSchema } from '../../components/ui/authform';

export const Route = createFileRoute('/app/register')({
  component: RegisterForm,
});

function RegisterForm() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log('hi');
  }

  return (
    <>
      <div className="flex justify-center items-center bg-red-50 h-full">
        <AuthForm onSubmit={onSubmit}></AuthForm>
      </div>
    </>
  );
}
