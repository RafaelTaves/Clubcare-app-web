import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { Home, Package, PanelBottom } from "lucide-react";


export function Sidebar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">

            <div className="sm:fidden flex felx-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelBottom className="w-5 h-5"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-x">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link 
                                href="#"
                                className="flex h-10 -10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                                prefetch={false}
                                >
                                    <Package className="h-5 w-5 transition-all"/>
                                    <span className="sr-only">Logo do projeto</span>
                                </Link>

                                <Link 
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foregorund"
                                prefetch={false}
                                >
                                    <Home className="h-5 w-5 transition-all"/>
                                    Meus tickets
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </div>
    )
}