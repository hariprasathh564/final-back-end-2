import Shipment from "../models/Shipment.js";

export const createShipment = async (req, res) => {
  const shipment = await Shipment.create(req.body);
  res.status(201).json(shipment);
};

export const updateShipmentStatus = async (req, res) => {
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(shipment);
};
