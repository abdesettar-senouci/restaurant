import qr from 'qrcode';

export const generateQRCode = async (data) => {
  try {
    const qrCode = await qr.toDataURL(data);
    return qrCode;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};