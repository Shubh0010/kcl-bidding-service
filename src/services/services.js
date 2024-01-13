const { query } = require("../database/mysql");
const { RESPONSE_STATUS, MESSAGES, POTS_AVAILABLE, MAX_POT_PLAYERS_COUNT } = require("../utils/constant");
const { PARSE_JSON } = require("../utils/misc");

const { connectToRedis } = require('../database/redisConnection');

redisClient = connectToRedis();

/**
 * Get All Players
 */

const getAllPlayersFromDB = async ({ player_id }) => {

  try {

    const whereParams = [];

    let sqlQuery = ' SELECT * FROM tb_players WHERE status = 0 ';

    if (player_id) {

      sqlQuery = ' SELECT * FROM tb_players WHERE id = ? ';
      whereParams.push(player_id);
    }

    const data = await query(sqlQuery, whereParams);

    return {
      status: RESPONSE_STATUS.SUCCESS,
      data
    }

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'getAllPlayersFromDB');
    console.error(error.message);

    return {
      status: RESPONSE_STATUS.FAILURE,
    }
  }
};

/**
 * Get All Teams
 */

const getAllTeamsFromDB = async ({ team_id }) => {

  try {

    const whereParams = [];

    let sqlQuery = ' SELECT * FROM tb_teams WHERE 1=1';

    if (team_id) {

      sqlQuery += ' AND id = ? ';
      whereParams.push(team_id);
    }

    const data = await query(sqlQuery, whereParams);

    return {
      status: RESPONSE_STATUS.SUCCESS,
      data
    }

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'getAllTeamsFromDB');
    console.error(error.message);

    return {
      status: RESPONSE_STATUS.FAILURE,
    }
  }
};

/**
 * Get Session data
 */

const getRedisData = async () => {

  const client = await redisClient.connect();

  let data;

  try {

    data = await client.get('session_data');

    if (!data) {

      const playersData = await getAllPlayersFromDB({});

      let [player] = playersData?.data;

      await initializeRedisData({ player_id: player.id, client_:client });

      data = await client.get('session_data');
    }

    return {
      status: RESPONSE_STATUS.SUCCESS,
      data: PARSE_JSON(data)
    }

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'getRedisdata');
    console.error(error);

    return {
      status: RESPONSE_STATUS.FAILURE,
    }
  } finally {

    await client.quit();
  }
};

/**
 * Make Bid
 */

const updateRedisData = async ({ team_id, bid_amount }) => {

  const client = await redisClient.connect();

  try {

    // check if team can bid on the player

    const json = await client.get('session_data');

    const { teamObj, playerObj } = PARSE_JSON(json);

    const team = teamObj[team_id];

    if (team.max_bid < bid_amount) {

      throw new Error('Max bid reached');
    }

    if (playerObj.pot == POTS_AVAILABLE.POT_A && team.pot_a_players == MAX_POT_PLAYERS_COUNT) {

      throw new Error('Cannot bid on POT A Players');
    };

    // check if team can get this player of pot

    if (playerObj.pot == POTS_AVAILABLE.POT_B && team.pot_b_players == MAX_POT_PLAYERS_COUNT) {

      throw new Error('Cannot bid on POT B Players');
    }

    // if it can update redis

    playerObj.current_team = team_id;

    team.current_bid = bid_amount;

    await client.set('session_data', JSON.stringify({
      teamObj,
      playerObj,
      bid_amount
    }));

    return {
      status: RESPONSE_STATUS.SUCCESS
    }

  } catch (error) {
    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'updateRedisData');
    console.error(error.message);
    return {
      status: RESPONSE_STATUS.FAILURE,
    }
  } finally {

    await client.quit();
  }
};

/**
 * Player update (Sold / Unsold)
 */

