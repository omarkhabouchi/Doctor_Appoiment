// function validateFields(requiredFields) {
//   return (req, res, next) => {
//     const errors = [];

//     requiredFields.forEach(field => {
//       if (field === "image" && (!req.file || !req.file.filename)) {
//         errors.push(field);
//       } else if (!req.body[field]) {
//         errors.push(field);
//       }
//     });

//     if (errors.length > 0) {
//       return res.status(400).json({ message: `Les champs requis : ${errors.join(", ")}` });
//     }

//     next();
//   };
// }

// module.exports = validateFields;
