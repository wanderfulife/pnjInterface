"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      // TODO: Implement authentication
      toast.success("Successfully logged in!")
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-8 p-4">
      <div className="space-y-2 text-center">
        <div className="inline-block rounded-lg bg-primary/10 p-4">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            Sign In
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto font-normal">
            Sign up
          </Button>
        </p>
      </div>
    </div>
  )
}