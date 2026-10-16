"use client";

import { QRCodeSVG } from "qrcode.react";

export function QrCode({ value, size = 96 }: { value: string; size?: number }) {
  return <QRCodeSVG value={value} size={size} fgColor="#111418" bgColor="#ffffff" level="M" title="Scan to download the TGB app" />;
}
