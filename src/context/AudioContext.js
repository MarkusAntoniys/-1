import React, { createContext, useContext, useState, useRef } from 'react';
import { useAudioRecorder, RecordingPresets } from 'expo-audio';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const startRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.startAsync();
      setIsRecording(true);
    } catch (error) {
      console.error('Ошибка старта записи:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stopAsync();
      setIsRecording(false);
    } catch (error) {
      console.error('Ошибка остановки записи:', error);
    }
  };

  return (
    <AudioContext.Provider value={{ isRecording, startRecording, stopRecording }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
