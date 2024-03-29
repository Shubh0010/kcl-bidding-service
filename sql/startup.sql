CREATE DATABASE IF NOT EXISTS kcl_bid;

CREATE TABLE IF NOT EXISTS `tb_teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `capitan_name` varchar(20) NOT NULL,
  `remaining_budget` int NOT NULL DEFAULT '100',
  `players_bought` tinyint NOT NULL DEFAULT '0',
  `pot_a_players` tinyint NOT NULL DEFAULT '0',
  `pot_b_players` tinyint NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- INSERT INTO
--   `tb_teams` (
--     `id`,
--     `name`,
--     `capitan_name`,
--     `remaining_budget`,
--     `players_bought`,
--     `pot_a_players`,
--     `pot_b_players`,
--     `created`,
--     `updated`
--   )
-- VALUES
--   (
--     NULL,
--     'Sporting Lesbians',
--     'Mehtaab',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'Inter TheDragon FC',
--     'Sachit Khanna',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'FKW FC',
--     'Makkhi',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'Super Strikers',
--     'Naman Vaid',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'Nepal Tigers',
--     'Rajan',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'Tarmadol CF',
--     'Mayan',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'Stallions FC',
--     'Bholu',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   ),
--   (
--     NULL,
--     'BBB FC',
--     'Nitin Sharma',
--     '100',
--     '0',
--     '0',
--     '0',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
--   );

CREATE TABLE IF NOT EXISTS `tb_players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `position` enum('ATTACKER','MIDFIELDER','DEFENDER','GOALKEEPER') NOT NULL,
  `team_id` int DEFAULT NULL,
  `bought_at` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `image` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `pot` enum('A','B') DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

-- INSERT INTO tb_players (name, position) VALUES
-- ('Puneet', 'ATTACKER'),
-- ('Shourya', 'DEFENDER'),
-- ('Dushyant', 'DEFENDER'),
-- ('Arpit', 'ATTACKER'),
-- ('Pulkit', 'GOALKEEPER'),
-- ('Asad Singh', 'ATTACKER'),
-- ('Raman', 'DEFENDER'),
-- ('Dhruv', 'MIDFIELDER'),
-- ('Supreem', 'DEFENDER'),
-- ('Arsh', 'ATTACKER'),
-- ('Jatin', 'MIDFIELDER'),
-- ('Aman Grewal', 'ATTACKER'),
-- ('Amrinder Singh Poonia', 'GOALKEEPER'),
-- ('Satyam', 'DEFENDER'),
-- ('Noni', 'ATTACKER'),
-- ('Sukhi', 'MIDFIELDER'),
-- ('Jaspreet', 'DEFENDER'),
-- ('Sargun Brar', 'MIDFIELDER'),
-- ('Karman', 'DEFENDER'),
-- ('Shubh Negi', 'MIDFIELDER'),
-- ('Gurleen Singh', 'DEFENDER'),
-- ('Ajay', 'DEFENDER'),
-- ('Dev', 'ATTACKER'),
-- ('Deegvijay', 'DEFENDER'),
-- ('Sahil', 'GOALKEEPER'),
-- ('Harsimran', 'DEFENDER'),
-- ('KP', 'ATTACKER'),
-- ('Harpreet Singh', 'DEFENDER'),
-- ('Rohit', 'MIDFIELDER'),
-- ('Anhad', 'ATTACKER'),
-- ('Sparsh', 'DEFENDER'),
-- ('Guntaaz', 'GOALKEEPER'),
-- ('Ratan', 'ATTACKER'),
-- ('Mehtaab J', 'ATTACKER'),
-- ('Vishal', 'DEFENDER'),
-- ('Neymar', 'MIDFIELDER'),
-- ('Deepinder', 'DEFENDER'),
-- ('Harry', 'ATTACKER'),
-- ('Bhutani', 'DEFENDER'),
-- ('Paarth', 'ATTACKER'),
-- ('Tanish', 'DEFENDER'),
-- ('Ujwal', 'DEFENDER'),
-- ('Nikhil S', 'ATTACKER'),
-- ('Aman Singh', 'ATTACKER'),
-- ('Pawan', 'DEFENDER'),
-- ('Nitin Negi', 'DEFENDER'),
-- ('Aryan Bhatti', 'ATTACKER');
