import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type AIHubVoiceModel = {
    id: Generated<string>;
    downloadCount: number;
    name: string | null;
    filename: string;
    creatorText: string | null;
    version: string;
    derivedModelId: string | null;
};
export type TextToSpeech = {
    id: Generated<string>;
    inputText: string;
    ouputUrl: string;
    voiceModelId: string;
};
export type VoiceModel = {
    id: Generated<string>;
    filesize: number;
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
    voiceModelId: string;
};
export type DB = {
    AIHubVoiceModel: AIHubVoiceModel;
    TextToSpeech: TextToSpeech;
    VoiceModel: VoiceModel;
    VoiceModelBackupUrl: VoiceModelBackupUrl;
    VoiceModelConfig: VoiceModelConfig;
};
