"use client"
import { useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { useUser } from "@/contexts/AuthContext"
import getTickets from "@/functions/getTickets"
import deleteTicket from "@/functions/deleteTicket"
import verifyToken from "@/functions/verifyToken"
import { useRouter } from "next/navigation";
import TicketCard from "./components/TicketCard"
import { Ticket } from "@/types/ticket";

export default function Registros() {
    const { user, setUser } = useUser()
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
            router.push("/registros");
        } else {
            toast("Erro!", {
                description: "Erro ao excluir o ticket.",
                duration: 3000,
            });
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
            : ticket.imageUrl || '';
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
                    <Button 
                    onClick={() => router.push(`/novo-registro`)}
                    className="max-w-1/2 mt-1 bg-primaria hover:bg-primaria/80">
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
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                onDelete={handleDeleteTicket}
                                formatDate={formatDate}
                                getTicketImageSrc={getTicketImageSrc}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}