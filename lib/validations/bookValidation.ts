import * as z from "zod";

const bookSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  genre: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one item.",
  }),
  rating: z.number().refine((value) => value > 0, {
    message: "Rating must be greater than 0.",
  }),
});

export default bookSchema;
