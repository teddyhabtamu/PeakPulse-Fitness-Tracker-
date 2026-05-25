const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { Pool } = require("pg");

const BUCKET_NAME = process.env.SUPABASE_BUCKET || "blog-images";

async function setupStorage() {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres.fvpzutavpzjjwyjxexym:9f9l3AkHJgSnNDbr@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  });

  console.log(`Setting up Supabase Storage bucket: "${BUCKET_NAME}"...`);

  try {
    // Create the bucket if it doesn't exist
    await pool.query(`
      INSERT INTO storage.buckets (id, name, public, created_at)
      VALUES ($1, $1, true, NOW())
      ON CONFLICT (id) DO UPDATE SET public = true
    `, [BUCKET_NAME]);
    console.log(`Bucket "${BUCKET_NAME}" created/updated successfully.`);

    // Create RLS policies for anon key access (enable RLS on objects if not already)
    await pool.query(`ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY`);

    const policies = [
      `DROP POLICY IF EXISTS "anon_blog_select_${BUCKET_NAME}" ON storage.objects`,
      `CREATE POLICY "anon_blog_select_${BUCKET_NAME}" ON storage.objects FOR SELECT TO anon USING (bucket_id = '${BUCKET_NAME}')`,
      `DROP POLICY IF EXISTS "anon_blog_insert_${BUCKET_NAME}" ON storage.objects`,
      `CREATE POLICY "anon_blog_insert_${BUCKET_NAME}" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = '${BUCKET_NAME}')`,
      `DROP POLICY IF EXISTS "anon_blog_update_${BUCKET_NAME}" ON storage.objects`,
      `CREATE POLICY "anon_blog_update_${BUCKET_NAME}" ON storage.objects FOR UPDATE TO anon USING (bucket_id = '${BUCKET_NAME}')`,
      `DROP POLICY IF EXISTS "anon_blog_delete_${BUCKET_NAME}" ON storage.objects`,
      `CREATE POLICY "anon_blog_delete_${BUCKET_NAME}" ON storage.objects FOR DELETE TO anon USING (bucket_id = '${BUCKET_NAME}')`,
    ];

    for (const sql of policies) {
      try {
        await pool.query(sql);
      } catch (err) {
        console.log(`  Skipped: ${err.message}`);
      }
    }
    console.log(`  RLS policies set for anon access on "${BUCKET_NAME}"`);

    console.log("\nSetup complete! Images will upload to Supabase Storage.");
  } catch (err) {
    console.error("Error:", err.message);
    console.error("\nTo set up manually:");
    console.error(`  1. Go to https://supabase.com/dashboard/project/fvpzutavpzjjwyjxexym`);
    console.error(`  2. Storage > "New Bucket" > name: "${BUCKET_NAME}" > Public: ON`);
    process.exit(1);
  } finally {
    await pool.end();
  }

  process.exit(0);
}

setupStorage();
