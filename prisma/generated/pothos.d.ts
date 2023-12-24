/* eslint-disable */
import type { Prisma, VoiceModel, AIHubVoiceModel, VoiceModelBackupUrl } from "@prisma/client";
export default interface PrismaTypes {
  VoiceModel: {
    Name: "VoiceModel";
    Shape: VoiceModel;
    Include: Prisma.VoiceModelInclude;
    Select: Prisma.VoiceModelSelect;
    OrderBy: Prisma.VoiceModelOrderByWithRelationInput;
    WhereUnique: Prisma.VoiceModelWhereUniqueInput;
    Where: Prisma.VoiceModelWhereInput;
    Create: {};
    Update: {};
    RelationName: "sourceModel";
    ListRelations: never;
    Relations: {
      sourceModel: {
        Shape: AIHubVoiceModel | null;
        Name: "AIHubVoiceModel";
      };
    };
  };
  AIHubVoiceModel: {
    Name: "AIHubVoiceModel";
    Shape: AIHubVoiceModel;
    Include: Prisma.AIHubVoiceModelInclude;
    Select: Prisma.AIHubVoiceModelSelect;
    OrderBy: Prisma.AIHubVoiceModelOrderByWithRelationInput;
    WhereUnique: Prisma.AIHubVoiceModelWhereUniqueInput;
    Where: Prisma.AIHubVoiceModelWhereInput;
    Create: {};
    Update: {};
    RelationName: "derivedModel" | "backupUrls";
    ListRelations: "backupUrls";
    Relations: {
      derivedModel: {
        Shape: VoiceModel | null;
        Name: "VoiceModel";
      };
      backupUrls: {
        Shape: VoiceModelBackupUrl[];
        Name: "VoiceModelBackupUrl";
      };
    };
  };
  VoiceModelBackupUrl: {
    Name: "VoiceModelBackupUrl";
    Shape: VoiceModelBackupUrl;
    Include: Prisma.VoiceModelBackupUrlInclude;
    Select: Prisma.VoiceModelBackupUrlSelect;
    OrderBy: Prisma.VoiceModelBackupUrlOrderByWithRelationInput;
    WhereUnique: Prisma.VoiceModelBackupUrlWhereUniqueInput;
    Where: Prisma.VoiceModelBackupUrlWhereInput;
    Create: {};
    Update: {};
    RelationName: "voiceModel";
    ListRelations: never;
    Relations: {
      voiceModel: {
        Shape: AIHubVoiceModel;
        Name: "AIHubVoiceModel";
      };
    };
  };
}
