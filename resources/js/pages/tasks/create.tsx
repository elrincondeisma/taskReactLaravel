import TaskForm from '@/components/tasks/task-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function CreateTask() {
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
            title: 'Crear Tarea',
            href: route('tasks.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Tarea" />
            <div>
                <TaskForm mode="create" />
            </div>
        </AppLayout>
    );
}
