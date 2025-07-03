import axios from 'axios';

export default async function postTicket(
  title: string,
  description: string,
  type: string,
  image: File | null
) {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('type', type);

  if (image) {
    formData.append('file', image, image.name);
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/ticket`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Erro ao registrar ticket:', error);
    return false;
  }
}
