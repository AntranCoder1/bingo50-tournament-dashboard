import mongoose from "mongoose";

function newConnection(uri: string) {
  const db = mongoose.createConnection(uri, {});
  db.on("error", (err) => {
    console.log(`Connected Failed`);
    db.close().catch(() => console.log("Mongodb:::: failed to close"));
  });

  db.on("connected", (res) => {
    console.log(`Connected to database "${db?.name}" successfully`);
  });

  db.on("disconnected", (err) => {
    console.log(`Mongodb disconnected`);
  });

  return db;
}

async function createTables() {
  const bingoDb = newConnection("mongodb://localhost:27017/bingoDb");
  try {
    const data = {
      id: "100",
      name: "TEST REDIS 3",
      type: "Freeze",
      anteAmount: 100,
      betAmount: 10,
      freezeBetMultiplier: 2,
      rake: {
        "2Players": {
          percentage: 0.04,
          cap: 100,
        },
      },
      maxPlayers: 8,
      minBuyIn: 2,
      turnTime: 20,
      turnReducedTimeMultiplier: 0.2,
      sitOutTime: 900,
      status: "Waiting",

      roundCounter: 2,
      communityCards: {
        B: ["B-1-D", "B-5"],
        I: [],
        N: ["N-2"],
        G: [],
        O: ["O-3-D"],
      },
      players: {},
      mainPot: 2,
      sidePots: [],
      deck: "B-1",
    };

    const newTables = await bingoDb.collection("tables").insertOne(data);

    if (newTables) {
      console.log("Created Tables Successfully");
    } else {
      console.log("Created Tables Failed");
    }
  } catch (error) {
    console.log(error);
  }
}
createTables();
