import { NextFunction, Request, Response } from "express"

const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: err.name || "Something went wrong!",
        error: err
    })
};

export default globalErrorHandler;