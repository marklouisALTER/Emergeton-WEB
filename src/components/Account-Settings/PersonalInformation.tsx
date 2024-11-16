import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LiaUserEditSolid } from "react-icons/lia";
import { toast, Toaster } from 'sonner'
import { useAccountStore } from '@/store/Accounts/useAccountStore'


const FormSchema = z.object({
    firstname: z.string()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(50, { message: "First name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters and spaces." }),

    lastname: z.string()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(50, { message: "Last name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters and spaces." }),

    email: z.string()
        .email({ message: "Enter a valid email address." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
});

const PersonalInformation:React.FC = () => {

    const [isEditable, setIsEditable] = useState(true);
    const { user } = useAccountStore();
    const formProps = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        // setIsEditable((prevState) => !prevState)
        toast.success('Changes saved successfully')
    }

    return (
        <section className='w-full'>
        <Toaster position='bottom-right' />
        <div className='grid grid-cols-2 '>
            <div className='col-span-1'>             
                <h1 className='font-sans text-lg font-semibold text-black/90'>General Information</h1>
            </div>
            <div className='col-span-1'>
                <div className='flex justify-end'>
                    <Button 
                        onClick={() => setIsEditable((state) => !state)}
                        type='primary' 
                        className='bg-primary text-white px-4 py-2 rounded-md'
                    >
                        <LiaUserEditSolid className='text-lg'/>
                        {isEditable ? 'Edit' : 'Cancel'}
                    </Button>
                </div>
            </div>  
        </div>
        <Form {...formProps}>
            <form onSubmit={formProps.handleSubmit(onSubmit) } className='space-y-3 mt-5'>
                <div className='grid grid-cols-2 gap-x-5'>
                    <FormField
                        control={formProps.control}
                        name='firstname'
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel className='text-black font-medium font-sans'>First Name</FormLabel>
                                <FormControl>
                                    <Input className='border border-gray-300 shadow-sm bg-white' placeholder='Input the first name' {...field} disabled={isEditable} />
                                </FormControl>
                                <FormDescription className='text-gray-400 font-sans text-sm mt-2'>
                                    Enter the first name of employee.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formProps.control}
                        name='lastname'
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel className='text-black font-medium font-sans'>Last Name</FormLabel>
                                <FormControl>
                                    <Input className='border border-gray-300 shadow-sm bg-white' placeholder='Input the last name' {...field} disabled={isEditable} />
                                </FormControl>
                                <FormDescription className='text-gray-400 font-sans text-sm mt-2'>
                                    Enter the last name of employee.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={formProps.control}
                        name='email'
                        render={({ field}) => (
                            <FormItem>
                                <FormLabel className='text-black font-medium font-sans'>Email</FormLabel>
                                <FormControl>
                                    <Input className='border border-gray-300 shadow-sm bg-white' placeholder='Input the email' {...field} disabled={isEditable} />
                                </FormControl>
                                <FormDescription className='text-gray-400 font-sans text-sm mt-2'>
                                    Enter the email of employee.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {!isEditable && (
                    <div className='w-full flex items-center justify-end gap-3'>
                        <Button className='font-sans bg-gray-300 px-5 py-2 rounded-md text-white hover:bg-gray-300/80
                            transition-all delay-75 ease-in-out flex items-center gap-2' onClick={() => setIsEditable((prevState) => !prevState)}>
                            <span>Cancel</span>
                        </Button>
                        <Button className='font-sans bg-primary px-5 py-2 rounded-md text-white hover:bg-primary/80
                            transition-all delay-75 ease-in-out flex items-center gap-2' htmlType="submit">
                            <LiaUserEditSolid className='text-xl' />
                            <span>Save Changes</span>
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    </section>
    )
}

export default PersonalInformation