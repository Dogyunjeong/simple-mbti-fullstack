import { Request, Response } from "express"

export const handleError = (req: Request<any, any, any, any>, res: Response, err: Error, errMessage?: string) => {
console.log("Error", err)
  return res.status(500)
    .json({
      message: errMessage || err.message,
      err,
    })
}

export const handleResponse = (req: Request<any, any, any, any>, res: Response, data: any) => {
  return res.status(200)
    .json({ data })
}