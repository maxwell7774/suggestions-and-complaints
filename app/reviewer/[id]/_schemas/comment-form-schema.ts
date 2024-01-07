import { z } from "zod";

//Shape of the comments and error messages to display when form fails validation using the scheme
const schema = z.object({
  comment: z
    .string()
    .min(1, { message: "Please provide a comment." })
    .max(2000, { message: "Comment must be under 2000 chars." }),
});

export default schema;
