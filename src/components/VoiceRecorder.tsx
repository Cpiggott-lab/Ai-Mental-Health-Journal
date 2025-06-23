// https://www.npmjs.com/package/react-speech-recognition

"use client";

import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type VoiceRecorderProps = {
  transcript: string;
  setTranscript: (value: string) => void;
};

export default function VoiceRecorder({
  transcript,
  setTranscript,
}: VoiceRecorderProps) {
  const {
    transcript: liveTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  React.useEffect(() => {
    setTranscript(liveTranscript);
  }, [liveTranscript, setTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-sm text-red-600">
        Your browser does not support speech recognition.
      </p>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      {listening ? (
        <button
          onClick={() => SpeechRecognition.stopListening()}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={() => {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
          }}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
        >
          Start Recording
        </button>
      )}
    </div>
  );
}
