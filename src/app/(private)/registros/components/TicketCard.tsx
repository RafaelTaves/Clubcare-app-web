"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Calendar, Image as ImageIcon} from "lucide-react";
import { Ticket } from "@/types/ticket";
import { useRouter } from "next/navigation";
import getStatusColor from "@/functions/getStatusColor";
import getStatusText from "@/functions/getStatusText";


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
            <CardContent className="p-3 sm:p-4" onClick={() => router.push(`/registros/${ticket.id}`)}>
                <div className="flex gap-3 sm:gap-4">
                    {/* Imagem */}
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden">
                            {(ticket.mimetype || ticket.imageUrl) ? (
                                <img
                                    src={getTicketImageSrc(ticket)}
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
                                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate pr-2">
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
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-red-50"
                                    onClick={() => onDelete(ticket.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mb-2">
                            <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}
                            >
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
    );
}
