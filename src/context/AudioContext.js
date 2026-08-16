import React, { createContext, useContext, useState } from 'react';
import { useAudioRecorder, RecordingPresets } from 'expo-audio';
import { logError, logInfo } from '../utils/logger';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const startRecording = async () => {
    try {
      setRecordingError(null);
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.startAsync();
      setIsRecording(true);
      logInfo('AudioContext', 'Recording started');
    } catch (error) {
      logError('AudioContext.startRecording', error);
      setRecordingError(error.message);
    }
  };

  const stopRecording = async () => {
    try {
      setRecordingError(null);
      await audioRecorder.stopAsync();
      setIsRecording(false);
      logInfo('AudioContext', 'Recording stopped');
    } catch (error) {
      logError('AudioContext.stopRecording', error);
      setRecordingError(error.message);
    }
  };

  const value = {
    isRecording,
    recordingError,
    startRecording,
    stopRecording,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

/**
 * Хук для использования AudioContext
 */
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
