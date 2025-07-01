import { useMemo } from 'react';

interface ImageData {
  imageUrl: string | null;
  mimetype: string;
}

interface ApiImageProps {
  imageData: ImageData;
  alt?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function ApiImage({ imageData, alt = "Imagem", className = "", fallback }: ApiImageProps) {
  const imageUrl = useMemo(() => {
    if (!imageData.imageUrl || !imageData.mimetype) {
      return null;
    }

    // Se já é uma URL completa (http/https), retorna diretamente
    if (imageData.imageUrl.startsWith('http')) {
      return imageData.imageUrl;
    }

    // Se já é uma data URL, retorna diretamente
    if (imageData.imageUrl.startsWith('data:')) {
      return imageData.imageUrl;
    }

    // Constrói a data URL com o mimetype
    return `data:${imageData.mimetype};base64,${imageData.imageUrl}`;
  }, [imageData.imageUrl, imageData.mimetype]);

  if (!imageUrl) {
    return fallback || (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Sem imagem</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        console.error('Erro ao carregar imagem:', e);
        // Você pode definir uma imagem padrão aqui se quiser
        // e.currentTarget.src = '/placeholder-image.png';
      }}
    />
  );
}

// Exemplo de uso em uma lista de registros
interface Registro {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  mimetype: string;
  createdAt: string;
  // outros campos...
}

interface RegistrosListProps {
  registros: Registro[];
}

export function RegistrosList({ registros }: RegistrosListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {registros.map((registro) => (
        <div key={registro.id} className="border rounded-lg p-4 shadow-sm">
          <div className="mb-3">
            <ApiImage
              imageData={{
                imageUrl: registro.imageUrl,
                mimetype: registro.mimetype
              }}
              alt={registro.title}
              className="w-full h-48 object-cover rounded-md"
              fallback={
                <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-gray-400">📷</span>
                </div>
              }
            />
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{registro.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{registro.description}</p>
          <p className="text-xs text-gray-400">
            {new Date(registro.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      ))}
    </div>
  );
}

// Hook personalizado para transformar dados de imagem
export function useImageUrl(imageUrl: string | null, mimetype: string) {
  return useMemo(() => {
    if (!imageUrl || !mimetype) {
      return null;
    }

    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }

    return `data:${mimetype};base64,${imageUrl}`;
  }, [imageUrl, mimetype]);
}

// Exemplo de uso do hook em um componente
export function RegistroCard({ registro }: { registro: Registro }) {
  const imageUrl = useImageUrl(registro.imageUrl, registro.mimetype);

  return (
    <div className="border rounded-lg p-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={registro.title}
          className="w-full h-48 object-cover rounded-md mb-3"
          onError={() => console.log('Erro ao carregar imagem')}
        />
      )}
      <h3 className="font-semibold">{registro.title}</h3>
      <p className="text-gray-600">{registro.description}</p>
    </div>
  );
}