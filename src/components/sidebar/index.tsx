"use client";

import { Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { AlignJustify, CirclePlus, List, CircleUserRound, Pointer, Power} from "lucide-react";
import { useUser } from "@/contexts/AuthContext";


export function Sidebar() {
    const { user, logout } = useUser()

    return (
        <div className="flex w-full flex-col bg-muted/40">

            <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <AlignJustify className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-x">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="/registros"
                                    className="flex h-12 -12 text-2xl items-center px-2.5 text-primary md:text-base gap-4 mt-2"
                                    prefetch={false}
                                >
                                    {user?.place?.imageUrl && (
                                        <img
                                            src={user.place.imageUrl}
                                            alt={user.place.name}
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    )}
                                    
                                </Link>

                                <Link
                                    href="/novo-registro"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <CirclePlus className="h-5 w-5 transition-all" />
                                    Novo Registro
                                </Link>

                                <Link
                                    href="/registros"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <List className="h-5 w-5 transition-all" />
                                    Meus Registros
                                </Link>

                                <Link
                                    href="/local"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <Pointer className="h-5 w-5 transition-all" />
                                    Selecionar Local
                                </Link>

                                <Link
                                    href="/meus-dados"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <CircleUserRound className="h-5 w-5 transition-all" />
                                    Meus Dados
                                </Link>

                                <button
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    onClick={logout}
                                >
                                    <Power className="h-5 w-5 transition-all" />
                                    Sair do Sistema
                                </button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </div>
    )
}