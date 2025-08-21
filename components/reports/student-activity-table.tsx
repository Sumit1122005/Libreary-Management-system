"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import type { StudentActivity } from "@/lib/reports"

interface StudentActivityTableProps {
  students: StudentActivity[]
}

export function StudentActivityTable({ students }: StudentActivityTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Student Activity Summary
        </CardTitle>
        <CardDescription>Most active library users this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="text-center">Total Issued</TableHead>
              <TableHead className="text-center">Current Books</TableHead>
              <TableHead className="text-center">Overdue</TableHead>
              <TableHead className="text-center">Fines</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.studentId}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center font-medium">{student.totalBooksIssued}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={student.currentBooks > 0 ? "default" : "secondary"}>{student.currentBooks}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={student.overdueBooks > 0 ? "destructive" : "secondary"}>{student.overdueBooks}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className={student.totalFines > 0 ? "text-red-600 font-medium" : "text-gray-600"}>
                    ${student.totalFines}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(student.lastActivity).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
