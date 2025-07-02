import axios from "axios";

export default async function verifyToken ({
    setLoading,
    setUser,
    push,
  }: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: (user: any) => void;
    push: (url: string) => void;
  }) {
    const token = localStorage.getItem('token');

    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/check-token`,{ 
            token: token
        });

        if (response.status === 200) {
            setLoading(false);
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            setUser(null)
            push("/login")
        }
    } catch {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        setUser(null)
        push("/login")
    } 
}