"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useLogin } from "../login-provider";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

interface LoginPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ open, setOpen }) => {
  const { setStatus } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
    setStatus("true");
    setOpen(false);
    toast.success('Logged in successfully')
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <h1 className="text-3xl text-center font-bold">Login Now</h1>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
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
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center gap-3 items-center">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginPage;
