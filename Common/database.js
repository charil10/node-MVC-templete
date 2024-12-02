import mongoose from 'mongoose';


// const uri = `mongodb+srv://charilteamlbm:${process.env.KEY}@cluster0.d6dn3qr.mongodb.net/TMKC?retryWrites=true&w=majority`;
// const uri = `mongodb://subhuser:Shubham123@170.187.249.98:27017/admin`;
const uri = `mongodb://${process.env.MONGO}`;
// const uri = "mongodb+srv://giichinetwork:DBvVEYA3cBaUyw6P@service1.gmbcy.mongodb.net/mainnet-pox"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,  serverSelectionTimeoutMS: 10000 });

mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB using Mongoose...!!!');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err);
});
