
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

export function Header({ toggleMobileSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="relative hidden md:flex items-center w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="w-full pl-9 bg-muted"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
