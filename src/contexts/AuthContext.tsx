"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

interface Section {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
interface Place {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  systemadmin: boolean;
  createdAt: string;
  updatedAt: string;
  placeId: number;
  place: Place;
  role: string;
  section: Section;
  places: Place[];
}

interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  logout: () => void
  fetchUser: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`,{ 
          headers: {
              Authorization: `Bearer ${token}`
          },
      })
      setUser(response.data.data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  function logout () {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUser = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useUser must be used within UserProvider')
    return context
  }
