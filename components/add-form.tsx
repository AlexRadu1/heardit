"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const formSchema = z.object({
  title: z.string().min(2).max(50),
});

export function AddFrom({ token }: { token: string }) {
  const [searchResults, setSearchResults] = useState("");
  const [queryResults, setQueryResults] = useState();
  const [searchType, setSearchType] = useState("track");
  const [inputChanged, setInputChanged] = useState(false);
  const [searchTypeChanged, setSearchTypeChanged] = useState(false);
  const handleChange = useDebouncedCallback((term) => {
    setSearchResults(term);
    setInputChanged(true);
  }, 300);

  useEffect(() => {
    if (inputChanged || searchTypeChanged) {
      // Only run the effect if inputChanged is true
      const encodedQuery = encodeURIComponent(searchResults);
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${searchType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }
          setQueryResults(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setSearchTypeChanged(false);
          setInputChanged(false); // Reset inputChanged after the request is made
        });
    }
  }, [searchResults, token, inputChanged]);

  // const SongList = () => {
  //   if (queryResults) {
  //     console.log(queryResults);

  //     const songList = queryResults.tracks.items.map((song) => (
  //       <div key={song.id} className="flex items-center space-x-4">
  //         <Image
  //           height={64}
  //           width={64}
  //           alt="Song cover"
  //           src={song.album.images[0].url}
  //         />
  //         <div className="space-y-1.5">
  //           <h3 className="text-lg font-medium">{song.name}</h3>
  //           <p className="text-sm text-gray-500 dark:text-gray-400">
  //             by{" "}
  //             {song.artists.map((artist: Artist) => {
  //               return `${artist.name}\n `;
  //             })}
  //           </p>
  //           <Separator className="my-2" />
  //         </div>
  //       </div>
  //     ));

  //     return <div className="flex flex-col gap-4 pt-4">{songList}</div>;
  //   }
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Request a song</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the name of the song you want to request.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="sr-only text-center">Song</Label>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submited...");
          }}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className=" text-center">Song results</FormLabel> */}

                <FormControl>
                  <ScrollArea className="h-72 w-full rounded-md border ">
                    <div className="p-4">
                      <Input
                        placeholder="Enter the name of the song"
                        onChangeCapture={(e) =>
                          handleChange(e.currentTarget.value)
                        }
                      />
                      {/* <SongList /> */}
                    </div>
                  </ScrollArea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Separator className="border-gray-200 dark:border-gray-800" />
    </div>
  );
}
