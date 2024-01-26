import { builder } from "../builder.js";

import "./voice-model/voice-model.js";
import "./voice-model-config/voice-model-config.js";
import "./ai-hub-voice-model/ai-hub-voice-model.js";
import "./voice-model-backup-url/voice-model-backup-url.js";
import "./text-to-speech/text-to-speech.js";

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
