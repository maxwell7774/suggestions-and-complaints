import { z } from "zod";

const schema = z.object({
  subject: z
    .string()
    .min(1, { message: "Please provide a subject." })
    .max(255, { message: " The subject must be under 255 characters." }),
  messageBody: z.string().min(1, { message: "Please provide a message." }),
  recipients: z
    .object(
      {
        label: z.string(),
        value: z.string(),
      },
      { required_error: "Please select at least 1 recipient." }
    )
    .array()
    .min(1, { message: "Please select at least 1 recipient." }),
});

export default schema;
