const admin = require("../config/firebase");

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (!idToken) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyFirebaseToken;
