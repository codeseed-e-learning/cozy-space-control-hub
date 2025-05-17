
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { LockIcon, CreditCard, Bell, User } from "lucide-react";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  
  const handleProfileUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Property Manager</CardDescription>
              <div className="mt-2 text-center">
                <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                <div className="text-sm text-muted-foreground">Account since May 2025</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Plan</span>
                <span className="text-sm font-medium">Pro Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Properties</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Rooms</span>
                <span className="text-sm font-medium">48</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Change Avatar</Button>
          </CardFooter>
        </Card>

        <div className="w-full md:w-2/3 space-y-6">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <User className="h-4 w-4" /> General
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <LockIcon className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" defaultValue="Doe Properties LLC" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleProfileUpdate} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Separator />
                  <div className="pt-2">
                    <h3 className="mb-2 text-lg font-medium">Two Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment methods.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Current Plan</h3>
                    <div className="flex items-center justify-between bg-muted p-4 rounded-md">
                      <div>
                        <div className="font-medium">Pro Plan</div>
                        <div className="text-sm text-muted-foreground">$49.99/month</div>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Payment Methods</h3>
                    <div className="flex items-center justify-between p-4 border rounded-md mb-2">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <div>
                          <div className="font-medium">Visa ending in 4242</div>
                          <div className="text-sm text-muted-foreground">Expires 05/2026</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["New Bookings", "Booking Updates", "Payment Confirmations", "System Alerts"].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div>
                          <div className="font-medium">{notification}</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications when {notification.toLowerCase()} occur.
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm">Email</Button>
                          <Button variant="outline" size="sm">SMS</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
