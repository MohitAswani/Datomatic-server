const AWS = require("aws-sdk");
const fs = require("fs");
const {
  TextractDocument,
  TextractIdentity,
} = require("amazon-textract-response-parser");
const { fileURLToPath } = require("url");

const textract = new AWS.Textract({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const detectText = (imagePath) => {
  const params = {
    Document: {
      Bytes: fs.readFileSync(imagePath),
    },
    FeatureTypes: ["TABLES", "FORMS"],
  };

  textract.analyzeDocument(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const document = new TextractDocument(data);
      const page = document.pageNumber(1);

      for (table of page.listTables()) {
        const myTable = [];

        for (const row of table.iterRows()) {
          const myRow = [];
          for (const cell of row.iterCells()) {
            myRow.push(cell.text);
          }

          myTable.push(myRow);
        }

        console.log(myTable);
      }

      for (const row of page.iterLines()) {
        const words = [];
        
        for (const word of row.iterWords())
        {
          words.push(word.text);
        }

        console.log(words);
      }
    }
  });
};

exports.detectText = detectText;
