export default function getStatusColor(status: number) {
        switch (status) {
            case 0:
                return "bg-red-100 text-red-800 border-red-200";
            case 1:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 2:
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    }