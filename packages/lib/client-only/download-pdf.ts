import type { DocumentData } from '@prisma/client';

import { getFile } from '../universal/upload/get-file';
import { downloadFile } from './download-file';

type DocumentVersion = 'original' | 'signed';

type DownloadPDFProps = {
  documentData: DocumentData;
  fileName?: string;
  /**
   * Specifies which version of the document to download.
   * 'signed': Downloads the signed version (default).
   * 'original': Downloads the original version.
   */
  version?: DocumentVersion;
};

export const downloadPDF = async ({
  documentData,
  fileName,
  version = 'signed',
}: DownloadPDFProps) => {
  const bytes = await getFile({
    type: documentData.type,
    data: version === 'signed' ? documentData.data : documentData.initialData,
  });

  const blob = new Blob([bytes], {
    type: 'application/pdf',
  });

  const baseTitle = (fileName ?? 'document').replace(/\.pdf$/, '');
  const suffix = version === 'signed' ? '_signed.pdf' : '.pdf';

  downloadFile({
    filename: `${baseTitle}${suffix}`,
    data: blob,
  });
};

export const downloadNonPDF = async ({
  documentData,
  fileName,
  version = 'original',
}: DownloadPDFProps) => {
  const bytes = await getFile({
    type: documentData.type,
    data: version === 'signed' ? documentData.data : documentData.initialData,
  });

  let filetype = 'unknown';
  let extension = '';
  if (documentData.fileFormat === 'word') {
    filetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    extension = '.docx';
  } else if (documentData.fileFormat === 'excel') {
    filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    extension = '.xlsx';
  }

  const blob = new Blob([bytes], {
    type: filetype,
  });

  const baseTitle = (fileName ?? 'document').replace(/\.(docx|xlsx)$/i, '');
  const suffix = extension;

  downloadFile({
    filename: `${baseTitle}${suffix}`,
    data: blob,
  });
};
