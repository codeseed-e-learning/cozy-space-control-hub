
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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Building, Upload, MapPin, DollarSign, Star, Info, Plane } from "lucide-react";

// Property amenities options
const propertyAmenities = [
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Fitness Center" },
  { id: "parking", label: "Free Parking" },
  { id: "restaurant", label: "Restaurant" },
  { id: "bar", label: "Bar/Lounge" },
  { id: "wifi", label: "Free WiFi" },
  { id: "airportShuttle", label: "Airport Shuttle" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "spa", label: "Spa Services" },
  { id: "roomService", label: "24h Room Service" },
  { id: "beach", label: "Beach Access" },
  { id: "businessCenter", label: "Business Center" },
];

// Form validation schema
const propertySchema = z.object({
  name: z.string().min(3, {
    message: "Property name must be at least 3 characters.",
  }),
  type: z.string({
    required_error: "Please select a property type.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  city: z.string().min(2, {
    message: "Please enter a valid city name.",
  }),
  state: z.string().min(2, {
    message: "Please enter a valid state.",
  }),
  zip: z.string().min(3, {
    message: "Please enter a valid zip/postal code.",
  }),
  country: z.string().min(2, {
    message: "Please enter a valid country.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  amenities: z.array(z.string()).optional(),
  checkInTime: z.string().min(1, {
    message: "Please specify check-in time.",
  }),
  checkOutTime: z.string().min(1, {
    message: "Please specify check-out time.",
  }),
  hasPolicies: z.boolean().default(false),
  policies: z.string().optional(),
});

export default function AddNewProperty() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      amenities: [],
      hasPolicies: false,
    },
  });

  const watchHasPolicies = form.watch("hasPolicies");

  function onSubmit(values: z.infer<typeof propertySchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast.success("Property added successfully!");
      form.reset();
      setActiveTab("details");
    }, 1500);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
        <p className="text-muted-foreground">Create a new property listing for your portfolio.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle>Property Information</CardTitle>
          </div>
          <CardDescription>
            Fill in the details about your new property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">
                    <Info className="h-4 w-4 mr-2" /> Details
                  </TabsTrigger>
                  <TabsTrigger value="location">
                    <MapPin className="h-4 w-4 mr-2" /> Location
                  </TabsTrigger>
                  <TabsTrigger value="amenities">
                    <Star className="h-4 w-4 mr-2" /> Amenities & Policies
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Oceanview Resort & Spa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Property Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4"
                            >
                              {["Hotel", "Villa", "Apartment", "Resort", "Hostel", "Vacation Home"].map((type) => (
                                <FormItem key={type} className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={type.toLowerCase()} />
                                  </FormControl>
                                  <FormLabel className="font-normal">{type}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your property, its unique features, and what guests can expect..."
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="checkInTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="checkOutTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-out Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("location")}>
                      Next: Location
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Ocean Drive" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Miami" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="Florida" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="33139" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-4 border rounded-md bg-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">Map Location</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive map will be available here to pinpoint your property location.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" /> Upload Property Images
                    </Button>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                      Previous: Details
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("amenities")}>
                      Next: Amenities & Policies
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="space-y-6 pt-4">
                  <div>
                    <FormLabel className="mb-3 block">Property Amenities</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {propertyAmenities.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="amenities"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = [...(field.value || [])];
                                    if (checked) {
                                      field.onChange([...currentValues, item.id]);
                                    } else {
                                      field.onChange(currentValues.filter((value) => value !== item.id));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="hasPolicies"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Add property policies</FormLabel>
                        </FormItem>
                      )}
                    />

                    {watchHasPolicies && (
                      <FormField
                        control={form.control}
                        name="policies"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Describe property policies, rules, cancellation policy, etc..."
                                className="resize-none h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("location")}>
                      Previous: Location
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding Property..." : "Add Property"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
