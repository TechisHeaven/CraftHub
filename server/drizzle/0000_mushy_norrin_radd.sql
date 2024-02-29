CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	`email` text,
	`password` text,
	`role` text,
	`created_at` timestamp,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
