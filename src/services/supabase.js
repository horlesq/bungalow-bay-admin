import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kkmifsritqjabklifonk.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbWlmc3JpdHFqYWJrbGlmb25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI1NTUsImV4cCI6MjA1MDU0ODU1NX0.C6JI8soxvwANXhhqGSernpkjGdUhRWt8Y5fYprgm-JU`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
