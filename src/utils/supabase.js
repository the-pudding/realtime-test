import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const insert = async ({ table, data }) => {
	const opts = { returning: "minimal" };
	const response = await supabase.from(table).insert(data, opts);
	if (response.error) {
		console.log(response.error);
		throw new Error("insert failed");
	}
	return response;
};
