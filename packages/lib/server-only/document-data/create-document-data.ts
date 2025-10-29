import type { DocumentDataType } from '@prisma/client';

import { prisma } from '@documenso/prisma';

export type CreateDocumentDataOptions = {
  type: DocumentDataType;
  data: string;
  fileFormat: string;
};

export const createDocumentData = async ({
  type,
  data,
  fileFormat = 'pdf',
}: CreateDocumentDataOptions) => {
  return await prisma.documentData.create({
    data: {
      type,
      data,
      initialData: data,
      fileFormat,
    },
  });
};
