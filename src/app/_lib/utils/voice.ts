export function createWavHeader(
  byteLength: number,
  sampleRate: number,
  channels: number,
) {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + byteLength, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * channels * 2, true);
  view.setUint16(32, channels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, byteLength, true);

  return new Uint8Array(header);
}

export function createWavFile(audioChunks: Uint8Array[]) {
  const totalLength = audioChunks.reduce((acc, val) => acc + val.length, 0);
  const combinedBuffer = new Int16Array(totalLength);

  let offset = 0;
  for (const chunk of audioChunks) {
    combinedBuffer.set(chunk, offset);
    offset += chunk.length;
  }

  const wavHeader = createWavHeader(combinedBuffer.length * 2, 16000, 1);
  const wavBuffer = new Uint8Array(
    wavHeader.length + combinedBuffer.byteLength,
  );

  wavBuffer.set(wavHeader, 0);
  wavBuffer.set(new Uint8Array(combinedBuffer.buffer), wavHeader.length);

  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recording.wav';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

export function bufferToWave(abuffer: AudioBuffer): Blob {
  const numOfChannels = abuffer.numberOfChannels;
  const length = abuffer.length * numOfChannels * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);

  let offset = 0;
  let pos = 0;

  // Write WAV header
  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };

  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // RIFF identifier
  setUint32(0x46464952); // "RIFF"
  // file length minus RIFF identifier length and file description length
  setUint32(length - 8);
  // RIFF type
  setUint32(0x45564157); // "WAVE"
  // format chunk identifier
  setUint32(0x20746d66); // "fmt "
  // format chunk length
  setUint32(16);
  // sample format (raw)
  setUint16(1);
  // channel count
  setUint16(numOfChannels);
  // sample rate
  setUint32(abuffer.sampleRate);
  // byte rate (sample rate * block align)
  setUint32(abuffer.sampleRate * numOfChannels * 2);
  // block align (channel count * bytes per sample)
  setUint16(numOfChannels * 2);
  // bits per sample
  setUint16(16);
  // data chunk identifier
  setUint32(0x61746164); // "data"
  // data chunk length
  setUint32(length - pos - 4);

  // Write interleaved PCM samples
  for (let i = 0; i < abuffer.length; i++) {
    for (let channel = 0; channel < numOfChannels; channel++) {
      const sample = Math.max(
        -1,
        Math.min(1, abuffer.getChannelData(channel)[i]),
      ); // clamp
      view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      pos += 2;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}
