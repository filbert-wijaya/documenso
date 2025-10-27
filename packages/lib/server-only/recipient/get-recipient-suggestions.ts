import { Prisma } from '@prisma/client';

import { prisma } from '@documenso/prisma';

export type GetRecipientSuggestionsOptions = {
  userId: number;
  teamId: number;
  query: string;
};

export const getRecipientSuggestions = async ({
  userId,
  teamId,
  query,
}: GetRecipientSuggestionsOptions) => {
  const trimmedQuery = query.trim();

  const nameEmailFilter = trimmedQuery
    ? {
        OR: [
          {
            name: {
              contains: trimmedQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            email: {
              contains: trimmedQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : {};

  // const recipients = await prisma.recipient.findMany({
  //   where: {
  //     envelope: {
  //       type: EnvelopeType.DOCUMENT,
  //       team: buildTeamWhereQuery({ teamId, userId }),
  //     },
  //     ...nameEmailFilter,
  //   },
  //   select: {
  //     name: true,
  //     email: true,
  //     envelope: {
  //       select: {
  //         createdAt: true,
  //       },
  //     },
  //   },
  //   distinct: ['email'],
  //   orderBy: {
  //     envelope: {
  //       createdAt: 'desc',
  //     },
  //   },
  //   take: 5,
  // });

  // const uniqueTeamMember = teamMembers.find(
  //   (member) => !recipients.some((r) => r.email === member.user.email),
  // );

  // if (uniqueTeamMember) {
  //   const teamMemberSuggestion = {
  //     email: uniqueTeamMember.user.email,
  //     name: uniqueTeamMember.user.name,
  //   };

  //     const allSuggestions = [...recipients.slice(0, 4), teamMemberSuggestion];

  //     return allSuggestions;
  // }

  // get Documenso users that are in the current team
  // const documenso_users = await prisma.$queryRaw<
  //   { email: string; name: string; department_name: string }[]
  // >`
  //   SELECT
  //     du."email",
  //     du."name",
  //     '-' AS "department_name"
  //   FROM
  //     du."User" AS cu
  //   RIGHT JOIN
  //     core_hr_sch."Employee" AS e ON cu."id" = e."user_id"
  //   JOIN
  //     core_hr_sch."Department" AS d ON e."department_id" = d."id"
  //   WHERE
  //     e."active" = true
  //     AND (du."email" ILIKE ${`%${trimmedQuery}%`} OR du."name" ILIKE ${`%${trimmedQuery}%`})
  //   LIMIT 10;
  // `;

  // get active employees
  const recipients = await prisma.$queryRaw<
    { email: string; name: string; department_name: string }[]
  >`
    SELECT 
      cu."email", 
      CONCAT_WS(' ', cu."firstName", cu."lastName") AS "name", 
      d."name" AS "department_name" 
    FROM 
      core_hr_sch."User" AS cu
    RIGHT JOIN 
      core_hr_sch."Employee" AS e ON cu."id" = e."user_id"
    JOIN 
      core_hr_sch."Department" AS d ON e."department_id" = d."id"
    WHERE 
      e."active" = true
      AND (cu."email" ILIKE ${`%${trimmedQuery}%`} OR CONCAT_WS(' ', cu."firstName", cu."lastName") ILIKE ${`%${trimmedQuery}%`})
    LIMIT 10;
  `;

  if (teamId) {
    const teamMembers = await prisma.organisationMember.findMany({
      where: {
        user: {
          ...nameEmailFilter,
          // NOT: { id: userId },
        },
        organisationGroupMembers: {
          some: {
            group: {
              teamGroups: {
                some: { teamId },
              },
            },
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      take: 10,
    });

    const allSuggestions = [
      ...recipients,
      ...teamMembers.map((member) => ({
        email: member.user.email,
        name: member.user.name,
        department_name: null,
      })),
    ];

    const seen = new Set<string>();
    const uniqueSuggestions = allSuggestions.filter((item) => {
      if (seen.has(item.email)) return false;
      seen.add(item.email);
      return true;
    });

    return uniqueSuggestions.slice(0, 10);
  }

  return recipients;
};
