"use client"
import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Trash2, Calendar, Image as ImageIcon, Fullscreen, ZoomIn } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { useUser } from "@/contexts/AuthContext"
import getTickets from "@/functions/getTickets"
import deleteTicket from "@/functions/deleteTicket"
import verifyToken from "@/functions/verifyToken"
import { useRouter } from "next/navigation";

interface Ticket {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    type: string;
    status: number;
    placeId: number;
    mimetype: string;
    createdAt: string;
    updatedAt: string;
}

export default function Registros() {
    const { user, setUser } = useUser()
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [data, setData] = useState<Ticket | null>(null);

    useEffect(() => {
        verifyToken({
            setLoading,
            setUser,
            push: router.push,
        });
    }, []);

    useEffect(() => {
        if (user) {
            fetchTickets();
        }
    }, [user]);

    const imageSourceUri = useMemo(() => data ?
        data.mimetype ? `${process.env.NEXT_PUBLIC_API_URL}/ticket/image/${data.id}` : data.imageUrl
        : '', [data]);

    async function fetchTickets() {
        const response = await getTickets(user);

        if (response !== "erro" && response !== undefined) {
            const sortedTickets = [...response].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setTickets(sortedTickets);
            setLoading(false);
        }
    }

    async function handleDeleteTicket(ticketId: number) {
        const response = await deleteTicket(ticketId);

        if (response === true) {
            toast.success("Sucesso!", {
                description: "Ticket excluído com sucesso.",
                duration: 2000,
            });
            fetchTickets();
        } else {
            toast("Erro!", {
                description: "Erro ao excluir o ticket.",
                duration: 3000,
            });
        }
    }

    function getStatusText(status: number) {
        switch (status) {
            case 0:
                return "Pendente";
            case 1:
                return "Em Andamento";
            case 2:
                return "Concluído";
            default:
                return "Desconhecido";
        }
    }

    function getStatusColor(status: number) {
        switch (status) {
            case 0:
                return "bg-red-100 text-red-800 border-red-200";
            case 1:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 2:
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    function getTicketImageSrc(ticket: Ticket) {
        return ticket.mimetype
            ? `${process.env.NEXT_PUBLIC_API_URL}/ticket/image/${ticket.id}`
            : ticket.imageUrl;
    }

    if (loading) {
        return (
            <div className="bg-primaria/10 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primaria border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-secundaria">Carregando tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primaria/10 min-h-screen">
            <div className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-row justify-between mb-4 sm:mb-6">
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-primaria mb-1">
                            Meus Registros
                        </h1>
                        <p className="text-sm text-secundaria">
                            {tickets.length} {tickets.length === 1 ? 'ticket encontrado' : 'tickets encontrados'}
                        </p>
                    </div>
                    <Button className="max-w-1/2 mt-1 bg-primaria hover:bg-primaria/80">
                        Novo Registro
                    </Button>
                </div>


                {tickets.length === 0 ? (
                    <Card className="w-full shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Nenhum ticket encontrado
                            </h3>
                            <p className="text-sm text-gray-500 text-center">
                                Você ainda não possui tickets cadastrados.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {tickets.map((ticket) => (
                            <Card key={ticket.id} className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex gap-3 sm:gap-4">
                                        {/* Imagem do Ticket */}
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden">
                                                {ticket.imageUrl ? (
                                                    <img
                                                        src={getTicketImageSrc(ticket)}
                                                        alt={ticket.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            target.nextElementSibling?.classList.remove('hidden');
                                                        }}
                                                    />
                                                ) : null}
                                                <div className={`w-full h-full flex items-center justify-center ${ticket.imageUrl ? 'hidden' : ''}`}>
                                                    <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Conteúdo do Ticket */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate pr-2">
                                                    {ticket.title}
                                                </h3>
                                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-blue-50"
                                                        onClick={() => {
                                                            // Adicione aqui a lógica para ver mais detalhes
                                                            console.log('Ver detalhes do ticket:', ticket.id);
                                                        }}
                                                    >
                                                        <ZoomIn className="h-4 w-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-red-50"
                                                        onClick={() => handleDeleteTicket(ticket.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className="mb-2">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                                                    {getStatusText(ticket.status)}
                                                </span>
                                            </div>

                                            {/* Data */}
                                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                <span>Criado em {formatDate(ticket.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}