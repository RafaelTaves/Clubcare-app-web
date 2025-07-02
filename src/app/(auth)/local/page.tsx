"use client";
import { useUser } from "@/contexts/AuthContext";
import verifyToken from "@/functions/verifyToken";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Local() {
  const { user, setUser, fetchUser, logout } = useUser()
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verifyToken({
      setLoading,
      setUser,
      push: router.push,
    });
  }, []);

  async function handleSelectPlace(placeId: number) {
    const currentToken = localStorage.getItem('token');
    try{
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login/select-place/${placeId}`,
        {}, // ou {} se quiser mandar um body vazio
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      )
      if(response.data.status === true) {
        localStorage.setItem("token", response.data.data.token);
        fetchUser();
        router.push("/registros");
      }
    } catch (error) {
      console.error("Erro ao selecionar o local:", error);
      logout();
    }
    
  }

  if (loading) {
    return <div>{null}</div>;
  }
  return (
    <div className="flex h-screen">
      {/* Esquerda - Testemunho */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-black text-white p-10">
        <div className="max-w-md text-center">
          <p className="text-lg font-semibold">
            &quot;O sucesso não é o final, o fracasso não é fatal: é a coragem de continuar que conta.&quot;
          </p>
          <p className="mt-4 font-bold">by: Winston Churchill</p>
        </div>
      </div>

      {/* Direita - Seleção de local */}
      <div className="bg-primaria/10 flex md:justify-center md:items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Selecione um local</h2>
          <div className="space-y-4">
            {user?.places.map((place) => (
              <div
                key={place.id}
                onClick={() => handleSelectPlace(place.id)}
                className="cursor-pointer p-4 border rounded-lg bg-white hover:bg-gray-100 transition duration-200 shadow-lg flex items-center gap-4"
              >
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <span className="text-lg font-medium">{place.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
