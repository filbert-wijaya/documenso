-- Create deleted@documenso.com
DO $$
BEGIN  
  IF NOT EXISTS (SELECT 1 FROM "document_hr_sch"."User" WHERE "email" = 'deleted-account@documenso.com') THEN  
    INSERT INTO
      "document_hr_sch"."User" (
        "email",
        "emailVerified",
        "password",
        "createdAt",
        "updatedAt",
        "lastSignedIn",
        "roles",
        "identityProvider",
        "twoFactorEnabled"
      )
    VALUES
      (
        'deleted-account@documenso.com',
        NOW(),
        NULL,
        NOW(),
        NOW(),
        NOW(),
        ARRAY['USER'::TEXT]::"document_hr_sch"."Role" [],
        CAST('GOOGLE'::TEXT AS "document_hr_sch"."IdentityProvider"),
        FALSE
      );
  END IF;  
END $$
