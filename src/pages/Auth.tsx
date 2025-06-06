
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';

// Define form schemas
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be less than 20 characters' })
    .regex(/^[a-z0-9_]+$/, { message: 'Username can only contain lowercase letters, numbers and underscores' }),
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: ''
    }
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await signIn(data.email, data.password);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await signUp(data.email, data.password, {
        username: data.username,
        full_name: data.fullName
      });
      toast.success('Account created successfully! Please check your email to confirm your account.');
    } catch (error: any) {
      console.error('Signup error:', error);
      setAuthError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <SidebarProvider>
    //   <AppSidebar />
    //     <div className="flex-1 flex flex-col min-h-screen">
    //       <AppHeader />
<div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-slate-100 to-blue-100 flex items-center justify-center px-4 overflow-hidden">
  {/* Decorative floating icons */}
  <div className="absolute top-10 left-10 text-blue-300 animate-float-slow">
    <Mail className="w-10 h-10" />
  </div>
  <div className="absolute bottom-14 right-10 text-purple-300 animate-float-slower">
    <User className="w-8 h-8" />
  </div>
  <div className="absolute top-[60%] left-[75%] text-indigo-200 animate-float-slowest">
    <Lock className="w-12 h-12" />
  </div>

  {/* Subtle grid overlay */}
  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-0" />

  {/* Auth Box */}
  <div className="relative z-10 w-full max-w-2xl rounded-3xl shadow-2xl bg-white border border-slate-200 overflow-hidden">
    <div className="text-center p-8 border-b">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
        <span className="rounded-lg bg-green-700 px-3 py-1 text-white">Comm</span>
        <span className="text-slate-700">Unity</span>
      </h1>
      <p className="text-slate-500 mt-3 text-sm">Connect communities for collaborative problem solving</p>
    </div>

    <Tabs defaultValue="login" className="px-8 py-6">
      <TabsList className="grid grid-cols-2 bg-slate-100 rounded-lg mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* Login Form */}
      <TabsContent value="login">
        <Card className="shadow-none border-0">
          <CardHeader>
            <CardTitle className="text-xl">Welcome back 👋</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Error Alert */}
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                {/* Email */}
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                      <div className="relative">
    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="your.email@example.com"
      className="pl-10"
      {...field}
                        />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isShowingPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setIsShowingPassword(!isShowingPassword)}
                          >
                            {isShowingPassword ? <EyeOff /> : <Eye />}
                            <span className="sr-only">
                              {isShowingPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full bg-green-700 hover:bg-purple-800" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Signup Form */}
      <TabsContent value="signup">
        <Card className="shadow-none border-0">
          <CardHeader>
            <CardTitle className="text-xl">Join the movement 🚀</CardTitle>
            <CardDescription>Create your account now</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Error Alert */}
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                {/* Username */}
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                      <div className="relative">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="username"
            className="pl-10"
            {...field}
          />
        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Full Name */}
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                      <div className="relative">
  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="your name"
    className="pl-10"
    {...field}
  />
</div>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                      <div className="relative">
  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="your.email@example.com"
    className="pl-10"
    {...field}
  />
</div>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isShowingPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setIsShowingPassword(!isShowingPassword)}
                          >
                            {isShowingPassword ? <EyeOff /> : <Eye />}
                            <span className="sr-only">
                              {isShowingPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full bg-green-700 hover:bg-purple-800" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            By signing up, you agree to our Terms and Privacy Policy.
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</div>

    // </SidebarProvider>

  );
};

export default Auth;
