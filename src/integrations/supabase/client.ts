// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fjvaewkqcppbxpykoyqr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdmFld2txY3BwYnhweWtveXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTYzMjIsImV4cCI6MjA1OTMzMjMyMn0.ibzUckvswmg8QgSjLq2u9CqDQPmWa3Ut8GnYDLjmYNQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);