const updatePlayerData = async ({ player_id, team_id, bought_at, status }) => {

  try {

    if (!player_id) throw new Error('Provide valid player ID.');

    if (!team_id && status != -1) throw new Error('Provide valid team ID or mark player as unsold.');

    const updateObj = {};

    bought_at ? updateObj.bought_at = bought_at : null;
    team_id ? updateObj.team_id = team_id : null;
    status ? updateObj.status = status: null;

    await query(`UPDATE tb_players SET ? WHERE id = ?`, [updateObj, player_id]);

    return {
      status: RESPONSE_STATUS.SUCCESS
    }

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'updatePlayerData');
    console.error(error.message);

    return {
      status: RESPONSE_STATUS.FAILURE
    }
  }
};

const updateTeamData = async ({ team_id, player_id, bought_at }) => {

  try {

    if (!team_id) throw new Error('Provide valid team ID.');

    let
      pot_a_players = null,
      pot_b_players = null;

    const [teamData, playerData] = await Promise.all([
      getAllTeamsFromDB({ team_id }),
      getAllPlayersFromDB({ player_id })
    ]);

    const [team] = teamData.data;

    const [player] = playerData.data;

    const remaining_budget = team.remaining_budget - bought_at;

    const players_bought = team.players_bought + 1;

    if (player.pot == POTS_AVAILABLE.POT_A) {
      pot_a_players = team.pot_a_players + 1;
    }

    if (player.pot == POTS_AVAILABLE.POT_B) {
      pot_b_players = team.pot_b_players + 1;
    }

    const updateObj = {};

    (remaining_budget || remaining_budget == 0) ? updateObj.remaining_budget = remaining_budget : null;
    players_bought ? updateObj.players_bought = players_bought : null;
    pot_a_players ? updateObj.pot_a_players = pot_a_players : null;
    pot_b_players ? updateObj.pot_b_players = pot_b_players : null;

    await query(`UPDATE tb_teams SET ? WHERE id = ?`, [updateObj, team_id]);

    return {
      status: RESPONSE_STATUS.SUCCESS
    }

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'updateTeamData');
    console.error(error.message);

    return {
      status: RESPONSE_STATUS.FAILURE
    }
  }
};

const clearRedisData = async () => {

  try {

    const data = await redisClient.has('session_data');

    if (data) {

      await redisClient.del('session_data');
    }

    return {
      status: RESPONSE_STATUS.SUCCESS
    }

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'clearRedisData');
    console.error(error.message);

    return {
      status: RESPONSE_STATUS.FAILURE,
    }
  }
};

const initializeRedisData = async ({ player_id, client_ }) => {

  let client = client_;

  if (!client_) {

    client = await redisClient.connect();
  }

  try {

    let teamObj = {};

    const { data: allTeamdata } = await getAllTeamsFromDB({ team_id: null });

    allTeamdata.map((team) => {

      const players_need_to_be_bought = 5 - (team.players_bought + 1);

      const max_bid = team.remaining_budget - (players_need_to_be_bought * 5);

      teamObj[team.id] = {
        max_bid: max_bid,
        pot_a_players: team.pot_a_players,
        pot_b_players: team.pot_b_players,
        total_players_bought: team.players_bought,
      }
    });

    const playerData = await getAllPlayersFromDB({ player_id });

    const [player] = playerData.data;

    let playerObj = {
      id: player.id,
      name: player.name,
      image: player.image,
      pot: player.pot,
      current_team: null
    };

    const data = await client.set('session_data', JSON.stringify({
      teamObj,
      playerObj
    }));

    return {
      status: RESPONSE_STATUS.SUCCESS,
      data
    }

  } catch (error) {
    console.error(MESSAGES.ERROR_CONSOLE_LOG_SERVICE + 'initializeRedisData');
    console.error(error.message);
    return {
      status: RESPONSE_STATUS.FAILURE,
    }
  }

  finally {

    if(!client_) {
      await client.quit();
    }
  }
};

module.exports = {
  getAllPlayersFromDB,
  getAllTeamsFromDB,
  getRedisData,
  updateRedisData,
  updatePlayerData,
  updateTeamData,
  clearRedisData,
  initializeRedisData,
}