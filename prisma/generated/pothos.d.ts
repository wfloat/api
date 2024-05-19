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
        RelationName: "textToSpeeches" | "voiceModelsCreated" | "voiceModelsUpdated" | "voiceModelsConfigCreated" | "voiceModelsConfigUpdated" | "aIHubVoiceModelCreated" | "aIHubVoiceModelUpdated" | "voiceModelProfileCreated" | "voiceModelProfileUpdated" | "voiceModelBackupUrlCreated" | "voiceModelBackupUrlUpdated" | "textToSpeechCreated" | "textToSpeechUpdated" | "createdBy" | "updatedBy" | "userCreated" | "userUpdated";
        ListRelations: "textToSpeeches" | "voiceModelsCreated" | "voiceModelsUpdated" | "voiceModelsConfigCreated" | "voiceModelsConfigUpdated" | "aIHubVoiceModelCreated" | "aIHubVoiceModelUpdated" | "voiceModelProfileCreated" | "voiceModelProfileUpdated" | "voiceModelBackupUrlCreated" | "voiceModelBackupUrlUpdated" | "textToSpeechCreated" | "textToSpeechUpdated" | "userCreated" | "userUpdated";
        Relations: {
            textToSpeeches: {
                Shape: TextToSpeech[];
                Name: "TextToSpeech";
            };
            voiceModelsCreated: {
                Shape: VoiceModel[];
                Name: "VoiceModel";
            };
            voiceModelsUpdated: {
                Shape: VoiceModel[];
                Name: "VoiceModel";
            };
            voiceModelsConfigCreated: {
                Shape: VoiceModelConfig[];
                Name: "VoiceModelConfig";
            };
            voiceModelsConfigUpdated: {
                Shape: VoiceModelConfig[];
                Name: "VoiceModelConfig";
            };
            aIHubVoiceModelCreated: {
                Shape: AIHubVoiceModel[];
                Name: "AIHubVoiceModel";
            };
            aIHubVoiceModelUpdated: {
                Shape: AIHubVoiceModel[];
                Name: "AIHubVoiceModel";
            };
            voiceModelProfileCreated: {
                Shape: VoiceModelProfile[];
                Name: "VoiceModelProfile";
            };
            voiceModelProfileUpdated: {
                Shape: VoiceModelProfile[];
                Name: "VoiceModelProfile";
            };
            voiceModelBackupUrlCreated: {
                Shape: VoiceModelBackupUrl[];
                Name: "VoiceModelBackupUrl";
            };
            voiceModelBackupUrlUpdated: {
                Shape: VoiceModelBackupUrl[];
                Name: "VoiceModelBackupUrl";
            };
            textToSpeechCreated: {
                Shape: TextToSpeech[];
                Name: "TextToSpeech";
            };
            textToSpeechUpdated: {
                Shape: TextToSpeech[];
                Name: "TextToSpeech";
            };
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
            };
            userCreated: {
                Shape: User[];
                Name: "User";
            };
            userUpdated: {
                Shape: User[];
                Name: "User";
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
        RelationName: "modelConfig" | "sourceModel" | "textToSpeeches" | "createdBy" | "updatedBy";
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
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
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
        RelationName: "voiceModel" | "createdBy" | "updatedBy";
        ListRelations: never;
        Relations: {
            voiceModel: {
                Shape: VoiceModel;
                Name: "VoiceModel";
            };
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
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
        RelationName: "derivedModel" | "backupUrls" | "inferredProfile" | "createdBy" | "updatedBy";
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
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
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
        RelationName: "voiceModel" | "createdBy" | "updatedBy";
        ListRelations: never;
        Relations: {
            voiceModel: {
                Shape: AIHubVoiceModel;
                Name: "AIHubVoiceModel";
            };
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
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
        RelationName: "voiceModel" | "createdBy" | "updatedBy";
        ListRelations: never;
        Relations: {
            voiceModel: {
                Shape: AIHubVoiceModel;
                Name: "AIHubVoiceModel";
            };
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
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
        RelationName: "voiceModel" | "user" | "createdBy" | "updatedBy";
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
            createdBy: {
                Shape: User | null;
                Name: "User";
            };
            updatedBy: {
                Shape: User | null;
                Name: "User";
            };
        };
    };
}