CREATE TABLE `servers` (
	`serverID` text NOT NULL,
	`adminUserID` text NOT NULL,
	`serverName` text NOT NULL,
	`containerID` text NOT NULL,
	`serverURL` text NOT NULL,
	`ramSize` text NOT NULL,
	`isActive` text NOT NULL,
	`created_at` timestamp,
	CONSTRAINT `servers_serverID_unique` UNIQUE(`serverID`),
	CONSTRAINT `servers_adminUserID_unique` UNIQUE(`adminUserID`),
	CONSTRAINT `servers_containerID_unique` UNIQUE(`containerID`),
	CONSTRAINT `servers_serverURL_unique` UNIQUE(`serverURL`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`userID` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text,
	`created_at` timestamp,
	CONSTRAINT `user_userID_unique` UNIQUE(`userID`)
);
