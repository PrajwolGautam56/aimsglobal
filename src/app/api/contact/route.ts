/** Backwards-compatible alias for /api/enquiry */
import { POST as enquiryPost } from "@/app/api/enquiry/route";

export async function POST(req: Request) {
  return enquiryPost(req);
}
