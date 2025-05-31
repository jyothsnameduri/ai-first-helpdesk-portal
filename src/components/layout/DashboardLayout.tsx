import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Menu,
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  Home,
  Ticket,
  Users,
  BarChart3,
  MessageSquare,
  X,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', href: '/dashboard' },
      { icon: Ticket, label: 'My Tickets', href: '/dashboard/tickets' },
      { icon: MessageSquare, label: 'AI Chat', href: '/dashboard/chat' },
    ];

    if (userProfile?.role === 'agent') {
      return [
        ...baseItems,
        { icon: Users, label: 'Ticket Queue', href: '/dashboard/queue' },
        { icon: BarChart3, label: 'Performance', href: '/dashboard/performance' },
      ];
    }

    if (userProfile?.role === 'admin') {
      return [
        ...baseItems,
        { icon: Users, label: 'User Management', href: '/dashboard/users' },
        { icon: Settings, label: 'System Settings', href: '/dashboard/settings' },
        { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'agent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">HelpDesk AI</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userProfile?.avatar} alt={userProfile?.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {userProfile?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{userProfile?.name}</p>
              <Badge className={`text-xs ${getRoleColor(userProfile?.role || '')}`}>
                {userProfile?.role?.charAt(0).toUpperCase() + userProfile?.role?.slice(1)}
              </Badge>
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center space-x-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tickets, users..."
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile?.avatar} alt={userProfile?.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                      {userProfile?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium text-slate-700">
                    {userProfile?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userProfile?.name}</p>
                    <p className="text-xs text-slate-500">{userProfile?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
