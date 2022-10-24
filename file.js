﻿const names = `
1: Circle Blue
2: Square Pink 
3: Trash Can 
4: Billboard 
5: Post Box 
6: Blue Cuboid 
7: Look Up 
8: Helter Skelter 
9: Rubbish Bin 
10: Watermelon 
11: I Love You 
12: Blue Swirl 
13: Good Night 
14: I See You 
15: No Entry 
16: Tree Doctor 
17: Layer Cake 
18: Twinkle Twinkle 
19: Lurid Layered 
20: Neon Trash 
21: Tie Your Laces 
22: Banana Hole 
23: The Pink Hex of Doom 
24: Sign o' The Times
25: Trash Bin 
26: Shades of Grey 
27: Wrong Direction 
28: Which Direction? 
29: Open Wide 
30: I C U 2 
31: Illuminati 
32: No Parcels 
33: Rhapsody in Green 
34: Double Jump 
35: Spin the Lime 
36: The Box 
37: Visor 
38: Walking on Sunshine 
39: Fast Forward 
40: Hexbox 
41: Firecracker 
42: Hedge Trimmer 
43: Not Too Fat 
44: Rubbish Can 
45: Straight Down 
46: Rewind 
47: Two At Once 
48: The End of The Beginning 

x2 multipliers 
49: Purple Whirlpool 
50: I Can't Hear You 
51: Deja Vu 
52: The Shapes Game 
53: Coconut 
54: The Blob 

x4 multipliers 
55: Talkie Toaster 
56: Lucky For Some 
57: How Many Shades? 
58: Better Buy Brown 
59: Raspberry Jam 
60: DO NOT OPEN 

x8 multipliers 
61: Cherry Bomb 
62: Medical Use Only 
63: Neopolitan 
64: 32 million 
65: Read It? 
66: Giza in Grey 

x12 multiplier 
67: Coal 
68: Handle With Care 
69: Dollhouse WC 
70: Not Black 
71: Tsunami 
72: Not Too Fresh 

x16 multiplier 
73: Hypnosis 
74: Danger Zone 
75: Inception 
76: 8 Ball 
77: It's Alive! 
78: Fire Ink'd 

x48 multiplier 
79: Flip Top 
80: Melting Pot 
81: Mr. Brownstone 
82: AAAARGH!!! 
83: Pixelated 
84: The Watcher 

x96 multiplier 
85: Out Of Focus 
86: Let Me Out 
87: Triple Trouble 
88: Asimov 
89: I Didn't Do It 
90: Emptiness 

x320 multiplier 
91: Out of Place 
92: Quarter Slice 
93: Normandy 
94: Endte 
95: Outtatime 
96: Prim And Proper 

x1024 multiplier 
97: Chrome 
98: Glory 
99: Pollock 
100: P-Nut 
101: Number Two 
102: Thor 

x 4 bricks 
103: Swiss 
104: The Cage 
105: Mobile Delivery 
106: The Hangover 
107: Christmas 
108: Hot Stuff 

x32 bricks 
109: Somewhere... 
110: HP 
111: Slade
112: Around the World 
113: Sushi Roll 
114: Be My Honey

x256 bricks
115: Trash can on wheels
116: LaCroc 
117: Vampire Coffee
118: Plug n Play
119: Borgasm
120: Santa's Door 

x2048
121: Where's the Toast? 
122: Drunk
123: Floyd 
124: We wish you a...
125: ...Merry Christmas
126: Sign here

x16k
127: Box o' Candy
128: Because I'm hungry
129: Santa's Beer
130: Dear Tom, Love Jerry
131: King of the Hill
132: Milk n' Sugar

x128k
133: Frosty
134: T-minus 10 seconds...
135: Where's the Straw?
136: Dear Jerry, Love Tom
137: Screwed
138: Astroturf 

x1M
139: Charged
140: Lego Lookout
141: Quack
142: Intergalactic 
143: Green water tank
144: Great Balls o' Fire

x8M
145: Happy Juice II
146: Rat-a-tat-tat
147: Clean Energy
148: Let It Go
149: A piece is missing
150: Zero point energy

x64M
151: Night of the Living Barrel
152: Sunset
153: Old School Kindle
154: Where's the Paper?
155: Where's the Milk?
156: 128 GB

x512M
157: Chocolate Bar(rel)
158: Kermit
159: Hopes and Dreams
160: Heart Attack
161: Just Keep Swimming
162: Endtenmeister

x4B
163: 2D6
164: Drinks are on me
165: A Barrel of Bach
166: Sticky Situation
167: Room Escape
168: Color Puzzle

x32B
169: SC Pad 2.0
170: Take the Plunge
171: What Am I?
172: Who You Gonna Call
173: No Pain No Gain
174: Infinity

x256B
175: What's Up, Doc?
176: Mojito
177: Turn It Up!
178: Rhapsody in Blue
179: Lumberjack
180: Smoke Break

x2T
181: Game of Chairs
182: Filthy
183: Jackpot
184: Super Schrott Bros
185: Power Cut
186: Where are the burgers?

x16T
187: Dark Side of the Barrel 
188: Excuse Me!
189: 'Napple
190: Should I Stay or Should I Go?
191: If life gives you lemons...
192: Do Not Eat

x128T
193: Samhain
194: Merlot
195: Meow!
196: Lo-res
197: T 4 2
198: Escher

x1Q
199: Peeled
200: Al Dente
201: Cardboard Shirt
202: Cup o' Java
203: Cyber Milk
204: Champion

x8Q
205: Edible
206: Please Flush
207: Chardonnay
208: 3.47
209: T-Virus
210: Cloud 9

x64Q
211: Havana
212: Antidote
213: Motorhead
214: Peyote
215: Sub Zero
216: 180

x512Q
217: SGBG
218: Where's the fuse?
219: Endgame
220: Cool
221: Happy Birthday, Scrap 2
222: Purple Potion of Peril

x4q
223: Keep Dry
224: Cut the Blue Wire...?
225: Shrove
226: Pizza Party
227: Crème
228: No Stamp Required

x256q
229: Double Down
230: Bit
231: Carat
232: Slurp!
233: Jack and Jill
234: Cow Juice

x4S
235: Come Fly With Me
236: R.I.P.
237: Hacker Alert
238: Pentatower
239: Not Too Hot
240: Not Too Cold

x64S
241: Where's the Pepper?
242: Impossibarrel
243: Ethereal
244: Confusion
245: Where's the Jukebox?
246: Heretic

x1s
247: S2D2
248: Chamber
249: Neon
250: Do Not Lick
251: Ribbed
252: Biscuit vs. Cookie

x16s
253: Ladies Night
254: Carbonated
255: Eternal Darkness
256: Mehiko
257: Special Delivery
258: More Pancakes?

x256s
259: One Missing
260: You've Got Mail
261: Where's the Needle?
262: Night Fever
263: The Cure
264: Barrel (bl) Z264

x4O
265: Format C:
266: 2πd(R-r)
267: Malevolence
268: All my Love
269: Fodder
270: WC Emergency

x64O
271: Bluestacks
272: Five O's
273: Tropical Milkshake
274: The World Keeps Turnin'
275: Original Delivery
276: Where's the Tequilla?

x2N
277: 16R23L42R
278: Blue Magic
279: On or Off?
280: Amazingly Corny
281: A Barrel A Day
282: Open With Care

x256N
283: The Scrap Chronicles
284: Yummy!
285: Baozi
286: Tesseract
287: Scrap O'clock
288: Rainbow Cake

x32D
289: Time to Merge!
290: Top Drawer
291: Schrott Bucks
292: Scrapyola
293: Stacked and Sweet
294: Use By July 2019

x4UD
295: Got any change?
296: Not The Bird
297: Expertly Sliced
298: 1969
299: Do Not Drop
300: Barrel 300!

x1DD
301: Face to face
302: Nude Wristwatch
303: My Documents
304: Quick to the Point
305: Lavender scented
306: Merger sponge

x1TD
307: To the moon!
308: Where's the lamb sauce?!
309: Where's that orange cat?
310: Torque
311: New and Improved
312: From the Hangar

x1QD
313: Washing machine
314: Penne al tonno
315: Where's the Mayonnaise?
316: Ready to eat
317: Delicious
318: KiBa

x1qD
319: Deliciously Baked
320: Childhood
321: Cuppa Joe
322: Gotcha!
323: Past and Present
324: Chain Reaction

x1SD
325: Merge like an Egyptian
326: Heating up!
327: How to Eat?!
328: Shake it
329: Where's the Hotdog?
330: DING!

x1sD
331: Duck Soup
332: Any Which Way But...
333: Sane Frog
334: A stitch in time...
335: Scream!
336: Déjà Vu

x1OD
337: Where's the Butter?
338: A Cold Reception
339: Listen Please
340: Ninja
341: Tired
342: Don't touch Anything

x1ND
343: Chicken or Duck?
344: C12H12
345: Surprise Box
346: Where is my burger?
347: Backyard
348: Hair Bane

x1V
349: Scrapels
350: What's cookin'?
351: Don't Feed the Dev
352: Gravity
353: Light & Darkness
354: Skyscraper

x1UV
355: Hot & Spicy
356: Mr. Robot
357: Steamed Ham
358: How to become rich
359: Reverse
360: Next Dimension

x1DV
361: Masterchef
362: Guess the word
363: Fixit
364: Where's the Bunny?
365: 147
366: Out of stock

x1TV
367: Quackuccino
368: Colony Drop
369: Heal up!
370: Satellite 15
371: Breathe Deep
372: Solid State

x1QV
373: A barrel companion
374: Home Sweet Home
375: Pick your favorite!
376: Two by two
377: Get in the tank!
378: Checkmate!

x1qV
379: 1000°C
380: Oh snap!
381: Hole in one
382: Noodles
383: Not an instrument
384: Nice Ice

x1SV
385: Glug, glug, belch
386: What's playing?
387: 7.0
388: Bitter citrus
389: Plug in here
390: Sorbet

x1sV
391: Take a Break
392: Bracer of Nobility
393: Vitamin Bomb
394: So tasty
395: ACGT
396: Roses and hearts

x1OV
397: Where are the knights?
398: Scrappy Condo
399: Stop... Merging time!
400: Congratulations!
401: Throw a coin
402: Off-brand

x1NV
403: Bubble Tea
404: From the Freezer
405: Where's Jelly?
406: The whole history
407: The code is 0000
408: 50 Hz

x1Tr
409: Target Acquired
410: Where's the Blueberry?
411: Theoretical Space Line
412: Vitamin D
413: Where's the Billiard?
414: Would you drink this?

x1UTR
415: Ultimate Energy
416: Smoker's Paradise
417: Shrove 3.0
418: Please help me
419: What What in the Button
420: Today's Food

x1DTR
421: The Vintage Keeper
422: Chocolate Dream
423: Bavaria
424: Yule Bear
425: Pshoom!
426: Where's Boggy?

x1TTR
427: Something's brewing
428: Points of view
429: Stack of Vitamins
430: Blaze it!
431: Paisley
432: Wrong lever

x1QTR
433: It's among us
434: Requiem Aeternam
435: Clock Blocked
436: Next Level
437: Vendetta Fluid
438: 1996-2020

x1qTR
439: Home run
440: Salty yet sweet
441: ThirstRemover 3000
442: Yes, we have it!
443: Oreoreoreoreo
444: Creation Engine

x1STR
445: We ordered more
446: Data is beautiful
447: Party Rockers
448: Quoit-unquoit
449: Who ate it?
450: Not for swimming

x1sTR
451: Just Leaf it
452: Resonance
453: Give me food!
454: Flowey
455: 5 what?
456: Blast from the Past

x1OTR
457: Where's the cheese?
458: Rotten!
459: Shipment Underway
460: Any Colour You Like
461: Stop right there!
462: Vito's Pizza

x1NTR
463: Home Remedy
464: A cuboid for ants?
465: Miraculous Matter
466: Quack v4.0
467: For the Literature Club
468: Little Book of Horrors

x1QU
469: I'm a happy camper!
470: The Earth As We Know It
471: Lamp From Above
472: The Great Greed
473: Who's to Blame?
474: Caprese Tower

x1UQU
475: Aestheticsm
476: Potassium Slices
477: Warp of Ruination
478: Rubus
479: Snow Leopard
480: Peanut Butter Jelly Time

x1DQU
481: 29 too late
482: Welders' Job
483: Tome of Smartness
484: Boss of all lockers
485: Fashion Statement
486: Arcanic Elevator

x1TQU
487: Smell ya later!
488: The Dust
489: 8 to 16-Bit
490: Crème de fraises
491: Sparkly Taste
492: This might sting...

x1QQU
493: Roguelike
494: The Strange World
495: Dramatic Waxing
496: New Generation
497: Fruity!
498: Bluish Gelatin

x1qQU
499: Where are the monkeys?
500: Job done!
501: Road to yeet
502: Janitor, Press Start!
503: aMAZEing
504: Let's Zill!

x1SQU
505: Merging routine, set!
506: Fire3
507: Devil's Fury
508: Trippy Architecture
509: Abandoned Garden
510: Citric Acid

x1sQU
511: Gambling but it's Christmas
512: 12.65 V
513: Portable Winter
514: The Prototype
515: Peppy Tincture
516: Maize Candy

x1OQU
517: Pentagon of Devastation
518: From the Garage
519: Triumvirate of Power
520: Maple and Syrup
521: Bricks of Chocolate
522: You must construct...

x1NQU
523: A Dose of Die
524: Point it here!
525: Lunch Box of the East
526: Colorful energy
527: Press, Hold, Merge!
528: Grand master

x1qu
529: Memories
530: Who's John?
531: Schrott says
532: Return of the Living Barrel
533: Did you try changing it?
534: Hexagonest Hexagon

x1Uqu
535: Gold N' Glory
536: Find the fragments
537: Limited Time Only
538: Longbow Acid
539: How much time left?
540: *click* BOOM!

x1Dqu
541: Inheritance
542: 100% Cold Fusion
543: The Conductor
544: Spooky & Scary Barrel
545: Planet 9
546: Defragmentation!

x1Tqu
547: Go to the City
548: Special Space Mission
549: The Event
550: EF5
551: Alien Lexicon
552: 4k RPM

x1Qqu
553: Maple is too popular
554: Parallel Hollywood
555: Oddeven
556: Decrypter's Toy
557: Dank and Damp Wiring
558: Can Cake Can You?

x1qqu
559: Atom Chronicles
560: A Home for Hammy
561: Dungeon Crawlin'
562: Here in My Garage
563: With Comfort
564: The Origins

x1Squ
565: The Ultimate Run
566: King of Barrels, Alfred
567: Edible?
568: PC Ancestry
569: Fast & Sharp!
570: Surprise attack!

x1squ
571: Vampire Slaying Powder
572: Far Away...
573: Please, beehive!
574: 1 Million Scoville
575: Thai Lemon
576: Stoker's Hearth

x1Oqu
577: Original Recipe
578: Cooper, do you copy?
579: Annoying Aviator
580: Scrapeo and Juliet
581: The Bouncer
582: Error 503

x1Nqu
583: Fairy Dust
584: 6 feet deep
585: Anti-Fire 5
586: In 50 years...
587: Artist's Arsenal
588: Sundown

x1Se
589: Smooth, cool, nutritious
590: Merge or Click?
591: From the Shadows
592: The Cave of the Barrels
593: Power Your Scrap
594: You just got Macaroon'd!
`