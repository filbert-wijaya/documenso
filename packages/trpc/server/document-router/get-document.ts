import { getDocumentWithDetailsById } from '@documenso/lib/server-only/document/get-document-with-details-by-id';

import { authenticatedProcedure } from '../trpc';
import {
  ZGetDocumentRequestSchema,
  ZGetDocumentResponseSchema,
  getDocumentMeta,
} from './get-document.types';

export const getDocumentRoute = authenticatedProcedure
  .meta(getDocumentMeta)
  .input(ZGetDocumentRequestSchema)
  .output(ZGetDocumentResponseSchema)
  .query(async ({ input, ctx }) => {
    let { teamId } = ctx;
    const { user } = ctx;
    const { documentId, teamId: inputTeamId } = input;

    if (teamId === -1 && inputTeamId) {
      teamId = inputTeamId;
    }

    ctx.logger.info({
      input: {
        documentId,
      },
    });

    return await getDocumentWithDetailsById({
      userId: user.id,
      teamId,
      id: {
        type: 'documentId',
        id: documentId,
      },
    });
  });
