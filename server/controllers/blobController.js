// handel incoming req
class BlobController {
  constructor(service) {
    this.service = service;
  }

  upload = async (req, res) => {
    try {
      const { id, data } = req.body;

      if (!id || !data) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const result = await this.service.upload(id, data);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  get = async (req, res) => {
    try {
      const blob = await this.service.get(req.params.id);
      res.json(blob);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
}

export default BlobController;