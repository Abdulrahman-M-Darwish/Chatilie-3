import { useEffect, useState } from 'react';

export const useBase64 = (
  file: File | null,
  fn?: (base64Image: string) => void,
) => {
  const [base64EncodedImage, setBase64EncodedImage] = useState('');
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setBase64EncodedImage(base64Image);
      if (fn) fn(base64Image);
    };
  }, [file]);
  return base64EncodedImage;
};
