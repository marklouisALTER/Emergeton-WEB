import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ChangePasswordFormSchema = z.object({
  currentPassword: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long'),

  newPassword: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .regex(passwordStrengthRegex, 'Password must include at least one uppercase letter, one number, and one special character'),

  confirmPassword: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], // Specify the field where the error should appear
});
export const ChangePassword:React.FC = () => {

    const formProps = useForm<z.infer<typeof ChangePasswordFormSchema>>({
        resolver: zodResolver(ChangePasswordFormSchema),
       })

  return (
    <section className='w-full'>
    <h1 className='font-sans text-lg font-semibold text-black/90'>Change Password</h1>
    <div className='mt-5 w-3/4'>
        <Form {...formProps}>
          <form onSubmit={formProps.handleSubmit(data => console.log(data))} className='space-y-3 mt-5'>
            <FormField
              control={formProps.control}
              name='currentPassword'
              render={({ field}) => (
                <FormItem>
                  <FormLabel htmlFor='currentPassword' className='text-black font-medium font-sans'>Current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='Enter your current password' className='border border-gray-300 shadow-sm bg-white' />  
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formProps.control}
              name='newPassword'
              render={({ field}) => (
                <FormItem>
                  <FormLabel htmlFor='newPassword' className='text-black font-medium font-sans'>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='Enter your new password' className='border border-gray-300 shadow-sm bg-white'/>  
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formProps.control}
              name='confirmPassword'
              render={({ field}) => (
                <FormItem>
                  <FormLabel htmlFor='confirmPassword' className='text-black font-medium font-sans'>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='Confirm your new password' className='border border-gray-300 shadow-sm bg-white'/>  
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <button type='submit' className='bg-primary text-white font-sans font-medium py-2 px-4 rounded-md'>Change Password</button>
          </form>
        </Form>
    </div>
</section>
  )
}
