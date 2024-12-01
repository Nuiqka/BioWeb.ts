import { getProfile } from "@/services/profileService";
import { getViewStats } from "@/services/viewService";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.profileId) {
    redirect("/login");
  }

  const [profile, viewStats] = await Promise.all([
    getProfile(session.user.profileId),
    getViewStats(session.user.profileId),
  ]);

  if (!profile) {
    return <div>Profile not found. Please contact support.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/profile">Edit Profile</Link>
          </li>
          <li>
            <Link href="/dashboard/social-links">Manage Social Links</Link>
          </li>
          <li>
            <Link href="/dashboard/custom-links">Manage Custom Links</Link>
          </li>
          <li>
            <Link href="/dashboard/music">Manage Music</Link>
          </li>
          <li>
            <Link href="/dashboard/discord">Manage Discord</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">View Stats</h2>
        <p>Unique Views: {viewStats.uniqueViews}</p>
        <p>Total Views: {viewStats.totalViews}</p>
      </section>
    </div>
  );
}
