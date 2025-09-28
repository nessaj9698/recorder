interface AudioFile {
  disposition: string;
  filename: string;
  voice: string;
  estimatedSize: number;
  partID: string;
  subtype: string;
  type: string;
}

interface MIME {
  class: string;
  estimatedSize: number;
  subtype: string;
  type: string;
  audioFile: AudioFile;
}

export interface Message {
  Received: string;
  From: string;
  To: string;
  Duration: number;
  displayDate: string;
  displayTime: string;
  phoneNumber: string;
  formattedDuration: string;
  MIME: MIME;
}
