import { builder } from "../../builder.js";
import "./user.query.js";
import "./user.mutation.js";

builder.prismaObject("User", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    accessKey: t.exposeString("accessKey"),
    
    // Relations
    

    // // Connections
  
  }),
});
