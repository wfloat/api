/* eslint-disable */
import type { Prisma, User, VoiceModel, VoiceModelConfig, AIHubVoiceModel, VoiceModelProfile, VoiceModelBackupUrl, TextToSpeech } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "textToSpeeches";
        ListRelations: "textToSpeeches";
        Relations: {
            textToSpeeches: {
                Shape: TextToSpeech[];
                Name: "TextToSpeech";
            };
        };
    };
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
        RelationName: "modelConfig" | "sourceModel" | "textToSpeeches";
        ListRelations: "textToSpeeches";
        Relations: {
            modelConfig: {
                Shape: VoiceModelConfig | null;
                Name: "VoiceModelConfig";
            };
            sourceModel: {
                Shape: AIHubVoiceModel | null;
                Name: "AIHubVoiceModel";
            };
            textToSpeeches: {
                Shape: TextToSpeech[];
                Name: "TextToSpeech";
            };
        };
    };
    VoiceModelConfig: {
        Name: "VoiceModelConfig";
        Shape: VoiceModelConfig;
        Include: Prisma.VoiceModelConfigInclude;
        Select: Prisma.VoiceModelConfigSelect;
        OrderBy: Prisma.VoiceModelConfigOrderByWithRelationInput;
        WhereUnique: Prisma.VoiceModelConfigWhereUniqueInput;
        Where: Prisma.VoiceModelConfigWhereInput;
        Create: {};
        Update: {};
        RelationName: "voiceModel";
        ListRelations: never;
        Relations: {
            voiceModel: {
                Shape: VoiceModel;
                Name: "VoiceModel";
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
        RelationName: "derivedModel" | "backupUrls" | "inferredProfile";
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
            inferredProfile: {
                Shape: VoiceModelProfile | null;
                Name: "VoiceModelProfile";
            };
        };
    };
    VoiceModelProfile: {
        Name: "VoiceModelProfile";
        Shape: VoiceModelProfile;
        Include: Prisma.VoiceModelProfileInclude;
        Select: Prisma.VoiceModelProfileSelect;
        OrderBy: Prisma.VoiceModelProfileOrderByWithRelationInput;
        WhereUnique: Prisma.VoiceModelProfileWhereUniqueInput;
        Where: Prisma.VoiceModelProfileWhereInput;
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
    TextToSpeech: {
        Name: "TextToSpeech";
        Shape: TextToSpeech;
        Include: Prisma.TextToSpeechInclude;
        Select: Prisma.TextToSpeechSelect;
        OrderBy: Prisma.TextToSpeechOrderByWithRelationInput;
        WhereUnique: Prisma.TextToSpeechWhereUniqueInput;
        Where: Prisma.TextToSpeechWhereInput;
        Create: {};
        Update: {};
        RelationName: "voiceModel" | "user";
        ListRelations: never;
        Relations: {
            voiceModel: {
                Shape: VoiceModel;
                Name: "VoiceModel";
            };
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
}