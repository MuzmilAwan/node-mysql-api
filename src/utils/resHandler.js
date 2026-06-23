import { ServerResponse } from "#constants";


class ResponseHandler {
    static successHandler = (res, data = "", message) => {
        res.status(ServerResponse.API_STATUS_CODE.SUCCESS).json({
            status: ServerResponse.API_STATUS_CODE.SUCCESS,
            message: message || ServerResponse.API_RESPONSE_MESSAGE.SUCCESS,
            ...data,
        });
    };

    static errorHandler = (res, error) => {
        res.status(
            error.status
                ? error.status
                : ServerResponse.API_STATUS_CODE.INTERNAL_SERVER_ERROR
        ).json({
            status: error.status
                ? error.status
                : ServerResponse.API_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
        if (error.logging === false) return "";
        Logger.controllerLogger.logError(error);
    };

    static createHandler = (
        res,
        data = "",
        message = ServerResponse.API_RESPONSE_MESSAGE.CREATED
    ) => {
        res.status(ServerResponse.API_STATUS_CODE.CREATED).json({
            status: ServerResponse.API_STATUS_CODE.CREATED,
            message: message || ServerResponse.API_RESPONSE_MESSAGE.CREATED,
            ...data,
        });
    };

    static tooManyRequests(
        res,
        data = null,
        message = ServerResponse.API_RESPONSE_MESSAGE.RATE_LIMIT
    ) {
        return res.status(ServerResponse.API_STATUS_CODE.RATE_LIMIT).json({
            status: ServerResponse.API_STATUS_CODE.RATE_LIMIT,
            message,
            data,
        });
    }

    static authHandler(
        res,
        message = ServerResponse.API_RESPONSE_MESSAGE.AUTHORIZATION_FAILED,
        status = ServerResponse.API_STATUS_CODE.AUTHORIZATION_FAILED
    ) {
        const error = new Error(message);
        error.status = status;

        Logger.authLogger.logError(error);
        return res
            .status(
                status ||
                    ServerResponse.API_RESPONSE_MESSAGE.AUTHORIZATION_FAILED
            )
            .json({
                status: status,
                message: message,
            });
    }
}

export default ResponseHandler;
