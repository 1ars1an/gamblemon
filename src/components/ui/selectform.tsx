import React from 'react';

import { redirect, useRouter } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'path';

const FormSchema = z.object({
  choice: z.string({
    required_error: 'Please select an email to display.',
  }),
});

export function SelectForm({
  formType,
  options,
  formSubmit,
}: {
  formType: string;
  options: string[];
  formSubmit: any;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      [formType === 'border' ? 'border_style' : 'rarity']:
        data.choice,
    };
    const jsonData = JSON.stringify(formattedData, null, 2);

    const response = await formSubmit(jsonData);
    if (!response) {
      console.log('api call failed, handling gracefully...');
      // instead of throwing an error, handle failure smoothly
      throw redirect({
        to: '/app/login',
      });
    }

    console.log('API call succeeded:', response.data);
    await router.invalidate();
    return response.data;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="choice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`select a ${formType} to display`}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
