// migrate-resources.js

import { createClient } from '@supabase/supabase-js';

// !! IMPORTANT !!
// Replace with your actual Supabase URL and **service role key**.
// Be extremely careful with your service role key. Do NOT expose it in frontend code.
// This script should be run ONLY in a secure environment (like your local machine).
const supabaseUrl = 'https://fbyfplidwrvyzompkcid.supabase.co';
const supabaseServiceRoleKey = 'sb_publishable_MJSNY5BqpBEUw-ufKX_Mow_Gz2E7iTW';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function migrateResources() {
  console.log('Starting resource migration...');

  let RESOURCES;
  try {
    // Dynamically import the compiled JavaScript file
    const resourceDataModule = await import('./src/lib/resource-data.js');
    RESOURCES = resourceDataModule.RESOURCES;

    if (!RESOURCES || RESOURCES.length === 0) {
      console.log('No resources found in src/lib/resource-data.js to migrate.');
      return;
    }
  } catch (error) {
    console.error('Error importing resource data:', error.message);
    console.error('Please ensure src/lib/resource-data.ts is compiled to src/lib/resource-data.js and check the export.');
    return;
  }

  for (const resource of RESOURCES) {
    console.log(`Attempting to insert resource with ID: ${resource.id}`);
    const { data, error } = await supabase
      .from('resources')
      .insert([resource]);

    if (error) {
      console.error(`Error inserting resource ${resource.id}:`, error.message);
      // Depending on the error (e.g., duplicate ID), you might want to skip or handle it differently
    } else {
      console.log(`Successfully inserted resource ${resource.id}`);
    }
  }

  console.log('Resource migration finished.');
}

migrateResources();
