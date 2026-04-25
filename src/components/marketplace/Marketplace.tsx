import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Tag, Star, LayoutGrid, List, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

const products = [
  { id: "1", name: "Zenith Game Engine", price: 1999, category: "software", rating: 4.8, reviews: 124, image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" },
  { id: "2", name: "Cyberpunk Asset Pack", price: 49, category: "asset", rating: 4.5, reviews: 850, image: "https://images.pexels.com/photos/2580430/pexels-photo-2580430.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" },
  { id: "3", name: "RPG Quest Builder", price: 89, category: "software", rating: 4.9, reviews: 56, image: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" },
  { id: "4", name: "Lo-Fi Music Pack", price: 29, category: "asset", rating: 4.7, reviews: 231, image: "https://images.pexels.com/photos/13880/pexels-photo-13880.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" },
  { id: "5", name: "Space Shooter Source", price: 150, category: "game", rating: 4.2, reviews: 12, image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" },
  { id: "6", name: "Advanced AI Chatbot", price: 299, category: "software", rating: 4.6, reviews: 89, image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" },
];

export function Marketplace() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
          <p className="text-muted-foreground italic font-serif">Discover and trade premium digital assets.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
          <Button variant="ghost" size="icon"><List className="size-4" /></Button>
        </div>
      </div>

      <Tabs defaultValue="storefront" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="storefront">Storefront</TabsTrigger>
          <TabsTrigger value="seller-dashboard">Seller Hub</TabsTrigger>
          <TabsTrigger value="escrow">Escrow Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="storefront" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search products, software, games..." className="pl-10" />
            </div>
            <Button className="gap-2">
              <ShoppingCart className="size-4" />
              Cart (0)
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all border-none shadow-sm bg-muted/20">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border-none">
                      {product.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors cursor-pointer capitalize">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        {product.rating}
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      Premium {product.category} built with high performance and quality code standards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Tag className="size-3 text-muted-foreground" />
                      <div className="flex gap-1">
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Verified</Badge>
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Trending</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t bg-background/50 p-6">
                    <div className="text-2xl font-bold font-mono">
                      €{product.price}
                    </div>
                    <Button variant="default" className="rounded-full px-6">Buy Now</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seller-dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Seller Dashboard</CardTitle>
              <CardDescription>Manage your products, sales, and analytics.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-4">
                <BarChart3 className="size-12 mx-auto opacity-20" />
                <p>Commission tracking and deep analytics loading...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
