import BioLinks from "@/components/BioLinks";
import { getViewCount } from "@/services/viewService";

export default async function Home() {
  const viewCount = await getViewCount();
  return <BioLinks initialViewCount={viewCount} />;
}
