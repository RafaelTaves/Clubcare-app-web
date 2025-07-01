import axios from "axios";

interface Ticket {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    type: string;
    status: number;
    createdByUserId: number;
    placeId: number;
    sectionId: number;
    mimetype: string;
    createdAt: string;
    updatedAt: string;
  }


export default async function getTickets (user: any) {
    const token = localStorage.getItem('token');

    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ticket`,{ 
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        if (response.status === 200) {
            let tickets = response.data.data
            let filteredTickets: Ticket[] = []
            filteredTickets = tickets.filter((ticket: Ticket) => ticket.createdByUserId === user?.id && ticket.placeId === user?.placeId)
            return filteredTickets
        } 
    } catch {
        return "erro"
    }
}