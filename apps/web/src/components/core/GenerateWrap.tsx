'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <Container className="flex items-center justify-center ">
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle className="text-center">Generate Wrap</CardTitle>
        <CardDescription>Generate a personalized wrap based on your GitHub activity.</CardDescription>
      </CardHeader>
      <Form onSubmit={handleSubmit}>
        <CardPanel>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input 
                placeholder="Your GitHub username" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </Field>
            <Field>
              <FieldLabel>Year</FieldLabel>
              <Select 
                defaultValue="2025" 
                items={yearOptions}
                value={year}
                onValueChange={(value) => setYear(value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {yearOptions.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </Field>
          </div>
        </CardPanel>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </CardFooter>
      </Form>
    </Card>
    </Container>
  );
}
