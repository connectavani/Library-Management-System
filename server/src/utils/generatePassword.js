const generatePassword = async () => {
  const randomPassword = '12345678'; // crypto.randomBytes(4).toString("hex"); // 16-character random password
  return randomPassword;
};

export default generatePassword;
