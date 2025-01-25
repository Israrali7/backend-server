const sendResponse = (isSuccesfull, message, data) => {
    return {
      isSuccesfull,
      message,
      data,
    };
  };
  
  module.exports = { sendResponse };