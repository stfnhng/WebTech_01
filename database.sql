--All SQL used are documented in this file.

CREATE TABLE IF NOT EXISTS movies (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "plot" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "address" TEXT NOT NULL,
    "credit_card" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS schedule (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "movie_id" INTEGER,
    "time" DATETIME,
    "room" INTEGER,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

--The IDs should be autoincremented. 
--All data are from IMDB.
INSERT INTO movies (title, genre, year, director, rating, plot) 
VALUES 
('Shrek', 'Comedy', 2001, 'Andrew Adamson', 7.9, "Shrek is an animated movie about a grumpy, solitary ogre named Shrek who lives peacefully in a swamp. One day, his peaceful life is interrupted when Lord Farquaad, the ruler of Duloc, exiles all fairy-tale creatures to his swamp. Shrek decides to visit Farquaad and demand that the creatures be moved elsewhere. In exchange, Farquaad asks Shrek to rescue Princess Fiona from a tower guarded by a dragon so that he can marry her and become a king. Shrek accepts the challenge and sets out with Donkey to rescue Fiona. Along the way, they encounter various challenges, including a fierce dragon and Fiona's secret [6][7]. Despite their differences, Shrek and Fiona fall in love, but Fiona's secret threatens to ruin everything. In the end, Shrek and Fiona defeat Farquaad and Fiona is revealed to be an ogre, and they live happily ever after in the swamp."),
('Trolls', 'Musical', 2016, 'Mike Mitchell', 6.4, "Trolls is an animated musical comedy film released in 2016. The film follows the story of Princess Poppy, a happy-go-lucky and overly optimistic troll who loves singing, dancing and hugging. When the Bergens, large creatures who can only experience happiness by eating trolls, invade the trolls' village, Poppy and the grumpy and survivalist troll named Branch embark on a mission to rescue their friends and save their village from being eaten by the Bergens. Along the way, they encounter various challenges and obstacles but ultimately succeed in their mission with the power of love, friendship, and music. The film features the voices of Anna Kendrick, Justin Timberlake, Zooey Deschanel, Christopher Mintz-Plasse, and Russell Brand, among others."),
('Puss In Boots: The Last Wish', 'Adventure', 2022, 'Mark Swift', 7.9, "Puss in Boots: The Last Wish is an animated film that tells the story of the legendary sword fighter and feline hero, Puss in Boots. After discovering a mysterious magical bean, Puss sets off on a dangerous journey with his best friend, Humpty Dumpty, and the notorious thief, Kitty Softpaws, to find the legendary Golden Goose. Along the way, they must face treacherous outlaws and overcome impossible obstacles to fulfill their mission and ultimately save the world."),
('The Boss Baby', 'Comedy', 2017, 'Tom McGrath', 6.3, "The Boss Baby is a 2017 animated comedy film that follows the story of Tim, a seven-year-old boy who suddenly finds himself with a new baby brother who wears a suit and carries a briefcase. Tim soon discovers that his baby brother is actually a secret agent on a mission to stop an evil plot by Puppy Co. Together, they embark on an adventure to save their parents, restore order to the world, and bring the family back together."),
('Kung Fu Panda', 'Action', 2008, 'John Stevenson', 7.6, "In Kung Fu Panda, Po, a clumsy and overweight panda, dreams of becoming a kung fu master but works as a noodle shop employee. When the villainous Tai Lung escapes from prison, Po is unexpectedly chosen as the Dragon Warrior to defeat him. With the help of his kung fu heroes, the Furious Five, Po must train to become a true warrior and save China from Tai Lung's wrath."),
('How to Train Your Dragon', 'Fantasy', 2010, 'Chris Sanders', 8.1, "In How to Train Your Dragon, a young Viking named Hiccup befriends a dragon, Toothless, and learns that they are not the vicious creatures he has been taught to fear. Together, Hiccup and Toothless work to unite the Vikings and dragons against a common enemy and ultimately bring peace to their land."),
('Puss in Boots', 'Action', 2011, 'Chris Miller', 6.6, "In Puss in Boots, the legendary sword-fighting feline hero teams up with his friends Humpty Dumpty and Kitty Softpaws to steal magic beans from Jack and Jill, two notorious outlaws. Their quest leads them to the giant's castle where they face dangerous obstacles and a fearsome monster guarding the goose that lays golden eggs. Puss in Boots must use his quick wit and sword skills to save the day and clear his name."),
('Turbo', 'Sports', 2013, 'David Soren', 6.4, "Turbo is a snail who dreams of becoming the fastest creature on earth. After a freak accident, he gains incredible speed and is recruited by a crew of racing snails to compete in the Indianapolis 500. With the help of his new friends and his unbreakable spirit, Turbo sets out to achieve his impossible dream and show the world that even the smallest creature can accomplish great things."),
('How to Train Your Dragon 2', 'Fantasy', 2014, 'Dean DeBlois', 7.8, "In the second installment of the How to Train Your Dragon franchise, Hiccup and Toothless discover an ice cave that is home to hundreds of new dragon species and a mysterious dragon rider. They soon find themselves in the midst of a battle to protect the peace between humans and dragons as an evil dragon hunter threatens their existence."),
('Penguins of Madagascar', 'Action', 2014, 'Eric Darnell', 6.6, "In this animated comedy, the penguins from the Madagascar films team up with a secret animal organization, the North Wind, to stop the villainous Dr. Octavius Brine. Along the way, they must use their special skills to outsmart various obstacles, including a giant octopus and Dave the octopus's revenge-seeking sidekick."),
('How to Train Your Dragon 3', 'Fantasy', 2019, 'Dean DeBlois', 7.4, "In How to Train Your Dragon 3, Hiccup discovers a hidden dragon utopia called The Hidden World and must protect it from a ruthless dragon hunter who threatens their existence. Meanwhile, Toothless falls in love with a Light Fury dragon and must navigate his own romantic pursuits while helping Hiccup save their home."),
('The Super Mario Bros. Movie', 'Adventure', 2022, 'Aaron Horvath', 7.8, "The Super Mario Bros. Movie follows Mario and Luigi's adventure to save Princess Peach from the evil Bowser, who wants to use the recently stolen Super Star to destroy the Mushroom Kingdom. After being separated, Mario meets Toad and Peach, while Luigi is captured by Bowser's forces. Mario, Peach, and Toad seek the Jungle Kingdom's help and defeat Donkey Kong to gain their support. They are ambushed by Bowser's army on Rainbow Road, and while trying to escape, Mario and Donkey Kong fall into the ocean and are eaten by a Maw-Ray. Later, they are rescued and reunite with Luigi, who helps them to save Peach, defeat Bowser, and restore order in both the Mushroom Kingdom and Brooklyn."),
('Cars', 'Sports', 2006, 'John Lasseter', 7.2, "Cars is a 2006 animated film that follows the journey of Lightning McQueen, a young and ambitious race car who gets lost on his way to a big race and ends up in the run-down town of Radiator Springs. There, he meets a rusty tow truck named Mater and a sleek Porsche named Sally, and discovers that life is about more than just winning. Through their help and friendship, Lightning learns to slow down and appreciate the simple things in life, ultimately finding true happiness and success on and off the race track."),
('Spirited Away', 'Fantasy', 2001, 'Hayao Miyazaki', 8.6, "In Spirited Away, a ten-year-old girl named Chihiro and her parents stumble upon a mysterious abandoned amusement park. After her parents are transformed into pigs by the sorceress Yubaba, Chihiro must work at a magical bathhouse to free herself and her parents. She befriends a young boy named Haku and navigates through a world of strange and sometimes dangerous spirits to find a way back to her own world. Along the way, Chihiro learns important lessons about bravery, kindness, and the power of love and sacrifice."),
('The Lion King', 'Drama', 2019, 'Jon Favreau', 6.8, "In the Pride Lands of Africa, young lion prince Simba is destined to be king, but his uncle Scar murders Simba's father, King Mufasa, and convinces Simba that he is responsible for his father's death. Scar becomes the new king, and Simba runs away in shame. Years later, Simba returns to reclaim his rightful place as king and defeat Scar, with the help of his friends Timon and Pumbaa."),
('Moana', 'Fantasy', 2016, 'Ron Clements', 7.6, "Moana is a young girl who is chosen by the ocean to find Maui, a demigod who can help her save her island from a curse. Together, they embark on an adventure to restore the heart of Te Fiti, a goddess who created all life in the Pacific. Along the way, they face many obstacles and challenges, but with determination and bravery, they succeed in their mission and save their people."),
('Ratatouille', 'Comedy', 2007, 'Brad Bird', 8.1, "In Ratatouille, a rat named Remy dreams of becoming a chef and finds himself in Paris near a restaurant owned by famous chef Auguste Gusteau. With the help of a garbage boy named Linguini, Remy uses his talent for cooking to help him in the kitchen, hidden away from the staff and the customers. As Remy struggles to keep his identity a secret and gain control of Linguini's movements, they must also overcome the challenges of running a successful restaurant and impressing the harsh food critic Anton Ego. Ultimately, Remy and Linguini succeed in creating a popular dish and earn the respect of their peers."),
('Toy Story', 'Fantasy', 1995, 'John Lasseter', 8.3, "When Andy's favorite toy Woody is overshadowed by the new arrival Buzz Lightyear, he feels threatened and jealous. But when the two toys get separated from Andy and their fellow toys, they must team up to find their way back home. Along the way, they learn about friendship and acceptance, and they realize that being a toy is not just about being loved by a child, but about being there for each other."),
('WALL-E', 'Sci-fi', 2008, 'Andrew Stanton', 8.4, "In a dystopian future where Earth is a barren wasteland, WALL-E is the last remaining robot, left to clean up the trash left by humans who have long since abandoned the planet. But when a sleek and advanced robot named EVE arrives on Earth, WALL-E falls in love and embarks on a space adventure that could save humanity."),
('Minions', 'Comedy', 2015, 'Kyle Balda', 6.4, "The minions are small yellow creatures that have existed since the dawn of time, serving evil masters throughout history. But when they are left without a master to serve, three minions named Kevin, Stuart, and Bob set out on a journey to find a new boss. Their search leads them to the Villain-Con, where they meet the ruthless Scarlet Overkill and become embroiled in a plot to steal the Crown Jewels of England. Along the way, they learn the true meaning of family and the importance of finding a purpose in life.");

--Values are randomly generated by ChatGPT
INSERT INTO schedule (movie_id, time, room) VALUES
    (1, '2023-04-06 12:00:00', 1),
    (9, '2023-04-06 15:00:00', 2),
    (13, '2023-04-06 18:00:00', 3),
    (7, '2023-04-07 12:00:00', 2),
    (15, '2023-04-07 15:00:00', 3),
    (18, '2023-04-07 18:00:00', 1),
    (5, '2023-04-08 12:00:00', 3),
    (11, '2023-04-08 15:00:00', 1),
    (16, '2023-04-08 18:00:00', 2),
    (6, '2023-04-09 12:00:00', 1),
    (19, '2023-04-09 15:00:00', 2),
    (4, '2023-04-09 18:00:00', 3),
    (2, '2023-04-10 12:00:00', 2),
    (17, '2023-04-10 15:00:00', 3),
    (10, '2023-04-10 18:00:00', 1),
    (3, '2023-04-11 12:00:00', 3),
    (8, '2023-04-11 15:00:00', 1),
    (14, '2023-04-11 18:00:00', 2),
    (20, '2023-04-12 12:00:00', 1),
    (12, '2023-04-12 15:00:00', 2),
    (1, '2023-04-12 18:00:00', 3),
    (9, '2023-04-13 12:00:00', 2),
    (13, '2023-04-13 15:00:00', 3),
    (7, '2023-04-13 18:00:00', 1),
    (15, '2023-04-14 12:00:00', 3),
    (18, '2023-04-14 15:00:00', 1),
    (5, '2023-04-14 18:00:00', 2),
    (11, '2023-04-15 12:00:00', 1),
    (16, '2023-04-15 15:00:00', 2),
    (6, '2023-04-15 18:00:00', 3),
    (19, '2023-04-16 12:00:00', 2),
    (4, '2023-04-16 15:00:00', 3),
    (2, '2023-04-16 18:00:00', 1),
    (17, '2023-04-17 12:00:00', 3);
