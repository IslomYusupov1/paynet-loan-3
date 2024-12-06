import ky from "ky";
import { selloIdUrl } from "../constants/AppConstants";

export function RefreshTokenFunction(refreshToken: string | undefined) {
  const request: Promise<{ accessToken: string; refreshToken: string }> = ky
    .get("v2/dashboard/auth/reset-password", {
      headers: {
        "X-REALM": "sello-pay",
      },
      json: {
        refreshToken: refreshToken,
      },
      prefixUrl: selloIdUrl,
    })
    .json();
  return { request };
}
