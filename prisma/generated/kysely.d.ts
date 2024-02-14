import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type AIHubVoiceModel = {
    id: Generated<string>;
    downloadCount: number;
    name: string | null;
    checksumMD5ForWeights: string;
    filename: string;
    creatorText: string | null;
    version: string;
    derivedModelId: string | null;
};
export type TextToSpeech = {
    id: Generated<string>;
    inputText: string;
    outputUrl: string;
    voiceModelId: string;
    userId: string;
};
export type User = {
    id: Generated<string>;
    accessKey: string;
};
export type VoiceModel = {
    id: Generated<string>;
    filesizeForWeights: number;
    filesizeForAdded: number;
    hidden: boolean;
    processed: boolean;
    name: string;
    checksumMD5ForAdded: string;
    checksumMD5ForWeights: string;
    checksumSHA256ForAdded: string;
    checksumSHA256ForWeights: string;
};
export type VoiceModelBackupUrl = {
    id: Generated<string>;
    url: string;
    voiceModelId: string;
};
export type VoiceModelConfig = {
    id: Generated<string>;
    qualityScore: number;
    f0Curve: string;
    transposePitch: number;
    pitchExtractionMethod: string;
    searchFeatureRatio: number;
    filterRadius: number;
    audioResampling: number;
    volumeEnvelopeScaling: number;
    artifactProtection: number;
    voiceModelId: string;
};
export type VoiceModelProfile = {
    id: Generated<string>;
    confidence: number;
    fictional: boolean;
    name: string;
    gender: string;
    relevantTags: string[];
    accent: string;
    nativeLanguage: string;
    modelTrainedOnEnglishProbability: number;
    voiceModelId: string;
};
export type DB = {
    AIHubVoiceModel: AIHubVoiceModel;
    TextToSpeech: TextToSpeech;
    User: User;
    VoiceModel: VoiceModel;
    VoiceModelBackupUrl: VoiceModelBackupUrl;
    VoiceModelConfig: VoiceModelConfig;
    VoiceModelProfile: VoiceModelProfile;
};
