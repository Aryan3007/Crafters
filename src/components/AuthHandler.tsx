"use client"
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const createUserInDatabase = async (user: any) => {
  if (!user) {
    console.error("No user found, authentication issue.");
    return;
  }

  console.log("Authenticated user:", user);

  const { email, id, user_metadata } = user;

  // Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("id", id)
    .single();

  if (fetchError) console.error("Fetch user error:", fetchError);

  if (existingUser) {
    console.log("User already exists in database");
    return;
  }

  // Insert into users table
  const { data, error } = await supabase.from("users").insert([
    {
      id: id, // Ensure this matches your UUID format
      email: email,
      full_name: user_metadata?.full_name || "New User",
      profile_picture: user_metadata?.avatar_url || "",
      role: "client", // Default role
    },
  ]);
// Only log if there is an actual error
if (fetchError && Object.keys(fetchError).length > 0) {
    console.error("Fetch user error:", fetchError);
  } else {
    console.log("User fetch successful:", existingUser);
  }
  
  if (error) {
    console.error("Error inserting user into database:", error);
  } else {
    console.log("User successfully added to database!", data);
  }
};


  const AuthHandler = () => {
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
  
      if (accessToken && refreshToken) {
        // Save tokens
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
  
        // Set session in Supabase
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
  
        // Fetch authenticated user and add to database
        supabase.auth.getUser().then(({ data, error }) => {
          if (data?.user) {
            createUserInDatabase(data.user);
          }
        });
  
        // Clean URL
        window.history.replaceState({}, document.title, "/");
      }
    }, []);
  
    return null;
  };
  
  export default AuthHandler;