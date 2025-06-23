declare module "react-speech-recognition" {
  export function useSpeechRecognition(): {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
    startListening: (options?: {
      continuous?: boolean;
      language?: string;
    }) => void;
    stopListening: () => void;
  };

  const SpeechRecognition: {
    startListening: (options?: {
      continuous?: boolean;
      language?: string;
    }) => void;
    stopListening: () => void;
    abortListening: () => void;
    getRecognition: () => SpeechRecognition | null;
  };

  export default SpeechRecognition;
}
