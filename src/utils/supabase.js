import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lupgvxuxgdtnheuytpbi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1cGd2eHV4Z2R0bmhldXl0cGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjA2OTUsImV4cCI6MjAzODQzNjY5NX0.h0Mil29ZdPTF9tcMFHn-5eJR1tQ7n1MKfsugaKhCeKM';

export const supabase = createClient(supabaseUrl, supabaseKey);
