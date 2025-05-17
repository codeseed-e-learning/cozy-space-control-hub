
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Home as HomeIcon, ShoppingBag, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back to your property dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            30 Day Trial
          </Badge>
          <Badge className="bg-primary text-xs">Pro Plan</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              You had 265 bookings this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Deluxe Suite - Oceanfront", "Standard Room - City View", "Executive Suite"].map((room, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                    <HomeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{room}</div>
                    <div className="text-sm text-muted-foreground">Booking #{1000 + index} · May {13 + index}, 2025</div>
                  </div>
                  <div className="font-medium">${Math.floor(Math.random() * 300 + 100)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
            <CardDescription>Your properties are 85% occupied</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Beach Resort</div>
                  <div className="text-sm text-muted-foreground">92%</div>
                </div>
                <Progress value={92} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Mountain Villa</div>
                  <div className="text-sm text-muted-foreground">78%</div>
                </div>
                <Progress value={78} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">City Apartments</div>
                  <div className="text-sm text-muted-foreground">85%</div>
                </div>
                <Progress value={85} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <h3 className="font-medium">Attention Required</h3>
        </div>
        <p className="mt-2 text-sm">2 properties require maintenance attention. Visit the maintenance section for details.</p>
      </div>
    </div>
  );
}
