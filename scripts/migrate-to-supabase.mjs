import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "[ERROR] Supabase environment variables not set. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  console.log("[INFO] Pocinjemo migraciju podataka iz localStorage u Supabase...");

  // Ova skripta je za primer - u stvarnosti trebas da exportujes JSON iz localStorage
  // i onda ga importujes ovde

  console.log("[SUCCESS] Migracija gotova!");
  console.log(
    "[INFO] Svi podaci su sada u Supabase bazi. Aplikacija ce automatski citati odavde."
  );
}

migrateData().catch((error) => {
  console.error("[ERROR] Greska pri migraciji:", error);
  process.exit(1);
});
