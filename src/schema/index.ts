import { builder } from "../builder.js";

import "./voice-model/voice-model.js";
import "./ai-hub-voice-model/ai-hub-voice-model.js";
import "./voice-model-backup-url/voice-model-backup-url.js";

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
