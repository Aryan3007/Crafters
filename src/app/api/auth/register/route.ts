import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// Define TypeScript interface for user data
interface RegisterFormData {
  email: string;
  password: string;
  full_name: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const formData: RegisterFormData = await req.json();

    // Validate required fields
    if (!formData.email || !formData.password || !formData.full_name) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Check if the user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("email", formData.email)
      .single();

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
    }

    if (fetchError && fetchError.code !== "PGRST116") { // Ignore "no row found" error
      throw fetchError;
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Insert new user with default role 'client'
    const { data, error } = await supabase
      .from("users")
      .insert([{ 
        email: formData.email, 
        password: hashedPassword, 
        full_name: formData.full_name, 
        role: "client" 
      }])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data, message: "User registered successfully" }, { status: 201 });

  } catch (error: any) {
    console.error("Error in user registration:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
