import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://boxwpcwhuqgysqkmfztd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveHdwY3dodXFneXNxa21menRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMjc3MjUsImV4cCI6MjAzOTgwMzcyNX0.g3HC7ilx3WWtGj4uLB75zH7L2rRjxrTnUYTqkXWQfoc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
