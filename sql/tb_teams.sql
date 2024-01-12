CREATE TABLE `kcl_bid`.`tb_teams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `capitan_name` VARCHAR(20) NOT NULL,
  `remaining_budget` INT NOT NULL DEFAULT '100',
  `players_bought` TINYINT NOT NULL DEFAULT '0',
  `pot_a_players` TINYINT NOT NULL DEFAULT '0',
  `pot_b_players` TINYINT NOT NULL DEFAULT '0',
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

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