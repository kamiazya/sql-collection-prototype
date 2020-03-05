---- drop ----
DROP TABLE IF EXISTS `users`;

---- create ----
create table IF not exists `users` (
 `id` INT(11) AUTO_INCREMENT,
 `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `users` (`name`) VALUES
  ('Taro'),
  ('Jiro');
