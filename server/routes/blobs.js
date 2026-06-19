import { Router } from "express";

function blobRoutes(controller) {
  const router = Router();

  router.post("/v1/blobs", controller.upload);
  router.get("/v1/blobs/:id", controller.get);

  return router;
}

export default blobRoutes;