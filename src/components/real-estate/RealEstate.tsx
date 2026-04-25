import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2, MapPin, Bed, Bath, Plus, Calendar, FileText, Share2, Workflow, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const properties = [
  { id: "1", title: "Luxury Penthouse", address: "Berlin, Mitte 10115", price: 1250000, type: "Residential", beds: 3, baths: 2, image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: "2", title: "Modern Tech Hub", address: "Munich, Isarvorstadt", price: 4500000, type: "Commercial", beds: 0, baths: 4, image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: "3", title: "Sustainable Eco-Villa", address: "Freiburg, Black Forest", price: 890000, type: "Residential", beds: 4, baths: 3, image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
];

export function RealEstate() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Real Estate Hub</h2>
          <p className="text-muted-foreground italic font-serif">Seamless transaction management from listing to closing.</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="size-4" />
            New Listing
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="size-4" />
            Viewings
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search by location, property type, or MLS ID..." className="pl-10" />
        </div>
        <Button variant="secondary" className="gap-2">
          <Share2 className="size-4" />
          MLS Sync
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-mono uppercase opacity-40">Active Listings</h3>
          <div className="space-y-4">
            {properties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex flex-col sm:flex-row overflow-hidden hover:ring-1 hover:ring-primary transition-all">
                  <div className="w-full sm:w-48 aspect-video sm:aspect-square shrink-0 overflow-hidden">
                    <img src={prop.image} className="object-cover w-full h-full" alt={prop.title} />
                  </div>
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge variant="outline" className="mb-2 uppercase text-[10px] tracking-widest">{prop.type}</Badge>
                        <CardTitle className="text-xl">{prop.title}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="size-3" />
                          {prop.address}
                        </p>
                      </div>
                      <div className="text-xl font-bold font-mono">€{(prop.price / 1000).toFixed(0)}k</div>
                    </div>

                    <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><Bed className="size-4" /> {prop.beds}</div>
                      <div className="flex items-center gap-1"><Bath className="size-4" /> {prop.baths}</div>
                      <Button variant="ghost" size="sm" className="ml-auto gap-2">
                        Details <ArrowUpRight className="size-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold font-mono uppercase opacity-40">Transaction Manager</h3>
          <Card className="bg-muted/30 border-dashed">
            <CardHeader>
              <CardTitle className="font-serif italic font-medium">Closing Pipeline</CardTitle>
              <CardDescription>Track documents and e-signatures in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { step: "Listing Agreement", status: "Completed", date: "2024-04-20" },
                { step: "Purchase Contract", status: "Awaiting Signature", date: "2024-04-22" },
                { step: "Escrow Deposit", status: "Pending", date: "2024-04-24" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded-full flex items-center justify-center ${doc.status === 'Completed' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{doc.step}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                  </div>
                  <Badge variant={doc.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px] uppercase font-bold">
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Open Document Vault</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="size-4 text-primary" />
                AI Market Analysis
              </CardTitle>
              <CardDescription>Powered by Gemini Engine</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground mb-4">
                "The current Berlin market shows a 4.2% uptick in luxury penthouse searches. Recommend targeting investors from Zurich and London for the Mitte properties."
              </p>
              <Button variant="secondary" size="sm" className="w-full">Generate Lead Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
