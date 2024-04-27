"use client"
import 'react-day-picker/dist/style.css';

import ControlledInput from "components/ControlledInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import MonthlyReportHeader from "./MonthlyReportHeader";
import FailedIndicator from "components/FailedIndicator";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import useTTDForm from "./hooks/useTTDForm";
import { Check, LoaderCircle, X } from "lucide-react";

const TTDForm = () => {
  const {
    form,
    formStatus,
    onSubmit,
    userDropdown,
    setSearchUser,
    handleCheckMonthlyRecord,
    selectedRecord,
    selectedYear
  } = useTTDForm();

  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600 duration-500">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        TTD Remaja Putri
      </h1>

      {
        formStatus === "loading" ? (
          <div className="w-full flex gap-3 justify-center text-center">
            <LoaderCircle className="animate-spin" /> <p>Loading...</p>
          </div>
        ) :
          formStatus === "error" ? (
            <FailedIndicator />
          ) : (
            <Form {...form}>
              <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name={"userId"}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="space-y-2 grid">
                          <FormLabel htmlFor="userId">Siswa</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                id="userId"
                                className="w-full h-16 px-2 py-4 text-left
                                border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-0 focus:ring-transparent"
                              >
                                <SelectValue
                                  placeholder={"Pilih Siswa"}
                                  className="w-full space-x-2 focus-visible:ring-transparent"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="space-y-2">
                                  <Input
                                    placeholder="Cari Siswa"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-transparent"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setSearchUser(value);
                                    }}
                                  />
                                  {
                                    userDropdown.map(({ name, userId }) => (
                                      <SelectItem key={userId} value={userId}>
                                        <div className="grid gap-1 text-sm text-slate-600">
                                          <p>{name}</p>
                                          <p className="text-slate-400">{userId}</p>
                                        </div>
                                      </SelectItem>
                                    ))
                                  }
                                </div>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"year"}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <div className="space-y-2 grid">
                          <FormLabel htmlFor="year">Tahun</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);

                                const records = form.getValues("records");

                                const updatedRecords = records.map(record => ({
                                  ...record,
                                  year: value,
                                }));

                                form.setValue("records", updatedRecords);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                id="year"
                                className="w-full p-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-0 focus:ring-transparent"
                              >
                                <SelectValue
                                  placeholder={field.value || "Pilih Tahun"}
                                  className="w-full space-x-2 focus-visible:ring-transparent"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {
                                  Array.from({ length: 16 }, (_, i) => (
                                    new Date().getFullYear() - 1 + i)
                                  ).map(year => (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    </>
                  )}
                />

                {
                  form.getValues("year") ? (
                    <Table className="max-w-full">
                      <MonthlyReportHeader isForm />
                      <TableBody>
                        <TableRow className="hover:bg-inherit">
                          {
                            selectedRecord && Object.entries(selectedRecord.monthlyRecord).map(([month, value]) => (
                              <TableCell
                                key={month}
                                onClick={() => handleCheckMonthlyRecord(month as any, selectedYear)}
                                className="cursor-pointer hover:bg-muted duration-300" >
                                <div className="flex justify-center flex-grow align-center text-center">
                                  {
                                    value == true
                                      ? <Check className="h-4 w-4 text-green-500" />
                                      : value == undefined ? "-"
                                        : <X className="h-4 w-4 text-red-500" />
                                  }
                                </div>
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : null
                }

                <Button
                  type="submit"
                >
                  {
                    formStatus === "submitting" ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Simpan"
                    )
                  }
                </Button>
              </form>
            </Form>
          )
      }
    </div>
  )
}

export default TTDForm;