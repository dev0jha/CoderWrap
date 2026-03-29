"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MetalButton from "@/components/pixel-perfect/metal-button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "./Container";

const yearOptions = [
  { label: "2010", value: "2010" },
  { label: "2011", value: "2011" },
  { label: "2012", value: "2012" },
  { label: "2013", value: "2013" },
  { label: "2014", value: "2014" },
  { label: "2015", value: "2015" },
  { label: "2016", value: "2016" },
  { label: "2017", value: "2017" },
  { label: "2018", value: "2018" },
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
];

export default function GenerateWrap() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("2025");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter a GitHub username");
      return;
    }

    setIsLoading(true);

    router.push(`/warp/${username.trim()}/${year}`);
  };

  return (
    <Container className="flex items-center justify-center py-16 lg:py-32 px-4 sm:px-6">
      <Card className="w-full max-w-lg border border-border shadow-2xl rounded-2xl bg-card/50 backdrop-blur-sm animate-[fade-in_0.6s_ease-out] overflow-hidden">
        <CardHeader className="text-left space-y-4 p-8 sm:p-12 border-b border-border bg-muted/30">
          <CardTitle className="text-2xl sm:text-4xl font-syne font-bold text-foreground uppercase tracking-tighter">
            Generate Wrap
          </CardTitle>
          <CardDescription className="text-xs font-geist-mono uppercase tracking-widest text-muted-foreground">
            Enter metadata to retrieve activity report.
          </CardDescription>
        </CardHeader>
        <Form onSubmit={handleSubmit}>
          <CardPanel className="p-8 sm:p-12 space-y-8 sm:space-y-10">
            <div className="flex flex-col gap-8">
              <Field className="space-y-3">
                <FieldLabel className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
                  Username
                </FieldLabel>
                <Input
                  placeholder="GH_HANDLE"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="rounded-xl border-border font-geist-mono focus:ring-1 focus:ring-foreground transition-all uppercase placeholder:opacity-30 bg-background/50 h-12"
                />
              </Field>
              <Field className="space-y-3">
                <FieldLabel className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
                  Fiscal Year
                </FieldLabel>
                <Select
                  defaultValue="2025"
                  items={yearOptions}
                  value={year}
                  onValueChange={(value) => setYear(value || "2025")}
                  disabled={isLoading}
                >
                  <SelectTrigger className="rounded-xl border-border font-geist-mono focus:ring-1 focus:ring-foreground bg-background/50 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup className="rounded-xl border-border shadow-xl">
                    {yearOptions.map(({ label, value }) => (
                      <SelectItem
                        key={value}
                        value={value}
                        className="font-geist-mono rounded-lg"
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
            </div>
          </CardPanel>
          <CardFooter className="p-8 sm:p-12 pt-0">
            <MetalButton
              metal="rose-gold"
              className="w-full h-14 font-bold font-syne uppercase tracking-widest"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "PROCESSSSING..." : "GENERATE"}
            </MetalButton>
          </CardFooter>
        </Form>
      </Card>
    </Container>
  );
}
