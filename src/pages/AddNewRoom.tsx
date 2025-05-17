
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Sample properties data
const properties = [
  { id: "1", name: "Beach Resort" },
  { id: "2", name: "Mountain Villa" },
  { id: "3", name: "City Apartments" },
  { id: "4", name: "Countryside Retreat" },
  { id: "5", name: "Lakeside Lodge" },
];

// Room amenities
const amenities = [
  { id: "wifi", label: "WiFi" },
  { id: "tv", label: "TV" },
  { id: "ac", label: "Air Conditioning" },
  { id: "kitchen", label: "Kitchen" },
  { id: "balcony", label: "Balcony" },
  { id: "parking", label: "Free Parking" },
  { id: "pool", label: "Swimming Pool" },
  { id: "breakfast", label: "Breakfast Included" },
];

// Form validation schema
const formSchema = z.object({
  property: z.string({
    required_error: "Please select a property.",
  }),
  roomName: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
  roomType: z.string({
    required_error: "Please select a room type.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid price amount.",
  }),
  capacity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid capacity.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  amenities: z.array(z.string()).optional(),
  size: z.string().optional(),
  availability: z.string({
    required_error: "Please select availability status.",
  }),
});

export default function AddNewRoom() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amenities: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast.success("Room added successfully!");
      form.reset();
    }, 1500);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Room</h2>
        <p className="text-muted-foreground">Create a new room for your property.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Information</CardTitle>
          <CardDescription>
            Enter the details for the new room you want to add.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="property"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a property" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {properties.map((property) => (
                            <SelectItem key={property.id} value={property.id}>
                              {property.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Deluxe Ocean View" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard Room</SelectItem>
                          <SelectItem value="deluxe">Deluxe Room</SelectItem>
                          <SelectItem value="suite">Suite</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Night ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="199" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity (Guests)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Size (sq ft)</FormLabel>
                      <FormControl>
                        <Input placeholder="400" {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="booked">Booked</SelectItem>
                          <SelectItem value="maintenance">Under Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <FormLabel>Room Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the room and its features..."
                        className="resize-none h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="mb-2 block">Room Amenities</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {amenities.map((item) => (
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

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Room..." : "Add Room"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
