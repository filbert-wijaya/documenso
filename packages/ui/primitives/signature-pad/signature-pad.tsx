import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

import { Trans } from '@lingui/react/macro';
import type { Field } from '@prisma/client';
import { KeyboardIcon, QrCodeIcon, UploadCloudIcon } from 'lucide-react';
import QRCode from 'qrcode';
import { match } from 'ts-pattern';

import { DocumentSignatureType } from '@documenso/lib/constants/document';
import { isBase64Image } from '@documenso/lib/constants/signatures';

import { SignatureIcon } from '../../icons/signature';
import { cn } from '../../lib/utils';
import { SignaturePadDraw } from './signature-pad-draw';
import { SignaturePadQrCode } from './signature-pad-qr-code';
import { SignaturePadType } from './signature-pad-type';
import { SignaturePadUpload } from './signature-pad-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './signature-tabs';

export type SignaturePadValue = {
  type: DocumentSignatureType;
  value: string;
};

export type SignaturePadProps = Omit<HTMLAttributes<HTMLCanvasElement>, 'onChange'> & {
  value?: string;
  onChange?: (_value: SignaturePadValue) => void;

  disabled?: boolean;

  typedSignatureEnabled?: boolean;
  uploadSignatureEnabled?: boolean;
  drawSignatureEnabled?: boolean;
  qrCodeSignatureEnabled?: boolean;
  recipientSignatureField?: Field;

  onValidityChange?: (isValid: boolean) => void;
};

export const SignaturePad = ({
  value = '',
  onChange,
  disabled = false,
  typedSignatureEnabled = true,
  uploadSignatureEnabled = true,
  drawSignatureEnabled = true,
  qrCodeSignatureEnabled = true,
  recipientSignatureField,
}: SignaturePadProps) => {
  const [imageSignature, setImageSignature] = useState(isBase64Image(value) ? value : '');
  const [drawSignature, setDrawSignature] = useState(isBase64Image(value) ? value : '');
  const [typedSignature, setTypedSignature] = useState(isBase64Image(value) ? '' : value);

  let qr_code = '';

  // Generate QR code as base64 string
  QRCode.toDataURL(
    'http://localhost:3001/v1/signature/' + recipientSignatureField?.secondaryId,
    (url, err) => {
      if (err) throw err;
      qr_code = url;
    },
  );

  const [qrCodeSignature, setQrCodeSignature] = useState(qr_code);

  /**
   * This is cooked.
   *
   * Get the first enabled tab that has a signature if possible, otherwise just get
   * the first enabled tab.
   */
  const [tab, setTab] = useState(
    ((): 'draw' | 'text' | 'image' | 'qr' => {
      // First passthrough to check to see if there's a signature for a given tab.
      if (drawSignatureEnabled && drawSignature) {
        return 'draw';
      }

      if (typedSignatureEnabled && typedSignature) {
        return 'text';
      }

      if (uploadSignatureEnabled && imageSignature) {
        return 'image';
      }

      if (qrCodeSignatureEnabled && qrCodeSignature) {
        return 'qr';
      }

      // Second passthrough to just select the first avaliable tab.
      if (drawSignatureEnabled) {
        return 'draw';
      }

      if (typedSignatureEnabled) {
        return 'text';
      }

      if (uploadSignatureEnabled) {
        return 'image';
      }

      if (qrCodeSignatureEnabled) {
        return 'qr';
      }

      throw new Error('No signature enabled');
    })(),
  );

  // default value when the only mode is QR code
  useEffect(() => {
    if (
      !drawSignatureEnabled &&
      !typedSignatureEnabled &&
      !uploadSignatureEnabled &&
      qrCodeSignatureEnabled
    ) {
      onTabChange('qr');
    }
  }, []);

  const onImageSignatureChange = (value: string) => {
    setImageSignature(value);

    onChange?.({
      type: DocumentSignatureType.UPLOAD,
      value,
    });
  };

  const onDrawSignatureChange = (value: string) => {
    setDrawSignature(value);

    onChange?.({
      type: DocumentSignatureType.DRAW,
      value,
    });
  };

  const onTypedSignatureChange = (value: string) => {
    setTypedSignature(value);

    onChange?.({
      type: DocumentSignatureType.TYPE,
      value,
    });
  };

  const onQrCodeSignatureChange = (value: string) => {
    setQrCodeSignature(value);

    onChange?.({
      type: DocumentSignatureType.QR,
      value,
    });
  };

  const onTabChange = (value: 'draw' | 'text' | 'image' | 'qr') => {
    if (disabled) {
      return;
    }

    setTab(value);

    match(value)
      .with('draw', () => {
        onDrawSignatureChange(drawSignature);
      })
      .with('text', () => {
        onTypedSignatureChange(typedSignature);
      })
      .with('image', () => {
        onImageSignatureChange(imageSignature);
      })
      .with('qr', () => {
        onQrCodeSignatureChange(qr_code);
      })
      .exhaustive();
  };

  if (
    !drawSignatureEnabled &&
    !typedSignatureEnabled &&
    !uploadSignatureEnabled &&
    !qrCodeSignatureEnabled
  ) {
    return null;
  }

  return (
    <Tabs
      defaultValue={tab}
      className={cn({
        'pointer-events-none': disabled,
      })}
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      onValueChange={(value) => onTabChange(value as 'draw' | 'text' | 'image' | 'qr')}
    >
      <TabsList>
        {drawSignatureEnabled && (
          <TabsTrigger value="draw">
            <SignatureIcon className="mr-2 size-4" />
            <Trans>Draw</Trans>
          </TabsTrigger>
        )}

        {typedSignatureEnabled && (
          <TabsTrigger value="text">
            <KeyboardIcon className="mr-2 size-4" />
            <Trans>Type</Trans>
          </TabsTrigger>
        )}

        {uploadSignatureEnabled && (
          <TabsTrigger value="image">
            <UploadCloudIcon className="mr-2 size-4" />
            <Trans>Upload</Trans>
          </TabsTrigger>
        )}

        {qrCodeSignatureEnabled && (
          <TabsTrigger value="qr">
            <QrCodeIcon className="mr-2 size-4" />
            <Trans>QR Code</Trans>
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent
        value="draw"
        className="border-border aspect-signature-pad dark:bg-background relative flex items-center justify-center rounded-md border bg-neutral-50 text-center"
      >
        <SignaturePadDraw
          className="h-full w-full"
          onChange={onDrawSignatureChange}
          value={drawSignature}
        />
      </TabsContent>

      <TabsContent
        value="text"
        className="border-border aspect-signature-pad dark:bg-background relative flex items-center justify-center rounded-md border bg-neutral-50 text-center"
      >
        <SignaturePadType value={typedSignature} onChange={onTypedSignatureChange} />
      </TabsContent>

      <TabsContent
        value="image"
        className={cn(
          'border-border aspect-signature-pad dark:bg-background relative rounded-md border bg-neutral-50',
          {
            'bg-white': imageSignature,
          },
        )}
      >
        <SignaturePadUpload value={imageSignature} onChange={onImageSignatureChange} />
      </TabsContent>

      <TabsContent
        value="qr"
        className={cn(
          'border-border aspect-signature-pad dark:bg-background relative rounded-md border bg-neutral-50',
        )}
      >
        <SignaturePadQrCode value={qr_code} />
      </TabsContent>
    </Tabs>
  );
};
