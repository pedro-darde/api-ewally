import { NextFunction, Request, Response } from "express";
import BoletoService from "../services/BoletoService";
export default {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo } = req.params;

      let boletoService = new BoletoService();
      let response = boletoService.setCodigo(codigo);

      if (codigo.length === 44) {
        //TODO codigo para validar boletos de convênio
      }

      return res.status(200).json({
        codigo: codigo,
        dataVencimento: response.dataVencimento,
        valor: response.valorTotal,
      });
    } catch (error) {
      next(error);
    }
  },
};
