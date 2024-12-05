"use client";

import React, { useEffect } from "react";
import { supabaseClient } from "../lib/supabase";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BadgeAlert,
  BadgeCheck,
  Flame,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { predictFireAlarm } from "../utils/predictFireAlarm";
import useSWR, { useSWRConfig } from "swr";

const Realtime = () => {
  const supabase = supabaseClient();
  const { mutate } = useSWRConfig();

  const { data, isLoading } = useSWR("/sensor_reading", () =>
    supabase
      .from("sensor_reading")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
  );
  console.log({ data, isLoading });

  useEffect(() => {
    // Create a function to handle inserts
    const handleInserts = async (payload) => {
      console.log("Change received!", payload);

      mutate(
        "/sensor_reading",
        async () => {
          const response = await predictFireAlarm(payload.new.payload);
          const { fire_alarm } = response;
          const { error: updateError } = await supabase
            .from("sensor_reading")
            .update({
              result: fire_alarm,
              processed: true,
              processed_at: new Date().toISOString(),
            })
            .eq("id", payload.new.id);

          if (updateError) {
            // toast.error(error.message);
            throw updateError;
          }
          // toast.success("Event created");

          const { data: fetchData, error: fetchError } = await supabase
            .from("sensor_reading")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(20);
          if (fetchError) {
            // toast.error(error.message);
            throw error;
          }
          return fetchData;
        },
        {
          optimisticData: (current) => {
            console.log({ current });
            return {
              data: [
                {
                  ...payload.new,
                  id: "assigning...",
                },
                ...(current.data || []),
              ],
            };
          },
        }
      );
    };
    // Listen to inserts
    const channel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_reading" },
        (payload) => {
          handleInserts(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="container mx-auto py-12">
      <Table>
        <TableCaption>A list of recent sensor readings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Processed</TableHead>
            <TableHead>Payload</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Processed At</TableHead>
            <TableHead>Inference Time</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data?.data?.map((reading, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{reading.id}</TableCell>
                <TableCell>
                  {reading.processed ? (
                    <BadgeCheck className="text-green-500" />
                  ) : (
                    <BadgeAlert className="text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <code className="line-clamp-1 max-w-xl">
                    {JSON.stringify(reading.payload, null, 2)}
                  </code>
                </TableCell>

                <TableCell>
                  {new Date(reading.created_at).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    fractionalSecondDigits: 3,
                    hourCycle: "h23",
                  })}
                </TableCell>

                <TableCell>
                  {reading.processed_at ? (
                    new Date(reading.processed_at).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      fractionalSecondDigits: 3,
                      hourCycle: "h23",
                    })
                  ) : (
                    <Timer className="text-gray-500" />
                  )}
                </TableCell>
                <TableCell>
                  {reading.processed_at ? (
                    new Date(reading.processed_at) -
                    new Date(reading.created_at) +
                    "ms"
                  ) : (
                    <Timer className="text-gray-500" />
                  )}
                </TableCell>
                <TableCell>
                  {reading.result === null ? (
                    <Timer className="text-gray-500" />
                  ) : reading.result ? (
                    <Flame className="text-orange-400" />
                  ) : (
                    <ShieldCheck className="text-blue-500" />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Realtime;
