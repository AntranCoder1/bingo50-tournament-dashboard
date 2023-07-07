import mongoose from "mongoose";
import TournamentClose from "../models/tournamentClosed.model";

export const getByTournamentId = async (id: string) => {
  return await TournamentClose.find({ tournamentId: id });
};

export const getTournamentClose = async (id: string) => {
  return await TournamentClose.findOne({
    _id: id,
  });
};
