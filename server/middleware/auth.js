//Any request to the service should be authenticated using Bearer token authentication.
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" }); // forbidden access if no token
  }

  const token = header.split(" ")[1];

  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}

export default auth;