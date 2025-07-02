"use client"

import { useUser } from "@/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import verifyToken from "@/functions/verifyToken"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import patchUser from "@/functions/patchUser"
import { toast } from "sonner"


export default function MeusDadosPage() {
    const { user, setUser } = useUser()
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        verifyToken({
            setLoading,
            setUser,
            push: router.push,
        });
    }, []);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "")
            setLastName(user.lastName || "")
            setEmail(user.email || "")
        }
    }, [user])

    async function handleSave() {
        const response = await patchUser(firstName, lastName, email);

        if (response === true) {
            toast.success("Sucesso!", {
                description: "Status do ticket atualizado com sucesso.",
                duration: 2000,
            });
        } else {
            toast.error("Erro!", {
                description: "Erro ao atualizar o status do ticket.",
                duration: 3000,
            });
        }
    }

    return (
        <div className="bg-primaria/10 h-screen overflow-y-hidden p-4 sm:p-6 max-w-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-primaria">Meus Dados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ) : (
                        <form className="space-y-4">
                            {/* Nome */}
                            <div className="space-y-3">
                                <Label htmlFor="firstName" className="text-primaria">Nome</Label>
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            {/* Sobrenome */}
                            <div className="space-y-3">
                                <Label htmlFor="lastName" className="text-primaria">Sobrenome</Label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-primaria">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Botões */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/registros')}
                                    className="w-full sm:w-auto"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    type="button"
                                    className="w-full sm:w-auto bg-primaria hover:bg-primaria/80"
                                    onClick={handleSave}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
