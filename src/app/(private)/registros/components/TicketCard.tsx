"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Calendar, Image as ImageIcon } from "lucide-react";
import { Ticket } from "@/types/ticket";
import { useRouter } from "next/navigation";
import getStatusColor from "@/functions/getStatusColor";
import getStatusText from "@/functions/getStatusText";
import { DeleteTicketDialog } from "./DeleteTicketDialog"


interface TicketCardProps {
    ticket: Ticket;
    onDelete: (id: number) => void;
    formatDate: (date: string) => string;
    getTicketImageSrc: (ticket: Ticket) => string;
}

export default function TicketCard({
    ticket,
    onDelete,
    formatDate,
    getTicketImageSrc,
}: TicketCardProps) {
    const router = useRouter();
    return (
        <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-3 sm:p-4">
                <div className="flex gap-3 sm:gap-4">
                    {/* Imagem */}
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden">
                            {(ticket.mimetype || ticket.imageUrl) ? (
                                <img
                                    src={getTicketImageSrc(ticket)}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover"
                                    onClick={() => router.push(`/registros/${ticket.id}`)}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        target.nextElementSibling?.classList.remove("hidden");
                                    }}
                                />
                            ) : null}
                            <div className={`w-full h-full flex items-center justify-center ${ticket.imageUrl ? "hidden" : ""}`}>
                                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3
                                onClick={() => router.push(`/registros/${ticket.id}`)}
                                className="text-sm sm:text-base font-semibold text-gray-900 truncate pr-2">
                                {ticket.title}
                            </h3>
                            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                {/* <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-blue-50"
                                    onClick={() => router.push(`/registros/${ticket.id}`)}
                                >
                                    <ZoomIn className="h-4 w-4 text-blue-600" />
                                </Button> */}
                                <DeleteTicketDialog onConfirm={() => onDelete(ticket.id)} />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mb-2">
                            <span
                                onClick={() => router.push(`/registros/${ticket.id}`)}
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}
                            >
                                {getStatusText(ticket.status)}
                            </span>
                        </div>

                        {/* Data */}
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span onClick={() => router.push(`/registros/${ticket.id}`)}>Criado em {formatDate(ticket.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
