export const authToken = process.env.NEXT_PUBLIC_TOKEN;

export async function createMeeting({ token }: { token: string }) {
  const response = await fetch("https://api.videosdk.live/v1/meetings", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const data = await response.json();
  return data.meetingId;
}
