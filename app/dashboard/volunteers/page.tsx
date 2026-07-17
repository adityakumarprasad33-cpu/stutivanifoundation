import { VolunteerRepository } from '@/features/volunteers/services/volunteer.repository';
import { requirePermission } from '@/lib/auth/server-guards';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ApproveButton } from './components/approve-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CheckCircle, ShieldAlert } from 'lucide-react';

export default async function VolunteersPage() {
  await requirePermission('volunteers.view');

  const repo = new VolunteerRepository();
  const { data: volunteers } = await repo.query({
    sort: [{ field: 'createdAt', direction: 'desc' }]
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Volunteers</h1>
          <p className="text-muted-foreground mt-1">Manage workforce and volunteer lifecycle.</p>
        </div>
        <Link href="/dashboard/volunteers/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Volunteer
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.filter(v => v.status === 'APPLIED' || v.status === 'PENDING_VERIFICATION').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.filter(v => v.status === 'ACTIVE').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.filter(v => v.status === 'SUSPENDED').length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.map(volunteer => (
              <TableRow key={volunteer.id}>
                <TableCell className="font-medium">{volunteer.volunteerNumber}</TableCell>
                <TableCell>{volunteer.personalInfo.firstName} {volunteer.personalInfo.lastName}</TableCell>
                <TableCell>{volunteer.personalInfo.email}</TableCell>
                <TableCell>
                  <Badge variant={volunteer.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {volunteer.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(volunteer.createdAt, 'PP')}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <ApproveButton volunteerId={volunteer.id} status={volunteer.status} />
                  <Link href={`/dashboard/volunteers/${volunteer.slug}`}>
                    <Button variant="ghost" size="sm">Workspace</Button>
                  </Link>
                  <Link href={`/dashboard/volunteers/${volunteer.slug}/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {volunteers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No volunteers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
