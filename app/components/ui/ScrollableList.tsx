"use client";
import { useState, useEffect, useRef } from "react";
import type { Posts } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import axios from "axios";
import type { Track } from "@/app/lib/definitions";

export default function ScrollableList({
  token,
  posts,
}: {
  token?: string;
  posts: Posts[];
}) {
  let [isReady, setIsReady] = useState(false);
  let player = useRef<Spotify.Player | undefined>(undefined);
  const observer = useRef<IntersectionObserver | null>(null);
  const spotifyPlayerId = useRef<string | null>(null);
  const [currentTrack, setTrack] = useState<Track>();
  const [volumeState, setVolumeState] = useState<number>();

  useEffect(() => {
    if (token !== undefined) {
      // If the Spotify Web Playback SDK is already loaded and available when this component mounts
      if (window.Spotify) {
        player.current = new Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
            console.log("First Spotify player ");
          },
          volume: 0.1,
        });
        setIsReady(true);
      }
      //If the SDK is not yet loaded when this component mounts, wait for the SDK to be ready.
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        player.current = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.1,
        });
        console.log("Secound Spotify player");
        setIsReady(true);
      };

      if (isReady) {
        player.current!.connect().then((success) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!",
            );
          }
        });
        player.current!.on("ready", ({ device_id }) => {
          spotifyPlayerId.current = device_id;
          console.log(spotifyPlayerId.current);
        });
        player.current!.on("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });
        player.current!.on("player_state_changed", (state) => {
          if (!state) {
            return;
          }
          setTrack(state.track_window.current_track);
        });
        player.current!.getVolume().then((volume: number) => {
          setVolumeState(volume * 100);
          // console.log(`The volume of the player is ${volumeState}%`);
        });
      }

      return () => {
        player.current?.disconnect();
        setIsReady(false);
      };
    }
  }, [isReady, token]);

  useEffect(() => {
    // Intersection Observer callback function
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Execute your JavaScript code here
          if (
            spotifyPlayerId.current &&
            entry.target.getAttribute("data-test-id")
          ) {
            loadSong(
              spotifyPlayerId.current,
              token!,
              entry.target.getAttribute("data-test-id"),
            );
          }
        }
      });
    };

    // Create Intersection Observer
    observer.current = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 1, // Trigger callback when 100% of the element is visible
    });

    // Observe target element(s)
    const targets = document.querySelectorAll(".observer-target");
    targets.forEach((target) => {
      observer.current!.observe(target);
    });

    // Cleanup function
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  });

  const cards = posts.map((post: Posts) => {
    const url = new URL(post.songUrl);
    const trackID = url.pathname.split("/").pop();
    return (
      <Card
        key={post.id}
        id={`card-${post.id}`}
        className={`observer-target`}
        data-test-id={trackID}
      >
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <p>{post.content}</p>
        </CardContent>
        <CardFooter>
          {isReady ? (
            <div>
              <button
                onClick={() => {
                  player.current?.togglePlay();
                }}
              >
                Toggle
              </button>
            </div>
          ) : (
            <p>Get premium</p>
          )}
        </CardFooter>
      </Card>
    );
  });

  const loadSong = (
    deviceId: string,
    token: string,
    trackID: string | null, //TODO handle null
  ) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          uris: [`spotify:track:${trackID}`],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        console.log(res.status);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return <div className="flex w-1/2 flex-col gap-4">{cards}</div>;
}
