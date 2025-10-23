import { prisma } from '@documenso/prisma';

/**
 * Checks if a user with the given email exists in the database.
 * Join document_hr_sch and core_hr_sch (also user and employee table) to filter only active employees
 */
export async function checkEmailExistsInDatabase(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
}
