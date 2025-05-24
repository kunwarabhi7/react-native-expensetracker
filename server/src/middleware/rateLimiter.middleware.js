import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const success = await rateLimit.limit("my-rate-limiter");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests , please try again later." });
    }
    next();
  } catch (error) {
    console.error("Error in rate limiter middleware:", error);
    next(error);
  }
};

export default rateLimiter;
