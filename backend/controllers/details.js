module.exports = function(app) {
  app.get('/api/details', (req, res) => {
    const fileToDownload = `${__dirname}/../blob/source-code.zip`;
    res.download(fileToDownload);
  });
};
