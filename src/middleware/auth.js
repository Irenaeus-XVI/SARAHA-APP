import Jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    let { token } = req.headers;

    Jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ Message: "Invalid Token", err });
        }

        req.userId = decoded.id;
        next();
    });



}