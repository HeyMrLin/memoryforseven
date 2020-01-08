module.exports = {
  devServer: {
    port: 7777,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/memory' : '',
};
