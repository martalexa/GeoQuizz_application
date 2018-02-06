-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `geo_city`;
CREATE TABLE `geo_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `zoom_level` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `geo_city` (`id`, `name`, `lat`, `lng`, `zoom_level`) VALUES
(1,	'Nancy',	'48.6843900',	'6.1849600',	13);

DROP TABLE IF EXISTS `geo_partie`;
CREATE TABLE `geo_partie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `nb_photos` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `player_username` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `serie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `partie_serie_id_foreign` (`serie_id`),
  CONSTRAINT `partie_serie_id_foreign` FOREIGN KEY (`serie_id`) REFERENCES `geo_serie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `geo_partie` (`id`, `token`, `nb_photos`, `state`, `player_username`, `score`, `serie_id`) VALUES
(7,	'6f15d12b26e7deaa722edb44f857e185b1f6b68909caa6c0911927bce395e489',	5,	0,	'Michel',	0,	2),
(8,	'1983842c2a4889c8198f9d20fb421fb19327406a4008b38d6352abdd0017c3f4',	10,	0,	'Jacques',	15,	2),
(9,	'13e7ed8fa0020280b89d412c6cdf4200c3da3fa932d3a6f09c0a8f3632a24bab',	50,	0,	'James',	0,	2);

DROP TABLE IF EXISTS `geo_photo`;
CREATE TABLE `geo_photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `serie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_serie_id_foreign` (`serie_id`),
  CONSTRAINT `photo_serie_id_foreign` FOREIGN KEY (`serie_id`) REFERENCES `geo_serie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `geo_serie`;
CREATE TABLE `geo_serie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `distance` varchar(255) NOT NULL DEFAULT '',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `city_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `serie_city_id_foreign` (`city_id`),
  CONSTRAINT `serie_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `geo_city` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `geo_serie` (`id`, `distance`, `updated_at`, `created_at`, `city_id`) VALUES
(2,	'0',	'2018-02-05 14:11:47',	'2018-02-05 14:11:47',	1);

DROP TABLE IF EXISTS `geo_user`;
CREATE TABLE `geo_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `geo_user` (`id`, `username`, `password`) VALUES
(1,	'Jean',	'$2y$10$amQthf7tHUsgJoN5MTUfK.AqSCAb/6GWXRWJwsh0K.pa8/nlkDfSa');

-- 2018-02-05 16:43:03
