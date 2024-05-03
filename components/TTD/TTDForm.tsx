"use client"

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

import MonthlyReportHeader from "components/TTD/MonthlyReportHeader";
import FailedIndicator from "components/FailedIndicator";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import useTTDForm, { initialMonthlyRecord } from "components/TTD/hooks/useTTDForm";

import { Check, LoaderCircle, Minus, TrashIcon, X } from "lucide-react";
import DeleteTTDModal from "./DeleteTTDModal";

const TTDForm = () => {
  const {
    TTDId,
    form,
    records,
    formStatus,
    onSubmit,
    userDropdown,
    setSearchUser,
    handleCheckMonthlyRecord,
    handleDeleteRecord
  } = useTTDForm();

  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600 duration-500">
      <div className="w-full flex justify-between">
        <h1
          className="text-2xl font-semibold text-gray-600"
        >
          TTD Remaja Putri
        </h1>

        {
          TTDId && (
            <DeleteTTDModal selectedTTD={{
              userId: TTDId,
              name: userDropdown.find(user => user.userId === TTDId)?.name || ""
            }} />
          )
        }
      </div>

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
                                disabled={TTDId ? true : false}
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
                                const duplicateRecord = records.filter(record => record.year === value);

                                if (duplicateRecord.length > 0) {
                                  return;
                                }

                                const updatedRecords = [
                                  ...records,
                                  {
                                    year: value,
                                    monthlyRecord: initialMonthlyRecord
                                  }
                                ];

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
                                  placeholder="Tambah Tahun"
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

                <Table className="max-w-full">
                  <MonthlyReportHeader isForm />
                  <TableBody>
                    {
                      records.length > 0 && records.map((record, index) => (
                        <TableRow className="hover:bg-inherit" key={record.year}>
                          <TableCell className="text-gray-600">
                            {record.year}
                          </TableCell>
                          {
                            Object.keys(record.monthlyRecord)
                              .sort((a, b) => (
                                new Date(`1970, ${a}, 1`).getTime()
                                - new Date(`1970, ${b}, 1`).getTime()))
                              .map((month) => {
                                const status = record.monthlyRecord[month as keyof typeof record.monthlyRecord];
                                return (
                                  <TableCell
                                    key={month}
                                    onClick={() => handleCheckMonthlyRecord(month as any, record.year)}
                                    className="cursor-pointer hover:bg-muted duration-300" >
                                    <div className="flex justify-center flex-grow align-center text-center">
                                      {
                                        status == true
                                          ? <Check className="h-4 w-4 text-green-500" />
                                          : status == undefined
                                            ? <Minus className="h-4 w-4 text-gray-400" />
                                            : <X className="h-4 w-4 text-red-500" />
                                      }
                                    </div>
                                  </TableCell>
                                );
                              })
                          }
                          <TableCell className="max-w-10 text-right text-gray-600 sticky right-0 z-10 bg-white">
                            <div className="flex gap-2 w-full justify-end">
                              <Button
                                variant={"destructive"}
                                className="text-gray-600 py-1 px-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  handleDeleteRecord(record.year);
                                }}
                              >
                                <TrashIcon className="w-3 h-3 text-white" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    }

                    {
                      records.length < 1 && (
                        <TableRow>
                          <TableCell colSpan={14} className="text-gray-600 text-center">
                            Tidak ada data
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>

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