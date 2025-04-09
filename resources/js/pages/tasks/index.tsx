import { TaskDeleteConfirm } from '@/components/tasks/task-delete-confirm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedTask, Task, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ClipboardPlusIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';

import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Tasks',
        href: route('tasks.index'),
    },
];

interface TasksIndexProps {
    tasks: PaginatedTask;
}

export default function index({ tasks }: TasksIndexProps) {
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const hasTasks = tasks.data.length > 0;
    const confirmDelete = (taskId: number) => {
        setDeleteTaskId(taskId);
        setShowDeleteModal(true);
    };
    const cancelDelete = () => {
        setDeleteTaskId(null);
        setShowDeleteModal(false);
    };
    const executeDelete = () => {
        if (deleteTaskId) {
            router.delete(route('tasks.destroy', deleteTaskId), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeleteTaskId(null);
                },
            });
        }
    };
    const toggleComplete = (task: Task) => {
        router.patch('tasks.toggleComplete');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Mis tareas</h1>
                    <Button asChild>
                        <Link href={route('tasks.create')}>
                            <ClipboardPlusIcon className="mr-2 h-4 w-4" />
                            Nueva Tarea
                        </Link>
                    </Button>
                </div>
                <Card className={!hasTasks ? 'border-dashed' : ''}>
                    {!hasTasks ? (
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                            <div className="rounder-full bg-muted mb-4 p-3">
                                <ClipboardPlusIcon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-lg">No tienes tareas todavia</CardTitle>
                            <CardDescription className="max-w-md text-sm">
                                Crea tu primera tarea para empezar a gestionar tus actividades.
                            </CardDescription>
                            <Button className="mt-4" asChild>
                                <Link href={route('tasks.create')}>
                                    <ClipboardPlusIcon className="mr-2 h-4 w-4" />
                                    Nueva Tarea
                                </Link>
                            </Button>
                        </CardContent>
                    ) : (
                        <>
                            <CardHeader>
                                <CardTitle>Lista de Tareas</CardTitle>
                                <CardDescription>Gestiona tus tareas personales.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Título</TableHead>
                                            <TableHead>Descripción</TableHead>
                                            <TableHead>Fecha Límite</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tasks.data.map((task) => (
                                            <TableRow key={task.id} className={task.status == 'completed' ? 'opacity-60' : ''}>
                                                <TableCell>
                                                    <Checkbox></Checkbox>
                                                </TableCell>
                                                <TableCell className={task.status == 'completed' ? 'line-through' : ''}>{task.title}</TableCell>
                                                <TableCell>
                                                    {task.description ? (
                                                        <span className="line-clamp-1">{task.description}</span>
                                                    ) : (
                                                        <span className="text-muted">Sin descripcion</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>{task.due_date}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" asChild>
                                                            <Link href={route('tasks.show', task.id)}>
                                                                <EyeIcon className="h-4 w-4"></EyeIcon>
                                                                <span className="sr-only">Ver</span>
                                                            </Link>
                                                        </Button>
                                                        <Button variant="outline" asChild>
                                                            <Link href={route('tasks.edit', task.id)}>
                                                                <PencilIcon className="h-4 w-4"></PencilIcon>
                                                                <span className="sr-only">Editar</span>
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            className="cursor-pointer"
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => confirmDelete(task.id)}
                                                        >
                                                            <TrashIcon className="h-4 w-4"></TrashIcon>
                                                            <span className="sr-only">Eliminar</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <div className="text-muted-foreground text-sm">
                                    Mostrando {tasks.from} a {tasks.to} de {tasks.total}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        disabled={!tasks.prev_page_url}
                                        onClick={() => tasks.prev_page_url && router.get(tasks.prev_page_url)}
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        variant="outline"
                                        disabled={!tasks.next_page_url}
                                        onClick={() => tasks.next_page_url && router.get(tasks.next_page_url)}
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </CardFooter>
                        </>
                    )}
                </Card>
            </div>
            {showDeleteModal && <TaskDeleteConfirm open={showDeleteModal} onClose={cancelDelete} onConfirm={executeDelete} />}
        </AppLayout>
    );
}
