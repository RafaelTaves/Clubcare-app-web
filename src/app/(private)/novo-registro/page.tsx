"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import postTicket from "@/functions/postTicket"
import { toast } from "sonner"

export default function NovoTicketPage() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const response = await postTicket(title, description, type, image);

        if (response === true) {
            toast.success("Sucesso!", {
                description: "Ticket registrado.",
                duration: 2000,
            });
            router.push("/registros");
        } else {
            toast.error("Erro!", {
                description: "Erro ao atualizar o registrar o ticket.",
                duration: 3000,
            });
        }
    }

    return (
        <div className="bg-primaria/10 h-screen p-4 sm:p-6 max-w-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-primaria">Novo Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Título */}
                        <div className="space-y-3">
                            <Label htmlFor="title" className="text-primaria">Título</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/* Descrição */}
                        <div className="space-y-3">
                            <Label htmlFor="description" className="text-primaria">Descrição</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>

                        {/* Tipo */}
                        <div className="space-y-3">
                            <Label className="text-primaria">Tipo</Label>
                            <Select value={type} onValueChange={setType} required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="R">Reclamação</SelectItem>
                                    <SelectItem value="S">Sugestão</SelectItem>
                                    <SelectItem value="F">Financeiro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Foto */}
                        <div className="space-y-3">
                            <Label className="text-primaria">Foto (opcional)</Label>

                            {/* Botão para abrir a câmera */}
                            <div className="sm:hidden">
                                <Label
                                    htmlFor="cameraInput"
                                    className="block w-full cursor-pointer bg-primaria text-white text-center py-2 rounded hover:bg-primaria/80"
                                >
                                    Tirar Foto
                                </Label>
                                <Input
                                    id="cameraInput"
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Botão para escolher da galeria */}
                            <div>
                                <Label
                                    htmlFor="fileInput"
                                    className="block w-full cursor-pointer border border-gray-300 text-center py-2 rounded hover:bg-gray-50"
                                >
                                    Escolher da Galeria
                                </Label>
                                <Input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Mostrar nome do arquivo selecionado */}
                            {image && (
                                <p className="text-sm text-gray-500">Imagem selecionada: {image.name}</p>
                            )}
                        </div>


                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto bg-primaria hover:bg-primaria/80">
                                Salvar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
