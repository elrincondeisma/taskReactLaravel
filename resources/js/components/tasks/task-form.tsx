import { Task } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { FormEvent } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
interface TaskFormProps {
    task?: Task;
    mode: 'create' | 'edit';
}

export default function TaskForm({ task, mode }: TaskFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: task?.title || '',
        description: task?.description || '',
        due_date: task?.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '',
        is_completed: task?.status || 'pending',
    });
    const pageTitle = mode === 'create' ? 'Crear Tarea' : 'Editar Tarea';
    const buttonText = mode === 'create' ? 'Crear' : 'Actualizar Tarea';
    const pageDescription = mode === 'create' ? 'Crea una nueva tarea' : 'Edita la tarea existente';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (mode === 'create') {
            post(route('tasks.store'), {
                onSuccess: () => {
                    reset();
                },
            });
        } else if (task) {
            put(route('tasks.update', task?.id), {
                onSuccess: () => {},
            });
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>{pageTitle}</CardTitle>
                <CardDescription>{pageDescription}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="title">Descripción</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Título de la tarea"
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Descripción de la tarea"
                            disabled={processing}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="due_date">Fecha límite</Label>
                        <Input
                            id="due_date"
                            type="datetime-local"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>
                    {mode === 'edit' && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_completed"
                                checked={data.is_completed === 'completed'}
                                onCheckedChange={(checked) => setData('is_completed', checked ? 'completed' : 'pending')}
                                disabled={processing}
                            />
                            <Label htmlFor="is_completed">Marcar como completada</Label>
                            <InputError message={errors.is_completed} className="mt-2" />
                        </div>
                    )}
                </CardContent>
                <CardFooter className="mt-4 flex justify-between">
                    <Button asChild type="button" variant="outline" disabled={processing}>
                        <Link href={route('tasks.index')}>
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Volver
                        </Link>
                    </Button>
                    <Button asChild type="submit" disabled={processing}>
                        <SaveIcon className="mr-2 h-4 w-4" />
                        {buttonText}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
