thefile = open("file", "r")
names1 = []

for (l in thefile):
	names1.append(l)
	
	
thefile.close()

htmli = open('index.html', 'w')
htmli.write(names1)
htmli.close()