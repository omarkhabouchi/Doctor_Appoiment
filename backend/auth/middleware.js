const jwt = require("jsonwebtoken");
const auth = (requredRole = null) => {
  return async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    token = token.split(" ")[1];
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        console.log(decoded);
        req.user = decoded;
        if (requredRole && decoded.role !== requredRole) {
          return res.status(401).json({ message: "Access denied" });
        }
        next();
      }
    });
  };
};

module.exports = auth;

/********************************************************************* */
// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "Access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.secretKey);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

//VERSION PROFESSIONNELLE CORRIGÉE

// const jwt = require("jsonwebtoken");

// const auth = (requiredRole = null) => {
//   return (req, res, next) => {
//     try {
//       const authHeader = req.headers.authorization;

//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//       }

//       const token = authHeader.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.secretKey);

//       req.user = decoded;

//       // Vérification du rôle
//       if (requiredRole && decoded.role !== requiredRole) {
//         return res.status(403).json({ message: "Forbidden. Insufficient role." });
//       }

//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Invalid or expired token." });
//     }
//   };
// };

//module.exports = auth;

/*

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secretKey);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
*/

/*
const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

module.exports = roleMiddleware;

*/
/*
const auth = require("./authMiddleware");
const role = require("./roleMiddleware");

router.post("/add-doctor", auth, role("admin"), (req, res) => {
  res.json({ message: "Doctor added" });
});

*/
