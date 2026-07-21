import {
  createContactRequestHandler,
  createInMemoryContactRateLimiter,
} from "@/lib/contactRequest";
import {
  getContactTransportState,
  sendContactMessage,
} from "@/lib/contactTransport";

export const runtime = "nodejs";

// Best effort only: serverless instances do not share or persist this state.
const rateLimiter = createInMemoryContactRateLimiter();
const handleContactRequest = createContactRequestHandler({
  getTransportState: getContactTransportState,
  sendMessage: sendContactMessage,
  rateLimiter,
});

export async function POST(request: Request): Promise<Response> {
  return handleContactRequest(request);
}
