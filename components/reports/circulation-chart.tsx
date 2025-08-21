"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import type { CirculationData } from "@/lib/reports"

interface CirculationChartProps {
  data: CirculationData[]
}

const chartConfig = {
  issued: {
    label: "Issued",
    color: "hsl(var(--chart-1))",
  },
  returned: {
    label: "Returned",
    color: "hsl(var(--chart-2))",
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--chart-3))",
  },
}

export function CirculationChart({ data }: CirculationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Circulation Trends</CardTitle>
        <CardDescription>Monthly book issue, return, and overdue statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="issued" fill="var(--color-issued)" />
              <Bar dataKey="returned" fill="var(--color-returned)" />
              <Bar dataKey="overdue" fill="var(--color-overdue)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
