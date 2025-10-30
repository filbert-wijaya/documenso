-- AlterTable
ALTER TABLE "DocumentMeta" ADD COLUMN     "qrCodeSignatureEnabled" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "OrganisationGlobalSettings" ADD COLUMN     "qrCodeSignatureEnabled" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "TeamGlobalSettings" ADD COLUMN     "qrCodeSignatureEnabled" BOOLEAN;
