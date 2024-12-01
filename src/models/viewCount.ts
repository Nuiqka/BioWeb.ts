import pool from "@/lib/db";

export async function createViewCount(ip: string, userId: string) {
  const [result] = await pool.query(
    "INSERT INTO view_counts (ip_address, user_id) VALUES (?, ?)",
    [ip, userId]
  );
  return result;
}

export async function getViewCount() {
  const [rows] = await pool.query(
    "SELECT COUNT(DISTINCT user_id) as count FROM view_counts"
  );
  return (rows as any)[0].count;
}

export async function getUserIdByIp(ip: string) {
  const [rows] = await pool.query(
    "SELECT user_id FROM view_counts WHERE ip_address = ? LIMIT 1",
    [ip]
  );
  return (rows as any)[0]?.user_id;
}
