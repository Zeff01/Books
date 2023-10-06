"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import bookSchema from "@/lib/validations/bookValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/initSupabase";
import { genres } from "@/data/genre";
import { useBookStore } from "@/store/bookStore";

interface BookFormProps {
  closeDialog: () => void;
  mode?: "create" | "edit";
  initialValues?: z.infer<typeof bookSchema>;
}

const BookForm = ({
  closeDialog,
  mode = "create",
  initialValues,
}: BookFormProps) => {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialValues || {
      title: "",
      author: "",
      genre: [],
      rating: 0,
    },
  });

  const fetch = useBookStore((state) => state.fetch);

  const handleSubmit = async (values: z.infer<typeof bookSchema>) => {
    let response;

    if (mode === "edit" && initialValues?.id) {
      response = await supabase
        .from("Books")
        .update(values)
        .eq("id", initialValues.id);
    } else {
      response = await supabase.from("Books").insert([values]);
    }

    if (response.error) {
      toast({
        title: "Error",
        description: `Error ${
          mode === "edit" ? "updating" : "inserting"
        } data.`,
        duration: 1000,
      });
    } else {
      toast({
        title: "Success",
        description: `Data ${
          mode === "edit" ? "updated" : "inserted"
        } successfully.`,
        duration: 1000,
      });

      closeDialog();
      fetch();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(handleSubmit)();
        }}
        className="flex-col flex gap-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Title
              </FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Author
              </FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Ratings</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={String(field.value)}
                  className="flex  space-x-1"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <FormItem
                      key={rating}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={String(rating)} />
                      </FormControl>
                      <FormLabel className="font-normal">{`Rating: ${rating}`}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Genre</FormLabel>
              </div>
              {genres.map((genre) => (
                <FormItem
                  key={genre.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(genre.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, genre.id])
                          : field.onChange(
                              field.value?.filter((value) => value !== genre.id)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {genre.label}
                  </FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-12">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
