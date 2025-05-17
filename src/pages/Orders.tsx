
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, FileDown, Filter } from "lucide-react";

// Sample data
const orders = [
  {
    id: "ORD-1234",
    customer: "John Smith",
    property: "Oceanview Villa",
    room: "Master Suite",
    date: "2025-05-15",
    amount: "$1,200.00",
    status: "confirmed",
  },
  {
    id: "ORD-1235",
    customer: "Emma Johnson",
    property: "Downtown Apartment",
    room: "Studio",
    date: "2025-05-16",
    amount: "$850.00",
    status: "pending",
  },
  {
    id: "ORD-1236",
    customer: "Michael Brown",
    property: "Mountain Retreat",
    room: "Family Room",
    date: "2025-05-17",
    amount: "$1,500.00",
    status: "confirmed",
  },
  {
    id: "ORD-1237",
    customer: "Sophia Williams",
    property: "City Loft",
    room: "Executive Suite",
    date: "2025-05-18",
    amount: "$950.00",
    status: "cancelled",
  },
  {
    id: "ORD-1238",
    customer: "James Jones",
    property: "Beachfront Condo",
    room: "Deluxe Room",
    date: "2025-05-19",
    amount: "$1,100.00",
    status: "confirmed",
  },
  {
    id: "ORD-1239",
    customer: "Isabella Davis",
    property: "Suburban House",
    room: "Guest Room",
    date: "2025-05-20",
    amount: "$780.00",
    status: "pending",
  },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.customer.toLowerCase().includes(searchLower) ||
      order.property.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower)
    );
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Manage your current orders and bookings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Orders</CardTitle>
          <CardDescription>You have {orders.length} active orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8 w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileDown className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.property}</TableCell>
                    <TableCell>{order.room}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)}`} variant="outline">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Update status</DropdownMenuItem>
                          <DropdownMenuItem>Contact customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
