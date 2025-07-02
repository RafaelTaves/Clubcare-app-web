"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Ticket } from "@/types/ticket";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getStatusColor from "@/functions/getStatusColor";
import getStatusText from "@/functions/getStatusText";
import verifyToken from "@/functions/verifyToken";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/AuthContext";


export default function TicketDetailsPage() {
    const { id } = useParams();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useUser()
    const router = useRouter();

    useEffect(() => {
            verifyToken({
                setLoading,
                setUser,
                push: router.push,
            });
        }, []);

    useEffect(() => {
        const fetchTicket = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                const data = await response.json();
                setTicket(data.data);
            } catch (error) {
                console.error("Erro ao carregar ticket:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTicket();
    }, [id]);

    const getImageSrc = (ticket: Ticket) =>
        ticket.mimetype
            ? `${process.env.NEXT_PUBLIC_API_URL}/ticket/image/${ticket.id}`
            : ticket.imageUrl || "";

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            </div>
        );
    }

    if (!ticket) {
        return <p className="text-center mt-10 text-gray-500">Ticket não encontrado.</p>;
    }

    function getTipoText(tipo: string) {
        switch (tipo) {
            case "F":
                return "Financeiro";
            case "S":
                return "Sugestão";
            case "R":
                return "Reclamação";
            default:
                return "";
        }
    }

    return (
        <div className="bg-primaria/10 h-screen overflow-y-hidden p-4 sm:p-6 max-w-xl mx-auto">
            <Card className="p-4 sm:p-6 space-y-4">
                {/* Imagem */}
                <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {ticket.mimetype || ticket.imageUrl ? (
                        <img
                            src={getImageSrc(ticket)}
                            alt={ticket.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove("hidden");
                            }}
                        />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${ticket.imageUrl ? "hidden" : ""}`}>
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-gray-900">{ticket.title}</h1>
                    <p className="text-gray-700 text-sm sm:text-base">{ticket.description}</p>
                    <p className="text-sm text-gray-500">Tipo: {getTipoText(ticket.type)}</p>
                    
                    <p className="text-sm text-gray-500">Criado em: {new Date(ticket.createdAt).
                    toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-gray-500"> 
                        <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}
                        >
                            {getStatusText(ticket.status)}
                        </span>
                    </p>
                </div>

                {/* Botão voltar (opcional) */}
                <Button variant="outline" onClick={() => history.back()} className="w-full sm:w-auto">
                    Voltar
                </Button>
            </Card>
        </div>
    );
}
