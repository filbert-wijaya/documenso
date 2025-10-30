// import { useRef } from 'react';
import React from 'react';

import { Trans } from '@lingui/react/macro';
// import { motion } from 'framer-motion';
import { QrCodeIcon } from 'lucide-react';

// import { unsafe_useEffectOnce } from '@documenso/lib/client-only/hooks/use-effect-once';
// import { SIGNATURE_CANVAS_DPI } from '@documenso/lib/constants/signatures';
import { cn } from '../../lib/utils';

// const loadImage = async (file: File | undefined): Promise<HTMLImageElement> => {
//   if (!file) {
//     throw new Error('No file selected');
//   }

//   if (!file.type.startsWith('image/')) {
//     throw new Error('Invalid file type');
//   }

//   if (file.size > 5 * 1024 * 1024) {
//     throw new Error('Image size should be less than 5MB');
//   }

//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     const objectUrl = URL.createObjectURL(file);

//     img.onload = () => {
//       URL.revokeObjectURL(objectUrl);
//       resolve(img);
//     };

//     img.onerror = () => {
//       URL.revokeObjectURL(objectUrl);
//       reject(new Error('Failed to load image'));
//     };

//     img.src = objectUrl;
//   });
// };

// const loadImageOntoCanvas = (
//   image: HTMLImageElement,
//   canvas: HTMLCanvasElement,
//   ctx: CanvasRenderingContext2D,
// ): ImageData => {
//   const scale = Math.min((canvas.width * 0.8) / image.width, (canvas.height * 0.8) / image.height);

//   const x = (canvas.width - image.width * scale) / 2;
//   const y = (canvas.height - image.height * scale) / 2;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.save();
//   ctx.imageSmoothingEnabled = true;
//   ctx.imageSmoothingQuality = 'high';

//   ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

//   ctx.restore();

//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//   return imageData;
// };

export type SignatureQrCodeProps = {
  className?: string;
  value: string;
  onChange: (_signatureDataUrl: string) => void;
};

export const SignaturePadQrCode = ({
  className,
  value,
  onChange,
  ...props
}: SignatureQrCodeProps) => {
  // const $el = useRef<HTMLCanvasElement>(null);
  // const $imageData = useRef<ImageData | null>(null);
  // const $fileInput = useRef<HTMLInputElement>(null);

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     const img = await loadImage(event.target.files?.[0]);

  //     if (!$el.current) return;

  //     const ctx = $el.current.getContext('2d');
  //     if (!ctx) return;

  //     $imageData.current = loadImageOntoCanvas(img, $el.current, ctx);
  //     onChange?.($el.current.toDataURL());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // unsafe_useEffectOnce(() => {
  //   // Todo: Not really sure if this is required for uploaded images.
  //   if ($el.current) {
  //     $el.current.width = $el.current.clientWidth * SIGNATURE_CANVAS_DPI;
  //     $el.current.height = $el.current.clientHeight * SIGNATURE_CANVAS_DPI;
  //   }

  //   if ($el.current && value) {
  //     const ctx = $el.current.getContext('2d');

  //     const { width, height } = $el.current;

  //     const img = new Image();

  //     img.onload = () => {
  //       ctx?.drawImage(img, 0, 0, Math.min(width, img.width), Math.min(height, img.height));

  //       const defaultImageData = ctx?.getImageData(0, 0, width, height) || null;

  //       $imageData.current = defaultImageData;
  //     };

  //     img.src = value;
  //   }
  // });

  return (
    <div
      className={cn(
        'dark:bg-background relative flex h-full w-full flex-col items-center justify-center rounded-md border bg-neutral-50 p-4 text-center',
        className,
      )}
    >
      {value ? (
        <img src={value} alt="QR Code" className="max-h-[80%] max-w-[80%] object-contain" />
      ) : (
        <div className="text-muted-foreground flex flex-col items-center justify-center">
          <QrCodeIcon className="mb-2 h-10 w-10" />
          <span className="text-lg font-semibold">
            <Trans>No QR Code available</Trans>
          </span>
        </div>
      )}
    </div>
  );
};
