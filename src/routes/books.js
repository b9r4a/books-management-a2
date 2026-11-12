const { books } = require("../db/schema");
const { eq } = require("drizzle-orm");

const express = require("express");
const db = require("../db/db");
const renderErrorHandler = require("../../utilities/renderErrorHandler");
const { date } = require("drizzle-orm/mysql-core");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const entries = await db.select().from(books);

    return res.status(200).json(entries);
  } catch (err) {
    return renderErrorHandler(err, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [entry] = await db
      .select()
      .from(books)
      .where(eq(books.id, +req.params.id));

      if(!entry)
      {
        return res.status(404).json({
            message: "book not found",
        });
      }

      return res.status(200).json(entry)
  } catch (err) {
    return renderErrorHandler(err, res);
  }
});

router.post("/",async (req,res) =>{
    try{
            const{title,author,year} = req.body;

            if(!title)
            {
                return res.status(404).json({
                    message: "the tite is required!",
                });
            }
            if(!author)
            {
                 return res.status(404).json({
                    message: "the author is required!",
                });
            }
            if(!year || year > new Date().getFullYear())
            {
                 return res.status(404).json({
                    message: "the year is required!",
                });
            }

            await db.insert(books).values({
                title: title,
                author:author,
                year:year,
            })

            return res.status(200).json({
                message: "book creted succesfully!",
            })
            
    }

    catch(err)
    {
        return renderErrorHandler(err,res)
    }
})

module.exports = router;
