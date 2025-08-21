"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import type { FinancialData } from "@/lib/reports"

interface FinancialChartProps {
  data: FinancialData[]
}

const chartConfig = {
  finesCollected: {
    label: "Fines Collected",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  },
}

export function FinancialChart({ data }: FinancialChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Monthly revenue and fine collection trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="finesCollected"
                stroke="var(--color-finesCollected)"
                strokeWidth={2}
                dot={{ fill: "var(--color-finesCollected)" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={{ fill: "var(--color-revenue)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
