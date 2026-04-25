import * as React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Mail, Lock, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black/50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex flex-col items-center gap-6 mb-12">
            <motion.div
              className="flex aspect-square size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-black font-serif italic text-4xl font-bold shadow-2xl shadow-primary/30 border border-primary/50"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              I
            </motion.div>
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-serif italic tracking-tight text-white font-bold">Imperium</h1>
              <p className="text-primary font-bold text-sm uppercase tracking-[0.2em]">Global Asset Management</p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] opacity-60 mt-1">Enterprise-Grade Portfolio Ecosystem</p>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 p-1.5 rounded-xl border border-white/10">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black text-xs uppercase tracking-widest font-bold h-11 transition-all">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black text-xs uppercase tracking-widest font-bold h-11 transition-all">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                <Card className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg">
                  <CardHeader className="text-center pb-3 bg-gradient-to-r from-primary/10 to-transparent border-b border-white/5">
                    <CardTitle className="text-xl font-serif font-bold text-white">Executive Access</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Identity verification required</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-5 pt-6">
                      <div className="space-y-2.5">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Corporate Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="executive@imperium.com"
                            className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 transition-all rounded-xl h-11 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="password" className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Security Key</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="password"
                            type="password"
                            className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 transition-all rounded-xl h-11 text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pb-6 pt-2">
                      <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-black font-bold uppercase tracking-[0.15em] text-xs h-12 rounded-xl transition-all shadow-lg shadow-primary/20 gap-2" type="submit" disabled={isLoading}>
                        {isLoading ? "Authenticating..." : <>Establish Link <ArrowRight className="size-3" /></>}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="signup">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                <Card className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg">
                  <CardHeader className="text-center pb-3 bg-gradient-to-r from-primary/10 to-transparent border-b border-white/5">
                    <CardTitle className="text-xl font-serif font-bold text-white">Onboard Entity</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Register new asset manager</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSignUp}>
                    <CardContent className="space-y-5 pt-6">
                      <div className="space-y-2.5">
                        <Label htmlFor="signup-name" className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="signup-name"
                            placeholder="Julian De Roche"
                            className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 transition-all rounded-xl h-11 text-sm"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="signup-email" className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="signup-email"
                            type="email"
                            className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 transition-all rounded-xl h-11 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="signup-password" className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">Create Security Key</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="signup-password"
                            type="password"
                            className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 transition-all rounded-xl h-11 text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pb-6 pt-2">
                      <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-black font-bold uppercase tracking-[0.15em] text-xs h-12 rounded-xl transition-all shadow-lg shadow-primary/20 gap-2" type="submit" disabled={isLoading}>
                        {isLoading ? "Provisioning..." : <>Join Network <ArrowRight className="size-3" /></>}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-white/5 space-y-3 text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-center gap-2 font-bold">
              <ShieldCheck className="size-3 text-primary animate-pulse" /> 256-BIT ENCRYPTION ACTIVE
            </p>
            <div className="flex items-center justify-center gap-2 text-[9px] text-muted-foreground/70">
              <CheckCircle2 className="size-3 text-emerald-500" />
              <span>SSL/TLS Secured</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-4 py-6 text-center border-t border-white/5">
        <p className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.2em] font-bold">Powered by Zenith Enterprise Hub v1.0</p>
      </div>
    </div>
  );
}
