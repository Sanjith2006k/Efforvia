// Sanitization function to prevent NoSQL injection/database breaches
const sanitizeInput = (val) => {
  if (val instanceof Object) {
    for (const key in val) {
      if (key.startsWith("$")) {
        delete val[key];
      } else {
        sanitizeInput(val[key]);
      }
    }
  }
  return val;
};

const securePayloads = (req, res, next) => {
  if (req.body) sanitizeInput(req.body);
  if (req.query) sanitizeInput(req.query);
  if (req.params) sanitizeInput(req.params);
  next();
};

module.exports = { securePayloads };
