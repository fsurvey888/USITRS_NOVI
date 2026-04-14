import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hrmljieyffbnucwdjoxs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_heibHXpkHuYaSDAs-z7N2A_9DFNtLTm";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Vijesti funkcije
export async function getAllVijesti() {
  const { data, error } = await supabase
    .from("vijesti")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[v0] Greska pri ucitavanju vijesti:", error);
    return [];
  }

  return data || [];
}

export async function getVijestBySlug(slug: string) {
  const { data, error } = await supabase
    .from("vijesti")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[v0] Greska pri ucitavanju vijesti:", error);
    return null;
  }

  return data;
}

export async function createVijest(vijest: any) {
  const { data, error } = await supabase
    .from("vijesti")
    .insert([vijest])
    .select()
    .single();

  if (error) {
    console.error("[v0] Greska pri kreiranju vijesti:", error);
    return null;
  }

  return data;
}

export async function updateVijest(id: number, updates: any) {
  const { data, error } = await supabase
    .from("vijesti")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[v0] Greska pri azuriranju vijesti:", error);
    return null;
  }

  return data;
}

export async function deleteVijest(id: number) {
  const { error } = await supabase.from("vijesti").delete().eq("id", id);

  if (error) {
    console.error("[v0] Greska pri brisanju vijesti:", error);
    return false;
  }

  return true;
}

// Zanimljivosti funkcije
export async function getAllZanimljivosti() {
  const { data, error } = await supabase
    .from("zanimljivosti")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[v0] Greska pri ucitavanju zanimljivosti:", error);
    return [];
  }

  return data || [];
}

export async function createZanimljivost(zanimljivost: any) {
  const { data, error } = await supabase
    .from("zanimljivosti")
    .insert([zanimljivost])
    .select()
    .single();

  if (error) {
    console.error("[v0] Greska pri kreiranju zanimljivosti:", error);
    return null;
  }

  return data;
}

export async function updateZanimljivost(id: number, updates: any) {
  const { data, error } = await supabase
    .from("zanimljivosti")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[v0] Greska pri azuriranju zanimljivosti:", error);
    return null;
  }

  return data;
}

export async function deleteZanimljivost(id: number) {
  const { error } = await supabase.from("zanimljivosti").delete().eq("id", id);

  if (error) {
    console.error("[v0] Greska pri brisanju zanimljivosti:", error);
    return false;
  }

  return true;
}

// Dokumenti funkcije
export async function getAllDokumenti() {
  const { data, error } = await supabase
    .from("dokumenti")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[v0] Greska pri ucitavanju dokumenata:", error);
    return [];
  }

  return data || [];
}

export async function createDokument(dokument: any) {
  const { data, error } = await supabase
    .from("dokumenti")
    .insert([dokument])
    .select()
    .single();

  if (error) {
    console.error("[v0] Greska pri kreiranju dokumenta:", error);
    return null;
  }

  return data;
}

export async function deleteDokument(id: number) {
  const { error } = await supabase
    .from("dokumenti")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[v0] Greska pri brisanju dokumenta:", error);
    return false;
  }

  return true;
}

// Pozivi funkcije
export async function getAllPozivi() {
  const { data, error } = await supabase
    .from("pozivi")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[v0] Greska pri ucitavanju poziva:", error); return []; }
  return data || [];
}

export async function createPoziv(poziv: any) {
  const { data, error } = await supabase.from("pozivi").insert([poziv]).select().single();
  if (error) { console.error("[v0] Greska pri kreiranju poziva:", error); return null; }
  return data;
}

export async function updatePoziv(id: number, updates: any) {
  const { data, error } = await supabase.from("pozivi").update(updates).eq("id", id).select().single();
  if (error) { console.error("[v0] Greska pri azuriranju poziva:", error); return null; }
  return data;
}

export async function deletePoziv(id: number) {
  const { error } = await supabase.from("pozivi").delete().eq("id", id);
  if (error) { console.error("[v0] Greska pri brisanju poziva:", error); return false; }
  return true;
}

// Prijave clanova
export async function createClanPrijava(data: {
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  struka: string;
  napomena: string;
}) {
  const { data: result, error } = await supabase
    .from("clanovi_prijave")
    .insert([{ ...data, status: "na_cekanju" }])
    .select()
    .single();
  if (error) { console.error("[v0] Greska pri prijavi clana:", error); return null; }
  return result;
}

export async function getAllClanPrijave() {
  const { data, error } = await supabase
    .from("clanovi_prijave")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[v0] Greska pri ucitavanju prijava:", error); return []; }
  return data || [];
}

export async function updateClanPrijavaStatus(id: number, status: string) {
  const { data, error } = await supabase
    .from("clanovi_prijave")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) { console.error("[v0] Greska pri azuriranju statusa:", error); return null; }
  return data;
}

export async function deleteClanPrijava(id: number) {
  const { error } = await supabase.from("clanovi_prijave").delete().eq("id", id);
  if (error) { console.error("[v0] Greska pri brisanju prijave:", error); return false; }
  return true;
}
