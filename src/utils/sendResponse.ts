import { Response } from "express"

type TSendResponse<T> = {
    success?: boolean,
    statusCode:number
    message: string,
    data: T|T[]|null,
}

const sendResponse = <T>(res:Response, data:TSendResponse<T>) => {
       return res.status(data.statusCode).json({
          success: true,
          statusCode: data.statusCode,
          message: data.message,
          data:data.data,
        });
}

export default sendResponse