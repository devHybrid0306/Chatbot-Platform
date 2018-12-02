Running the server locally

Pre-req:
1. Mongodb installation

Steps:
1. Create a directory to your local machine C:\data
2. In the terminal change directory to C:\Program Files\MongoDB\Server\4.0\bin
3. run mongod
**Note you must have C:\data folder in your local machine


Create database directory
1. Create the data directory where MongoDB stores data. MongoDB’s default data directory path is the absolute path \data\db on the drive from which you start MongoDB.

From the Command Interpreter, create the data directories
cd C:\
md "\data\db"

2. Start your MongoDB database.
    2.1. go to directory C:\Program Files\MongoDB\Server\4.0\bin\
    2.2. run mongod.exe --dbpath="c:\data\db" or run mongod.exe


