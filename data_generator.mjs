// Voicemail Data Generator
// Generates 10,000 voicemail records in JSON format
import fs from "fs";

function generateVoicemailData(recordCount = 10000) {
  // Phone number patterns for realistic Russian phone numbers
  const phonePatterns = [
    "+7925",
    "+7926",
    "+7927",
    "+7928",
    "+7929", // Moscow region
    "+7495",
    "+7499", // Moscow city
    "+7812",
    "+7813", // St. Petersburg
    "+7343",
    "+7365", // Ekaterinburg
    "+7383",
    "+7384", // Novosibirsk
    "+7846",
    "+7847", // Samara
    "+7861",
    "+7862", // Krasnodar
  ];

  // Generate random phone number
  function generatePhoneNumber() {
    const pattern =
      phonePatterns[Math.floor(Math.random() * phonePatterns.length)];
    const suffix = String(Math.floor(Math.random() * 10000000)).padStart(
      7,
      "0"
    );
    return pattern + suffix;
  }

  // Generate random date within the year (01.01 to 31.12)
  function generateRandomDate() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Начало года
    const startOfYear = new Date(currentYear, 0, 1).getTime();
    // Текущий момент
    const end = now.getTime();

    // Случайный timestamp в диапазоне
    const randomTimestamp = startOfYear + Math.random() * (end - startOfYear);
    const randomDate = new Date(randomTimestamp);

    // Форматирование
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = days[randomDate.getDay()];
    const dayStr = String(randomDate.getDate()).padStart(2, "0");
    const monthName = months[randomDate.getMonth()];
    const monthStr = String(randomDate.getMonth() + 1).padStart(2, "0");
    const hourStr = String(randomDate.getHours()).padStart(2, "0");
    const minuteStr = String(randomDate.getMinutes()).padStart(2, "0");
    const secondStr = String(randomDate.getSeconds()).padStart(2, "0");

    const received = `${dayOfWeek}, ${dayStr} ${monthName} ${currentYear} ${hourStr}:${minuteStr}:${secondStr} +0000`;
    const localTime = `${currentYear}${monthStr}${dayStr}T${hourStr}${minuteStr}${secondStr}`;
    const utcTime = `${currentYear}${monthStr}${dayStr}T${hourStr}${minuteStr}${secondStr}Z`;

    return {
      received,
      localTime,
      utcTime,
      displayDate: `${dayStr}.${monthStr}`,
      displayTime: `${hourStr}:${minuteStr}`,
    };
  }

  // Generate random duration in seconds with weighted distribution
  function generateDuration() {
    const rand = Math.random();
    if (rand < 0.4) {
      // 40% - Short messages: 5-60 seconds
      return Math.floor(Math.random() * 55) + 5;
    } else if (rand < 0.7) {
      // 30% - Medium messages: 60-300 seconds
      return Math.floor(Math.random() * 240) + 60;
    } else if (rand < 0.9) {
      // 20% - Long messages: 300-900 seconds
      return Math.floor(Math.random() * 600) + 300;
    } else {
      // 10% - Very long messages: 900-1800 seconds
      return Math.floor(Math.random() * 900) + 900;
    }
  }

  // Generate file size based on duration (realistic for 32kadpcm format)
  function generateFileSize(duration) {
    const baseSize = 45000; // Base overhead in bytes
    const bytesPerSecond = 4000; // ~4KB per second for 32kadpcm
    const variance = 0.8 + Math.random() * 0.4; // ±20% variance
    return Math.floor(baseSize + duration * bytesPerSecond * variance);
  }

  // Helper function to format duration as MM:SS
  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  const currentYear = new Date().getFullYear();

  const records = [];

  console.log(`Generating ${recordCount} voicemail records...`);

  // Generate records
  for (let i = 0; i < recordCount; i++) {
    if (i % 1000 === 0) {
      console.log(`Progress: ${i}/${recordCount} records generated`);
    }

    const dateInfo = generateRandomDate();
    const duration = generateDuration();
    const estimatedSize = generateFileSize(duration);
    const audioSize = Math.floor(estimatedSize * 0.75); // Audio part is ~75% of total

    const fromPhone = generatePhoneNumber();
    const toPhone = "+79991234567"; // Fixed destination number

    // Generate filename based on date/time
    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][parseInt(dateInfo.localTime.substring(4, 6)) - 1];
    const filename = `vmail-${currentYear}-${monthName}-${dateInfo.localTime.substring(6, 8)}_${dateInfo.displayTime.replace(":", "-")}.wav`;

    const record = {
      Received: dateInfo.received,
      From: `${fromPhone}`,
      To: `${toPhone}`,
      MIME: {
        class: "audio",
        estimatedSize: estimatedSize,
        subtype: "voice-message",
        type: "multipart",
        audioFile: {
          disposition: "inline",
          filename: filename,
          voice: "voice-message",
          estimatedSize: audioSize,
          partID: "01",
          subtype: "32kadpcm",
          type: "audio",
        },
      },
      Duration: duration,
      // Additional fields for UI display
      displayDate: dateInfo.displayDate,
      displayTime: dateInfo.displayTime,
      phoneNumber: fromPhone,
      formattedDuration: formatDuration(duration),
    };

    records.push(record);
  }

  return records;
}

// Generate the complete dataset
export function createVoicemailDump(recordCount = 10000) {
  const records = generateVoicemailData(recordCount).sort((a, b) => {
    const dateA = new Date(a.Received).getTime();
    const dateB = new Date(b.Received).getTime();
    return dateB - dateA;
  });

  const finalData = {
    metadata: {
      totalRecords: records.length,
      generatedDate: new Date().toISOString().split("T")[0],
      format: "voicemail_data_dump",
      version: "1.0",
      description: `${records.length} voicemail records with phone numbers, dates from 01.01 to 31.12`,
      phoneNumberFormats: [
        "Moscow region: +7925xxxxxxx, +7926xxxxxxx, +7927xxxxxxx, +7928xxxxxxx, +7929xxxxxxx",
        "Moscow city: +7495xxxxxxx, +7499xxxxxxx",
        "St. Petersburg: +7812xxxxxxx, +7813xxxxxxx",
        "Other regions: +7343xxxxxxx, +7383xxxxxxx, +7846xxxxxxx, +7861xxxxxxx",
      ],
      audioFormat: "32kadpcm WAV files",
      durationRange: "5 seconds to 30 minutes",
      dateRange: "January 1 to December 31",
    },
    records: records,
  };

  return finalData;
}

// Usage example:
const voicemailData = createVoicemailDump(10000);
const jsonString = JSON.stringify(voicemailData, null, 2);
//
// Save to file:
fs.writeFileSync("voicemail_data.json", jsonString, "utf8");

// For browser usage:
// const dataBlob = new Blob([jsonString], { type: 'application/json' });
// const url = URL.createObjectURL(dataBlob);
