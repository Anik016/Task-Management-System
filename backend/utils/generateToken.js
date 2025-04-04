import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction, // Use secure flag in production
    sameSite: isProduction ? "None" : "Lax", // Use 'None' for cross-site cookies in production
    domain: isProduction ? "onrender.com" : undefined, // Set domain only in production
    path: "/",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return token;
};

export default generateToken;

