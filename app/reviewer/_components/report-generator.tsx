"use client";
import GroupMultipleSelector, { Option } from "@/components/multi-select";
import { SearchFilter } from "@/components/react-server-datatables";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PagedList from "@/lib/paged-list";
import { Message, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import GeneratedReport from "./generated-report";

const ReportGenerator = () => {
  const [eqFilter, setEqFilter] = useState<SearchFilter | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [messages, setMessages] = useState<(Message & { sender: User })[]>();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<Option[]>([]);
  const [reportColumns, setReportColumns] = useState<Option[]>([]);
  const options: Option[] = [
    { label: "Id", value: "id" },
    { label: "Subject", value: "subject" },
    { label: "Message Body", value: "messageBody" },
    { label: "Message Type", value: "messageType" },
    { label: "Date Created", value: "dateCreated" },
    { label: "Sender", value: "sender" },
  ];
  const generatedReportRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => generatedReportRef.current,
  });

  const handleGenerateReport = () => {
    let searchFilters: SearchFilter[] = [];

    if (eqFilter) {
      searchFilters.push(eqFilter);
    }
    if (startDate) {
      searchFilters.push({
        field: "dateCreated",
        operator: "gte",
        value: format(startDate, "yyyy-MM-dd"),
      });
    }
    if (endDate) {
      searchFilters.push({
        field: "dateCreated",
        operator: "lte",
        value: format(endDate, "yyyy-MM-dd"),
      });
    }

    setReportColumns(selectedColumns);
    setIsGenerating(true);
    axios
      .get<PagedList<Message & { sender: User }>>("/api/messages", {
        params: {
          page: 0,
          pageSize: 0,
          sortBy: "id",
          sortDir: "asc",
          searchFilters: JSON.stringify(searchFilters),
        },
      })
      .then((res) => setMessages(res.data.items))
      .catch((e) => console.log(e))
      .finally(() => setIsGenerating(false));
  };

  return (
    <div>
      <h2 className="text-center text-xl font-semibold my-5">Reporting</h2>
      <div className="flex flex-col space-y-3">
        <div>
          <label>Message Type</label>
          <Select
            defaultValue="ALL"
            onValueChange={(value) => {
              if (value !== "ALL") {
                setEqFilter({
                  field: "messageType",
                  operator: "eq",
                  value: value,
                });
              } else {
                setEqFilter(null);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="SUGGESTION">Suggestion</SelectItem>
              <SelectItem value="COMPLAINT">Complaint</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p>Start Date</p>
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>
        <div>
          <p>End Date</p>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
        <div>
          <p>Columns</p>
          <GroupMultipleSelector
            value={selectedColumns}
            onChange={setSelectedColumns}
            options={options}
          ></GroupMultipleSelector>
        </div>
        <Button onClick={handleGenerateReport} disabled={isGenerating}>
          {isGenerating && (
            <Loader2 className="min-w-4 min-h-4 h-4 w-4 animate-spin" />
          )}
          Generate Report
        </Button>
      </div>
      {messages && (
        <ScrollArea className="max-w-60 xs:max-w-screen-xl sm:max-w-screen-sm md:max-w-screen-xl">
          <Card className="overflow-y-auto mt-10">
            <GeneratedReport
              messages={messages}
              reportColumns={reportColumns}
              ref={generatedReportRef}
            />
            <div className="px-5 pb-5">
              <Button className="w-full" onClick={handlePrint}>
                Print
              </Button>
            </div>
          </Card>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default ReportGenerator;
