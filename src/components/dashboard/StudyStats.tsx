
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 1 },
  { day: "Sun", hours: 2 },
];

export function StudyStats() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Study Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tick={{ fill: "#888888" }}
              />
              <Tooltip
                cursor={{ fill: "#F1F0FB" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded-md shadow-sm">
                        <p className="font-medium">{`${payload[0].payload.day}: ${payload[0].value} hours`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="hours"
                fill="#9b87f5"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-edu-soft-purple p-3 rounded-lg">
            <p className="text-muted-foreground text-sm">Total Hours</p>
            <p className="text-2xl font-bold text-edu-purple">20</p>
          </div>
          <div className="bg-edu-soft-blue p-3 rounded-lg">
            <p className="text-muted-foreground text-sm">Average Daily</p>
            <p className="text-2xl font-bold text-blue-600">2.9</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
