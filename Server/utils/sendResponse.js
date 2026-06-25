export const sendResponseJson = (
  res,
  statusCode,
  success,
  message,
  data = null,
) => {
  return res.staus(statusCode).json({
    success: success,
    message: message,
    data: data,
  });
};
