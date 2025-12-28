import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key-32-chars-long!';


export function decryptData<T>(encryptedText: string): T {
  try {

    const combinedBuffer = Buffer.from(encryptedText, 'base64');
    
    const iv = combinedBuffer.slice(0, 12);
    const encryptedData = combinedBuffer.slice(12);
    
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32), 'utf8');
    
    const authTag = encryptedData.slice(-16);
    const ciphertext = encryptedData.slice(0, -16);
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(ciphertext);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    const decryptedString = decrypted.toString('utf8');
    return JSON.parse(decryptedString) as T;
  } catch (error) {
    console.error('Server decryption error:', error);
    throw new Error('Failed to decrypt data on server');
  }
}


export function encryptData<T>(data: T): string {
  try {
    const dataString = JSON.stringify(data);
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32), 'utf8');
    
    const iv = crypto.randomBytes(12);
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(dataString, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    const authTag = cipher.getAuthTag();
    
    const combined = Buffer.concat([iv, encrypted, authTag]);
    
    return combined.toString('base64');
  } catch (error) {
    console.error('Server encryption error:', error);
    throw new Error('Failed to encrypt data on server');
  }
}