import * as React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function AuthPage({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back!");
      onAuthSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: displayName },
        },
      });
      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email,
          display_name: displayName,
          role: "seller",
          points: 0,
        });
        if (profileError) console.error("Profile creation error:", profileError);
      }

      toast.success("Account created successfully!");
      onAuthSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex aspect-square size-16 items-center justify-center rounded-2xl bg-primary text-black font-serif italic text-2xl font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            I
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-serif italic tracking-tight text-primary">Imperium</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-1 font-bold">Global Asset Management</p>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 p-1 rounded-xl">
            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black text-xs uppercase tracking-widest font-bold h-10">Login</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black text-xs uppercase tracking-widest font-bold h-10">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-card border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-serif">Executive Access</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest opacity-40">Identity verification required</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest opacity-60">Corporate Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="executive@imperium.com"
                        className="pl-10 bg-white/5 border-white/5 focus:border-primary/50 transition-all rounded-xl h-11"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[10px] uppercase tracking-widest opacity-60">Security Key</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10 bg-white/5 border-white/5 focus:border-primary/50 transition-all rounded-xl h-11"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-[0.2em] text-xs h-12 rounded-xl transition-all shadow-lg shadow-primary/10" type="submit" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : "Establish Secure Link"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-card border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-serif">Onboard Entity</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest opacity-40">Register new asset manager</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-[10px] uppercase tracking-widest opacity-60">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        id="signup-name"
                        placeholder="Julian De Roche"
                        className="pl-10 bg-white/5 border-white/5 focus:border-primary/50 transition-all rounded-xl h-11"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-[10px] uppercase tracking-widest opacity-60">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        id="signup-email"
                        type="email"
                        className="pl-10 bg-white/5 border-white/5 focus:border-primary/50 transition-all rounded-xl h-11"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-[10px] uppercase tracking-widest opacity-60">Create Security Key</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/40" />
                      <Input
                        id="signup-password"
                        type="password"
                        className="pl-10 bg-white/5 border-white/5 focus:border-primary/50 transition-all rounded-xl h-11"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-[0.2em] text-xs h-12 rounded-xl transition-all shadow-lg shadow-primary/10" type="submit" disabled={isLoading}>
                    {isLoading ? "Provisioning..." : "Join Global Network"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="mt-8 text-center text-[9px] uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-center gap-2 font-bold">
          <ShieldCheck className="size-3 text-primary animate-pulse" /> 256-BIT ENCRYPTION ACTIVE
        </p>
      </motion.div>
    </div>
  );
}
