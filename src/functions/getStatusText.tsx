export default function getStatusText(status: number) {
        switch (status) {
            case 0:
                return "Pendente";
            case 1:
                return "Em Andamento";
            case 2:
                return "Concluído";
            default:
                return "Desconhecido";
        }
    }