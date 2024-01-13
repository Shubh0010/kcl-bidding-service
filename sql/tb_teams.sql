CREATE TABLE `tb_teams` (
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

INSERT INTO
  `tb_teams` (
    `id`,
    `name`,
    `capitan_name`,
    `remaining_budget`,
    `players_bought`,
    `pot_a_players`,
    `pot_b_players`,
    `created`,
    `updated`
  )
VALUES
  (
    NULL,
    'Sporting Lesbians',
    'Mehtaab',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'Inter TheDragon FC',
    'Sachit Khanna',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'FKW FC',
    'Makkhi',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'Super Strikers',
    'Naman Vaid',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'Nepal Tigers',
    'Rajan',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'Tarmadol CF',
    'Mayan',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'Stallions FC',
    'Bholu',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    NULL,
    'BBB FC',
    'Nitin Sharma',
    '100',
    '0',
    '0',
    '0',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );