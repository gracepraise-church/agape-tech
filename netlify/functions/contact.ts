import type { Handler } from "@netlify/functions";
import { handleContactRequest } from "../../lib/contact/handler";

export const handler: Handler = async (event) =>
  handleContactRequest({
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
    isBase64Encoded: event.isBase64Encoded,
  });
