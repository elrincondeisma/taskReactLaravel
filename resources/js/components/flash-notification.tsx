import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, XCircleIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

const NOTIFICATION_TYPES = {
    success: {
        icon: CheckCircleIcon,
        title: 'Éxito',
        class: 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    },
    error: {
        icon: XCircleIcon,
        title: 'Error',
        class: 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    },
    info: {
        icon: InfoIcon,
        title: 'Información',
        class: 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    },
    warning: {
        icon: AlertTriangleIcon,
        title: 'Advertencia',
        class: 'border-rellow-500 bg-rellow-50 text-rellow-800 dark:bg-rellow-900/50 dark:text-rellow-300',
    },
};

type ALLOWED_NOTIFICATION_TYPES = 'success' | 'error' | 'info' | 'warning';
export default function FlashNotification() {
    const { flash } = usePage<SharedData>().props;
    const [show, setShow] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    // Detectar el tipo de notificación

    const getNotificationType = (): ALLOWED_NOTIFICATION_TYPES => {
        if (flash.success) {
            return 'success';
        } else if (flash.error) {
            return 'error';
        } else if (flash.info) {
            return 'info';
        } else if (flash.warning) {
            return 'warning';
        }
        return 'info'; // Default type
    };

    // Obtener el mensaje de la notificación
    const message = flash.success || flash.error || flash.info || flash.warning || '';

    useEffect(() => {
        if (message) {
            setShow(true);
            const id = window.setTimeout(() => {
                setShow(false);
            }, 5000);
            setTimeoutId(id);
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        }
    }, [message]);
    const closeNotification = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setShow(false);
    };
    const notificationType = getNotificationType();
    const { icon: Icon, title, class: notificationClass } = NOTIFICATION_TYPES[notificationType];
    if (!show || !message) {
        return null;
    }
    return (
        <div className="fixed right-4 bottom-4 z-50 w-full max-w-md">
            <Alert className={NOTIFICATION_TYPES[notificationType].class}>
                <Icon className="h-5 w-5" />
                <AlertTitle>{NOTIFICATION_TYPES[notificationType].title}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={closeNotification}>
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Cerrar</span>
                </Button>
            </Alert>
        </div>
    );
}
