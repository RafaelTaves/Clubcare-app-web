import axios from "axios";

export default async function patchUser(firstName?: string, lastName?: string, email?: string) {

    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
                email: email,
                firstName: firstName,
                lastName: lastName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        return false;
    }
}
    
    
