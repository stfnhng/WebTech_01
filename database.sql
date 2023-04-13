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
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "credit_card" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS schedule (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "movie_id" INTEGER NOT NULL,
    "time" DATETIME NOT NULL,
    "room" INTEGER NOT NULL,
    "availability" INTERGER NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE IF NOT EXISTS purchase(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "schedule_id" INTERGER NOT NULL,
    "user_id" INTERGER NOT NULL,
    "amount" INTERGET NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedule(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

--All data from IMDB.
INSERT INTO movies (title, genre, year, director, rating, plot) 
VALUES 
('Shrek', 'Comedy', 2001, 'Andrew Adamson', 7.9, "Shrek is an animated movie about a grumpy, solitary ogre named Shrek who lives peacefully in a swamp. One day, his peaceful life is interrupted when Lord Farquaad, the ruler of Duloc, exiles all fairy-tale creatures to his swamp. Shrek decides to visit Farquaad and demand that the creatures be moved elsewhere. In exchange, Farquaad asks Shrek to rescue Princess Fiona from a tower guarded by a dragon so that he can marry her and become a king. Shrek accepts the challenge and sets out with Donkey to rescue Fiona. Along the way, they encounter various challenges, including a fierce dragon and Fiona's secret. Despite their differences, Shrek and Fiona fall in love, but Fiona's secret threatens to ruin everything. In the end, Shrek and Fiona defeat Farquaad and Fiona is revealed to be an ogre, and they live happily ever after in the swamp."),
('Trolls', 'Musical', 2016, 'Mike Mitchell', 6.4, "Trolls is an animated musical comedy film released in 2016. The film follows the story of Princess Poppy, a happy-go-lucky and overly optimistic troll who loves singing, dancing and hugging. When the Bergens, large creatures who can only experience happiness by eating trolls, invade the trolls' village, Poppy and the grumpy and survivalist troll named Branch embark on a mission to rescue their friends and save their village from being eaten by the Bergens. Along the way, they encounter various challenges and obstacles but ultimately succeed in their mission with the power of love, friendship, and music. The film features the voices of Anna Kendrick, Justin Timberlake, Zooey Deschanel, Christopher Mintz-Plasse, and Russell Brand, among others."),
('Puss In Boots: The Last Wish', 'Adventure', 2022, 'Mark Swift', 7.9, "Puss in Boots is a spin-off movie from the Shrek franchise, focusing on the adventurous and charismatic cat voiced by Antonio Banderas. In this film, Puss in Boots is on a mission to find the legendary Fountain of Youth. Along the way, he encounters his old friend, Humpty Dumpty, who convinces him to team up with the street-savvy Kitty Softpaws, voiced by Salma Hayek. Together, they attempt to steal the magic beans that will lead them to the Fountain of Youth, but their journey is complicated by the infamous outlaws, Jack and Jill. As they journey through the dangerous countryside, Puss must confront his past mistakes and learn to trust his new friends if they are to succeed in their quest. The Last Wish is a thrilling and hilarious adventure that will delight audiences of all ages."),
('The Boss Baby', 'Comedy', 2017, 'Tom McGrath', 6.3, "In the world of babies, a select few are chosen to become managers in Baby Corp., an organization that helps babies maintain their place as the cutest and most loved creatures on Earth. One such baby is the suit-wearing Boss Baby, who is sent on a mission to stop the evil plans of Puppy Co., a company that threatens to overtake babies as the world's favorite. When Tim, a 7-year-old boy, discovers the Boss Baby's secret mission, the unlikely duo must work together to save the day and restore order to the world of babies. Along the way, they learn the true meaning of family and the importance of having someone to share life's adventures with."),
('Kung Fu Panda', 'Action', 2008, 'John Stevenson', 7.6, "In ancient China, Po, a clumsy and overweight panda, dreams of becoming a kung fu master. His dream becomes a reality when he is unexpectedly chosen to fulfill an ancient prophecy, and he is trained by the Furious Five, a group of skilled kung fu warriors. Despite their initial doubts about Po's abilities, they soon realize he has a unique talent and a special destiny to defeat Tai Lung, an evil snow leopard who has escaped from prison and threatens to destroy the valley. With the help of his new friends and his determination, Po learns to believe in himself and discovers that even the most unlikely hero can save the day."),
('How to Train Your Dragon', 'Fantasy', 2010, 'Chris Sanders', 8.1, "In a Viking village, Hiccup, a young boy, aspires to become a dragon slayer like his father and the others in his tribe. However, when he finally captures a dragon, he can't bring himself to kill it and instead befriends it, naming it Toothless. As Hiccup learns more about dragons and their world, he realizes that they aren't the terrible creatures he's been taught to believe. Together with Toothless and his friends, he must stop a dangerous dragon queen from attacking their village. Through determination and courage, Hiccup shows that even the smallest among them can become a great hero and make a difference in the world."),
('Puss in Boots', 'Action', 2011, 'Chris Miller', 6.6, "In this animated spin-off from the Shrek franchise, Puss in Boots is a notorious thief who teams up with his old friend Humpty Dumpty and a street-savvy cat named Kitty Softpaws to steal magic beans from the notorious Jack and Jill. The beans lead to a giant's castle in the sky, where the trio hopes to find the Goose that Lays the Golden Eggs. Along the way, Puss confronts his own past and learns the importance of loyalty and friendship. The film features the voice talents of Antonio Banderas as Puss, Salma Hayek as Kitty Softpaws, and Zach Galifianakis as Humpty Dumpty, and was directed by Chris Miller."),
('Turbo', 'Sports', 2013, 'David Soren', 6.4, "Turbo is a story about a snail named Theo who dreams of becoming the fastest racer in the world. One day, he accidentally gets sucked into a car engine and gains super speed. With the help of his fellow snails and a human named Tito, they enter him in the Indianapolis 500. Along the way, they must overcome various obstacles and prove that even the smallest creatures can achieve big things. However, they face stiff competition from the other racers, including the villainous Guy Gagne. Through hard work, determination, and teamwork, Theo (now called Turbo) realizes his dream and crosses the finish line first. The film emphasizes the value of pursuing one's passions and never giving up on one's goals, no matter how impossible they may seem."),
('How to Train Your Dragon 2', 'Fantasy', 2014, 'Dean DeBlois', 7.8, "In How to Train Your Dragon 2, Hiccup and Toothless are back to their adventures on the island of Berk. Hiccup's father, Stoick, wants him to take over as the village chief, but Hiccup is more interested in exploring new lands with Toothless. Together, they discover a group of dragon riders led by Hiccup's mother, who he thought was dead. The group is trying to protect the dragons from the power-hungry Drago, who wants to control them and build an army. Hiccup must convince his people to work with the dragon riders and stop Drago before he can take over Berk and destroy the dragons. Along the way, Hiccup learns more about his family and the importance of being a good leader."),
('Penguins of Madagascar', 'Action', 2014, 'Eric Darnell', 6.6, "In Penguins of Madagascar, the four penguins, Skipper, Kowalski, Rico, and Private, team up with an elite undercover organization, The North Wind, led by Agent Classified, to stop the villainous Dr. Octavius Brine. Brine, a disgruntled octopus, plans to use a serum that turns penguins into monsters to take over the world. Together, the penguins and the North Wind race against time to stop Brine and save their species. Along the way, they encounter various obstacles and learn the importance of teamwork and loyalty. With clever humor, exciting action, and memorable characters, Penguins of Madagascar is a fun-filled animated adventure for all ages."),
('How to Train Your Dragon 3', 'Fantasy', 2019, 'Dean DeBlois', 7.4, "In How to Train Your Dragon 3, Hiccup, now the leader of Berk, and his dragon Toothless discover a hidden world of dragons believed to exist only in myth. There, they encounter a female Light Fury dragon and Toothless falls for her. Meanwhile, a new villain named Grimmel is hunting down all dragons, and wants to capture Toothless. Hiccup and Toothless must fight to protect their beloved dragon and save the dragons of Berk from Grimmel's wrath. Along the way, Hiccup also learns to let go of his dependence on Toothless as he navigates the challenges of leadership and growing up. The film is a heartwarming and action-packed conclusion to the beloved How to Train Your Dragon trilogy."),
('The Super Mario Bros. Movie', 'Adventure', 2022, 'Aaron Horvath', 7.8, "The Super Mario Bros. Movie follows Mario and Luigi's adventure to save Princess Peach from the evil Bowser, who wants to use the recently stolen Super Star to destroy the Mushroom Kingdom. After being separated, Mario meets Toad and Peach, while Luigi is captured by Bowser's forces. Mario, Peach, and Toad seek the Jungle Kingdom's help and defeat Donkey Kong to gain their support. They are ambushed by Bowser's army on Rainbow Road, and while trying to escape, Mario and Donkey Kong fall into the ocean and are eaten by a Maw-Ray. Later, they are rescued and reunite with Luigi, who helps them to save Peach, defeat Bowser, and restore order in both the Mushroom Kingdom and Brooklyn."),
('Cars', 'Sports', 2006, 'John Lasseter', 7.2, "Cars is an animated adventure film that follows the journey of Lightning McQueen, a hotshot rookie race car, who gets lost while on his way to a big race in California. In his search for a way back to the racetrack, he stumbles upon Radiator Springs, a small and forgotten town along the iconic Route 66. Here, he meets a cast of colorful and quirky cars, including the loveable tow truck Mater, who becomes his best friend. As Lightning spends more time in Radiator Springs, he learns valuable lessons about friendship, loyalty, and the true meaning of winning. With the help of his new friends, he also learns to slow down and appreciate life's journey, not just the destination. Together, they work to restore Radiator Springs to its former glory and help Lightning get back on track."),
('Spirited Away', 'Fantasy', 2001, 'Hayao Miyazaki', 8.6, "In Spirited Away, a young girl named Chihiro and her parents come across an abandoned amusement park. Her parents are turned into pigs by a witch named Yubaba, and Chihiro is forced to work in Yubaba's bathhouse in order to free herself and her parents. While working, Chihiro meets a young boy named Haku, who helps her navigate the spirit world and provides her with valuable information about the bathhouse and Yubaba. Chihiro must find a way to free her parents and escape the spirit world before she forgets her own identity and is trapped there forever. Through her journey, she learns valuable lessons about self-reliance, determination, and the power of kindness."),
('The Lion King', 'Drama', 2019, 'Jon Favreau', 6.8, "The Lion King is a classic Disney movie about a young lion prince named Simba who is set to take his father Mufasa's place as the king of the Pride Lands. However, Simba's uncle Scar tricks him into thinking he caused Mufasa's death and convinces him to run away. Simba meets new friends and grows up with no responsibilities until he realizes his duty to his kingdom. He returns to the Pride Lands to overthrow Scar and restore his rightful place as king. The movie is a heartwarming tale of love, loss, and the importance of taking responsibility. It has become a beloved classic due to its iconic characters, memorable soundtrack, and beautiful animation."),
('Moana', 'Fantasy', 2016, 'Ron Clements', 7.6, "Moana is a spirited and headstrong young girl who dreams of discovering the world beyond her island. When her people are faced with a crisis caused by the demigod Maui stealing the heart of the goddess Te Fiti, Moana embarks on a dangerous journey to find Maui and return the heart to its rightful place, thereby saving her people. Along the way, she faces many obstacles and battles with the forces of nature, as well as her own self-doubt. With the help of Maui and the wisdom of her ancestors, Moana learns to navigate the ocean and become a true wayfinder, discovering her own identity and saving her people in the process."),
('Ratatouille', 'Comedy', 2007, 'Brad Bird', 8.1, "Ratatouille is a 2007 Pixar film about a rat named Remy who dreams of becoming a chef. Remy finds himself in Paris and eventually ends up in the sewers beneath one of the city's finest restaurants. There, he teams up with a young kitchen worker named Linguini to cook dishes that impress the restaurant's customers, but the duo must keep their partnership a secret. Meanwhile, the restaurant's head chef is suspicious of Linguini and is determined to uncover the truth. Through their culinary exploits, Remy and Linguini learn about teamwork and the importance of pursuing one's passions. The film received critical acclaim for its storytelling, animation, and humor, and it won the Academy Award for Best Animated Feature in 2008."),
('Toy Story', 'Fantasy', 1995, 'John Lasseter', 8.3, "Toy Story is a classic animated movie that follows the adventures of a cowboy doll named Woody and a new space toy Buzz Lightyear. The two toys compete for the affection of their owner Andy and find themselves on a journey to get back to him after being separated from the rest of the toys. Along the way, they face many obstacles, including an evil neighbor kid who destroys toys for fun. Woody and Buzz must work together to overcome these challenges and make it back to Andy before he moves away. The movie explores themes of friendship, loyalty, and the value of toys in a child's life."),
('WALL-E', 'Sci-fi', 2008, 'Andrew Stanton', 8.4, "In a distant future, Earth has become a barren wasteland and WALL-E, a waste-collecting robot, is the only one left. One day, a sleek robot named EVE is sent to Earth to search for signs of life. WALL-E becomes smitten with her and follows her across the galaxy on a space adventure that changes the fate of both robots and the destiny of Earth. Along the way, they encounter a ship full of humans who have been living in space for centuries, and WALL-E inspires them to return to Earth and restore it to its former glory. This charming and heartwarming animated film explores themes of loneliness, love, and the importance of taking care of our planet.."),
('Minions', 'Comedy', 2015, 'Kyle Balda', 6.4, "Minions is a spinoff prequel to the Despicable Me franchise, focusing on the history of the little yellow creatures known as Minions. It follows the journey of Kevin, Stuart, and Bob, three Minions who leave their tribe in search of a new villain to serve. They travel to Orlando for a convention of villains, where they meet Scarlet Overkill, the first female supervillain who hires them to steal the British crown from Queen Elizabeth II. However, things go awry when they accidentally awaken a giant monster guarding the crown, and Scarlet turns on the Minions. In the end, they manage to defeat Scarlet and return to their tribe, with Bob becoming the new king of the tribe. The film is filled with humor, slapstick, and heartwarming moments, making it enjoyable for both children and adults.");

INSERT INTO schedule (movie_id, time, room, availability)
VALUES
-- Week 1, movies 1-10
-- Monday
(1, '2023-04-17 11:00:00', 1, 150),
(2, '2023-04-17 12:00:00', 2, 150),
(3, '2023-04-17 13:00:00', 3, 150),
(1, '2023-04-17 14:00:00', 1, 150),
(2, '2023-04-17 15:00:00', 2, 150),
(3, '2023-04-17 16:00:00', 3, 150),
(4, '2023-04-17 17:00:00', 1, 150),
(5, '2023-04-17 18:00:00', 2, 150),
(6, '2023-04-17 19:00:00', 3, 150),
-- Tuesday
(1, '2023-04-18 11:00:00', 1, 150),
(2, '2023-04-18 12:00:00', 2, 150),
(3, '2023-04-18 13:00:00', 3, 150),
(4, '2023-04-18 14:00:00', 1, 150),
(5, '2023-04-18 15:00:00', 2, 150),
(6, '2023-04-18 16:00:00', 3, 150),
(4, '2023-04-18 17:00:00', 1, 150),
(5, '2023-04-18 18:00:00', 2, 150),
(6, '2023-04-18 19:00:00', 3, 150),
-- Wednesday
(7, '2023-04-19 11:00:00', 1, 150),
(8, '2023-04-19 12:00:00', 2, 150),
(9, '2023-04-19 13:00:00', 3, 150),
(10, '2023-04-19 14:00:00', 1, 150),
(11, '2023-04-19 15:00:00', 2, 150),
(12, '2023-04-19 16:00:00', 3, 150),
(7, '2023-04-19 17:00:00', 1, 150),
(8, '2023-04-19 18:00:00', 2, 150),
(9, '2023-04-19 19:00:00', 3, 150),
-- Thursday
(10, '2023-04-20 11:00:00', 1, 150),
(11, '2023-04-20 12:00:00', 2, 150),
(12, '2023-04-20 13:00:00', 3, 150),
(7, '2023-04-20 14:00:00', 1, 150),
(8, '2023-04-20 15:00:00', 2, 150),
(9, '2023-04-20 16:00:00', 3, 150),
(10, '2023-04-20 17:00:00', 1, 150),
(11, '2023-04-20 18:00:00', 2, 150),
(12, '2023-04-20 19:00:00', 3, 150),
