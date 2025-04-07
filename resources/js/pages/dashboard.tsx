import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { Task, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { CheckIcon, ClipboardListIcon } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

interface DashboardProps {
    tasksStats: {
        total: number;
        completed: number;
        pending: number;
        upcoming: Task[];
    };
    completionRate: number;
}

export default function Dashboard({ tasksStats, completionRate }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Tareas</CardTitle>
                            <ClipboardListIcon className="text-muted-foreground h-6 w-6" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tasksStats.total}</div>
                            <p className="text-muted-foreground text-xs">Tareas Creadas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Completadas</CardTitle>
                            <CheckIcon className="text-muted-foreground h-6 w-6" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tasksStats.completed}</div>
                            <p className="text-muted-foreground text-xs">Tareas Completadas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Pendientes</CardTitle>
                            <ClipboardListIcon className="text-muted-foreground h-6 w-6" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tasksStats.pending}</div>
                            <p className="text-muted-foreground text-xs">Tareas Pendientes</p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="mt-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Progreso General</CardTitle>
                        <ClipboardListIcon className="text-muted-foreground h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Completado:</span>
                            <span className="text-sm font-medium">{completionRate}%</span>
                        </div>
                        <Progress value={completionRate} />
                    </CardContent>
                </Card>
                <Card className="mt-4">
                    <CardHeader className="">
                        <CardTitle className="text-lg">Próximas Tareas</CardTitle>
                        <CardDescription className="text-muted-foreground text-xs">Tareas con fecha de vencimiento próxima</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {tasksStats.upcoming.length === 0 ? (
                            <p className="text-muted-foreground py-4 text-center">No hay tareas próximas.</p>
                        ) : (
                            <div className="space-y-4">
                                {tasksStats.upcoming.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between py-2">
                                        <div>
                                            <h3 className="text-sm font-semibold">{task.title}</h3>
                                            <p className="text-muted-foreground text-xs">{task.due_date}</p>
                                        </div>
                                        <span className="text-muted-foreground text-sm">{task.status}</span>
                                        <Button asChild>
                                            <Link href={route('tasks.show', task.id)}>Ver</Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="mt-4 flex justify-end">
                    <Button asChild>
                        <Link href={route('tasks.index')}>Ver todas las tareas</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
