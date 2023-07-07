export const getAllTournamentPath = () => {
  return ".";
};

export const getTournamentPath = (id: string | any) => {
  return `._${id}`;
};
export const getTournamentByTournamentId = (tournamentId: string | any) => {
  return `._${tournamentId}`;
};

export const getTournamentState = (tournamentId: any) => {
  return `._${tournamentId}.state`;
};

export const getCurrentBlindLevel = (tournamentId: any) => {
  return `._${tournamentId}.currentBlindLevel`;
};

export const getTotalEntryFees = (tournamentId: any) => {
  return `._${tournamentId}.totalEntryFees`;
};

export const getSinglePlayer = (tournamentId: any, playerId: any) => {
  return `._${tournamentId}.player_list._${playerId}`;
};

export const getIsReentryAllowed = (tournamentId: any) => {
  return `._${tournamentId}.isReentryAllowed`;
};

export const getIsLateRegistrationAllowed = (tournamentId: any) => {
  return `._${tournamentId}.lateRegistrationAllowed`;
};

export const getReentryCount = (tournamentId: any, playerId: any) => {
  return `._${tournamentId}.player_list._${playerId}.reentries`;
};

export const getTournamentReentryCount = (tournamentId: any) => {
  return `._${tournamentId}.numberOfReentry`;
};

export const getReEntryTime = (tournamentId: any) => {
  return `._${tournamentId}.reentryTime`;
};

export const getReEntryPrice = (tournamentId: any) => {
  return `._${tournamentId}.reentryPrice`;
};

export const getTournamentStartTime = (tournamentId: any) => {
  return `._${tournamentId}.tournamentStartTime`;
};

export const getPlayerList = (tournamentId: any) => {
  return `._${tournamentId}.player_list`;
};

export const maxPlayerPerTable = (tournamentId: any) => {
  return `._${tournamentId}.maxPlayers`;
};

export const tables = (tournamentId: any) => {
  return `._${tournamentId}.tables`;
};

export const getSingleTable = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}`;
};

export const tableSeat = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}.seats`;
};

export const tableStatus = (tournamentId, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}.status`;
};

export const tablePlayers = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}.status`;
};

export const tableGameStatus = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}.gameStatus`;
};

export const leaderBoard = (tournamentId: any) => {
  return `._${tournamentId}.leaderBoard`;
};

export const singleTableStack = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tablesStack._${tableId}`;
};

export const singlePlayersChip = (tournamentId: any, playerId: any) => {
  return `._${tournamentId}.playersChip._${playerId}`;
};

export const singlePlayersPayout = (tournamentId: any, rankIndex: any) => {
  return `._${tournamentId}.playersPayout._${rankIndex}`;
};

export const playersChip = (tournamentId: any) => {
  return `._${tournamentId}.playersChip`;
};

export const tableReshuffleStatus = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}.reShuffleStatus`;
};

export const singleTable = (tournamentId: any, tableId: any) => {
  return `._${tournamentId}.tables._${tableId}`;
};

export const isReadyForShuffling = (tournamentId: any) => {
  return `._${tournamentId}.isReadyForShuffling`;
};

export const isScheduleForShuffling = (tournamentId: any) => {
  return `._${tournamentId}.isScheduleForShuffling`;
};

export const blindRuleId = (tournamentId: any) => {
  return `._${tournamentId}.blindRuleId`;
};

export const singlePlayer = (tournamentId: any, playerId: any) => {
  return `._${tournamentId}.player_list._${playerId}`;
};

export const singlePlayerStatus = (tournamentId: any, playerId: any) => {
  return `._${tournamentId}.player_list._${playerId}.status`;
};

export const singlePlayerTable = (tournamentId: any, playerId: any) => {
  return `._${tournamentId}.player_list._${playerId}.tableId`;
};
