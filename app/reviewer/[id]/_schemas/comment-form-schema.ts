import { z } from "zod";

const schema = z.object({
  comment: z
    .string()
    .min(1, { message: "Please provide a comment." })
    .max(2000, { message: "Comment must be under 2000 chars." }),
});

export default schema;
