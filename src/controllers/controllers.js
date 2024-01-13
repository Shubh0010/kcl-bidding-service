const { clearRedisData, getAllPlayersFromDB, getAllTeamsFromDB, getRedisData, initializeRedisData, updatePlayerData, updateRedisData, updateTeamData } = require("../services/services");
const { MESSAGES } = require("../utils/constant");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responses");

// get all players data

const getAllPlayers = async (req, res) => {

  try {

    const playersData = await getAllPlayersFromDB({player_id: null});

    sendSuccessResponse(res, playersData);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'getAllPlayers');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
}

// get all teams data

const getAllTeams = async (req, res) => {

  try {

    const teamsData = await getAllTeamsFromDB({});

    sendSuccessResponse(res, teamsData);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'getAllTeams');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
}

// create Session

const createSession = async (req, res) => {

  try {

    const { player_id } = req.body;

    if(!player_id) throw new Error('No player ID provided!')

    const sessionData = await initializeRedisData({ player_id });

    sendSuccessResponse(res, sessionData);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'createSession');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
}

// get data for current Session

const getSessionData = async (req, res) => {

  try {

    const sessionData = await getRedisData();

    sendSuccessResponse(res, sessionData);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'getSessionData');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
}

// make a bid

const makeBid = async (req, res) => {

  try {

    const { team_id, bid_amount } = req.body;

    const bidData = await updateRedisData({ team_id, bid_amount });

    sendSuccessResponse(res, bidData);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'makeBid');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
}

// completeBid

const completeBid = async (req, res) => {

  try {

    const { team_id = null, player_id, bought_at = null, bid_status, next_player_id } = req.body;

    await updatePlayerData({ bought_at, player_id, team_id,  status: bid_status});

    if(team_id) {

      await updateTeamData({team_id, player_id, bought_at});
    }

    await clearRedisData();

    if(player_id) {

      await initializeRedisData({ player_id: next_player_id });
    }

    sendSuccessResponse(res);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'completeBid');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
}

module.exports = {
  createSession,
  getAllPlayers, 
  getAllTeams,
  getSessionData,
  makeBid,
  completeBid,
};