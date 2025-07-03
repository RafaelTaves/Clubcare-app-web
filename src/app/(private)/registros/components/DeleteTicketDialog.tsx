// components/DeleteTicketDialog.tsx
"use client"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteTicketDialogProps {
  onConfirm: () => void
}

export function DeleteTicketDialog({ onConfirm }: DeleteTicketDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja mesmo excluir este ticket?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
