import axios from 'axios';
export default async function deleteTicket(ticketId: number){
    const token = localStorage.getItem('token');
    
    try{
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/ticket/${ticketId}`, 
        { 
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    
        if (response.status === 200) {
            return true;
        }
    } catch {
        return false;
    }
    
}