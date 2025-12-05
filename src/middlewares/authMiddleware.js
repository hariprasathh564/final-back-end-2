//important//
// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role))
//       return res.status(403).json({ message: "Access denied" });
//     next();
//   };
// };




// // src/middlewares/authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Protect middleware
// export const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User does not exist" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // Authorize middleware
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };






// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer "))
//     return res.status(401).json({ message: "Not authorized" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role))
//       return res.status(403).json({ message: "Access denied" });
//     next();
//   };
// };


// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer "))
//     return res.status(401).json({ message: "Not authorized" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role))
//       return res.status(403).json({ message: "Access denied" });
//     next();
//   };
// };

// // ⭐ ADMIN ONLY MIDDLEWARE
// export const adminOnly = authorize("admin");


import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // full user document
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied" });
    next();
  };
};

export const adminOnly = authorize("admin");
