import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vbwbfflzxuhktdvpbspd.supabase.co";
const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_NON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZid2JmZmx6eHVoa3RkdnBic3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNTg0MjgsImV4cCI6MjAzMzgzNDQyOH0.eOPZwYgyg3Ic-jbXW4Rehd2RDgqf-kt4vr30w_O9h3c";
export const supabase = createClient(supabaseUrl, supabaseKey);
