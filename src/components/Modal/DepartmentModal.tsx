import React from 'react'

import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { AiFillFileAdd } from "react-icons/ai";


const FormSchema = z.object({
    name: z.string({
        message: "Name is required",
    }).min(3).max(100),
    email: z.string({
        message: "Email is required",
    }).email(),
    contact_number: z.string({
        message: "Contact number is required",
    }).min(11).max(11),
    address: z.string({
        message: "Address is required",
    }).min(10).max(100),
    status: z.string({
        message: "Status is required",
    }).min(3).max(20),
    tags: z.string({
        message: "Tags is required",
    }).min(3).max(50)
  })

export const DepartmentModal:React.FC = () => {

    const DepartmentForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            contact_number: "",
            address: "",
            status: "Active",
            tags: ""
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }
    

    return (
        <Dialog>
        <DialogTrigger className='font-sans bg-primary px-5 py-2 rounded-md text-white hover:bg-primary/80
        transition-all delay-75 ease-in-out flex items-center gap-2'>
          <AiFillFileAdd className='text-xl' />
          New Request
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>
                Fill up the form below to add a new department.
            </DialogDescription>
          </DialogHeader>
          <Form {...DepartmentForm}>
            <form onSubmit={DepartmentForm.handleSubmit(onSubmit)} className="space-y-5 w-full">
              <div className='flex items-center mt-5 gap-5'>
                <FormField
                    control={DepartmentForm.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel className='font-sans font-semibold mt-2'>Name</FormLabel>
                        <Input
                        id="name"
                        placeholder="Enter your name here"
                        className='border border-gray-400 rounded-md w-full p-2'
                        {...field}
                        />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={DepartmentForm.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel className='font-sans font-semibold mt-2'>Email</FormLabel>
                        <Input
                        id="email"
                        placeholder="Enter your email here"
                        className='border border-gray-400 rounded-md w-full p-2'
                        {...field}
                        />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className='flex items-center mt-5 gap-5'>
                <FormField
                    control={DepartmentForm.control}
                    name="contact_number"
                    render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel className='font-sans font-semibold mt-2'>Contact Number</FormLabel>
                        <Input
                        id="contact_number"
                        placeholder="Enter your contact number here"
                        className='border border-gray-400 rounded-md w-full p-2'
                        {...field}
                        />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={DepartmentForm.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel className='font-sans font-semibold mt-2'>Address</FormLabel>
                        <Input
                        id="address"
                        placeholder="Enter your address here"
                        className='border border-gray-400 rounded-md w-full p-2'
                        {...field}
                        />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className='flex items-center mt-5 gap-5'>
                <FormField
                    control={DepartmentForm.control}
                    name="status"
                    render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                        <FormLabel className='font-sans font-semibold mt-2'>Status</FormLabel>
                        <Input
                        id="status"
                        placeholder="Enter your status here"
                        className='border border-gray-400 rounded-md w-full p-2'
                        disabled
                        {...field}
                        />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                  control={DepartmentForm.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="font-sans font-semibold mt-2">Tags</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue>{field.value || "Select Tags"}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Police">Police</SelectItem>
                            <SelectItem value="Fire">Fire</SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
                />
                </div>
              <DialogFooter>
                <Button className='font-sans bg-primary px-5 py-2 rounded-md text-white hover:bg-primary/80
                  transition-all delay-75 ease-in-out flex items-center gap-2' type="submit">
                    Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}
