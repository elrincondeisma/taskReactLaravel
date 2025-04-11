import { TaskDeleteConfirm } from '@/components/tasks/task-delete-confirm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Task } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, BanIcon, CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
interface ShowTaskProps {
    task: Task;
}
export default function CreateTask({ task }: ShowTaskProps) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Tasks',
            href: route('tasks.index'),
        },
        {
            title: `Tarea: ${task.title.slice(0, 20)}${task.title.length > 20 ? '...' : ''}`,
            href: route('tasks.show', task.id),
        },
    ];
    const confirmDelete = () => {
        setShowDeleteModal(true);
    };
    const cancelDelete = () => {
        setShowDeleteModal(false);
    };
    const executeDelete = () => {
        router.delete(route('tasks.destroy', task.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
            },
        });
    };
    const toggleComplete = () => {
        router.patch(route('task.toggle-complete', { task: task.id }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tarea: ${task.title}`} />
            <div className="space-y-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
                            <p className="text-muted-foreground text-sm">{task.description}</p>
                            <p className="text-muted-foreground text-sm">Fecha de vencimiento: {task.due_date}</p>
                            <p className="text-muted-foreground text-sm">Estado: {task.status ? 'Completada' : 'Pendiente'}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Badge
                                className={
                                    task.status == 'completed'
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                }
                            >
                                {task.status == 'completed' ? 'Completada' : 'Pendiente'}
                            </Badge>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Eliminar
                            </Button>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <div className="flex space-x-2">
                            <Button variant="outline" asChild>
                                <Link href={route('tasks.index')}>
                                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                    Volver
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={toggleComplete}>
                                {task.status == 'completed' ? <BanIcon className="mr-2 h-4 w-4" /> : <CheckIcon className="mr-2 h-4 w-4" />}

                                {task.status == 'completed' ? 'Marcar como pendiente' : 'Marcar como completada'}
                            </Button>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" asChild>
                                <Link href={route('tasks.edit', task.id)}>
                                    <PencilIcon className="mr-2 h-4 w-4" />
                                    Editar
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={confirmDelete} className="bg-red-500 text-white hover:bg-red-600">
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Eliminar
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            {showDeleteModal && <TaskDeleteConfirm open={showDeleteModal} onClose={cancelDelete} onConfirm={executeDelete} />}
        </AppLayout>
    );
}
