export const handleAsyncError = (apiFunction) => {
    return (req, res, next) => {
        apiFunction(req, res, next).catch(err => next(err));
    }
}
