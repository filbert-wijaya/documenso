// import { z } from 'zod';
// import { router, authenticatedProcedure } from '../trpc'; // use your custom trpc exports
// import { prisma } from '@documenso/prisma';

// export const userRouter = router({
//   checkEmail: authenticatedProcedure
//     .input(z.object({ email: z.string().email() }))
//     .query(async ({ input }) => {
//       const user = await prisma.$queryRaw<{ id: string }[]>`
//         SELECT cu.id
//         FROM core_hr_sch."User" cu
//         JOIN document_hr_sch."User" du
//           ON cu.id = du.user_id
//         JOIN core_hr_sch.Employee e
//           ON cu.id = e.user_id
//         WHERE du.email = ${input.email}
//           AND e."isActive" = true
//         LIMIT 1
//       `;
//       return { exists: !!user };
//     }),
// });
