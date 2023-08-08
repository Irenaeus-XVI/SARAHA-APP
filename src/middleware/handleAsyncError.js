export const handleAsyncError = (apiFunction) => {
    return (req, res, next) => {
        apiFunction(req, res).catch(err => res.json({ "Error": err }));
    }
}
