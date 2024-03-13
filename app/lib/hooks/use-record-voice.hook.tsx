'use client';

import React from 'react';

import { errorNotification } from '@/app/lib/notification';

interface RecordVoiceHook {
  recording: boolean;
  audioBlob: Blob | null;
  startRecording: () => void;
  stopRecording: () => void;
}

export const useRecordVoice = (): RecordVoiceHook => {
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);

  const [recording, setRecording] = React.useState<boolean>(false);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);

  const chunks = React.useRef<Blob[]>([]);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const newMediaRecorder = new MediaRecorder(stream);

        newMediaRecorder.onstart = () => {
          chunks.current = [];
        };

        newMediaRecorder.ondataavailable = (event: BlobEvent) => {
          chunks.current.push(event.data);
        };

        newMediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
        };

        newMediaRecorder.start();
        setRecording(true);
        setMediaRecorder(newMediaRecorder);
      })
      .catch((e) => {
        errorNotification(`Error accessing microphone: ${e.message}`);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);

      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    } else {
      console.warn('MediaRecorder is not initialized.');
    }
  };

  return { recording, audioBlob, startRecording, stopRecording };
};
