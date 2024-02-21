export const testController = (req, res) => {
  res.status(200).send({
    message: "Tests Routes",
    success: true,
  });
};
