"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="grid gap-4 mx-auto lg:w-[70%] text-gray-600">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Profil
      </h1>

      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input
          placeholder="Nama"
          className="focus-visible:ring-transparent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="NIK">NIK</Label>
        <Input
          placeholder="NIK"
          type="number"
          className="focus-visible:ring-transparent"
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.preventDefault();
            }
          }}
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Tempat Tanggal Lahir</Label>
        <div className="grid grid-cols-[5fr_5fr] gap-4">
          <Input
            placeholder="Tempat Lahir"
            className="focus-visible:ring-transparent"
          />
          <Input
            type="date"
            placeholder="Tanggal Lahir"
            className="focus-visible:ring-transparent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Jenis Kelamin</Label>
        <RadioGroup className="flex gap-6">
          <div className="space-x-2 flex items-center">
            <RadioGroupItem value="Laki-laki" id="male" />
            <Label htmlFor="male">
              Laki-laki
            </Label>
          </div>
          <div className="space-x-2 flex items-center">
            <RadioGroupItem value="Perempuan" id="female" />
            <Label htmlFor="female">
              Perempuan
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Alamat</Label>
        <Textarea
          className="focus-visible:ring-transparent"
          placeholder="Alamat"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">Sekolah</Label>
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Sekolah"
        />
      </div>

      <div className="space-y-2 grid">
        <Label htmlFor="posyandu">Posyandu</Label>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"outline"}
              className="w-full space-x-2 focus-visible:ring-transparent"
            >
              <ChevronDown className="h-4 w-4" />
              <span>
                Pilih Posyandu
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Posyandu Remaja FRESH</DropdownMenuItem>
            <DropdownMenuItem>Posyandu Remaja Smart Gemilang</DropdownMenuItem>
            <DropdownMenuItem>Posyandu Remaja Kusuma Jaya</DropdownMenuItem>
            <DropdownMenuItem>Posyandu Remaja Mandiri Sehat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default ProfilePage;