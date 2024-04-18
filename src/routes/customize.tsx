import { useOptions } from "@/components/options-provider";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fetchData from "@/lib/data-fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  cat: z.string(),
  diff: z.string(),
});

type dataFetched = {
  id: number;
  name: string;
};

const difficulty = ["Easy", "Medium", "Hard"];

const CustomizePage = () => {
  const [data, setData] = useState<dataFetched[]>([]);

  const navigate = useNavigate();

  const { setCat, setDiff } = useOptions();

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const fetchedData = await fetchData({
        endpoint: "categories",
        param: "",
      });
      setData(fetchedData);
    };

    fetchDataAndSetData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cat: "",
      diff: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setCat(values.cat);
    setDiff(values.diff);
    navigate(`/quiz/${values.cat}`)
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Customize your quiz yourself</h1>
        <p className="dark:text-gray-400">Select from the below</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-3 flex-col"
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <FormField
              control={form.control}
              name="cat"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diff"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulty.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomizePage;
