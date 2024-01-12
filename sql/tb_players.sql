CREATE TABLE `tb_players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `team_id` int DEFAULT NULL,
  `bought_at` int DEFAULT NULL,
  `status` enum('0', '1', '-1') NOT NULL DEFAULT '0',
  `image` mediumtext NOT NULL,
  `pot` enum('A', 'B') DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci