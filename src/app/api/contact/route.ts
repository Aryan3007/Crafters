import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Define TypeScript interface for the form data
interface ContactFormData {
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  projectType: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  referralSource: string;
}

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const formData: ContactFormData = await req.json();

    // Insert data into Supabase
    const { data, error } = await supabase.from("contacts").insert([formData]);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  }

  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}