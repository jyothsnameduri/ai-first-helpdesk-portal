
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  TicketIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Users,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();

  const getStatsCards = () => {
    if (user?.role === 'employee') {
      return [
        {
          title: 'My Open Tickets',
          value: '3',
          description: 'Active support requests',
          icon: TicketIcon,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
        },
        {
          title: 'Pending Response',
          value: '1',
          description: 'Awaiting your input',
          icon: Clock,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
        },
        {
          title: 'Resolved This Month',
          value: '12',
          description: 'Successfully closed',
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
        },
        {
          title: 'Avg. Resolution Time',
          value: '2.3 days',
          description: 'Your tickets average',
          icon: TrendingUp,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
        },
      ];
    }

    if (user?.role === 'agent') {
      return [
        {
          title: 'Assigned Tickets',
          value: '8',
          description: 'Currently working on',
          icon: TicketIcon,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
        },
        {
          title: 'Queue Length',
          value: '23',
          description: 'Unassigned tickets',
          icon: Clock,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
        },
        {
          title: 'Resolved Today',
          value: '5',
          description: 'Tickets closed',
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
        },
        {
          title: 'Response Time',
          value: '1.2 hrs',
          description: 'Average this week',
          icon: TrendingUp,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
        },
      ];
    }

    // Admin stats
    return [
      {
        title: 'Total Tickets',
        value: '156',
        description: 'This month',
        icon: TicketIcon,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        title: 'Active Users',
        value: '89',
        description: 'Registered employees',
        icon: Users,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        title: 'Urgent Tickets',
        value: '7',
        description: 'Requiring attention',
        icon: AlertCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
      },
      {
        title: 'SLA Compliance',
        value: '94%',
        description: 'Meeting targets',
        icon: TrendingUp,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
    ];
  };

  const getRecentActivity = () => {
    if (user?.role === 'employee') {
      return [
        {
          id: 1,
          title: 'Password reset request',
          status: 'In Progress',
          time: '2 hours ago',
          priority: 'Medium',
        },
        {
          id: 2,
          title: 'Software installation help',
          status: 'Resolved',
          time: '1 day ago',
          priority: 'Low',
        },
        {
          id: 3,
          title: 'Network connectivity issue',
          status: 'Pending',
          time: '3 days ago',
          priority: 'High',
        },
      ];
    }

    if (user?.role === 'agent') {
      return [
        {
          id: 1,
          title: 'John D. - Email not working',
          status: 'Assigned',
          time: '30 min ago',
          priority: 'High',
        },
        {
          id: 2,
          title: 'Sarah M. - Laptop performance',
          status: 'In Progress',
          time: '1 hour ago',
          priority: 'Medium',
        },
        {
          id: 3,
          title: 'Mike R. - VPN access',
          status: 'Resolved',
          time: '2 hours ago',
          priority: 'Low',
        },
      ];
    }

    return [
      {
        id: 1,
        title: 'System backup completed',
        status: 'Success',
        time: '1 hour ago',
        priority: 'Info',
      },
      {
        id: 2,
        title: 'New user registration',
        status: 'Pending Approval',
        time: '2 hours ago',
        priority: 'Medium',
      },
      {
        id: 3,
        title: 'SLA breach detected',
        status: 'Alert',
        time: '3 hours ago',
        priority: 'High',
      },
    ];
  };

  const statsCards = getStatsCards();
  const recentActivity = getRecentActivity();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'pending approval':
        return 'bg-orange-100 text-orange-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-slate-600 mt-1">
              Here's what's happening with your {user?.role === 'admin' ? 'system' : 'tickets'} today.
            </p>
          </div>
          {user?.role === 'employee' && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          )}
          {user?.role === 'agent' && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              View Queue
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-xs text-slate-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and ticket activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user?.role === 'employee' && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Submit New Ticket
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat with AI Assistant
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TicketIcon className="w-4 h-4 mr-2" />
                      View My Tickets
                    </Button>
                  </>
                )}
                {user?.role === 'agent' && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <TicketIcon className="w-4 h-4 mr-2" />
                      Take Next Ticket
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      View Queue
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Performance Metrics
                    </Button>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      System Alerts
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
