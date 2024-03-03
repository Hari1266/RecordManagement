const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const time_with_offset = (days = 0, hours = 0, minutes = 0) => {
  let now = new Date(
    new Date().valueOf() - new Date().getTimezoneOffset() * 60000
  );
  let offset =
    days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  let new_time = new Date(now.valueOf() + offset);
  return new_time;
};

const random_time_within_10_days = () => {
  let days = Math.floor(Math.random() * (10 - -10)) - 10;
  let hours = Math.floor(Math.random() * (24 - -24)) - 24;
  let minutes = Math.floor(Math.random() * (60 - -60)) - 60;
  return time_with_offset(days, hours, minutes);
};

const records = [
  {
    customer_name: "John Doe",
    age: 30,
    phone: "952-452-4521",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Jane Doe",
    age: 25,
    phone: "986-622-1275",
    location: "Delhi, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Jim Doe",
    age: 35,
    phone: "879-054-5457",
    location: "Delhi, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Jill Doe",
    age: 40,
    phone: "815-846-1255",
    location: "Delhi, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Hetti Westcarr",
    age: 63,
    phone: "639-241-8286",
    location: "Delhi, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Bartlett Saffrin",
    age: 41,
    phone: "918-207-4426",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Kimberley McGrale",
    age: 44,
    phone: "583-839-3160",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Hestia Fitzer",
    age: 40,
    phone: "417-760-9233",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Shelbi Culross",
    age: 19,
    phone: "272-390-2987",
    location: "Jaipur, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Cecil Pearson",
    age: 63,
    phone: "244-902-6094",
    location: "Jaipur, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Rossie Darthe",
    age: 28,
    phone: "834-538-3282",
    location: "Jaipur, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Nathalie Godon",
    age: 43,
    phone: "558-296-3550",
    location: "Jaipur, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Fairlie Baldinotti",
    age: 33,
    phone: "811-382-2262",
    location: "Jaipur, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Guendolen Tween",
    age: 35,
    phone: "731-576-9775",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Luca Condell",
    age: 40,
    phone: "178-184-6671",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Guillaume Stotherfield",
    age: 27,
    phone: "624-795-4170",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Orazio Senchenko",
    age: 45,
    phone: "199-712-5743",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Arlee Whyberd",
    age: 46,
    phone: "746-275-5841",
    location: "Mumbai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Neall Umpleby",
    age: 56,
    phone: "473-720-4026",
    location: "Mumbai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Fred Klimontovich",
    age: 31,
    phone: "665-112-9756",
    location: "Mumbai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Nananne Truesdale",
    age: 36,
    phone: "544-110-4351",
    location: "Mumbai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Glenda Boles",
    age: 33,
    phone: "883-774-1567",
    location: "Mumbai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Sullivan Shear",
    age: 57,
    phone: "783-868-0853",
    location: "Mumbai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Lucais Mullineux",
    age: 48,
    phone: "123-309-6441",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Paddy Gail",
    age: 50,
    phone: "935-474-2537",
    location: "Chennai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Michael Leavens",
    age: 24,
    phone: "904-509-7022",
    location: "Chennai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Shalne Brennenstuhl",
    age: 67,
    phone: "975-437-3564",
    location: "Chennai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Fairlie Prozillo",
    age: 34,
    phone: "347-608-9922",
    location: "Chennai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Kass Haps",
    age: 40,
    phone: "854-400-8489",
    location: "Chennai, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Jude Curnnok",
    age: 31,
    phone: "945-513-1996",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Darrel Hadye",
    age: 21,
    phone: "948-132-0101",
    location: "Banglore, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Connie Smitheram",
    age: 27,
    phone: "184-488-7588",
    location: "Banglore, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Lyda Duckering",
    age: 34,
    phone: "895-750-0839",
    location: "Banglore, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Gaspard Normanell",
    age: 43,
    phone: "574-341-7707",
    location: "Banglore, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Hillary Rennels",
    age: 30,
    phone: "197-429-9529",
    location: "Banglore, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Kimble Vasser",
    age: 64,
    phone: "504-986-1553",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Florian Mallaby",
    age: 43,
    phone: "234-814-5853",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Robinett Gloves",
    age: 55,
    phone: "614-459-1250",
    location: "Kolkata, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Briano Baddow",
    age: 56,
    phone: "906-638-9597",
    location: "Kolkata, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Lilli Bechley",
    age: 51,
    phone: "457-318-9572",
    location: "Kolkata, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Pancho Balassi",
    age: 29,
    phone: "895-370-7858",
    location: "Kolkata, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Andee Tootin",
    age: 46,
    phone: "973-908-7090",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Tull Bricknall",
    age: 26,
    phone: "333-337-7300",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Mahala Gladman",
    age: 64,
    phone: "679-340-0050",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Cammy Taveriner",
    age: 58,
    phone: "439-327-9599",
    location: "Noida, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Heriberto Ismirnioglou",
    age: 48,
    phone: "981-620-0678",
    location: "Noida, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Danette Spanton",
    age: 53,
    phone: "687-319-7531",
    location: "Noida, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Terrence Noirel",
    age: 60,
    phone: "564-666-0821",
    location: "Noida, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Luciana Pavlasek",
    age: 68,
    phone: "154-843-9597",
    location: "Noida, India",
    created_at: random_time_within_10_days(),
  },
  {
    customer_name: "Godfrey Balderson",
    age: 66,
    phone: "971-487-6064",
    location: "Hyderabad, India",
    created_at: random_time_within_10_days(),
  },
];

const seed = async () => {
  try {
    const query = `INSERT INTO records (customer_name, age, phone, location, created_at) VALUES ($1, $2, $3, $4, $5)`;
    for (let record of records) {
      await pool.query(query, [
        record.customer_name,
        record.age,
        record.phone,
        record.location,
        record.created_at,
      ]);
    }
    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database", error);
  }
};

const drop = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS records");
    console.log("Dropped table");
  } catch (error) {
    console.error("Error dropping table", error);
  }
};

const create = async () => {
  try {
    const query = `CREATE TABLE records (
        sno SERIAL PRIMARY KEY,
        customer_name VARCHAR(255),
        age INTEGER,
        phone VARCHAR(20),
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    await pool.query(query);
    console.log("Created table");
  } catch (error) {
    console.error("Error creating table", error);
  }
};


const drop_create_seed = async () => {
    await drop();
    await create();
    await seed();
}

drop_create_seed();