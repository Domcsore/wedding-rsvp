import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseClient = createClient<Database>(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_API_KEY ?? ""
);

export { supabaseClient };
