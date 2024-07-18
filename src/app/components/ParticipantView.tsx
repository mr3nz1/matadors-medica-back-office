import React, { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

interface ParticipantViewProps {
  participantId: string;
}

const ParticipantView: React.FC<ParticipantViewProps> = ({ participantId }) => {
  const micRef = useRef<HTMLAudioElement>(null);
  const { micStream, micOn, isLocal, displayName } = useParticipant(participantId);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) => console.error("micRef.current.play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={participantId}>
      <p>
        Participant: {displayName} | Mic: {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
    </div>
  );
};

export default ParticipantView;
