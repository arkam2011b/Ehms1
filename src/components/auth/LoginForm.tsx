import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Hotel, Lock, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const LoginForm = ({
  onSuccess = () => {},
  onError = () => {},
}: LoginFormProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For demo purposes, we'll use a simple validation
      // In a real app, you would authenticate against your backend or auth provider
      if (username === "admin" && password === "password") {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // If Supabase is configured, you would use:
        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email: username,
        //   password: password,
        // });
        // if (error) throw error;

        localStorage.setItem("isAuthenticated", "true");
        if (rememberMe) {
          localStorage.setItem("username", username);
        }

        onSuccess();
        navigate("/dashboard");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Hotel className="h-10 w-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Enterprise Hotel Management
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Remember me
              </Label>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm" type="button">
              Forgot password?
            </Button>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          <span>Demo credentials: </span>
          <span className="font-medium">admin / password</span>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          © 2023 Enterprise Hotel Management System. All rights reserved.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
