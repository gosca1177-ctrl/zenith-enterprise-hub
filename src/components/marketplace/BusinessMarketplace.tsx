import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { BusinessListing } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Building2, TrendingUp, ChartPie as PieChart, MessageSquare, Search } from "lucide-react";

export function BusinessMarketplace() {
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching businesses:", error);
      } else {
        setListings((data || []).map(item => ({
          id: item.id,
          sellerId: item.seller_id,
          businessName: item.business_name,
          description: item.description,
          price: item.price,
          monthlyRevenue: item.monthly_revenue,
          monthlyProfit: item.monthly_profit,
          createdAt: item.created_at,
        })));
      }
      setIsLoading(false);
    };

    fetchListings();

    const channel = supabase
      .channel("businesses-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "businesses" }, () => {
        fetchListings();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredListings = listings.filter(l =>
    l.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
        <div>
          <h2 className="text-4xl font-serif italic tracking-tight text-white mb-2">Asset Marketplace</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Acquire high-yield institutional grade assets</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary opacity-40" />
          <Input
            placeholder="Search portfolios..."
            className="pl-12 bg-white/5 border-white/5 focus:border-primary/50 transition-all rounded-full h-12 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredListings.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <BusinessCard listing={listing} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isLoading && filteredListings.length === 0 && (
        <div className="text-center py-20">
          <Building2 className="size-12 mx-auto text-muted-foreground opacity-20 mb-4" />
          <p className="text-muted-foreground font-serif italic">No businesses matching your criteria were found.</p>
        </div>
      )}
    </div>
  );
}

function BusinessCard({ listing }: { listing: BusinessListing }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login to contact the seller.");
      return;
    }

    setIsSending(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        buyer_id: user.id,
        buyer_email: user.email,
        seller_id: listing.sellerId,
        listing_id: listing.id,
        listing_name: listing.businessName,
        message: message,
      });
      if (error) throw error;
      toast.success("Inquiry sent successfully!");
      setMessage("");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to send inquiry.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="flex flex-col h-full bg-card border-white/5 rounded-2xl overflow-hidden hover:border-primary/20 transition-all group shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className="uppercase tracking-[0.2em] text-[8px] border-primary/30 text-primary bg-primary/5 h-5 px-3 rounded-full font-bold">Institutional</Badge>
          <div className="text-xl font-serif text-primary">€{listing.price.toLocaleString()}</div>
        </div>
        <CardTitle className="text-2xl font-serif italic group-hover:text-primary transition-colors text-foreground">{listing.businessName}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs opacity-50 font-sans h-10 mt-2">{listing.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-6">
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="space-y-1.5 border-l border-white/5 pl-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-40 flex items-center gap-1.5">
              <TrendingUp className="size-3" /> Monthly Yield
            </p>
            <p className="text-lg font-serif">€{(listing.monthlyRevenue || 0).toLocaleString()}</p>
          </div>
          <div className="space-y-1.5 border-l border-primary/20 pl-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary opacity-60 flex items-center gap-1.5">
              <PieChart className="size-3" /> Net Profit
            </p>
            <p className="text-lg font-serif text-emerald-500">€{(listing.monthlyProfit || 0).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-white/5 rounded-none h-14 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-black transition-all gap-2 border-t border-white/5">
              <MessageSquare className="size-3" /> Initialize Inquiry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-white/10 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif italic text-2xl">Security Protocol: Inquiry</DialogTitle>
              <DialogDescription className="text-xs uppercase tracking-widest opacity-40">
                Transmitting intent for <span className="text-primary font-bold">{listing.businessName}</span>
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContact}>
              <div className="space-y-4 py-6">
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[10px] uppercase tracking-widest opacity-60">Message Payload</Label>
                  <Textarea
                    id="message"
                    placeholder="Provide details of your acquisition criteria..."
                    className="min-h-[140px] bg-white/5 border-white/5 rounded-xl focus:border-primary/50 transition-all"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={isSending} className="w-full sm:w-auto bg-primary text-black font-bold uppercase tracking-widest text-xs h-12 rounded-xl">
                  {isSending ? "ENCRYPTING..." : "SEND SECURE MESSAGE"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
