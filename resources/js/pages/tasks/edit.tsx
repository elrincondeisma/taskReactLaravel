import TaskForm from '@/components/tasks/task-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Task } from '@/types';
import { Head } from '@inertiajs/react';

interface EditTaskProps {
    task: Task;
}

export default function EditTask({ task }: EditTaskProps) {
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
            title: 'Editar Tarea',
            href: route('tasks.edit', { task: task.id }), // Replace with actual task ID
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Tarea " />
            <div>
                <TaskForm mode="edit" task={task} />
            </div>
        </AppLayout>
    );
}
