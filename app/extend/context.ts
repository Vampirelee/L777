
module.exports = {
  success(data, status = 200, msg = '成功') {
    this.status = status;
    this.body = {
      code: status,
      data,
      msg,
    };
  },
  error(status = 500, msg = '失败') {
    this.status = status;
    this.body = {
      code: status,
      msg,
    };
  },
};
