const crypto = require("crypto");

const algorithm = process.env.CRYPTO_ALGORITHM as string || "aes-256-ctr";
const initVector = crypto.randomBytes(Number(process.env.NUM_RANDOM_BYTES as string || 16));
const secretKey = process.env.CRYPTO_KEY as string || "eShVmYq3t6w9z$B&E)H@McQfTjWnZr4u";

const encryptSurveyId = (surveyId: number) => {

  const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);

  const encryptedData = Buffer.concat([cipher.update(surveyId.toString()), cipher.final()]);

  return {
    iv: initVector.toString('hex'),
    content: encryptedData.toString('hex')
  };
}

const decryptSurveyId = (hash: { iv: string, content: string }) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decryptedData = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return Number(decryptedData.toString());
}

export { encryptSurveyId, decryptSurveyId };