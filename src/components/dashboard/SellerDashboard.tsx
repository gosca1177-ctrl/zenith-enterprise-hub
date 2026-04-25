import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { BusinessListing, Inquiry } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Building2, Plus, MessageSquare, Trash2, Mail, Calendar, Euro } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SellerDashboard() {
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isListingLoading, setIsListingLoading] = useState(true);
  const [isInquiryLoading, setIsInquiryLoading] = useState(true);

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyProfit, setMonthlyProfit] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: bizData } = await supabase
        .from("businesses")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      setListings((bizData || []).map(item => ({
        id: item.id,
        sellerId: item.seller_id,
        businessName: item.business_name,
        description: item.description,
        price: item.price,
        monthlyRevenue: item.monthly_revenue,
        monthlyProfit: item.monthly_profit,
        createdAt: item.created_at,
      })));
      setIsListingLoading(false);

      const { data: inqData } = await supabase
        .from("inquiries")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      setInquiries((inqData || []).map(item => ({
        id: item.id,
        buyerId: item.buyer_id,
        sellerId: item.seller_id,
        listingId: item.listing_id,
        listingName: item.listing_name,
        message: item.message,
        buyerEmail: item.buyer_email,
        createdAt: item.created_at,
      })));
      setIsInquiryLoading(false);
    };

    fetchData();
  }, []);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setIsCreating(true);
    try {
      const { error } = await supabase.from("businesses").insert({
        seller_id: user.id,
        business_name: businessName,
        description,
        price: parseFloat(price),
        monthly_revenue: parseFloat(monthlyRevenue),
        monthly_profit: parseFloat(monthlyProfit),
      });
      if (error) throw error;
      toast.success("Business listed successfully!");
      setBusinessName("");
      setDescription("");
      setPrice("");
      setMonthlyRevenue("");
      setMonthlyProfit("");
      // Refresh
      const { data } = await supabase.from("businesses").select("*").eq("seller_id", user.id).order("created_at", { ascending: false });
      setListings((data || []).map(item => ({
        id: item.id, sellerId: item.seller_id, businessName: item.business_name, description: item.description, price: item.price, monthlyRevenue: item.monthly_revenue, monthlyProfit: item.monthly_profit, createdAt: item.created_at,
      })));
    } catch (error) {
      toast.error("Failed to create listing.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteListing = async (id: string) => {
    try {
      const { error } = await supabase.from("businesses").delete().eq("id", id);
      if (error) throw error;
      toast.success("Listing removed.");
      setListings(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      toast.error("Failed to delete listing.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Seller Command Center</h2>
        <p className="text-muted-foreground italic font-serif">Manage your enterprise portfolio and buyers.</p>
      </div>

      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="listings" className="gap-2"><Building2 className="size-4" /> My Listings</TabsTrigger>
          <TabsTrigger value="inquiries" className="gap-2"><MessageSquare className="size-4" /> Inquiries {inquiries.length > 0 && <Badge variant="secondary" className="ml-1 px-1.5 py-0">{inquiries.length}</Badge>}</TabsTrigger>
          <TabsTrigger value="create" className="gap-2"><Plus className="size-4" /> New Listing</TabsTrigger>
        </TabsList>

        <TabsContent value="listings">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {listings.map((listing) => (
                <motion.div key={listing.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{listing.businessName}</CardTitle>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteListing(listing.id)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold font-mono">€{listing.price.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {!isListingLoading && listings.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl opacity-50">
                  <Building2 className="size-8 mx-auto mb-2" />
                  <p>No active listings. Start by creating one.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Prospective Buyers</CardTitle>
              <CardDescription>Messages from authenticated investors.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="divide-y">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="space-y-1">
                          <p className="font-bold flex items-center gap-2"><Mail className="size-3" /> {inq.buyerEmail}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Regarding: {inq.listingName}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="size-3" /> {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-sm italic border-l-4 border-primary">
                        "{inq.message}"
                      </div>
                    </div>
                  ))}
                  {!isInquiryLoading && inquiries.length === 0 && (
                    <div className="p-12 text-center opacity-50 font-serif italic">
                      No inquiries yet. Assets awaiting market reaction.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>List Enterprise Asset</CardTitle>
              <CardDescription>Enter verified financial data for prospective buyers.</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateListing}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="biz-name">Business Name</Label>
                  <Input id="biz-name" placeholder="E.g. Zenith Tech Solutions" value={businessName} onChange={e => setBusinessName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-desc">Description</Label>
                  <Textarea id="biz-desc" placeholder="Provide a high-level overview of operations..." className="min-h-[100px]" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="biz-price">Asking Price (€)</Label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input id="biz-price" type="number" step="any" className="pl-10" value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-rev">Monthly Revenue (€)</Label>
                    <Input id="biz-rev" type="number" step="any" value={monthlyRevenue} onChange={e => setMonthlyRevenue(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-profit">Monthly Net Profit (€)</Label>
                  <Input id="biz-profit" type="number" step="any" value={monthlyProfit} onChange={e => setMonthlyProfit(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" type="submit" disabled={isCreating}>
                  {isCreating ? "Listing Asset..." : "Go Live on Marketplace"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
