
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, FileDown } from "lucide-react";

// Sample data for past orders
const pastOrders = [
  {
    id: "ORD-1001",
    customer: "Rebecca Martinez",
    property: "Sunny Beach House",
    room: "Ocean View Suite",
    date: "2025-04-10",
    endDate: "2025-04-15",
    amount: "$1,400.00",
    status: "completed",
  },
  {
    id: "ORD-1002",
    customer: "David Wilson",
    property: "Mountain Cabin",
    room: "Deluxe Room",
    date: "2025-04-05",
    endDate: "2025-04-09",
    amount: "$950.00",
    status: "completed",
  },
  {
    id: "ORD-1003",
    customer: "Sarah Thompson",
    property: "Downtown Loft",
    room: "Studio Apartment",
    date: "2025-03-28",
    endDate: "2025-04-02",
    amount: "$870.00",
    status: "completed",
  },
  {
    id: "ORD-1004",
    customer: "Thomas Anderson",
    property: "Lakeside Retreat",
    room: "Family Suite",
    date: "2025-03-22",
    endDate: "2025-03-27",
    amount: "$1,600.00",
    status: "refunded",
  },
  {
    id: "ORD-1005",
    customer: "Jennifer Lewis",
    property: "Urban Penthouse",
    room: "Executive Suite",
    date: "2025-03-18",
    endDate: "2025-03-21",
    amount: "$1,250.00",
    status: "completed",
  },
  {
    id: "ORD-1006",
    customer: "Robert Clark",
    property: "Countryside Villa",
    room: "Master Bedroom",
    date: "2025-03-15",
    endDate: "2025-03-18",
    amount: "$890.00",
    status: "cancelled",
  },
  {
    id: "ORD-1007",
    customer: "Emily Davis",
    property: "Beachfront Resort",
    room: "Premium Suite",
    date: "2025-03-10",
    endDate: "2025-03-15",
    amount: "$1,800.00",
    status: "completed",
  },
];

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredOrders = pastOrders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchLower) ||
      order.property.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower);
    
    if (statusFilter === "all") {
      return matchesSearch;
    }
    
    return matchesSearch && order.status === statusFilter;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
        <p className="text-muted-foreground">View and manage your past bookings and transactions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Past Orders</CardTitle>
          <CardDescription>You have {pastOrders.length} past bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search order history..."
                  className="pl-8 w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileDown className="h-4 w-4" /> Export History
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
                  <TableHead>Stay Period</TableHead>
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
                    <TableCell>
                      <div>{order.property}</div>
                      <div className="text-xs text-muted-foreground">{order.room}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{order.date}</div>
                      <div className="text-xs text-muted-foreground">to {order.endDate}</div>
                    </TableCell>
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
                          <DropdownMenuItem>Download invoice</DropdownMenuItem>
                          <DropdownMenuItem>Create similar booking</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
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
